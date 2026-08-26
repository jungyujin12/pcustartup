"""Content-led website engine for the PCU startup/career builder.

V7 intentionally ships three finished systems instead of combining dozens of
unverified design fragments.  Objective measurements are deterministic; the
Ollama planner may recommend a system but may not invent content or bypass the
eligibility rules in this module.
"""

from __future__ import annotations

import hashlib
import re
from html import escape

from website_renderer import _fields, _get, _items, _sentences


SYSTEMS = ("startup-product", "quiet-portfolio", "case-study")


def _text(value) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def _numbers(value: str):
    return re.findall(r"(?<![A-Za-z])\d+(?:[.,]\d+)?(?:\s*(?:명|개|회|건|%|개월|주|일|시간))?", value or "")[:6]


def analyze_content_metadata(source: str, mode: str, site_images=None) -> dict:
    fields = _fields(source)
    images = [item for item in (site_images or []) if str(item).startswith("data:image/")][:3]
    labels = (
        ("프로젝트·서비스명", "핵심 한 줄 소개", "문제 정의", "해결 방법", "주요 활동", "성과·검증 결과", "배운 점·향후 계획")
        if mode == "startup" else
        ("이름", "희망 직무", "한 줄 소개", "핵심 역량·기술", "강점·업무 방식", "프로젝트", "경험·경력·대외활동", "교육·자격·수상")
    )
    values = {label: _text(fields.get(label, "")) for label in labels}
    missing = [label for label, value in values.items() if len(value) < 4]
    public_text = " ".join(values.values())
    meaningful_chars = len(re.sub(r"\s", "", public_text))
    sentences = [s for s in re.split(r"(?<=[.!?다요])\s+|\n+", public_text) if len(_text(s)) >= 8]
    normalized = [re.sub(r"[^가-힣A-Za-z0-9]", "", s).lower() for s in sentences]
    duplicate_ratio = 0 if not normalized else round(1 - len(set(normalized)) / len(normalized), 3)
    evidence_text = values.get("성과·검증 결과", "") if mode == "startup" else " ".join((values.get("프로젝트", ""), values.get("경험·경력·대외활동", "")))
    number_tokens = _numbers(evidence_text)
    planned = bool(re.search(r"예정|계획|목표|준비\s*중|진행할|추진할|검토\s*중", public_text))
    completed = bool(re.search(r"완료|실시|진행했|제작했|확인했|운영했|수행했|도출했|분석했", evidence_text))
    stage = "mixed" if planned and completed else "completed_evidence" if completed else "planning" if planned else "unspecified"
    completeness = round((len(labels) - len(missing)) / len(labels) * 100)
    specificity = min(100, 30 + len(number_tokens) * 10 + min(35, meaningful_chars // 35))
    evidence_score = min(100, (35 if evidence_text else 0) + len(number_tokens) * 12 + (25 if completed else 0))
    if meaningful_chars < 280:
        density = "low"
    elif meaningful_chars < 1000:
        density = "medium"
    else:
        density = "high"
    if images:
        image_strategy = "gallery" if len(images) >= 3 else "showcase"
    elif number_tokens:
        image_strategy = "evidence-visual"
    else:
        image_strategy = "typographic"
    return {
        "engineVersion": "7.0-pilot",
        "mode": mode,
        "meaningfulChars": meaningful_chars,
        "contentDensity": density,
        "completenessScore": completeness,
        "specificityScore": specificity,
        "evidenceScore": evidence_score,
        "duplicateRatio": duplicate_ratio,
        "missingFields": missing,
        "imageCount": len(images),
        "imageStrategy": image_strategy,
        "numberTokens": number_tokens,
        "stage": stage,
        "needsClarification": completeness < 55 or meaningful_chars < 100,
    }


def choose_design_system(mode: str, metadata: dict, plan: dict | None = None, variant_index: int = 0) -> str:
    requested = _text((plan or {}).get("designSystem"))
    allowed = ("startup-product", "case-study") if mode == "startup" else ("quiet-portfolio", "case-study")
    if requested not in allowed:
        requested = allowed[0]
    ordered = [requested] + [item for item in allowed if item != requested]
    return ordered[variant_index % len(ordered)]


def _image_markup(images, alt, css="media-frame"):
    if not images:
        return ""
    return f'<figure class="{css}"><img src="{escape(images[0], quote=True)}" alt="{escape(alt)}"></figure>'


def _evidence_visual(tokens, label):
    if not tokens:
        return ""
    items = "".join(f'<div class="metric"><strong>{escape(token)}</strong><span>입력 자료에서 확인된 수치</span></div>' for token in tokens[:4])
    return f'<section class="metrics" id="evidence"><div class="section-label">EVIDENCE</div><div><h2>{escape(label)}</h2><div class="metric-grid">{items}</div></div></section>'


def _common_head(title, system):
    return f'''<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="PCU Design Engine v7 pilot"><meta name="design-system" content="{system}"><title>{escape(title)}</title>'''


def _base_css(system):
    accent = {"startup-product": "#ff5b35", "quiet-portfolio": "#315b4c", "case-study": "#3157d5"}[system]
    display = "'Gowun Batang',serif" if system == "quiet-portfolio" else "'Noto Sans KR',sans-serif"
    return f'''
    @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap');
    :root{{--ink:#17191d;--muted:#686d76;--paper:#fbfaf6;--soft:#f0efe9;--accent:{accent};--line:rgba(23,25,29,.15);--display:{display};--body:'Noto Sans KR',sans-serif;--page:min(1180px,calc(100% - 56px));--text:min(700px,100%)}}
    *{{box-sizing:border-box}}html{{scroll-behavior:smooth}}body{{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.72 var(--body);letter-spacing:-.015em;overflow-x:hidden}}a{{color:inherit}}p{{max-width:66ch;word-break:keep-all}}h1,h2,h3{{margin:0;font-family:var(--display);word-break:keep-all;text-wrap:balance}}h1{{font-size:clamp(42px,6vw,78px);line-height:1.04;letter-spacing:-.055em}}h2{{font-size:clamp(30px,4vw,50px);line-height:1.18;letter-spacing:-.04em}}h3{{font-size:clamp(20px,2vw,28px);line-height:1.3}}.site-nav{{position:fixed;inset:0 0 auto;z-index:20;padding:14px 0;color:#fff;transition:.3s}}.site-nav.scrolled{{background:rgba(20,22,26,.9);backdrop-filter:blur(18px)}}.nav-inner{{width:var(--page);margin:auto;display:flex;align-items:center;gap:28px}}.brand{{font-weight:800;text-decoration:none;white-space:nowrap}}.nav-links{{display:flex;gap:26px;margin-left:auto}}.nav-links a{{font-size:13px;font-weight:700;text-decoration:none;opacity:.74}}.nav-links a:hover{{opacity:1}}.menu-button{{display:none;margin-left:auto;border:0;background:none;color:inherit;font-size:24px}}.hero-actions{{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}}.button{{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;background:var(--accent);color:#fff;text-decoration:none;font-size:13px;font-weight:800}}.button.ghost{{background:transparent;border:1px solid currentColor;color:inherit}}.section-label{{font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--accent)}}.reveal{{opacity:0;transform:translateY(26px);transition:.7s cubic-bezier(.2,.7,.2,1)}}.reveal.in{{opacity:1;transform:none}}.media-frame{{margin:0;overflow:hidden;background:var(--soft)}}.media-frame img{{display:block;width:100%;height:100%;object-fit:cover}}.metrics{{width:var(--page);margin:auto;padding:clamp(80px,10vw,140px) 0;display:grid;grid-template-columns:180px 1fr;gap:40px}}.metric-grid{{display:grid;grid-template-columns:repeat(2,1fr);margin-top:48px;border-top:1px solid var(--line)}}.metric{{padding:28px 8px;border-bottom:1px solid var(--line)}}.metric strong{{display:block;font:700 clamp(36px,5vw,68px)/1 var(--display);color:var(--accent)}}.metric span{{font-size:12px;color:var(--muted)}}.back-top{{position:fixed;right:18px;bottom:18px;width:44px;height:44px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:rgba(255,255,255,.82);text-decoration:none;backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:.25s}}.back-top.show{{opacity:1;pointer-events:auto}}footer{{padding:42px 0;background:#15171a;color:#aeb1b7}}footer>div{{width:var(--page);margin:auto;display:flex;justify-content:space-between;gap:20px;font-size:13px}}[id]{{scroll-margin-top:76px}}
    h1.long-title{{font-size:clamp(36px,4.6vw,62px)}}h2.long-title{{font-size:clamp(27px,3.2vw,42px)}}.site-nav.scrolled{{color:#fff}}body.system-quiet-portfolio .site-nav:not(.scrolled){{color:var(--ink)}}
    @media(max-width:720px){{:root{{--page:calc(100% - 32px)}}body{{font-size:15.5px}}h1{{font-size:clamp(38px,11vw,50px)}}h2{{font-size:clamp(28px,8vw,38px)}}.site-nav{{background:rgba(20,22,26,.9);color:#fff!important;backdrop-filter:blur(16px)}}.menu-button{{display:block}}.nav-links{{position:absolute;top:62px;left:12px;right:12px;display:none;padding:18px;background:#17191d;border-radius:14px}}.nav-links.open{{display:grid}}.metrics{{grid-template-columns:1fr;padding:72px 0;gap:20px}}.metric-grid{{grid-template-columns:1fr 1fr;margin-top:18px}}.metric strong{{font-size:38px}}footer>div{{display:block}}footer span{{display:block;margin-top:8px}}}}
    @media(prefers-reduced-motion:reduce){{*{{scroll-behavior:auto!important}}.reveal{{opacity:1;transform:none;transition:none}}}}
    '''


def _common_script():
    return '''<script>document.querySelectorAll('h1,h2').forEach(el=>{if(Array.from(el.textContent.trim()).length>(el.tagName==='H1'?18:24))el.classList.add('long-title')});const nav=document.querySelector('.site-nav'),topButton=document.querySelector('.back-top'),menu=document.querySelector('.nav-links'),menuButton=document.querySelector('.menu-button');const update=()=>{nav?.classList.toggle('scrolled',scrollY>20);topButton?.classList.toggle('show',scrollY>innerHeight*.8)};addEventListener('scroll',update,{passive:true});update();menuButton?.addEventListener('click',()=>{const open=menu?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(!!open))});menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));</script>'''


def _nav(brand, mode):
    action = "서비스" if mode == "startup" else "경험"
    return f'''<nav class="site-nav" aria-label="주요 메뉴"><div class="nav-inner"><a class="brand" href="#top">{escape(brand)}</a><button class="menu-button" type="button" aria-label="메뉴" aria-expanded="false">☰</button><div class="nav-links"><a href="#overview">소개</a><a href="#process">과정</a><a href="#evidence">근거</a><a href="#next">다음 단계</a><a href="#overview">{action} 보기</a></div></div></nav>'''


def _render_startup_product(fields, meta, images):
    name = _get(fields, "프로젝트·서비스명", "프로젝트명", default="창업 프로젝트")
    intro = _get(fields, "핵심 한 줄 소개", "한 줄 소개", default="프로젝트 소개")
    problem = _get(fields, "문제 정의")
    solution = _get(fields, "해결 방법", "해결 방식")
    activities = _items(_get(fields, "주요 활동"), 6)
    achievement = _get(fields, "성과·검증 결과", "성과")
    next_step = _get(fields, "배운 점·향후 계획", "향후 계획")
    steps = "".join(f'<article><b>{i:02d}</b><p>{escape(item)}</p></article>' for i, item in enumerate(activities or _sentences(solution, 5), 1))
    image = _image_markup(images, f"{name} 프로젝트 이미지")
    visual = image or '<div class="flow-visual" aria-label="문제에서 해결로 이어지는 서비스 흐름"><span>PROBLEM</span><i></i><span>SOLUTION</span><i></i><span>NEXT</span></div>'
    css = '''.product-hero{min-height:88svh;padding:132px 0 72px;background:#182523;color:#fff}.product-hero>.grid{width:var(--page);margin:auto;display:grid;grid-template-columns:minmax(0,.9fr) minmax(380px,1.1fr);gap:7vw;align-items:center}.hero-copy .eyebrow{color:var(--accent);font-size:12px;font-weight:800;letter-spacing:.14em}.hero-copy p{font-size:clamp(18px,1.6vw,22px);color:#c7d0cd}.flow-visual{min-height:470px;padding:34px;display:grid;align-content:center;gap:18px;border:1px solid rgba(255,255,255,.18);background:linear-gradient(145deg,rgba(255,255,255,.08),transparent)}.flow-visual span{padding:20px;border:1px solid rgba(255,255,255,.24);font-weight:800}.flow-visual i{display:block;width:1px;height:30px;margin:auto;background:var(--accent)}.product-hero .media-frame{height:520px}.value{width:var(--page);margin:auto;padding:clamp(80px,10vw,140px) 0;display:grid;grid-template-columns:180px 1fr;gap:50px}.value .lead{font-size:clamp(20px,2vw,28px);color:var(--accent)}.value p{font-size:18px}.process{padding:clamp(78px,9vw,130px) max(28px,calc((100% - 1180px)/2));background:#eef0e8}.process header{display:grid;grid-template-columns:180px 1fr;margin-bottom:50px}.steps{border-top:1px solid var(--line)}.steps article{display:grid;grid-template-columns:90px 1fr;padding:24px 0;border-bottom:1px solid var(--line)}.steps b{color:var(--accent)}.steps p{margin:0;font-size:18px}.proof-copy{width:var(--page);margin:0 auto;padding:0 0 100px}.next{padding:clamp(80px,10vw,140px) max(28px,calc((100% - 1180px)/2));background:var(--accent);color:#fff}.next p{font:600 clamp(25px,3vw,42px)/1.4 var(--display)}@media(max-width:720px){.product-hero{min-height:auto;padding:104px 0 56px}.product-hero>.grid{grid-template-columns:1fr;gap:36px}.flow-visual{min-height:290px}.product-hero .media-frame{height:320px}.value,.process header{grid-template-columns:1fr;gap:22px}.value{padding:72px 0}.process{padding:72px 20px}.steps article{grid-template-columns:44px 1fr}.steps p{font-size:16.5px}.next{padding:72px 20px}}'''
    body = f'''{_nav(name,"startup")}<header id="top" class="product-hero"><div class="grid"><div class="hero-copy"><div class="eyebrow">STUDENT STARTUP · PRODUCT</div><h1>{escape(name)}</h1><p>{escape(intro)}</p><div class="hero-actions"><a class="button" href="#overview">서비스 이해하기</a><a class="button ghost" href="#process">실행 과정</a></div></div>{visual}</div></header><main><section id="overview" class="value reveal"><div class="section-label">WHY</div><div><h2>해결하려는 문제</h2><p class="lead">{escape(problem)}</p><p>{escape(solution)}</p></div></section><section id="process" class="process reveal"><header><div class="section-label">PROCESS</div><h2>아이디어가 작동하는 방식</h2></header><div class="steps">{steps}</div></section>{_evidence_visual(meta['numberTokens'],'확인한 근거')}''' + (f'<section class="proof-copy reveal"><p>{escape(achievement)}</p></section>' if achievement else '') + f'''<section id="next" class="next reveal"><div class="section-label">NEXT</div><h2>다음 검증 단계</h2><p>{escape(next_step or "다음 실행 계획을 구체화하고 있습니다.")}</p></section></main>'''
    return name, body, css


def _render_quiet_portfolio(fields, meta, images):
    name = _get(fields, "이름", default="포트폴리오")
    role = _get(fields, "희망 직무", default="희망 직무")
    intro = _get(fields, "한 줄 소개", default="경험과 역량을 정리한 포트폴리오입니다.")
    strengths = _get(fields, "강점·업무 방식", "강점")
    skills = _items(_get(fields, "핵심 역량·기술", "핵심 역량"), 8)
    projects = _sentences(_get(fields, "프로젝트"), 6)
    experiences = _sentences(_get(fields, "경험·경력·대외활동", "경험"), 6)
    next_step = _get(fields, "교육·자격·수상", "진로 설계 기준")
    project_rows = "".join(f'<article><span>0{i}</span><p>{escape(item)}</p></article>' for i,item in enumerate(projects,1))
    experience_rows = "".join(f'<li>{escape(item)}</li>' for item in experiences)
    skill_tags = "".join(f'<span>{escape(item)}</span>' for item in skills)
    portrait = _image_markup(images, f"{name} 포트폴리오 이미지", "portrait")
    css = '''body{background:#f7f5ef}.quiet-hero{padding:150px 0 100px;border-bottom:1px solid var(--line)}.quiet-hero>.inner{width:var(--page);margin:auto;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.55fr);gap:8vw;align-items:end}.quiet-hero .kicker{font-size:12px;letter-spacing:.16em;color:var(--accent)}.quiet-hero h1{margin:22px 0}.quiet-hero .role{font:700 clamp(21px,2.2vw,32px)/1.4 var(--display)}.quiet-hero .intro{font-size:18px;color:var(--muted)}.portrait{height:460px}.overview{width:var(--page);margin:auto;padding:110px 0;display:grid;grid-template-columns:180px 1fr;gap:50px}.overview blockquote{margin:0;max-width:22ch;font:400 clamp(28px,3.6vw,48px)/1.4 var(--display)}.skills{display:flex;flex-wrap:wrap;gap:9px;margin-top:36px}.skills span{padding:9px 12px;border:1px solid var(--line);border-radius:999px;font-size:13px}.work{padding:110px max(28px,calc((100% - 1180px)/2));background:#1c211f;color:#fff}.work>header{display:grid;grid-template-columns:180px 1fr;margin-bottom:55px}.work article{display:grid;grid-template-columns:90px 1fr;padding:27px 0;border-top:1px solid rgba(255,255,255,.18)}.work article p{margin:0;font-size:clamp(17px,1.6vw,21px)}.experience{width:var(--page);margin:auto;padding:110px 0;display:grid;grid-template-columns:.75fr 1.25fr;gap:8vw}.experience ul{margin:0;padding:0;list-style:none}.experience li{padding:20px 0;border-top:1px solid var(--line)}.quiet-next{padding:100px max(28px,calc((100% - 1180px)/2));background:#dfe9e2}.quiet-next p{font:400 clamp(24px,3vw,40px)/1.45 var(--display)}@media(max-width:720px){.quiet-hero{padding:108px 0 68px}.quiet-hero>.inner,.overview,.work>header,.experience{grid-template-columns:1fr;gap:28px}.portrait{height:300px}.overview,.experience{padding:72px 0}.overview blockquote{font-size:29px}.work{padding:72px 20px}.work article{grid-template-columns:42px 1fr}.quiet-next{padding:72px 20px}}'''
    css += '.overview blockquote{max-width:30ch;font-size:clamp(27px,3vw,40px);line-height:1.48}@media(max-width:720px){.overview blockquote{font-size:27px}}'
    visual = portrait or f'<div><p class="intro">{escape(intro)}</p><div class="hero-actions"><a class="button" href="#process">프로젝트 보기</a></div></div>'
    body = f'''{_nav(name,"career")}<header id="top" class="quiet-hero"><div class="inner"><div><div class="kicker">CAREER PORTFOLIO</div><h1>{escape(name)}</h1><div class="role">{escape(role)}</div></div>{visual}</div></header><main><section id="overview" class="overview reveal"><div class="section-label">PROFILE</div><div><blockquote>{escape(strengths or intro)}</blockquote><div class="skills">{skill_tags}</div></div></section><section id="process" class="work reveal"><header><div class="section-label">SELECTED WORK</div><h2>경험으로 보여주는 역량</h2></header>{project_rows or '<p>프로젝트 내용을 준비하고 있습니다.</p>'}</section><section id="evidence" class="experience reveal"><div><div class="section-label">EXPERIENCE</div><h2>쌓아온 경험</h2></div><ul>{experience_rows or '<li>구체적인 경험을 추가해주세요.</li>'}</ul></section><section id="next" class="quiet-next reveal"><div class="section-label">NEXT</div><h2>다음 방향</h2><p>{escape(next_step or intro)}</p></section></main>'''
    return f"{name} · {role} 포트폴리오", body, css


def _render_case_study(fields, mode, meta, images):
    if mode == "startup":
        name = _get(fields, "프로젝트·서비스명", "프로젝트명", default="창업 프로젝트")
        intro = _get(fields, "핵심 한 줄 소개", default="프로젝트 사례")
        problem = _get(fields, "문제 정의")
        action = _get(fields, "해결 방법")
        process = _items(_get(fields, "주요 활동"), 7)
        result = _get(fields, "성과·검증 결과")
        next_step = _get(fields, "배운 점·향후 계획")
    else:
        name = _get(fields, "이름", default="포트폴리오")
        intro = _get(fields, "한 줄 소개", default="프로젝트 사례")
        problem = _get(fields, "강점·업무 방식", default="해결한 문제와 역할")
        action = _get(fields, "프로젝트")
        process = _sentences(_get(fields, "경험·경력·대외활동"), 7)
        result = _get(fields, "교육·자격·수상")
        next_step = _get(fields, "진로 설계 기준", default=intro)
    rows = "".join(f'<article><small>{i:02d}</small><p>{escape(item)}</p></article>' for i,item in enumerate(process or _sentences(action,6),1))
    image = _image_markup(images, f"{name} 사례 이미지", "case-image")
    css = '''body{background:#fff}.case-hero{padding:134px 0 78px;background:#101a36;color:#fff}.case-hero>.inner{width:var(--page);margin:auto}.case-hero .topline{display:flex;justify-content:space-between;gap:20px;margin-bottom:80px;font-size:12px;letter-spacing:.13em;color:#9dacd4}.case-hero h1{max-width:12ch}.case-hero .intro{max-width:34em;margin-top:26px;font-size:20px;color:#cbd3ea}.case-image{width:var(--page);height:min(60vw,680px);margin:-1px auto 0}.case-summary{width:var(--page);margin:auto;padding:100px 0;display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line)}.case-summary article{padding:42px;background:#fff}.case-summary p{font-size:18px}.case-process{padding:110px max(28px,calc((100% - 1180px)/2));background:#f1f4ff}.case-process>header{display:grid;grid-template-columns:180px 1fr;margin-bottom:58px}.case-rows{border-top:1px solid var(--line)}.case-rows article{display:grid;grid-template-columns:70px 1fr;padding:24px 0;border-bottom:1px solid var(--line)}.case-rows p{margin:0;font-size:18px}.case-result{width:var(--page);margin:auto;padding:110px 0}.case-result .statement{max-width:24ch;font:600 clamp(27px,3.7vw,50px)/1.35 var(--display)}.case-next{padding:100px max(28px,calc((100% - 1180px)/2));background:#101a36;color:#fff}.case-next p{font-size:20px;color:#cbd3ea}@media(max-width:720px){.case-hero{padding:108px 0 62px}.case-hero .topline{margin-bottom:48px}.case-image{width:100%;height:320px}.case-summary{grid-template-columns:1fr;padding:0}.case-summary article{padding:54px 20px}.case-process,.case-next{padding:72px 20px}.case-process>header{grid-template-columns:1fr;gap:22px}.case-rows article{grid-template-columns:42px 1fr}.case-rows p{font-size:16.5px}.case-result{padding:72px 0}}'''
    body = f'''{_nav(name,mode)}<header id="top" class="case-hero"><div class="inner"><div class="topline"><span>PCU · CASE STUDY</span><span>{escape(meta['stage'].upper())}</span></div><h1>{escape(name)}</h1><p class="intro">{escape(intro)}</p><div class="hero-actions"><a class="button" href="#overview">사례 읽기</a></div></div></header>{image}<main><section id="overview" class="case-summary reveal"><article><div class="section-label">CHALLENGE</div><h2>출발한 문제</h2><p>{escape(problem)}</p></article><article><div class="section-label">APPROACH</div><h2>선택한 방식</h2><p>{escape(action)}</p></article></section><section id="process" class="case-process reveal"><header><div class="section-label">PROCESS</div><h2>실행 과정</h2></header><div class="case-rows">{rows}</div></section><section id="evidence" class="case-result reveal"><div class="section-label">RESULT</div><p class="statement">{escape(result or "입력 자료에서 확인 가능한 결과를 정리하고 있습니다.")}</p></section><section id="next" class="case-next reveal"><div class="section-label">NEXT</div><h2>다음 단계</h2><p>{escape(next_step)}</p></section></main>'''
    return name, body, css


def render_v7(source: str, mode: str, options: dict, page_id: str, design_system: str, plan=None):
    if design_system not in SYSTEMS:
        raise ValueError("지원하지 않는 V7 디자인 시스템입니다.")
    if mode == "startup" and design_system == "quiet-portfolio":
        raise ValueError("창업 트랙에서 quiet-portfolio를 사용할 수 없습니다.")
    if mode == "career" and design_system == "startup-product":
        raise ValueError("취업 트랙에서 startup-product를 사용할 수 없습니다.")
    fields = _fields(source)
    images = [str(item) for item in options.get("_siteImages", []) if str(item).startswith("data:image/")][:3]
    meta = analyze_content_metadata(source, mode, images)
    if design_system == "startup-product":
        title, body, local_css = _render_startup_product(fields, meta, images)
    elif design_system == "quiet-portfolio":
        title, body, local_css = _render_quiet_portfolio(fields, meta, images)
    else:
        title, body, local_css = _render_case_study(fields, mode, meta, images)
    footer_default = "본 프로젝트는 배재대학교 RISE사업단의 지원을 받았습니다." if mode == "startup" else "배재대학교 학생 포트폴리오"
    footer_text = _text(options.get("footerText")) or footer_default
    footer = f'<footer><div>{escape(footer_text)}<span>© 2026 PCU Student Project</span></div></footer>' if options.get("includeFooter", True) else ""
    html = f'''<!DOCTYPE html><html lang="ko"><head>{_common_head(title,design_system)}<style>{_base_css(design_system)}{local_css}</style></head><body class="system-{design_system}">{body}{footer}<a class="back-top" href="#top" aria-label="맨 위로">↑</a>{_common_script()}</body></html>'''
    audit = audit_v7(html, meta)
    return html, title, {"engineVersion": "7.0-pilot", "designSystem": design_system, "contentMetadata": meta, "designPlan": plan or {}, "qualityAudit": audit, "structureFamily": design_system, "artDirectionKey": design_system}


def audit_v7(html: str, meta: dict) -> dict:
    checks = {
        "singleDocument": html.count("<!DOCTYPE html>") == 1,
        "responsive": "@media(max-width:720px)" in html,
        "navigation": all(f'href="#{key}"' in html for key in ("overview", "process", "evidence", "next")),
        "targets": all(f'id="{key}"' in html for key in ("overview", "process", "evidence", "next")),
        "boundedType": "font-size:clamp(42px,6vw,78px)" in html,
        "reducedMotion": "prefers-reduced-motion" in html,
        "noBrokenPlaceholder": "이미지 준비 중" not in html,
        "noRawSource": "[추가 원문]" not in html,
        "contentPresent": len(re.sub(r"<[^>]+>", "", html)) > 350,
        "stagePreserved": meta.get("stage") in ("planning", "mixed", "completed_evidence", "unspecified"),
    }
    score = round(sum(checks.values()) / len(checks) * 100)
    return {"score": score, "passed": score >= 90, "checks": checks}
