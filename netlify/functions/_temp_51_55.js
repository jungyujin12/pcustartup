// ╔══════════════════════════════════════════════════════════════╗
// ║                    temp_51_55.js                            ║
// ║              포트폴리오 템플릿 T51~T55                        ║
// ║                                                              ║
// ║   T51 사회복지관  — 따뜻한 커뮤니티 보드형                      ║
// ║   T52 상담센터   — 심리상담 마인드맵형                          ║
// ║   T53 유치원     — 유아교육 스티커북형                          ║
// ║   T54 NGO       — 소셜임팩트 인포그래픽형                       ║
// ║   T55 출판사     — 책 표지/북커버형                             ║
// ╚══════════════════════════════════════════════════════════════╝

function getT51to55({ pageId, major, strength, company, oneLineDesc, tags, keywords, companyName, createdAt, ac, tagStr, keywordStr, footer, gfonts, meta, extraSections, headline, subheadline, subheadlineHtml }) {

  // ════════════════════════════
  // T51 — 사회복지관 커뮤니티 보드
  // 특징: 따뜻한 커뮤니티 게시판, 포스트잇, 손글씨 감성
  // ════════════════════════════
  const T51 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fef9f0;color:#2a1800;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .welfare-header{background:#ff8c42;color:#fff;padding:0.9rem 2rem;display:flex;align-items:center;justify-content:space-between}
    .wh-logo{font-size:1.1rem;font-weight:900;letter-spacing:0.05em}
    .wh-sub{font-size:0.6rem;opacity:0.85;letter-spacing:0.05em}
    .board{max-width:800px;margin:1.5rem auto;padding:0 1.5rem}
    .board-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5rem);color:#ff8c42;letter-spacing:0.04em;line-height:0.92;margin-bottom:0.5rem}
    .board-desc{font-size:0.95rem;color:#4a2800;line-height:1.75;font-weight:300;margin-bottom:0.5rem}
    .board-meta{font-size:0.72rem;color:#a07040;margin-bottom:1.5rem}
    .sticky-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
    .sticky{border-radius:4px;padding:1.25rem;box-shadow:3px 3px 8px rgba(0,0,0,0.1);position:relative;min-height:120px}
    .sticky::before{content:'';position:absolute;top:0;left:0;right:0;height:28px;background:rgba(0,0,0,0.08);border-radius:4px 4px 0 0}
    .sticky-1{background:#fff9a0}
    .sticky-2{background:#a8f0c8}
    .sticky-3{background:#ffc8a0}
    .sticky-4{background:#c8d8ff}
    .sticky-5{background:#ffc8d8}
    .sticky-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:0.6rem;margin-top:0.3rem;display:block;font-weight:700}
    .sticky-content{font-size:0.82rem;color:#2a1800;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:rgba(255,140,66,0.15);font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:999px;color:#8b4000}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap}
    .kw{font-size:0.7rem;background:#ff8c42;color:#fff;padding:0.2rem 0.6rem;border-radius:999px;font-weight:700}
    .hero-sticky{background:#fffde0;border-radius:8px;padding:1.75rem;box-shadow:4px 4px 12px rgba(0,0,0,0.1);margin-bottom:1.5rem;border-left:4px solid #ff8c42}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#c09060;display:flex;justify-content:space-between;border-top:1px solid #f0d8b0}
    footer a{color:#ff8c42;text-decoration:none}
    @media(max-width:600px){.sticky-grid{grid-template-columns:1fr 1fr}}
  </style>
</head><body>
  <div class="welfare-header">
    <div class="wh-logo">🤝 사회복지관 포트폴리오</div>
    <div class="wh-sub">사회복지관 스타일</div>
  </div>
  <div class="board">
    <div style="margin:1.5rem 0">
      <div class="board-title">${pageId}</div>
      <div class="board-desc">${oneLineDesc}</div>
      <div class="board-meta">${major}${strength ? " · " + strength : ""} · ${createdAt}</div>
      ${keywords.length ? `<div class="kws" style="margin-bottom:1rem">${keywordStr}</div>` : ""}
    </div>
    <div class="sticky-grid">
      ${tags.length ? `<div class="sticky sticky-1"><span class="sticky-label">관심 분야</span><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="sticky sticky-2"><span class="sticky-label">강점 스타일</span><div class="sticky-content">${strength}</div></div>` : ""}
      ${companyName ? `<div class="sticky sticky-3"><span class="sticky-label">롤모델 기업</span><div class="sticky-content">${companyName}</div></div>` : ""}
      <div class="sticky sticky-4"><span class="sticky-label">전공</span><div class="sticky-content">${major}</div></div>
      ${keywords.length ? `<div class="sticky sticky-5" style="grid-column:span 2"><span class="sticky-label">핵심 역량</span><div class="kws">${keywordStr}</div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T52 — 상담센터 마인드맵
  // 특징: 심리상담 감성, 부드러운 버블, 마인드맵 레이아웃
  // ════════════════════════════
  const T52 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fdf0ff;color:#1a0033;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .counsel-header{background:linear-gradient(135deg,#9b26af,#c94fdb);color:#fff;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .ch-name{font-size:1rem;font-weight:700;letter-spacing:0.05em}
    .ch-sub{font-size:0.6rem;opacity:0.8}
    .mind-hero{padding:3.5rem 3rem 2rem;text-align:center;position:relative}
    .mh-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#9b26af;margin-bottom:1rem;display:block;font-weight:700}
    .mh-center{display:inline-block;background:linear-gradient(135deg,#9b26af,#c94fdb);color:#fff;border-radius:50%;width:180px;height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 2rem;box-shadow:0 8px 32px rgba(155,38,175,0.25)}
    .mh-id{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;letter-spacing:0.04em;line-height:0.95}
    .mh-sub{font-size:0.65rem;opacity:0.85;margin-top:0.3rem}
    .mh-desc{font-size:0.92rem;color:#3a0055;line-height:1.75;max-width:500px;margin:0 auto 0.5rem;font-weight:300}
    .mh-meta{font-size:0.7rem;color:#7a40a0;margin-bottom:2rem}
    .bubble-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:700px;margin:0 auto;padding:0 2rem 2rem}
    .bubble{background:#fff;border-radius:20px;padding:1.25rem 1.5rem;box-shadow:0 4px 16px rgba(155,38,175,0.08);border:1.5px solid #e8c8f8;position:relative}
    .bubble::before{content:'';position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:16px;height:16px;background:${ac.accent};border-radius:50%}
    .b-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700;margin-top:0.25rem}
    .b-value{font-size:0.82rem;color:#2a0044;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#f5e8ff;font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:999px;color:#7a00aa}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap;justify-content:center;margin:0.5rem 0 1rem}
    .kw{font-size:0.7rem;background:#9b26af;color:#fff;padding:0.22rem 0.7rem;border-radius:999px;font-weight:700}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#b080c0;display:flex;justify-content:space-between;border-top:1px solid #e8c8f8}
    footer a{color:#9b26af;text-decoration:none}
    @media(max-width:600px){.bubble-grid{grid-template-columns:1fr 1fr}.mind-hero{padding:2.5rem 1.5rem 1.5rem}}
  </style>
</head><body>
  <div class="counsel-header">
    <div class="ch-name">💜 상담센터 포트폴리오</div>
    <div class="ch-sub">상담센터 스타일</div>
  </div>
  <div class="mind-hero">
    <span class="mh-badge">MIND MAP PORTFOLIO · 마인드맵 포트폴리오</span>
    <div class="mh-center">
      <div class="mh-id">${pageId}</div>
      <div class="mh-sub">${major.split(" - ")[0]}</div>
    </div>
    <div class="mh-desc">${oneLineDesc}</div>
    <div class="mh-meta">${major}${strength ? " · " + strength : ""} · ${createdAt}</div>
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="bubble-grid">
    ${tags.length ? `<div class="bubble"><div class="b-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="bubble"><div class="b-label">강점 스타일</div><div class="b-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="bubble"><div class="b-label">롤모델 기업</div><div class="b-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T53 — 유치원 스티커북
  // 특징: 유아교육 밝고 귀여운, 스티커북, 무지개 컬러
  // ════════════════════════════
  const T53 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff9f0;color:#2a1a00;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .kinder-header{background:linear-gradient(90deg,#ff6b6b,#ffa500,#ffdd57,#51cf66,#339af0,#845ef7);color:#fff;padding:0.75rem 2rem;font-size:0.8rem;font-weight:700;letter-spacing:0.1em;text-align:center;text-shadow:0 1px 3px rgba(0,0,0,0.2)}
    .sticker-book{max-width:760px;margin:1.5rem auto;padding:0 1.5rem}
    .sb-cover{background:linear-gradient(135deg,#fff9c4,#ffe0b2);border-radius:20px;padding:3rem 2.5rem;text-align:center;margin-bottom:1.5rem;box-shadow:0 6px 24px rgba(255,150,0,0.12);position:relative;overflow:hidden;border:3px solid #ffcc02}
    .sb-cover::before{content:'⭐';position:absolute;top:1rem;left:1.5rem;font-size:2rem;opacity:0.3}
    .sb-cover::after{content:'🌟';position:absolute;bottom:1rem;right:1.5rem;font-size:2rem;opacity:0.3}
    .sc-badge{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:#ff6b00;margin-bottom:1rem;display:block;font-weight:700}
    .sc-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);background:linear-gradient(135deg,#ff6b00,#ff9500);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.04em;line-height:0.92}
    .sc-desc{font-size:0.95rem;color:#5a3000;line-height:1.7;margin-top:0.75rem;font-weight:400}
    .sc-meta{font-size:0.72rem;color:#a06020;margin-top:0.5rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;justify-content:center;margin-top:1rem}
    .kw{font-size:0.72rem;background:#ff6b00;color:#fff;padding:0.25rem 0.75rem;border-radius:999px;font-weight:700}
    .sticker-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
    .sticker{border-radius:16px;padding:1.5rem;text-align:center;position:relative;box-shadow:0 4px 12px rgba(0,0,0,0.08)}
    .sticker-1{background:#fff9c4;border:2px dashed #ffcc02}
    .sticker-2{background:#c8f5d8;border:2px dashed #4caf50}
    .sticker-3{background:#c8e8ff;border:2px dashed #2196f3}
    .sticker-4{background:#ffd8e0;border:2px dashed #f06292}
    .sticker-icon{font-size:2rem;margin-bottom:0.5rem}
    .sticker-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(0,0,0,0.4);margin-bottom:0.4rem;display:block;font-weight:700}
    .sticker-value{font-size:0.82rem;color:#2a1a00;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem;justify-content:center}
    .tag{background:rgba(255,107,0,0.1);font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:999px;color:#cc4400}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#b08040;display:flex;justify-content:space-between;border-top:2px dashed #ffd080}
    footer a{color:#ff6b00;text-decoration:none}
    @media(max-width:600px){.sticker-row{grid-template-columns:1fr 1fr}}
  </style>
</head><body>
  <div class="kinder-header">🌈 유치원 스타일 🌈</div>
  <div class="sticker-book">
    <div class="sb-cover">
      <span class="sc-badge">MY PORTFOLIO STICKER BOOK · 나만의 포트폴리오</span>
      <div class="sc-title">${pageId}</div>
      <div class="sc-desc">${oneLineDesc}</div>
      <div class="sc-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="sticker-row">
      ${tags.length ? `<div class="sticker sticker-1"><div class="sticker-icon">🎯</div><span class="sticker-label">관심 분야</span><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="sticker sticker-2"><div class="sticker-icon">💪</div><span class="sticker-label">강점 스타일</span><div class="sticker-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="sticker sticker-3"><div class="sticker-icon">🏢</div><span class="sticker-label">롤모델 기업</span><div class="sticker-value">${companyName}</div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T54 — NGO 소셜임팩트 인포그래픽
  // 특징: 소셜임팩트 데이터 시각화, 그린+화이트, 지구 감성
  // ════════════════════════════
  const T54 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0fff8;color:#003322;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .ngo-header{background:#006633;color:#fff;padding:1rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .nh-logo{font-size:1rem;font-weight:700;letter-spacing:0.08em;display:flex;align-items:center;gap:0.5rem}
    .nh-sub{font-size:0.6rem;opacity:0.75;letter-spacing:0.05em}
    .impact-hero{background:linear-gradient(160deg,#003322,#006633);color:#fff;padding:4rem 3rem;position:relative;overflow:hidden}
    .ih-globe{position:absolute;right:-60px;top:50%;transform:translateY(-50%);font-size:18rem;opacity:0.06;line-height:1}
    .ih-badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:#a0ffcc;margin-bottom:1rem;display:block;opacity:0.8}
    .ih-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .ih-sdg{display:inline-block;background:#a0ffcc;color:#003322;font-size:0.65rem;font-weight:900;padding:0.2rem 0.7rem;letter-spacing:0.08em;margin-top:0.5rem}
    .ih-desc{font-size:0.9rem;font-weight:300;margin-top:0.75rem;opacity:0.85;line-height:1.65;max-width:500px;position:relative}
    .ih-meta{font-size:0.7rem;color:rgba(255,255,255,0.55);margin-top:0.5rem;position:relative}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.7rem;background:#a0ffcc;color:#003322;padding:0.22rem 0.65rem;font-weight:900;border-radius:2px}
    .impact-metrics{display:grid;grid-template-columns:repeat(4,1fr);background:#003322;border-top:1px solid #004d33}
    .metric{padding:1.5rem 1.25rem;text-align:center;border-right:1px solid #004d33}
    .metric:last-child{border-right:none}
    .metric-icon{font-size:1.5rem;margin-bottom:0.4rem}
    .metric-num{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#a0ffcc;line-height:1}
    .metric-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:#4d8060;margin-top:0.2rem}
    .impact-body{max-width:760px;margin:0 auto;padding:2rem 3rem;display:flex;flex-direction:column;gap:1rem}
    .impact-card{background:#fff;border-radius:8px;padding:1.5rem;border-left:4px solid ${ac.accent};box-shadow:0 2px 8px rgba(0,102,51,0.06)}
    .ic-label{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700}
    .ic-value{font-size:0.88rem;color:#003322;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e0fff0;font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:3px;color:#005533}
    footer{background:#003322;color:rgba(255,255,255,0.3);padding:1.25rem 2.5rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:#a0ffcc;text-decoration:none}
    @media(max-width:700px){.impact-metrics{grid-template-columns:1fr 1fr}.impact-hero,.impact-body{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="ngo-header">
    <div class="nh-logo">🌍 NGO PORTFOLIO</div>
    <div class="nh-sub">NGO 스타일</div>
  </div>
  <div class="impact-hero">
    <div class="ih-globe">🌍</div>
    <span class="ih-badge">SOCIAL IMPACT PORTFOLIO · 소셜임팩트 포트폴리오</span>
    <div class="ih-title">${pageId}</div>
    <div class="ih-sdg">SDG CHAMPION</div>
    <div class="ih-desc">${oneLineDesc}</div>
    <div class="ih-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="impact-metrics">
    <div class="metric"><div class="metric-icon">🎯</div><div class="metric-num">${tags.length}</div><div class="metric-label">관심분야</div></div>
    <div class="metric"><div class="metric-icon">💡</div><div class="metric-num">${keywords.length}</div><div class="metric-label">핵심역량</div></div>
    <div class="metric"><div class="metric-icon">🌱</div><div class="metric-num">100%</div><div class="metric-label">임팩트</div></div>
    <div class="metric"><div class="metric-icon">🤝</div><div class="metric-num">A+</div><div class="metric-label">등급</div></div>
  </div>
  <div class="impact-body">
    ${tags.length ? `<div class="impact-card"><div class="ic-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="impact-card"><div class="ic-label">강점 스타일</div><div class="ic-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="impact-card"><div class="ic-label">롤모델 기업</div><div class="ic-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T55 — 출판사 북커버
  // 특징: 책 표지 디자인, 에디토리얼, 크림+다크브라운
  // ════════════════════════════
  const T55 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5efe0;color:#1a0e00;font-family:'Noto Sans KR',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
    .book-wrap{display:flex;gap:0;max-width:800px;width:100%;box-shadow:12px 12px 40px rgba(0,0,0,0.2)}
    .book-spine{width:48px;background:linear-gradient(180deg,#1a0e00,#3a2000);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .spine-text{writing-mode:vertical-rl;transform:rotate(180deg);font-family:'Bebas Neue',sans-serif;font-size:0.9rem;letter-spacing:0.15em;color:#c8a000;white-space:nowrap}
    .book-cover{flex:1;background:#fff8e8;position:relative;overflow:hidden;min-height:600px}
    .cover-top{background:${ac.accent};height:8px}
    .cover-header{padding:2rem 2.5rem 0;border-bottom:1px solid #d8c880}
    .ch-publisher{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#8a6800;margin-bottom:0.5rem;display:block}
    .ch-series{font-size:0.72rem;color:#5a4000;margin-bottom:1rem;font-style:italic}
    .cover-hero{padding:2rem 2.5rem;flex:1}
    .book-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#1a0e00;letter-spacing:0.04em;line-height:0.92;margin-bottom:0.75rem}
    .book-subtitle{font-size:1rem;color:#3a2000;font-weight:300;line-height:1.6;font-style:italic;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:2px solid #c8a000}
    .book-toc{margin-bottom:1.5rem}
    .toc-title{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#c8a000;margin-bottom:0.75rem;font-weight:700}
    .toc-item{display:flex;align-items:baseline;gap:0.5rem;padding:0.4rem 0;border-bottom:1px dotted #d8c880;font-size:0.82rem;color:#2a1a00}
    .toc-num{font-size:0.65rem;color:#c8a000;font-weight:700;min-width:24px}
    .toc-dots{flex:1;border-bottom:1px dotted #d8c880;margin:0 0.3rem;height:0.7em}
    .toc-page{font-size:0.65rem;color:#8a6800}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1px solid #d8c880;font-size:0.7rem;padding:0.15rem 0.55rem;color:#7a6000}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.5rem}
    .kw{font-size:0.68rem;background:#1a0e00;color:#c8a000;padding:0.2rem 0.55rem;font-weight:700}
    .cover-footer{padding:1.25rem 2.5rem;border-top:2px solid #1a0e00;background:#f0e8c8;display:flex;justify-content:space-between;align-items:center}
    .cf-author{font-size:0.8rem;font-weight:700;color:#1a0e00}
    .cf-isbn{font-size:0.6rem;color:#8a6800;font-family:monospace;letter-spacing:0.05em}
    footer{display:none}
    .page-footer{padding:1rem 0;font-size:0.65rem;color:#9a8840;display:flex;justify-content:center;gap:2rem;margin-top:1rem}
    .page-footer a{color:#1a0e00;text-decoration:none;font-weight:700}
    @media(max-width:600px){.book-wrap{flex-direction:column}.book-spine{width:100%;height:40px;writing-mode:horizontal-tb}.spine-text{writing-mode:horizontal-tb;transform:none}.book-cover{min-height:auto}.cover-header,.cover-hero,.cover-footer{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div style="width:100%;max-width:860px">
    <div class="book-wrap">
      <div class="book-spine"><div class="spine-text">출판사 스타일</div></div>
      <div class="book-cover">
        <div class="cover-top"></div>
        <div class="cover-header">
          <span class="ch-publisher">PCU PUBLISHING · 배재대학교 출판사 스타일</span>
          <div class="ch-series">포트폴리오 시리즈 Vol.1</div>
        </div>
        <div class="cover-hero">
          <div class="book-title">${pageId}</div>
          <div class="book-subtitle">${oneLineDesc}<br/><span style="font-size:0.8rem;color:#5a4000">${major}${strength ? " · " + strength : ""}</span></div>
          <div class="book-toc">
            <div class="toc-title">목차 · CONTENTS</div>
            ${tags.length ? `<div class="toc-item"><span class="toc-num">01</span><span>관심 분야</span><span class="toc-dots"></span><div class="tags" style="gap:0.2rem">${tagStr}</div></div>` : ""}
            ${strength ? `<div class="toc-item"><span class="toc-num">02</span><span>강점 스타일 — ${strength}</span><span class="toc-dots"></span><span class="toc-page">p.02</span></div>` : ""}
            ${companyName ? `<div class="toc-item"><span class="toc-num">03</span><span>롤모델 기업 — ${companyName}</span><span class="toc-dots"></span><span class="toc-page">p.03</span></div>` : ""}
            ${keywords.length ? `<div class="toc-item"><span class="toc-num">04</span><span>핵심 역량</span><span class="toc-dots"></span><div class="kws">${keywordStr}</div></div>` : ""}
          </div>
        </div>
        <div class="cover-footer">
          <div class="cf-author">${major} · ${createdAt}</div>
          <div class="cf-isbn">PCU-2026-${pageId.toUpperCase()}</div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>pcuportfolio.kro.kr/${pageId}</span>
      <a href="https://pcu-startup.netlify.app" target="_blank">배재대학교 창업지원팀</a>
    </div>
  </div>
  ${extraSections}
</body></html>`;

  const templates = { T51, T52, T53, T54, T55 };
  return templates;
}

module.exports = { getT51to55 };
