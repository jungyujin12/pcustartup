import base64
import json
import os
import smtplib
import tempfile
import threading
import traceback
import uuid
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import firebase_admin
import ollama
import pdfplumber
import requests
from firebase_admin import credentials, firestore


PROMPTS = {
    "양식": """대학 창업동아리 담당자로서 아래 활동보고서의 양식 준수 여부를 검토하세요.
동아리명, 활동 기간, 활동 내용, 참여 인원, 성과를 각각 ✅/❌/⚠️로 평가하고 종합평가를 작성하세요.

문서 내용:
{content}""",
    "내용": """대학 창업지원 전문 멘토로서 아래 보고서를 활동 목적 연관성, 창업역량 개발,
팀 활동 구체성, 성과 측정 가능성 관점에서 검토하고 구체적인 피드백을 작성하세요.

문서 내용:
{content}""",
    "보완": """창업 전문가로서 아래 보고서에 대해 즉시 보완사항, 다음 활동 방향,
창업 실현 핵심과제, 참고할 지원사업을 실행 가능한 형태로 제안하세요.

문서 내용:
{content}""",
}


class PCUWorker:
    def __init__(self, service_account_path, log=print):
        self.service_account_path = str(service_account_path)
        self.log = log
        self.stop_event = threading.Event()
        self.worker_id = f"{os.environ.get('COMPUTERNAME', 'pc')}-{uuid.uuid4().hex[:8]}"
        self.db = self._initialize_firebase()
        self.text_model = os.getenv("OLLAMA_TEXT_MODEL", "gemma3")
        self.vision_model = os.getenv("OLLAMA_VISION_MODEL", "llava")
        self.poll_interval = max(2, int(os.getenv("POLL_INTERVAL", "5")))
        self.admin_email = os.getenv("ADMIN_EMAIL", "").strip()
        self.admin_email_pw = os.getenv("ADMIN_EMAIL_PW", "")
        self.notify_to = [x.strip() for x in os.getenv("NOTIFY_TO", "").split(",") if x.strip()]

    def _initialize_firebase(self):
        if not Path(self.service_account_path).is_file():
            raise FileNotFoundError("Firebase 서비스 계정 JSON 파일을 선택해주세요.")
        app_name = "pcu-ai-worker"
        try:
            app = firebase_admin.get_app(app_name)
        except ValueError:
            app = firebase_admin.initialize_app(
                credentials.Certificate(self.service_account_path), name=app_name
            )
        return firestore.client(app=app)

    def stop(self):
        self.stop_event.set()

    def run(self):
        self.log("AI 작업 처리를 시작했습니다.")
        while not self.stop_event.is_set():
            try:
                self._heartbeat()
                worked = self._process_collection("ai_jobs", self._process_ai_job)
                worked = self._process_collection("email_jobs", self._process_email_job) or worked
                worked = self._process_collection("recovery_jobs", self._process_recovery_job) or worked
                if not worked:
                    self.stop_event.wait(self.poll_interval)
            except Exception as exc:
                self.log(f"대기열 확인 오류: {exc}")
                self.stop_event.wait(self.poll_interval)
        try:
            self._heartbeat(online=False)
        except Exception:
            pass
        self.log("AI 작업 처리를 중지했습니다.")

    def _heartbeat(self, online=True):
        models = []
        try:
            listing = ollama.list()
            raw_models = getattr(listing, "models", None) or listing.get("models", [])
            models = [getattr(model, "model", None) or model.get("name", "") for model in raw_models]
        except Exception:
            pass
        self.db.collection("system").document("ai_worker").set(
            {
                "online": online,
                "workerId": self.worker_id,
                "heartbeat": firestore.SERVER_TIMESTAMP,
                "models": models,
                "emailConfigured": bool(self.admin_email and self.admin_email_pw and self.notify_to),
            },
            merge=True,
        )

    def _process_collection(self, collection_name, handler):
        now = datetime.now(timezone.utc)
        docs = list(
            self.db.collection(collection_name)
            .where("status", "==", "pending")
            .limit(10)
            .stream()
        )
        worked = False
        for snapshot in docs:
            data = snapshot.to_dict() or {}
            retry_after = data.get("retryAfter")
            if retry_after and retry_after > now:
                continue
            if not self._claim(snapshot.reference):
                continue
            worked = True
            try:
                result = handler(snapshot.reference, data) or {}
                snapshot.reference.set(
                    {
                        **result,
                        "status": "completed",
                        "completedAt": firestore.SERVER_TIMESTAMP,
                        "error": firestore.DELETE_FIELD,
                        "retryAfter": firestore.DELETE_FIELD,
                    },
                    merge=True,
                )
            except Exception as exc:
                attempts = int(data.get("attempts", 0)) + 1
                retry = attempts < 3
                snapshot.reference.set(
                    {
                        "status": "pending" if retry else "failed",
                        "attempts": attempts,
                        "error": str(exc)[:1000],
                        "retryAfter": now + timedelta(seconds=30 * attempts)
                        if retry
                        else firestore.DELETE_FIELD,
                        "failedAt": firestore.SERVER_TIMESTAMP,
                    },
                    merge=True,
                )
                self.log(f"{collection_name}/{snapshot.id} 실패 ({attempts}/3): {exc}")
                traceback.print_exc()
        return worked

    @firestore.transactional
    def _claim_transaction(self, transaction, reference):
        snapshot = reference.get(transaction=transaction)
        if not snapshot.exists or snapshot.to_dict().get("status") != "pending":
            return False
        transaction.update(
            reference,
            {
                "status": "processing",
                "workerId": self.worker_id,
                "startedAt": firestore.SERVER_TIMESTAMP,
            },
        )
        return True

    def _claim(self, reference):
        return self._claim_transaction(self.db.transaction(), reference)

    def _process_ai_job(self, reference, data):
        job_type = data.get("type")
        self.log(f"AI 작업 시작: {job_type} / {reference.id}")
        if job_type == "report_analysis":
            return self._analyze_report(data)
        if job_type == "contest_match":
            return self._match_contest(data)
        raise ValueError(f"지원하지 않는 AI 작업: {job_type}")

    @staticmethod
    def _download(url, suffix):
        response = requests.get(url, timeout=90, stream=True)
        response.raise_for_status()
        temp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        try:
            for chunk in response.iter_content(1024 * 1024):
                temp.write(chunk)
        finally:
            temp.close()
        return temp.name

    def _analyze_report(self, data):
        file_name = str(data.get("fileName", "report.pdf"))
        suffix = Path(file_name).suffix.lower()
        if suffix not in {".pdf", ".jpg", ".jpeg", ".png", ".webp"}:
            raise ValueError("지원하지 않는 파일 형식입니다.")
        temp_path = self._download(str(data.get("fileUrl", "")), suffix)
        try:
            results = {}
            pdf_content = ""
            if suffix == ".pdf":
                with pdfplumber.open(temp_path) as pdf:
                    pdf_content = "\n".join(page.extract_text() or "" for page in pdf.pages)
            for mode in data.get("modes", []):
                if mode not in PROMPTS:
                    continue
                if suffix in {".jpg", ".jpeg", ".png", ".webp"}:
                    image = base64.b64encode(Path(temp_path).read_bytes()).decode("ascii")
                    result = ollama.chat(
                        model=self.vision_model,
                        messages=[{
                            "role": "user",
                            "content": PROMPTS[mode].replace(
                                "{content}", "[첨부 이미지를 직접 읽어서 분석하세요]"
                            ),
                            "images": [image],
                        }],
                    )
                else:
                    if not pdf_content.strip():
                        results[mode] = "텍스트를 추출할 수 없습니다. 이미지 PDF 여부를 확인해주세요."
                        continue
                    result = ollama.chat(
                        model=self.text_model,
                        messages=[{
                            "role": "user",
                            "content": PROMPTS[mode].format(content=pdf_content[:12000]),
                        }],
                    )
                results[mode] = result["message"]["content"]
            if not results:
                raise ValueError("완료된 분석 항목이 없습니다.")
            try:
                self._send_analysis_result(data, results)
            except Exception as exc:
                self.log(f"분석 결과 이메일 발송 실패(분석 결과는 저장): {exc}")
            self.log(f"보고서 분석 완료: {file_name}")
            return {"results": results, "modes": list(results.keys())}
        finally:
            try:
                os.unlink(temp_path)
            except OSError:
                pass

    def _match_contest(self, data):
        clubs = [{
            "code": str(c.get("code", ""))[:40],
            "name": str(c.get("name", ""))[:100],
            "field": str(c.get("field", ""))[:100],
            "desc": str(c.get("desc", ""))[:500],
        } for c in data.get("clubs", [])[:100]]
        prompt = f"""공모전에 적합한 창업동아리를 최대 5개 추천하세요.
공모전명: {data.get('contestName', '')}
분야: {data.get('field', '')}
설명: {data.get('description', '')}
동아리 목록: {json.dumps(clubs, ensure_ascii=False)}
JSON 배열만 반환하세요. code, name, score(0~100 정수), reason을 포함하세요."""
        response = ollama.chat(
            model=self.text_model,
            messages=[{"role": "user", "content": prompt}],
            format="json",
        )
        parsed = json.loads(response["message"]["content"])
        matches = parsed.get("matches", []) if isinstance(parsed, dict) else parsed
        allowed = {club["code"] for club in clubs}
        safe = []
        for match in matches[:5]:
            if not isinstance(match, dict) or str(match.get("code", "")) not in allowed:
                continue
            safe.append({
                "code": str(match.get("code", "")),
                "name": str(match.get("name", ""))[:100],
                "score": max(0, min(100, int(match.get("score", 0)))),
                "reason": str(match.get("reason", ""))[:500],
            })
        self.log(f"공모전 매칭 완료: {data.get('contestName', '')}")
        return {"matches": safe}

    def _process_email_job(self, reference, data):
        if not self.admin_email or not self.admin_email_pw:
            raise RuntimeError("이메일 환경변수가 설정되지 않았습니다.")
        payload = data.get("payload", {})
        job_type = data.get("type")
        if job_type == "reminder":
            sent, failed = 0, 0
            for club in payload.get("clubs", []):
                try:
                    self._send_email(
                        club.get("email", ""),
                        f"[배재대학교 창업지원팀] {payload.get('year', '')}년도 보고서 제출 안내",
                        f"""안녕하세요, {club.get('name', '')} 동아리 대표님.

창업동아리 활동보고서 제출을 안내드립니다.
제출 마감: {payload.get('deadline', '미정')}
제출 페이지: https://pcu-startup.netlify.app/report

배재대학교 창업지원팀""",
                    )
                    sent += 1
                except Exception:
                    failed += 1
            return {"sent": sent, "failed": failed}

        subjects = {
            "registration": "[PCU 창업동아리] 신규 동아리 등록",
            "upload": "[PCU 창업동아리] 보고서 파일 업로드",
            "consultation": "[PCU 창업지원] 신규 상담 신청",
        }
        subject = subjects.get(job_type)
        if not subject:
            raise ValueError(f"지원하지 않는 이메일 작업: {job_type}")
        for recipient in self.notify_to:
            self._send_email(recipient, subject, json.dumps(payload, ensure_ascii=False, indent=2))
        if job_type == "registration" and payload.get("repEmail"):
            self._send_email(
                payload["repEmail"],
                "[PCU 창업동아리] 접근코드 발급 안내",
                f"""동아리 등록이 완료되었습니다.

동아리명: {payload.get('clubName', '')}
접근코드: {payload.get('clubCode', '')}
보고서 제출: https://pcu-startup.netlify.app/report

접근코드는 외부에 공개하지 마세요.""",
            )
        self.log(f"이메일 알림 완료: {job_type}")
        return {"sent": len(self.notify_to)}

    def _process_recovery_job(self, reference, data):
        email = str(data.get("email", "")).strip().lower()
        if not email or "@" not in email:
            raise ValueError("이메일 주소가 올바르지 않습니다.")
        matches = []
        for club in self.db.collection("clubs").stream():
            club_data = club.to_dict() or {}
            if str(club_data.get("repEmail", "")).strip().lower() == email:
                matches.append((club.id, club_data.get("name", club.id)))
        if matches and self.admin_email_pw:
            lines = "\n".join(f"- {name}: {code}" for code, name in matches)
            self._send_email(
                email,
                "[PCU 창업동아리] 접근코드 확인",
                f"""등록된 동아리 접근코드입니다.

{lines}

보고서 제출: https://pcu-startup.netlify.app/report
접근코드는 외부에 공개하지 마세요.""",
            )
        self.log(f"접근코드 복구 요청 처리: {email}")
        return {"matched": len(matches)}

    def _send_analysis_result(self, data, results):
        email = str(data.get("resultEmail", "")).strip()
        if not email or "@" not in email or not self.admin_email_pw:
            return
        sections = "\n\n".join(f"[{mode}]\n{text}" for mode, text in results.items())
        self._send_email(
            email,
            f"[배재대학교 창업지원팀] AI 분석 결과 — {data.get('fileName', '')}",
            f"{data.get('clubName', data.get('clubCode', ''))} 동아리 AI 분석 결과입니다.\n\n{sections}",
        )

    def _send_email(self, recipient, subject, body):
        if not recipient or "@" not in recipient:
            raise ValueError("받는 이메일 주소가 올바르지 않습니다.")
        message = MIMEMultipart()
        message["From"] = self.admin_email
        message["To"] = recipient
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain", "utf-8"))
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as smtp:
            smtp.login(self.admin_email, self.admin_email_pw)
            smtp.send_message(message)
