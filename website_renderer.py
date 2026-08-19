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


def _legacy_layout_css(layout, design):
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
        ".hero{min-height:min(76svh,760px)}.hero-grid{display:block}.hero h1{font-size:clamp(3.8rem,10vw,7.6rem);max-width:1100px}.hero-aside{position:absolute;right:0;bottom:0;max-width:280px}",
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


def _legacy_concept_css(design):
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


def _sentences(value, limit=8):
    parts = re.split(r"(?:\s+/\s+)|(?<=[.!?。])\s+|[\n;•]+", str(value or ""))
    return [part.strip(" -\t") for part in parts if part.strip(" -\t")][:limit]


def _is_auto(value):
    return str(value or "").strip() in ("", "auto", "내용에 맞게 자동 선택")


def _hex_luminance(value):
    value = str(value or "").lstrip("#")
    if len(value) == 3:
        value = "".join(char * 2 for char in value)
    if len(value) != 6:
        return 0.0
    channels = [int(value[index:index + 2], 16) / 255 for index in (0, 2, 4)]
    channels = [channel / 12.92 if channel <= .04045 else ((channel + .055) / 1.055) ** 2.4 for channel in channels]
    return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2]


def _contrast(first, second):
    high, low = sorted((_hex_luminance(first), _hex_luminance(second)), reverse=True)
    return (high + .05) / (low + .05)


def _infer_archetype(data, mode, options, reference_brief, seed):
    plan = options.get("_designPlan") if isinstance(options.get("_designPlan"), dict) else {}
    explicit = str(plan.get("archetype", "")).strip().lower()
    aliases = {
        "technology": "technology", "tech": "technology", "테크": "technology",
        "editorial": "editorial", "에디토리얼": "editorial",
        "human": "human", "humanist": "human", "휴먼": "human",
        "premium": "premium", "luxury": "premium", "프리미엄": "premium",
        "playful": "playful", "플레이풀": "playful",
        "utility": "utility", "industrial": "utility", "유틸리티": "utility",
    }
    if explicit in aliases:
        return aliases[explicit], plan
    corpus = " ".join((" ".join(data.values()), reference_brief, str(plan))).lower()
    rules = [
        ("technology", ("ai", "인공지능", "데이터", "플랫폼", "앱", "소프트웨어", "개발", "tech", "digital")),
        ("premium", ("프리미엄", "럭셔리", "패션", "뷰티", "브랜드", "공예", "architecture")),
        ("playful", ("아동", "게임", "캐릭터", "놀이", "축제", "캠퍼스", "콘텐츠")),
        ("human", ("복지", "상담", "교육", "지역", "환경", "건강", "커뮤니티", "사람")),
        ("utility", ("제조", "물류", "하드웨어", "공정", "엔지니어", "운영", "b2b")),
    ]
    for archetype, keywords in rules:
        if any(keyword in corpus for keyword in keywords):
            return archetype, plan
    return ("editorial" if mode == "career" else ("technology", "human", "editorial")[seed % 3]), plan


ARCHETYPE_SYSTEMS = {
    "technology": {"palettes": (0, 5, 8, 18, 20, 25), "types": (3, 9, 20, 24), "label": "정밀한 기술 제품 쇼케이스", "motif": "SYSTEM / SIGNAL / PROOF"},
    "editorial": {"palettes": (2, 9, 13, 19, 24, 29), "types": (1, 6, 14, 21, 22), "label": "에디토리얼 사례집", "motif": "CONTEXT / WORK / POINT OF VIEW"},
    "human": {"palettes": (3, 10, 16, 17, 23, 26), "types": (4, 6, 7, 17), "label": "따뜻한 사람 중심 스토리", "motif": "PEOPLE / CHANGE / CARE"},
    "premium": {"palettes": (4, 13, 15, 19, 27), "types": (1, 6, 14, 22), "label": "절제된 프리미엄 브랜드", "motif": "CRAFT / DETAIL / VALUE"},
    "playful": {"palettes": (1, 6, 11, 12, 14, 28), "types": (4, 7, 11, 17, 29), "label": "활기 있는 컬처 포스터", "motif": "IDEA / ENERGY / TOGETHER"},
    "utility": {"palettes": (3, 12, 18, 21, 22, 29), "types": (3, 9, 19, 20), "label": "산업적 정보 시스템", "motif": "INPUT / PROCESS / OUTPUT"},
}


def _curated_system(data, mode, options, page_id, reference_brief, avoid):
    seed = int(hashlib.sha256(f"{page_id}|{mode}|{reference_brief}".encode()).hexdigest()[:12], 16)
    archetype, planner = _infer_archetype(data, mode, options, reference_brief, seed)
    allowed = ARCHETYPE_SYSTEMS[archetype]
    design = _index(options.get("designConcept", options.get("designStyle")), DESIGN_CONCEPTS, seed)
    layout = _index(options.get("layoutPreset"), LAYOUTS, seed // 31)
    palette = _index(options.get("colorPalette"), PALETTES, allowed["palettes"][seed % len(allowed["palettes"])])
    typography = _index(options.get("typographyPreset"), TYPOGRAPHY, allowed["types"][(seed // 7) % len(allowed["types"])])
    if _is_auto(options.get("colorPalette")):
        palette = allowed["palettes"][seed % len(allowed["palettes"])]
    if _is_auto(options.get("typographyPreset")):
        typography = allowed["types"][(seed // 7) % len(allowed["types"])]
    if _is_auto(options.get("layoutPreset")):
        layout = (seed // 13) % len(LAYOUTS)
    used = {(item.get("design"), item.get("layout"), item.get("palette"), item.get("typography")) for item in (avoid or []) if isinstance(item, dict)}
    if _is_auto(options.get("designConcept", options.get("designStyle"))):
        for shift in range(30):
            candidate = ((design + shift * 7) % 30, (layout + shift * 11) % 30, allowed["palettes"][(seed + shift) % len(allowed["palettes"])], allowed["types"][(seed // 7 + shift) % len(allowed["types"])])
            if candidate not in used:
                design, layout, palette, typography = candidate
                break
    return design, layout, palette, typography, archetype, planner


def _visual_words(data, mode):
    if mode == "career":
        values = (_get(data, "희망 직무"), _get(data, "희망 산업·진로 분야"), _get(data, "핵심 역량·기술"))
    else:
        values = (_get(data, "분야·업종"), _get(data, "프로젝트·서비스명"), _get(data, "핵심 한 줄 소개"))
    words = []
    for value in values:
        for word in re.findall(r"[가-힣A-Za-z0-9+#]{2,}", str(value or "")):
            if word not in words:
                words.append(word)
    return words[:6]


def _image_figure(filename, alt, css_class="editorial-image", source=""):
    image_source = source or filename
    return f'<figure class="{css_class}"><img src="{_e(image_source)}" alt="{_e(alt)}" onerror="this.closest(\'figure\').classList.add(\'image-missing\');this.remove()"><span>이미지를 같은 폴더에 추가하면 이 영역에 표시됩니다.</span></figure>'


def _quality_audit(document, mode, palette, data):
    _, ink, accent, soft, secondary, paper = palette
    checks = {
        "responsiveCss": "@media(max-width:760px)" in document,
        "viewport": 'name="viewport"' in document,
        "semanticMain": "<main" in document and "<section" in document,
        "safeContrast": _contrast(ink, paper) >= 7 and max(_contrast(ink, accent), _contrast(paper, accent)) >= 3,
        "noRawAssessment": "진로검사 결과지 - AI 설계 참고용" not in document,
        "noRawSource": "[추가 원문]" not in document,
        "contentPresent": len(re.sub(r"<[^>]+>", "", document)) >= 400,
        "singleDocument": document.count("<!DOCTYPE html>") == 1,
    }
    required = ("01 / CONTEXT", "02 / SOLUTION", "03 / PROCESS") if mode == "startup" else ("01 / POSITION", "02 / SELECTED WORK", "03 / EXPERIENCE")
    checks["requiredNarrative"] = all(term in document for term in required)
    score = round(sum(checks.values()) / len(checks) * 100)
    return {"score": score, "passed": score >= 88, "checks": checks}


def render_website(source, mode, options, page_id, reference_brief="", avoid=None):
    data = _fields(source)
    career_assessment = _get(data, "진로검사 결과지 - AI 설계 참고용, 공개 금지") if mode == "career" else ""
    design, layout, palette_index, type_index, archetype, planner = _curated_system(data, mode, options, page_id, reference_brief, avoid)
    palette, typography = PALETTES[palette_index], TYPOGRAPHY[type_index]
    _, ink, accent, soft, secondary, paper = palette
    _, heading_font, body_font, font_query = typography
    density = str(options.get("contentDensity", "balanced"))
    hero_style = str(options.get("heroLayout", "auto"))
    if hero_style == "auto":
        hero_style = ("split", "centered", "editorial", "poster")[(layout // 5) % 4]
    section_style = str(options.get("sectionLayout", "auto"))
    if section_style == "auto":
        section_style = ("story", "alternating", "timeline", "showcase")[layout % 4]
    visual_words = _visual_words(data, mode)
    image_count = max(0, min(3, int(options.get("bannerCount", 0) or 0)))
    include_section_image = bool(options.get("sectionImages"))
    include_logo = bool(options.get("logoImage"))
    site_images = [str(item) for item in options.get("_siteImages", [])[:3] if str(item).startswith("data:image/")] if isinstance(options.get("_siteImages"), list) else []
    art = ARCHETYPE_SYSTEMS[archetype]
    space = {"compact": "clamp(64px,7vw,96px)", "spacious": "clamp(112px,11vw,168px)"}.get(density, "clamp(88px,9vw,136px)")
    radius = {"technology": "10px", "editorial": "0", "human": "28px", "premium": "2px", "playful": "24px", "utility": "4px"}[archetype]
    css = f"""
    @import url('https://fonts.googleapis.com/css2?family={font_query}&display=swap');
    :root{{--ink:{ink};--accent:{accent};--soft:{soft};--secondary:{secondary};--paper:{paper};--line:color-mix(in srgb,var(--ink) 16%,transparent);--space:{space};--radius:{radius};--heading:'{heading_font}',serif;--body:'{body_font}',sans-serif}}
    *{{box-sizing:border-box}}html{{scroll-behavior:smooth}}body{{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.72 var(--body);overflow-x:hidden;text-rendering:optimizeLegibility}}a{{color:inherit}}img{{max-width:100%}}.shell{{width:min(1184px,calc(100% - 48px));margin:auto}}.site-nav{{position:absolute;inset:0 0 auto;z-index:10;color:#fff;padding:24px 0}}.site-nav .shell{{display:flex;align-items:center;justify-content:space-between;gap:24px}}.brand{{display:flex;align-items:center;gap:12px;font-weight:850;letter-spacing:-.03em}}.brand img{{width:36px;height:36px;object-fit:contain}}.nav-index{{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7)}}
    .hero{{position:relative;min-height:clamp(620px,82svh,880px);display:grid;align-items:center;padding:128px 0 88px;background:var(--ink);color:#fff;overflow:hidden;isolation:isolate}}.hero:before{{content:'';position:absolute;inset:0;background:linear-gradient(115deg,color-mix(in srgb,var(--ink) 92%,transparent),color-mix(in srgb,var(--secondary) 68%,transparent));z-index:-3}}.hero:after{{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to right,#000,transparent 80%);z-index:-2}}.hero-grid{{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.65fr);align-items:center;gap:clamp(48px,8vw,112px)}}.hero-copy{{position:relative;z-index:2}}.eyebrow{{display:flex;align-items:center;gap:12px;color:var(--accent);font-size:12px;font-weight:850;letter-spacing:.16em;text-transform:uppercase}}.eyebrow:before{{content:'';width:36px;height:2px;background:currentColor}}h1,h2,h3{{font-family:var(--heading);text-wrap:balance}}h1{{max-width:10ch;margin:24px 0 28px;font-size:clamp(64px,9vw,132px);line-height:.88;letter-spacing:-.065em}}.lead{{max-width:720px;margin:0;font-size:clamp(18px,2vw,25px);line-height:1.55;color:rgba(255,255,255,.78);word-break:keep-all}}.hero-meta{{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}}.hero-meta span{{padding:8px 12px;border:1px solid rgba(255,255,255,.2);border-radius:999px;font-size:12px;color:rgba(255,255,255,.72)}}
    .visual-stage{{position:relative;min-height:420px;display:grid;place-items:center}}.visual-orbit{{position:absolute;width:min(31vw,380px);aspect-ratio:1;border:1px solid rgba(255,255,255,.22);border-radius:50%;animation:orbit 24s linear infinite}}.visual-orbit:before,.visual-orbit:after{{content:'';position:absolute;border-radius:50%;background:var(--accent)}}.visual-orbit:before{{width:18px;height:18px;left:14%;top:10%}}.visual-orbit:after{{width:9px;height:9px;right:7%;bottom:24%}}.visual-card{{position:relative;width:min(100%,330px);padding:28px;background:color-mix(in srgb,var(--paper) 8%,transparent);border:1px solid rgba(255,255,255,.18);border-radius:var(--radius);backdrop-filter:blur(12px);transform:rotate(-3deg)}}.visual-card small{{display:block;margin-bottom:48px;color:var(--accent);font:800 11px/1 var(--body);letter-spacing:.16em}}.visual-card strong{{display:block;font-family:var(--heading);font-size:clamp(30px,4vw,52px);line-height:1.05}}.visual-words{{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}}.visual-words span{{font-size:11px;color:rgba(255,255,255,.66)}}@keyframes orbit{{to{{transform:rotate(360deg)}}}}
    .hero.centered{{text-align:center}}.hero.centered .hero-grid{{display:block}}.hero.centered .hero-copy{{max-width:980px;margin:auto}}.hero.centered h1,.hero.centered .lead{{margin-left:auto;margin-right:auto}}.hero.centered .eyebrow,.hero.centered .hero-meta{{justify-content:center}}.hero.centered .visual-stage{{min-height:160px;margin-top:40px}}.hero.centered .visual-card{{width:min(620px,100%);transform:none}}.hero.poster .hero-grid{{display:block}}.hero.poster h1{{max-width:12ch;font-size:clamp(76px,13vw,172px)}}.hero.poster .visual-stage{{position:absolute;right:5vw;bottom:2vw;opacity:.62}}.hero.editorial .hero-grid{{grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr)}}.hero.editorial .hero-copy{{grid-column:2}}.hero.editorial .visual-stage{{grid-column:1;grid-row:1}}.hero.editorial h1{{font-size:clamp(62px,8vw,112px)}}
    .page-section{{position:relative;padding:var(--space) 0}}.section-head{{display:grid;grid-template-columns:180px minmax(0,1fr);gap:32px;margin-bottom:clamp(48px,7vw,88px)}}.section-index{{font:850 11px/1.2 var(--body);letter-spacing:.16em;color:var(--secondary);text-transform:uppercase}}h2{{max-width:14ch;margin:0;font-size:clamp(44px,6.5vw,86px);line-height:.98;letter-spacing:-.055em}}h3{{margin:0 0 16px;font-size:clamp(24px,3vw,38px);line-height:1.1;letter-spacing:-.035em}}.section-intro{{max-width:720px;margin:20px 0 0;font-size:clamp(17px,1.8vw,21px);word-break:keep-all}}.dark{{background:var(--ink);color:#fff}}.dark .section-index{{color:var(--accent)}}.dark .section-intro,.dark .copy{{color:rgba(255,255,255,.72)}}
    .narrative-grid{{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(40px,8vw,112px);align-items:start}}.pull-quote{{position:sticky;top:32px;font-family:var(--heading);font-size:clamp(30px,4vw,52px);line-height:1.15;letter-spacing:-.04em}}.copy{{margin:0;font-size:clamp(17px,1.8vw,21px);white-space:pre-line;word-break:keep-all}}.evidence-grid{{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}}.evidence{{grid-column:span 6;min-height:176px;padding:28px;background:color-mix(in srgb,var(--paper) 6%,transparent);border-radius:var(--radius);display:flex;flex-direction:column;justify-content:space-between}}.evidence b{{font-family:var(--heading);font-size:clamp(22px,2.5vw,34px);line-height:1.2}}.evidence small{{color:var(--accent);font-size:11px;letter-spacing:.12em}}.feature-list{{counter-reset:feature}}.feature{{counter-increment:feature;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px;padding:28px 0;border-top:1px solid var(--line)}}.feature:before{{content:'0' counter(feature);font-weight:850;color:var(--secondary)}}.dark .feature{{border-color:rgba(255,255,255,.18)}}.dark .feature:before{{color:var(--accent)}}.feature strong{{font-size:clamp(18px,2vw,25px)}}
    .showcase{{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}}.case-card{{grid-column:span 6;min-height:280px;padding:32px;background:var(--soft);border-radius:var(--radius);display:flex;flex-direction:column;justify-content:space-between}}.case-card:nth-child(3n+1){{grid-column:span 8}}.case-card:nth-child(3n+2){{grid-column:span 4}}.case-card small{{font-size:11px;letter-spacing:.14em;color:var(--secondary)}}.case-card p{{margin:32px 0 0;font-size:clamp(18px,2vw,25px);line-height:1.48}}.tag-cloud{{display:flex;flex-wrap:wrap;gap:10px}}.tag{{padding:10px 14px;background:var(--soft);border-radius:999px;font-size:13px;font-weight:750}}.statement{{overflow:hidden;background:var(--accent);color:var(--ink)}}.statement .shell{{position:relative}}.statement p{{max-width:980px;margin:0;font-family:var(--heading);font-size:clamp(38px,6vw,78px);font-weight:750;line-height:1.08;letter-spacing:-.05em}}.statement .mark{{position:absolute;right:-40px;top:-100px;font:900 280px/.8 var(--heading);opacity:.12}}
    .editorial-image{{position:relative;min-height:420px;margin:0;overflow:hidden;background:linear-gradient(145deg,var(--soft),color-mix(in srgb,var(--accent) 28%,var(--paper)));border-radius:var(--radius)}}.editorial-image img{{width:100%;height:100%;min-height:420px;object-fit:cover}}.editorial-image span{{display:none;position:absolute;inset:0;padding:32px;align-items:flex-end;color:var(--secondary)}}.editorial-image.image-missing span{{display:flex}}.image-row{{display:grid;grid-template-columns:1.4fr .6fr;gap:16px;margin-top:64px}}.image-row .editorial-image:nth-child(2){{margin-top:80px}}footer{{padding:40px 0;background:#101820;color:rgba(255,255,255,.68);font-size:13px}}footer .shell{{display:flex;justify-content:space-between;gap:24px}}.reveal{{opacity:0;transform:translateY(20px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.8,.2,1)}}.reveal.on{{opacity:1;transform:none}}
    body.archetype-editorial .hero:after{{background-image:repeating-linear-gradient(105deg,transparent 0 31px,rgba(255,255,255,.045) 31px 32px)}}body.archetype-editorial .visual-card{{transform:rotate(2deg);background:var(--paper);color:var(--ink)}}body.archetype-editorial .visual-words span{{color:var(--secondary)}}body.archetype-human .hero:before{{background:radial-gradient(circle at 82% 20%,var(--secondary),transparent 42%),var(--ink)}}body.archetype-human .visual-card{{border-radius:42% 58% 46% 54%/44% 35% 65% 56%;padding:48px}}body.archetype-premium .hero:after{{background:none;border:1px solid rgba(255,255,255,.12);inset:40px}}body.archetype-premium .eyebrow{{color:var(--accent)}}body.archetype-playful .visual-card{{transform:rotate(5deg);box-shadow:14px 14px 0 var(--accent)}}body.archetype-playful h1{{letter-spacing:-.04em}}body.archetype-utility .hero:after{{background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:32px 32px}}body.archetype-utility .case-card{{border-radius:0}}
    body.sections-alternating .page-section:nth-child(even) .narrative-grid>*:first-child{{order:2}}body.sections-showcase .page-section:not(.dark):not(.statement){{margin:20px;border-radius:var(--radius);background:color-mix(in srgb,var(--soft) 40%,var(--paper))}}body.density-compact .case-card{{min-height:220px}}body.density-spacious .copy{{max-width:760px}}
    @media(max-width:760px){{.shell{{width:min(100% - 28px,1184px)}}.site-nav{{padding:18px 0}}.nav-index{{display:none}}.hero,.hero.editorial,.hero.poster{{min-height:auto;padding:104px 0 56px}}.hero-grid,.hero.editorial .hero-grid{{display:grid;grid-template-columns:1fr;gap:36px}}.hero.editorial .hero-copy,.hero.editorial .visual-stage{{grid-column:auto;grid-row:auto}}.hero.poster .visual-stage{{position:relative;right:auto;bottom:auto;opacity:1}}.hero h1,.hero.poster h1,.hero.editorial h1{{font-size:clamp(54px,17vw,82px);overflow-wrap:anywhere}}.hero.centered{{text-align:left}}.hero.centered .eyebrow,.hero.centered .hero-meta{{justify-content:flex-start}}.visual-stage{{min-height:280px}}.visual-orbit{{width:270px}}.visual-card{{width:min(88%,320px)}}.section-head{{grid-template-columns:1fr;gap:16px;margin-bottom:44px}}h2{{font-size:clamp(40px,13vw,62px)}}.narrative-grid{{grid-template-columns:1fr;gap:36px}}.pull-quote{{position:static}}.evidence,.case-card,.case-card:nth-child(n){{grid-column:span 12;min-height:auto}}.feature{{grid-template-columns:48px 1fr;padding:22px 0}}.image-row{{grid-template-columns:1fr}}.image-row .editorial-image:nth-child(2){{margin-top:0}}.editorial-image,.editorial-image img{{min-height:300px}}footer .shell{{display:block}}footer .shell span{{display:block;margin-top:8px}}}}@media(prefers-reduced-motion:reduce){{*{{scroll-behavior:auto!important}}.visual-orbit{{animation:none}}.reveal{{opacity:1;transform:none;transition:none}}}}
    """
    logo = _image_figure("Img_files_logo_01.png", "로고", "brand-logo") if include_logo else ""
    brand_logo = '<img src="Img_files_logo_01.png" alt="로고" onerror="this.remove()">' if include_logo else ""
    word_markup = "".join(f"<span>{_e(word)}</span>" for word in visual_words)
    visual = f'<div class="visual-stage" aria-hidden="true"><div class="visual-orbit"></div><div class="visual-card"><small>{_e(art["motif"])}</small><strong>{_e(visual_words[0] if visual_words else art["label"])}</strong><div class="visual-words">{word_markup}</div></div></div>'
    if mode == "career":
        name = _get(data, "이름", default="포트폴리오")
        role = _get(data, "희망 직무", default=_get(data, "희망 산업·진로 분야", default="희망 진로"))
        field = _get(data, "희망 산업·진로 분야", "희망 산업·기업 유형")
        major = _get(data, "전공·학과")
        intro = _get(data, "한 줄 소개", default="경험과 역량을 사실에 근거해 구성한 포트폴리오입니다.")
        skills = _items(_get(data, "핵심 역량·기술", "핵심 역량", "기술"), 10)
        strengths = _get(data, "강점·업무 방식", "강점", default=intro)
        projects = _get(data, "프로젝트", default="프로젝트 정보를 준비하고 있습니다.")
        project_items = _sentences(projects.replace(" / ", "\n"), 8)
        experience = _sentences(_get(data, "경험·경력·대외활동", "경험"), 8)
        education = _get(data, "교육·자격·수상", "교육")
        contact = _get(data, "공개 연락 방법")
        title = f"{name} · {role} 포트폴리오"
        assessment_note = '<span>공식 검사 결과 참고</span>' if career_assessment else ""
        body = f"""<nav class="site-nav"><div class="shell"><div class="brand">{brand_logo}{_e(name)}</div><div class="nav-index">CAREER / SELECTED WORK</div></div></nav>
        <header class="hero {hero_style}"><div class="shell hero-grid"><div class="hero-copy"><div class="eyebrow">{_e(field or 'CAREER PORTFOLIO')}</div><h1>{_e(name)}</h1><p class="lead">{_e(intro)}</p><div class="hero-meta"><span>{_e(role)}</span>{f'<span>{_e(major)}</span>' if major else ''}{assessment_note}</div></div>{visual}</div></header>
        <main><section class="page-section"><div class="shell reveal"><div class="section-head"><span class="section-index">01 / POSITION</span><div><h2>어떤 방식으로<br>문제를 푸는가</h2><p class="section-intro">{_e(strengths)}</p></div></div><div class="showcase"><article class="case-card"><small>ROLE DIRECTION</small><div><h3>{_e(role)}</h3><p>{_e(field or '희망 분야를 구체화하고 있습니다.')}</p></div></article><article class="case-card"><small>CAPABILITY</small><div class="tag-cloud">{''.join(f'<span class="tag">{_e(item)}</span>' for item in skills) or '<span class="tag">역량 정리 중</span>'}</div></article></div></div></section>
        <section class="page-section dark"><div class="shell reveal"><div class="section-head"><span class="section-index">02 / SELECTED WORK</span><div><h2>말보다 결과로<br>보여주는 경험</h2><p class="section-intro">프로젝트에서 맡은 역할과 실제 수행 내용을 중심으로 정리했습니다.</p></div></div><div class="evidence-grid">{''.join(f'<article class="evidence"><small>EVIDENCE {index:02d}</small><b>{_e(item)}</b></article>' for index,item in enumerate(project_items,1))}</div></div></section>
        <section class="page-section"><div class="shell reveal"><div class="narrative-grid"><div><span class="section-index">03 / EXPERIENCE</span><p class="pull-quote">경험이 역량이<br>된 과정</p></div><div class="feature-list">{''.join(f'<div class="feature"><strong>{_e(item)}</strong></div>' for item in experience) or '<div class="feature"><strong>경험 정보를 준비하고 있습니다.</strong></div>'}</div></div>{_image_figure('Img_files_section_01.jpg','프로젝트 또는 활동 이미지',source=site_images[0] if site_images else '') if include_section_image or site_images else ''}</div></section>
        <section class="page-section statement"><div class="shell reveal"><span class="section-index">04 / NEXT</span><p>{_e(education or intro)}</p><b class="mark">↗</b></div></section>{f'<section class="page-section"><div class="shell"><div class="section-head"><span class="section-index">05 / CONTACT</span><div><h2>함께 이야기하기</h2><p class="section-intro">{_e(contact)}</p></div></div></div></section>' if contact and '공개하지' not in contact else ''}</main>"""
        default_footer = "배재대학교 학생 포트폴리오 · 입력된 사실을 바탕으로 제작되었습니다."
    else:
        project = _get(data, "프로젝트·서비스명", "프로젝트명", "서비스명", default="창업 프로젝트")
        team = _get(data, "팀명·동아리명", "팀명", "동아리명")
        industry = _get(data, "분야·업종", default="STUDENT STARTUP")
        intro = _get(data, "핵심 한 줄 소개", "한 줄 소개", default="아이디어를 실행으로 연결합니다.")
        problem = _get(data, "문제 정의", default="해결할 문제를 구체화하고 있습니다.")
        solution = _get(data, "해결 방법", "해결 방식", default="문제에 맞는 해결 방식을 검증하고 있습니다.")
        solution_items = _sentences(solution, 6)
        activities = _items(_get(data, "주요 활동"), 8)
        achievement = _get(data, "성과·검증 결과", "성과")
        learning = _get(data, "배운 점·향후 계획", "향후 계획")
        commercialized = str(options.get("commercialized", "unknown"))
        title = project
        body = f"""<nav class="site-nav"><div class="shell"><div class="brand">{brand_logo}{_e(project)}</div><div class="nav-index">STARTUP / {_e('PRODUCT' if commercialized == 'yes' else 'PROJECT')}</div></div></nav>
        <header class="hero {hero_style}"><div class="shell hero-grid"><div class="hero-copy"><div class="eyebrow">{_e(industry)}</div><h1>{_e(project)}</h1><p class="lead">{_e(intro)}</p><div class="hero-meta"><span>{_e(team or '창업동아리')}</span><span>{_e('사업화 진행' if commercialized == 'yes' else '아이디어 검증')}</span></div></div>{visual}</div></header>
        <main><section class="page-section"><div class="shell reveal"><div class="narrative-grid"><div><span class="section-index">01 / CONTEXT</span><p class="pull-quote">문제는 어디에서<br>시작됐는가</p></div><div><h2>우리가 발견한 문제</h2><p class="copy">{_e(problem)}</p></div></div>{_image_figure('Img_files_banner_01.jpg',project+' 대표 이미지',source=site_images[0] if site_images else '') if image_count or site_images else ''}</div></section>
        <section class="page-section dark"><div class="shell reveal"><div class="section-head"><span class="section-index">02 / SOLUTION</span><div><h2>문제를 바꾸는<br>우리의 방식</h2><p class="section-intro">{_e(solution)}</p></div></div><div class="evidence-grid">{''.join(f'<article class="evidence"><small>CORE {index:02d}</small><b>{_e(item)}</b></article>' for index,item in enumerate(solution_items,1))}</div></div></section>
        <section class="page-section"><div class="shell reveal"><div class="section-head"><span class="section-index">03 / PROCESS</span><div><h2>아이디어를<br>검증으로 옮기다</h2><p class="section-intro">말이 아닌 실행으로 가설을 확인하는 과정입니다.</p></div></div><div class="feature-list">{''.join(f'<div class="feature"><strong>{_e(item)}</strong></div>' for item in activities) or '<div class="feature"><strong>활동 계획을 준비하고 있습니다.</strong></div>'}</div>{f'<div class="image-row">{_image_figure("Img_files_section_01.jpg","활동 이미지 1",source=site_images[1] if len(site_images)>1 else "")}{_image_figure("Img_files_section_02.jpg","활동 이미지 2",source=site_images[2] if len(site_images)>2 else "")}</div>' if include_section_image or len(site_images)>1 else ''}</div></section>
        <section class="page-section statement"><div class="shell reveal"><span class="section-index">04 / PROOF</span><p>{_e(achievement or '작은 검증을 쌓아 더 분명한 답에 가까워집니다.')}</p><b class="mark">✦</b></div></section>
        <section class="page-section"><div class="shell reveal"><div class="narrative-grid"><div><span class="section-index">05 / NEXT</span><p class="pull-quote">다음 질문으로<br>나아갑니다</p></div><p class="copy">{_e(learning or '다음 실행 계획을 준비하고 있습니다.')}</p></div></div></section></main>"""
        default_footer = "본 프로젝트는 배재대학교 창업지원단의 지원을 받았습니다."
    if bool(options.get("includeFooter", True)):
        footer_text = str(options.get("footerText", "")).strip() or default_footer
        body += f'<footer><div class="shell">{_e(footer_text)}<span>© 2026 PCU Student Project</span></div></footer>'
    metadata = {"engineVersion": "3.0", "design": design, "designName": DESIGN_CONCEPTS[design], "layout": layout, "layoutName": LAYOUTS[layout], "palette": palette_index, "paletteName": palette[0], "typography": type_index, "typographyName": typography[0], "archetype": archetype, "artDirection": str(planner.get("artDirection") or art["label"])[:200], "heroStyle": hero_style, "sectionStyle": section_style, "careerAssessmentUsed": bool(career_assessment), "careerBasis": _get(data, "진로 설계 기준") if mode == "career" else "not_applicable"}
    meta_text = _e(" · ".join((metadata["artDirection"], metadata["paletteName"], metadata["typographyName"])))
    document = f'<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="PCU Design Engine v3"><meta name="design-system" content="{meta_text}"><title>{_e(title)}</title><style>{css}</style></head><body class="mode-{_e(mode)} archetype-{archetype} sections-{_e(section_style)} density-{_e(density)}">{body}<script>const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{{if(entry.isIntersecting){{entry.target.classList.add(\'on\');observer.unobserve(entry.target)}}}}),{{threshold:.12}});document.querySelectorAll(\'.reveal\').forEach(element=>observer.observe(element));</script></body></html>'
    metadata["qualityAudit"] = _quality_audit(document, mode, palette, data)
    return document, title, metadata
