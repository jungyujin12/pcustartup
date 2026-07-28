// ╔══════════════════════════════════════════════════════════════╗
// ║                      temp_base.js                           ║
// ║           포트폴리오 템플릿 55종 정의 파일                     ║
// ║   createPage.js에서 require('./temp_base')로 불러옴           ║
// ║                                                              ║
// ║   수정 시 해당 파일만 건드리면 됨                               ║
// ║   T01~T20: 이 파일 (temp_base.js)                            ║
// ║   T21~T30: temp_21_30.js                                    ║
// ║   T31~T40: temp_31_40.js                                    ║
// ║   T41~T50: temp_41_50.js                                    ║
// ║   T51~T55: temp_51_55.js                                    ║
// ╚══════════════════════════════════════════════════════════════╝

// ── 회사 → 템플릿 ID 매핑 (55개 1:1)
const COMPANY_TO_TEMPLATE = {
  // T01 토스 미니멀
  toss: "T01",
  // T02 무신사 블랙
  musinsa: "T02",
  // T03 네이버 클린
  naver: "T03",
  // T04 당근 로컬
  daangn: "T04",
  // T05 올리브영 웰니스
  oliveyoung: "T05",
  // T06 삼성 프리미엄
  samsung: "T06",
  // T07 쿠팡 임팩트
  coupang: "T07",
  // T08 아모레 뷰티
  amore: "T08",
  // T09 CJ ENM 엔터
  cjenm: "T09",
  // T10 농심 식품
  nongshim: "T10",
  // T11 카카오 친근
  kakao: "T11",
  // T12 LG 이노베이션
  lg: "T12",
  // T13 나이키 스포츠
  nike: "T13",
  // T14 야놀자 레저
  yanolja: "T14",
  // T15 경찰청 공공기관
  police: "T15",
  // T16 코레일 공기업
  korail: "T16",
  // T17 크래프톤 게임
  krafton: "T17",
  // T18 교육부 따뜻함
  gyoyuk: "T18",
  // T19 스타트업 피치
  startup: "T19",
  // T20 어도비 크리에이티브
  adobe: "T20",
  // T21~T55 고유 템플릿
  wanted:      "T21",
  line:        "T22",
  skhynix:     "T23",
  samsung_bio: "T24",
  hyundai:     "T25",
  lotte:       "T26",
  shinsegae:   "T27",
  baemin:      "T28",
  jtbc:        "T29",
  mbc:         "T30",
  kbs:         "T31",
  ebs:         "T32",
  pulmuone:    "T33",
  yuhan:       "T34",
  daewoong:    "T35",
  cjfoods:     "T36",
  adidas:      "T37",
  reebok:      "T38",
  newbalance:  "T39",
  fila:        "T40",
  hana:        "T41",
  sportv:      "T42",
  kbo:         "T43",
  kleague:     "T44",
  court:       "T45",
  mois:        "T46",
  fire:        "T47",
  kogas:       "T48",
  nhis:        "T49",
  lawfirm:     "T50",
  welfare:     "T51",
  counsel:     "T52",
  yupia:       "T53",
  ngo:         "T54",
  publish:     "T55",
};

// ── 전공+강점 → 템플릿 ID 매핑 (회사 미선택 시)
const MAJOR_STRENGTH_TO_TEMPLATE = {
  "공학·IT":            { "아이디어형":"T01", "실행형":"T19", "분석형":"T06", "연결형":"T03", "표현형":"T20", "돌봄형":"T05" },
  "경영·관광":          { "아이디어형":"T19", "실행형":"T07", "분석형":"T03", "연결형":"T04", "표현형":"T09", "돌봄형":"T18" },
  "예술·디자인·미디어": { "아이디어형":"T20", "실행형":"T02", "분석형":"T09", "연결형":"T08", "표현형":"T20", "돌봄형":"T08" },
  "생명·식품·보건":     { "아이디어형":"T10", "실행형":"T05", "분석형":"T10", "연결형":"T05", "표현형":"T08", "돌봄형":"T18" },
  "인문·사회":          { "아이디어형":"T09", "실행형":"T04", "분석형":"T03", "연결형":"T18", "표현형":"T09", "돌봄형":"T18" },
  "법·행정":            { "아이디어형":"T15", "실행형":"T15", "분석형":"T16", "연결형":"T16", "표현형":"T09", "돌봄형":"T18" },
  "스포츠":             { "아이디어형":"T14", "실행형":"T13", "분석형":"T13", "연결형":"T14", "표현형":"T09", "돌봄형":"T18" },
  "기초·중점교육":      { "아이디어형":"T18", "실행형":"T18", "분석형":"T03", "연결형":"T18", "표현형":"T09", "돌봄형":"T18" },
  "융합·자율":          { "아이디어형":"T19", "실행형":"T19", "분석형":"T01", "연결형":"T04", "표현형":"T20", "돌봄형":"T18" },
};

// ── 템플릿 ID 결정 함수 (company 우선, 없으면 전공+강점)
function resolveTemplateId(company, major, strength) {
  if (company && COMPANY_TO_TEMPLATE[company]) return COMPANY_TO_TEMPLATE[company];
  return MAJOR_STRENGTH_TO_TEMPLATE[major]?.[strength] || "T01";
}

// ── 전공 계열 → 포인트 컬러 매핑
// 회사별 레이아웃은 고정, 이 컬러가 전공에 따라 변형됨
const MAJOR_TO_ACCENT = {
  "공학·IT":            { accent: "#00c8ff", glow: "#00c8ff33", tag: "#001e2e", surface2: "#0a1f2e" },
  "경영·관광":          { accent: "#00e676", glow: "#00e67633", tag: "#001e10", surface2: "#0a2018" },
  "예술·디자인·미디어": { accent: "#d500f9", glow: "#d500f933", tag: "#1e0028", surface2: "#1a0228" },
  "생명·식품·보건":     { accent: "#00bfa5", glow: "#00bfa533", tag: "#001e1a", surface2: "#0a2020" },
  "인문·사회":          { accent: "#ffca28", glow: "#ffca2833", tag: "#1e1800", surface2: "#1a1400" },
  "법·행정":            { accent: "#7c4dff", glow: "#7c4dff33", tag: "#0e0028", surface2: "#100830" },
  "스포츠":             { accent: "#ff6d00", glow: "#ff6d0033", tag: "#1e0e00", surface2: "#1a0c00" },
  "기초·중점교육":      { accent: "#26c6da", glow: "#26c6da33", tag: "#001c1e", surface2: "#0a1c20" },
  "융합·자율":          { accent: "#ec407a", glow: "#ec407a33", tag: "#1e0010", surface2: "#1a0018" },
};

// ── 전공 계열 → 포인트 컬러 반환
function resolveAccentColor(majorCategory) {
  return MAJOR_TO_ACCENT[majorCategory] || MAJOR_TO_ACCENT["융합·자율"];
}

// ════════════════════════════════════════════════════════════
// HTML 템플릿 생성 함수 (55종)
// ════════════════════════════════════════════════════════════
function generateHTML({ pageId, major, majorCategory, strength, company, oneLineDesc, interestFields, templateId,
  selfIntro, skills, experience, desiredJob, idPhotoUrl, appealPhotoUrls, headline, subheadline, sectionTitles, closingMessage }) {
  const tags      = Array.isArray(interestFields) ? interestFields : [];
  const createdAt = new Date().toLocaleDateString("ko-KR", { year:"numeric", month:"long", day:"numeric" });
  const category  = majorCategory || major;

  // 전공별 포인트 컬러 (레이아웃은 회사별 고정, 색상은 전공별 변형)
  const ac = resolveAccentColor(category);

  const majorComments = {
    "공학·IT":            "기술로 세상의 문제를 해결하는",
    "경영·관광":          "비즈니스 감각과 글로벌 시각을 갖춘",
    "예술·디자인·미디어": "창의적 표현으로 가치를 만드는",
    "생명·식품·보건":     "사람의 건강과 삶을 연구하는",
    "인문·사회":          "사람과 사회를 깊이 이해하는",
    "법·행정":            "법과 질서로 사회를 지키는",
    "스포츠":             "몸과 마음의 한계에 도전하는",
    "기초·중점교육":      "배움의 가치를 믿는",
    "융합·자율":          "경계를 넘나드는 융합형",
  };

  const strengthKeywords = {
    "아이디어형": ["기획력", "창의성", "미래지향"],
    "실행형":     ["실행력", "추진력", "결과중심"],
    "분석형":     ["데이터분석", "논리적사고", "문제해결"],
    "연결형":     ["네트워킹", "협업", "커뮤니케이션"],
    "표현형":     ["스토리텔링", "브랜딩", "콘텐츠"],
    "돌봄형":     ["공감능력", "사회적가치", "팀워크"],
  };

  const companyNames = {
    toss:"토스", kakao:"카카오", naver:"네이버", musinsa:"무신사",
    oliveyoung:"올리브영", coupang:"쿠팡", baemin:"배달의민족", daangn:"당근",
    samsung:"삼성전자", lg:"LG전자", hyundai:"현대자동차", lotte:"롯데",
    shinsegae:"신세계", hana:"하나투어", yanolja:"야놀자", line:"라인",
    skhynix:"SK하이닉스", cjenm:"CJ ENM", jtbc:"JTBC", kbs:"KBS",
    mbc:"MBC", amore:"아모레퍼시픽", cjfoods:"CJ제일제당", pulmuone:"풀무원",
    samsung_bio:"삼성바이오로직스", daewoong:"대웅제약", yuhan:"유한양행",
    nongshim:"농심", police:"경찰청", court:"법원", mois:"행정안전부",
    fire:"소방청", kogas:"한국가스공사", korail:"코레일", lawfirm:"법무법인",
    nhis:"국민건강보험공단", nike:"나이키", adidas:"아디다스", fila:"휠라",
    sportv:"스포티비", kbo:"KBO 구단", kleague:"K리그 구단",
    newbalance:"뉴발란스", reebok:"리복", wanted:"원티드", krafton:"크래프톤",
    adobe:"Adobe", gyoyuk:"교육부", welfare:"사회복지관", counsel:"상담센터",
    publish:"출판사", ngo:"NGO", yupia:"유치원/어린이집", ebs:"EBS", startup:"스타트업",
  };

  const keywords    = strengthKeywords[strength] || [];
  const majorComment = majorComments[category] || "가능성을 탐색하는";
  const companyName  = companyNames[company] || "";
  const tagStr       = tags.map(t => `<span class="tag">${t}</span>`).join("");
  const keywordStr   = keywords.map(k => `<span class="kw">#${k}</span>`).join("");
  const footer       = `<footer><span>pcuportfolio.kro.kr/${pageId} · ${createdAt}</span><a href="https://pcu-startup.netlify.app" target="_blank">배재대학교 창업지원팀</a></footer>`;
  const gfonts       = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@300;400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>`;

  // ── 공통 추가 섹션 HTML (그룹별 FLOW + 스타일 분기)
  const extraSections = buildExtraSections({
    selfIntro, skills, experience, desiredJob,
    idPhotoUrl, appealPhotoUrls, ac, templateId,
    tags, tagStr, keywords, keywordStr, strength, companyName,
    sectionTitles, closingMessage: closingMessage || "",
  });

  // ── subheadline Hero 삽입용
  const subheadlineHtml = subheadline
    ? `<div style="font-size:0.92rem;opacity:0.7;margin-top:0.4rem;font-weight:300;font-style:italic">${subheadline}</div>`
    : "";

  // ── 공통 메타태그
  const meta = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${oneLineDesc} | PCU Portfolio</title>
  <meta name="description" content="${major} · ${oneLineDesc}"/>
  ${gfonts}`;

  // ── 공통 파라미터 (모든 외부 템플릿 파일에 전달)
  const commonParams = {
    pageId, major, strength, company, oneLineDesc,
    tags, keywords, companyName, createdAt, ac,
    tagStr, keywordStr, footer, gfonts, meta,
    majorCategory, extraSections,
    headline: headline || "",
    subheadline: subheadline || "",
    subheadlineHtml,
  };

  // T21~T30 템플릿 확인
  if (templateId >= "T21" && templateId <= "T30") {
    const t = getT21to30(commonParams);
    if (t[templateId]) return t[templateId];
  }

  // T31~T40 템플릿 확인
  if (templateId >= "T31" && templateId <= "T40") {
    const t = getT31to40(commonParams);
    if (t[templateId]) return t[templateId];
  }

  // T41~T50 템플릿 확인
  if (templateId >= "T41" && templateId <= "T50") {
    const t = getT41to50(commonParams);
    if (t[templateId]) return t[templateId];
  }

  // T51~T55 템플릿 확인
  if (templateId >= "T51" && templateId <= "T55") {
    const t = getT51to55(commonParams);
    if (t[templateId]) return t[templateId];
  }

  // ════════════════════════════
  // T01 — 토스 미니멀
  // 특징: 여백 많음, 블루 포인트, 큰 숫자, 세로 카드
  // ════════════════════════════
  if (templateId === "T01") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0e1a;color:#f9fafb;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:6rem 3rem 4rem;max-width:680px;margin:0 auto}
    .badge{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:2rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,15vw,9rem);color:${ac.accent};line-height:0.9;letter-spacing:0.02em;text-shadow:0 0 80px ${ac.glow}}
    .hero-desc{font-size:1.2rem;font-weight:300;margin-top:1.5rem;opacity:0.8;line-height:1.6}
    .hero-meta{font-size:0.75rem;color:#6b7280;margin-top:0.75rem;letter-spacing:0.1em}
    .cards{max-width:680px;margin:0 auto;padding:0 3rem 4rem;display:flex;flex-direction:column;gap:1px}
    .card{background:#111827;padding:1.75rem 2rem;border-left:2px solid ${ac.accent}}
    .card-label{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem}
    .card-value{font-size:0.92rem;line-height:1.7;opacity:0.85}
    .tags{display:flex;flex-wrap:wrap;gap:0.4rem}
    .tag{background:${ac.tag};font-size:0.75rem;padding:0.25rem 0.7rem;border-radius:2px;color:${ac.accent}}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;color:${ac.accent};font-weight:700;letter-spacing:0.05em}
    footer{max-width:680px;margin:0 auto;padding:2rem 3rem;font-size:0.7rem;color:#374151;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:540px){.hero,.cards{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T02 — 무신사 블랙
  // 특징: 풀블랙, 강한 타이포, 그리드, 스트리트
  // ════════════════════════════
  if (templateId === "T02") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#000;color:#fff;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 2.5rem 3rem;border-bottom:1px solid #1f1f1f;position:relative;overflow:hidden}
    .hero::before{content:'${pageId.toUpperCase()}';position:absolute;font-family:'Bebas Neue',sans-serif;font-size:20vw;color:#0a0a0a;top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;pointer-events:none;letter-spacing:0.05em}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#666;margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);letter-spacing:0.04em;line-height:0.9;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;opacity:0.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:#444;margin-top:0.75rem;letter-spacing:0.1em;text-transform:uppercase}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#111;margin-top:1px}
    .cell{background:#000;padding:2rem 2.5rem}
    .cell-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#444;margin-bottom:0.75rem}
    .cell-value{font-size:0.9rem;line-height:1.6;color:#ccc}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1px solid #222;font-size:0.72rem;padding:0.2rem 0.6rem;color:#666}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:900;letter-spacing:0.08em}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem}
    footer{padding:2rem 2.5rem;font-size:0.65rem;color:#333;display:flex;justify-content:space-between;border-top:1px solid #111}
    footer a{color:#666;text-decoration:none}
    @media(max-width:540px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="grid">
    ${tags.length ? `<div class="cell"><div class="cell-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="cell"><div class="cell-label">강점</div><div class="cell-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="cell"><div class="cell-label">롤모델</div><div class="cell-value">${companyName}</div></div>` : ""}
    <div class="cell"><div class="cell-label">전공</div><div class="cell-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T03 — 네이버 클린
  // 특징: 좌우 2컬럼, 그린, 정보중심
  // ════════════════════════════
  if (templateId === "T03") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#001a08;color:#f0fff8;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#03c75a;padding:0.6rem 2rem;font-size:0.65rem;font-weight:700;letter-spacing:0.1em;color:#000}
    .layout{display:grid;grid-template-columns:300px 1fr;min-height:calc(100vh - 40px)}
    .sidebar{background:#002e10;padding:3rem 2rem;border-right:1px solid ${ac.tag}}
    .sidebar .id{font-family:'Bebas Neue',sans-serif;font-size:3.5rem;color:#03c75a;letter-spacing:0.04em;line-height:1;margin-bottom:1rem}
    .sidebar .desc{font-size:0.9rem;font-weight:300;opacity:0.8;line-height:1.6;margin-bottom:1.5rem}
    .sidebar .meta{font-size:0.7rem;color:#4d8060;letter-spacing:0.05em}
    .sidebar .kws{display:flex;flex-direction:column;gap:0.3rem;margin-top:1.5rem}
    .kw{font-size:0.72rem;color:${ac.accent};font-weight:700}
    .main{padding:3rem 2.5rem}
    .section{margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #003d18}
    .section:last-child{border-bottom:none}
    .sec-label{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.6rem}
    .sec-value{font-size:0.92rem;line-height:1.7;opacity:0.85}
    .tags{display:flex;flex-wrap:wrap;gap:0.4rem}
    .tag{background:#003d18;font-size:0.75rem;padding:0.25rem 0.7rem;border-radius:2px;color:#6ee7b7}
    footer{background:#002e10;padding:1.25rem 2.5rem;font-size:0.65rem;color:#4d8060;display:flex;justify-content:space-between;border-top:1px solid #003d18}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.7}
    @media(max-width:700px){.layout{grid-template-columns:1fr}.sidebar{padding:2rem 1.5rem}.main{padding:2rem 1.5rem}}
  </style>
</head>
<body>
  <div class="topbar">배재대학교 · 전공탐색 박람회 2026</div>
  <div class="layout">
    <div class="sidebar">
      <div class="id">${pageId}</div>
      <div class="desc">${oneLineDesc}</div>
      <div class="meta">${major}</div>
      ${keywords.length ? `<div class="kws">${keywords.map(k=>`<span class="kw">→ ${k}</span>`).join("")}</div>` : ""}
    </div>
    <div class="main">
      ${tags.length ? `<div class="section"><div class="sec-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="section"><div class="sec-label">강점 스타일</div><div class="sec-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="section"><div class="sec-label">롤모델 기업</div><div class="sec-value">${companyName}</div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T04 — 당근 로컬
  // 특징: 둥근 카드, 오렌지, 따뜻함
  // ════════════════════════════
  if (templateId === "T04") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff8f0;color:#1a0f00;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(135deg,#ff7002,#ff9634);padding:4rem 2.5rem 3rem;position:relative;overflow:hidden}
    .hero::after{content:'';position:absolute;bottom:-40px;left:-40px;width:200px;height:200px;background:rgba(255,255,255,0.1);border-radius:50%}
    .badge{font-size:0.6rem;letter-spacing:0.15em;color:rgba(255,255,255,0.7);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,6.5rem);color:#fff;letter-spacing:0.03em;line-height:0.95}
    .hero-desc{font-size:1.05rem;color:rgba(255,255,255,0.9);margin-top:1rem;font-weight:300;line-height:1.6}
    .hero-meta{font-size:0.75rem;color:rgba(255,255,255,0.6);margin-top:0.6rem}
    .cards{max-width:640px;margin:0 auto;padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem}
    .card{background:#fff;border-radius:16px;padding:1.5rem 1.75rem;box-shadow:0 2px 12px rgba(255,112,2,0.08)}
    .card-label{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.92rem;line-height:1.7;color:#3d2000}
    .tags{display:flex;flex-wrap:wrap;gap:0.4rem}
    .tag{background:${ac.tag};font-size:0.75rem;padding:0.25rem 0.75rem;border-radius:999px;color:${ac.accent}}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.72rem;color:${ac.accent};font-weight:700;background:${ac.tag};padding:0.2rem 0.6rem;border-radius:999px}
    footer{padding:1.5rem 2rem;font-size:0.7rem;color:#c4a882;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.7}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
  </div>
  <div class="cards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T05 — 올리브영 웰니스
  // 특징: 그린뱃지, 상품카드형, 헬스뷰티
  // ════════════════════════════
  if (templateId === "T05") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5fff9;color:#0a2e1a;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#00a862;color:#fff;padding:0.7rem 2rem;font-size:0.65rem;font-weight:700;letter-spacing:0.1em;display:flex;align-items:center;gap:0.5rem}
    .hero{padding:4rem 2.5rem 2.5rem;background:#fff;border-bottom:2px solid #00a862}
    .badge{display:inline-block;background:${ac.accent};color:#fff;font-size:0.6rem;padding:0.2rem 0.7rem;border-radius:2px;margin-bottom:1.25rem;letter-spacing:0.1em}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.95}
    .hero-desc{font-size:1rem;margin-top:0.75rem;color:#1a5c35;font-weight:300;line-height:1.6}
    .hero-meta{font-size:0.72rem;color:#4d8060;margin-top:0.5rem}
    .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;padding:2rem 2.5rem;max-width:720px;margin:0 auto}
    .card{background:#fff;border:1.5px solid #d1fae5;border-radius:8px;padding:1.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#00a862;margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.88rem;color:#0a2e1a;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:#ecfdf5;border:1px solid #a7f3d0;font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:4px;color:#065f46}
    .kws{display:flex;flex-wrap:wrap;gap:0.35rem}
    .kw{background:${ac.accent};color:#fff;font-size:0.68rem;padding:0.2rem 0.6rem;border-radius:4px;font-weight:700}
    footer{padding:1.5rem 2.5rem;font-size:0.65rem;color:#4d8060;display:flex;justify-content:space-between;border-top:1px solid #d1fae5}
    footer a{color:#00a862;text-decoration:none}
    @media(max-width:540px){.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="topbar">🌿 배재대학교 · 전공탐색 박람회 2026</div>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
  </div>
  <div class="grid">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T06 — 삼성 프리미엄
  // 특징: 풀스크린, 네이비, 고급감, 와이드
  // ════════════════════════════
  if (templateId === "T06") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#000d1a;color:#e8f0fe;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{min-height:60vh;display:flex;flex-direction:column;justify-content:flex-end;padding:5rem 4rem 4rem;background:linear-gradient(160deg,#000d1a 0%,#001529 60%,#001f3d 100%);position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;top:0;right:0;width:50%;height:100%;background:linear-gradient(135deg,transparent,#1428a011);pointer-events:none}
    .hero::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,#1428a0,#2563eb,#1428a0)}
    .badge{font-size:0.55rem;letter-spacing:0.3em;text-transform:uppercase;color:${ac.accent};margin-bottom:2rem;display:block;opacity:0.8}
    .hero-tagline{font-size:0.8rem;color:#4a6080;margin-bottom:0.5rem;letter-spacing:0.05em}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,14vw,10rem);color:#fff;letter-spacing:0.02em;line-height:0.88;text-shadow:0 0 100px #1428a033}
    .hero-desc{font-size:1.1rem;font-weight:300;margin-top:1.5rem;opacity:0.75;max-width:520px;line-height:1.5}
    .hero-meta{font-size:0.7rem;color:#2563eb;margin-top:1rem;letter-spacing:0.15em;text-transform:uppercase}
    .body{max-width:900px;margin:0 auto;padding:3rem 4rem 5rem;display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#001529}
    .card{background:#000d1a;padding:2rem 2.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;opacity:0.8}
    .card-value{font-size:0.9rem;line-height:1.7;opacity:0.8}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:700;letter-spacing:0.08em}
    footer{padding:2rem 4rem;font-size:0.65rem;color:#1e3a5f;display:flex;justify-content:space-between;border-top:1px solid #001529}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:700px){.hero{padding:4rem 1.5rem 3rem}.body{grid-template-columns:1fr;padding:2rem 1.5rem}.card{padding:1.5rem}.footer{padding:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-tagline">${majorComment}</div>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T07 — 쿠팡 임팩트
  // 특징: 레드 강조, 배너형, 실용적 CTA
  // ════════════════════════════
  if (templateId === "T07") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#1a0000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#e60012;color:#fff;padding:0.65rem 2rem;font-size:0.65rem;font-weight:700;letter-spacing:0.05em}
    .hero{background:#1a0000;color:#fff;padding:4rem 2.5rem 3rem;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;right:-60px;top:-60px;width:300px;height:300px;background:radial-gradient(circle,#e6001222,transparent 70%)}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.92;text-shadow:0 0 60px #e6001233}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.8;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:#7a4040;margin-top:0.6rem;letter-spacing:0.08em}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 2rem;display:flex;flex-direction:column;gap:0.75rem}
    .card{border:2px solid #ffe0e0;padding:1.5rem 1.75rem;border-radius:4px}
    .card-label{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#3d0000}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:2px;color:${ac.accent}}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap}
    .kw{font-size:0.7rem;color:${ac.accent};font-weight:900;letter-spacing:0.05em}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#c4a0a0;display:flex;justify-content:space-between;border-top:2px solid #ffe0e0}
    footer a{color:${ac.accent};text-decoration:none}
  </style>
</head>
<body>
  <div class="topbar">🛒 배재대학교 · 전공탐색 박람회 2026</div>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T08 — 아모레 뷰티
  // 특징: 핑크+크림, 우아함, 감성적
  // ════════════════════════════
  if (templateId === "T08") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff9fb;color:#2d0a1a;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(160deg,#fff0f5,#fce4ec);padding:5rem 3rem 4rem;text-align:center;border-bottom:1px solid #f8bbd0}
    .badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;display:block;opacity:0.7}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);background:linear-gradient(135deg,#e91e8c,#c2185b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.05em;line-height:0.95}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;color:#5d1a2e;line-height:1.7;max-width:480px;margin-left:auto;margin-right:auto}
    .hero-meta{font-size:0.72rem;color:#ad6080;margin-top:0.6rem;letter-spacing:0.08em}
    .kws{display:flex;justify-content:center;gap:0.5rem;flex-wrap:wrap;margin-top:1.25rem}
    .kw{font-size:0.7rem;color:${ac.accent};background:${ac.tag};padding:0.25rem 0.75rem;border-radius:999px;font-weight:700}
    .cards{max-width:600px;margin:0 auto;padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem}
    .card{background:#fff;border:1px solid #f8bbd0;border-radius:12px;padding:1.5rem 1.75rem}
    .card-label{font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#3d0a1a}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:999px;color:${ac.accent}}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#c4a0b0;display:flex;justify-content:space-between;border-top:1px solid #f8bbd0}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.7}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T09 — CJ ENM 엔터
  // 특징: 퍼플+골드, 화려함, 엔터테인먼트
  // ════════════════════════════
  if (templateId === "T09") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0014;color:#fdf4ff;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;position:relative;overflow:hidden;border-bottom:1px solid #2d0050}
    .hero::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,#7c3aed22,transparent 65%);pointer-events:none}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.75rem;display:block;opacity:0.8}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,8rem);background:linear-gradient(135deg,#a855f7,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1.05rem;font-weight:300;margin-top:1.25rem;opacity:0.8;max-width:500px;line-height:1.6}
    .hero-meta{font-size:0.7rem;color:#7a5a9a;margin-top:0.75rem;letter-spacing:0.08em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1.25rem}
    .kw{font-size:0.7rem;background:${ac.accent};color:#fff;padding:0.25rem 0.7rem;border-radius:2px;font-weight:700}
    .body{max-width:700px;margin:0 auto;padding:2.5rem 3rem 5rem;display:flex;flex-direction:column;gap:1px;background:#0a0014}
    .card{background:#10001f;padding:1.75rem 2rem;border-left:2px solid #7c3aed}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem}
    .card-value{font-size:0.9rem;line-height:1.7;opacity:0.85}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    footer{padding:1.75rem 3rem;font-size:0.65rem;color:#4d2060;display:flex;justify-content:space-between;border-top:1px solid #1a0030}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T10 — 식품·제약
  // 특징: 라임그린, 신뢰감, 깔끔
  // ════════════════════════════
  if (templateId === "T10") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0fff4;color:#052e16;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#052e16;color:#f0fff4;padding:4rem 2.5rem 3rem}
    .badge{font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:${ac.accent};letter-spacing:0.03em;line-height:0.92;text-shadow:0 0 60px #4ade8033}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.8;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:#166534;margin-top:0.6rem;letter-spacing:0.08em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;color:${ac.accent};font-weight:700;letter-spacing:0.05em}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 2rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .card{background:#fff;border:1.5px solid #bbf7d0;border-radius:6px;padding:1.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.88rem;line-height:1.6;color:#052e16}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:4px;color:${ac.accent}}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#4d8060;display:flex;justify-content:space-between;border-top:1px solid #bbf7d0}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.body{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T11 — 카카오 친근
  // 특징: 옐로우, 둥근UI, 친근함
  // ════════════════════════════
  if (templateId === "T11") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fffde7;color:#1a1000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#fee500;padding:4rem 2.5rem 3rem;position:relative}
    .badge{font-size:0.6rem;letter-spacing:0.12em;color:#5a4000;margin-bottom:1.25rem;display:block;font-weight:700}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#3a2800;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1rem;font-weight:400;margin-top:0.75rem;color:#5a4000;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.72rem;color:#7a6000;margin-top:0.5rem}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.72rem;background:#3a2800;color:${ac.accent};padding:0.25rem 0.75rem;border-radius:999px;font-weight:700}
    .cards{max-width:620px;margin:0 auto;padding:2rem 2rem;display:flex;flex-direction:column;gap:0.75rem}
    .card{background:#fff;border-radius:16px;padding:1.5rem 1.75rem;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
    .card-label{font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#2a1800}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:999px;color:${ac.accent}}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#a08040;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T12 — LG 이노베이션
  // 특징: 레드+실버, 기술감, 혁신
  // ════════════════════════════
  if (templateId === "T12") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0d0d0d;color:#f5f5f5;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;background:linear-gradient(135deg,#0d0d0d,#1a0000);border-bottom:2px solid #a50034;position:relative;overflow:hidden}
    .hero::after{content:'LG';position:absolute;right:-20px;bottom:-40px;font-family:'Bebas Neue',sans-serif;font-size:20vw;color:#1a0000;pointer-events:none;letter-spacing:-0.05em}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.75rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,13vw,8rem);color:#fff;letter-spacing:0.03em;line-height:0.9;position:relative}
    .accent{color:#a50034}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;opacity:0.75;max-width:500px;line-height:1.6}
    .hero-meta{font-size:0.7rem;color:#666;margin-top:0.75rem;letter-spacing:0.1em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:900;letter-spacing:0.08em}
    .body{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#222;margin-top:1px}
    .card{background:#111;padding:2rem 2.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.6rem}
    .card-value{font-size:0.88rem;line-height:1.7;color:#ccc}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.6rem;color:${ac.accent}}
    footer{padding:1.75rem 2.5rem;font-size:0.65rem;color:#333;display:flex;justify-content:space-between;border-top:1px solid #1a1a1a}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:540px){.body{grid-template-columns:1fr}.hero{padding:3.5rem 1.5rem 3rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${pageId.split('').map((c,i)=>i===0?`<span class="accent">${c}</span>`:c).join('')}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T13 — 나이키 스포츠
  // 특징: B&W, 강한 슬로건, 임팩트
  // ════════════════════════════
  if (templateId === "T13") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#000;color:#fff;padding:5rem 3rem 4rem;position:relative;overflow:hidden}
    .just{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Bebas Neue',sans-serif;font-size:18vw;color:#111;white-space:nowrap;pointer-events:none;letter-spacing:-0.02em}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#666;margin-bottom:1.5rem;display:block;position:relative}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,15vw,10rem);color:#fff;letter-spacing:0.02em;line-height:0.88;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;opacity:0.7;max-width:480px;line-height:1.5;position:relative}
    .hero-meta{font-size:0.7rem;color:#555;margin-top:0.75rem;letter-spacing:0.12em;text-transform:uppercase;position:relative}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.72rem;color:${ac.accent};font-weight:900;letter-spacing:0.1em;text-transform:uppercase}
    .body{max-width:700px;margin:0 auto;padding:3rem 3rem;display:flex;flex-direction:column;gap:0}
    .card{padding:1.75rem 0;border-bottom:1px solid #eee}
    .card:last-child{border-bottom:none}
    .card-label{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#999;margin-bottom:0.5rem}
    .card-value{font-size:0.95rem;font-weight:700;color:#000;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1.5px solid ${ac.accent};font-size:0.72rem;padding:0.2rem 0.65rem;font-weight:700;letter-spacing:0.05em}
    footer{padding:2rem 3rem;font-size:0.65rem;color:#999;display:flex;justify-content:space-between;border-top:2px solid #000}
    footer a{color:${ac.accent};text-decoration:none;font-weight:700}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <div class="just">JUST DO IT</div>
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T14 — 야놀자 레저
  // 특징: 핑크+블루, 여행감성, 팝
  // ════════════════════════════
  if (templateId === "T14") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#1a0033;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(135deg,#ff4b8b,#6c63ff);padding:5rem 2.5rem 4rem;color:#fff;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;bottom:-60px;right:-60px;width:250px;height:250px;background:rgba(255,255,255,0.1);border-radius:50%}
    .badge{font-size:0.58rem;letter-spacing:0.15em;color:rgba(255,255,255,0.7);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92;text-shadow:0 4px 20px rgba(0,0,0,0.2)}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.9;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.72rem;color:rgba(255,255,255,0.65);margin-top:0.5rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.2);color:#fff;padding:0.25rem 0.7rem;border-radius:999px;font-weight:700;backdrop-filter:blur(4px)}
    .cards{max-width:640px;margin:0 auto;padding:2rem 2rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .card{background:#fff;border-radius:16px;padding:1.5rem;box-shadow:0 4px 20px rgba(108,99,255,0.1)}
    .card-label{font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.88rem;line-height:1.6;color:#2a0044}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:999px;color:${ac.accent}}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#b0a0c0;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.cards{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T15 — 공공기관 신뢰
  // 특징: 네이비+화이트, 정부느낌, 공식적
  // ════════════════════════════
  if (templateId === "T15") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5f7fa;color:#0a1628;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#003366;color:#fff;padding:0.7rem 2rem;display:flex;align-items:center;gap:1rem}
    .topbar-logo{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:0.1em}
    .topbar-sub{font-size:0.6rem;letter-spacing:0.1em;opacity:0.7}
    .hero{background:#fff;border-bottom:3px solid #003366;padding:3.5rem 3rem 2.5rem}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5.5rem);color:#003366;letter-spacing:0.05em;line-height:0.95}
    .hero-desc{font-size:0.95rem;margin-top:0.75rem;color:#1a3050;line-height:1.7;max-width:560px}
    .hero-meta{font-size:0.72rem;color:#4a6080;margin-top:0.5rem;letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.68rem;background:${ac.accent};color:#fff;padding:0.2rem 0.65rem;font-weight:700;letter-spacing:0.05em}
    .body{max-width:800px;margin:0 auto;padding:2rem 3rem;display:flex;flex-direction:column;gap:0}
    .card{background:#fff;border:1px solid #dce4ef;padding:1.5rem 2rem;margin-bottom:1px}
    .card-label{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#1a3050}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.6rem;color:${ac.accent}}
    footer{background:${ac.accent};color:rgba(255,255,255,0.5);padding:1.25rem 3rem;font-size:0.65rem;display:flex;justify-content:space-between;margin-top:2rem}
    footer a{color:rgba(255,255,255,0.7);text-decoration:none}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-logo">PCU PORTFOLIO</div>
    <div class="topbar-sub">배재대학교 전공탐색 박람회 2026</div>
  </div>
  <div class="hero">
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T16 — 코레일 공기업
  // 특징: 파란+회색, 안정감, 공기업
  // ════════════════════════════
  if (templateId === "T16") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f4f8;color:#1a2540;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(135deg,#1a3a6b,#2563a0);color:#fff;padding:4.5rem 3rem 3.5rem;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;right:0;top:0;bottom:0;width:40%;background:rgba(255,255,255,0.03);clip-path:polygon(20% 0,100% 0,100% 100%,0 100%)}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,11vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.82;max-width:500px;line-height:1.6;position:relative}
    .hero-meta{font-size:0.7rem;color:rgba(255,255,255,0.55);margin-top:0.6rem;letter-spacing:0.08em;position:relative}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.68rem;background:rgba(255,255,255,0.2);color:#fff;padding:0.22rem 0.65rem;font-weight:700;letter-spacing:0.05em}
    .body{max-width:720px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:0.75rem}
    .card{background:#fff;border-radius:4px;padding:1.5rem 2rem;box-shadow:0 1px 4px rgba(0,0,0,0.06);border-left:3px solid #2563a0}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#1a2540}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.6rem;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#7090b0;display:flex;justify-content:space-between;border-top:1px solid #dce8f0}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T17 — 크래프톤 게임
  // 특징: 다크+네온, 게임UI, 사이버
  // ════════════════════════════
  if (templateId === "T17") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#080810;color:#e0e0ff;font-family:'Space Mono','Noto Sans KR',monospace;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;position:relative;overflow:hidden;border-bottom:1px solid #1a1a3a}
    .scanline{position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,160,0.01) 2px,rgba(0,255,160,0.01) 4px);pointer-events:none;z-index:0}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;display:block;position:relative;z-index:1}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,8rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.9;text-shadow:0 0 40px #00ffa055,0 0 80px #00ffa022;position:relative;z-index:1}
    .hero-desc{font-size:0.9rem;margin-top:1.25rem;color:#a0a0c0;line-height:1.7;max-width:480px;font-family:'Noto Sans KR',sans-serif;position:relative;z-index:1}
    .hero-meta{font-size:0.65rem;color:#404060;margin-top:0.6rem;letter-spacing:0.12em;position:relative;z-index:1}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative;z-index:1}
    .kw{font-size:0.65rem;color:${ac.accent};font-weight:700;letter-spacing:0.1em;border:1px solid ${ac.glow};padding:0.2rem 0.6rem}
    .body{max-width:700px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:1px;position:relative;z-index:1}
    .card{background:#0c0c1a;border:1px solid #1a1a3a;border-left:2px solid #00ffa0;padding:1.5rem 2rem}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;opacity:0.7}
    .card-value{font-size:0.85rem;line-height:1.7;color:#c0c0e0;font-family:'Noto Sans KR',sans-serif}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.7rem;padding:0.2rem 0.6rem;color:${ac.accent};font-family:'Space Mono',monospace}
    footer{padding:1.75rem 3rem;font-size:0.6rem;color:#202040;display:flex;justify-content:space-between;border-top:1px solid #0f0f1f;position:relative;z-index:1}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.5}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="scanline"></div>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T18 — 교육 따뜻함
  // 특징: 따뜻한 크림+브라운, 교육·복지
  // ════════════════════════════
  if (templateId === "T18") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fdf8f0;color:#2a1a00;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#fff;border-bottom:3px solid #d4a853;padding:4.5rem 3rem 3rem;position:relative}
    .hero::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#d4a853,#f0c060,#d4a853)}
    .badge{font-size:0.6rem;letter-spacing:0.15em;color:${ac.accent};margin-bottom:1.5rem;display:block;font-weight:500}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6.5rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.95}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:0.75rem;color:#4a2e00;line-height:1.7;max-width:500px}
    .hero-meta{font-size:0.72rem;color:#a07830;margin-top:0.5rem;letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:${ac.tag};color:${ac.accent};padding:0.25rem 0.7rem;border-radius:4px;font-weight:700;border:1px solid ${ac.glow}}
    .cards{max-width:640px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:1rem}
    .card{background:#fff;border:1px solid #ead4a0;border-radius:8px;padding:1.5rem 1.75rem}
    .card-label{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#3a2000}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:4px;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#c0a070;display:flex;justify-content:space-between;border-top:1px solid #ead4a0}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.hero,.cards{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T19 — 스타트업 피치덱
  // 특징: 화이트+포인트, 린캔버스, 피치덱
  // ════════════════════════════
  if (templateId === "T19") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#0a0a0a;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;border-bottom:2px solid #0a0a0a;position:relative}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:1.5rem;display:block}
    .hero-number{font-family:'Bebas Neue',sans-serif;font-size:8rem;color:#f0f0f0;position:absolute;top:2rem;right:2rem;line-height:1;letter-spacing:-0.05em}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7.5rem);color:#0a0a0a;letter-spacing:0.03em;line-height:0.9;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;color:#333;line-height:1.6;max-width:520px}
    .hero-meta{font-size:0.7rem;color:#999;margin-top:0.6rem;letter-spacing:0.08em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:${ac.accent};color:#fff;padding:0.25rem 0.7rem;font-weight:700;letter-spacing:0.05em}
    .canvas{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#0a0a0a;border-top:1px solid #0a0a0a}
    .cell{background:#fff;padding:2rem 1.75rem}
    .cell-num{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#f0f0f0;margin-bottom:0.5rem;letter-spacing:0.05em}
    .cell-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:0.6rem}
    .cell-value{font-size:0.85rem;line-height:1.6;color:#1a1a1a}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1.5px solid ${ac.accent};font-size:0.7rem;padding:0.2rem 0.55rem;font-weight:700;color:${ac.accent}}
    footer{padding:1.75rem 3rem;font-size:0.65rem;color:#ccc;display:flex;justify-content:space-between;border-top:1px solid #eee}
    footer a{color:${ac.accent};text-decoration:none;font-weight:700}
    @media(max-width:700px){.canvas{grid-template-columns:1fr}.hero{padding:4rem 1.5rem 3rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-number">01</div>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="canvas">
    ${tags.length ? `<div class="cell"><div class="cell-num">02</div><div class="cell-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="cell"><div class="cell-num">03</div><div class="cell-label">강점 스타일</div><div class="cell-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="cell"><div class="cell-num">04</div><div class="cell-label">롤모델 기업</div><div class="cell-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T20 — 어도비 크리에이티브
  // 특징: 레드+다크, 크리에이티브, 에디토리얼
  // ════════════════════════════
  if (templateId === "T20") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#1a0000;color:#fff8f0;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;top:0;right:0;width:3px;height:100%;background:linear-gradient(180deg,#ff0000,#ff6b00,transparent)}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.75rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,15vw,10rem);color:#fff;letter-spacing:0.02em;line-height:0.88}
    .hero-line{width:60px;height:3px;background:#ff0000;margin:1.5rem 0}
    .hero-desc{font-size:1rem;font-weight:300;color:rgba(255,248,240,0.8);line-height:1.7;max-width:500px}
    .hero-meta{font-size:0.7rem;color:#804040;margin-top:0.75rem;letter-spacing:0.1em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:900;letter-spacing:0.1em;text-transform:uppercase}
    .body{max-width:800px;margin:0 auto;padding:0 3rem 5rem}
    .section{border-top:1px solid #2a0808;padding:2rem 0;display:grid;grid-template-columns:180px 1fr;gap:2rem;align-items:start}
    .sec-label{font-size:0.58rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};padding-top:0.2rem;opacity:0.8}
    .sec-value{font-size:0.92rem;line-height:1.7;color:rgba(255,248,240,0.85)}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    footer{padding:2rem 3rem;font-size:0.65rem;color:#4d1010;display:flex;justify-content:space-between;border-top:1px solid #1a0000}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:700px){.section{grid-template-columns:1fr}.sec-label{padding-bottom:0.5rem}.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-line"></div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${tags.length ? `<div class="section"><div class="sec-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="section"><div class="sec-label">강점 스타일</div><div class="sec-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="section"><div class="sec-label">롤모델 기업</div><div class="sec-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T21 — 원티드 HR테크
  // 특징: 퍼플+화이트, 채용플랫폼, 커리어
  // ════════════════════════════
  if (templateId === "T21") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f8f7ff;color:#1a1033;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(135deg,#5b21b6,#7c3aed);color:#fff;padding:5rem 3rem 4rem;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;bottom:-80px;right:-80px;width:300px;height:300px;background:rgba(255,255,255,0.07);border-radius:50%}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.85;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:rgba(255,255,255,0.55);margin-top:0.6rem;letter-spacing:0.08em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;border-radius:4px;font-weight:700}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:1rem}
    .card{background:#fff;border-radius:8px;padding:1.5rem 1.75rem;border:1px solid #ede9fe;box-shadow:0 2px 8px rgba(91,33,182,0.06)}
    .card-label{font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#2e1065}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:4px;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#a090c0;display:flex;justify-content:space-between;border-top:1px solid #ede9fe}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T22 — 라인 글로벌
  // 특징: 그린+화이트, 글로벌IT, 심플
  // ════════════════════════════
  if (templateId === "T22") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#111;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#00b300;color:#fff;padding:5rem 3rem 4rem}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.88;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:0.6rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.2);color:#fff;padding:0.25rem 0.7rem;font-weight:700}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .card{background:#f6fff6;border:1.5px solid #c8f5c8;border-radius:6px;padding:1.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.88rem;line-height:1.6;color:#003300}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:3px;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#80c080;display:flex;justify-content:space-between;border-top:1px solid #c8f5c8}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.body{grid-template-columns:1fr;padding:2rem 1.5rem}.hero{padding:4rem 1.5rem 3rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T23 — SK하이닉스 반도체
  // 특징: 오렌지+다크, 반도체, 첨단기술
  // ════════════════════════════
  if (templateId === "T23") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0600;color:#fff8f0;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;background:linear-gradient(135deg,#0a0600,#1a0e00);position:relative;overflow:hidden;border-bottom:2px solid #ea6000}
    .hero::after{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,#ea600022,transparent 65%)}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.75rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,13vw,8rem);color:${ac.accent};letter-spacing:0.03em;line-height:0.9;text-shadow:0 0 60px #ea600033}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;opacity:0.8;max-width:500px;line-height:1.6}
    .hero-meta{font-size:0.7rem;color:#805030;margin-top:0.75rem;letter-spacing:0.1em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:900;letter-spacing:0.08em}
    .body{max-width:700px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:1px}
    .card{background:#120800;border-left:2px solid #ea6000;padding:1.5rem 2rem}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;opacity:0.8}
    .card-value{font-size:0.9rem;line-height:1.7;opacity:0.85}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    footer{padding:1.75rem 3rem;font-size:0.65rem;color:#4d2a00;display:flex;justify-content:space-between;border-top:1px solid #1a0e00}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T24 — 삼성바이오 바이오테크
  // 특징: 청록+화이트, 바이오, 신뢰
  // ════════════════════════════
  if (templateId === "T24") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0fffe;color:#003333;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:linear-gradient(135deg,#005f60,#0097a7);color:#fff;padding:5rem 3rem 4rem}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.88;line-height:1.6;max-width:480px}
    .hero-meta{font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:0.6rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;font-weight:700}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .card{background:#fff;border:1.5px solid #b2ebf2;border-radius:6px;padding:1.5rem;border-top:3px solid #0097a7}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.88rem;line-height:1.6;color:#003333}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:3px;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#4d9090;display:flex;justify-content:space-between;border-top:1px solid #b2ebf2}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.body{grid-template-columns:1fr;padding:2rem 1.5rem}.hero{padding:4rem 1.5rem 3rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T25 — 현대자동차 모빌리티
  // 특징: 다크실버, 속도감, 미래모빌리티
  // ════════════════════════════
  if (templateId === "T25") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#080808;color:#e8e8e8;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;background:linear-gradient(160deg,#080808,#141414);position:relative;overflow:hidden;border-bottom:1px solid #222}
    .hero::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#c0c0c0,transparent)}
    .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:1.75rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,13vw,8rem);color:#fff;letter-spacing:0.03em;line-height:0.9}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1.25rem;opacity:0.7;max-width:500px;line-height:1.6}
    .hero-meta{font-size:0.7rem;color:#555;margin-top:0.75rem;letter-spacing:0.1em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:700;letter-spacing:0.08em;border-bottom:1px solid ${ac.glow};padding-bottom:1px}
    .body{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#1a1a1a;margin-top:1px}
    .card{background:#0d0d0d;padding:2rem 2.5rem}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.6rem}
    .card-value{font-size:0.9rem;line-height:1.7;color:#ccc}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    footer{padding:1.75rem 2.5rem;font-size:0.65rem;color:#333;display:flex;justify-content:space-between;border-top:1px solid #111}
    footer a{color:#888;text-decoration:none}
    @media(max-width:540px){.body{grid-template-columns:1fr}.hero{padding:3.5rem 1.5rem 3rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
    <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T26 — 롯데 유통
  // 특징: 레드+골드, 유통, 풍요로움
  // ════════════════════════════
  if (templateId === "T26") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#1a0000;color:#fff8ee;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;background:linear-gradient(135deg,#1a0000,#2a0000);border-bottom:2px solid #cc0000;position:relative;overflow:hidden}
    .hero::after{content:'LOTTE';position:absolute;right:-10px;bottom:-20px;font-family:'Bebas Neue',sans-serif;font-size:12vw;color:#220000;pointer-events:none;letter-spacing:0.05em}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.8;max-width:480px;line-height:1.6;position:relative}
    .hero-meta{font-size:0.7rem;color:#804040;margin-top:0.6rem;position:relative}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.68rem;color:${ac.accent};font-weight:700;letter-spacing:0.06em}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:0.75rem}
    .card{background:#220000;border:1px solid #3d0000;border-left:3px solid #cc0000;padding:1.5rem 2rem}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem}
    .card-value{font-size:0.9rem;line-height:1.7;color:#ffdddd}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.72rem;padding:0.2rem 0.65rem;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#4d1010;display:flex;justify-content:space-between;border-top:1px solid #2a0000}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.7}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T27 — 신세계 프리미엄리테일
  // 특징: 블랙+골드, 럭셔리, 고급감
  // ════════════════════════════
  if (templateId === "T27") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0a00;color:#fff8e0;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:6rem 3rem 4rem;border-bottom:1px solid #2a2a00;position:relative}
    .hero::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#c8a000,transparent)}
    .badge{font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:${ac.accent};margin-bottom:2rem;display:block;opacity:0.8}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,14vw,9rem);color:#fff;letter-spacing:0.04em;line-height:0.88}
    .hero-line{width:40px;height:1px;background:#c8a000;margin:1.5rem 0}
    .hero-desc{font-size:0.95rem;font-weight:300;color:rgba(255,248,224,0.75);line-height:1.8;max-width:460px}
    .hero-meta{font-size:0.65rem;color:#806a00;margin-top:0.75rem;letter-spacing:0.15em;text-transform:uppercase}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:1.25rem}
    .kw{font-size:0.65rem;color:${ac.accent};letter-spacing:0.12em;text-transform:uppercase;font-weight:700}
    .body{max-width:700px;margin:0 auto;padding:3rem}
    .section{padding:1.75rem 0;border-bottom:1px solid #1a1a00;display:grid;grid-template-columns:160px 1fr;gap:2rem;align-items:start}
    .section:last-child{border-bottom:none}
    .sec-label{font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};padding-top:0.2rem}
    .sec-value{font-size:0.9rem;line-height:1.7;color:rgba(255,248,224,0.82)}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1px solid ${ac.glow};font-size:0.7rem;padding:0.2rem 0.65rem;color:${ac.accent};letter-spacing:0.05em}
    footer{padding:2rem 3rem;font-size:0.6rem;color:#2a2a00;display:flex;justify-content:space-between;border-top:1px solid #141400}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.5}
    @media(max-width:700px){.section{grid-template-columns:1fr}.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-line"></div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    ${tags.length ? `<div class="section"><div class="sec-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="section"><div class="sec-label">강점 스타일</div><div class="sec-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="section"><div class="sec-label">롤모델 기업</div><div class="sec-value">${companyName}</div></div>` : ""}
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T28 — 배달의민족 유쾌함
  // 특징: 옐로우+블랙, 손글씨느낌, 재미
  // ════════════════════════════
  if (templateId === "T28") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fffbe6;color:#1a1200;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{background:#232323;color:#ffe400;padding:5rem 3rem 4rem;position:relative;overflow:hidden}
    .hero::before{content:'🍕';position:absolute;right:2rem;top:2rem;font-size:6rem;opacity:0.1}
    .badge{font-size:0.6rem;letter-spacing:0.15em;color:rgba(255,228,0,0.6);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#ffe400;letter-spacing:0.04em;line-height:0.92}
    .hero-desc{font-size:1rem;font-weight:400;margin-top:1rem;opacity:0.85;line-height:1.6;max-width:480px;color:#fff8c0}
    .hero-meta{font-size:0.7rem;color:#666;margin-top:0.6rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.72rem;background:${ac.accent};color:#1a1200;padding:0.25rem 0.75rem;border-radius:4px;font-weight:900}
    .cards{max-width:640px;margin:0 auto;padding:2rem 3rem;display:flex;flex-direction:column;gap:0.75rem}
    .card{background:#fff;border:2px solid #ffe400;border-radius:12px;padding:1.5rem 1.75rem}
    .card-label{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#2a1a00}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:8px;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#a09040;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:540px){.hero,.cards{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="cards">
    ${strength ? `<div class="card"><div class="card-label">강점</div><div class="card-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
  </div>${footer}</body></html>`;

  // ════════════════════════════
  // T29 — JTBC 뉴스미디어
  // 특징: 블루+화이트, 뉴스룸, 신뢰
  // ════════════════════════════
  if (templateId === "T29") return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#0a1428;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#0052a3;color:#fff;padding:0.65rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .topbar-logo{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;letter-spacing:0.1em}
    .topbar-date{font-size:0.6rem;opacity:0.7;letter-spacing:0.05em}
    .hero{padding:3.5rem 3rem 2.5rem;border-bottom:3px solid #0052a3}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#0052a3;margin-bottom:1rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#0a1428;letter-spacing:0.04em;line-height:0.95}
    .hero-desc{font-size:0.95rem;margin-top:0.75rem;color:#1a3050;line-height:1.7;max-width:560px;font-weight:300}
    .hero-meta{font-size:0.7rem;color:#4a6080;margin-top:0.5rem;letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.68rem;background:${ac.accent};color:#fff;padding:0.2rem 0.6rem;font-weight:700}
    .body{max-width:800px;margin:0 auto;padding:2rem 3rem;display:grid;grid-template-columns:2fr 1fr;gap:1.5rem}
    .main .card{padding:1.5rem 0;border-bottom:1px solid #e0e8f0}
    .main .card:last-child{border-bottom:none}
    .aside .card{background:#f0f5fa;padding:1.25rem;border-radius:4px;margin-bottom:1rem}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#1a3050}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${ac.tag};font-size:0.72rem;padding:0.2rem 0.6rem;color:${ac.accent}}
    footer{background:${ac.accent};color:rgba(255,255,255,0.5);padding:1.25rem 3rem;font-size:0.65rem;display:flex;justify-content:space-between;margin-top:2rem}
    footer a{color:rgba(255,255,255,0.7);text-decoration:none}
    @media(max-width:700px){.body{grid-template-columns:1fr}.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="topbar"><div class="topbar-logo">PCU PORTFOLIO</div><div class="topbar-date">배재대학교 · 전공탐색 박람회 2026</div></div>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
    <div class="main">
    </div>
    <div class="aside">
      ${companyName ? `<div class="card"><div class="card-label">롤모델</div><div class="card-value">${companyName}</div></div>` : ""}
      <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
    </div>
  </div>${footer}</body></html>`;

  // T30~T55: 간결하게 색상/포인트만 다른 변형 템플릿
  // 각 회사 아이덴티티 컬러 적용

  // T30~T55: 회사별 고유 배경/표면색 유지, 포인트는 전공별 ac.accent 적용
  const simpleTemplates = {
    T30: { name:"MBC",           bg:"#0d001a", surface:"#160026", border:"#2d0050", text:"#f5e6ff", muted:"#604080" },
    T31: { name:"KBS",           bg:"#001428", surface:"#001e3d", border:"#003366", text:"#e6f0ff", muted:"#406080" },
    T32: { name:"EBS",           bg:"#1a1400", surface:"#261e00", border:"#3d3000", text:"#fff8e0", muted:"#806040" },
    T33: { name:"풀무원",        bg:"#001a06", surface:"#002910", border:"#004d1a", text:"#e6fff0", muted:"#406050" },
    T34: { name:"유한양행",      bg:"#001428", surface:"#001e3d", border:"#003366", text:"#e6f4ff", muted:"#406070" },
    T35: { name:"대웅제약",      bg:"#000a28", surface:"#00103d", border:"#002266", text:"#e6ecff", muted:"#404870" },
    T36: { name:"CJ제일제당",    bg:"#1a0000", surface:"#2a0000", border:"#440000", text:"#ffeeee", muted:"#804040" },
    T37: { name:"아디다스",      bg:"#000000", surface:"#111111", border:"#222222", text:"#ffffff", muted:"#666666" },
    T38: { name:"리복",          bg:"#001433", surface:"#001e4d", border:"#003366", text:"#e6eeff", muted:"#405070" },
    T39: { name:"뉴발란스",      bg:"#0a0028", surface:"#14003d", border:"#280066", text:"#f0e6ff", muted:"#604060" },
    T40: { name:"휠라",          bg:"#00001a", surface:"#00002e", border:"#000066", text:"#e6e6ff", muted:"#404070" },
    T41: { name:"하나투어",      bg:"#001a14", surface:"#002920", border:"#004d33", text:"#e6fff8", muted:"#406058" },
    T42: { name:"스포티비",      bg:"#0a1400", surface:"#141e00", border:"#284400", text:"#f0ffe6", muted:"#607040" },
    T43: { name:"KBO",           bg:"#00001a", surface:"#00002e", border:"#000066", text:"#e6e6ff", muted:"#404070" },
    T44: { name:"K리그",         bg:"#001400", surface:"#002000", border:"#004400", text:"#e6ffe6", muted:"#406040" },
    T45: { name:"법원",          bg:"#080808", surface:"#141414", border:"#2a2a00", text:"#fff8e0", muted:"#606040" },
    T46: { name:"행정안전부",    bg:"#001428", surface:"#001e3d", border:"#003366", text:"#e6f0ff", muted:"#406080" },
    T47: { name:"소방청",        bg:"#1a0000", surface:"#2a0800", border:"#440e00", text:"#fff0e8", muted:"#804040" },
    T48: { name:"한국가스공사",  bg:"#001433", surface:"#001e4d", border:"#003380", text:"#e6f0ff", muted:"#405070" },
    T49: { name:"국민건강보험공단",bg:"#001a06",surface:"#002910", border:"#004d1a", text:"#e6fff0", muted:"#406050" },
    T50: { name:"법무법인",      bg:"#0a0a00", surface:"#141400", border:"#282800", text:"#fffff0", muted:"#606040" },
    T51: { name:"사회복지관",    bg:"#001433", surface:"#001e4d", border:"#003380", text:"#e6f4ff", muted:"#406080" },
    T52: { name:"상담센터",      bg:"#1a001a", surface:"#2a002a", border:"#440044", text:"#ffe6ff", muted:"#804080" },
    T53: { name:"유치원",        bg:"#1a0a00", surface:"#2a1400", border:"#442200", text:"#fff8e6", muted:"#806040" },
    T54: { name:"NGO",           bg:"#001a0e", surface:"#002918", border:"#004d2a", text:"#e6fff4", muted:"#406055" },
    T55: { name:"출판사",        bg:"#0e0800", surface:"#1a1200", border:"#3d2a00", text:"#fff8e0", muted:"#806040" },
  };

  if (simpleTemplates[templateId]) {
    const s = simpleTemplates[templateId];
    return `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:${s.bg};color:${s.text};font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .hero{padding:5rem 3rem 4rem;border-bottom:1px solid ${s.border};position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;top:-80px;right:-80px;width:350px;height:350px;background:radial-gradient(circle,${s.accent}22,transparent 65%);pointer-events:none}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${s.accent};margin-bottom:1.5rem;display:block;opacity:0.8}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:${s.accent};letter-spacing:0.04em;line-height:0.92;text-shadow:0 0 50px ${s.accent}33}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:1rem;opacity:0.82;max-width:480px;line-height:1.6}
    .hero-meta{font-size:0.7rem;color:${s.muted};margin-top:0.6rem;letter-spacing:0.08em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;color:${s.accent};font-weight:700;letter-spacing:0.06em}
    .body{max-width:680px;margin:0 auto;padding:2.5rem 3rem;display:flex;flex-direction:column;gap:1px}
    .card{background:${s.surface};border-left:2px solid ${s.accent};padding:1.5rem 2rem}
    .card-label{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${s.accent};margin-bottom:0.5rem;opacity:0.8}
    .card-value{font-size:0.9rem;line-height:1.7;opacity:0.85}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:${s.border};font-size:0.72rem;padding:0.2rem 0.65rem;color:${s.accent};opacity:0.85}
    footer{padding:1.75rem 3rem;font-size:0.65rem;color:${s.muted};display:flex;justify-content:space-between;border-top:1px solid ${s.border}}
    footer a{color:${s.accent};text-decoration:none;opacity:0.6}
    @media(max-width:540px){.hero,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <span class="badge">PCU PORTFOLIO</span>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="body">
  </div>${footer}</body></html>`;
  }

  // 기본값 (매핑 실패 시 T01 반환)
  return module.exports.generateHTML({ pageId, major, majorCategory, strength, company, oneLineDesc, interestFields, templateId: "T01" });
}

// ════════════════════════════════════════════════════════════
// 템플릿 그룹 판별
// ════════════════════════════════════════════════════════════
function getTemplateGroup(templateId) {
  const media   = ["T09","T29","T30","T31","T42","T20"];
  const welfare = ["T18","T32","T51","T52","T53","T54"];
  const sports  = ["T13","T14","T37","T38","T43","T44"];
  const light   = ["T03","T05","T08","T11","T24","T33","T34","T39","T40","T41","T46","T49"];
  const law     = ["T15","T16","T45","T46","T48","T50"];
  const dark    = ["T01","T02","T06","T07","T10","T12","T17","T19","T21","T22","T23","T25","T26","T27","T28","T35","T36","T47"];

  if (media.includes(templateId))   return "media";
  if (welfare.includes(templateId)) return "welfare";
  if (sports.includes(templateId))  return "sports";
  if (law.includes(templateId))     return "law";
  if (light.includes(templateId))   return "light";
  if (dark.includes(templateId))    return "dark";
  return "default";
}

// ════════════════════════════════════════════════════════════
// 그룹별 섹션 제목 맵
// ════════════════════════════════════════════════════════════
const SECTION_TITLES = {
  media: {
    intro: "Behind The Story",
    job:   "Featured Role",
    skills:"Creative Toolkit",
    exp:   "Creative Archive",
    photo: "Visual Story",
  },
  welfare: {
    intro: "함께한 시간들",
    job:   "나아가고 싶은 곳",
    skills:"나를 이루는 것들",
    exp:   "사람과의 연결",
    photo: "활동 기록",
  },
  sports: {
    intro: "나의 플레이스타일",
    job:   "목표 포지션",
    skills:"보유 역량",
    exp:   "경기 기록",
    photo: "액션 컷",
  },
  law: {
    intro: "자기소개",
    job:   "희망 직무",
    skills:"자격 및 역량",
    exp:   "주요 경력",
    photo: "프로필",
  },
  light: {
    intro: "자기소개",
    job:   "희망 직무",
    skills:"보유 스킬 / 자격증",
    exp:   "경험 및 활동",
    photo: "사진",
  },
  dark: {
    intro: "ABOUT ME",
    job:   "TARGET ROLE",
    skills:"SKILLS",
    exp:   "EXPERIENCE",
    photo: "GALLERY",
  },
  default: {
    intro: "자기소개",
    job:   "희망 직무",
    skills:"보유 스킬 / 자격증",
    exp:   "경험 및 활동",
    photo: "사진",
  },
};

// ════════════════════════════════════════════════════════════
// CONTENT FLOW 결정 (그룹별 섹션 순서)
// ════════════════════════════════════════════════════════════
function getContentFlow(group) {
  switch(group) {
    case "media":   return ["photos","job","intro","experience","skills"];
    case "welfare": return ["photos","intro","experience","skills","job"];
    case "sports":  return ["photos","skills","experience","job","intro"];
    case "law":     return ["intro","skills","experience","job","photos"];
    case "dark":    return ["skills","job","experience","intro","photos"];
    default:        return ["intro","job","skills","experience","photos"];
  }
}

// ════════════════════════════════════════════════════════════
// 섹션 렌더러들
// ════════════════════════════════════════════════════════════

function renderPhotos(data, group, titles) {
  const { idPhotoUrl, appealPhotoUrls = [], ac } = data;
  const accent = ac?.accent || '#888';
  if (!idPhotoUrl && !appealPhotoUrls.length) return '';

  // 모달 인덱스 계산 (idPhoto=0, appeal=1,2,3)
  const idIdx = idPhotoUrl ? 0 : -1;
  const appealStart = idPhotoUrl ? 1 : 0;

  if (group === "media") {
    return `
    <div style="font-family:'Noto Sans KR',sans-serif;margin-bottom:0.5rem;">
      ${appealPhotoUrls[0] ? `
      <div style="width:100%;overflow:hidden;max-height:480px;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart})">
        <img src="${appealPhotoUrls[0]}" alt="대표사진" style="width:100%;height:480px;object-fit:cover;display:block;transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'"/>
      </div>` : ""}
      ${appealPhotoUrls.length > 1 ? `
      <div style="display:grid;grid-template-columns:repeat(${Math.min(appealPhotoUrls.length-1,3)},1fr);gap:4px;margin-top:4px;">
        ${appealPhotoUrls.slice(1).map((url,i) => `<img src="${url}" alt="사진" style="width:100%;height:260px;object-fit:cover;display:block;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart+i+1})"/>`).join('')}
      </div>` : ""}
      ${idPhotoUrl ? `
      <div style="max-width:720px;margin:0.75rem auto 0;padding:0 2.5rem;">
        <div style="font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">${titles.photo}</div>
        <img src="${idPhotoUrl}" alt="증명사진" style="width:90px;height:120px;object-fit:cover;border-radius:3px;border:2px solid ${accent}44;display:block;cursor:zoom-in;" onclick="pcuOpenModal(0)"/>
      </div>` : ""}
    </div>`;
  }

  if (group === "welfare") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};margin-bottom:0.75rem;font-weight:700">${titles.photo}</div>
      <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap;">
        ${idPhotoUrl ? `<img src="${idPhotoUrl}" alt="증명사진" style="width:110px;height:145px;object-fit:cover;border-radius:12px;border:3px solid ${accent}44;flex-shrink:0;cursor:zoom-in;" onclick="pcuOpenModal(0)"/>` : ""}
        ${appealPhotoUrls.length ? `
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;flex:1;">
          ${appealPhotoUrls.map((url,i) => `<img src="${url}" alt="활동사진" style="height:180px;width:calc(50% - 0.25rem);min-width:140px;object-fit:cover;border-radius:8px;flex-grow:1;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart+i})"/>`).join('')}
        </div>` : ""}
      </div>
    </div>`;
  }

  if (group === "sports") {
    return `
    <div style="font-family:'Noto Sans KR',sans-serif;margin-bottom:0.5rem;">
      ${appealPhotoUrls[0] ? `
      <div style="position:relative;overflow:hidden;max-height:400px;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart})">
        <img src="${appealPhotoUrls[0]}" alt="대표사진" style="width:100%;height:400px;object-fit:cover;display:block;filter:contrast(1.1)"/>
        <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(transparent,rgba(0,0,0,0.7));pointer-events:none;"></div>
      </div>` : ""}
      ${appealPhotoUrls.length > 1 || idPhotoUrl ? `
      <div style="display:flex;gap:4px;margin-top:4px;">
        ${idPhotoUrl ? `<img src="${idPhotoUrl}" style="width:100px;height:100px;object-fit:cover;flex-shrink:0;cursor:zoom-in;" onclick="pcuOpenModal(0)"/>` : ""}
        ${appealPhotoUrls.slice(1).map((url,i) => `<img src="${url}" style="flex:1;height:100px;object-fit:cover;min-width:0;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart+i+1})"/>`).join('')}
      </div>` : ""}
    </div>`;
  }

  // default / dark / light / law
  return `
  <div style="max-width:720px;margin:0 auto;padding:1rem 2.5rem 1rem;font-family:'Noto Sans KR',sans-serif;">
    <div style="font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;font-weight:700">${titles.photo}</div>
    <div style="display:flex;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
      ${idPhotoUrl ? `<img src="${idPhotoUrl}" alt="증명사진" style="width:100px;height:135px;object-fit:cover;border-radius:4px;border:2px solid ${accent}44;flex-shrink:0;display:block;cursor:zoom-in;" onclick="pcuOpenModal(0)"/>` : ""}
      ${appealPhotoUrls.length ? `
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;flex:1;">
        ${appealPhotoUrls.map((url,i) => `<img src="${url}" alt="어필사진" style="height:200px;width:calc(33% - 0.35rem);min-width:140px;object-fit:cover;border-radius:4px;flex-grow:1;border:1px solid ${accent}22;cursor:zoom-in;" onclick="pcuOpenModal(${appealStart+i})"/>`).join('')}
      </div>` : ""}
    </div>
  </div>`;
}

function renderIntro(data, group, titles) {
  const { selfIntro, ac } = data;
  if (!selfIntro) return '';
  const accent = ac?.accent || '#888';

  if (group === "media") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:2rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-top:1px solid ${accent}22;">
      <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:1rem;font-weight:700">${titles.intro}</div>
      <div style="font-size:1.05rem;line-height:1.9;color:inherit;opacity:0.9;font-weight:300;font-style:italic;white-space:pre-line">"${selfIntro}"</div>
    </div>`;
  }

  if (group === "welfare") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.58rem;letter-spacing:0.15em;color:${accent};margin-bottom:0.6rem;font-weight:700">${titles.intro}</div>
      <div style="font-size:0.92rem;line-height:1.9;color:inherit;opacity:0.88;white-space:pre-line;padding:1.25rem;background:${accent}08;border-radius:12px;border:1px solid ${accent}22;">${selfIntro}</div>
    </div>`;
  }

  if (group === "dark") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.75rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-left:3px solid ${accent};">
      <div style="font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;font-weight:700;opacity:0.8">${titles.intro}</div>
      <div style="font-size:0.9rem;line-height:1.8;opacity:0.85;white-space:pre-line">${selfIntro}</div>
    </div>`;
  }

  return `
  <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
    <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;font-weight:700">${titles.intro}</div>
    <div style="font-size:0.9rem;line-height:1.8;opacity:0.88;white-space:pre-line;border-left:3px solid ${accent};padding-left:1rem;">${selfIntro}</div>
  </div>`;
}

function renderJob(data, group, titles) {
  const { desiredJob, ac } = data;
  if (!desiredJob) return '';
  const accent = ac?.accent || '#888';

  if (group === "media") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700;opacity:0.7">${titles.job}</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;letter-spacing:0.06em;color:${accent};line-height:1">${desiredJob}</div>
    </div>`;
  }

  if (group === "sports") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">${titles.job}</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:0.04em;color:inherit;line-height:1;opacity:0.95">${desiredJob}</div>
    </div>`;
  }

  return `
  <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-left:3px solid ${accent};">
    <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">${titles.job}</div>
    <div style="font-size:1.1rem;font-weight:700;opacity:0.92">${desiredJob}</div>
  </div>`;
}

function renderSkills(data, group, titles) {
  const { skills, ac } = data;
  if (!skills) return '';
  const accent = ac?.accent || '#888';
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);
  if (!skillList.length) return '';

  if (group === "sports") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:${accent};margin-bottom:0.75rem;font-weight:700">${titles.skills}</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        ${skillList.map(s => `<span style="background:${accent};color:#000;font-size:0.85rem;font-weight:900;padding:0.4rem 1rem;letter-spacing:0.06em;text-transform:uppercase;">${s}</span>`).join('')}
      </div>
    </div>`;
  }

  if (group === "media") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.75rem;font-weight:700">${titles.skills}</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
        ${skillList.map(s => `<span style="font-size:0.88rem;color:${accent};font-weight:700;">#${s}</span>`).join('')}
      </div>
    </div>`;
  }

  if (group === "dark") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-left:3px solid ${accent};">
      <div style="font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:${accent};margin-bottom:0.75rem;font-weight:700;opacity:0.8">${titles.skills}</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
        ${skillList.map(s => `<span style="background:${accent}18;border:1px solid ${accent}44;font-size:0.78rem;padding:0.22rem 0.65rem;color:${accent};font-weight:600;letter-spacing:0.04em;">${s}</span>`).join('')}
      </div>
    </div>`;
  }

  return `
  <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
    <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;font-weight:700">${titles.skills}</div>
    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
      ${skillList.map(s => `<span style="background:${accent}15;border:1px solid ${accent}44;font-size:0.78rem;padding:0.25rem 0.7rem;border-radius:3px;color:${accent};font-weight:600;">${s}</span>`).join('')}
    </div>
  </div>`;
}

function renderExperience(data, group, titles) {
  const { experience, ac } = data;
  if (!experience) return '';
  const accent = ac?.accent || '#888';

  if (group === "media") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-top:1px solid ${accent}22;">
      <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.75rem;font-weight:700">${titles.exp}</div>
      <div style="font-size:0.9rem;line-height:1.9;opacity:0.88;white-space:pre-line;">${experience}</div>
    </div>`;
  }

  if (group === "welfare") {
    return `
    <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem;font-family:'Noto Sans KR',sans-serif;">
      <div style="font-size:0.58rem;letter-spacing:0.15em;color:${accent};margin-bottom:0.75rem;font-weight:700">${titles.exp}</div>
      <div style="font-size:0.88rem;line-height:1.9;opacity:0.88;white-space:pre-line;border-left:3px solid ${accent}44;padding-left:1rem;">${experience}</div>
    </div>`;
  }

  return `
  <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem;font-family:'Noto Sans KR',sans-serif;border-left:3px solid ${accent};">
    <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;font-weight:700">${titles.exp}</div>
    <div style="font-size:0.88rem;line-height:1.8;opacity:0.88;white-space:pre-line;">${experience}</div>
  </div>`;
}

// ════════════════════════════════════════════════════════════
// 메인 buildExtraSections — 그룹별 FLOW + 스타일 분기
// ════════════════════════════════════════════════════════════
function buildExtraSections({ selfIntro, skills, experience, desiredJob, idPhotoUrl, appealPhotoUrls, ac, templateId, tags, tagStr, keywords, keywordStr, strength, companyName, sectionTitles: customTitles, closingMessage }) {
  const group  = getTemplateGroup(templateId || "T01");
  const flow   = getContentFlow(group);
  // Claude가 생성한 섹션 제목 우선, 없으면 그룹별 기본값
  const defaultTitles = SECTION_TITLES[group] || SECTION_TITLES.default;
  const titles = customTitles ? {
    photo:  customTitles.photo  || defaultTitles.photo,
    intro:  customTitles.intro  || defaultTitles.intro,
    job:    customTitles.job    || defaultTitles.job,
    skills: customTitles.skills || defaultTitles.skills,
    exp:    customTitles.exp    || defaultTitles.exp,
  } : defaultTitles;
  const accent = ac?.accent || '#888';
  const data   = { selfIntro, skills, experience, desiredJob, idPhotoUrl, appealPhotoUrls: appealPhotoUrls || [], ac, tags, tagStr, keywords, keywordStr, strength, companyName };

  // 모달 CSS + JS (사진 클릭 시 크게 보기)
  const modalScript = `
  <style>
    .pcu-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;align-items:center;justify-content:center;cursor:pointer;}
    .pcu-modal-overlay.active{display:flex;}
    .pcu-modal-img{max-width:92vw;max-height:88vh;object-fit:contain;border-radius:4px;cursor:default;}
    .pcu-modal-close{position:fixed;top:1.25rem;right:1.5rem;color:#fff;font-size:2rem;cursor:pointer;opacity:0.8;line-height:1;z-index:10000;}
    .pcu-modal-prev,.pcu-modal-next{position:fixed;top:50%;transform:translateY(-50%);color:#fff;font-size:2.5rem;cursor:pointer;opacity:0.7;z-index:10000;padding:0.5rem;user-select:none;}
    .pcu-modal-prev{left:1rem;} .pcu-modal-next{right:1rem;}
    .pcu-clickable{cursor:zoom-in;}
  </style>
  <div class="pcu-modal-overlay" id="pcuModal" onclick="pcuModalClose(event)">
    <span class="pcu-modal-close" onclick="pcuModalHide()">×</span>
    <span class="pcu-modal-prev" onclick="pcuModalPrev(event)">‹</span>
    <img class="pcu-modal-img" id="pcuModalImg" src="" alt="사진"/>
    <span class="pcu-modal-next" onclick="pcuModalNext(event)">›</span>
  </div>
  <script>
    var _pcuPhotos = [], _pcuIdx = 0;
    function pcuOpenModal(idx) {
      _pcuIdx = idx;
      document.getElementById('pcuModalImg').src = _pcuPhotos[idx];
      document.getElementById('pcuModal').classList.add('active');
    }
    function pcuModalHide() { document.getElementById('pcuModal').classList.remove('active'); }
    function pcuModalClose(e) { if(e.target===document.getElementById('pcuModal')) pcuModalHide(); }
    function pcuModalPrev(e) { e.stopPropagation(); _pcuIdx=(_pcuIdx-1+_pcuPhotos.length)%_pcuPhotos.length; document.getElementById('pcuModalImg').src=_pcuPhotos[_pcuIdx]; }
    function pcuModalNext(e) { e.stopPropagation(); _pcuIdx=(_pcuIdx+1)%_pcuPhotos.length; document.getElementById('pcuModalImg').src=_pcuPhotos[_pcuIdx]; }
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') pcuModalHide(); if(e.key==='ArrowLeft') pcuModalPrev(e); if(e.key==='ArrowRight') pcuModalNext(e); });
  </script>`;

  // 모달용 사진 배열 JS 생성
  const allPhotos = [];
  if (idPhotoUrl) allPhotos.push(idPhotoUrl);
  if (appealPhotoUrls && appealPhotoUrls.length) allPhotos.push(...appealPhotoUrls);
  const photosArrayScript = allPhotos.length ? `<script>_pcuPhotos=${JSON.stringify(allPhotos)};</script>` : '';

  const sections = flow.map(section => {
    switch(section) {
      case "photos":     return renderPhotos(data, group, titles);
      case "intro":      return renderIntro(data, group, titles);
      case "job":        return renderJob(data, group, titles);
      case "skills":     return renderSkills(data, group, titles);
      case "experience": return renderExperience(data, group, titles);
      default:           return '';
    }
  }).join('');

  // 관심분야 + 강점 + 롤모델 통합 섹션
  const infoSection = `
  <div style="max-width:720px;margin:0 auto;padding:1.25rem 2.5rem;font-family:'Noto Sans KR',sans-serif;display:flex;flex-wrap:wrap;gap:0.75rem;">
    ${tags && tags.length ? `<div style="flex:1;min-width:180px;border-left:3px solid ${accent};padding:0.75rem 1rem;">
      <div style="font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">관심 분야</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">${tagStr}</div>
    </div>` : ''}
    ${strength ? `<div style="flex:1;min-width:120px;border-left:3px solid ${accent};padding:0.75rem 1rem;">
      <div style="font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">강점 스타일</div>
      <div style="font-size:0.88rem;opacity:0.9;">${strength}</div>
    </div>` : ''}
    ${companyName ? `<div style="flex:1;min-width:120px;border-left:3px solid ${accent};padding:0.75rem 1rem;">
      <div style="font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${accent};margin-bottom:0.4rem;font-weight:700">롤모델 기업</div>
      <div style="font-size:0.88rem;opacity:0.9;">${companyName}</div>
    </div>` : ''}
  </div>`;

  const closingHtml = closingMessage ? `
  <div style="max-width:720px;margin:0 auto;padding:1.5rem 2.5rem 0;font-family:'Noto Sans KR',sans-serif;text-align:center;">
    <div style="font-size:0.92rem;color:${accent};font-style:italic;opacity:0.85;padding:1.25rem;border-top:1px solid ${accent}22;">"${closingMessage}"</div>
  </div>` : "";

  return `${modalScript}${photosArrayScript}<div class="extra-sections" style="padding-bottom:3rem;">${infoSection}${sections}${closingHtml}</div>`;
}

// ── 외부로 내보내기 (createPage.js에서 require로 사용)
module.exports = { COMPANY_TO_TEMPLATE, MAJOR_STRENGTH_TO_TEMPLATE, resolveTemplateId, resolveAccentColor, generateHTML };

// 외부 템플릿 파일은 module.exports 설정 후 불러오기 (순환참조 방지)
const { getT21to30 } = require('./_temp_21_30');
const { getT31to40 } = require('./_temp_31_40');
const { getT41to50 } = require('./_temp_41_50');
const { getT51to55 } = require('./_temp_51_55');
