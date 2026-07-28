// ╔══════════════════════════════════════════════════════════════╗
// ║                    temp_21_30.js                            ║
// ║              포트폴리오 템플릿 T21~T30                        ║
// ║                                                              ║
// ║   T21 원티드    — HR테크 커리어 카드형                         ║
// ║   T22 라인      — 글로벌 채팅 버블형                           ║
// ║   T23 SK하이닉스 — 반도체 회로기판형                           ║
// ║   T24 삼성바이오 — 바이오 연구논문형                           ║
// ║   T25 현대자동차 — 모빌리티 속도감형                           ║
// ║   T26 롯데      — 유통 쇼핑몰 배너형                           ║
// ║   T27 신세계    — 럭셔리 에디토리얼형                          ║
// ║   T28 배달의민족 — 메뉴판 팝아트형                             ║
// ║   T29 JTBC     — 뉴스룸 브리핑형                              ║
// ║   T30 MBC      — 방송 큐시트 타임라인형                        ║
// ╚══════════════════════════════════════════════════════════════╝

function getT21to30({ pageId, major, strength, company, oneLineDesc, tags, keywords, companyName, createdAt, ac, tagStr, keywordStr, footer, gfonts, meta, extraSections, headline, subheadline, subheadlineHtml }) {

  // ════════════════════════════
  // T21 — 원티드 HR테크
  // 특징: 커리어 프로필 카드, 좌측 프로필바 + 우측 스킬셋
  // ════════════════════════════
  const T21 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f7f8fc;color:#1a1033;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .layout{display:grid;grid-template-columns:320px 1fr;min-height:100vh}
    .sidebar{background:linear-gradient(160deg,#5b21b6,#7c3aed);color:#fff;padding:3rem 2rem;display:flex;flex-direction:column;gap:2rem}
    .profile-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:0.5rem}
    .profile-id{font-family:'Bebas Neue',sans-serif;font-size:4rem;color:#fff;letter-spacing:0.04em;line-height:0.92;text-shadow:0 0 40px rgba(255,255,255,0.2)}
    .profile-desc{font-size:0.88rem;font-weight:300;opacity:0.85;line-height:1.7;margin-top:0.5rem}
    .profile-meta{font-size:0.7rem;color:rgba(255,255,255,0.55);margin-top:0.5rem;letter-spacing:0.05em}
    .profile-divider{height:1px;background:rgba(255,255,255,0.15);margin:0.5rem 0}
    .profile-section-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem}
    .kws{display:flex;flex-wrap:wrap;gap:0.4rem}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;border-radius:4px;font-weight:700}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:rgba(255,255,255,0.1);font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:4px;color:rgba(255,255,255,0.85)}
    .main{padding:3rem 2.5rem;background:#f7f8fc;display:flex;flex-direction:column;gap:1.25rem}
    .main-title{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.05em;color:${ac.accent};margin-bottom:0.5rem}
    .card{background:#fff;border-radius:12px;padding:1.5rem 1.75rem;box-shadow:0 2px 12px rgba(91,33,182,0.06);border:1px solid #ede9fe}
    .card-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700}
    .card-value{font-size:0.9rem;line-height:1.7;color:#2e1065}
    .skill-bar{display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem}
    .skill-name{font-size:0.8rem;min-width:80px;color:#4a3080}
    .skill-track{flex:1;height:4px;background:#ede9fe;border-radius:2px}
    .skill-fill{height:100%;background:${ac.accent};border-radius:2px}
    footer{padding:1.5rem 2.5rem;font-size:0.65rem;color:#a090c0;display:flex;justify-content:space-between;border-top:1px solid #ede9fe;background:#fff}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.layout{grid-template-columns:1fr}.sidebar{padding:2.5rem 1.5rem}}
  </style>
</head><body>
  <div class="layout">
    <div class="sidebar">
      <div>
        <div class="profile-badge">원티드 스타일</div>
        <div class="profile-id">${pageId}</div>
        <div class="profile-desc">${oneLineDesc}</div>
        <div class="profile-meta">${major}${strength ? " · " + strength : ""}</div>
      </div>
      <div class="profile-divider"></div>
      ${keywords.length ? `<div><div class="profile-section-label">핵심 역량</div><div class="kws">${keywordStr}</div></div>` : ""}
      ${tags.length ? `<div><div class="profile-section-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    </div>
    <div class="main">
      <div class="main-title">MY CAREER PROFILE</div>
        <div style="margin-top:1rem">
          ${keywords.map((k,i) => `<div class="skill-bar"><span class="skill-name">${k}</span><div class="skill-track"><div class="skill-fill" style="width:${85-i*10}%"></div></div></div>`).join("")}
        </div>
      <div class="card"><div class="card-label">전공</div><div class="card-value">${major}</div></div>
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T22 — 라인 글로벌
  // 특징: 채팅 버블형, 대화 UI, 친근한 인터랙션
  // ════════════════════════════
  const T22 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#e8f5e9;color:#003300;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#00b300;padding:1rem 2rem;display:flex;align-items:center;gap:0.75rem}
    .topbar-dot{width:10px;height:10px;background:#fff;border-radius:50%}
    .topbar-name{font-size:0.9rem;font-weight:700;color:#fff}
    .topbar-status{font-size:0.65rem;color:rgba(255,255,255,0.75)}
    .chat{max-width:600px;margin:0 auto;padding:2rem 1.5rem;display:flex;flex-direction:column;gap:1.25rem}
    .bubble-wrap{display:flex;gap:0.75rem;align-items:flex-end}
    .bubble-wrap.right{flex-direction:row-reverse}
    .avatar{width:36px;height:36px;border-radius:50%;background:${ac.accent};display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff;flex-shrink:0}
    .bubble{background:#fff;border-radius:18px 18px 18px 4px;padding:0.9rem 1.2rem;max-width:80%;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
    .bubble.right{background:${ac.accent};color:#fff;border-radius:18px 18px 4px 18px}
    .bubble-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.3rem;font-weight:700}
    .bubble.right .bubble-label{color:rgba(255,255,255,0.7)}
    .bubble-text{font-size:0.88rem;line-height:1.6}
    .bubble-time{font-size:0.6rem;color:#aaa;margin-top:0.3rem;text-align:right}
    .bubble.right .bubble-time{color:rgba(255,255,255,0.6)}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem}
    .tag{background:${ac.accent}22;font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:999px;color:${ac.accent};font-weight:500}
    .hero-bubble{background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08);margin-bottom:0.5rem}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:3.5rem;color:${ac.accent};letter-spacing:0.04em;line-height:0.9}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#4d8060;display:flex;justify-content:space-between;border-top:1px solid #c8f5c8;background:#fff}
    footer a{color:${ac.accent};text-decoration:none}
  </style>
</head><body>
  <div class="topbar">
    <div class="topbar-dot"></div>
    <div><div class="topbar-name">${pageId}</div><div class="topbar-status">배재대학교 전공탐색 박람회 2026</div></div>
  </div>
  <div class="chat">
    <div class="bubble-wrap">
      <div class="avatar">PCU</div>
      <div class="bubble">
        <div class="bubble-label">라인 스타일 · 프로필</div>
        <div class="hero-id">${oneLineDesc}</div>
        <div class="bubble-text" style="margin-top:0.5rem">${oneLineDesc}</div>
        <div class="bubble-time">${major}</div>
      </div>
    </div>
    ${tags.length ? `<div class="bubble-wrap right">
      <div class="avatar" style="background:#fff;color:${ac.accent}">ME</div>
      <div class="bubble right">
        <div class="bubble-label">관심 분야</div>
        <div class="tags">${tagStr}</div>
        <div class="bubble-time">${createdAt}</div>
      </div>
    </div>` : ""}
    ${strength ? `<div class="bubble-wrap">
      <div class="avatar">PCU</div>
      <div class="bubble">
        <div class="bubble-label">강점 스타일</div>
        <div class="bubble-text">${strength}</div>
      </div>
    </div>` : ""}
    ${companyName ? `<div class="bubble-wrap right">
      <div class="avatar" style="background:#fff;color:${ac.accent}">ME</div>
      <div class="bubble right">
        <div class="bubble-label">롤모델 기업</div>
        <div class="bubble-text">${companyName}</div>
      </div>
    </div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T23 — SK하이닉스 반도체
  // 특징: 회로기판 패턴, 테크 HUD, 데이터 시각화형
  // ════════════════════════════
  const T23 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#060a0e;color:#e0f0ff;font-family:'Space Mono','Noto Sans KR',monospace;min-height:100vh;overflow-x:hidden}
    .circuit{position:fixed;inset:0;opacity:0.04;background-image:repeating-linear-gradient(0deg,${ac.accent} 0,${ac.accent} 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,${ac.accent} 0,${ac.accent} 1px,transparent 1px,transparent 40px);pointer-events:none}
    .hud-top{background:rgba(0,20,40,0.9);border-bottom:1px solid ${ac.accent}44;padding:0.75rem 2rem;display:flex;justify-content:space-between;align-items:center;font-size:0.6rem;letter-spacing:0.15em;color:${ac.accent};position:sticky;top:0;z-index:10}
    .hero{padding:4rem 3rem 3rem;position:relative;z-index:1}
    .sys-label{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:${ac.accent};margin-bottom:1rem;opacity:0.7}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,8rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.9;text-shadow:0 0 60px ${ac.glow}}
    .hero-desc{font-size:0.9rem;margin-top:1rem;color:#a0c0d0;line-height:1.7;max-width:500px;font-family:'Noto Sans KR',sans-serif}
    .hero-meta{font-size:0.65rem;color:#406070;margin-top:0.6rem;letter-spacing:0.1em}
    .data-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${ac.accent}22;margin:2rem 0;position:relative;z-index:1}
    .data-cell{background:#060a0e;padding:1.5rem 1.75rem;border:1px solid ${ac.accent}11}
    .data-label{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;opacity:0.7}
    .data-value{font-size:0.85rem;color:#c0dff0;font-family:'Noto Sans KR',sans-serif;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.5rem}
    .tag{background:${ac.tag};border:1px solid ${ac.glow};font-size:0.65rem;padding:0.15rem 0.5rem;color:${ac.accent};letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative;z-index:1;padding:0 3rem}
    .kw{font-size:0.65rem;color:${ac.accent};border:1px solid ${ac.glow};padding:0.2rem 0.6rem;letter-spacing:0.1em}
    footer{padding:1.5rem 3rem;font-size:0.6rem;color:#204050;display:flex;justify-content:space-between;border-top:1px solid ${ac.accent}22;position:relative;z-index:1}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.5}
    @media(max-width:700px){.data-grid{grid-template-columns:1fr}.hero,.kws{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="circuit"></div>
  <div class="hud-top">
    <span>SYS: PCU-PORTFOLIO-2026</span>
    <span>ID: ${pageId.toUpperCase()}</span>
    <span>STATUS: ONLINE</span>
  </div>
  <div class="hero">
    <div class="sys-label">SK하이닉스 스타일</div>
    <div class="hero-id">${oneLineDesc}</div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
  </div>
  ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  <div class="data-grid">
    ${tags.length ? `<div class="data-cell"><div class="data-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="data-cell"><div class="data-label">강점 스타일</div><div class="data-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="data-cell"><div class="data-label">롤모델 기업</div><div class="data-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T24 — 삼성바이오 바이오테크
  // 특징: 연구논문형, 학술 레이아웃, 청록+화이트
  // ════════════════════════════
  const T24 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#003333;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .journal-header{background:#005f60;color:#fff;padding:1rem 3rem;display:flex;justify-content:space-between;align-items:center}
    .journal-name{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.1em}
    .journal-vol{font-size:0.65rem;opacity:0.7;letter-spacing:0.05em}
    .abstract{max-width:800px;margin:0 auto;padding:3rem 3rem 2rem;border-bottom:2px solid #005f60}
    .paper-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#005f60;margin-bottom:1rem;display:block;font-weight:700}
    .paper-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,7vw,4.5rem);color:#003333;letter-spacing:0.04em;line-height:0.95;margin-bottom:1rem}
    .paper-author{font-size:0.85rem;color:#005f60;font-weight:700;margin-bottom:0.3rem}
    .paper-affil{font-size:0.75rem;color:#4d8080;margin-bottom:1.5rem}
    .abstract-box{background:#f0fffe;border-left:3px solid #005f60;padding:1.25rem 1.5rem;font-size:0.88rem;line-height:1.75;color:#1a4444}
    .keywords-row{margin-top:1rem;font-size:0.78rem;color:#4d8080}
    .keywords-row span{font-weight:700;color:#005f60}
    .body{max-width:800px;margin:0 auto;padding:2rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
    .section{border-top:1px solid #b2ebf2;padding-top:1rem}
    .sec-num{font-size:0.6rem;color:#005f60;font-weight:700;letter-spacing:0.1em;margin-bottom:0.3rem}
    .sec-title{font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:#003333;margin-bottom:0.5rem;font-weight:700}
    .sec-content{font-size:0.85rem;line-height:1.7;color:#1a4444}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e0f7fa;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:2px;color:#006064}
    footer{background:#005f60;color:rgba(255,255,255,0.5);padding:1.25rem 3rem;font-size:0.65rem;display:flex;justify-content:space-between;margin-top:2rem}
    footer a{color:rgba(255,255,255,0.8);text-decoration:none}
    @media(max-width:700px){.body{grid-template-columns:1fr}.abstract,.body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="journal-header">
    <div class="journal-name">PCU BIOTECH JOURNAL</div>
    <div class="journal-vol">배재대학교 · 전공탐색 박람회 2026</div>
  </div>
  <div class="abstract">
    <span class="paper-badge">삼성바이오 스타일 · ORIGINAL ARTICLE</span>
    <div class="paper-title">${pageId}</div>
    <div class="paper-author">${oneLineDesc}</div>
    <div class="paper-affil">${major}${strength ? ", " + strength : ""} · 배재대학교</div>
    <div class="abstract-box">${oneLineDesc} — ${major} 전공자로서 ${strength || "전문성"}을 바탕으로 바이오테크 분야에서 새로운 가치를 창출하고자 합니다.</div>
    ${keywords.length ? `<div class="keywords-row"><span>Keywords:</span> ${keywords.join(", ")}</div>` : ""}
  </div>
  <div class="body">
    ${tags.length ? `<div class="section"><div class="sec-num">01.</div><div class="sec-title">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="section"><div class="sec-num">02.</div><div class="sec-title">강점 스타일</div><div class="sec-content">${strength}</div></div>` : ""}
    ${companyName ? `<div class="section"><div class="sec-num">03.</div><div class="sec-title">롤모델 기업</div><div class="sec-content">${companyName}</div></div>` : ""}
    <div class="section"><div class="sec-num">04.</div><div class="sec-title">전공</div><div class="sec-content">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T25 — 현대자동차 모빌리티
  // 특징: 속도감 대각선 레이아웃, 다크실버, 와이드스크린
  // ════════════════════════════
  const T25 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#080808;color:#e8e8e8;font-family:'Noto Sans KR',sans-serif;min-height:100vh;overflow-x:hidden}
    .hero{min-height:60vh;position:relative;display:flex;align-items:flex-end;padding:4rem 3rem 3rem;overflow:hidden}
    .speed-lines{position:absolute;inset:0;background:repeating-linear-gradient(105deg,transparent,transparent 60px,rgba(255,255,255,0.01) 60px,rgba(255,255,255,0.01) 61px);pointer-events:none}
    .hero-bg{position:absolute;right:-10%;top:0;bottom:0;width:60%;background:linear-gradient(105deg,transparent 30%,#111 30%);pointer-events:none}
    .hero-content{position:relative;z-index:1;max-width:600px}
    .badge{font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:#888;margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,14vw,10rem);color:#fff;letter-spacing:0.02em;line-height:0.88}
    .hero-line{width:60px;height:2px;background:${ac.accent};margin:1.25rem 0}
    .hero-desc{font-size:1rem;font-weight:300;color:rgba(255,255,255,0.7);line-height:1.6;max-width:440px}
    .hero-meta{font-size:0.65rem;color:#555;margin-top:0.6rem;letter-spacing:0.12em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.65rem;color:${ac.accent};font-weight:700;letter-spacing:0.1em;border-bottom:1px solid ${ac.accent};padding-bottom:1px}
    .specs{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #1a1a1a}
    .spec{padding:2rem 1.75rem;border-right:1px solid #1a1a1a}
    .spec:last-child{border-right:none}
    .spec-label{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:#555;margin-bottom:0.5rem}
    .spec-value{font-size:0.88rem;color:#ccc;line-height:1.5;font-family:'Noto Sans KR',sans-serif}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1px solid #2a2a2a;font-size:0.7rem;padding:0.15rem 0.5rem;color:${ac.accent}}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#333;display:flex;justify-content:space-between;border-top:1px solid #111}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:700px){.specs{grid-template-columns:1fr 1fr}.hero{padding:3.5rem 1.5rem 2.5rem}.spec{padding:1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <div class="speed-lines"></div>
    <div class="hero-bg"></div>
    <div class="hero-content">
      <span class="badge">PCU PORTFOLIO</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="hero-line"></div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
  </div>
  <div class="specs">
    ${tags.length ? `<div class="spec"><div class="spec-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="spec"><div class="spec-label">강점 스타일</div><div class="spec-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="spec"><div class="spec-label">롤모델 기업</div><div class="spec-value">${companyName}</div></div>` : ""}
    <div class="spec"><div class="spec-label">전공</div><div class="spec-value">${major}</div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T26 — 롯데 유통
  // 특징: 쇼핑몰 배너형, 상품진열 그리드, 세일 감성
  // ════════════════════════════
  const T26 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5f5f5;color:#1a0000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .topbar{background:#cc0000;color:#fff;padding:0.5rem 2rem;font-size:0.65rem;letter-spacing:0.05em;display:flex;justify-content:space-between}
    .hero-banner{background:linear-gradient(135deg,#cc0000,#990000);color:#fff;padding:4rem 3rem;position:relative;overflow:hidden}
    .hero-banner::before{content:'LOTTE';position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Bebas Neue',sans-serif;font-size:15vw;color:rgba(255,255,255,0.05);letter-spacing:0.05em;pointer-events:none}
    .badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:1rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .hero-desc{font-size:1rem;font-weight:300;margin-top:0.75rem;opacity:0.88;line-height:1.6;position:relative}
    .hero-meta{font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:0.5rem;position:relative}
    .sale-badge{display:inline-block;background:#fff;color:#cc0000;font-size:0.7rem;font-weight:900;padding:0.2rem 0.6rem;margin-left:0.5rem;letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;font-weight:700}
    .product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;padding:2rem;background:#f5f5f5}
    .product-card{background:#fff;border-radius:4px;padding:1.5rem;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
    .product-label{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700}
    .product-value{font-size:0.88rem;line-height:1.6;color:#1a0000}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#fff0f0;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:2px;color:${ac.accent}}
    footer{background:#1a0000;color:rgba(255,255,255,0.3);padding:1.25rem 2rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.7}
    @media(max-width:700px){.product-grid{grid-template-columns:1fr 1fr}.hero-banner{padding:3rem 1.5rem}}
  </style>
</head><body>
  <div class="topbar"><span>배재대학교 · 전공탐색 박람회 2026</span><span>롯데 스타일</span></div>
  <div class="hero-banner">
    <span class="badge">MY PORTFOLIO</span>
    <div class="hero-id">${pageId}<span class="sale-badge">NEW</span></div>
    <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
    <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="product-grid">
    ${tags.length ? `<div class="product-card"><div class="product-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="product-card"><div class="product-label">강점 스타일</div><div class="product-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="product-card"><div class="product-label">롤모델 기업</div><div class="product-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T27 — 신세계 럭셔리
  // 특징: 럭셔리 매거진형, 골드라인, 여백의 미
  // ════════════════════════════
  const T27 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fafaf7;color:#1a1a00;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .gold-bar{height:3px;background:linear-gradient(90deg,transparent,#c8a000 20%,#e8c840 50%,#c8a000 80%,transparent)}
    .hero{padding:5rem 4rem 4rem;max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
    .hero-left .badge{font-size:0.5rem;letter-spacing:0.3em;text-transform:uppercase;color:#c8a000;margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,10vw,7rem);color:#1a1a00;letter-spacing:0.04em;line-height:0.9}
    .gold-line{width:40px;height:1px;background:#c8a000;margin:1.5rem 0}
    .hero-desc{font-size:0.95rem;font-weight:300;color:#3a3a20;line-height:1.8}
    .hero-meta{font-size:0.7rem;color:#8a8060;margin-top:0.5rem;letter-spacing:0.08em}
    .hero-right{border-left:1px solid #e8d8a0;padding-left:3rem;display:flex;flex-direction:column;gap:1.5rem}
    .info-item{}
    .info-label{font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:#c8a000;margin-bottom:0.4rem}
    .info-value{font-size:0.88rem;color:#2a2a10;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1px solid #d4c080;font-size:0.7rem;padding:0.15rem 0.55rem;color:#8a6800;letter-spacing:0.04em}
    .kws{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.65rem;color:#c8a000;letter-spacing:0.12em;text-transform:uppercase;font-weight:700}
    footer{max-width:900px;margin:0 auto;padding:2rem 4rem;font-size:0.65rem;color:#c0b880;display:flex;justify-content:space-between;border-top:1px solid #e8d8a0}
    footer a{color:#c8a000;text-decoration:none;opacity:0.7}
    @media(max-width:700px){.hero{grid-template-columns:1fr;padding:3rem 1.5rem}.hero-right{border-left:none;border-top:1px solid #e8d8a0;padding-left:0;padding-top:1.5rem}.footer{padding:1.5rem}}
  </style>
</head><body>
  <div class="gold-bar"></div>
  <div class="hero">
    <div class="hero-left">
      <span class="badge">PCU PORTFOLIO</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="gold-line"></div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="hero-right">
      ${tags.length ? `<div class="info-item"><div class="info-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="info-item"><div class="info-label">강점 스타일</div><div class="info-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="info-item"><div class="info-label">롤모델 기업</div><div class="info-value">${companyName}</div></div>` : ""}
    </div>
  </div>
  <div class="gold-bar"></div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T28 — 배달의민족 메뉴판
  // 특징: 식당 메뉴판 느낌, 블랙보드, 분필 감성
  // ════════════════════════════
  const T28 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#1a1a00;color:#fff8e6;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .chalkboard{background:#232300;border:8px solid #3a2800;padding:3rem;margin:1.5rem;border-radius:4px;position:relative}
    .chalkboard::before{content:'';position:absolute;inset:4px;border:1px dashed rgba(255,248,230,0.1);pointer-events:none}
    .menu-header{text-align:center;border-bottom:2px solid ${ac.accent};padding-bottom:1.5rem;margin-bottom:2rem}
    .menu-badge{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;display:block}
    .menu-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#fff8e6;letter-spacing:0.05em;line-height:0.9}
    .menu-subtitle{font-size:0.95rem;color:rgba(255,248,230,0.7);margin-top:0.75rem;font-weight:300;line-height:1.6}
    .menu-meta{font-size:0.72rem;color:${ac.accent};margin-top:0.5rem}
    .menu-divider{text-align:center;color:${ac.accent};font-size:1.2rem;margin:1.5rem 0;letter-spacing:0.5rem}
    .menu-section{margin-bottom:1.5rem}
    .menu-section-title{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem}
    .menu-section-title::after{content:'';flex:1;height:1px;background:${ac.accent}44}
    .menu-item{display:flex;justify-content:space-between;align-items:baseline;padding:0.4rem 0;border-bottom:1px dotted rgba(255,248,230,0.1)}
    .menu-item-name{font-size:0.88rem;color:#fff8e6}
    .menu-item-price{font-size:0.72rem;color:${ac.accent};font-weight:700}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem}
    .tag{background:rgba(255,248,230,0.08);font-size:0.7rem;padding:0.2rem 0.6rem;border-radius:2px;color:${ac.accent}}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.5rem}
    .kw{font-size:0.7rem;background:${ac.accent};color:#1a1200;padding:0.2rem 0.6rem;font-weight:900;border-radius:2px}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#4a3800;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
  </style>
</head><body>
  <div class="chalkboard">
    <div class="menu-header">
      <span class="menu-badge">배달의민족 스타일</span>
      <div class="menu-title">${pageId}</div>
      <div class="menu-subtitle">${oneLineDesc}</div>
      <div class="menu-meta">${major}${strength ? " · " + strength : ""}</div>
    </div>
    <div class="menu-divider">✦ ✦ ✦</div>
    ${keywords.length ? `<div class="menu-section"><div class="menu-section-title">오늘의 특선</div><div class="kws">${keywordStr}</div></div>` : ""}
    ${tags.length ? `<div class="menu-section"><div class="menu-section-title">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="menu-section"><div class="menu-section-title">강점 메뉴</div>
      <div class="menu-item"><span class="menu-item-name">${strength}</span><span class="menu-item-price">★★★★★</span></div>
    </div>` : ""}
    ${companyName ? `<div class="menu-section"><div class="menu-section-title">롤모델 기업</div>
      <div class="menu-item"><span class="menu-item-name">${companyName}</span><span class="menu-item-price">DREAM</span></div>
    </div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T29 — JTBC 뉴스룸
  // 특징: 방송 브리핑룸, 속보 하단바, 뉴스 레이아웃
  // ════════════════════════════
  const T29 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f4f8;color:#0a1428;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .breaking{background:#cc0000;color:#fff;padding:0.45rem 2rem;font-size:0.65rem;font-weight:700;letter-spacing:0.05em;display:flex;gap:1rem;align-items:center}
    .breaking-badge{background:#fff;color:#cc0000;font-size:0.55rem;padding:0.1rem 0.4rem;font-weight:900;letter-spacing:0.1em}
    .news-header{background:#0052a3;color:#fff;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .news-logo{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:0.1em}
    .news-date{font-size:0.65rem;opacity:0.7}
    .news-hero{background:#fff;border-bottom:3px solid #0052a3;padding:3rem 3rem 2rem;display:grid;grid-template-columns:2fr 1fr;gap:3rem;align-items:start}
    .headline{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5.5rem);color:#0a1428;letter-spacing:0.03em;line-height:0.95;margin-bottom:1rem}
    .lead{font-size:0.9rem;color:#1a3050;line-height:1.75;font-weight:300}
    .reporter{font-size:0.72rem;color:#0052a3;margin-top:0.75rem;font-weight:700}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.65rem;background:#0052a3;color:#fff;padding:0.2rem 0.6rem;font-weight:700}
    .sidebar-box{background:#f0f5fa;border:1px solid #dce8f0;padding:1.25rem}
    .sidebar-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#0052a3;margin-bottom:0.5rem;font-weight:700}
    .sidebar-value{font-size:0.85rem;color:#1a3050;line-height:1.6}
    .news-body{max-width:900px;margin:0 auto;padding:1.5rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
    .article-block{background:#fff;padding:1.25rem;border-top:3px solid ${ac.accent}}
    .article-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700}
    .article-text{font-size:0.85rem;line-height:1.6;color:#1a3050}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0fb;font-size:0.7rem;padding:0.15rem 0.5rem;color:#003580}
    .ticker{background:#0052a3;color:#fff;padding:0.5rem 2rem;font-size:0.65rem;letter-spacing:0.05em;overflow:hidden;white-space:nowrap}
    footer{background:#0a1428;color:rgba(255,255,255,0.3);padding:1.25rem 3rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.news-hero,.news-body{grid-template-columns:1fr;padding:2rem 1.5rem}.news-hero{gap:1.5rem}}
  </style>
</head><body>
  <div class="breaking"><span class="breaking-badge">BREAKING</span><span>배재대학교 전공탐색 박람회 2026 · 포트폴리오 생성</span></div>
  <div class="news-header"><div class="news-logo">PCU NEWS</div><div class="news-date">JTBC 스타일 · ${createdAt}</div></div>
  <div class="news-hero">
    <div>
      <div class="headline">${pageId}</div>
      <div class="lead">${oneLineDesc} — ${major} 전공자가 전하는 나만의 이야기.</div>
      <div class="reporter">기자: ${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div style="display:flex;flex-direction:column;gap:1rem">
      ${companyName ? `<div class="sidebar-box"><div class="sidebar-label">롤모델 기업</div><div class="sidebar-value">${companyName}</div></div>` : ""}
      <div class="sidebar-box"><div class="sidebar-label">전공</div><div class="sidebar-value">${major}</div></div>
    </div>
  </div>
  <div class="ticker">📢 ${oneLineDesc} &nbsp;&nbsp;|&nbsp;&nbsp; ${major} &nbsp;&nbsp;|&nbsp;&nbsp; ${keywords.join(" · ")} &nbsp;&nbsp;|&nbsp;&nbsp; ${createdAt}</div>
  <div class="news-body">
    ${tags.length ? `<div class="article-block"><div class="article-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="article-block"><div class="article-label">강점 스타일</div><div class="article-text">${strength}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T30 — MBC 방송 큐시트
  // 특징: 타임라인 큐시트, 방송제작 느낌, 퍼플+화이트
  // ════════════════════════════
  const T30 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f8f0ff;color:#1a0033;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .broadcast-header{background:#8b00ff;color:#fff;padding:0.75rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .bh-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.1em}
    .bh-live{background:#ff0000;font-size:0.6rem;font-weight:900;padding:0.15rem 0.5rem;letter-spacing:0.1em;animation:blink 1.5s infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}
    .cuesheet{max-width:800px;margin:0 auto;padding:2rem 2rem}
    .cue-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#8b00ff;letter-spacing:0.04em;line-height:0.92;margin-bottom:0.5rem}
    .cue-desc{font-size:0.95rem;font-weight:300;color:#2a0044;line-height:1.7;margin-bottom:0.5rem}
    .cue-meta{font-size:0.7rem;color:#6040a0;letter-spacing:0.05em;margin-bottom:1.5rem}
    .cue-divider{height:2px;background:linear-gradient(90deg,#8b00ff,transparent);margin:1.5rem 0}
    .cue-row{display:grid;grid-template-columns:80px 1fr;gap:1rem;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #dcc0ff}
    .cue-time{font-family:'Space Mono',monospace;font-size:0.8rem;color:#8b00ff;font-weight:700;padding-top:0.2rem}
    .cue-content{}
    .cue-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#6040a0;margin-bottom:0.25rem}
    .cue-value{font-size:0.88rem;color:#2a0044;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#f0e0ff;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:2px;color:#6000cc}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1rem}
    .kw{font-size:0.7rem;background:#8b00ff;color:#fff;padding:0.2rem 0.6rem;font-weight:700}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#a080c0;display:flex;justify-content:space-between;border-top:1px solid #dcc0ff}
    footer a{color:#8b00ff;text-decoration:none}
  </style>
</head><body>
  <div class="broadcast-header">
    <div class="bh-logo">PCU BROADCAST</div>
    <div style="display:flex;align-items:center;gap:0.75rem">
      <span style="font-size:0.65rem;opacity:0.7">MBC 스타일</span>
      <div class="bh-live">LIVE</div>
    </div>
  </div>
  <div class="cuesheet">
    <div class="cue-title">${pageId}</div>
    <div class="cue-desc">${oneLineDesc}</div>
    <div class="cue-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    <div class="cue-divider"></div>
    ${tags.length ? `<div class="cue-row"><div class="cue-time">00:01</div><div class="cue-content"><div class="cue-label">관심 분야</div><div class="tags">${tagStr}</div></div></div>` : ""}
    ${strength ? `<div class="cue-row"><div class="cue-time">00:02</div><div class="cue-content"><div class="cue-label">강점 스타일</div><div class="cue-value">${strength}</div></div></div>` : ""}
    ${companyName ? `<div class="cue-row"><div class="cue-time">00:03</div><div class="cue-content"><div class="cue-label">롤모델 기업</div><div class="cue-value">${companyName}</div></div></div>` : ""}
    <div class="cue-row"><div class="cue-time">FIN</div><div class="cue-content"><div class="cue-label">전공</div><div class="cue-value">${major}</div></div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  const templates = { T21, T22, T23, T24, T25, T26, T27, T28, T29, T30 };
  return templates;
}

module.exports = { getT21to30 };
