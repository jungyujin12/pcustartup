# 배재대학교 창업동아리 플랫폼 - 설정 가이드

> 이 프로젝트는 현재 단순 창업 테스트 사이트가 아니라 Firebase 기반의
> 동아리 등록·보고서 제출·관리자·상담·설문 기능을 포함합니다.
> GitHub Pages에 파일만 업로드하면 화면은 표시되지만, 전체 기능을 사용하려면
> Firebase Authentication/Firestore/Storage와 외부 AI 서버를 별도로 구성해야 합니다.

## 전체 구조

```
pcu-startup/              ← GitHub 레포 이름 (자유롭게 설정)
├── index.html            ← 메인 홈페이지
├── test.html             ← 창업 테스트 (입문)
├── register.html         ← 창업동아리 등록
├── report.html           ← 보고서 제출
├── admin.html            ← 관리자 화면
├── consulting.html       ← 상담 신청
├── survey-builder.html   ← 설문 생성
├── survey.html           ← 설문 응답
├── print.html            ← 보고서 출력
├── theme.css
├── script.js
├── emoticons/
├── jobicons/
└── (이미지 파일들)
```

---

## STEP 1 — GitHub 레포 생성 및 파일 업로드

1. https://github.com 접속 후 로그인
2. 우측 상단 **+** → **New repository**
3. 설정:
   - Repository name: `pcu-startup` (원하는 이름)
   - Public 선택 (GitHub Pages 무료 사용 필수)
   - **Create repository** 클릭
4. **uploading an existing file** 클릭
5. 이 폴더의 **모든 파일을 드래그** (폴더째로 업로드 가능)
6. **Commit changes** 클릭

---

## STEP 2 — GitHub Pages 활성화

1. 레포 상단 **Settings** 탭 클릭
2. 좌측 메뉴 **Pages** 클릭
3. Source: **Deploy from a branch**
4. Branch: **main** / **/ (root)** 선택
5. **Save** 클릭
6. 약 1~2분 후 URL 생성:
   ```
   https://[GitHub아이디].github.io/pcu-startup/
   ```

> ✅ 이후 파일 수정 시 GitHub에 업로드하면 자동으로 반영됩니다.
> Netlify처럼 트래픽 제한이 없고, 완전 무료입니다.

---

## STEP 3 — Google Sheets + Apps Script 연동

### 3-1. Google Sheets 파일 생성
1. https://sheets.google.com 에서 새 파일 생성
2. 파일명: `배재대_창업테스트_데이터` (자유롭게)

### 3-2. Apps Script 등록
1. 상단 메뉴 → **확장 프로그램** → **Apps Script**
2. 기존 코드 전체 삭제
3. `apps_script.gs` 파일 내용 전체 붙여넣기
4. 💾 저장 (Ctrl+S)

### 3-3. 웹 앱으로 배포
1. 우측 상단 **배포** → **새 배포**
2. 유형: **웹 앱** 선택
3. 설정:
   - 설명: `창업테스트 데이터 수집`
   - 실행 계정: **나(본인 이메일)**
   - 액세스 권한: **모든 사용자**
4. **배포** 클릭
5. **권한 승인** → 본인 구글 계정으로 허용
6. **웹 앱 URL 복사** (이게 SHEET_URL)

### 3-4. test.html에 URL 등록
`test.html` 파일을 열고 아래 부분을 찾아서:
```javascript
const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```
복사한 URL로 교체:
```javascript
const SHEET_URL = 'https://script.google.com/macros/s/XXXX/exec';
```

---

## STEP 4 — 데이터 수집 시트 구조

Apps Script가 자동으로 3개 시트를 생성합니다:

### 📄 유형추천_입문
| 타임스탬프 | 학과 | 학년 | 유형결과 | 아이디어점수 | 실행력점수 | 네트워킹점수 | 분석력점수 | 테스트경로 |
|---|---|---|---|---|---|---|---|---|
| 2025-03-01 14:23 | 경영학과 | 2학년 | 유형 A 아이디어 메이커 | 42 | 18 | 12 | 6 | type_basic |

### 📄 아이템추천_입문
| 타임스탬프 | 학과 | 학년 | 아이템카테고리 | 추천아이템1 | 추천아이템2 | 추천아이템3 | 응답키워드 | 테스트경로 |
|---|---|---|---|---|---|---|---|---|

### 📄 유형및아이템_심화
| 타임스탬프 | 학과 | 학년 | 유형결과 | 관심계열 | 관심분야 | 창업스타일 | 추천아이템1 | 추천아이템2 | 추천아이템3 | 테스트경로 |
|---|---|---|---|---|---|---|---|---|---|---|

---

## STEP 5 — 분석 활용 예시

Google Sheets에서 피벗 테이블로 바로 분석 가능:

```
[유형추천_입문] 시트 기준
→ 행: 학과 / 열: 유형결과 / 값: 개수
= "경영학과 학생 중 유형 A가 몇 명"
```

```
[아이템추천_입문] 시트 기준
→ 행: 학년 / 열: 아이템카테고리 / 값: 개수
= "1학년이 가장 많이 추천받은 아이템 카테고리"
```

---

## STEP 6 — 이후 파일 수정 방법 (GitHub)

### 방법 A: 웹에서 직접 수정
1. GitHub 레포 → 파일 클릭 → 연필(✏️) 아이콘
2. 수정 후 **Commit changes**
3. 자동 배포 (약 30초~1분 소요)

### 방법 B: 파일 업로드로 교체
1. GitHub 레포 → **Add file** → **Upload files**
2. 수정된 파일 드래그
3. **Commit changes**

### 방법 C: Git 사용 (권장, 컴퓨터공학 전공이니 익숙하실 것)
```bash
git clone https://github.com/[아이디]/pcu-startup.git
cd pcu-startup
# 파일 수정 후
git add .
git commit -m "테스트 문항 수정"
git push origin main
```

---

## 심화 테스트 추가 예정 사항

- `test_adv.html` — 유형 진단 + BM 설계 + 시장 분석 포함 (30~40문항)
- 데이터는 `유형및아이템_심화` 시트에 자동 저장
- 네비게이션에 "심화 테스트" 메뉴 추가 예정

---

## 문의 / 오류

- Apps Script 오류: `apps_script.gs` 파일의 `doGet` 함수로 URL 직접 접속해서 "정상 작동 중" 뜨면 OK
- 데이터 미저장: 브라우저 콘솔(F12)에서 CORS 오류 여부 확인
- SHEET_URL이 `YOUR_APPS_SCRIPT_URL_HERE`로 되어 있으면 저장 안 됨 (의도적 비활성화 상태)
