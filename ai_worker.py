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
                worked = self._process_collection(
                    "website_jobs", self._process_website_job
                ) or worked
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

    def _process_website_job(self, reference, data):
        source = str(data.get("sourceText", "")).strip()
        page_id = str(data.get("pageId", "")).strip()
        raw_mode = str(data.get("mode", "startup"))
        mode = {"student": "startup", "general": "startup", "auto": "startup"}.get(
            raw_mode, raw_mode
        )
        options = data.get("options", {}) if isinstance(data.get("options"), dict) else {}
        if len(source) < 30:
            raise ValueError("웹페이지를 만들 원본 내용이 부족합니다.")
        if len(source) > 50000:
            raise ValueError("원본 내용은 50,000자를 초과할 수 없습니다.")
        if not page_id:
            raise ValueError("페이지 주소가 없습니다.")

        mode_instruction = {
            "startup": """창업 목적 웹사이트입니다.
- 사업화 단계라면 고객 문제, 가치 제안, 제품·서비스 특징, 검증 성과, 행동 유도 순으로 구성하세요.
- 아이디어·활동 단계라면 문제 정의, 해결 아이디어, 주요 활동, 검증 결과, 배운 점과 향후 계획 순으로 구성하세요.
- 지원사업 보고서처럼 보이기보다 실제 고객과 심사자가 빠르게 이해할 수 있는 소개 사이트로 만드세요.
- 입력에 없는 매출, 고객 수, 특허, 수상, 연락처, 팀원은 절대 만들지 마세요.""",
            "career": """취업용 개인 포트폴리오입니다.
- 첫 화면에서 이름, 희망 직무, 한 줄 강점을 즉시 이해할 수 있게 하세요.
- 핵심 역량, 프로젝트, 경험·경력, 교육·자격·수상, 공개 연락 방법 순으로 채용 담당자가 빠르게 훑을 수 있게 구성하세요.
- 프로젝트는 입력된 범위에서 역할, 수행 내용, 사용 기술, 결과가 구분되게 정리하세요.
- 입력에 없는 경력 기간, 성과 수치, 기술 숙련도, 자격증, 링크, 연락처는 절대 만들지 마세요.
- 자기소개서 전문을 길게 나열하지 말고 직무 적합성의 근거가 드러나게 편집하세요.""",
        }.get(mode)
        if not mode_instruction:
            raise ValueError("지원하지 않는 웹사이트 제작 트랙입니다.")
        prompt = f"""당신은 시니어 프론트엔드 웹사이트 생성 전문가입니다.
아래 사용자 원문만 근거로 완성된 단일 HTML 파일을 만드세요.

[모드]
{mode_instruction}

[사용자 확인값]
- 배너 이미지 수: {int(options.get("bannerCount", 0) or 0)}
- 섹션 이미지: {"사용" if options.get("sectionImages") else "사용 안 함"}
- 로고 이미지: {"사용" if options.get("logoImage") else "사용 안 함"}
- 푸터: {"생성" if options.get("includeFooter", True) else "생성 안 함"}
- 푸터 추가 문구: {str(options.get("footerText", ""))[:300]}
- 사업화 여부: {options.get("commercialized", "unknown")}
- 디자인 방향: {options.get("designStyle", "auto")}

[절대 규칙]
1. 입력에 없는 이름, 성과, 수치, 링크, 연락처를 추측·창작·과장하지 마세요.
2. HTML, CSS, JavaScript를 모두 포함한 단일 HTML 문서만 반환하세요.
3. React, Vue, 빌드 도구를 사용하지 마세요.
4. 외부 실제 이미지 URL을 사용하지 마세요. 필요한 경우 아래 파일명만 사용하세요.
   Img_files_banner_01.jpg ~ Img_files_banner_03.jpg
   Img_files_logo_01.png
   Img_files_section_01.jpg ~ Img_files_section_03.jpg
5. 흔한 AI 템플릿처럼 카드 3개 반복이나 보라색 그라디언트 중심 구성을 피하세요.
6. 콘텐츠에 맞는 하나의 명확한 디자인 컨셉, CSS 변수, 반응형 모바일 레이아웃,
   키보드 접근성, 자연스러운 CSS 애니메이션을 적용하세요.
7. 빈 정보는 해당 섹션을 생략하거나 "정보 미입력"으로 최소 표시하고 임의로 채우지 마세요.
8. 이메일·전화번호·외부 링크는 사용자 원문에 명시된 경우에만 클릭 가능한 요소로 만드세요.
9. 창업 트랙의 푸터 기본 문구는 "본 프로젝트는 배재대학교 창업지원단의 지원을 받았습니다."이고,
   취업 트랙의 푸터 기본 문구는 "배재대학교 학생 포트폴리오"입니다.
10. 인쇄 및 HTML 다운로드 후에도 레이아웃이 유지되도록 작성하세요.
11. 마크다운 코드펜스, 설명, 사전 안내 없이 <!DOCTYPE html>부터 </html>까지만 출력하세요.

[사용자 원문]
{source[:50000]}
"""
        response = ollama.chat(
            model=self.text_model,
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.65},
        )
        html = str(response["message"]["content"]).strip()
        if html.startswith("```"):
            html = html.split("\n", 1)[-1]
            if html.endswith("```"):
                html = html[:-3].rstrip()
        start = html.lower().find("<!doctype html")
        if start < 0:
            start = html.lower().find("<html")
        end = html.lower().rfind("</html>")
        if start < 0 or end < 0:
            raise ValueError("Ollama가 유효한 HTML 문서를 반환하지 않았습니다.")
        html = html[start : end + len("</html>")]
        if len(html.encode("utf-8")) > 850000:
            raise ValueError("생성된 HTML이 저장 가능한 크기를 초과했습니다.")

        title = page_id
        title_start = html.lower().find("<title>")
        title_end = html.lower().find("</title>")
        if 0 <= title_start < title_end:
            title = html[title_start + 7 : title_end].strip()[:120] or page_id
        self.log(f"웹페이지 생성 완료: {page_id}")
        return {
            "html": html,
            "title": title,
            "generator": f"ollama:{self.text_model}",
            "track": mode,
            "sourceText": firestore.DELETE_FIELD,
            "options": firestore.DELETE_FIELD,
        }

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
