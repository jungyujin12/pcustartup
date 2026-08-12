import hashlib
import html
import re


DESIGN_CONCEPTS = [
    "에디토리얼 매거진", "네오 브루탈리즘", "스위스 그리드", "벤토 인터페이스", "터미널 테크",
    "오가닉 내추럴", "럭셔리 미니멀", "레트로 퓨처", "블루프린트", "뉴스페이퍼",
    "아트 갤러리", "키네틱 타이포", "모노크롬 포커스", "노르딕 소프트", "플레이풀 캠퍼스",
    "컨설팅 리포트", "글래스 레이어", "페이퍼 콜라주", "오로라 그라디언트", "인더스트리얼 유틸리티",
    "데이터 대시보드", "캠페인 포스터", "스토리북", "절제된 미니멀", "레트로 컴퓨팅",
    "아카이브 인덱스", "프로덕트 쇼케이스", "컬처 매거진", "크리에이티브 스튜디오", "캠퍼스 랩",
]

LAYOUTS = [
    "분할 히어로·서사형", "분할 히어로·카드형", "분할 히어로·교차형", "분할 히어로·타임라인형", "분할 히어로·벤토형",
    "중앙 히어로·서사형", "중앙 히어로·카드형", "중앙 히어로·교차형", "중앙 히어로·타임라인형", "중앙 히어로·벤토형",
    "세로 라인 히어로·서사형", "세로 라인 히어로·카드형", "세로 라인 히어로·교차형", "세로 라인 히어로·타임라인형", "세로 라인 히어로·벤토형",
    "포스터 히어로·서사형", "포스터 히어로·카드형", "포스터 히어로·교차형", "포스터 히어로·타임라인형", "포스터 히어로·벤토형",
    "사이드바 히어로·서사형", "사이드바 히어로·카드형", "사이드바 히어로·교차형", "사이드바 히어로·타임라인형", "사이드바 히어로·벤토형",
    "프레임 히어로·서사형", "프레임 히어로·카드형", "프레임 히어로·교차형", "프레임 히어로·타임라인형", "프레임 히어로·벤토형",
]

PALETTES = [
    ("심해 민트", "#071b2d", "#37e6a3", "#dffcf1", "#0d3555", "#fbfaf7"),
    ("코발트 선", "#102a43", "#ffb703", "#fff1c7", "#1f5f99", "#fffdf7"),
    ("잉크 코랄", "#171717", "#ff5c35", "#fff0ea", "#2447d8", "#fcfbf8"),
    ("포레스트 라임", "#202725", "#d7ff3f", "#efffba", "#4c5b55", "#fbfff4"),
    ("왕실 금빛", "#171512", "#d6b36a", "#f4ead5", "#5c4a2c", "#fdfbf6"),
    ("클린 블루", "#152238", "#3a86ff", "#e8f1ff", "#355070", "#fafcff"),
    ("토마토 크림", "#2a1714", "#ef492f", "#ffe5d9", "#9c2f21", "#fffaf5"),
    ("라벤더 잉크", "#201a36", "#a78bfa", "#ede9fe", "#5b4b8a", "#fcfbff"),
    ("사이버 시안", "#071a1f", "#2ff3e0", "#d9fffb", "#136f73", "#f5ffff"),
    ("체리 페이퍼", "#2a1220", "#ff4d7d", "#ffe2ea", "#8b284a", "#fff9fb"),
    ("세이지 클레이", "#25312b", "#d08c60", "#f1e1d2", "#52796f", "#fbfaf5"),
    ("레몬 네이비", "#101b35", "#ffe44d", "#fff9c9", "#325288", "#fffef7"),
    ("스카이 레드", "#123047", "#ff6262", "#e4f4ff", "#247ba0", "#f9fdff"),
    ("블랙 아이보리", "#111111", "#ece3d0", "#f7f1e5", "#57534e", "#fdfcf8"),
    ("민트 퍼플", "#132c2a", "#b692ff", "#e7fff9", "#5762d5", "#f8fffd"),
    ("버건디 핑크", "#30151c", "#ff9db3", "#ffe7ec", "#8c2f4a", "#fff9fa"),
    ("오션 오렌지", "#082f49", "#fb923c", "#e0f2fe", "#0369a1", "#f7fcff"),
    ("올리브 머스타드", "#2d3124", "#f2c14e", "#f4f1de", "#606c38", "#fffdf5"),
    ("슬레이트 아쿠아", "#17212b", "#63e6be", "#dcfff4", "#3e5c76", "#f9fffd"),
    ("플럼 피치", "#2f1833", "#ffb38a", "#ffe9dc", "#7e4e87", "#fffaf7"),
    ("인디고 그린", "#161d3a", "#62d2a2", "#e2faef", "#3d5a80", "#fafcff"),
    ("차콜 옐로", "#222222", "#ffd23f", "#fff5bd", "#555555", "#fdfdfb"),
    ("브릭 스카이", "#321d1a", "#76c7ff", "#e5f5ff", "#9b4a3c", "#fffaf8"),
    ("에메랄드 샌드", "#073b3a", "#f4d35e", "#f8efcf", "#0b6e4f", "#fffdf7"),
    ("그래파이트 핑크", "#202124", "#ff87ab", "#ffe6ee", "#5f6368", "#fcfcfc"),
    ("블루 바이올렛", "#15162d", "#7c8cff", "#e9ebff", "#514c9c", "#fbfbff"),
    ("모스 코랄", "#253226", "#ff7f6e", "#ffe4df", "#557153", "#fbfdf8"),
    ("커피 민트", "#2b2118", "#63d6b5", "#ddf8ef", "#735c45", "#fffcf8"),
    ("나이트 핑크", "#111827", "#f472b6", "#fce7f3", "#475569", "#fbfcff"),
    ("화이트 레드", "#262626", "#e63946", "#ffe5e7", "#6b7280", "#ffffff"),
]

TYPOGRAPHY = [
    ("프리텐다드", "Pretendard", "Noto Sans KR", "Pretendard"),
    ("명조 에디토리얼", "Nanum Myeongjo", "Noto Sans KR", "Nanum+Myeongjo:wght@700;800&family=Noto+Sans+KR:wght@400;600;800"),
    ("고딕 포스터", "Black Han Sans", "Noto Sans KR", "Black+Han+Sans&family=Noto+Sans+KR:wght@400;700"),
    ("스위스 산세리프", "IBM Plex Sans KR", "IBM Plex Sans KR", "IBM+Plex+Sans+KR:wght@400;600;700"),
    ("부드러운 라운드", "Gowun Dodum", "Gowun Dodum", "Gowun+Dodum"),
    ("단단한 타이틀", "Do Hyeon", "Noto Sans KR", "Do+Hyeon&family=Noto+Sans+KR:wght@400;700"),
    ("클래식 명조", "Gowun Batang", "Noto Sans KR", "Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@400;600"),
    ("모던 나눔", "Nanum Gothic", "Nanum Gothic", "Nanum+Gothic:wght@400;700;800"),
    ("손글씨 포인트", "Gaegu", "Noto Sans KR", "Gaegu:wght@400;700&family=Noto+Sans+KR:wght@400;700"),
    ("코딩 테크", "IBM Plex Mono", "IBM Plex Sans KR", "IBM+Plex+Mono:wght@500;700&family=IBM+Plex+Sans+KR:wght@400;600"),
    ("송명 헤드라인", "Song Myung", "Noto Sans KR", "Song+Myung&family=Noto+Sans+KR:wght@400;700"),
    ("주아 캐주얼", "Jua", "Noto Sans KR", "Jua&family=Noto+Sans+KR:wght@400;700"),
    ("도쿠도 굵은", "Dokdo", "Noto Sans KR", "Dokdo&family=Noto+Sans+KR:wght@400;700"),
    ("나눔 펜", "Nanum Pen Script", "Noto Sans KR", "Nanum+Pen+Script&family=Noto+Sans+KR:wght@400;700"),
    ("해성 명조", "Hahmlet", "Hahmlet", "Hahmlet:wght@400;600;800"),
    ("기라항 타이틀", "Kirang Haerang", "Noto Sans KR", "Kirang+Haerang&family=Noto+Sans+KR:wght@400;700"),
    ("싱글데이", "Single Day", "Noto Sans KR", "Single+Day&family=Noto+Sans+KR:wght@400;700"),
    ("선플라워", "Sunflower", "Sunflower", "Sunflower:wght@300;500;700"),
    ("이스트시 란초", "East Sea Dokdo", "Noto Sans KR", "East+Sea+Dokdo&family=Noto+Sans+KR:wght@400;700"),
    ("검은고딕", "Black Han Sans", "Gothic A1", "Black+Han+Sans&family=Gothic+A1:wght@400;600;800"),
    ("고딕 A1", "Gothic A1", "Gothic A1", "Gothic+A1:wght@400;600;800"),
    ("나눔 명조", "Nanum Myeongjo", "Nanum Gothic", "Nanum+Myeongjo:wght@700;800&family=Nanum+Gothic:wght@400;700"),
    ("IBM 명조", "Noto Serif KR", "IBM Plex Sans KR", "Noto+Serif+KR:wght@600;800&family=IBM+Plex+Sans+KR:wght@400;600"),
    ("Noto 균형", "Noto Sans KR", "Noto Sans KR", "Noto+Sans+KR:wght@400;600;800;900"),
    ("마루부리", "MaruBuri", "Noto Sans KR", "Noto+Sans+KR:wght@400;600;800"),
    ("쿠키런 라운드", "Jua", "Gowun Dodum", "Jua&family=Gowun+Dodum"),
    ("리포트 세리프", "Noto Serif KR", "Noto Sans KR", "Noto+Serif+KR:wght@600;800&family=Noto+Sans+KR:wght@400;600"),
    ("테크 모노", "IBM Plex Mono", "Gothic A1", "IBM+Plex+Mono:wght@500;700&family=Gothic+A1:wght@400;700"),
    ("포스터 도현", "Do Hyeon", "Gowun Dodum", "Do+Hyeon&family=Gowun+Dodum"),
    ("캠퍼스 주아", "Jua", "Nanum Gothic", "Jua&family=Nanum+Gothic:wght@400;700"),
]


def _fields(source):
    result = {}
    pattern = re.compile(r"^\[([^\]]+)\]\s*(.*?)(?=^\[[^\]]+\]|\Z)", re.M | re.S)
    for label, value in pattern.findall(source or ""):
        result[label.strip()] = value.strip()
    return result


def _get(data, *names, default=""):
    for name in names:
        if data.get(name):
            return data[name]
    return default


def _e(value):
    return html.escape(str(value or ""), quote=True)


def _items(value, limit=8):
    parts = re.split(r"[\n,;·•]+", str(value or ""))
    return [part.strip(" -\t") for part in parts if part.strip(" -\t")][:limit]


def _index(value, catalog, fallback):
    text = str(value or "").strip()
    if text in ("", "auto", "내용에 맞게 자동 선택"):
        return fallback % len(catalog)
    if text.isdigit():
        return max(0, min(len(catalog) - 1, int(text) - 1))
    for i, item in enumerate(catalog):
        if text == item or text in item:
            return i
    return fallback % len(catalog)


def _system(options, page_id, mode, reference_brief="", avoid=None):
    seed = int(hashlib.sha256(f"{page_id}|{mode}|{reference_brief}".encode()).hexdigest()[:12], 16)
    avoid = avoid or []
    design = _index(options.get("designConcept", options.get("designStyle")), DESIGN_CONCEPTS, seed)
    layout = _index(options.get("layoutPreset"), LAYOUTS, seed // 31)
    palette = _index(options.get("colorPalette"), PALETTES, seed // 997)
    typography = _index(options.get("typographyPreset"), TYPOGRAPHY, seed // 7919)
    if all(str(options.get(key, "auto")) in ("", "auto", "내용에 맞게 자동 선택") for key in ("designConcept", "designStyle", "layoutPreset", "colorPalette", "typographyPreset")):
        used = {(x.get("design"), x.get("layout"), x.get("palette"), x.get("typography")) for x in avoid if isinstance(x, dict)}
        for shift in range(30):
            candidate = ((design + shift) % 30, (layout + shift * 7) % 30, (palette + shift * 11) % 30, (typography + shift * 13) % 30)
            if candidate not in used:
                design, layout, palette, typography = candidate
                break
    return design, layout, palette, typography


def _layout_css(layout, design):
    hero = layout // 5
    content = layout % 5
    radius = ["0", "4px", "18px", "34px", "999px", "12px"][design % 6]
    border = ["1px", "3px", "1px", "1px", "2px", "1px"][design % 6]
    shadow = ["none", "8px 8px 0 var(--ink)", "0 18px 55px rgba(0,0,0,.12)", "0 24px 80px rgba(0,0,0,.16)", "none", "0 10px 30px rgba(0,0,0,.09)"][design % 6]
    motif = design // 6
    motif_css = [
        ".hero:after{background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:48px 48px}",
        ".hero:after{background-image:radial-gradient(rgba(255,255,255,.18) 1.2px,transparent 1.2px);background-size:18px 18px}",
        ".hero:after{background:repeating-linear-gradient(125deg,transparent 0 22px,rgba(255,255,255,.045) 22px 24px)}",
        ".hero:after{background:radial-gradient(circle at 70% 20%,var(--accent),transparent 32%),radial-gradient(circle at 10% 90%,var(--secondary),transparent 28%);opacity:.55}",
        ".hero:after{border:clamp(28px,8vw,110px) solid rgba(255,255,255,.055);inset:7%}",
    ][motif]
    hero_css = [
        "",
        ".hero-grid{display:block;text-align:center;max-width:920px}.hero-aside{border:0;border-top:1px solid rgba(255,255,255,.3);padding:20px 0 0;display:flex;justify-content:center;gap:20px}.lead{margin-inline:auto}",
        ".hero-grid{grid-template-columns:140px 1fr}.hero-grid>div{grid-column:2}.hero-aside{grid-column:1;grid-row:1;writing-mode:vertical-rl;border:0;border-right:1px solid rgba(255,255,255,.3);padding:0 20px 0 0}",
        ".hero{min-height:92svh}.hero-grid{display:block}.hero h1{font-size:clamp(4rem,13vw,10rem);max-width:1100px}.hero-aside{position:absolute;right:0;bottom:0;max-width:260px}",
        ".hero{padding-left:clamp(20px,12vw,180px)}nav{width:clamp(120px,10vw,170px);height:100%;border-right:1px solid rgba(255,255,255,.24)}nav .shell{width:auto;height:100%;padding:28px;flex-direction:column;align-items:flex-start}.hero-grid{grid-template-columns:1fr}.hero-aside{display:flex;gap:20px;border-left:0;padding-left:0}",
        ".hero{margin:18px;border-radius:var(--radius);min-height:calc(82svh - 36px)}nav{padding-inline:30px}.hero-grid{padding:clamp(18px,4vw,50px);border:1px solid rgba(255,255,255,.25);border-radius:var(--radius)}",
    ][hero]
    content_css = [
        "",
        "main{padding:30px}.page-section{margin:30px auto;border:var(--border) solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);max-width:1160px}.dark{border:0}.statement{border:0}",
        ".page-section:nth-child(even) .split{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}.page-section:nth-child(even) .split>*:first-child{order:2}",
        ".page-section .shell{border-left:3px solid var(--accent);padding-left:clamp(24px,5vw,70px)}.section-no{position:sticky;top:20px}",
        "main{display:grid;grid-template-columns:repeat(12,1fr);gap:22px;padding:22px;max-width:1400px;margin:auto}.page-section{grid-column:span 6;border:var(--border) solid var(--line);border-radius:var(--radius);overflow:hidden}.page-section:nth-child(3n+1){grid-column:span 12}.page-section .shell{width:auto;padding-inline:clamp(22px,4vw,55px)}.split{grid-template-columns:1fr}",
    ][content]
    return f":root{{--radius:{radius};--border:{border};--shadow:{shadow}}}{motif_css}{hero_css}{content_css}"


def _concept_css(design):
    """Give all 30 concepts a real visual family and a three-level variant."""
    family, variant = design // 3, design % 3
    families = [
        ".page-section:nth-child(even){background:linear-gradient(90deg,transparent,var(--soft),transparent)}h2{max-width:13ch}.section-no{border-bottom:2px solid currentColor}",
        "body{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:34px 34px}.page-section{border:3px solid var(--ink);box-shadow:10px 10px 0 var(--accent)}.tag{border:2px solid var(--ink)}",
        ".shell{max-width:1040px}.page-section{border-bottom:1px solid var(--line)}h2{text-transform:uppercase;letter-spacing:-.025em}.section-no{font-family:monospace}",
        ".page-section .shell{background:color-mix(in srgb,var(--paper) 88%,transparent);border-radius:28px;padding:clamp(24px,5vw,60px)}.page-section:nth-child(odd) .shell{box-shadow:0 24px 80px rgba(0,0,0,.08)}",
        ".hero{background:linear-gradient(135deg,var(--ink),color-mix(in srgb,var(--ink) 72%,var(--secondary)))}.section-no,.step:before{font-family:monospace}.page-section{border-top:1px dashed var(--secondary)}",
        ".page-section:nth-child(odd){background:var(--soft)}.copy{font-family:var(--heading)}.statement{border-radius:55% 0 0 0}.tag{background:color-mix(in srgb,var(--accent) 22%,white)}",
        ".hero h1{font-weight:500}.page-section{border-top:1px solid var(--line)}h2{font-weight:500}.section-no{letter-spacing:.3em}.statement p{font-family:var(--heading);font-weight:500}",
        ".hero:before{border-radius:0;transform:rotate(18deg)}h1{text-shadow:5px 5px 0 color-mix(in srgb,var(--accent) 55%,transparent)}.page-section:nth-child(3n){background:var(--soft)}",
        ".page-section{border-left:clamp(10px,3vw,36px) solid var(--soft)}.page-section.dark{border-left-color:var(--accent)}.step{grid-template-columns:140px 1fr}.statement p:before{content:'“';font-size:2em;color:var(--accent)}",
        ".hero{clip-path:polygon(0 0,100% 0,100% 92%,62% 100%,0 94%)}.page-section:nth-child(even) .shell{transform:translateX(clamp(0px,2vw,24px))}.tag{box-shadow:4px 4px 0 var(--secondary)}",
    ][family]
    variants = [
        ".eyebrow{writing-mode:horizontal-tb}.page-section:nth-child(3n+2) h2{font-style:italic}",
        ".page-section:nth-child(even) .split>*:first-child{order:2}.hero-aside{background:rgba(255,255,255,.08);padding:24px}",
        ".page-section:nth-child(3n+1){text-align:center}.page-section:nth-child(3n+1) .split{display:block}.page-section:nth-child(3n+1) .copy{max-width:820px;margin:auto}",
    ][variant]
    return families + variants


def render_website(source, mode, options, page_id, reference_brief="", avoid=None):
    data = _fields(source)
    career_assessment = _get(data, "진로검사 결과지 - AI 설계 참고용, 공개 금지") if mode == "career" else ""
    if career_assessment:
        reference_brief = f"{reference_brief}\n진로검사 분석 참고: {career_assessment[:2000]}"
    design, layout, palette_index, type_index = _system(options, page_id, mode, reference_brief, avoid)
    palette = PALETTES[palette_index]
    typography = TYPOGRAPHY[type_index]
    _, ink, accent, soft, secondary, paper = palette
    _, heading_font, body_font, font_query = typography
    density = options.get("contentDensity", "balanced")
    space = "clamp(4.5rem,9vw,8rem)" if density == "spacious" else "clamp(3.5rem,7vw,6rem)"
    css = f"""
    @import url('https://fonts.googleapis.com/css2?family={font_query}&display=swap');
    :root{{--ink:{ink};--accent:{accent};--soft:{soft};--secondary:{secondary};--paper:{paper};--line:color-mix(in srgb,var(--ink) 18%,transparent);--space:{space};--heading:'{heading_font}',sans-serif;--body:'{body_font}',sans-serif}}
    *{{box-sizing:border-box}}html{{scroll-behavior:smooth}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);line-height:1.65;overflow-x:hidden}}a{{color:inherit}}.shell{{width:min(1160px,calc(100% - 40px));margin:auto}}nav{{position:absolute;z-index:5;top:0;left:0;width:100%;padding:24px 0;color:white}}nav .shell{{display:flex;align-items:center;justify-content:space-between}}.brand{{font-weight:900;letter-spacing:-.04em}}.nav-tag{{font-size:.75rem;border:1px solid rgba(255,255,255,.45);border-radius:999px;padding:6px 12px}}.hero{{position:relative;min-height:78svh;background:var(--ink);color:white;display:grid;align-items:end;overflow:hidden;padding:130px 0 72px}}.hero:before{{content:'';position:absolute;width:560px;height:560px;border-radius:50%;right:-120px;top:-190px;background:radial-gradient(circle at 35% 35%,var(--accent),transparent 67%);opacity:.92}}.hero:after{{content:'';position:absolute;inset:0;pointer-events:none}}.hero-grid{{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(240px,.55fr);gap:clamp(2rem,5vw,5rem);align-items:end}}.eyebrow{{display:inline-flex;align-items:center;gap:8px;text-transform:uppercase;letter-spacing:.13em;font-weight:850;font-size:.76rem;color:var(--accent)}}.eyebrow:before{{content:'';width:28px;height:2px;background:currentColor}}h1,h2{{font-family:var(--heading)}}h1{{font-size:clamp(3.2rem,8vw,6.4rem);letter-spacing:-.065em;line-height:.94;margin:24px 0;word-break:keep-all}}.lead{{font-size:clamp(1.05rem,2vw,1.4rem);max-width:760px;color:rgba(255,255,255,.84);word-break:keep-all}}.hero-aside{{border-left:1px solid rgba(255,255,255,.28);padding-left:24px}}.hero-aside p{{margin:.45rem 0;color:rgba(255,255,255,.72)}}.hero-aside strong{{color:white}}.page-section{{padding:var(--space) 0;position:relative}}.section-no{{font-size:.74rem;font-weight:900;letter-spacing:.14em;color:var(--secondary)}}h2{{font-size:clamp(2.1rem,5vw,4.4rem);line-height:1.04;letter-spacing:-.05em;margin:.7rem 0 2rem;word-break:keep-all}}.split{{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(2rem,7vw,7rem)}}.copy{{font-size:clamp(1rem,1.7vw,1.25rem);word-break:keep-all;white-space:pre-line}}.dark{{background:var(--ink);color:white}}.dark .copy{{color:rgba(255,255,255,.78)}}.steps{{counter-reset:step;border-top:1px solid var(--line)}}.step{{counter-increment:step;display:grid;grid-template-columns:90px 1fr;gap:1rem;padding:24px 0;border-bottom:1px solid var(--line);font-size:clamp(1rem,2vw,1.25rem)}}.step:before{{content:'0' counter(step);font-weight:900;color:var(--secondary)}}.statement{{background:var(--soft);overflow:hidden}}.statement:after{{content:'';position:absolute;width:360px;height:360px;border:74px solid var(--accent);border-radius:50%;right:-160px;bottom:-220px;opacity:.35}}.statement p{{font-size:clamp(1.45rem,3.4vw,3rem);line-height:1.2;font-weight:830;letter-spacing:-.04em;max-width:940px;position:relative;z-index:1}}.tags{{display:flex;gap:9px;flex-wrap:wrap}}.tag{{padding:8px 13px;border-radius:999px;background:var(--soft);font-size:.82rem;font-weight:760}}footer{{padding:34px 0;background:#101820;color:rgba(255,255,255,.68);font-size:.82rem}}.reveal{{opacity:0;transform:translateY(22px);transition:.7s ease}}.reveal.on{{opacity:1;transform:none}}{_layout_css(layout, design)}
    {_concept_css(design)}
    @media(max-width:760px){{.shell{{width:min(100% - 28px,1160px)}}.hero{{min-height:70svh;padding:110px 0 50px;margin:0;border-radius:0;clip-path:none}}nav{{position:absolute;width:100%;height:auto;border:0;padding:20px 0}}nav .shell{{width:min(100% - 28px,1160px);height:auto;padding:0;flex-direction:row}}.hero-grid,.split{{display:grid;grid-template-columns:1fr;text-align:left;padding:0}}.hero-grid>div{{grid-column:auto}}.hero-aside{{position:static;writing-mode:horizontal-tb;border:0;border-top:1px solid rgba(255,255,255,.25);padding:18px 0 0;display:block}}h1{{font-size:clamp(2.8rem,15vw,5rem);overflow-wrap:anywhere;text-shadow:none}}main{{display:block;padding:0}}.page-section{{display:block;margin:0;border-left:0;border-right:0;border-radius:0;box-shadow:none;text-align:left;transform:none}}.page-section .shell{{width:min(100% - 28px,1160px);padding-inline:0;border-left:0;transform:none}}.page-section:nth-child(even) .split>*:first-child{{order:0}}.step{{grid-template-columns:54px 1fr}}}}@media(prefers-reduced-motion:reduce){{*{{scroll-behavior:auto!important}}.reveal{{opacity:1;transform:none;transition:none}}}}
    """
    if mode == "career":
        name = _get(data, "이름", default="포트폴리오")
        career_basis = _get(data, "진로 설계 기준", default="직접 입력한 희망 진로 기반")
        career_field = _get(data, "희망 산업·진로 분야", "희망 산업·기업 유형")
        role = _get(data, "희망 직무", default=career_field or "희망 진로")
        intro = _get(data, "한 줄 소개", default="경험과 역량을 사실에 근거해 구성한 포트폴리오입니다.")
        skills = _items(_get(data, "핵심 역량·기술", "핵심 역량", "기술"))
        projects = _get(data, "프로젝트", default="프로젝트 정보를 입력해 주세요.")
        strengths = _get(data, "강점·업무 방식", "강점")
        experience = _get(data, "경험·경력·대외활동", "경험")
        education = _get(data, "교육·자격·수상", "교육")
        title = f"{name} · {role} 포트폴리오"
        body = f"""
        <nav><div class="shell"><div class="brand">{_e(name)}</div><div class="nav-tag">CAREER PORTFOLIO</div></div></nav>
        <header class="hero"><div class="shell hero-grid"><div><div class="eyebrow">{_e(role)}</div><h1>{_e(name)}</h1><p class="lead">{_e(intro)}</p></div><aside class="hero-aside"><p>희망 직무·진로</p><strong>{_e(role)}</strong><p>{_e(career_field)}</p><p>{_e(_get(data,'전공·학과'))}</p></aside></div></header>
        <main><section class="page-section"><div class="shell split reveal"><div><span class="section-no">01 / CAPABILITY</span><h2>일하는 힘</h2></div><div><div class="tags">{''.join(f'<span class="tag">{_e(x)}</span>' for x in skills)}</div><p class="copy">{_e(strengths)}</p></div></div></section>
        <section class="page-section dark"><div class="shell reveal"><span class="section-no">02 / SELECTED PROJECT</span><h2>프로젝트</h2><p class="copy">{_e(projects)}</p></div></section>
        <section class="page-section"><div class="shell split reveal"><div><span class="section-no">03 / EXPERIENCE</span><h2>경험의 맥락</h2></div><div class="steps">{''.join(f'<div class="step">{_e(x)}</div>' for x in _items(experience,6)) or '<div class="step">경험 정보를 입력해 주세요.</div>'}</div></div></section>
        <section class="page-section statement"><div class="shell reveal"><span class="section-no">04 / GROWTH</span><p>{_e(education or intro)}</p></div></section></main>
        <footer><div class="shell">배재대학교 학생 포트폴리오 · 입력된 사실을 바탕으로 제작되었습니다.</div></footer>"""
    else:
        project = _get(data, "프로젝트·서비스명", "프로젝트명", "서비스명", default="창업 프로젝트")
        team = _get(data, "팀명·동아리명", "팀명", "동아리명")
        intro = _get(data, "핵심 한 줄 소개", "한 줄 소개", default="아이디어를 실행으로 연결합니다.")
        problem = _get(data, "문제 정의")
        solution = _get(data, "해결 방법", "해결 방식")
        activities = _items(_get(data, "주요 활동"))
        achievement = _get(data, "성과·검증 결과", "성과")
        learning = _get(data, "배운 점·향후 계획", "향후 계획")
        title = project
        body = f"""
        <nav><div class="shell"><div class="brand">{_e(project)}</div><div class="nav-tag">STARTUP PROJECT</div></div></nav>
        <header class="hero"><div class="shell hero-grid"><div><div class="eyebrow">{_e(_get(data,'분야·업종',default='STUDENT STARTUP'))}</div><h1>{_e(project)}</h1><p class="lead">{_e(intro)}</p></div><aside class="hero-aside"><p>Team</p><strong>{_e(team or '창업동아리')}</strong><p>아이디어에서 검증까지</p></aside></div></header>
        <main><section class="page-section"><div class="shell split reveal"><div><span class="section-no">01 / PROBLEM</span><h2>우리가 발견한 문제</h2></div><p class="copy">{_e(problem)}</p></div></section>
        <section class="page-section dark"><div class="shell split reveal"><div><span class="section-no">02 / SOLUTION</span><h2>해결 방식</h2></div><p class="copy">{_e(solution)}</p></div></section>
        <section class="page-section"><div class="shell reveal"><span class="section-no">03 / PROCESS</span><h2>실행의 순서</h2><div class="steps">{''.join(f'<div class="step">{_e(x)}</div>' for x in activities) or '<div class="step">활동 정보를 준비하고 있습니다.</div>'}</div></div></section>
        <section class="page-section statement"><div class="shell reveal"><span class="section-no">04 / VALIDATION</span><p>{_e(achievement or '검증 가능한 결과를 차근차근 만들어갑니다.')}</p></div></section>
        <section class="page-section"><div class="shell split reveal"><div><span class="section-no">05 / NEXT</span><h2>다음 실험</h2></div><p class="copy">{_e(learning)}</p></div></section></main>
        <footer><div class="shell">본 프로젝트는 배재대학교 창업지원단의 지원을 받았습니다.</div></footer>"""
    metadata = {
        "design": design, "designName": DESIGN_CONCEPTS[design],
        "layout": layout, "layoutName": LAYOUTS[layout],
        "palette": palette_index, "paletteName": PALETTES[palette_index][0],
        "typography": type_index, "typographyName": TYPOGRAPHY[type_index][0],
        "careerAssessmentUsed": bool(career_assessment),
        "careerBasis": _get(data, "진로 설계 기준") if mode == "career" else "not_applicable",
    }
    meta_text = _e(" · ".join((metadata["designName"], metadata["layoutName"], metadata["paletteName"], metadata["typographyName"])))
    document = f"""<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="PCU Design Engine v2"><meta name="design-system" content="{meta_text}"><title>{_e(title)}</title><style>{css}</style></head><body data-design="{design + 1}" data-layout="{layout + 1}" data-palette="{palette_index + 1}" data-typography="{type_index + 1}">{body}<script>const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('on')),{{threshold:.12}});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));</script></body></html>"""
    return document, title, metadata
