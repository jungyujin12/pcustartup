# PCU 창업동아리 관리 시스템

기존 디자인과 기능을 유지하면서 Firebase 작업 대기열과 로컬 Ollama 실행기로
운영하도록 정비한 프로젝트입니다. Cloudflare Worker, ngrok, 공개 서버 포트는
사용하지 않습니다.

## 구조

```text
final_deploy/       Netlify 정적 웹
ai_worker.py        Firebase AI·이메일 작업 처리
ai_launcher.py      Windows 실행기 화면
AI 실행기.exe       배포용 실행 파일
firebase.json       Firestore·Storage 규칙 설정
netlify/functions/  과거 서버리스 생성기 소스(현재 배포·사용 안 함)
```

## 웹 배포

GitHub 저장소를 Netlify에 연결합니다.

```text
Build command:
Publish directory: final_deploy
Functions directory:
```

현재 웹사이트·포트폴리오 생성은 Firebase 대기열과 로컬 Ollama 실행기를
사용합니다. Netlify Function, GitHub 쓰기 토큰, Claude·Gemini API 키는
필요하지 않습니다. 기존 `netlify/functions` 폴더는 이력 확인용이며
`netlify.toml`의 배포 대상에서 제외되어 있습니다.

기존에 등록한 `PCU_API_TOKEN`, `PORTFOLIO_ACCESS_CODE`, `SITE_ORIGIN`,
`GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `CLAUDE_API_KEY`,
`GEMINI_API_KEY` 환경변수는 현재 파이프라인에서 사용하지 않습니다.

## Firebase 규칙 배포

```powershell
firebase deploy --only firestore:rules,storage
```

관리자 Firebase Authentication 계정은 현재 규칙에 등록된 관리자 이메일과
일치해야 합니다.

## AI 실행기

1. Ollama를 설치하고 `gemma3`, `llava` 모델을 준비합니다.
2. Firebase Console에서 서비스 계정 JSON을 발급합니다.
3. `AI 실행기.exe`와 `.env`를 같은 폴더에 둡니다.
4. 실행기에서 서비스 계정 JSON을 선택하고 `AI 작업 시작`을 누릅니다.

`.env` 예시:

```dotenv
ADMIN_EMAIL=발신용_Gmail_주소
ADMIN_EMAIL_PW=Gmail_앱_비밀번호
NOTIFY_TO=알림받을_주소1,알림받을_주소2
OLLAMA_TEXT_MODEL=gemma3
OLLAMA_VISION_MODEL=llava
POLL_INTERVAL=5
```

서비스 계정 JSON, `.env`, Gmail 앱 비밀번호는 GitHub에 올리지 마세요.

## 작업 흐름

```text
파일 업로드
→ Firestore reports 제출 기록 생성
→ ai_jobs 작업 등록
→ AI 실행기가 작업 선점
→ Ollama 분석
→ 결과를 ai_jobs와 ai_history에 표시
```

이메일 알림은 `email_jobs`에 등록되며 AI 실행기가 순서대로 발송합니다.

## 소스 실행

```powershell
python -m pip install -r requirements.txt
python server.py
```
