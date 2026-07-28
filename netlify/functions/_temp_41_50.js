// ╔══════════════════════════════════════════════════════════════╗
// ║                    temp_41_50.js                            ║
// ║              포트폴리오 템플릿 T41~T50                        ║
// ║                                                              ║
// ║   T41 하나투어   — 여행 티켓형                                 ║
// ║   T42 스포티비   — 스코어보드 중계형                           ║
// ║   T43 KBO       — 야구 스탯카드형                             ║
// ║   T44 K리그      — 축구 선수카드형                             ║
// ║   T45 법원       — 판결문 법률형                               ║
// ║   T46 행정안전부  — 공문서 행정형                               ║
// ║   T47 소방청     — 긴급 출동 대시보드형                         ║
// ║   T48 한국가스공사 — 에너지 파이프라인형                        ║
// ║   T49 국민건강보험공단 — 건강검진 리포트형                      ║
// ║   T50 법무법인   — 계약서 로펌형                               ║
// ╚══════════════════════════════════════════════════════════════╝

function getT41to50({ pageId, major, strength, company, oneLineDesc, tags, keywords, companyName, createdAt, ac, tagStr, keywordStr, footer, gfonts, meta, extraSections, headline, subheadline, subheadlineHtml }) {

  // ════════════════════════════
  // T41 — 하나투어 여행 티켓
  // 특징: 항공권/탑승권 디자인, 여행 감성, 그린+화이트
  // ════════════════════════════
  const T41 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#e8f5f0;color:#003322;font-family:'Noto Sans KR',sans-serif;min-height:100vh;padding:2rem}
    .ticket{max-width:720px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,100,60,0.12);overflow:hidden}
    .ticket-header{background:linear-gradient(135deg,#006644,#00aa66);color:#fff;padding:2rem 2.5rem;position:relative;overflow:hidden}
    .ticket-header::before{content:'✈';position:absolute;right:2rem;top:50%;transform:translateY(-50%);font-size:8rem;opacity:0.08}
    .th-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:0.75rem;display:block}
    .th-airline{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:0.15em;margin-bottom:1rem}
    .th-route{display:flex;align-items:center;gap:1.5rem}
    .th-city{text-align:center}
    .th-code{font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:0.05em;line-height:1}
    .th-city-name{font-size:0.65rem;opacity:0.7;margin-top:0.2rem}
    .th-arrow{font-size:1.5rem;opacity:0.6}
    .ticket-info{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px dashed #c0e8d8}
    .ti-cell{padding:1.25rem 1.5rem;border-right:1px solid #e8f5f0}
    .ti-cell:last-child{border-right:none}
    .ti-label{font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.3rem;font-weight:700}
    .ti-value{font-size:0.82rem;color:#003322;line-height:1.4;font-weight:500}
    .ticket-tear{display:flex;align-items:center;gap:0;margin:0 -1px}
    .tear-line{flex:1;border-top:2px dashed #c0e8d8}
    .tear-circle{width:24px;height:24px;background:#e8f5f0;border-radius:50%;flex-shrink:0}
    .ticket-body{padding:1.5rem 2.5rem 2rem;display:flex;flex-direction:column;gap:1rem}
    .tb-section{}
    .tb-label{font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.4rem;font-weight:700}
    .tb-value{font-size:0.85rem;color:#003322;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f5f0;font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:4px;color:#006644}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.3rem}
    .kw{font-size:0.7rem;background:${ac.accent};color:#fff;padding:0.2rem 0.6rem;border-radius:4px;font-weight:700}
    footer{padding:1rem 2rem;font-size:0.65rem;color:#80b090;display:flex;justify-content:space-between;border-top:1px solid #e8f5f0}
    footer a{color:#006644;text-decoration:none}
    @media(max-width:600px){.ticket-info{grid-template-columns:1fr 1fr}.th-route{gap:0.75rem}}
  </style>
</head><body>
  <div class="ticket">
    <div class="ticket-header">
      <span class="th-badge">하나투어 스타일</span>
      <div class="th-airline">PCU CAREER BOARDING PASS</div>
      <div class="th-route">
        <div class="th-city"><div class="th-code">${pageId.substring(0,3).toUpperCase()}</div><div class="th-city-name">현재 위치</div></div>
        <div class="th-arrow">→</div>
        <div class="th-city"><div class="th-code">DRM</div><div class="th-city-name">꿈의 목적지</div></div>
      </div>
    </div>
    <div class="ticket-info">
      <div class="ti-cell"><div class="ti-label">탑승자</div><div class="ti-value">${pageId}</div></div>
      <div class="ti-cell"><div class="ti-label">전공</div><div class="ti-value">${major.split(" - ")[0]}</div></div>
      <div class="ti-cell"><div class="ti-label">강점</div><div class="ti-value">${strength || "-"}</div></div>
      <div class="ti-cell"><div class="ti-label">탑승일</div><div class="ti-value">${createdAt}</div></div>
    </div>
    <div class="ticket-tear"><div class="tear-circle"></div><div class="tear-line"></div><div class="tear-circle"></div></div>
    <div class="ticket-body">
      <div class="tb-section"><div class="tb-label">한 줄 소개</div><div class="tb-value">${oneLineDesc}</div></div>
      ${tags.length ? `<div class="tb-section"><div class="tb-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${keywords.length ? `<div class="tb-section"><div class="tb-label">핵심 역량</div><div class="kws">${keywordStr}</div></div>` : ""}
      ${companyName ? `<div class="tb-section"><div class="tb-label">롤모델 기업</div><div class="tb-value">${companyName}</div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T42 — 스포티비 스코어보드
  // 특징: 스포츠 중계 스코어보드, 라이브 방송, 그린+블랙
  // ════════════════════════════
  const T42 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0f0a;color:#e0ffe0;font-family:'Space Mono','Noto Sans KR',monospace;min-height:100vh}
    .scoreboard-header{background:#000;border-bottom:2px solid ${ac.accent};padding:0.75rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .sb-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.1em;color:${ac.accent}}
    .sb-live{display:flex;align-items:center;gap:0.4rem;font-size:0.6rem;color:#ff4444}
    .live-dot{width:8px;height:8px;background:#ff4444;border-radius:50%;animation:pulse 1s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
    .main-score{background:#111;padding:3rem 2.5rem;border-bottom:1px solid #1a2a1a;text-align:center;position:relative;overflow:hidden}
    .ms-badge{font-size:0.55rem;letter-spacing:0.22em;text-transform:uppercase;color:${ac.accent};margin-bottom:1rem;display:block;opacity:0.7}
    .ms-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,15vw,10rem);color:${ac.accent};letter-spacing:0.04em;line-height:0.88;text-shadow:0 0 60px ${ac.glow}}
    .ms-desc{font-size:0.9rem;color:#a0c0a0;margin-top:0.75rem;line-height:1.6;font-family:'Noto Sans KR',sans-serif}
    .ms-meta{font-size:0.65rem;color:#406040;margin-top:0.5rem;letter-spacing:0.1em}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #1a2a1a}
    .stat{padding:1.5rem 1.25rem;border-right:1px solid #1a2a1a;text-align:center}
    .stat:last-child{border-right:none}
    .stat-num{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:${ac.accent};line-height:1}
    .stat-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:#406040;margin-top:0.3rem}
    .play-by-play{padding:1.5rem 2.5rem;display:flex;flex-direction:column;gap:0.75rem}
    .pbp-header{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;opacity:0.7}
    .pbp-row{display:grid;grid-template-columns:60px 1fr;gap:1rem;padding:0.6rem 0;border-bottom:1px solid #1a2a1a;align-items:start}
    .pbp-time{font-size:0.72rem;color:${ac.accent};font-weight:700;font-family:'Space Mono',monospace}
    .pbp-event{font-size:0.82rem;color:#c0d0c0;font-family:'Noto Sans KR',sans-serif;line-height:1.4}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.3rem}
    .tag{background:#1a2a1a;border:1px solid ${ac.accent}33;font-size:0.68rem;padding:0.15rem 0.5rem;color:${ac.accent}}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap}
    .kw{font-size:0.65rem;color:${ac.accent};font-weight:700;letter-spacing:0.08em}
    footer{padding:1.25rem 2.5rem;font-size:0.6rem;color:#204020;display:flex;justify-content:space-between;border-top:1px solid #1a2a1a}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:600px){.stats-grid{grid-template-columns:1fr 1fr}.play-by-play{padding:1.5rem}}
  </style>
</head><body>
  <div class="scoreboard-header">
    <div class="sb-logo">SPOTV</div>
    <div class="sb-live"><div class="live-dot"></div><span>스포티비 스타일</span></div>
  </div>
  <div class="main-score">
    <span class="ms-badge">CAREER MATCH · 나의 포트폴리오</span>
    <div class="ms-id">${pageId}</div>
    <div class="ms-desc">${oneLineDesc}</div>
    <div class="ms-meta">${major}${strength ? " · " + strength : ""}</div>
  </div>
  <div class="stats-grid">
    <div class="stat"><div class="stat-num">${keywords.length}</div><div class="stat-label">핵심역량</div></div>
    <div class="stat"><div class="stat-num">${tags.length}</div><div class="stat-label">관심분야</div></div>
    <div class="stat"><div class="stat-num">A+</div><div class="stat-label">잠재력</div></div>
    <div class="stat"><div class="stat-num">01</div><div class="stat-label">시즌</div></div>
  </div>
  <div class="play-by-play">
    <div class="pbp-header">PLAY BY PLAY · 상세 프로필</div>
    ${tags.length ? `<div class="pbp-row"><div class="pbp-time">00:01</div><div class="pbp-event">관심 분야 확인<div class="tags">${tagStr}</div></div></div>` : ""}
    ${strength ? `<div class="pbp-row"><div class="pbp-time">00:02</div><div class="pbp-event">강점 스타일: <strong style="color:${ac.accent}">${strength}</strong></div></div>` : ""}
    ${companyName ? `<div class="pbp-row"><div class="pbp-time">00:03</div><div class="pbp-event">롤모델 기업: <strong style="color:${ac.accent}">${companyName}</strong></div></div>` : ""}
    ${keywords.length ? `<div class="pbp-row"><div class="pbp-time">FT</div><div class="pbp-event">핵심 역량<div class="kws" style="margin-top:0.3rem">${keywordStr}</div></div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T43 — KBO 야구 스탯카드
  // 특징: 야구 선수 스탯카드, 포지션 뱃지, 팀컬러
  // ════════════════════════════
  const T43 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f4ff;color:#001040;font-family:'Noto Sans KR',sans-serif;min-height:100vh;padding:2rem}
    .player-card{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,128,0.1)}
    .card-top{background:linear-gradient(135deg,#001480,#0030cc);color:#fff;padding:2.5rem 2rem;position:relative;overflow:hidden}
    .card-top::before{content:'⚾';position:absolute;right:-10px;bottom:-20px;font-size:12rem;opacity:0.06}
    .ct-season{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:0.5rem;display:block}
    .ct-number{font-family:'Bebas Neue',sans-serif;font-size:5rem;color:rgba(255,255,255,0.2);line-height:1;position:absolute;top:1rem;right:2rem}
    .ct-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,8vw,4rem);color:#fff;letter-spacing:0.04em;line-height:0.95;position:relative}
    .ct-position{display:inline-block;background:${ac.accent};color:#fff;font-size:0.65rem;font-weight:700;padding:0.2rem 0.7rem;letter-spacing:0.1em;margin-top:0.5rem}
    .ct-team{font-size:0.75rem;color:rgba(255,255,255,0.65);margin-top:0.5rem;letter-spacing:0.05em}
    .stats-row{display:grid;grid-template-columns:repeat(3,1fr);background:#f8faff;border-bottom:1px solid #e0e8ff}
    .stat-cell{padding:1.25rem;text-align:center;border-right:1px solid #e0e8ff}
    .stat-cell:last-child{border-right:none}
    .sc-num{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#001480;line-height:1}
    .sc-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:#8090c0;margin-top:0.2rem}
    .profile-section{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem}
    .ps-item{display:flex;gap:1rem;align-items:flex-start;padding:0.75rem 0;border-bottom:1px solid #f0f4ff}
    .ps-item:last-child{border-bottom:none}
    .ps-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};min-width:70px;padding-top:0.1rem;font-weight:700}
    .ps-value{font-size:0.85rem;color:#001040;line-height:1.5;flex:1}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0ff;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:3px;color:#003399}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap}
    .kw{font-size:0.68rem;background:#001480;color:#fff;padding:0.2rem 0.55rem;font-weight:700}
    footer{padding:1rem 2rem;font-size:0.65rem;color:#a0b0d0;display:flex;justify-content:space-between;border-top:1px solid #e0e8ff}
    footer a{color:#001480;text-decoration:none}
  </style>
</head><body>
  <div class="player-card">
    <div class="card-top">
      <span class="ct-season">KBO 스타일</span>
      <div class="ct-number">99</div>
      <div class="ct-name">${pageId}</div>
      <div class="ct-position">${strength || "ALL-ROUND"}</div>
      <div class="ct-team">${major}</div>
    </div>
    <div class="stats-row">
      <div class="stat-cell"><div class="sc-num">${tags.length}</div><div class="sc-label">관심분야</div></div>
      <div class="stat-cell"><div class="sc-num">${keywords.length}</div><div class="sc-label">핵심역량</div></div>
      <div class="stat-cell"><div class="sc-num">S+</div><div class="sc-label">등급</div></div>
    </div>
    <div class="profile-section">
      <div class="ps-item"><div class="ps-label">소개</div><div class="ps-value">${oneLineDesc}</div></div>
      ${tags.length ? `<div class="ps-item"><div class="ps-label">관심분야</div><div class="ps-value"><div class="tags">${tagStr}</div></div></div>` : ""}
      ${keywords.length ? `<div class="ps-item"><div class="ps-label">핵심역량</div><div class="ps-value"><div class="kws">${keywordStr}</div></div></div>` : ""}
      ${companyName ? `<div class="ps-item"><div class="ps-label">목표팀</div><div class="ps-value">${companyName}</div></div>` : ""}
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T44 — K리그 축구 선수카드
  // 특징: 축구 선수 프로필, 포메이션, 그린 필드
  // ════════════════════════════
  const T44 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#003300;color:#e0ffe0;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .field-header{background:#004d00;border-bottom:2px solid ${ac.accent};padding:0.75rem 2rem;display:flex;justify-content:space-between;align-items:center}
    .fh-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.1em;color:${ac.accent}}
    .fh-season{font-size:0.6rem;color:rgba(255,255,255,0.5);letter-spacing:0.08em}
    .player-profile{display:grid;grid-template-columns:1fr 260px;min-height:50vh}
    .pp-left{padding:3.5rem 3rem;background:linear-gradient(160deg,#001a00,#003300);position:relative;overflow:hidden}
    .pp-left::before{content:'⚽';position:absolute;right:-20px;bottom:-30px;font-size:15rem;opacity:0.04}
    .pp-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1rem;display:block;opacity:0.7}
    .pp-number{font-family:'Bebas Neue',sans-serif;font-size:8rem;color:rgba(0,255,0,0.06);position:absolute;top:1rem;right:2rem;line-height:1}
    .pp-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6rem);color:#fff;letter-spacing:0.04em;line-height:0.92;position:relative}
    .pp-pos{display:inline-block;background:${ac.accent};color:#000;font-size:0.65rem;font-weight:900;padding:0.2rem 0.7rem;letter-spacing:0.1em;margin-top:0.5rem}
    .pp-desc{font-size:0.88rem;color:#a0c0a0;margin-top:1rem;line-height:1.65;max-width:400px;position:relative}
    .pp-meta{font-size:0.7rem;color:#406040;margin-top:0.6rem;letter-spacing:0.06em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;position:relative}
    .kw{font-size:0.68rem;color:#000;background:${ac.accent};padding:0.22rem 0.65rem;font-weight:700}
    .pp-right{background:#002200;border-left:1px solid #004400;padding:2rem 1.75rem;display:flex;flex-direction:column;gap:1.25rem}
    .stat-block{}
    .sb-label{font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.3rem;font-weight:700;opacity:0.8}
    .sb-value{font-size:0.85rem;color:#c0e0c0;line-height:1.5}
    .sb-bar{height:3px;background:#004400;border-radius:2px;margin-top:0.4rem}
    .sb-fill{height:100%;background:${ac.accent};border-radius:2px}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#002200;border:1px solid ${ac.accent}44;font-size:0.68rem;padding:0.15rem 0.5rem;color:${ac.accent}}
    footer{padding:1.25rem 2.5rem;font-size:0.6rem;color:#204020;display:flex;justify-content:space-between;border-top:1px solid #004400;background:#001a00}
    footer a{color:${ac.accent};text-decoration:none;opacity:0.6}
    @media(max-width:700px){.player-profile{grid-template-columns:1fr}.pp-right{border-left:none;border-top:1px solid #004400}.pp-left{padding:2.5rem 1.5rem}}
  </style>
</head><body>
  <div class="field-header">
    <div class="fh-logo">K LEAGUE</div>
    <div class="fh-season">K리그 스타일</div>
  </div>
  <div class="player-profile">
    <div class="pp-left">
      <span class="pp-badge">PLAYER PROFILE · 선수 프로필</span>
      <div class="pp-number">10</div>
      <div class="pp-name">${pageId}</div>
      <div class="pp-pos">${strength || "MIDFIELDER"}</div>
      <div class="pp-desc">${oneLineDesc}</div>
      <div class="pp-meta">${major}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="pp-right">
      ${tags.length ? `<div class="stat-block"><div class="sb-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="stat-block"><div class="sb-label">포지션/강점</div><div class="sb-value">${strength}</div><div class="sb-bar"><div class="sb-fill" style="width:90%"></div></div></div>` : ""}
      ${companyName ? `<div class="stat-block"><div class="sb-label">희망 팀</div><div class="sb-value">${companyName}</div></div>` : ""}
      <div class="stat-block"><div class="sb-label">전공</div><div class="sb-value">${major}</div></div>
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T45 — 법원 판결문
  // 특징: 법원 판결문 형식, 법률 문서, 다크+골드
  // ════════════════════════════
  const T45 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f8f6f0;color:#1a1400;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .court-header{background:#1a1400;color:#c8a000;padding:1.5rem 3rem;text-align:center;border-bottom:3px double #c8a000}
    .ch-emblem{font-size:2rem;margin-bottom:0.3rem}
    .ch-title{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;letter-spacing:0.2em}
    .ch-sub{font-size:0.6rem;letter-spacing:0.15em;opacity:0.7;margin-top:0.2rem}
    .verdict{max-width:780px;margin:2rem auto;background:#fff;border:1px solid #d4c080;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
    .verdict-title{text-align:center;padding:2rem 3rem 1.5rem;border-bottom:2px solid #1a1400}
    .vt-case{font-size:0.6rem;letter-spacing:0.15em;color:#8a6800;margin-bottom:0.5rem}
    .vt-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5rem);color:#1a1400;letter-spacing:0.05em;line-height:0.95}
    .vt-type{display:inline-block;background:#1a1400;color:#c8a000;font-size:0.65rem;font-weight:700;padding:0.2rem 0.75rem;letter-spacing:0.1em;margin-top:0.5rem}
    .verdict-body{padding:2rem 3rem}
    .vb-section{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #e8d8a0}
    .vb-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .vb-num{font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:#c8a000;margin-bottom:0.3rem;font-weight:700}
    .vb-title{font-size:0.85rem;font-weight:700;color:#1a1400;margin-bottom:0.5rem;letter-spacing:0.03em}
    .vb-content{font-size:0.85rem;color:#2a2000;line-height:1.8}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1px solid #d4c080;font-size:0.7rem;padding:0.15rem 0.55rem;color:#7a6000}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.3rem}
    .kw{font-size:0.68rem;background:#1a1400;color:#c8a000;padding:0.2rem 0.55rem;font-weight:700}
    .verdict-seal{text-align:center;padding:1.5rem;border-top:2px double #1a1400;background:#fafaf0}
    .seal-text{font-size:0.75rem;color:#8a6800;letter-spacing:0.08em}
    .seal-date{font-size:0.7rem;color:#8a6800;margin-top:0.3rem}
    footer{padding:1.25rem 3rem;font-size:0.65rem;color:#9a8840;display:flex;justify-content:space-between}
    footer a{color:#c8a000;text-decoration:none}
    @media(max-width:600px){.verdict-body,.verdict-title{padding:1.5rem}}
  </style>
</head><body>
  <div class="court-header">
    <div class="ch-emblem">⚖️</div>
    <div class="ch-title">배재대학교 포트폴리오 법원</div>
    <div class="ch-sub">법원 스타일 · 전공탐색 박람회 2026</div>
  </div>
  <div class="verdict">
    <div class="verdict-title">
      <div class="vt-case">사건번호 PCU-2026-${pageId.toUpperCase()}</div>
      <div class="vt-name">${pageId}</div>
      <div class="vt-type">포트폴리오 선고문</div>
    </div>
    <div class="verdict-body">
      <div class="vb-section">
        <div class="vb-num">제 1조</div>
        <div class="vb-title">주문</div>
        <div class="vb-content">${oneLineDesc}</div>
      </div>
      <div class="vb-section">
        <div class="vb-num">제 2조</div>
        <div class="vb-title">당사자 정보</div>
        <div class="vb-content">${major}${strength ? " · " + strength : ""}</div>
        ${keywords.length ? `<div class="kws" style="margin-top:0.5rem">${keywordStr}</div>` : ""}
      </div>
      ${tags.length ? `<div class="vb-section"><div class="vb-num">제 3조</div><div class="vb-title">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${companyName ? `<div class="vb-section"><div class="vb-num">제 4조</div><div class="vb-title">롤모델 기업</div><div class="vb-content">${companyName}</div></div>` : ""}
    </div>
    <div class="verdict-seal">
      <div class="seal-text">위와 같이 선고합니다 — 배재대학교 창업지원팀</div>
      <div class="seal-date">${createdAt}</div>
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T46 — 행정안전부 공문서
  // 특징: 정부 공문서 양식, 공식 행정, 네이비+화이트
  // ════════════════════════════
  const T46 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#eef2f8;color:#0a1428;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .gov-doc{max-width:760px;margin:2rem auto;background:#fff;border:1px solid #c8d8f0;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
    .gov-header{border-bottom:3px solid #003399;padding:1.5rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .gh-logo{display:flex;align-items:center;gap:0.75rem}
    .gh-emblem{font-size:2rem}
    .gh-name{font-size:0.85rem;font-weight:700;color:#003399;line-height:1.3}
    .gh-eng{font-size:0.6rem;color:#4a6080;letter-spacing:0.05em}
    .gh-doc-num{font-size:0.65rem;color:#4a6080;text-align:right;line-height:1.6}
    .doc-title-section{padding:1.5rem 2.5rem;border-bottom:1px solid #e0e8f8;text-align:center;background:#f8faff}
    .dt-label{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;display:block;font-weight:700}
    .dt-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,7vw,4rem);color:#003399;letter-spacing:0.06em;line-height:0.95}
    .dt-sub{font-size:0.8rem;color:#1a3050;margin-top:0.5rem;line-height:1.6}
    .doc-body{padding:1.5rem 2.5rem}
    .doc-table{width:100%;border-collapse:collapse;margin-bottom:1.25rem}
    .doc-table td{padding:0.75rem 1rem;border:1px solid #d0ddf0;font-size:0.85rem;vertical-align:top}
    .doc-table td:first-child{width:120px;background:#f0f5ff;font-size:0.7rem;font-weight:700;color:#003399;letter-spacing:0.04em}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0ff;font-size:0.7rem;padding:0.15rem 0.5rem;color:#003399}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap}
    .kw{font-size:0.68rem;background:#003399;color:#fff;padding:0.2rem 0.55rem;font-weight:700}
    .doc-footer-box{padding:1rem 2.5rem;border-top:1px solid #e0e8f8;background:#f8faff;display:flex;justify-content:space-between;font-size:0.72rem;color:#4a6080}
    footer{padding:1rem 2.5rem;font-size:0.65rem;color:#8090b0;display:flex;justify-content:space-between}
    footer a{color:#003399;text-decoration:none}
    @media(max-width:600px){.gov-header{flex-direction:column;gap:0.75rem;text-align:center}.doc-body,.doc-title-section{padding:1.25rem}}
  </style>
</head><body>
  <div class="gov-doc">
    <div class="gov-header">
      <div class="gh-logo"><div class="gh-emblem">🏛️</div><div><div class="gh-name">배재대학교<br/>취·창업지원처 창업지원팀</div><div class="gh-eng">행정안전부 스타일 · 전공탐색 박람회 2026</div></div></div>
      <div class="gh-doc-num">문서번호: PCU-2026-${pageId.toUpperCase()}<br/>시행일: ${createdAt}<br/>분류: 포트폴리오</div>
    </div>
    <div class="doc-title-section">
      <span class="dt-label">포트폴리오 공문서</span>
      <div class="dt-title">${pageId}</div>
      <div class="dt-sub">${oneLineDesc}</div>
    </div>
    <div class="doc-body">
      <table class="doc-table">
        <tr><td>전공</td><td>${major}</td></tr>
        ${strength ? `<tr><td>강점 스타일</td><td>${strength}</td></tr>` : ""}
        ${tags.length ? `<tr><td>관심 분야</td><td><div class="tags">${tagStr}</div></td></tr>` : ""}
        ${keywords.length ? `<tr><td>핵심 역량</td><td><div class="kws">${keywordStr}</div></td></tr>` : ""}
        ${companyName ? `<tr><td>롤모델 기업</td><td>${companyName}</td></tr>` : ""}
      </table>
    </div>
    <div class="doc-footer-box"><span>배재대학교 창업지원팀 발행</span><span>${createdAt}</span></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T47 — 소방청 긴급 대시보드
  // 특징: 긴급출동 대시보드, 레드알람, 소방관 감성
  // ════════════════════════════
  const T47 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0a0000;color:#fff0e0;font-family:'Space Mono','Noto Sans KR',monospace;min-height:100vh}
    .alarm-bar{background:#cc0000;padding:0.5rem 2rem;display:flex;align-items:center;gap:1rem;animation:alarm-blink 2s infinite}
    @keyframes alarm-blink{0%,100%{background:#cc0000}50%{background:#ff2200}}
    .alarm-badge{background:#fff;color:#cc0000;font-size:0.6rem;font-weight:900;padding:0.15rem 0.5rem;letter-spacing:0.1em}
    .alarm-text{font-size:0.65rem;letter-spacing:0.1em;color:#fff;font-family:'Space Mono',monospace}
    .dispatch{background:#1a0000;border-bottom:1px solid #330000;padding:2.5rem 2.5rem 2rem;display:grid;grid-template-columns:1fr 200px;gap:2rem;align-items:start}
    .dispatch-badge{font-size:0.5rem;letter-spacing:0.22em;text-transform:uppercase;color:#ff4400;margin-bottom:0.75rem;display:block}
    .dispatch-id{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,7rem);color:#ff4400;letter-spacing:0.04em;line-height:0.9;text-shadow:0 0 40px rgba(255,68,0,0.4)}
    .dispatch-desc{font-size:0.88rem;color:#c09080;line-height:1.65;margin-top:0.75rem;font-family:'Noto Sans KR',sans-serif}
    .dispatch-meta{font-size:0.65rem;color:#604040;margin-top:0.5rem;letter-spacing:0.08em}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}
    .kw{font-size:0.65rem;color:#ff4400;border:1px solid #ff440033;padding:0.2rem 0.6rem;font-weight:700}
    .status-panel{background:#0d0000;border:1px solid #330000;padding:1.25rem}
    .sp-title{font-size:0.5rem;letter-spacing:0.2em;text-transform:uppercase;color:#ff4400;margin-bottom:0.75rem;opacity:0.7}
    .status-item{display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0;border-bottom:1px solid #220000;font-size:0.72rem}
    .status-item:last-child{border-bottom:none}
    .si-label{color:#805050}
    .si-value{color:#ff6644;font-weight:700}
    .grid-section{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#220000;border-top:1px solid #330000}
    .grid-cell{background:#0d0000;padding:1.5rem 1.25rem}
    .gc-label{font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:#ff4400;margin-bottom:0.4rem;opacity:0.7;font-weight:700}
    .gc-value{font-size:0.82rem;color:#c09080;line-height:1.5;font-family:'Noto Sans KR',sans-serif}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#1a0000;border:1px solid #440000;font-size:0.65rem;padding:0.15rem 0.5rem;color:#ff6644}
    footer{padding:1rem 2.5rem;font-size:0.6rem;color:#4d1010;display:flex;justify-content:space-between;border-top:1px solid #220000}
    footer a{color:#ff4400;text-decoration:none;opacity:0.5}
    @media(max-width:700px){.dispatch{grid-template-columns:1fr}.grid-section{grid-template-columns:1fr}}
  </style>
</head><body>
  <div class="alarm-bar"><span class="alarm-badge">DISPATCH</span><span class="alarm-text">소방청 스타일 · 긴급 포트폴리오 발령</span></div>
  <div class="dispatch">
    <div>
      <span class="dispatch-badge">UNIT ID · 출동 코드</span>
      <div class="dispatch-id">${pageId}</div>
      <div class="dispatch-desc">${oneLineDesc}</div>
      <div class="dispatch-meta">${major}${strength ? " · " + strength : ""}</div>
      ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
    </div>
    <div class="status-panel">
      <div class="sp-title">STATUS BOARD</div>
      <div class="status-item"><span class="si-label">상태</span><span class="si-value">ACTIVE</span></div>
      <div class="status-item"><span class="si-label">역량</span><span class="si-value">${keywords.length}종</span></div>
      <div class="status-item"><span class="si-label">관심</span><span class="si-value">${tags.length}분야</span></div>
      <div class="status-item"><span class="si-label">등급</span><span class="si-value">A+</span></div>
    </div>
  </div>
  <div class="grid-section">
    ${tags.length ? `<div class="grid-cell"><div class="gc-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
    ${strength ? `<div class="grid-cell"><div class="gc-label">강점 스타일</div><div class="gc-value">${strength}</div></div>` : ""}
    ${companyName ? `<div class="grid-cell"><div class="gc-label">롤모델 기업</div><div class="gc-value">${companyName}</div></div>` : ""}
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T48 — 한국가스공사 에너지 파이프라인
  // 특징: 파이프라인 흐름도, 에너지 인프라, 블루+오렌지
  // ════════════════════════════
  const T48 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0f6ff;color:#001433;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .kogas-header{background:linear-gradient(135deg,#003399,#0055cc);color:#fff;padding:1.25rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .kh-logo{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.1em}
    .kh-sub{font-size:0.6rem;opacity:0.7;letter-spacing:0.06em}
    .pipeline-hero{background:#fff;padding:3rem 3rem 2rem;border-bottom:1px solid #d0e0f8}
    .ph-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.75rem;display:block;font-weight:700}
    .ph-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,10vw,6.5rem);color:#003399;letter-spacing:0.04em;line-height:0.92}
    .ph-desc{font-size:0.9rem;color:#1a3050;line-height:1.7;margin-top:0.75rem;font-weight:300;max-width:520px}
    .ph-meta{font-size:0.7rem;color:#4a6080;margin-top:0.5rem}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem}
    .kw{font-size:0.68rem;background:#003399;color:#fff;padding:0.22rem 0.65rem;font-weight:700}
    .pipeline{padding:2rem 3rem;background:#f8fbff}
    .pipe-title{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:1.5rem;font-weight:700}
    .pipe-flow{display:flex;align-items:stretch;gap:0}
    .pipe-node{background:#fff;border:1.5px solid #c0d8f8;border-radius:8px;padding:1rem 1.25rem;flex:1;position:relative}
    .pipe-node::after{content:'→';position:absolute;right:-16px;top:50%;transform:translateY(-50%);font-size:1.2rem;color:#003399;z-index:1}
    .pipe-node:last-child::after{display:none}
    .pn-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.3rem;font-weight:700}
    .pn-value{font-size:0.78rem;color:#1a3050;line-height:1.4}
    .tags-area{padding:1.5rem 3rem 2rem;background:#fff;border-top:1px solid #d0e0f8}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f0ff;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:3px;color:#003399}
    footer{background:#003399;color:rgba(255,255,255,0.35);padding:1.25rem 2.5rem;font-size:0.65rem;display:flex;justify-content:space-between}
    footer a{color:${ac.accent};text-decoration:none}
    @media(max-width:700px){.pipe-flow{flex-direction:column}.pipe-node::after{content:'↓';right:50%;bottom:-16px;top:auto;transform:translateX(50%)}.pipeline,.tags-area,.pipeline-hero{padding-left:1.5rem;padding-right:1.5rem}}
  </style>
</head><body>
  <div class="kogas-header"><div class="kh-logo">KOGAS PORTFOLIO</div><div class="kh-sub">한국가스공사 스타일</div></div>
  <div class="pipeline-hero">
    <span class="ph-badge">ENERGY PORTFOLIO · 에너지 포트폴리오</span>
    <div class="ph-title">${pageId}</div>
    <div class="ph-desc">${oneLineDesc}</div>
    <div class="ph-meta">${major}${strength ? " · " + strength : ""}</div>
    ${headline ? `<div style="font-size:0.82rem;color:${ac.accent};margin-top:0.5rem;font-style:italic;opacity:0.85">"${headline}"</div>` : ""}
    ${subheadlineHtml}
    ${keywords.length ? `<div class="kws">${keywordStr}</div>` : ""}
  </div>
  <div class="pipeline">
    <div class="pipe-title">PIPELINE · 성장 파이프라인</div>
    <div class="pipe-flow">
      <div class="pipe-node"><div class="pn-label">전공</div><div class="pn-value">${major.split(" - ")[0]}</div></div>
      <div class="pipe-node"><div class="pn-label">강점</div><div class="pn-value">${strength || "-"}</div></div>
      <div class="pipe-node"><div class="pn-label">목표</div><div class="pn-value">${companyName || "탐색중"}</div></div>
    </div>
  </div>
  ${tags.length ? `<div class="tags-area"><div style="font-size:0.5rem;letter-spacing:0.18em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.6rem;font-weight:700">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T49 — 국민건강보험공단 건강검진 리포트
  // 특징: 건강검진 결과지, 수치/등급, 그린 의료
  // ════════════════════════════
  const T49 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f0fff8;color:#003322;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .nhis-header{background:#00804d;color:#fff;padding:1rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .nh-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.08em}
    .nh-sub{font-size:0.6rem;opacity:0.75;letter-spacing:0.05em}
    .report{max-width:760px;margin:1.5rem auto;background:#fff;border:1px solid #b2f0d8;box-shadow:0 2px 12px rgba(0,128,77,0.06)}
    .report-header{padding:1.5rem 2.5rem;border-bottom:2px solid #00804d;background:#f5fff8}
    .rh-badge{font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:${ac.accent};margin-bottom:0.5rem;display:block;font-weight:700}
    .rh-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5rem);color:#00804d;letter-spacing:0.04em;line-height:0.95}
    .rh-desc{font-size:0.88rem;color:#1a4433;line-height:1.7;margin-top:0.5rem;font-weight:300}
    .rh-meta{font-size:0.7rem;color:#4d8060;margin-top:0.4rem}
    .result-summary{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #c8f0e0}
    .rs-cell{padding:1.25rem 1rem;text-align:center;border-right:1px solid #d8f5e8}
    .rs-cell:last-child{border-right:none}
    .rs-grade{font-family:'Bebas Neue',sans-serif;font-size:2.5rem;line-height:1}
    .rs-grade.a{color:#00804d}.rs-grade.b{color:#4caf50}.rs-grade.c{color:#ff9800}
    .rs-label{font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:#4d8060;margin-top:0.2rem}
    .detail-section{padding:1.5rem 2.5rem}
    .ds-row{display:grid;grid-template-columns:130px 1fr;gap:1rem;padding:0.75rem 0;border-bottom:1px solid #e8f5f0;align-items:start}
    .ds-row:last-child{border-bottom:none}
    .ds-label{font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:#00804d;font-weight:700;padding-top:0.1rem}
    .ds-value{font-size:0.85rem;color:#003322;line-height:1.5}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{background:#e8f5f0;font-size:0.7rem;padding:0.15rem 0.5rem;border-radius:3px;color:#005533}
    .kws{display:flex;gap:0.3rem;flex-wrap:wrap}
    .kw{font-size:0.68rem;background:#00804d;color:#fff;padding:0.2rem 0.55rem;font-weight:700}
    .report-footer{background:#f5fff8;padding:1rem 2.5rem;border-top:1px solid #c8f0e0;font-size:0.7rem;color:#4d8060;display:flex;justify-content:space-between}
    footer{padding:1rem 2rem;font-size:0.65rem;color:#80b090;display:flex;justify-content:space-between}
    footer a{color:#00804d;text-decoration:none}
    @media(max-width:600px){.result-summary{grid-template-columns:1fr 1fr}.detail-section,.report-header{padding:1.25rem}}
  </style>
</head><body>
  <div class="nhis-header"><div class="nh-logo">NHIS PORTFOLIO</div><div class="nh-sub">건강보험공단 스타일</div></div>
  <div class="report">
    <div class="report-header">
      <span class="rh-badge">포트폴리오 건강검진 결과보고서</span>
      <div class="rh-name">${pageId}</div>
      <div class="rh-desc">${oneLineDesc}</div>
      <div class="rh-meta">${major}${strength ? " · " + strength : ""} · ${createdAt}</div>
    </div>
    <div class="result-summary">
      <div class="rs-cell"><div class="rs-grade a">A+</div><div class="rs-label">종합등급</div></div>
      <div class="rs-cell"><div class="rs-grade a">${tags.length}</div><div class="rs-label">관심분야</div></div>
      <div class="rs-cell"><div class="rs-grade b">${keywords.length}</div><div class="rs-label">핵심역량</div></div>
      <div class="rs-cell"><div class="rs-grade a">정상</div><div class="rs-label">판정</div></div>
    </div>
    <div class="detail-section">
      ${tags.length ? `<div class="ds-row"><div class="ds-label">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="ds-row"><div class="ds-label">강점 스타일</div><div class="ds-value">${strength}</div></div>` : ""}
      ${keywords.length ? `<div class="ds-row"><div class="ds-label">핵심 역량</div><div class="kws">${keywordStr}</div></div>` : ""}
      ${companyName ? `<div class="ds-row"><div class="ds-label">롤모델 기업</div><div class="ds-value">${companyName}</div></div>` : ""}
    </div>
    <div class="report-footer"><span>배재대학교 창업지원팀 발행</span><span>검진일: ${createdAt}</span></div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  // ════════════════════════════
  // T50 — 법무법인 계약서
  // 특징: 로펌 계약서 형식, 다크+골드, 법률 전문가
  // ════════════════════════════
  const T50 = `${meta}
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#f5f3e8;color:#1a1500;font-family:'Noto Sans KR',sans-serif;min-height:100vh}
    .law-header{background:#1a1500;color:#c8a000;padding:1.5rem 3rem;display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #c8a000}
    .lh-firm{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.12em}
    .lh-practice{font-size:0.6rem;color:rgba(200,160,0,0.65);letter-spacing:0.08em;margin-top:0.2rem}
    .lh-date{font-size:0.65rem;color:rgba(200,160,0,0.6);text-align:right}
    .contract{max-width:760px;margin:2rem auto;background:#fff;border:1px solid #d8c880;box-shadow:0 4px 16px rgba(0,0,0,0.06)}
    .contract-title{text-align:center;padding:2.5rem 3rem 2rem;border-bottom:2px solid #c8a000;background:#fffdf0}
    .ct-label{font-size:0.55rem;letter-spacing:0.25em;text-transform:uppercase;color:#c8a000;margin-bottom:0.75rem;display:block;font-weight:700}
    .ct-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3rem,8vw,5rem);color:#1a1500;letter-spacing:0.06em;line-height:0.95}
    .ct-parties{font-size:0.8rem;color:#4a3800;margin-top:0.75rem;line-height:1.6}
    .clauses{padding:2rem 3rem}
    .clause{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #e8d880}
    .clause:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .clause-num{font-size:0.7rem;font-weight:700;color:#c8a000;margin-bottom:0.4rem;letter-spacing:0.08em}
    .clause-title{font-size:0.85rem;font-weight:700;color:#1a1500;margin-bottom:0.5rem}
    .clause-content{font-size:0.85rem;color:#2a2000;line-height:1.8}
    .tags{display:flex;flex-wrap:wrap;gap:0.3rem}
    .tag{border:1px solid #d8c880;font-size:0.7rem;padding:0.15rem 0.55rem;color:#7a6000}
    .kws{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.3rem}
    .kw{font-size:0.68rem;background:#1a1500;color:#c8a000;padding:0.2rem 0.55rem;font-weight:700}
    .signature{padding:1.5rem 3rem;border-top:2px solid #c8a000;background:#fffdf0;display:grid;grid-template-columns:1fr 1fr;gap:2rem}
    .sig-block{text-align:center}
    .sig-line{border-top:1px solid #1a1500;margin-top:2rem;padding-top:0.5rem;font-size:0.7rem;color:#4a3800}
    footer{padding:1.25rem 3rem;font-size:0.65rem;color:#9a8840;display:flex;justify-content:space-between}
    footer a{color:#c8a000;text-decoration:none}
    @media(max-width:600px){.clauses,.contract-title,.signature{padding:1.5rem}.signature{grid-template-columns:1fr}}
  </style>
</head><body>
  <div class="law-header">
    <div><div class="lh-firm">PCU LAW FIRM</div><div class="lh-practice">법무법인 스타일 · 배재대학교 전공탐색 박람회 2026</div></div>
    <div class="lh-date">문서번호: PCU-2026<br/>${createdAt}</div>
  </div>
  <div class="contract">
    <div class="contract-title">
      <span class="ct-label">포트폴리오 계약서 · CONTRACT OF PORTFOLIO</span>
      <div class="ct-title">${pageId}</div>
      <div class="ct-parties">${oneLineDesc}<br/>${major}${strength ? " · " + strength : ""}</div>
    </div>
    <div class="clauses">
      ${keywords.length ? `<div class="clause"><div class="clause-num">제 1 조</div><div class="clause-title">핵심 역량</div><div class="kws">${keywordStr}</div></div>` : ""}
      ${tags.length ? `<div class="clause"><div class="clause-num">제 2 조</div><div class="clause-title">관심 분야</div><div class="tags">${tagStr}</div></div>` : ""}
      ${strength ? `<div class="clause"><div class="clause-num">제 3 조</div><div class="clause-title">강점 스타일</div><div class="clause-content">${strength}</div></div>` : ""}
      ${companyName ? `<div class="clause"><div class="clause-num">제 4 조</div><div class="clause-title">롤모델 기업</div><div class="clause-content">${companyName}</div></div>` : ""}
    </div>
    <div class="signature">
      <div class="sig-block"><div style="font-size:0.75rem;color:#4a3800">갑 (포트폴리오 소유자)</div><div class="sig-line">${pageId}</div></div>
      <div class="sig-block"><div style="font-size:0.75rem;color:#4a3800">을 (배재대학교 창업지원팀)</div><div class="sig-line">${createdAt}</div></div>
    </div>
  </div>
  ${extraSections}
  ${footer}
</body></html>`;

  const templates = { T41, T42, T43, T44, T45, T46, T47, T48, T49, T50 };
  return templates;
}

module.exports = { getT41to50 };
