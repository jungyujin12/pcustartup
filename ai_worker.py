import base64
import json
import ipaddress
import os
import re
import socket
import smtplib
import tempfile
import threading
import traceback
import uuid
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from urllib.parse import urlparse

import firebase_admin
import ollama
import pdfplumber
import requests
from firebase_admin import credentials, firestore
from website_renderer import _fields, render_website


def _reference_site_brief(url):
    """Read a small public HTML sample without allowing local-network requests."""
    value = str(url or "").strip()
    if not value:
        return ""
    parsed = urlparse(value)
    if parsed.scheme not in ("https", "http") or not parsed.hostname:
        raise ValueError("참고 사이트 주소는 http 또는 https 공개 주소만 사용할 수 있습니다.")
    host = parsed.hostname.lower().rstrip(".")
    if host in ("localhost",) or host.endswith((".local", ".internal")):
        raise ValueError("내부 네트워크 주소는 참고 사이트로 사용할 수 없습니다.")
    for result in socket.getaddrinfo(host, parsed.port or (443 if parsed.scheme == "https" else 80), type=socket.SOCK_STREAM):
        address = ipaddress.ip_address(result[4][0])
        if not address.is_global:
            raise ValueError("내부 네트워크 주소는 참고 사이트로 사용할 수 없습니다.")
    response = requests.get(
        value,
        timeout=(4, 8),
        allow_redirects=False,
        headers={"User-Agent": "PCU-Design-Reference/1.0"},
        stream=True,
    )
    response.raise_for_status()
    content_type = response.headers.get("content-type", "").lower()
    if "text/html" not in content_type:
        raise ValueError("참고 사이트가 HTML 문서를 제공하지 않습니다.")
    raw = b""
    for chunk in response.iter_content(32768):
        raw += chunk
        if len(raw) > 900000:
            break
    markup = raw.decode(response.encoding or "utf-8", errors="ignore")
    title = re.search(r"<title[^>]*>(.*?)</title>", markup, re.I | re.S)
    colors = []
    for color in re.findall(r"#[0-9a-fA-F]{3,8}\b", markup):
        color = color.lower()
        if color not in colors:
            colors.append(color)
        if len(colors) >= 12:
            break
    counts = {tag: len(re.findall(fr"<{tag}\b", markup, re.I)) for tag in ("section", "article", "img", "nav", "button")}
    return (
        f"참고 사이트 제목: {re.sub(r'<[^>]+>', ' ', title.group(1)).strip()[:160] if title else host}. "
        f"발견된 색상: {', '.join(colors) if colors else '명시 색상 없음'}. "
        f"구조 단서: 섹션 {counts['section']}, 아티클 {counts['article']}, 이미지 {counts['img']}, "
        f"내비게이션 {counts['nav']}, 버튼 {counts['button']}. "
        "원본의 문구·이미지·코드를 복제하지 말고 시각적 밀도와 구성 원칙만 참고하세요."
    )


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
        self.website_model = os.getenv("OLLAMA_WEBSITE_MODEL", "llama3:8b")
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
                worked = self._process_collection(
                    "website_access", self._process_website_access
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
                retry = attempts < 3 and not isinstance(exc, (PermissionError, ValueError))
                secret_cleanup = {
                    "accessCode": firestore.DELETE_FIELD
                } if collection_name == "website_access" and not retry else {}
                snapshot.reference.set(
                    {
                        **secret_cleanup,
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
        # ``firestore.transactional`` does not behave as an instance-method
        # descriptor. Applying it directly to _claim_transaction shifts the
        # arguments and leaves ``reference`` missing. Keep the bound method
        # plain and wrap a local callback with the SDK's expected signature.
        @firestore.transactional
        def claim(transaction, job_reference):
            return self._claim_transaction(transaction, job_reference)

        return claim(self.db.transaction(), reference)

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
        reference_image = str(data.get("referenceImageData", ""))
        reference_site = str(options.get("referenceSiteUrl", "")).strip()
        visibility = str(data.get("visibility", "club"))
        if len(source) < 30:
            raise ValueError("웹페이지를 만들 원본 내용이 부족합니다.")
        if len(source) > 50000:
            raise ValueError("원본 내용은 50,000자를 초과할 수 없습니다.")
        if not page_id:
            raise ValueError("페이지 주소가 없습니다.")
        if visibility not in ("public", "club"):
            raise ValueError("지원하지 않는 공개 범위입니다.")

        # PDF/사업계획서 원문은 폼의 "추가 원문"에 들어온다. 이전 렌더러는
        # 화면의 짧은 입력칸만 사용해 원문의 핵심 내용이 결과에서 빠질 수 있었다.
        # 먼저 사실만 구조화한 뒤, 사용자가 직접 쓴 값은 보존하면서 비어 있거나
        # "본문 참고"처럼 의미가 없는 항목을 보강한다.
        source, source_analysis = self._structure_website_source(source, mode)

        reference_brief = "참고 이미지 없음. 콘텐츠 성격에 맞춰 독창적으로 결정하세요."
        if reference_site:
            try:
                reference_brief = _reference_site_brief(reference_site)
            except Exception as exc:
                self.log(f"참고 사이트 분석 건너뜀: {exc}")
                reference_brief = f"참고 사이트를 안전하게 분석하지 못했습니다. 콘텐츠를 기준으로 독창적으로 구성하세요. ({str(exc)[:180]})"
        if reference_image:
            try:
                encoded = reference_image.split(",", 1)[-1]
                if len(encoded) <= 500000:
                    vision = ollama.chat(
                        model=self.vision_model,
                        messages=[{
                            "role": "user",
                            "content": "이 이미지를 복제하지 말고 웹디자인 참고자료로 분석하세요. 색상 팔레트, 타이포그래피 인상, 여백, 형태, 화면 배치, 분위기를 한국어 8문장 이내로 설명하세요. 이미지 속 개인정보나 문구는 옮기지 마세요.",
                            "images": [encoded],
                        }],
                        options={"temperature": 0.25, "num_predict": 700},
                    )
                    image_brief = str(vision["message"]["content"]).strip()[:3000]
                    reference_brief = f"{reference_brief}\n참고 이미지 분석: {image_brief}"
            except Exception as exc:
                self.log(f"참고 이미지 분석 건너뜀: {exc}")

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
        # Small local language models are useful for document analysis, but
        # letting them author an entire CSS layout produces unstable geometry
        # (oversized fixed blocks, collapsed columns, and broken mobile text).
        # The curated renderer preserves the user's chosen layout/theme while
        # guaranteeing responsive, accessible HTML on every run.
        recent_systems = []
        club_code = str(data.get("clubCode", ""))
        if club_code:
            try:
                previous = list(self.db.collection("website_jobs").where("clubCode", "==", club_code).limit(30).stream())
                previous.sort(key=lambda item: getattr(item.to_dict().get("completedAt"), "timestamp", lambda: 0)(), reverse=True)
                recent_systems = [item.to_dict().get("designSystem") for item in previous if item.id != page_id and isinstance(item.to_dict().get("designSystem"), dict)][:8]
            except Exception as exc:
                self.log(f"최근 디자인 이력 확인 건너뜀: {exc}")
        html, title, design_system = render_website(source, mode, options, page_id, reference_brief, recent_systems)
        if len(html.encode("utf-8")) > 850000:
            raise ValueError("생성된 HTML이 저장 가능한 크기를 초과했습니다.")
        self.db.collection("website_content").document(page_id).set({
            "html": html,
            "visibility": visibility,
            "clubCode": str(data.get("clubCode", "")),
            "updatedAt": firestore.SERVER_TIMESTAMP,
        })
        if mode == "career":
            fields = _fields(source)
            assessment = fields.get("진로검사 결과지 - AI 설계 참고용, 공개 금지", "")
            code_match = re.search(r"(?:흥미 코드|코드)\s*[:：]?\s*([RIASEC]{3})", assessment)
            self.db.collection("career_records").document(page_id).set({
                "pageId": page_id,
                "clubCode": str(data.get("clubCode", "")),
                "clubName": str(data.get("clubName", ""))[:100],
                "clubYear": str(data.get("clubYear", ""))[:4],
                "name": fields.get("이름", "")[:60],
                "careerBasis": fields.get("진로 설계 기준", "")[:160],
                "desiredRole": fields.get("희망 직무", "")[:100],
                "careerField": fields.get("희망 산업·진로 분야", "")[:120],
                "major": fields.get("전공·학과", "")[:100],
                "assessmentUsed": bool(assessment),
                "assessmentRecordId": fields.get("진로검사 기록 ID", "")[:40],
                "assessmentCode": code_match.group(1) if code_match else "",
                "createdAt": firestore.SERVER_TIMESTAMP,
                "privacyScope": "admin-only-summary",
            }, merge=True)
        self.log(f"웹페이지 생성 완료: {page_id}")
        return {
            "html": firestore.DELETE_FIELD,
            "title": title,
            "generator": "pcu-design-engine:v2",
            "designSystem": design_system,
            "sourceAnalysis": source_analysis,
            "referenceSiteUsed": bool(reference_site),
            "track": mode,
            "visibility": visibility,
            "publishStatus": "draft",
            "revision": 1,
            "rootPageId": page_id,
            "sourceText": firestore.DELETE_FIELD,
            "options": firestore.DELETE_FIELD,
            "referenceImageData": firestore.DELETE_FIELD,
            "referenceImageName": firestore.DELETE_FIELD,
        }

    def _structure_website_source(self, source, mode):
        fields = _fields(source)
        raw = fields.get("추가 원문", "").strip()
        if len(raw) < 80:
            return source, {"used": False, "reason": "additional_source_too_short"}
        labels = (
            ["프로젝트·서비스명", "팀명·동아리명", "핵심 한 줄 소개", "분야·업종",
             "문제 정의", "해결 방법", "주요 활동", "성과·검증 결과", "배운 점·향후 계획"]
            if mode == "startup" else
            ["이름", "희망 직무", "전공·학과", "희망 산업·진로 분야", "한 줄 소개",
             "핵심 역량·기술", "강점·업무 방식", "프로젝트", "경험·경력·대외활동", "교육·자격·수상"]
        )
        prompt = f"""아래 한국어 문서를 웹사이트용 사실 데이터로 정리하세요.
절대 추측하거나 없는 성과·수치·이름을 만들지 마세요. 문서에 근거가 없는 값은 빈 문자열로 두세요.
각 값은 원문 복사가 아니라 방문자가 이해하기 쉬운 1~5문장 요약으로 작성하세요.
모든 값은 반드시 자연스러운 한국어로 작성하고 영어로 번역하지 마세요.
원문이 계획·예정·목표라고 표현한 일은 완료된 활동이나 성과처럼 바꾸지 마세요.
원문이 완료했다고 명시한 사실만 완료형으로 쓰고, 계획과 실적을 엄격히 구분하세요.
창업 문서의 핵심 기능은 '해결 방법' 또는 '주요 활동'에 빠짐없이 포함하세요.
반드시 JSON 객체 하나만 출력하고 키는 다음 목록만 사용하세요:
{json.dumps(labels, ensure_ascii=False)}

[원문]
{raw[:30000]}"""
        try:
            response = ollama.chat(
                model=self.website_model,
                messages=[{"role": "user", "content": prompt}],
                format="json",
                options={"temperature": 0.15, "num_ctx": 16384, "num_predict": 1800},
            )
            extracted = json.loads(str(response["message"]["content"]))
            if not isinstance(extracted, dict):
                raise ValueError("문서 분석 결과가 객체가 아닙니다.")
            extracted_text = " ".join(str(extracted.get(label, "")) for label in labels)
            korean_count = len(re.findall(r"[가-힣]", extracted_text))
            latin_count = len(re.findall(r"[A-Za-z]", extracted_text))
            if latin_count > max(24, korean_count):
                correction = ollama.chat(
                    model=self.website_model,
                    messages=[{"role": "user", "content": f"""다음 JSON은 한국어 웹사이트용 구조화 결과여야 하는데 영어가 섞였습니다.
키와 사실, 숫자, 계획/완료 상태를 그대로 유지하면서 값만 자연스러운 한국어로 고치세요.
계획을 완료 실적으로 바꾸지 말고 JSON 객체 하나만 출력하세요.
{json.dumps(extracted, ensure_ascii=False)}"""}],
                    format="json",
                    options={"temperature": 0.05, "num_ctx": 8192, "num_predict": 1800},
                )
                corrected = json.loads(str(correction["message"]["content"]))
                if isinstance(corrected, dict):
                    extracted = corrected
            vague = re.compile(r"^(?:(?:본문|원문|파일|첨부|사업계획서)\s*)+(?:참고|참조|확인)?[.!]?$|^없음$", re.I)
            applied = []
            for label in labels:
                value = re.sub(r"\s+", " ", str(extracted.get(label, ""))).strip()[:2400]
                current = fields.get(label, "").strip()
                if value and (not current or vague.match(current) or len(current) < 8):
                    fields[label] = value
                    applied.append(label)
            ordered = []
            seen = set()
            for label, _ in re.findall(r"^\[([^\]]+)\]\s*(.*?)(?=^\[[^\]]+\]|\Z)", source, re.M | re.S):
                if label in fields and label not in seen:
                    ordered.append(f"[{label}] {fields[label]}")
                    seen.add(label)
            for label in labels:
                if label in fields and label not in seen:
                    ordered.append(f"[{label}] {fields[label]}")
                    seen.add(label)
            # 원문 전문은 저장/분석에만 사용하고 공개 HTML에는 직접 노출하지 않는다.
            if "추가 원문" not in seen:
                ordered.append(f"[추가 원문] {raw}")
            return "\n".join(ordered), {"used": True, "appliedFields": applied, "rawCharacters": len(raw)}
        except Exception as exc:
            self.log(f"웹사이트 원문 구조화 건너뜀: {exc}")
            return source, {"used": False, "reason": "analysis_failed"}
        prompt = f"""당신은 수상 경력이 있는 아트디렉터이자 시니어 프론트엔드 개발자입니다.
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
- 첫 화면 배치: {options.get("heroLayout", "auto")}
- 본문 배열: {options.get("sectionLayout", "auto")}
- 정보 밀도: {options.get("contentDensity", "balanced")}

[참고 이미지에서 추출한 디자인 방향]
{reference_brief}

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
12. 단순한 회색 배경과 흰색 사각형 섹션 반복은 금지합니다. 첫 화면은 최소 70vh의 강한 히어로로 만들고,
    섹션마다 에디토리얼 그리드·큰 숫자·타이포그래피·인용문·타임라인 등 서로 다른 시각적 구성을 사용하세요.
13. CSS는 충분히 구체적으로 작성하세요. clamp() 타이포그래피, 여백 체계, 2개 이상의 배경 효과,
    반응형 breakpoint, hover/focus, 스크롤 진입 애니메이션을 포함하세요.
14. 콘텐츠가 적어도 여백과 타이포그래피로 완성도 있게 구성하며, 같은 모양의 테두리 카드만 반복하지 마세요.
15. 이미지 파일이 없어도 디자인이 깨지지 않아야 합니다. 이미지에는 onerror로 자신을 숨기는 처리를 넣고,
    이미지 뒤에는 반드시 CSS 그라디언트·패턴·도형으로 된 완성된 대체 비주얼을 배치하세요.
16. 결과물은 실제 공개 가능한 랜딩페이지 수준으로 작성하고 충분한 길이의 CSS와 의미 있는 HTML 구조를 포함하세요.
17. 과거 생성물이나 고정 템플릿을 재사용하지 말고, 이번 원문·선택값·참고 이미지 분석에 맞춰 구조와 분위기를 새로 설계하세요.

[사용자 원문]
{source[:50000]}
"""
        response = ollama.chat(
            model=self.website_model,
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.72, "num_ctx": 16384, "num_predict": 8192},
        )
        html = self._extract_generated_html(response["message"]["content"])
        if self._website_quality_score(html) < 8:
            self.log(f"웹페이지 디자인 보강 중: {page_id}")
            refine_prompt = f"""아래 초안은 내용은 맞지만 디자인 완성도가 부족합니다. 원문의 사실은 그대로 유지하면서
실제 공개 가능한 프리미엄 단일 HTML 웹사이트로 전면 리디자인하세요.

[필수 개선]
- 최소 70vh 히어로, 강한 타이포그래피 위계, 넉넉한 여백과 일관된 CSS 변수
- 단순 흰 사각형 목록 반복 금지; 에디토리얼 그리드, 타임라인, 큰 숫자, 인용 블록 등 섹션별 변화
- 그라디언트·기하 패턴·노이즈 느낌 등 CSS만으로도 완성되는 배경 비주얼 2개 이상
- 모바일 360px부터 데스크톱까지 자연스러운 반응형 구성
- hover, focus-visible, 스크롤 진입 애니메이션과 prefers-reduced-motion 대응
- 존재하지 않는 이미지가 깨진 아이콘으로 보이지 않도록 onerror 처리와 CSS 대체 비주얼 제공
- 입력에 없는 사실·수치·연락처는 추가 금지
- 설명이나 코드펜스 없이 <!DOCTYPE html>부터 </html>까지만 출력

[사용자 원문]
{source[:30000]}

[현재 초안]
{html[:60000]}
"""
            try:
                refined = ollama.chat(
                    model=self.website_model,
                    messages=[{"role": "user", "content": refine_prompt}],
                    options={"temperature": 0.68, "num_ctx": 24576, "num_predict": 8192},
                )
                refined_html = self._extract_generated_html(refined["message"]["content"])
                if self._website_quality_score(refined_html) > self._website_quality_score(html):
                    html = refined_html
            except Exception as exc:
                self.log(f"디자인 보강 건너뜀: {exc}")
        if len(html.encode("utf-8")) > 850000:
            raise ValueError("생성된 HTML이 저장 가능한 크기를 초과했습니다.")

        title = page_id
        title_start = html.lower().find("<title>")
        title_end = html.lower().find("</title>")
        if 0 <= title_start < title_end:
            title = html[title_start + 7 : title_end].strip()[:120] or page_id
        self.db.collection("website_content").document(page_id).set({
            "html": html,
            "visibility": visibility,
            "clubCode": str(data.get("clubCode", "")),
            "updatedAt": firestore.SERVER_TIMESTAMP,
        })
        self.log(f"웹페이지 생성 완료: {page_id}")
        return {
            "html": firestore.DELETE_FIELD,
            "title": title,
            "generator": f"ollama:{self.website_model}",
            "track": mode,
            "visibility": visibility,
            "publishStatus": "draft",
            "revision": 1,
            "rootPageId": page_id,
            "sourceText": firestore.DELETE_FIELD,
            "options": firestore.DELETE_FIELD,
            "referenceImageData": firestore.DELETE_FIELD,
            "referenceImageName": firestore.DELETE_FIELD,
        }

    def _process_website_access(self, reference, data):
        page_id = str(data.get("pageId", "")).strip()
        access_code = str(data.get("accessCode", "")).strip().upper()
        action = str(data.get("action", "view"))
        if not page_id or not access_code:
            raise ValueError("페이지 주소와 동아리 접근코드가 필요합니다.")
        page_ref = self.db.collection("website_jobs").document(page_id)
        page = page_ref.get()
        if not page.exists or page.to_dict().get("status") != "completed":
            raise ValueError("완료된 웹사이트를 찾을 수 없습니다.")
        page_data = page.to_dict()
        club_id = str(page_data.get("clubCode", ""))
        club = self.db.collection("clubs").document(club_id).get()
        if not club.exists:
            raise ValueError("연결된 동아리를 찾을 수 없습니다.")
        club_data = club.to_dict()
        if club_data.get("status") != "active":
            raise PermissionError("운영이 종료된 동아리입니다.")
        current_code = str(club_data.get("accessCode") or club_data.get("code") or club.id).upper()
        if current_code != access_code:
            raise PermissionError("동아리 접근코드가 올바르지 않습니다.")
        if action == "view":
            content = self.db.collection("website_content").document(page_id).get()
            html = content.to_dict().get("html", "") if content.exists else page_data.get("html", "")
            if not html:
                raise ValueError("저장된 웹사이트 본문이 없습니다.")
            return {
                "html": html,
                "title": page_data.get("title", page_id),
                "track": page_data.get("track", page_data.get("mode", "startup")),
                "accessCode": firestore.DELETE_FIELD,
            }
        if action == "revision":
            instruction = str(data.get("value", "")).strip()[:1500]
            if not instruction:
                raise ValueError("수정할 내용을 입력해주세요.")
            content = self.db.collection("website_content").document(page_id).get()
            current_html = content.to_dict().get("html", "") if content.exists else page_data.get("html", "")
            if not current_html:
                raise ValueError("수정할 웹사이트 본문이 없습니다.")
            revision = int(page_data.get("revision", 1) or 1) + 1
            root_id = str(page_data.get("rootPageId") or page_id).split("-v", 1)[0]
            new_page_id = f"{root_id[:26]}-v{revision}"
            while self.db.collection("website_jobs").document(new_page_id).get().exists:
                revision += 1
                new_page_id = f"{root_id[:26]}-v{revision}"
            revise_prompt = f"""아래 단일 HTML 웹사이트에 사용자의 수정 요청만 반영하세요.
기존 사실과 콘텐츠를 임의로 추가·삭제하지 말고 디자인 완성도, 반응형, 접근성을 유지하세요.
고정 템플릿으로 교체하지 말고 현재 사이트의 컨셉을 발전시키세요.
설명이나 코드펜스 없이 완성된 <!DOCTYPE html>부터 </html>까지만 출력하세요.

[수정 요청]
{instruction}

[현재 HTML]
{current_html[:80000]}
"""
            revised = ollama.chat(
                model=self.website_model,
                messages=[{"role": "user", "content": revise_prompt}],
                options={"temperature": 0.5, "num_ctx": 24576, "num_predict": 8192},
            )
            revised_html = self._extract_generated_html(revised["message"]["content"])
            visibility = page_data.get("visibility", "club")
            self.db.collection("website_content").document(new_page_id).set({
                "html": revised_html, "visibility": visibility, "clubCode": club_id,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            })
            self.db.collection("website_jobs").document(new_page_id).set({
                "status": "completed", "pageId": new_page_id, "clubCode": club_id,
                "clubName": page_data.get("clubName", club_data.get("name", "")),
                "clubYear": page_data.get("clubYear", str(club_data.get("year", ""))),
                "mode": page_data.get("mode", page_data.get("track", "startup")),
                "track": page_data.get("track", page_data.get("mode", "startup")),
                "title": page_data.get("title", new_page_id), "visibility": visibility,
                "publishStatus": "draft", "revision": revision, "rootPageId": root_id,
                "parentPageId": page_id, "createdAt": firestore.SERVER_TIMESTAMP,
                "completedAt": firestore.SERVER_TIMESTAMP,
                "generator": f"ollama:{self.website_model}:revision",
            })
            return {"accessCode": firestore.DELETE_FIELD, "result": "ok", "newPageId": new_page_id}
        if action == "finalize":
            page_ref.set({"publishStatus": "final", "finalizedAt": firestore.SERVER_TIMESTAMP}, merge=True)
        elif action == "draft":
            page_ref.set({"publishStatus": "draft", "finalizedAt": firestore.DELETE_FIELD}, merge=True)
        elif action == "visibility":
            value = str(data.get("value", ""))
            if value not in ("public", "club"):
                raise ValueError("공개 범위 값이 올바르지 않습니다.")
            page_ref.set({"visibility": value}, merge=True)
            self.db.collection("website_content").document(page_id).set({"visibility": value}, merge=True)
        else:
            raise ValueError("지원하지 않는 웹사이트 작업입니다.")
        return {"accessCode": firestore.DELETE_FIELD, "result": "ok"}

    @staticmethod
    def _extract_generated_html(content):
        html = str(content or "").strip()
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
        return html[start : end + len("</html>")]

    @staticmethod
    def _website_quality_score(html):
        lower = html.lower()
        css = lower[lower.find("<style") : lower.rfind("</style>")]
        checks = (
            len(css) >= 3500,
            lower.count("<section") >= 4,
            "@media" in css,
            "clamp(" in css,
            "gradient(" in css,
            ("@keyframes" in css or "intersectionobserver" in lower),
            ("display:grid" in css.replace(" ", "") or "display: grid" in css),
            ("::before" in css or ":before" in css),
            "focus-visible" in css,
            "prefers-reduced-motion" in css,
        )
        return sum(bool(item) for item in checks)

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
