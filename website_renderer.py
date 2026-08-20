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
    corpus = " ".join((" ".join(data.values()), reference_brief, str(plan))).lower()
    rules = {
        "technology": ("인공지능", "데이터", "플랫폼", "소프트웨어", "개발", "자동화", "saas", "tech"),
        "premium": ("프리미엄", "럭셔리", "패션", "뷰티", "브랜드", "공예", "architecture"),
        "playful": ("아동", "게임", "캐릭터", "놀이", "축제", "캠퍼스", "콘텐츠"),
        "human": ("복지", "상담", "교육", "지역", "환경", "건강", "커뮤니티", "사람", "순환", "공유", "사회문제"),
        "utility": ("제조", "물류", "하드웨어", "공정", "엔지니어", "운영", "b2b"),
    }
    scores = {name: sum(1 for keyword in keywords if keyword in corpus) for name, keywords in rules.items()}
    strongest = max(scores, key=scores.get)
    # 한 단어 또는 모델의 막연한 'technology' 판단으로 모든 창업 사이트가
    # 기술형이 되는 현상을 막는다. 콘텐츠 단서가 두 개 이상일 때만 강제한다.
    if scores[strongest] >= 2:
        return strongest, plan
    if explicit in aliases:
        return aliases[explicit], plan
    return ("editorial" if mode == "career" else ("technology", "human", "editorial")[seed % 3]), plan


ARCHETYPE_SYSTEMS = {
    "technology": {"palettes": (0, 5, 8, 18, 20, 25), "types": (3, 9, 20, 24), "label": "정밀한 기술 제품 쇼케이스", "motif": "SYSTEM / SIGNAL / PROOF"},
    "editorial": {"palettes": (2, 9, 13, 19, 24, 29), "types": (1, 6, 14, 21, 22), "label": "에디토리얼 사례집", "motif": "CONTEXT / WORK / POINT OF VIEW"},
    "human": {"palettes": (3, 10, 16, 17, 23, 26), "types": (4, 6, 7, 17), "label": "따뜻한 사람 중심 스토리", "motif": "PEOPLE / CHANGE / CARE"},
    "premium": {"palettes": (4, 13, 15, 19, 27), "types": (1, 6, 14, 22), "label": "절제된 프리미엄 브랜드", "motif": "CRAFT / DETAIL / VALUE"},
    "playful": {"palettes": (1, 6, 11, 12, 14, 28), "types": (4, 7, 11, 17, 29), "label": "활기 있는 컬처 포스터", "motif": "IDEA / ENERGY / TOGETHER"},
    "utility": {"palettes": (3, 12, 18, 21, 22, 29), "types": (3, 9, 19, 20), "label": "산업적 정보 시스템", "motif": "INPUT / PROCESS / OUTPUT"},
}


# A direction is more than a palette.  Each entry owns a recognisable spatial
# grammar so three variants feel like three designers, not three theme swaps.
# The renderer still keeps the combinations curated: career and startup use
# different pools and the content archetype nudges the final choice.
ART_DIRECTIONS = {
    "swiss-ledger": "스위스 인덱스 에디토리얼",
    "brand-campaign": "브랜드 캠페인 포스터",
    "organic-journal": "유기적 임팩트 저널",
    "product-lab": "제품 실험실 쇼케이스",
    "cinematic-story": "시네마틱 스크롤 스토리",
    "brutal-campus": "캠퍼스 네오 브루탈리즘",
    "data-atlas": "데이터 아틀라스",
    "quiet-portfolio": "절제된 포트폴리오 북",
    "case-study": "UX 케이스 스터디",
    "culture-zine": "컬처 진 스타일",
    "industrial-spec": "인더스트리얼 스펙 시트",
    "gallery-essay": "갤러리형 비주얼 에세이",
}

MODE_DIRECTION_POOLS = {
    "startup": (
        "brand-campaign", "product-lab", "organic-journal", "swiss-ledger",
        "cinematic-story", "brutal-campus", "data-atlas", "culture-zine",
        "industrial-spec", "gallery-essay",
    ),
    "career": (
        "quiet-portfolio", "case-study", "swiss-ledger", "gallery-essay",
        "data-atlas", "cinematic-story", "culture-zine", "product-lab",
        "industrial-spec", "brutal-campus",
    ),
}

ARCHETYPE_DIRECTION_HINTS = {
    "technology": ("product-lab", "data-atlas", "industrial-spec"),
    "editorial": ("swiss-ledger", "quiet-portfolio", "gallery-essay"),
    "human": ("organic-journal", "cinematic-story", "gallery-essay"),
    "premium": ("quiet-portfolio", "brand-campaign", "gallery-essay"),
    "playful": ("culture-zine", "brutal-campus", "brand-campaign"),
    "utility": ("industrial-spec", "data-atlas", "case-study"),
}


def _art_direction(mode, archetype, seed, variant_index, avoid=None):
    pool = list(MODE_DIRECTION_POOLS.get(mode, MODE_DIRECTION_POOLS["startup"]))
    hints = ARCHETYPE_DIRECTION_HINTS.get(archetype, ())
    # Start with a compatible direction, then spread A/B/C across the full pool.
    ordered = list(dict.fromkeys((*hints, *pool)))
    used = {
        str(item.get("artDirectionKey", ""))
        for item in (avoid or []) if isinstance(item, dict)
    }
    family_targets = (
        ("editorial-book", "campaign"),
        ("product-system", "data-atlas"),
        ("scroll-story",),
    )[variant_index % 3]
    targeted = [item for item in ordered if _structure_family(item) in family_targets]
    candidates = targeted or ordered
    start = (seed + variant_index * 5) % len(candidates)
    for offset in range(len(candidates)):
        candidate = candidates[(start + offset) % len(candidates)]
        if candidate not in used:
            return candidate
    return candidates[start]


def _direction_css(direction):
    systems = {
        "swiss-ledger": """
          .hero-grid{grid-template-columns:minmax(0,.72fr) minmax(320px,.28fr);align-items:end}
          .hero-copy{border-left:1px solid rgba(255,255,255,.5);padding-left:28px}.hero h1{font-weight:600}
          .visual-stage{min-height:330px}.page-section{border-top:1px solid var(--line)}
          .section-head{grid-template-columns:120px minmax(0,1fr)}.section-index{font-family:monospace}
          .evidence,.case-card{border:1px solid var(--line);border-radius:0;background:transparent}
        """,
        "brand-campaign": """
          .hero{background:var(--accent);color:var(--ink)}.hero:before{background:linear-gradient(120deg,var(--accent),var(--soft))}
          .hero:after{background:radial-gradient(circle at 82% 16%,var(--paper) 0 13%,transparent 13.2%),radial-gradient(circle at 76% 73%,var(--secondary) 0 20%,transparent 20.2%);opacity:.55}
          .site-nav,.hero .lead{color:var(--ink)}.eyebrow{color:var(--secondary)}.hero-meta span{border-color:color-mix(in srgb,var(--ink) 35%,transparent);color:var(--ink)}
          .hero h1{text-transform:none;max-width:8ch}.page-section:nth-child(even){background:var(--soft)}
          .section-index{display:inline-block;padding:7px 11px;background:var(--ink);color:var(--paper)}
        """,
        "organic-journal": """
          .hero{background:var(--ink)}.hero:before{background:radial-gradient(circle at 80% 25%,var(--secondary),transparent 42%),linear-gradient(140deg,var(--ink),color-mix(in srgb,var(--ink) 68%,var(--accent)))}
          .hero-grid{grid-template-columns:minmax(0,1fr) minmax(300px,.8fr)}.visual-stage{border-radius:48% 48% 8px 8px;transform:rotate(1.5deg)}
          .page-section .shell{width:min(1060px,calc(100% - 48px))}.page-section:nth-child(odd){background:color-mix(in srgb,var(--soft) 42%,var(--paper))}
          .section-head{grid-template-columns:1fr}.section-index{color:var(--secondary)}.tag{border-radius:40% 60% 55% 45%}
        """,
        "product-lab": """
          .hero{margin:16px;min-height:calc(100svh - 32px);border-radius:32px}.hero-grid{grid-template-columns:minmax(0,.8fr) minmax(380px,1.2fr)}
          .visual-stage{border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.28)}main{padding:0 16px}
          .page-section{margin:16px 0;border-radius:28px;background:color-mix(in srgb,var(--soft) 30%,var(--paper))}
          .page-section.dark{background:var(--ink)}.section-head{grid-template-columns:1fr}.section-index{width:max-content;padding:7px 11px;border:1px solid currentColor;border-radius:999px}
        """,
        "cinematic-story": """
          .hero{min-height:100svh}.hero-grid{display:block}.hero-copy{width:min(790px,68%);position:relative;z-index:3}
          .visual-stage{position:absolute;inset:0 0 0 50%;min-height:100%;border:0;opacity:.72;mix-blend-mode:screen}
          .page-section{padding:clamp(110px,12vw,180px) 0}.section-head{grid-template-columns:1fr;max-width:900px}
          .evidence-grid{display:block;border-top:1px solid rgba(255,255,255,.22)}.evidence{min-height:auto;padding:26px 0;border-bottom:1px solid rgba(255,255,255,.22);background:none;border-radius:0;display:grid;grid-template-columns:150px 1fr}
        """,
        "brutal-campus": """
          body{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:28px 28px}
          .hero{margin:12px;border:3px solid var(--ink);box-shadow:10px 10px 0 var(--accent)}.hero h1{text-shadow:5px 5px 0 var(--secondary)}
          .page-section{margin:22px;border:3px solid var(--ink);box-shadow:8px 8px 0 var(--accent);background:var(--paper)}.page-section.dark{background:var(--ink)}
          .evidence,.case-card,.tag{border:2px solid currentColor;border-radius:0}.section-index{font-weight:900}
        """,
        "data-atlas": """
          .hero-grid{grid-template-columns:minmax(0,1fr) minmax(420px,.8fr)}.hero:after{background-size:28px 28px}
          main{display:grid;grid-template-columns:repeat(12,1fr);gap:14px;padding:14px}.page-section{grid-column:span 6;border:1px solid var(--line)}
          .page-section:nth-child(3n+1){grid-column:span 12}.page-section .shell{width:auto;padding:clamp(28px,4vw,58px)}
          .section-head{grid-template-columns:1fr}.section-index{font-family:monospace}.evidence,.case-card{border-radius:4px}
        """,
        "quiet-portfolio": """
          .hero{background:var(--paper);color:var(--ink);min-height:78svh;border-bottom:1px solid var(--line)}.hero:before{background:linear-gradient(110deg,var(--paper),var(--soft))}.hero:after{display:none}
          .site-nav,.hero .lead{color:var(--ink)}.hero-meta span{color:var(--secondary);border-color:var(--line)}.hero h1{font-weight:500}
          .visual-stage{border:0;background:transparent}.page-section{border-bottom:1px solid var(--line)}.section-head{grid-template-columns:140px 1fr}
          .case-card,.evidence{background:transparent;border-top:1px solid var(--line);border-radius:0;padding-left:0;padding-right:0}
        """,
        "case-study": """
          .hero{min-height:680px}.hero-grid{grid-template-columns:minmax(0,.9fr) minmax(360px,1.1fr)}
          .page-section:nth-child(odd){background:var(--soft)}.section-head{grid-template-columns:150px 1fr}
          .evidence-grid,.showcase{gap:24px}.evidence,.case-card{border-radius:18px;border:1px solid var(--line);box-shadow:0 18px 50px rgba(0,0,0,.07)}
          .feature{grid-template-columns:120px 1fr}.feature:before{font-family:monospace;font-size:13px}
        """,
        "culture-zine": """
          .hero{transform:none;background:var(--ink)}.hero-copy{transform:rotate(-1deg)}.hero h1{font-weight:900;text-shadow:6px 6px 0 var(--accent)}
          .visual-stage{transform:rotate(2deg);box-shadow:14px 14px 0 var(--accent)}.page-section:nth-child(odd){background:var(--soft)}
          .page-section:nth-child(3n+2) .shell{transform:rotate(-.4deg)}.section-index{font-size:13px}.tag:nth-child(odd){transform:rotate(-2deg)}.tag:nth-child(even){transform:rotate(2deg)}
        """,
        "industrial-spec": """
          .hero{background:#111;color:#f4f1e8}.hero:after{background:repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 80px)}
          .hero-grid{grid-template-columns:minmax(0,1fr) 360px}.visual-stage{border:1px dashed rgba(255,255,255,.5)}
          .page-section{border-top:4px solid var(--ink)}.section-head{grid-template-columns:220px 1fr}.section-index{font-family:monospace;letter-spacing:.08em}
          .evidence,.case-card{border:1px dashed currentColor;border-radius:0}.tag{border-radius:0;font-family:monospace}
        """,
        "gallery-essay": """
          .hero-grid{grid-template-columns:minmax(0,.68fr) minmax(420px,1.32fr)}.hero-copy{align-self:end;padding-bottom:34px}
          .visual-stage{min-height:620px;border:0}.page-section{padding:clamp(120px,13vw,190px) 0}.section-head{grid-template-columns:1fr;max-width:860px}
          .page-section:nth-child(even) .shell{width:min(920px,calc(100% - 48px));margin-left:8vw}.case-card,.evidence{background:transparent;border-left:1px solid currentColor;border-radius:0}
        """,
    }
    return systems.get(direction, "")


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
    used_palettes = {item.get("palette") for item in (avoid or []) if isinstance(item, dict)}
    used_types = {item.get("typography") for item in (avoid or []) if isinstance(item, dict)}
    if _is_auto(options.get("designConcept", options.get("designStyle"))):
        for shift in range(30):
            candidate = ((design + shift * 7) % 30, (layout + shift * 11) % 30, allowed["palettes"][(seed + shift) % len(allowed["palettes"])], allowed["types"][(seed // 7 + shift) % len(allowed["types"])])
            if candidate not in used and (candidate[2] not in used_palettes or candidate[3] not in used_types):
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


def _generated_visual(words, mode, archetype, variant, direction="", seed=0):
    """Deterministic, content-labelled artwork for image-less sites.

    It is intentionally inline SVG: free, offline after download, crisp at every
    size, and never pretends that a generated stock photograph is real evidence.
    """
    labels = [_e(word) for word in (words or ["IDEA", "PROOF", "NEXT"])[:5]]
    while len(labels) < 3:
        labels.append(("WORK", "SYSTEM", "STORY")[len(labels)])
    if direction in ("brand-campaign", "culture-zine", "brutal-campus"):
        angle = 8 + seed % 18
        art = f'''<g transform="rotate(-{angle} 260 160)"><rect x="38" y="42" width="315" height="92"/><text class="mega" x="58" y="108">{labels[0]}</text></g>
        <circle cx="405" cy="216" r="82"/><text x="405" y="221">{labels[1]}</text><path class="wire" d="M24 270 L478 34"/>'''
    elif direction in ("organic-journal", "gallery-essay"):
        art = f'''<path class="wire" d="M18 242 C110 42 182 282 270 102 S410 264 504 72"/>
        <circle cx="115" cy="112" r="72"/><circle cx="302" cy="190" r="96"/><circle cx="434" cy="86" r="42"/>
        <text x="115" y="117">{labels[0]}</text><text x="302" y="195">{labels[1]}</text><text x="434" y="91">{labels[2]}</text>'''
    elif direction in ("data-atlas", "industrial-spec", "case-study"):
        marks = "".join(
            f'<g transform="translate({44 + (i % 2) * 238} {42 + (i // 2) * 112})"><rect width="218" height="92"/><text x="18" y="52">{label}</text><text class="num" x="186" y="22">0{i+1}</text></g>'
            for i, label in enumerate(labels[:4])
        )
        art = marks + '<path class="wire" d="M26 292 H494 M260 26 V292"/>'
    elif direction in ("quiet-portfolio", "swiss-ledger"):
        art = f'''<path class="wire" d="M42 62 H478 M42 138 H478 M42 214 H478 M168 38 V282"/>
        <text class="mega" x="190" y="124">{labels[0]}</text><text x="190" y="180">{labels[1]} / {labels[2]}</text>
        <circle cx="105" cy="176" r="48"/><text class="num" x="105" y="180">01</text>'''
    elif direction == "cinematic-story":
        art = f'''<circle class="halo" cx="354" cy="154" r="132"/><path class="wire" d="M18 278 C116 206 190 224 270 102 C330 12 420 42 506 86"/>
        <text class="mega" x="30" y="132">{labels[0]}</text><text x="356" y="160">{labels[1]}</text>'''
    elif variant == 1:
        marks = "".join(
            f'<g transform="translate({70 + i * 78} {88 + (i % 2) * 86})"><circle r="{32 + i * 7}"/><text y="5">{label}</text></g>'
            for i, label in enumerate(labels[:4])
        )
        art = f'<path class="wire" d="M45 265 C170 35 285 350 455 95 S650 210 760 55"/>{marks}'
    elif variant == 2:
        marks = "".join(
            f'<g transform="translate({52 + (i % 2) * 245} {48 + (i // 2) * 105})"><rect width="220" height="82"/><text x="18" y="48">{label}</text><text class="num" x="188" y="24">0{i+1}</text></g>'
            for i, label in enumerate(labels[:4])
        )
        art = marks + '<path class="wire" d="M20 295 H500"/>'
    else:
        art = f'<circle class="halo" cx="260" cy="160" r="118"/><path class="wire" d="M20 245 L160 72 L278 220 L455 42"/><text class="mega" x="34" y="178">{labels[0]}</text><text x="315" y="260">{labels[1]} / {labels[2]}</text>'
    return f'''<div class="visual-stage generated-art" aria-label="콘텐츠를 바탕으로 생성된 추상 그래픽">
      <svg viewBox="0 0 520 320" role="img" aria-label="{_e(mode)} { _e(archetype) } 시각 그래픽">
        <g class="artwork">{art}</g>
      </svg><div class="art-stamp">PCU / ORIGINAL VISUAL</div></div>'''


def _quality_audit(document, mode, palette, data, site_purpose=""):
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
        "adaptiveTypography": "type-long" in document and "type-medium" in document,
        "boundedHeadings": "clamp(58px,8vw,112px)" not in document and "clamp(44px,6.5vw,86px)" not in document,
        "artDirectionApplied": "direction-" in document,
    }
    required = ("01 / CONTEXT", "02 / SOLUTION", "03 / PROCESS") if mode == "startup" else ("01 / POSITION", "02 / SELECTED WORK", "03 / EXPERIENCE")
    if mode == "startup" and site_purpose == "customer":
        required = ("01 / VALUE", "02 / HOW IT WORKS", "03 / WHY")
    checks["requiredNarrative"] = all(term in document for term in required)
    checks["notGenericPitchDeck"] = not (mode == "startup" and site_purpose == "customer" and "문제를 바꾸는<br>우리의 방식" in document)
    if mode == "career" or site_purpose == "customer":
        checks["v6IndependentStructure"] = 'class="v6-' in document
        checks["noLegacySectionSkeleton"] = 'class="page-section' not in document
    score = round(sum(checks.values()) / len(checks) * 100)
    return {"score": score, "passed": score >= 88, "checks": checks}


def _structure_family(direction):
    if direction in ("brand-campaign", "culture-zine", "brutal-campus"):
        return "campaign"
    if direction in ("swiss-ledger", "quiet-portfolio", "gallery-essay"):
        return "editorial-book"
    if direction in ("product-lab", "case-study", "industrial-spec"):
        return "product-system"
    if direction in ("cinematic-story", "organic-journal"):
        return "scroll-story"
    return "data-atlas"


def _compose_v6(mode, direction, context, visual, brand_logo):
    """Build genuinely different document trees from the same factual slots."""
    family = _structure_family(direction)
    brand = _e(context["brand"])
    eyebrow = _e(context["eyebrow"])
    lead = _e(context["lead"])
    meta = "".join(f'<span>{_e(item)}</span>' for item in context.get("meta", []) if item)
    problem = _e(context["problem"])
    solution = _e(context["solution"])
    proof = _e(context.get("proof") or context.get("next") or context["lead"])
    next_step = _e(context.get("next") or context["lead"])
    items = [item for item in context.get("items", []) if item]
    evidence = [item for item in context.get("evidence", []) if item]
    item_cards = "".join(
        f'<article class="v6-item"><small>{index:02d}</small><strong>{_e(item)}</strong></article>'
        for index, item in enumerate(items[:6], 1)
    ) or '<article class="v6-item"><small>01</small><strong>구체적인 실행 내용을 준비하고 있습니다.</strong></article>'
    evidence_cards = "".join(
        f'<article class="v6-evidence"><span>EVIDENCE {index:02d}</span><p>{_e(item)}</p></article>'
        for index, item in enumerate(evidence[:6], 1)
    ) or f'<article class="v6-evidence"><span>EVIDENCE 01</span><p>{proof}</p></article>'
    labels = (
        {"value": "01 / VALUE", "how": "02 / HOW IT WORKS", "why": "03 / WHY", "proof": "04 / PROOF", "next": "05 / BUILDING"}
        if mode == "startup" else
        {"value": "01 / POSITION", "how": "02 / SELECTED WORK", "why": "03 / EXPERIENCE", "proof": "04 / EVIDENCE", "next": "05 / NEXT"}
    )
    nav_index = "SERVICE / BRAND" if mode == "startup" else "CAREER / SELECTED WORK"
    nav = f'<nav class="site-nav"><div class="shell"><div class="brand">{brand_logo}{brand}</div><div class="nav-index">{nav_index}</div></div></nav>'
    hero_copy = f'<div class="hero-copy"><div class="eyebrow">{eyebrow}</div><h1>{brand}</h1><p class="lead">{lead}</p><div class="hero-meta">{meta}</div></div>'

    if family == "campaign":
        body = f'''{nav}<header class="v6-campaign-hero">{hero_copy}<div class="v6-campaign-art">{visual}</div><div class="v6-serial">PCU—26 / NEW VOICE</div></header>
        <main class="v6-campaign-main"><section class="v6-slogan"><span>{labels['value']}</span><h2>{lead}</h2></section>
        <section class="v6-campaign-split"><div><span>{labels['why']}</span><h2>바꿔야 할 장면</h2></div><p>{problem}</p></section>
        <section class="v6-campaign-list"><header><span>{labels['how']}</span><h2>아이디어를 경험으로</h2></header><div>{item_cards}</div></section>
        <section class="v6-proof-poster"><span>{labels['proof']}</span><p>{proof}</p><b>↗</b></section>
        <section class="v6-next-line"><span>{labels['next']}</span><p>{next_step}</p></section></main>'''
    elif family == "editorial-book":
        body = f'''{nav}<header class="v6-book-cover"><div class="v6-book-number">ISSUE<br>NO. 01</div>{hero_copy}{visual}</header>
        <main class="v6-book"><aside><b>CONTENTS</b><a href="#chapter-1">{labels['value']}</a><a href="#chapter-2">{labels['how']}</a><a href="#chapter-3">{labels['why']}</a></aside>
        <div class="v6-book-pages"><article id="chapter-1" class="v6-chapter"><span>{labels['value']}</span><h2>{lead}</h2><p>{solution}</p></article>
        <article id="chapter-2" class="v6-chapter v6-chapter-dark"><span>{labels['how']}</span><h2>선택한 방식과 실행</h2><div class="v6-evidence-stack">{item_cards}</div></article>
        <article id="chapter-3" class="v6-chapter"><span>{labels['why']}</span><div class="v6-columns"><h2>출발점</h2><p>{problem}</p></div>{evidence_cards}</article>
        <article class="v6-book-end"><span>{labels['next']}</span><p>{next_step}</p></article></div></main>'''
    elif family == "product-system":
        body = f'''{nav}<header class="v6-product-hero"><div class="shell">{hero_copy}{visual}</div></header>
        <main class="v6-product-main"><section class="v6-product-intro"><span>{labels['value']}</span><h2>{lead}</h2><p>{solution}</p></section>
        <section class="v6-product-board"><header><span>{labels['how']}</span><h2>구조와 작동 방식</h2></header><div class="v6-bento">{item_cards}</div></section>
        <section class="v6-product-case"><div><span>{labels['why']}</span><h2>왜 지금 필요한가</h2></div><p>{problem}</p></section>
        <section class="v6-product-proof"><header><span>{labels['proof']}</span><h2>확인한 근거</h2></header>{evidence_cards}</section>
        <section class="v6-product-next"><span>{labels['next']}</span><strong>{next_step}</strong></section></main>'''
    elif family == "scroll-story":
        body = f'''{nav}<header class="v6-film-hero">{visual}<div class="v6-film-copy">{hero_copy}</div><div class="v6-film-caption">SCENE 01 — BEGIN</div></header>
        <main class="v6-story"><section class="v6-story-opening"><span>{labels['why']}</span><p>“{problem}”</p></section>
        <section class="v6-story-scene"><div class="v6-scene-no">02</div><div><span>{labels['value']}</span><h2>{lead}</h2><p>{solution}</p></div></section>
        <section class="v6-story-track"><header><span>{labels['how']}</span><h2>생각이 실행이 된 과정</h2></header>{item_cards}</section>
        <section class="v6-story-scene v6-story-proof"><div class="v6-scene-no">04</div><div><span>{labels['proof']}</span><h2>남겨진 근거</h2>{evidence_cards}</div></section>
        <section class="v6-story-ending"><span>{labels['next']}</span><p>{next_step}</p><b>TO BE CONTINUED</b></section></main>'''
    else:
        body = f'''{nav}<header class="v6-atlas-hero"><div class="v6-atlas-title">{hero_copy}</div><div class="v6-atlas-visual">{visual}</div></header>
        <main class="v6-atlas"><div class="v6-atlas-bar"><span>LIVE DOCUMENT</span><span>{eyebrow}</span><span>2026 / PCU</span></div>
        <section class="v6-atlas-grid"><article class="v6-atlas-lead"><span>{labels['value']}</span><h2>{lead}</h2></article><article><span>{labels['why']}</span><p>{problem}</p></article><article><span>SOLUTION</span><p>{solution}</p></article></section>
        <section class="v6-atlas-process"><header><span>{labels['how']}</span><h2>실행 데이터</h2></header>{item_cards}</section>
        <section class="v6-atlas-evidence"><header><span>{labels['proof']}</span><h2>Evidence index</h2></header>{evidence_cards}</section>
        <section class="v6-atlas-footer"><span>{labels['next']}</span><p>{next_step}</p></section></main>'''
    return body, family


def render_website(source, mode, options, page_id, reference_brief="", avoid=None):
    data = _fields(source)
    career_assessment = _get(data, "진로검사 결과지 - AI 설계 참고용, 공개 금지") if mode == "career" else ""
    site_purpose = str(options.get("startupPurpose", "customer")) if mode == "startup" else "career"
    design, layout, palette_index, type_index, archetype, planner = _curated_system(data, mode, options, page_id, reference_brief, avoid)
    palette, typography = PALETTES[palette_index], TYPOGRAPHY[type_index]
    variant_index = max(0, min(2, int(options.get("_variantIndex", 0) or 0)))
    composition = ("editorial", "product", "narrative")[variant_index]
    seed = int(hashlib.sha256(f"{page_id}|{mode}|{reference_brief}".encode()).hexdigest()[:12], 16)
    direction = _art_direction(mode, archetype, seed, variant_index, avoid)
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
    .hero{{position:relative;min-height:clamp(620px,82svh,880px);display:grid;align-items:center;padding:128px 0 88px;background:var(--ink);color:#fff;overflow:hidden;isolation:isolate}}.hero:before{{content:'';position:absolute;inset:0;background:linear-gradient(115deg,color-mix(in srgb,var(--ink) 92%,transparent),color-mix(in srgb,var(--secondary) 68%,transparent));z-index:-3}}.hero:after{{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to right,#000,transparent 80%);z-index:-2}}.hero-grid{{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.65fr);align-items:center;gap:clamp(48px,8vw,112px)}}.hero-copy{{position:relative;z-index:2}}.eyebrow{{display:flex;align-items:center;gap:12px;color:var(--accent);font-size:12px;font-weight:850;letter-spacing:.16em;text-transform:uppercase}}.eyebrow:before{{content:'';width:36px;height:2px;background:currentColor}}h1,h2,h3{{font-family:var(--heading);text-wrap:balance;word-break:keep-all}}h1{{max-width:10ch;margin:24px 0 28px;font-size:clamp(56px,7.2vw,108px);line-height:.96;letter-spacing:-.055em}}h1.type-medium{{font-size:clamp(50px,6.4vw,92px)}}h1.type-long{{max-width:14ch;font-size:clamp(42px,5.3vw,76px);line-height:1.04}}.lead{{max-width:720px;margin:0;font-size:clamp(18px,1.65vw,23px);line-height:1.68;color:rgba(255,255,255,.78);word-break:keep-all}}.hero-meta{{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}}.hero-meta span{{padding:8px 12px;border:1px solid rgba(255,255,255,.2);border-radius:999px;font-size:12px;color:rgba(255,255,255,.72)}}
    .visual-stage{{position:relative;min-height:460px;overflow:hidden;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.035)}}.visual-stage.has-image img{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.88) contrast(1.04)}}.visual-stage.has-image:after{{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.72))}}.visual-caption{{position:absolute;z-index:2;left:24px;right:24px;bottom:22px;display:flex;align-items:end;justify-content:space-between;gap:20px;color:#fff}}.visual-caption small{{font:800 10px/1.2 var(--body);letter-spacing:.15em}}.visual-caption strong{{max-width:12ch;text-align:right;font:600 clamp(20px,2.5vw,34px)/1.05 var(--heading)}}.visual-ledger{{height:100%;min-height:460px;padding:30px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(145deg,rgba(255,255,255,.08),transparent 58%)}}.visual-ledger-top{{display:flex;justify-content:space-between;font:800 10px/1 var(--body);letter-spacing:.14em;color:var(--accent)}}.visual-ledger strong{{max-width:9ch;font:600 clamp(38px,5vw,70px)/.94 var(--heading);letter-spacing:-.05em}}.visual-words{{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,.2)}}.visual-words span{{padding:12px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:11px;color:rgba(255,255,255,.68)}}
    .generated-art{{display:grid;place-items:center;background:color-mix(in srgb,var(--secondary) 25%,var(--ink))}}.generated-art svg{{width:100%;height:100%;padding:7%;overflow:visible}}.generated-art circle,.generated-art rect{{fill:color-mix(in srgb,var(--accent) 16%,transparent);stroke:var(--accent);stroke-width:1.4}}.generated-art text{{fill:#fff;font:700 12px var(--body);letter-spacing:.06em;text-anchor:middle}}.generated-art .num{{font-size:8px;fill:var(--accent)}}.generated-art .mega{{font:800 48px var(--heading);text-anchor:start;letter-spacing:-.06em}}.generated-art .wire{{fill:none;stroke:rgba(255,255,255,.68);stroke-width:1.6}}.generated-art .halo{{fill:none;stroke:var(--accent);stroke-width:34;stroke-dasharray:12 10;opacity:.5}}.art-stamp{{position:absolute;right:16px;bottom:12px;font-size:9px;letter-spacing:.14em;color:rgba(255,255,255,.58)}}
    .hero.centered{{text-align:center}}.hero.centered .hero-grid{{display:block}}.hero.centered .hero-copy{{max-width:980px;margin:auto}}.hero.centered h1,.hero.centered .lead{{margin-left:auto;margin-right:auto}}.hero.centered .eyebrow,.hero.centered .hero-meta{{justify-content:center}}.hero.centered .visual-stage{{min-height:160px;margin-top:40px}}.hero.centered .visual-card{{width:min(620px,100%);transform:none}}.hero.poster .hero-grid{{display:block}}.hero.poster h1{{max-width:12ch;font-size:clamp(62px,9.5vw,128px)}}.hero.poster h1.type-medium{{font-size:clamp(52px,7.8vw,104px)}}.hero.poster h1.type-long{{font-size:clamp(42px,6vw,82px)}}.hero.poster .visual-stage{{position:absolute;right:5vw;bottom:2vw;opacity:.62}}.hero.editorial .hero-grid{{grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr)}}.hero.editorial .hero-copy{{grid-column:2}}.hero.editorial .visual-stage{{grid-column:1;grid-row:1}}.hero.editorial h1{{font-size:clamp(58px,7.2vw,104px)}}
    .page-section{{position:relative;padding:var(--space) 0}}.section-head{{display:grid;grid-template-columns:180px minmax(0,1fr);gap:32px;margin-bottom:clamp(48px,7vw,88px)}}.section-index{{font:850 11px/1.2 var(--body);letter-spacing:.16em;color:var(--secondary);text-transform:uppercase}}h2{{max-width:15ch;margin:0;font-size:clamp(38px,5.2vw,68px);line-height:1.1;letter-spacing:-.045em}}h2.type-medium{{font-size:clamp(34px,4.5vw,58px)}}h2.type-long{{max-width:22ch;font-size:clamp(30px,3.7vw,48px);line-height:1.18;letter-spacing:-.035em}}h3{{margin:0 0 16px;font-size:clamp(24px,2.6vw,36px);line-height:1.18;letter-spacing:-.03em}}.section-intro{{max-width:720px;margin:20px 0 0;font-size:clamp(17px,1.55vw,20px);line-height:1.78;word-break:keep-all}}.dark{{background:var(--ink);color:#fff}}.dark .section-index{{color:var(--accent)}}.dark .section-intro,.dark .copy{{color:rgba(255,255,255,.72)}}
    .narrative-grid{{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(40px,8vw,112px);align-items:start}}.pull-quote{{position:sticky;top:32px;font-family:var(--heading);font-size:clamp(30px,4vw,52px);line-height:1.15;letter-spacing:-.04em}}.copy{{margin:0;font-size:clamp(17px,1.8vw,21px);white-space:pre-line;word-break:keep-all}}.evidence-grid{{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}}.evidence{{grid-column:span 6;min-height:176px;padding:28px;background:color-mix(in srgb,var(--paper) 6%,transparent);border-radius:var(--radius);display:flex;flex-direction:column;justify-content:space-between}}.evidence b{{font-family:var(--heading);font-size:clamp(22px,2.5vw,34px);line-height:1.2}}.evidence small{{color:var(--accent);font-size:11px;letter-spacing:.12em}}.feature-list{{counter-reset:feature}}.feature{{counter-increment:feature;display:grid;grid-template-columns:80px minmax(0,1fr);gap:24px;padding:28px 0;border-top:1px solid var(--line)}}.feature:before{{content:'0' counter(feature);font-weight:850;color:var(--secondary)}}.dark .feature{{border-color:rgba(255,255,255,.18)}}.dark .feature:before{{color:var(--accent)}}.feature strong{{font-size:clamp(18px,2vw,25px)}}
    .showcase{{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}}.case-card{{grid-column:span 6;min-height:280px;padding:32px;background:var(--soft);border-radius:var(--radius);display:flex;flex-direction:column;justify-content:space-between}}.case-card:nth-child(3n+1){{grid-column:span 8}}.case-card:nth-child(3n+2){{grid-column:span 4}}.case-card small{{font-size:11px;letter-spacing:.14em;color:var(--secondary)}}.case-card p{{margin:32px 0 0;font-size:clamp(18px,1.8vw,23px);line-height:1.58}}.tag-cloud{{display:flex;flex-wrap:wrap;gap:10px}}.tag{{padding:10px 14px;background:var(--soft);border-radius:999px;font-size:13px;font-weight:750}}.statement{{overflow:hidden;background:var(--accent);color:var(--ink)}}.statement .shell{{position:relative}}.statement p{{max-width:980px;margin:0;font-family:var(--heading);font-size:clamp(32px,4.6vw,62px);font-weight:750;line-height:1.16;letter-spacing:-.04em}}.statement p.type-medium{{font-size:clamp(29px,4vw,52px)}}.statement p.type-long{{font-size:clamp(26px,3.3vw,44px);line-height:1.28}}.statement .mark{{position:absolute;right:-40px;top:-100px;font:900 280px/.8 var(--heading);opacity:.12}}
    .editorial-image{{position:relative;min-height:420px;margin:0;overflow:hidden;background:linear-gradient(145deg,var(--soft),color-mix(in srgb,var(--accent) 28%,var(--paper)));border-radius:var(--radius)}}.editorial-image img{{width:100%;height:100%;min-height:420px;object-fit:cover}}.editorial-image span{{display:none;position:absolute;inset:0;padding:32px;align-items:flex-end;color:var(--secondary)}}.editorial-image.image-missing span{{display:flex}}.image-row{{display:grid;grid-template-columns:1.4fr .6fr;gap:16px;margin-top:64px}}.image-row .editorial-image:nth-child(2){{margin-top:80px}}footer{{padding:40px 0;background:#101820;color:rgba(255,255,255,.68);font-size:13px}}footer .shell{{display:flex;justify-content:space-between;gap:24px}}.reveal{{opacity:0;transform:translateY(20px);transition:opacity .65s ease,transform .65s cubic-bezier(.2,.8,.2,1)}}.reveal.on{{opacity:1;transform:none}}
    body.archetype-editorial .hero:after{{background:none}}body.archetype-editorial .visual-stage{{transform:translateY(44px);border-radius:0}}body.archetype-human .hero:before{{background:linear-gradient(115deg,var(--ink),color-mix(in srgb,var(--secondary) 72%,var(--ink)))}}body.archetype-human .visual-stage{{border-radius:160px 160px 12px 12px}}body.archetype-premium .hero:after{{background:none;border:1px solid rgba(255,255,255,.12);inset:40px}}body.archetype-premium .eyebrow{{color:var(--accent)}}body.archetype-premium .visual-stage{{border:none}}body.archetype-playful .visual-stage{{transform:rotate(2deg);box-shadow:14px 14px 0 var(--accent)}}body.archetype-playful h1{{letter-spacing:-.04em}}body.archetype-utility .hero:after{{background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:32px 32px}}body.archetype-utility .case-card{{border-radius:0}}
    body.sections-alternating .page-section:nth-child(even) .narrative-grid>*:first-child{{order:2}}body.sections-showcase .page-section:not(.dark):not(.statement){{margin:20px;border-radius:var(--radius);background:color-mix(in srgb,var(--soft) 40%,var(--paper))}}body.density-compact .case-card{{min-height:220px}}body.density-spacious .copy{{max-width:760px}}
    body.composition-product .hero{{margin:14px;min-height:calc(100svh - 28px);border-radius:28px}}body.composition-product .hero-grid{{grid-template-columns:minmax(0,.85fr) minmax(360px,1.15fr)}}body.composition-product h1{{font-size:clamp(58px,7vw,104px)}}body.composition-product main{{padding:14px}}body.composition-product .page-section{{margin:14px 0;border-radius:28px;background:color-mix(in srgb,var(--soft) 34%,var(--paper))}}body.composition-product .page-section.dark{{background:var(--ink)}}body.composition-product .section-head{{grid-template-columns:1fr}}body.composition-product .section-index{{display:inline-flex;width:max-content;padding:7px 10px;border:1px solid currentColor;border-radius:999px}}
    body.composition-narrative .hero{{min-height:100svh}}body.composition-narrative .hero-grid{{display:block}}body.composition-narrative .hero-copy{{width:min(820px,78%)}}body.composition-narrative .visual-stage{{position:absolute;inset:0 0 0 55%;min-height:100%;border:0;opacity:.72;mix-blend-mode:screen}}body.composition-narrative .page-section{{padding:clamp(110px,12vw,180px) 0}}body.composition-narrative .section-head{{grid-template-columns:1fr;max-width:920px}}body.composition-narrative .section-head h2{{max-width:12ch;font-size:clamp(42px,5.4vw,70px)}}body.composition-narrative .section-head h2.type-medium{{font-size:clamp(36px,4.6vw,58px)}}body.composition-narrative .section-head h2.type-long{{max-width:20ch;font-size:clamp(30px,3.8vw,48px)}}body.composition-narrative .evidence-grid{{display:block;border-top:1px solid rgba(255,255,255,.22)}}body.composition-narrative .evidence{{min-height:auto;padding:28px 0;border-bottom:1px solid rgba(255,255,255,.22);background:none;border-radius:0;display:grid;grid-template-columns:160px 1fr;gap:28px}}
    {_direction_css(direction)}
    /* V6 independent document grammars */
    .v6-campaign-hero{{position:relative;min-height:100svh;padding:150px 7vw 80px;overflow:hidden;background:var(--accent);color:var(--ink);display:grid;grid-template-columns:minmax(0,.8fr) minmax(420px,1.2fr);gap:6vw;align-items:center}}.v6-campaign-hero .lead,.v6-book-cover .lead{{color:inherit}}.v6-campaign-art .visual-stage{{min-height:560px;transform:rotate(2deg);box-shadow:18px 18px 0 var(--ink)}}.v6-serial{{position:absolute;right:24px;bottom:22px;font:800 10px/1 var(--body);letter-spacing:.18em}}.v6-campaign-main>section{{padding:clamp(80px,10vw,150px) max(7vw,24px)}}.v6-slogan span,.v6-campaign-split span,.v6-campaign-list span,.v6-proof-poster span,.v6-next-line span{{font:850 11px/1 var(--body);letter-spacing:.16em}}.v6-slogan h2{{max-width:18ch;margin-top:40px}}.v6-campaign-split{{display:grid;grid-template-columns:.85fr 1.15fr;gap:8vw;background:var(--ink);color:#fff}}.v6-campaign-split p{{font:500 clamp(25px,3.3vw,44px)/1.45 var(--heading)}}.v6-campaign-list header{{display:grid;grid-template-columns:180px 1fr;margin-bottom:70px}}.v6-campaign-list>div{{display:grid;grid-template-columns:repeat(2,1fr);border-top:2px solid var(--ink)}}.v6-item{{padding:28px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:54px 1fr;gap:20px}}.v6-item small{{font-weight:900;color:var(--secondary)}}.v6-item strong{{font-size:clamp(18px,2vw,26px);line-height:1.4}}.v6-proof-poster{{position:relative;background:var(--secondary);color:#fff}}.v6-proof-poster p{{max-width:1000px;font:600 clamp(30px,5vw,68px)/1.16 var(--heading)}}.v6-proof-poster b{{position:absolute;right:5vw;bottom:2vw;font-size:180px;opacity:.16}}.v6-next-line{{display:grid;grid-template-columns:180px 1fr}}.v6-next-line p{{margin:0;font-size:clamp(20px,2.6vw,34px)}}
    .v6-book-cover{{min-height:92svh;padding:150px max(6vw,28px) 80px;background:var(--paper);display:grid;grid-template-columns:120px minmax(0,.72fr) minmax(360px,.8fr);gap:4vw;align-items:end;border-bottom:1px solid var(--line)}}.v6-book-number{{align-self:start;font:800 12px/1.5 monospace}}.v6-book-cover .visual-stage{{min-height:620px;border:0}}.v6-book{{display:grid;grid-template-columns:240px 1fr;max-width:1440px;margin:auto}}.v6-book>aside{{position:sticky;top:0;height:100svh;padding:50px 28px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:18px}}.v6-book>aside a{{text-decoration:none;font-size:11px;letter-spacing:.1em}}.v6-book-pages{{min-width:0}}.v6-chapter{{padding:clamp(100px,12vw,180px) clamp(40px,8vw,120px);border-bottom:1px solid var(--line)}}.v6-chapter>span,.v6-book-end span{{font:850 11px/1 var(--body);letter-spacing:.16em;color:var(--secondary)}}.v6-chapter>p{{max-width:760px;font-size:clamp(18px,1.7vw,22px);line-height:1.8}}.v6-chapter-dark{{background:var(--ink);color:#fff}}.v6-evidence-stack{{margin-top:70px;border-top:1px solid currentColor}}.v6-columns{{display:grid;grid-template-columns:.65fr 1.35fr;gap:6vw;margin-bottom:80px}}.v6-columns p{{font-size:clamp(19px,2vw,26px)}}.v6-evidence{{padding:26px 0;border-top:1px solid currentColor;display:grid;grid-template-columns:150px 1fr;gap:30px}}.v6-evidence span{{font-size:10px;letter-spacing:.14em}}.v6-evidence p{{margin:0;font-size:clamp(18px,1.8vw,24px)}}.v6-book-end{{padding:90px clamp(40px,8vw,120px);background:var(--accent)}}.v6-book-end p{{font:600 clamp(28px,4vw,54px)/1.25 var(--heading)}}
    .v6-product-hero{{min-height:100svh;margin:16px;padding:130px 0 60px;border-radius:36px;background:var(--ink);color:#fff;overflow:hidden}}.v6-product-hero>.shell{{display:grid;grid-template-columns:minmax(0,.8fr) minmax(420px,1.2fr);gap:6vw;align-items:center}}.v6-product-main{{padding:16px}}.v6-product-main>section{{margin:16px 0;padding:clamp(70px,8vw,120px);border-radius:32px;background:var(--soft)}}.v6-product-intro{{display:grid;grid-template-columns:160px 1.1fr .9fr;gap:4vw}}.v6-product-intro p{{font-size:clamp(18px,1.7vw,22px)}}.v6-product-board{{background:var(--paper)!important;border:1px solid var(--line)}}.v6-product-board header,.v6-product-proof header{{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:60px}}.v6-bento{{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}}.v6-bento .v6-item{{grid-column:span 6;min-height:170px;border:0;border-radius:20px;background:var(--paper)}}.v6-bento .v6-item:nth-child(3n+1){{grid-column:span 8}}.v6-bento .v6-item:nth-child(3n+2){{grid-column:span 4}}.v6-product-case{{display:grid;grid-template-columns:.8fr 1.2fr;gap:8vw;background:var(--ink)!important;color:#fff}}.v6-product-case p{{font:500 clamp(24px,3vw,42px)/1.5 var(--heading)}}.v6-product-proof{{background:var(--paper)!important;border:1px solid var(--line)}}.v6-product-next{{display:grid;grid-template-columns:160px 1fr;background:var(--accent)!important}}.v6-product-next strong{{font:600 clamp(28px,4vw,52px)/1.3 var(--heading)}}
    .v6-film-hero{{position:relative;min-height:100svh;background:var(--ink);color:#fff;overflow:hidden}}.v6-film-hero>.visual-stage{{position:absolute;inset:0;min-height:100%;border:0;opacity:.68}}.v6-film-copy{{position:relative;z-index:2;width:min(720px,72%);padding:22vh 0 12vh 8vw}}.v6-film-caption{{position:absolute;z-index:3;right:24px;bottom:22px;font:800 10px/1 monospace;letter-spacing:.16em}}.v6-story>section{{padding:clamp(100px,13vw,190px) max(8vw,28px)}}.v6-story-opening{{background:var(--paper)}}.v6-story-opening>span,.v6-story-scene span,.v6-story-track span,.v6-story-ending span{{font:850 11px/1 var(--body);letter-spacing:.16em;color:var(--secondary)}}.v6-story-opening p{{max-width:1100px;font:500 clamp(34px,6vw,78px)/1.2 var(--heading)}}.v6-story-scene{{display:grid;grid-template-columns:160px 1fr;gap:5vw;background:var(--ink);color:#fff}}.v6-scene-no{{font:500 clamp(70px,10vw,150px)/.8 var(--heading);color:var(--accent)}}.v6-story-scene>div:last-child{{max-width:820px}}.v6-story-scene p{{font-size:clamp(18px,2vw,25px);line-height:1.8}}.v6-story-track header{{max-width:900px;margin-bottom:80px}}.v6-story-track .v6-item{{margin-left:15vw;border-top:1px solid var(--line);border-bottom:0}}.v6-story-proof{{background:var(--secondary)}}.v6-story-ending{{background:var(--accent)}}.v6-story-ending p{{max-width:1000px;font:600 clamp(30px,5vw,66px)/1.2 var(--heading)}}.v6-story-ending b{{font-size:11px;letter-spacing:.2em}}
    .v6-atlas-hero{{min-height:88svh;padding:130px 4vw 50px;background:var(--ink);color:#fff;display:grid;grid-template-columns:minmax(0,.85fr) minmax(420px,1.15fr);gap:3vw}}.v6-atlas-visual .visual-stage{{min-height:100%;border:1px solid rgba(255,255,255,.3)}}.v6-atlas{{padding:14px;background:var(--paper)}}.v6-atlas-bar{{display:flex;justify-content:space-between;padding:14px 4px;font:800 10px/1 monospace;letter-spacing:.12em;border-bottom:1px solid var(--line)}}.v6-atlas-grid{{display:grid;grid-template-columns:2fr 1fr 1fr;gap:14px;margin-top:14px}}.v6-atlas-grid>article,.v6-atlas-process,.v6-atlas-evidence,.v6-atlas-footer{{padding:clamp(34px,5vw,76px);border:1px solid var(--line);background:var(--paper)}}.v6-atlas-grid span,.v6-atlas-process span,.v6-atlas-evidence span,.v6-atlas-footer span{{font:800 10px/1 monospace;letter-spacing:.12em;color:var(--secondary)}}.v6-atlas-grid p{{font-size:clamp(17px,1.6vw,21px)}}.v6-atlas-process,.v6-atlas-evidence{{margin-top:14px;display:grid;grid-template-columns:280px 1fr 1fr;gap:0}}.v6-atlas-process header,.v6-atlas-evidence header{{padding-right:40px}}.v6-atlas-process .v6-item,.v6-atlas-evidence .v6-evidence{{display:block;border:1px solid var(--line);padding:24px}}.v6-atlas-footer{{margin-top:14px;display:grid;grid-template-columns:280px 1fr}}.v6-atlas-footer p{{font:600 clamp(26px,4vw,50px)/1.25 var(--heading);margin:0}}
    @media(max-width:760px){{.shell{{width:min(100% - 28px,1184px)}}.site-nav{{padding:18px 0}}.nav-index{{display:none}}.hero,.hero.editorial,.hero.poster,body.composition-product .hero,body.composition-narrative .hero{{min-height:auto;padding:104px 0 56px;margin:0;border-radius:0}}.hero-grid,.hero.editorial .hero-grid,body.composition-product .hero-grid{{display:grid;grid-template-columns:1fr;gap:36px}}body.composition-narrative .hero-copy{{width:100%}}body.composition-narrative .visual-stage{{position:relative;inset:auto;min-height:290px;opacity:1;mix-blend-mode:normal;margin-top:36px}}body.composition-narrative .page-section{{padding:82px 0}}body.composition-narrative .evidence{{grid-template-columns:1fr;gap:10px}}.hero.editorial .hero-copy,.hero.editorial .visual-stage{{grid-column:auto;grid-row:auto}}.hero.poster .visual-stage{{position:relative;right:auto;bottom:auto;opacity:1}}.hero h1,.hero.poster h1,.hero.editorial h1{{font-size:clamp(42px,13vw,60px);line-height:1.02;overflow-wrap:anywhere}}.hero h1.type-medium,.hero h1.type-long{{font-size:clamp(36px,11vw,50px)}}.hero.centered{{text-align:left}}.hero.centered .eyebrow,.hero.centered .hero-meta{{justify-content:flex-start}}.visual-stage,.visual-ledger{{min-height:300px}}body.archetype-editorial .visual-stage,body.archetype-playful .visual-stage{{transform:none}}.section-head{{grid-template-columns:1fr;gap:16px;margin-bottom:38px}}h2,body.composition-narrative .section-head h2{{font-size:clamp(34px,9.8vw,46px);line-height:1.14}}h2.type-medium,body.composition-narrative .section-head h2.type-medium{{font-size:clamp(31px,8.8vw,41px)}}h2.type-long,body.composition-narrative .section-head h2.type-long{{font-size:clamp(27px,7.7vw,36px);line-height:1.24}}.narrative-grid{{grid-template-columns:1fr;gap:36px}}.pull-quote{{position:static;font-size:clamp(28px,8vw,40px)}}.evidence,.case-card,.case-card:nth-child(n){{grid-column:span 12;min-height:auto}}.feature{{grid-template-columns:48px 1fr;padding:22px 0}}.image-row{{grid-template-columns:1fr}}.image-row .editorial-image:nth-child(2){{margin-top:0}}.editorial-image,.editorial-image img{{min-height:280px}}main{{display:block;padding:0}}.page-section{{margin:0;border-radius:0;box-shadow:none}}footer .shell{{display:block}}footer .shell span{{display:block;margin-top:8px}}}}@media(prefers-reduced-motion:reduce){{*{{scroll-behavior:auto!important}}.reveal{{opacity:1;transform:none;transition:none}}}}
    @media(max-width:760px){{.v6-campaign-hero,.v6-book-cover,.v6-product-hero>.shell,.v6-atlas-hero{{display:grid;grid-template-columns:1fr;min-height:auto;padding:110px 20px 54px;margin:0;border-radius:0}}.v6-campaign-art .visual-stage,.v6-book-cover .visual-stage,.v6-product-hero .visual-stage,.v6-atlas-visual .visual-stage{{min-height:300px;margin-top:28px;transform:none;box-shadow:none}}.v6-book-number{{display:none}}.v6-campaign-main>section,.v6-story>section,.v6-chapter,.v6-book-end,.v6-product-main>section{{padding:72px 20px;margin:0;border-radius:0}}.v6-campaign-split,.v6-product-intro,.v6-product-case,.v6-product-next,.v6-story-scene,.v6-columns,.v6-next-line{{grid-template-columns:1fr;gap:28px}}.v6-campaign-list header,.v6-product-board header,.v6-product-proof header{{display:block;margin-bottom:38px}}.v6-campaign-list>div,.v6-bento{{display:block}}.v6-book{{display:block}}.v6-book>aside{{display:none}}.v6-evidence,.v6-item{{grid-template-columns:42px 1fr;gap:14px;padding:22px 0}}.v6-product-main{{padding:0}}.v6-bento .v6-item{{min-height:auto;margin-bottom:10px;padding:22px}}.v6-film-hero{{min-height:auto;padding-top:90px}}.v6-film-hero>.visual-stage{{position:relative;min-height:320px;opacity:1}}.v6-film-copy{{width:100%;padding:50px 20px 70px}}.v6-story-track .v6-item{{margin-left:0}}.v6-scene-no{{font-size:68px}}.v6-atlas-grid,.v6-atlas-process,.v6-atlas-evidence,.v6-atlas-footer{{display:block;margin-top:10px}}.v6-atlas-grid>article,.v6-atlas-process,.v6-atlas-evidence,.v6-atlas-footer{{padding:42px 20px}}.v6-atlas-bar{{overflow:auto;gap:24px}}.v6-atlas-process header,.v6-atlas-evidence header{{margin-bottom:36px}}}}
    """
    css += ".v6-atlas-hero{overflow:hidden}.v6-atlas{overflow:hidden}.v6-atlas-title,.v6-atlas-visual,.v6-atlas-grid>*,.v6-atlas-process>*,.v6-atlas-evidence>*{min-width:0}.v6-atlas-title h1{white-space:normal!important;overflow-wrap:anywhere}"
    logo = _image_figure("Img_files_logo_01.png", "로고", "brand-logo") if include_logo else ""
    brand_logo = '<img src="Img_files_logo_01.png" alt="로고" onerror="this.remove()">' if include_logo else ""
    word_markup = "".join(f"<span>{_e(word)}</span>" for word in visual_words)
    if site_images:
        visual = f'<figure class="visual-stage has-image"><img src="{_e(site_images[0])}" alt="대표 이미지"><figcaption class="visual-caption"><small>{_e(art["label"])}</small><strong>{_e(visual_words[0] if visual_words else art["label"])}</strong></figcaption></figure>'
    else:
        visual = _generated_visual(visual_words, mode, archetype, variant_index, direction, seed)
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
        content_context = {
            "brand": name, "eyebrow": field or "CAREER PORTFOLIO", "lead": intro,
            "meta": [role, major], "problem": strengths,
            "solution": projects, "items": project_items,
            "proof": " ".join(experience), "evidence": experience,
            "next": education or intro,
        }
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
        content_context = {
            "brand": project, "eyebrow": industry, "lead": intro,
            "meta": [team or "PCU STARTUP", "서비스 운영 중" if commercialized == "yes" else "서비스 준비 중"],
            "problem": problem, "solution": solution, "items": solution_items or activities,
            "proof": achievement, "evidence": _sentences(achievement, 5) if achievement else activities,
            "next": learning or intro,
        }
        if site_purpose == "customer":
            body = f"""<nav class="site-nav"><div class="shell"><div class="brand">{brand_logo}{_e(project)}</div><div class="nav-index">SERVICE / BRAND</div></div></nav>
            <header class="hero {hero_style}"><div class="shell hero-grid"><div class="hero-copy"><div class="eyebrow">{_e(industry)}</div><h1>{_e(project)}</h1><p class="lead">{_e(intro)}</p><div class="hero-meta"><span>{_e(team or 'PCU STARTUP')}</span><span>{_e('서비스 운영 중' if commercialized == 'yes' else '서비스 준비 중')}</span></div></div>{visual}</div></header>
            <main><section class="page-section"><div class="shell reveal"><div class="section-head"><span class="section-index">01 / VALUE</span><div><h2>{_e(intro)}</h2><p class="section-intro">{_e(solution)}</p></div></div></div></section>
            <section class="page-section dark"><div class="shell reveal"><div class="section-head"><span class="section-index">02 / HOW IT WORKS</span><div><h2>서비스는 이렇게<br>작동합니다</h2></div></div><div class="feature-list">{''.join(f'<div class="feature"><strong>{_e(item)}</strong></div>' for item in solution_items) or '<div class="feature"><strong>서비스 이용 흐름을 준비하고 있습니다.</strong></div>'}</div></div></section>
            <section class="page-section"><div class="shell reveal"><div class="narrative-grid"><div><span class="section-index">03 / WHY</span><p class="pull-quote">왜 이 서비스가<br>필요한가</p></div><div><h2>지금 바꿔야 할 장면</h2><p class="copy">{_e(problem)}</p></div></div>{_image_figure('Img_files_banner_01.jpg',project+' 서비스 이미지',source=site_images[0] if site_images else '') if image_count or site_images else ''}</div></section>
            {f'<section class="page-section dark"><div class="shell reveal"><div class="section-head"><span class="section-index">04 / PROOF</span><div><h2>확인한 가능성</h2><p class="section-intro">{_e(achievement)}</p></div></div></div></section>' if achievement else ''}
            <section class="page-section"><div class="shell reveal"><div class="section-head"><span class="section-index">05 / BUILDING</span><div><h2>다음 경험을<br>준비합니다</h2><p class="section-intro">{_e(learning or '서비스의 다음 단계를 준비하고 있습니다.')}</p></div></div><div class="tag-cloud">{''.join(f'<span class="tag">{_e(item)}</span>' for item in activities)}</div></div></section></main>"""
        else:
            body = f"""<nav class="site-nav"><div class="shell"><div class="brand">{brand_logo}{_e(project)}</div><div class="nav-index">STARTUP / {'PITCH' if site_purpose == 'pitch' else 'ACTIVITY'}</div></div></nav>
            <header class="hero {hero_style}"><div class="shell hero-grid"><div class="hero-copy"><div class="eyebrow">{_e(industry)}</div><h1>{_e(project)}</h1><p class="lead">{_e(intro)}</p><div class="hero-meta"><span>{_e(team or '창업동아리')}</span></div></div>{visual}</div></header>
            <main><section class="page-section"><div class="shell reveal"><div class="narrative-grid"><div><span class="section-index">01 / CONTEXT</span><p class="pull-quote">우리가 주목한<br>변화의 시작</p></div><div><h2>문제와 기회</h2><p class="copy">{_e(problem)}</p></div></div></div></section>
            <section class="page-section dark"><div class="shell reveal"><div class="section-head"><span class="section-index">02 / SOLUTION</span><div><h2>제안하는 해결 방식</h2><p class="section-intro">{_e(solution)}</p></div></div><div class="evidence-grid">{''.join(f'<article class="evidence"><small>POINT {index:02d}</small><b>{_e(item)}</b></article>' for index,item in enumerate(solution_items,1))}</div></div></section>
            <section class="page-section"><div class="shell reveal"><div class="section-head"><span class="section-index">03 / PROCESS</span><div><h2>실행과 검증</h2></div></div><div class="feature-list">{''.join(f'<div class="feature"><strong>{_e(item)}</strong></div>' for item in activities)}</div></div></section>
            <section class="page-section statement"><div class="shell reveal"><span class="section-index">04 / PROOF</span><p>{_e(achievement or learning or intro)}</p><b class="mark">✦</b></div></section></main>"""
        default_footer = "본 프로젝트는 배재대학교 창업지원단의 지원을 받았습니다."
    if mode == "career" or site_purpose == "customer":
        body, structure_family = _compose_v6(mode, direction, content_context, visual, brand_logo)
    else:
        structure_family = "legacy-pitch"
    if bool(options.get("includeFooter", True)):
        footer_text = str(options.get("footerText", "")).strip() or default_footer
        body += f'<footer><div class="shell">{_e(footer_text)}<span>© 2026 PCU Student Project</span></div></footer>'
    metadata = {"engineVersion": "6.0", "design": design, "designName": DESIGN_CONCEPTS[design], "layout": layout, "layoutName": LAYOUTS[layout], "palette": palette_index, "paletteName": palette[0], "typography": type_index, "typographyName": typography[0], "archetype": archetype, "composition": composition, "variantIndex": variant_index, "sitePurpose": site_purpose, "artDirectionKey": direction, "artDirectionName": ART_DIRECTIONS[direction], "structureFamily": structure_family, "artDirection": str(planner.get("artDirection") or art["label"])[:200], "heroStyle": hero_style, "sectionStyle": section_style, "careerAssessmentUsed": bool(career_assessment), "careerBasis": _get(data, "진로 설계 기준") if mode == "career" else "not_applicable"}
    meta_text = _e(" · ".join((metadata["artDirectionName"], metadata["paletteName"], metadata["typographyName"])))
    document = f'<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator" content="PCU Design Engine v6"><meta name="design-system" content="{meta_text}"><title>{_e(title)}</title><style>{css}</style></head><body class="mode-{_e(mode)} archetype-{archetype} composition-{composition} direction-{direction} structure-{structure_family} sections-{_e(section_style)} density-{_e(density)}">{body}<script>document.querySelectorAll("h1,h2,.statement p,.v6-proof-poster p,.v6-story-opening p,.v6-story-ending p").forEach(element=>{{const count=Array.from(element.textContent.trim()).length;element.classList.add(count>=36?"type-long":count>=18?"type-medium":"type-short")}});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{{if(entry.isIntersecting){{entry.target.classList.add(\'on\');observer.unobserve(entry.target)}}}}),{{threshold:.12}});document.querySelectorAll(\'.reveal\').forEach(element=>observer.observe(element));</script></body></html>'
    metadata["qualityAudit"] = _quality_audit(document, mode, palette, data, site_purpose)
    return document, title, metadata
