// ╔══════════════════════════════════════════════════════════════╗
// ║          createPage.js — Netlify Serverless Function         ║
// ║      설문 결과 → AI 분석 → 템플릿 매칭 → GitHub 커밋          ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  [필수 환경변수] Netlify → Site configuration                 ║
// ║  → Environment variables 에 아래 항목 입력                   ║
// ║                                                              ║
// ║  GITHUB_TOKEN   : GitHub Personal Access Token               ║
// ║  GITHUB_OWNER   : GitHub 계정명 (예: jungyujin12)            ║
// ║  GITHUB_REPO    : 레포지토리명 (예: pcuportfolio)             ║
// ║                                                              ║
// ║  [AI 환경변수] 아래 중 하나만 입력하면 자동 감지               ║
// ║  GEMINI_API_KEY : Google AI Studio에서 발급                  ║
// ║  CLAUDE_API_KEY : Anthropic Console에서 발급                 ║
// ║                                                              ║
// ║  ※ AI 키 없으면 하드코딩 매칭으로 자동 폴백                   ║
// ║  ※ 템플릿 수정은 temp_base.js 만 건드리면 됨                  ║
// ╚══════════════════════════════════════════════════════════════╝

// 템플릿 파일 불러오기 (55종 레이아웃 + 매핑 데이터)
const { resolveTemplateId, resolveAccentColor, generateHTML } = require('./_temp_base');

exports.handler = async (event) => {
  const siteOrigin = process.env.SITE_ORIGIN || "https://pcu-startup.netlify.app";

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": siteOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    // 환경변수 로드
    const {
      GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO,
      GEMINI_API_KEY, CLAUDE_API_KEY, PORTFOLIO_ACCESS_CODE
    } = process.env;

    // 요청 바디 파싱
    const payload = JSON.parse(event.body || "{}");
    if (payload.action === "verify") {
      if (!PORTFOLIO_ACCESS_CODE) {
        return { statusCode: 503, body: JSON.stringify({ error: "PORTFOLIO_ACCESS_CODE 환경변수가 필요합니다." }) };
      }
      return payload.accessCode === PORTFOLIO_ACCESS_CODE
        ? { statusCode: 200, body: JSON.stringify({ ok: true }) }
        : { statusCode: 401, body: JSON.stringify({ error: "접근코드가 올바르지 않습니다." }) };
    }

    const {
      pageId, major, majorCategory, strength, company,
      oneLineDesc, interestFields, track,
      selfIntro, skills, experience, desiredJob,
      useAiIntro, useAiJob, useAiOneLine,
      idPhoto, appealPhotos,
      // 창업 전용 필드
      stage, fields, team, itemDesc, motivation, vision, hasItem,
      useAiItem, useAiMotiv, useAiVision,
      accessCode,
    } = payload;

    if (track === "startup" && (!PORTFOLIO_ACCESS_CODE || accessCode !== PORTFOLIO_ACCESS_CODE)) {
      return { statusCode: 401, body: JSON.stringify({ error: "접근코드가 올바르지 않습니다." }) };
    }
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      throw new Error("GitHub 환경변수 누락: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO 확인");
    }

    // ID 형식 검증
    if (!pageId || !/^[a-z0-9\-]+$/.test(pageId)) {
      return { statusCode: 400, body: JSON.stringify({ error: "pageId는 필수이며 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다." }) };
    }

    // GitHub API 설정
    const filePath  = `${pageId}.html`;
    const apiBase   = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    const ghHeaders = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    };

    // 중복 ID 체크
    const checkRes = await fetch(apiBase, { headers: ghHeaders });
    if (checkRes.status === 200) {
      return { statusCode: 409, body: JSON.stringify({ error: "이미 사용 중인 주소입니다. 다른 ID를 입력해주세요." }) };
    }

    // ── 창업 트랙 분기
    if (track === 'startup') {
      return await handleStartup({
        pageId, major, stage, fields, team,
        itemDesc, motivation, skills, vision,
        useAiItem, useAiMotiv, useAiVision,
        appealPhotos,
        apiBase, ghHeaders, GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN, CLAUDE_API_KEY,
      });
    }

    // ── 취업 트랙 (기존 로직)
    // 필수 필드 검증
    if (!major || !oneLineDesc) {
      return { statusCode: 400, body: JSON.stringify({ error: "major, oneLineDesc는 필수입니다." }) };
    }
    // 회사 선택됨 → 하드코딩 우선 (정확도 보장)
    // 회사 미선택 → 전공+강점 하드코딩 매핑
    const category = majorCategory || major;
    let templateId = resolveTemplateId(company, category, strength);
    console.log("=== 템플릿 매칭 결과 ===");
    console.log("major:", category, "strength:", strength, "company:", company);
    console.log("templateId:", templateId);

    // Claude 브랜딩 생성
    let headline = null, subheadline = null, refinedOneLine = null, sectionTitles = null;
    let refinedIntro = null, refinedJob = null, refinedSkills = null, refinedExp = null, closingMessage = null;

    if (CLAUDE_API_KEY) {
      try {
        const branding = await getClaudeBranding({
          major: category, strength, company,
          interestFields, selfIntro, desiredJob,
          skills, experience,
          CLAUDE_API_KEY
        });
        headline       = branding.headline;
        subheadline    = branding.subheadline;
        refinedOneLine = branding.refinedOneLine;
        sectionTitles  = branding.sectionTitles;
        refinedIntro   = branding.refinedIntro;
        refinedJob     = branding.refinedJob;
        refinedSkills  = branding.refinedSkills;
        refinedExp     = branding.refinedExp;
        closingMessage = branding.closingMessage;
        console.log("Claude 브랜딩 결과:", JSON.stringify({ headline, subheadline, sectionTitles }));
      } catch (e) {
        console.error("Claude 브랜딩 호출 오류:", e.message);
      }
    } else {
      console.log("CLAUDE_API_KEY 없음 → 브랜딩 스킵");
    }

    // ── 이미지 GitHub 커밋 (있을 경우)
    let idPhotoUrl = null;
    let appealPhotoUrls = [];

    if (idPhoto) {
      const path = `images/${pageId}/id.jpg`;
      await commitImageToGithub(path, idPhoto, `Add id photo: ${pageId}`, ghHeaders, GITHUB_OWNER, GITHUB_REPO);
      idPhotoUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${path}`;
    }

    if (appealPhotos && appealPhotos.length > 0) {
      for (let i = 0; i < appealPhotos.length; i++) {
        const path = `images/${pageId}/appeal_${i+1}.jpg`;
        await commitImageToGithub(path, appealPhotos[i], `Add appeal photo: ${pageId}-${i+1}`, ghHeaders, GITHUB_OWNER, GITHUB_REPO);
        appealPhotoUrls.push(`https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${path}`);
      }
    }

    const htmlContent = generateHTML({
      pageId, major, majorCategory, strength, company,
      oneLineDesc:    (useAiOneLine !== false ? refinedOneLine : null) || oneLineDesc || "",
      interestFields: interestFields || [],
      selfIntro:      (useAiIntro !== false ? refinedIntro  : null) || selfIntro   || "",
      skills:         refinedSkills  || skills      || "",
      experience:     refinedExp     || experience  || "",
      desiredJob:     (useAiJob   !== false ? refinedJob    : null) || desiredJob  || "",
      idPhotoUrl, appealPhotoUrls,
      headline:       headline       || "",
      subheadline:    subheadline    || "",
      sectionTitles:  sectionTitles  || null,
      closingMessage: closingMessage || "",
      templateId,
    });

    // Base64 인코딩 후 GitHub 커밋
    const encoded   = Buffer.from(htmlContent, "utf-8").toString("base64");
    const commitRes = await fetch(apiBase, {
      method: "PUT",
      headers: ghHeaders,
      body: JSON.stringify({ message: `Add portfolio: ${pageId}`, content: encoded }),
    });

    if (!commitRes.ok) {
      const err = await commitRes.json();
      throw new Error(err.message || "GitHub API 오류");
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": siteOrigin },
      body: JSON.stringify({
        success: true,
        pageUrl: `https://pcuportfolio.kro.kr/${pageId}.html`,
        templateId,
      }),
    };

  } catch (error) {
    console.error("createPage 오류:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "페이지 생성 실패", message: error.message }) };
  }
};

// ════════════════════════════════════════
// 이미지 GitHub 커밋 헬퍼
// ════════════════════════════════════════
async function commitImageToGithub(path, base64Data, message, headers, owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({ message, content: base64Data }),
  });
  if (!res.ok) {
    const err = await res.json();
    console.error("이미지 커밋 실패:", err.message);
  }
}


// ════════════════════════════════════════
// Gemini API 호출
// ════════════════════════════════════════
async function getTemplateIdFromGemini({ major, strength, company, interestFields, GEMINI_API_KEY }) {
  const prompt = buildPrompt(major, strength, company, interestFields);
  try {
    const res  = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 10, temperature: 0 },
        }),
      }
    );
    const data  = await res.json();
    const raw   = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    console.log("Gemini 응답 원문:", raw);
    console.log("Gemini 전체 응답:", JSON.stringify(data).substring(0, 300));
    const match = raw.match(/T\d{2}/);
    return match ? match[0] : null;
  } catch (e) {
    console.error("Gemini 오류:", e.message);
    return null;
  }
}


// ════════════════════════════════════════
// Claude API 호출 — 브랜딩 카피라이터
// 역할: 템플릿 선택 X → 브랜딩 텍스트 생성 O
// ════════════════════════════════════════
async function getClaudeBranding({ major, strength, company, interestFields, selfIntro, desiredJob, skills, experience, CLAUDE_API_KEY }) {
  const prompt = buildBrandingPrompt(major, strength, company, interestFields, selfIntro, desiredJob, skills, experience, oneLineDesc);
  try {
    console.log("Claude 브랜딩 API 호출 시작");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    console.log("Claude 브랜딩 응답 status:", res.status);
    const raw  = (data.content?.[0]?.text?.trim() || "")
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    console.log("Claude 브랜딩 raw:", raw.substring(0, 300));

    try {
      const parsed = JSON.parse(raw);
      return {
        headline:       parsed.headline       || null,
        subheadline:    parsed.subheadline    || null,
        refinedOneLine: parsed.refinedOneLine  || null,
        sectionTitles:  parsed.sectionTitles  || null,
        refinedIntro:   parsed.refinedIntro   || null,
        refinedJob:     parsed.refinedJob     || null,
        refinedSkills:  parsed.refinedSkills  || null,
        refinedExp:     parsed.refinedExp     || null,
        closingMessage: parsed.closingMessage || null,
      };
    } catch(e) {
      console.error("Claude 브랜딩 JSON 파싱 실패:", raw.substring(0, 100));
      return { headline: null, subheadline: null, refinedOneLine: null, sectionTitles: null, refinedIntro: null, refinedJob: null, refinedSkills: null, refinedExp: null, closingMessage: null };
    }
  } catch (e) {
    console.error("Claude 브랜딩 fetch 오류:", e.message);
    return { headline: null, subheadline: null, refinedOneLine: null, sectionTitles: null, refinedIntro: null, refinedJob: null, refinedSkills: null, refinedExp: null, closingMessage: null };
  }
}


// ════════════════════════════════════════
// 브랜딩 프롬프트
// ════════════════════════════════════════
function buildBrandingPrompt(major, strength, company, interestFields, selfIntro, desiredJob, skills, experience, oneLineDesc) {
  return `당신은 대학생 포트폴리오 브랜딩 카피라이터입니다.
아래 학생 정보를 분석하여 개인화된 브랜딩 텍스트를 JSON 형식으로만 반환하세요.
백틱이나 마크다운 없이 순수 JSON만 반환하세요.

[학생 정보]
- 전공 계열: ${major}
- 강점 스타일: ${strength || "미선택"}
- 롤모델 기업: ${company || "미선택"}
- 관심 분야: ${(interestFields || []).join(", ") || "미선택"}
- 희망 직무: ${desiredJob || "없음"}
- 한 줄 소개: ${oneLineDesc || "없음"}
- 자기소개: ${selfIntro || "없음"}
- 스킬/자격증: ${skills || "없음"}
- 경험/활동: ${experience || "없음"}

[반환 형식]
{
  "headline": "학생 정체성을 표현하는 한 줄 (15자 이내, 한국어)",
  "subheadline": "headline을 보완하는 한 문장 (30자 이내, 한국어, 따뜻하고 진솔하게)",
  "refinedOneLine": "한 줄 소개를 더 매력적으로 다듬은 버전 (20자 이내, 없으면 전공+강점 기반으로 생성)",
  "sectionTitles": {
    "photo": "사진 섹션 제목 (10자 이내)",
    "intro": "자기소개 섹션 제목 (10자 이내)",
    "job": "희망직무 섹션 제목 (10자 이내)",
    "skills": "스킬 섹션 제목 (10자 이내)",
    "exp": "경험 섹션 제목 (10자 이내)"
  },
  "refinedIntro": "자기소개를 포트폴리오 톤으로 자연스럽게 다듬은 버전 (원문 의미 유지, 100자 이내, 없으면 전공+강점 기반으로 생성)",
  "refinedJob": "희망 직무를 구체적이고 매력적으로 다듬은 버전 (20자 이내, 없으면 전공+관심분야 기반으로 추천)",
  "refinedSkills": "스킬/자격증을 보기 좋게 쉼표로 구분 정리 (원문 유지하되 오타 교정, 없으면 null)",
  "refinedExp": "경험/활동을 임팩트 있는 문장으로 재구성 (원문 의미 유지, 줄바꿈 유지, 없으면 null)",
  "closingMessage": "페이지 마무리 메시지 한 문장 (30자 이내, 희망직무+강점 기반, 따뜻하고 진솔하게)"
}

[예시 — 유아교육과 + 돌봄형 + 유치원]
{
  "headline": "아이들의 웃음을 만드는 사람",
  "subheadline": "작은 손을 잡고 함께 성장합니다",
  "sectionTitles": {
    "photo": "나의 순간들",
    "intro": "나를 움직이는 것",
    "job": "가고 싶은 곳",
    "skills": "내가 가진 것들",
    "exp": "함께한 시간들"
  },
  "refinedIntro": "아이들의 눈빛에서 가능성을 발견합니다. 유아교육을 통해 아이들과 함께 성장하는 보육교사가 되고 싶습니다.",
  "refinedJob": "영유아 발달 전문 보육교사",
  "refinedSkills": "보육교사 2급, 응급처치 자격증, 아동미술지도사",
  "refinedExp": "- 어린이집 현장 실습 3개월\n- 또래상담 교내활동 2년",
  "closingMessage": "아이들과 함께 매일 성장하는 보육교사가 되겠습니다."
}`;
}


// ════════════════════════════════════════
// 창업 트랙 핸들러
// Claude가 HTML 전체 생성
// ════════════════════════════════════════
async function handleStartup({ pageId, major, fields, hasItem, itemDesc, motivation, vision,
  useAiItem, useAiMotiv, useAiVision, appealPhotos,
  apiBase, ghHeaders, GITHUB_OWNER, GITHUB_REPO, CLAUDE_API_KEY }) {

  const hasItemLabel = hasItem === 'yes' ? '아이템 확정' : '아이디어 단계';

  // 이미지 GitHub 커밋
  const appealPhotoUrls = [];
  if (appealPhotos && appealPhotos.length > 0) {
    for (let i = 0; i < appealPhotos.length; i++) {
      const path = `images/${pageId}/appeal_${i+1}.jpg`;
      await commitImageToGithub(path, appealPhotos[i], `Add startup image: ${pageId}-${i+1}`, ghHeaders, GITHUB_OWNER, GITHUB_REPO);
      appealPhotoUrls.push(`https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${path}`);
    }
  }

  const prompt = hasItem === 'yes' ? `당신은 대학생 창업 포트폴리오 디자이너입니다.
아래 창업자 정보를 바탕으로 완성된 HTML 포트폴리오 페이지를 생성해주세요.

[창업자 정보]
- 전공: ${major || "미입력"}
- 창업 분야: ${(fields || []).join(", ") || "미입력"}
- 아이템 소개: ${itemDesc || "미입력"}
- 창업 동기: ${useAiMotiv ? (motivation || "미입력") : "비공개"}
- 목표/비전: ${useAiVision ? (vision || "미입력") : "비공개"}
- 대표 이미지: ${appealPhotoUrls.length > 0 ? appealPhotoUrls.join(", ") : "없음"}

[디자인 요구사항]
- 아이템 확정 단계 → 서비스/제품 소개 중심, 임팩트 있는 피치덱 스타일
- 다크 배경 (#0a0e1a 계열) + 포인트 컬러 (분야별: IT=파랑#00c8ff, 식품=그린#00e676, 패션=핑크#f06292, 사회=오렌지#ff6d00, 기타=보라#7c4dff)
- Bebas Neue + Noto Sans KR 폰트 (Google Fonts CDN 포함)
- 모바일 반응형 (max-width: 680px 기준)
- 이미지가 있으면 크게 표시 (풀와이드 or 그리드)
- 페이지 하단: "배재대학교 창업지원팀" + "pcuportfolio.kro.kr/${pageId}"
- AI 다듬기: 아이템소개(${useAiItem ? 'YES' : 'NO'}), 동기(${useAiMotiv ? 'YES' : 'NO'}), 비전(${useAiVision ? 'YES' : 'NO'})
- YES 항목은 더 매력적이고 설득력 있는 문구로 개선

[주의사항]
- 완성된 HTML만 반환 (설명 없이)
- <!DOCTYPE html>부터 </html>까지 전체
- 인라인 CSS (외부 파일 없음)
- 이미지 태그: <img src="URL" style="width:100%;..." alt="..."/>`

: `당신은 대학생 창업 아이디어 포트폴리오 디자이너입니다.
아래 정보를 바탕으로 아이디어 소개 + AI 아이템 추천이 포함된 HTML 페이지를 생성해주세요.

[창업자 정보]
- 전공: ${major || "미입력"}
- 관심 창업 분야: ${(fields || []).join(", ") || "미입력"}
- 해결하고 싶은 문제: ${itemDesc || "미입력"}
- 관심 계기: ${useAiMotiv ? (motivation || "미입력") : "비공개"}
- 대표 이미지: ${appealPhotoUrls.length > 0 ? appealPhotoUrls.join(", ") : "없음"}

[페이지 구성 요구사항]
1. 창업자 소개 섹션 (전공, 관심분야, 해결하고 싶은 문제)
2. AI 아이템 추천 섹션: 입력한 문제/분야를 분석해서 3가지 창업 아이디어 추천
   - 각 아이디어: 아이템명 + 한줄설명 + 왜 이 사람에게 맞는지
3. 다음 단계 안내 섹션 (배재대 창업지원팀 연락처 안내)

[디자인 요구사항]
- 아이디어 단계 → 따뜻하고 가능성 있는 스타일, 희망적인 톤
- 다크 배경 (#0a0e1a 계열) + 포인트 컬러 (분야별: IT=파랑#00c8ff, 식품=그린#00e676, 패션=핑크#f06292, 사회=오렌지#ff6d00, 기타=보라#7c4dff)
- Bebas Neue + Noto Sans KR 폰트 (Google Fonts CDN 포함)
- 모바일 반응형
- 이미지가 있으면 표시
- 페이지 하단: "배재대학교 창업지원팀" + "pcuportfolio.kro.kr/${pageId}"

[주의사항]
- 완성된 HTML만 반환 (설명 없이)
- <!DOCTYPE html>부터 </html>까지 전체
- 인라인 CSS (외부 파일 없음)`;

  console.log("창업 Claude HTML 생성 시작");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  let html = data.content?.[0]?.text?.trim() || "";
  console.log("창업 Claude HTML 생성 완료, 길이:", html.length);

  // HTML 태그 추출
  html = html.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  if (!html.includes("<!DOCTYPE")) {
    throw new Error("HTML 생성 실패");
  }

  // GitHub 커밋
  const encoded = Buffer.from(html, "utf-8").toString("base64");
  const commitRes = await fetch(apiBase, {
    method: "PUT",
    headers: ghHeaders,
    body: JSON.stringify({ message: `Add startup portfolio: ${pageId}`, content: encoded }),
  });

  if (!commitRes.ok) {
    const err = await commitRes.json();
    throw new Error(err.message || "GitHub API 오류");
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": siteOrigin },
    body: JSON.stringify({
      success: true,
      pageUrl: `https://pcuportfolio.kro.kr/${pageId}.html`,
      track: "startup",
    }),
  };
}


// ════════════════════════════════════════
// 고정 프롬프트 (T01~T55 전체 포함)
// ════════════════════════════════════════
function buildPrompt(major, strength, company, interestFields) {
  return `당신은 대학생 포트폴리오 디자인 전문가입니다.
아래 학생 정보를 분석하여 가장 적합한 템플릿 ID 하나만 반환하세요.
다른 설명 없이 템플릿 ID(예: T01)만 반환하세요.

[학생 정보]
- 전공 계열: ${major}
- 강점 스타일: ${strength || "미선택"}
- 롤모델 기업: ${company || "미선택"}
- 관심 분야: ${(interestFields || []).join(", ") || "미선택"}

[템플릿 목록 — 회사명이 있으면 해당 회사 템플릿 우선 선택]
T01: 토스 — IT/분석형, 다크블루, 미니멀 세로카드
T02: 무신사 — 패션/게임, 풀블랙 그리드
T03: 네이버 — 경영/IT/연결형, 그린 2컬럼 사이드바
T04: 당근 — 사회/복지/연결형, 오렌지 라운드카드
T05: 올리브영 — 보건/식품/돌봄형, 그린 그리드
T06: 삼성전자 — 공학/제조/분석형, 네이비 풀스크린
T07: 쿠팡 — 커머스/실행형, 레드 배너
T08: 아모레퍼시픽 — 뷰티/표현형, 핑크 감성
T09: CJ ENM — 미디어/콘텐츠/아이디어형, 퍼플+골드
T10: 농심 — 식품/보건/분석형, 라임그린
T11: 카카오 — 플랫폼/교육/연결형, 옐로우 라운드
T12: LG전자 — 전기/공학/실행형, 레드+실버
T13: 나이키 — 스포츠/실행형, B&W 임팩트
T14: 야놀자 — 관광/레저/아이디어형, 핑크+블루
T15: 경찰청 — 경찰/법/행정/돌봄형, 네이비 공식
T16: 코레일 — 공기업/철도/가스, 블루+회색
T17: 크래프톤 — 게임/IT/아이디어형, 다크+네온
T18: 교육부 — 교육/복지/상담/돌봄형, 크림+브라운
T19: 스타트업 — 창업/융합/아이디어형, 화이트 피치덱
T20: Adobe — 디자인/미디어/표현형, 레드+다크
T21: 원티드 — HR테크/취업/연결형, 퍼플 프로필카드
T22: 라인 — 글로벌IT/연결형, 그린 채팅버블
T23: SK하이닉스 — 반도체/공학, 오렌지 회로기판
T24: 삼성바이오 — 바이오/생명과학, 청록 논문형
T25: 현대자동차 — 모빌리티/공학, 다크실버 속도감
T26: 롯데 — 유통/커머스, 레드 쇼핑몰배너
T27: 신세계 — 럭셔리/유통, 블랙+골드 에디토리얼
T28: 배달의민족 — F&B/커머스/유쾌함, 옐로우 메뉴판
T29: JTBC — 방송/뉴스/미디어, 블루 뉴스룸
T30: MBC — 방송/엔터/미디어, 퍼플 큐시트
T31: KBS — 공영방송/미디어, 블루 아카이브
T32: EBS — 교육방송/학습, 옐로우 플래시카드
T33: 풀무원 — 식품/자연/보건, 그린 패키지
T34: 유한양행 — 제약/의료, 블루 처방전
T35: 대웅제약 — 제약/의료/분석형, 블루 의료대시보드
T36: CJ제일제당 — 식품/F&B, 레드 레시피카드
T37: 아디다스 — 스포츠/패션, 흑백 3선스트라이프
T38: 리복 — 스포츠/역동, 레드+네이비 대각선
T39: 뉴발란스 — 스포츠/미니멀, 그레이+포인트
T40: 휠라 — 스포츠/빈티지, 네이비+크림 헤리티지
T41: 하나투어 — 관광/여행, 그린 항공권
T42: 스포티비 — 스포츠미디어, 그린 스코어보드
T43: KBO — 야구/스포츠, 블루 선수카드
T44: K리그 — 축구/스포츠, 그린 선수카드
T45: 법원 — 법/행정, 골드+블랙 판결문
T46: 행정안전부 — 행정/공공, 블루 공문서
T47: 소방청 — 소방/공공/긴급, 레드 대시보드
T48: 한국가스공사 — 에너지/공기업, 블루 파이프라인
T49: 국민건강보험공단 — 보건/공공, 그린 건강검진표
T50: 법무법인 — 법률/전문직, 골드+다크 계약서
T51: 사회복지관 — 복지/돌봄/사회, 오렌지 포스트잇게시판
T52: 상담센터 — 심리상담/복지, 퍼플 마인드맵버블
T53: 유치원/어린이집 — 유아교육/돌봄, 무지개 스티커북
T54: NGO — 사회혁신/공익, 그린 소셜임팩트
T55: 출판사 — 출판/인문/기획, 크림+브라운 북커버`;
}
