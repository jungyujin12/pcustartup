// ╔══════════════════════════════════════════════════════════════╗
// ║                    temp_31_40.js                            ║
// ║              포트폴리오 템플릿 T31~T40                        ║
// ║                                                              ║
// ║   T31 KBS       — 공영방송 아카이브형                          ║
// ║   T32 EBS       — 교육방송 학습카드형                          ║
// ║   T33 풀무원     — 자연식품 패키지형                            ║
// ║   T34 유한양행   — 제약 처방전형                               ║
// ║   T35 대웅제약   — 의료 인포그래픽형                            ║
// ║   T36 CJ제일제당 — 식품 레시피 카드형                           ║
// ║   T37 아디다스   — 3선 스트라이프형                             ║
// ║   T38 리복       — 다이나믹 대각선형                            ║
// ║   T39 뉴발란스   — N 포인트 미니멀형                            ║
// ║   T40 휠라       — 빈티지 이탈리아형                            ║
// ╚══════════════════════════════════════════════════════════════╝

function getT31to40({ pageId, major, strength, company, oneLineDesc, tags, keywords, companyName, createdAt, ac, tagStr, keywordStr, footer, gfonts, meta, extraSections, headline, subheadline, subheadlineHtml }) {

  // ════════════════════════════
  // T31 — KBS 공영방송 아카이브
  // 특징: 방송 아카이브 도서관형, 네이비+화이트, 시리즈물 느낌
  // ════════════════════════════
  const T31 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f4f8;color:#0a1428;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .archive-header{background:#003366;color:#fff;padding:0;display:grid;grid-template-columns:200px 1fr}
    .arch-logo-box{background:#002244;padding:1.5rem 2rem;display:flex;flex-direction:column;justify-content:center;border-right:1px solid rgba(255,255,255,0.1)}
    .arch-logo{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.1em;color:#fff}
    .arch-sub{font-size:0.55rem;letter-spacing:0.15em;color:rgba(255,255,255,0.5);margin-top:0.2rem}
    .arch-nav{padding:1rem 2rem;display:flex;align-items:center;gap:2rem}
    .arch-nav span{font-size:0.65rem;letter-spacing:0.1em;color:rgba(255,255,255,0.65);cursor:default}
    .arch-nav span.active{color:#fff;border-bottom:2px solid ${ac.accent};padding-bottom:0.2rem}
    .hero-archive{background:#fff;border-bottom:3px solid #003366;padding:3rem 3rem 2.5rem;display:grid;grid-template-columns:1fr 280px;gap:3rem}
    .arch-episode{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;display:block}
    .arch-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5rem);color:#0a1428;letter-spacing:0.04em;line-height:0.95;margin-bottom:1rem}
    .arch-desc{font-size:0.9rem;color:#1a3050;line-height:1.75;font-weight:300}
    .arch-meta{font-size:0.72rem;color:#4a6080;margin-top:0.75rem;letter-spacing:0.05em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.65rem;background:#003366;color:#fff;padding:0.2rem 0.6rem;font-weight:700}
    .arch-panel{background:#f0f4f8;border:1px solid #dce8f0;padding:1.5rem;display:flex;flex-direction:column;gap:1rem}
    .panel-label{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.3rem;font-weight:700}
    .panel-value{font-size:0.85rem;color:#1a3050;line-height:1.5}
    .episode-list{max-width:900px;margin:0 auto;padding:1.5rem 3rem}
    .ep-item{display:grid;grid-template-columns:60px 1fr;gap:1rem;padding:1rem 0;border-bottom:1px solid #dce8f0;align-items:start}
    .ep-num{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#dce8f0;letter-spacing:0.05em;line-height:1}
    .ep-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.25rem}
    .ep-text{font-size:0.85rem;color:#1a3050;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0fb;font-size:0.7rem;padding:0.15rem 0.5rem;color:#003366}
    footer{background:#003366;color:rgba(255,255,255,0.35);padding:1.25rem 3rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.archive-header{grid-template-columns:1fr}.hero-archive{grid-template-columns:1fr}.episode-list{padding:1.5rem}}
  </style>
</head><body>
  <div class="archive-header">
    <div class="arch-logo-box"><div class="arch-logo">KBS</div><div class="arch-sub">공영방송 아카이브 · KBS 스타일</div></div>
    <div class="arch-nav">
      <span>홈</span><span>프로그램</span><span class="active">포트폴리오</span><span>아카이브</span>
    </div>
  </div>
  <div class="hero-archive">
    <div>
      <span class="arch-episode">EP.01</span>
      <div class="arch-title">${pageId}</div>
      <div class="arch-desc">${oneLineDesc}</div>
      <div class="arch-meta">${major}${strength ? " · " + strength : ""} · ${createdAt}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="arch-panel">
      ${companyName ? `<div><div class="panel-label">롤모델 기업</div><div class="panel-value">${companyName}</div></div>` : ""}
      <div><div class="panel-label">전공</div><div class="panel-value">${major}</div></div>
    </div>
  </div>
  <div class="episode-list">
    ${tags.length ? `<div class="ep-item"><div class="ep-num">01</div><div><div class="ep-label">관심 분야</div><div class="tags">${tagStr}</div></div></div>` : ""}
    ${strength ? `<div class="ep-item"><div class="ep-num">02</div><div><div class="ep-label">강점 스타일</div><div class="ep-text">${strength}</div></div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T32 — EBS 교육방송 학습카드
  // 특징: 플래시카드 학습형, 밝은 교육 감성, 섹션 구분
  // ════════════════════════════
  const T32 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff9c4;color:#1a1200;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .ebs-header{background:#ffaa00;padding:0.75rem 2rem;display:flex;align-items:center;justify-content:space-between}
    .ebs-logo{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:0.1em;color:#fff}
    .ebs-tagline{font-size:0.65rem;color:rgba(255,255,255,0.8);letter-spacing:0.05em}
    .lesson-hero{background:#fff;border-radius:16px;margin:1.5rem;padding:2.5rem;box-shadow:0 4px 20px rgba(255,170,0,0.1);border-top:6px solid ${ac.accent}}
    .lesson-num{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;display:block;font-weight:700}
    .lesson-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5.5rem);color:#1a1200;letter-spacing:0.04em;line-height:0.92}
    .lesson-desc{font-size:0.95rem;color:#3a3000;line-height:1.75;margin-top:0.75rem;font-weight:300}
    .lesson-meta{font-size:0.72rem;color:#a08020;margin-top:0.5rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.72rem;background:${ac.accent};color:#fff;padding:0.25rem 0.7rem;border-radius:4px;font-weight:700}
    .flashcards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:0 1.5rem 1.5rem}
    .card{background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.06);border-bottom:3px solid ${ac.accent};position:relative;overflow:hidden}
    .card::before{content:attr(data-num);position:absolute;top:-10px;right:10px;font-family:'Bebas Neue',sans-serif;font-size:5rem;color:#f0e880;pointer-events:none;line-height:1}
    .card-label{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;font-weight:700;position:relative}
    .card-value{font-size:0.88rem;line-height:1.6;color:#2a2000;position:relative}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#fff9c4;border:1px solid #ffcc00;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:4px;color:#856400}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#a08020;display:flex;justify-content:space-between;border-top:1px solid #ffe082}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.flashcards{grid-template-columns:1fr 1fr}}
  </style>
</head><body>
  <div class="ebs-header"><div class="ebs-logo">EBS</div><div class="ebs-tagline">EBS 스타일</div></div>
  <div class="lesson-hero">
    <span class="lesson-num">LESSON 01 · MY PORTFOLIO</span>
    <div class="lesson-title">${pageId}</div>
    <div class="lesson-desc">${oneLineDesc}</div>
    <div class="lesson-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="flashcards">
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T33 — 풀무원 자연식품
  // 특징: 자연주의 패키지 디자인, 내추럴 그린, 유기농 감성
  // ════════════════════════════
  const T33 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5f9f0;color:#1a3300;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .leaf-header{background:#2d5a1b;color:#fff;padding:0.75rem 2rem;display:flex;align-items:center;justify-content:space-between}
    .lh-logo{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.1em}
    .lh-sub{font-size:0.6rem;opacity:0.7;letter-spacing:0.08em}
    .package{max-width:720px;margin:2rem auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,90,27,0.1)}
    .pkg-top{background:linear-gradient(135deg,#2d5a1b,#4a8c2a);color:#fff;padding:3rem 2.5rem;position:relative;overflow:hidden}
    .pkg-top::before{content:'';position:absolute;bottom:-40px;right:-40px;width:200px;height:200px;background:rgba(255,255,255,0.05);border-radius:50%}
    .pkg-top::after{content:'100%';position:absolute;top:1rem;right:1.5rem;font-family:'Bebas Neue',sans-serif;font-size:5rem;color:rgba(255,255,255,0.06);line-height:1}
    .pkg-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:1rem;display:block}
    .pkg-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .pkg-desc{font-size:0.92rem;font-weight:300;margin-top:0.75rem;opacity:0.88;line-height:1.65;position:relative}
    .pkg-meta{font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:0.5rem;position:relative}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;border-radius:999px;font-weight:700}
    .pkg-body{padding:2rem 2.5rem;display:flex;flex-direction:column;gap:1rem}
    .ingredient{display:flex;align-items:flex-start;gap:1rem;padding:1rem 0;border-bottom:1px solid #e8f4e0}
    .ingredient:last-child{border-bottom:none}
    .ing-icon{width:36px;height:36px;background:${ac.accent};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
    .ing-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:#4a8c2a;margin-bottom:0.2rem;font-weight:700}
    .ing-value{font-size:0.88rem;color:#1a3300;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f4e0;font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:999px;color:#2d5a1b}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#6a9a50;display:flex;justify-content:space-between;background:#f0f9e8;border-top:1px solid #d4ecc0}
    footer a{color:#2d5a1b;text-decoration:none}
  </style>
</head><body>
  <div class="leaf-header"><div class="lh-logo">PULMUONE</div><div class="lh-sub">풀무원 스타일</div></div>
  <div class="package">
    <div class="pkg-top">
      <span class="pkg-badge">자연이 만든 포트폴리오 · NATURAL PORTFOLIO</span>
      <div class="pkg-id">${pageId}</div>
      <div class="pkg-desc">${oneLineDesc}</div>
      <div class="pkg-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="pkg-body">
      ${tags.length ? `<div class="ingredient"><div class="ing-icon">🌿</div><div><div class="ing-label">관심 분야</div><div class="tags">${tagStr}</div></div></div>` : ""}
      ${strength ? `<div class="ingredient"><div class="ing-icon">💪</div><div><div class="ing-label">강점 스타일</div><div class="ing-value">${strength}</div></div></div>` : ""}
      ${companyName ? `<div class="ingredient"><div class="ing-icon">🏢</div><div><div class="ing-label">롤모델 기업</div><div class="ing-value">${companyName}</div></div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T34 — 유한양행 처방전
  // 특징: 의약품 처방전 형식, 클린 의료, 파란 신뢰감
  // ════════════════════════════
  const T34 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f5ff;color:#001040;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .rx-paper{max-width:680px;margin:2rem auto;background:#fff;border:1px solid #c0d0f0;box-shadow:0 2px 12px rgba(0,0,128,0.06)}
    .rx-header{background:#0066cc;color:#fff;padding:1.25rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .rx-logo{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:0.1em}
    .rx-num{font-size:0.65rem;opacity:0.7;letter-spacing:0.05em}
    .rx-watermark{text-align:center;padding:1rem 2rem 0;position:relative}
    .rx-watermark::after{content:'Rx';position:absolute;top:0;right:2rem;font-family:'Bebas Neue',sans-serif;font-size:6rem;color:#e8f0ff;line-height:1;pointer-events:none}
    .rx-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};font-weight:700}
    .rx-body{padding:1.5rem 2rem}
    .rx-patient{border:1px solid #c0d0f0;border-radius:4px;padding:1.25rem;margin-bottom:1.5rem;background:#f8faff}
    .rx-patient-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#0066cc;margin-bottom:0.5rem;font-weight:700}
    .rx-patient-name{font-family:'Bebas Neue',sans-serif;font-size:3rem;color:#001040;letter-spacing:0.04em;line-height:0.95}
    .rx-patient-info{font-size:0.8rem;color:#4060a0;margin-top:0.3rem}
    .rx-divider{border:none;border-top:2px dashed #c0d0f0;margin:1.25rem 0}
    .rx-item{display:grid;grid-template-columns:24px 1fr;gap:0.75rem;margin-bottom:1rem;align-items:start}
    .rx-item-num{font-size:0.8rem;color:#0066cc;font-weight:700;padding-top:0.1rem}
    .rx-item-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.25rem;font-weight:700}
    .rx-item-value{font-size:0.88rem;color:#001040;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0ff;border:1px solid #c0d0f0;font-size:0.7rem;padding:0.15rem 0.5rem;color:#003399}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.5rem}
    .kw{font-size:0.68rem;background:#0066cc;color:#fff;padding:0.2rem 0.55rem;font-weight:700}
    .rx-footer-inner{background:#f0f5ff;padding:1rem 2rem;border-top:2px solid #0066cc;font-size:0.7rem;color:#4060a0;display:flex;justify-content:space-between}
    footer{padding:1rem 2rem;font-size:0.65rem;color:#a0b0d0;display:flex;justify-content:space-between}
    footer a{color:#0066cc;text-decoration:none}
  </style>
</head><body>
  <div class="rx-paper">
    <div class="rx-header"><div class="rx-logo">YUHAN PORTFOLIO</div><div class="rx-num">유한양행 스타일</div></div>
    <div class="rx-watermark"><span class="rx-badge">처방전 · PRESCRIPTION FOR SUCCESS</span></div>
    <div class="rx-body">
      <div class="rx-patient">
        <div class="rx-patient-label">환자명 / 포트폴리오 ID</div>
        <div class="rx-patient-name">${pageId}</div>
        <div class="rx-patient-info">${major}${strength ? " · " + strength : ""} · ${createdAt}</div>
      </div>
      <div class="rx-item"><div class="rx-item-num">①</div><div><div class="rx-item-label">한 줄 소개</div><div class="rx-item-value">${oneLineDesc}</div></div></div>
      ${keywords.length ? `<div class="rx-item"><div class="rx-item-num">②</div><div><div class="rx-item-label">핵심 역량</div><div class="kws">${keywordStr}</div></div></div>` : ""}
      <hr class="rx-divider"/>
      ${tags.length ? `<div class="rx-item"><div class="rx-item-num">③</div><div><div class="rx-item-label">관심 분야</div><div class="tags">${tagStr}</div></div></div>` : ""}
      ${strength ? `<div class="rx-item"><div class="rx-item-num">④</div><div><div class="rx-item-label">강점 스타일</div><div class="rx-item-value">${strength}</div></div></div>` : ""}
      ${companyName ? `<div class="rx-item"><div class="rx-item-num">⑤</div><div><div class="rx-item-label">롤모델 기업</div><div class="rx-item-value">${companyName}</div></div></div>` : ""}
    </div>
    <div class="rx-footer-inner"><span>배재대학교 창업지원팀 발행</span><span>${createdAt}</span></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T35 — 대웅제약 의료 인포그래픽
  // 특징: 의료 대시보드, 바이탈 차트형, 블루 인포그래픽
  // ════════════════════════════
  const T35 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f4ff;color:#001040;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .med-header{background:linear-gradient(135deg,#1a3a8f,#2563eb);color:#fff;padding:1.5rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .med-logo{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.1em}
    .med-status{display:flex;align-items:center;gap:0.5rem;font-size:0.65rem;opacity:0.8}
    .status-dot{width:8px;height:8px;background:#4ade80;border-radius:50%}
    .vital-hero{background:#fff;padding:2.5rem 3rem;border-bottom:1px solid #dce8ff}
    .vital-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1rem;display:block;font-weight:700}
    .vital-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,11vw,7rem);color:#1a3a8f;letter-spacing:0.04em;line-height:0.92}
    .vital-desc{font-size:0.92rem;color:#1a3050;line-height:1.7;margin-top:0.75rem;font-weight:300;max-width:500px}
    .vital-meta{font-size:0.7rem;color:#4a6080;margin-top:0.5rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;background:#1a3a8f;color:#fff;padding:0.22rem 0.65rem;font-weight:700}
    .dashboard{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid #dce8ff}
    .vital-card{padding:1.75rem 1.5rem;border-right:1px solid #dce8ff;background:#fff;position:relative}
    .vital-card:last-child{border-right:none}
    .vc-icon{font-size:1.5rem;margin-bottom:0.5rem}
    .vc-label{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700}
    .vc-value{font-size:0.85rem;color:#001040;line-height:1.5}
    .vc-bar{height:3px;background:#e8f0ff;border-radius:2px;margin-top:0.75rem}
    .vc-fill{height:100%;background:${ac.accent};border-radius:2px;width:75%}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0ff;font-size:0.7rem;padding:0.15rem 0.5rem;color:#1a3a8f}
    footer{background:#1a3a8f;color:rgba(255,255,255,0.35);padding:1.25rem 2.5rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.dashboard{grid-template-columns:1fr 1fr}.vital-hero{padding:2rem 1.5rem}}
  </style>
</head><body>
  <div class="med-header">
    <div class="med-logo">DAEWOONG PORTFOLIO</div>
    <div class="med-status"><div class="status-dot"></div><span>대웅제약 스타일</span></div>
  </div>
  <div class="vital-hero">
    <span class="vital-badge">PATIENT PROFILE · 포트폴리오 대시보드</span>
    <div class="vital-id">${pageId}</div>
    <div class="vital-desc">${oneLineDesc}</div>
    <div class="vital-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="dashboard">
    ${tags.length ? `<div class="vital-card"><div class="vc-icon">🎯</div><div class="vc-label">관심 분야</div><div class="tags">${tagStr}</div><div class="vc-bar"><div class="vc-fill"></div></div></div>` : ""}
    ${strength ? `<div class="vital-card"><div class="vc-icon">⚡</div><div class="vc-label">강점 스타일</div><div class="vc-value">${strength}</div><div class="vc-bar"><div class="vc-fill" style="width:90%"></div></div></div>` : ""}
    ${companyName ? `<div class="vital-card"><div class="vc-icon">🏆</div><div class="vc-label">롤모델 기업</div><div class="vc-value">${companyName}</div><div class="vc-bar"><div class="vc-fill" style="width:85%"></div></div></div>` : ""}
    <div class="vital-card"><div class="vc-icon">🎓</div><div class="vc-label">전공</div><div class="vc-value">${major}</div><div class="vc-bar"><div class="vc-fill" style="width:100%"></div></div></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T36 — CJ제일제당 레시피 카드
  // 특징: 요리 레시피 카드, 재료+과정, 따뜻한 식품감성
  // ════════════════════════════
  const T36 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff8f0;color:#2a1000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .cj-header{background:#cc2200;color:#fff;padding:0.75rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .cj-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.1em}
    .cj-sub{font-size:0.6rem;opacity:0.75}
    .recipe-card{max-width:720px;margin:1.5rem auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(200,50,0,0.08)}
    .recipe-hero{background:linear-gradient(135deg,#cc2200,#ff4400);color:#fff;padding:3rem 2.5rem;position:relative}
    .recipe-hero::after{content:'🍳';position:absolute;right:2rem;top:50%;transform:translateY(-50%);font-size:6rem;opacity:0.15}
    .recipe-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:0.75rem;display:block}
    .recipe-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .recipe-desc{font-size:0.92rem;font-weight:300;margin-top:0.75rem;opacity:0.88;line-height:1.6;position:relative}
    .recipe-meta{font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:0.5rem;position:relative}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.7rem;background:rgba(255,255,255,0.15);color:#fff;padding:0.25rem 0.7rem;border-radius:4px;font-weight:700}
    .recipe-info{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #ffe0d0}
    .info-cell{padding:1rem 1.5rem;text-align:center;border-right:1px solid #ffe0d0}
    .info-cell:last-child{border-right:none}
    .info-icon{font-size:1.25rem;margin-bottom:0.3rem}
    .info-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:#cc2200;font-weight:700}
    .info-value{font-size:0.78rem;color:#2a1000;margin-top:0.2rem}
    .ingredients{padding:2rem 2.5rem;border-bottom:1px solid #ffe0d0}
    .ing-title{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1rem;font-weight:700}
    .ing-list{display:flex;flex-direction:column;gap:0.5rem}
    .ing-row{display:flex;align-items:center;gap:0.75rem;font-size:0.85rem;color:#2a1000}
    .ing-dot{width:6px;height:6px;background:${ac.accent};border-radius:50%;flex-shrink:0}
    .tags-area{padding:2rem 2.5rem}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:#fff0e8;border:1px solid #ffc0a0;font-size:0.72rem;padding:0.2rem 0.6rem;border-radius:4px;color:#cc4400}
    footer{padding:1.25rem 2rem;font-size:0.65rem;color:#c09080;display:flex;justify-content:space-between;background:#fff8f0;border-top:1px solid #ffe0d0}
    footer a{color:#cc2200;text-decoration:none}
    @media(max-width:540px){.recipe-info{grid-template-columns:1fr}.ingredients,.tags-area{padding:1.5rem}.recipe-hero{padding:2.5rem 1.5rem}}
  </style>
</head><body>
  <div class="cj-header"><div class="cj-logo">CJ PORTFOLIO</div><div class="cj-sub">CJ제일제당 스타일</div></div>
  <div class="recipe-card">
    <div class="recipe-hero">
      <span class="recipe-badge">나만의 레시피 · MY PORTFOLIO RECIPE</span>
      <div class="recipe-title">${pageId}</div>
      <div class="recipe-desc">${oneLineDesc}</div>
      <div class="recipe-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="recipe-info">
      <div class="info-cell"><div class="info-icon">🎓</div><div class="info-label">전공</div><div class="info-value">${major.split(" - ")[0]}</div></div>
      <div class="info-cell"><div class="info-icon">⚡</div><div class="info-label">강점</div><div class="info-value">${strength || "-"}</div></div>
      <div class="info-cell"><div class="info-icon">🏢</div><div class="info-label">롤모델</div><div class="info-value">${companyName || "-"}</div></div>
    </div>
    ${tags.length ? `<div class="ingredients"><div class="ing-title">주요 재료 (관심 분야)</div><div class="ing-list">${tags.map(t=>`<div class="ing-row"><div class="ing-dot"></div><span>${t}</span></div>`).join("")}</div></div>` : ""}
    ${keywords.length ? `<div class="tags-area"><div class="ing-title">핵심 스킬</div><div class="tags">${keywordStr}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T37 — 아디다스 3선 스트라이프
  // 특징: 아디다스 3선 모티프, 스포티 레이아웃, 흑백+포인트
  // ════════════════════════════
  const T37 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#000;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .stripes{height:6px;background:repeating-linear-gradient(90deg,#000 0,#000 33.3%,${ac.accent} 33.3%,${ac.accent} 66.6%,#fff 66.6%,#fff 100%)}
    .hero{padding:4rem 3rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;border-bottom:1px solid #eee}
    .hero-left .badge{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:1.25rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,12vw,8rem);color:#000;letter-spacing:0.02em;line-height:0.88}
    .hero-desc{font-size:0.95rem;font-weight:300;color:#333;line-height:1.6;margin-top:1rem}
    .hero-meta{font-size:0.7rem;color:#888;margin-top:0.5rem;letter-spacing:0.1em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:#000;color:#fff;padding:0.25rem 0.7rem;font-weight:700;letter-spacing:0.05em}
    .hero-right{display:flex;flex-direction:column;gap:0}
    .stripe-card{border-left:4px solid;padding:1.25rem 1.5rem;margin-bottom:0.5rem}
    .stripe-card:nth-child(1){border-color:#000}
    .stripe-card:nth-child(2){border-color:${ac.accent}}
    .stripe-card:nth-child(3){border-color:#000}
    .sc-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:0.3rem}
    .sc-value{font-size:0.88rem;color:#000;line-height:1.5;font-weight:500}
    .tags-section{padding:2rem 3rem;background:#f8f8f8;border-top:1px solid #eee}
    .tags-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:0.75rem}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{border:1.5px solid #000;font-size:0.72rem;padding:0.2rem 0.65rem;font-weight:700;letter-spacing:0.04em;color:${ac.accent}}
    .stripes-bottom{height:6px;background:repeating-linear-gradient(90deg,${ac.accent} 0,${ac.accent} 33.3%,#000 33.3%,#000 66.6%,#fff 66.6%,#fff 100%)}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#aaa;display:flex;justify-content:space-between}
    footer a{color:#000;text-decoration:none;font-weight:700}
    @media(max-width:700px){.hero{grid-template-columns:1fr;padding:3rem 1.5rem;gap:2rem}.tags-section{padding:1.5rem}}
  </style>
</head><body>
  <div class="stripes"></div>
  <div class="hero">
    <div class="hero-left">
      <span class="badge">PCU PORTFOLIO</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " / " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="hero-right">
      ${strength ? `<div class="stripe-card"><div class="sc-label">강점 스타일</div><div class="sc-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="stripe-card"><div class="sc-label">롤모델 기업</div><div class="sc-value">${companyName}</div></div>` : ""}
      <div class="stripe-card"><div class="sc-label">전공</div><div class="sc-value">${major}</div></div>
    </div>
  </div>
  ${tags.length ? `<div class="tags-section"><div class="tags-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
  <div class="stripes-bottom"></div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T38 — 리복 다이나믹 대각선
  // 특징: 대각선 분할 레이아웃, 역동적, 레드+네이비
  // ════════════════════════════
  const T38 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#fff;color:#001433;font-family:'Noto Sans KR',sans-serif;min-height:100vh;overflow-x:hidden}
    .hero{min-height:65vh;position:relative;display:flex;align-items:center;overflow:hidden}
    .hero-bg-left{position:absolute;inset:0;background:#001433;clip-path:polygon(0 0,65% 0,50% 100%,0 100%)}
    .hero-bg-right{position:absolute;inset:0;background:#ff0033;clip-path:polygon(65% 0,100% 0,100% 100%,50% 100%)}
    .hero-content{position:relative;z-index:1;padding:4rem 3rem;width:100%}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,13vw,9rem);color:#fff;letter-spacing:0.02em;line-height:0.88;max-width:60%}
    .hero-desc{font-size:1rem;font-weight:300;color:rgba(255,255,255,0.8);line-height:1.6;max-width:45%;margin-top:1rem}
    .hero-meta{font-size:0.65rem;color:rgba(255,255,255,0.5);margin-top:0.5rem;letter-spacing:0.1em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;background:#ff0033;color:#fff;padding:0.22rem 0.65rem;font-weight:700;letter-spacing:0.05em}
    .info-strip{display:grid;grid-template-columns:repeat(3,1fr);border-top:3px solid #ff0033}
    .strip-cell{padding:1.5rem 2rem;border-right:1px solid #eee}
    .strip-cell:last-child{border-right:none}
    .strip-label{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:#ff0033;margin-bottom:0.4rem;font-weight:700}
    .strip-value{font-size:0.85rem;color:#001433;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1.5px solid #ff0033;font-size:0.7rem;padding:0.15rem 0.5rem;color:#ff0033;font-weight:700}
    footer{padding:1.5rem 2rem;font-size:0.65rem;color:#aaa;display:flex;justify-content:space-between;border-top:1px solid #eee}
    footer a{color:#ff0033;text-decoration:none;font-weight:700}
    @media(max-width:700px){.hero-id,.hero-desc{max-width:100%}.info-strip{grid-template-columns:1fr}.hero-content{padding:3rem 1.5rem}}
  </style>
</head><body>
  <div class="hero">
    <div class="hero-bg-left"></div>
    <div class="hero-bg-right"></div>
    <div class="hero-content">
      <span class="badge">PCU PORTFOLIO</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
  </div>
  <div class="info-strip">
    ${tags.length ? `<div class="strip-cell"><div class="strip-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="strip-cell"><div class="strip-label">강점 스타일</div><div class="strip-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="strip-cell"><div class="strip-label">롤모델 기업</div><div class="strip-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T39 — 뉴발란스 N 미니멀
  // 특징: N 로고 모티프, 미니멀 스포츠, 그레이+포인트
  // ════════════════════════════
  const T39 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f4f4f4;color:#111;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .nb-header{background:#111;color:#fff;padding:1rem 3rem;display:flex;align-items:center;justify-content:space-between}
    .nb-logo{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;letter-spacing:-0.02em;color:${ac.accent}}
    .nb-sub{font-size:0.6rem;color:#888;letter-spacing:0.08em}
    .hero{background:#fff;padding:5rem 3rem;display:grid;grid-template-columns:1fr 280px;gap:4rem;align-items:center;border-bottom:4px solid ${ac.accent}}
    .hero-n{font-family:'Bebas Neue',sans-serif;font-size:18vw;color:#f0f0f0;position:absolute;right:0;top:50%;transform:translateY(-50%);line-height:1;pointer-events:none;letter-spacing:-0.05em}
    .hero-left{position:relative}
    .badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:#888;margin-bottom:1.25rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,11vw,7rem);color:#111;letter-spacing:0.02em;line-height:0.9}
    .hero-desc{font-size:0.95rem;color:#444;line-height:1.65;margin-top:0.75rem;font-weight:300}
    .hero-meta{font-size:0.68rem;color:#888;margin-top:0.5rem;letter-spacing:0.08em;text-transform:uppercase}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.7rem;background:${ac.accent};color:#fff;padding:0.25rem 0.7rem;font-weight:700;letter-spacing:0.04em}
    .hero-right{display:flex;flex-direction:column;gap:1rem}
    .nb-card{background:#f4f4f4;border-radius:8px;padding:1.25rem}
    .nb-label{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.35rem;font-weight:700}
    .nb-value{font-size:0.85rem;color:#222;line-height:1.5}
    .tags-area{padding:2rem 3rem;background:#fff;border-top:1px solid #eee}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:#f4f4f4;border:1px solid #ddd;font-size:0.72rem;padding:0.2rem 0.65rem;border-radius:4px;color:#444}
    footer{padding:1.5rem 3rem;font-size:0.65rem;color:#aaa;display:flex;justify-content:space-between;background:#111}
    footer a{color:${ac.accent};text-decoration:none;font-weight:700}
    @media(max-width:700px){.hero{grid-template-columns:1fr;padding:3rem 1.5rem;gap:2rem;position:static}.hero-n{display:none}.tags-area{padding:1.5rem}}
  </style>
</head><body>
  <div class="nb-header"><div class="nb-logo">N</div><div class="nb-sub">뉴발란스 스타일</div></div>
  <div class="hero" style="position:relative;overflow:hidden">
    <div class="hero-n">N</div>
    <div class="hero-left">
      <span class="badge">MY PORTFOLIO · 나만의 포트폴리오</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " / " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="hero-right">
      ${strength ? `<div class="nb-card"><div class="nb-label">강점 스타일</div><div class="nb-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="nb-card"><div class="nb-label">롤모델 기업</div><div class="nb-value">${companyName}</div></div>` : ""}
      <div class="nb-card"><div class="nb-label">전공</div><div class="nb-value">${major}</div></div>
    </div>
  </div>
  ${tags.length ? `<div class="tags-area"><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;font-weight:700">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T40 — 휠라 빈티지 이탈리아
  // 특징: 이탈리아 스포츠 빈티지, 네이비+크림, 클래식
  // ════════════════════════════
  const T40 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5f0e8;color:#001433;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .fila-header{background:#001433;color:#fff;padding:1rem 3rem;display:flex;align-items:center;justify-content:space-between}
    .fila-logo{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;letter-spacing:0.05em;color:#fff}
    .fila-est{font-size:0.6rem;color:rgba(255,255,255,0.5);letter-spacing:0.15em}
    .fila-stripe{height:4px;background:linear-gradient(90deg,#001433 33%,#fff 33%,#fff 66%,${ac.accent} 66%)}
    .hero{padding:5rem 4rem 4rem;background:#fff;border-bottom:1px solid #e0d8c8;display:grid;grid-template-columns:1fr 1fr;gap:4rem}
    .badge{font-size:0.5rem;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:1.5rem;display:block}
    .hero-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,11vw,7rem);color:#001433;letter-spacing:0.04em;line-height:0.9}
    .hero-desc{font-size:0.92rem;color:#334455;line-height:1.75;margin-top:1rem;font-weight:300}
    .hero-meta{font-size:0.7rem;color:#889aaa;margin-top:0.5rem;letter-spacing:0.06em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;background:#001433;color:#fff;padding:0.22rem 0.65rem;letter-spacing:0.06em;font-weight:700}
    .heritage-side{border-left:1px solid #e0d8c8;padding-left:3rem;display:flex;flex-direction:column;gap:1.5rem}
    .heritage-item{}
    .h-label{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.35rem;font-weight:700}
    .h-value{font-size:0.88rem;color:#001433;line-height:1.6}
    .tags-area{padding:2rem 4rem;background:#f5f0e8;border-top:1px solid #e0d8c8}
    .tags{display:flex;flex-wrap:wrap;gap:0.35rem}
    .tag{background:#fff;border:1px solid #c8b890;font-size:0.72rem;padding:0.2rem 0.65rem;color:#556644;letter-spacing:0.04em}
    .fila-stripe-bottom{height:4px;background:linear-gradient(90deg,${ac.accent} 33%,#fff 33%,#fff 66%,#001433 66%)}
    footer{padding:1.5rem 4rem;font-size:0.65rem;color:#9aaa98;display:flex;justify-content:space-between;background:#f5f0e8}
    footer a{color:#001433;text-decoration:none;font-weight:700}
    @media(max-width:700px){.hero{grid-template-columns:1fr;padding:3rem 1.5rem;gap:2rem}.heritage-side{border-left:none;border-top:1px solid #e0d8c8;padding-left:0;padding-top:1.5rem}.tags-area,.footer{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="fila-header"><div class="fila-logo">FILA</div><div class="fila-est">EST. 1911 · 배재대학교 전공탐색 박람회 2026 · 휠라 스타일</div></div>
  <div class="fila-stripe"></div>
  <div class="hero">
    <div>
      <span class="badge">HERITAGE PORTFOLIO · 나만의 포트폴리오</span>
      <div class="hero-id">${oneLineDesc}</div>
      <div class="hero-desc" style="font-size:0.8rem;opacity:0.5;margin-top:0.5rem;letter-spacing:0.05em">${pageId}</div>
      <div class="hero-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="heritage-side">
      ${strength ? `<div class="heritage-item"><div class="h-label">강점 스타일</div><div class="h-value">${strength}</div></div>` : ""}
      ${companyName ? `<div class="heritage-item"><div class="h-label">롤모델 기업</div><div class="h-value">${companyName}</div></div>` : ""}
      <div class="heritage-item"><div class="h-label">전공</div><div class="h-value">${major}</div></div>
    </div>
  </div>
  ${tags.length ? `<div class="tags-area"><div style="font-size:0.5rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;font-weight:700">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
  <div class="fila-stripe-bottom"></div>
  ${extraSections}
  ${footer}
</body></html>`;

  const templates = { T31, T32, T33, T34, T35, T36, T37, T38, T39, T40 };
  return templates;
}

module.exports = { getT31to40 };
