#!/usr/bin/env python3
"""Bake Trovelo Help: one page per article, plus the lists that point at them.

The articles live in scripts/help_articles.py: their text, their steps and the
screenshots each step shows. This script writes, from that one file:

- help/<slug>/index.html for every article,
- the "Start here", topic lists and "New in Trovelo" blocks of help/index.html
  (between their <!-- name --> … <!-- /name --> markers),
- the search index (ARTICLES) in help/help.js,
- the help addresses in sitemap.xml.

The menu at the top and the footer are copied from help/index.html, so a
change there reaches every article on the next run. Run after every edit:

    python3 scripts/build_help.py
"""

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from help_articles import ARTICLES, NEWS, START_HERE, TOPICS  # noqa: E402

SITE = "https://troveloapp.com"
HOME = ROOT / "help" / "index.html"
JS = ROOT / "help" / "help.js"
SITEMAP = ROOT / "sitemap.xml"
SHOTS = "/images/trovelo/help/"
FRAME = "/images/trovelo/iphone-18-pro.webp"

TOPIC = {t["slug"]: t for t in TOPICS}
BY_SLUG = {a["slug"]: a for a in ARTICLES}
DEVICE_NAMES = {"iphone": "iPhone", "ipad": "iPad", "mac": "Mac"}
MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()


def esc(s):
    return html.escape(s, quote=True)


def plain(s):
    """Article text may carry <b> and links; meta tags and the index can't."""
    return html.unescape(re.sub(r"<[^>]+>", "", s))


def url(a):
    return f"/help/{a['slug']}/"


def nice_date(iso):
    y, m, d = iso.split("-")
    return f"{MONTHS[int(m) - 1]} {int(d)}, {y}"


def tile(t, extra=""):
    return (f'<span class="tile" style="--tile: {t["tile"]}; --ac: {t["accent"]}{extra}">'
            f'<span class="sf {t["icon"]}"></span></span>')


# ── The pieces of the page shared with the Help home ────────────────────

home_src = HOME.read_text(encoding="utf-8")
m = re.search(r'<nav class="tn".*?<div class="tn-dim" hidden></div>', home_src, re.S)
if not m:
    sys.exit("Couldn't find the menu (<nav class=\"tn\"> … tn-dim) in help/index.html")
NAV = m.group(0)
m = re.search(r'<footer class="tf">.*?</footer>', home_src, re.S)
if not m:
    sys.exit("Couldn't find the footer in help/index.html")
FOOTER = m.group(0)


# ── One step's picture ───────────────────────────────────────────────────

def marks_html(marks, start):
    out, n = [], start
    for mk in marks:
        x, y, w, h = mk[:4]
        cls = " ".join(["mk"] + (mk[4].split() if len(mk) > 4 else []))
        out.append(f'            <span class="{cls}" style="--x: {x}; --y: {y}; --mw: {w}; --mh: {h}"><b>{n}</b></span>')
        n += 1
    return out, n


def phone_html(p, n, lazy):
    crop = p.get("crop")
    cls = "ph" + (" crop" if crop == "top" else " crop low" if crop == "bottom" else "")
    load = ' loading="lazy"' if lazy else ""
    lines = [f'          <figure class="{cls}">',
             f'            <div class="scr"><img src="{SHOTS}{p["img"]}" alt="{esc(p["alt"])}"{load}></div>',
             f'            <img class="frame" src="{FRAME}" alt="">']
    marks, n = marks_html(p.get("marks", []), n)
    lines += marks + ["          </figure>"]
    return lines, n


def stage_html(step, lazy):
    if "phones" in step:
        phones = step["phones"]
        cls = ["stage"]
        if len(phones) == 2:
            cls.append("two")
        if any(not p.get("crop") for p in phones):
            cls.append("full")
        if all(p.get("crop") == "bottom" for p in phones):
            cls.append("low")
        lines, n = [f'        <div class="{" ".join(cls)}">'], 1
        for i, p in enumerate(phones):
            part, n = phone_html(p, n, lazy or i > 0)
            lines += part
        return lines + ["        </div>"]
    if "mac" in step:
        mac = step["mac"]
        load = ' loading="lazy"' if lazy else ""
        lines = ['        <div class="mac">', '          <div class="mac-shot">',
                 f'            <img src="{SHOTS}{mac["img"]}" alt="{esc(mac["alt"])}"{load}>']
        for i, r in enumerate(mac.get("rings", []), 1):
            if isinstance(r, str):
                style = r
            else:
                left, top, w, h = r
                style = (f"left: calc({left}% - 5px); top: calc({top}% - 5px); "
                         f"width: calc({w}% + 10px); height: calc({h}% + 10px)")
            lines.append(f'            <span class="ring" style="{style}"><b>{i}</b></span>')
        return lines + ["          </div>", "        </div>"]
    if "ranks" in step:
        lines = [f'        <ol class="ranks" aria-label="{esc(step.get("ranks_label", "Ranks"))}">']
        for name, need in step["ranks"]:
            lines.append(f"          <li><b>{esc(name)}</b>{esc(need)}</li>")
        return lines + ["        </ol>"]
    if "keys" in step:
        lines = [f'        <div class="keys" aria-label="{esc(step.get("keys_label", "Keyboard shortcuts"))}">']
        for keys, label in step["keys"]:
            kbd = "".join(f"<kbd>{esc(k)}</kbd>" for k in keys)
            lines.append(f"          <span>{kbd}{esc(label)}</span>")
        return lines + ["        </div>"]
    return []


def step_html(step, n, prefix, lazy):
    lines = [f'      <section class="step" id="{prefix}-{n}">',
             f'        <div class="step-h"><span class="num">{n}</span><div>',
             f'          <h2>{step["title"]}</h2>',
             f'          <p>{step["text"]}</p>',
             "        </div></div>"]
    lines += stage_html(step, lazy)
    if step.get("legend"):
        items = "".join(f"<span><b>{i}</b>{label}</span>" for i, label in enumerate(step["legend"], 1))
        lines.append(f'        <div class="legend">{items}</div>')
    lines.append("      </section>")
    return lines


# ── An article ───────────────────────────────────────────────────────────

def related(a):
    """Three articles to go on with: the ones named, else the same topic, else the next topics."""
    names = [s for s in a.get("related", []) if s in BY_SLUG and s != a["slug"]]
    pool = [x["slug"] for x in ARTICLES if x["topic"] == a["topic"]]
    order = [t["slug"] for t in TOPICS]
    i = order.index(a["topic"])
    pool += [x["slug"] for t in order[i + 1:] + order[:i] for x in ARTICLES if x["topic"] == t]
    for s in pool:
        if len(names) >= 3:
            break
        if s != a["slug"] and s not in names:
            names.append(s)
    return [BY_SLUG[s] for s in names[:3]]


def article_html(a):
    t = TOPIC[a["topic"]]
    link = SITE + url(a)
    title = f'{a["title"]} · Trovelo Help'
    ios, mac = a.get("ios", []), a.get("mac", [])
    devices = a.get("devices", ["iphone", "ipad", "mac"] if mac else ["iphone", "ipad"])
    systems = ", ".join(s for d, s in [("iphone", "iOS"), ("ipad", "iPadOS"), ("mac", "macOS")] if d in devices)
    j = lambda v: json.dumps(v, ensure_ascii=False)
    crumbs = [("Trovelo", f"{SITE}/"), ("Help", f"{SITE}/help/"), (plain(a["title"]), link)]
    ld_text = "\n".join([
        "{",
        '  "@context": "https://schema.org",',
        '  "@type": "TechArticle",',
        f'  "@id": {j(link)},',
        f'  "url": {j(link)},',
        f'  "headline": {j(plain(a["title"]))},',
        f'  "description": {j(plain(a["description"]))},',
        f'  "dateModified": {j(a["updated"])},',
        '  "inLanguage": "en",',
        '  "author": {"@type": "Person", "name": "Eduardo Pinillos"},',
        f'  "about": {{"@type": "SoftwareApplication", "name": "Trovelo", "operatingSystem": {j(systems)}}},',
        f'  "isPartOf": {{"@id": "{SITE}/#website"}},',
        '  "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [',
        ",\n".join(f'    {{"@type": "ListItem", "position": {i}, "name": {j(n)}, "item": {j(u)}}}'
                   for i, (n, u) in enumerate(crumbs, 1)),
        "  ]}",
        "}",
    ])

    L = [
        "<!DOCTYPE html>", '<html lang="en">', "<head>",
        '<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="apple-itunes-app" content="app-id=6760258252">',
        f"<title>{esc(plain(title))}</title>",
        f'<meta name="description" content="{esc(plain(a["description"]))}">',
        f'<link rel="canonical" href="{link}">',
        '<meta property="og:type" content="article">',
        f'<meta property="og:url" content="{link}">',
        f'<meta property="og:title" content="{esc(plain(title))}">',
        f'<meta property="og:description" content="{esc(plain(a.get("og", a["description"])))}">',
        f'<meta property="og:image" content="{SITE}/images/trovelo/og.png">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:locale" content="en_US">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:image" content="{SITE}/images/trovelo/og.png">',
        '<link rel="icon" type="image/png" href="/images/trovelo/app-icon.png">',
        '<link rel="stylesheet" href="/site.css">',
        '<link rel="stylesheet" href="/help/help.css">',
        '<script type="application/ld+json">', ld_text, "</script>",
        "</head>", "<body>",
        '<a class="skip" href="#main">Skip to content</a>', "", NAV, "",
        '<div class="wrap doc" style="max-width: 1320px">',
        '  <nav class="side" aria-label="Topics">',
        '    <p class="side-h">TOPICS</p>',
    ]
    for tt in TOPICS:
        cur = ' aria-current="true"' if tt["slug"] == a["topic"] else ""
        L.append(f'    <a href="/help/#{tt["slug"]}"{cur}>{tile(tt)}{esc(tt["name"])}</a>')
    L += [
        "  </nav>", "",
        '  <main id="main">',
        '    <div class="doc-top">',
        '      <div class="crumbs">',
        '        <a href="/help/">Help</a><span class="sf i-chev" aria-hidden="true"></span>',
        f'        <a class="cur" href="/help/#{t["slug"]}" style="color: {t["ink"]}">{tile(t)}{esc(t["name"])}</a>',
        "      </div>",
        '      <form class="mini-search" action="/help/" method="get" role="search">',
        '        <span class="sf i-search" aria-hidden="true"></span>',
        '        <label class="vh" for="mq">Search help</label>',
        '        <input id="mq" name="q" type="search" placeholder="Search help">',
        "      </form>",
        "    </div>",
        f'    <h1>{a["title"]}</h1>',
        f'    <p class="lead">{a["lead"]}</p>',
        '    <div class="doc-meta">',
        f'      <span><span class="sf i-clock"></span>{a["minutes"]} min read</span>',
        f'      <span>Updated {nice_date(a["updated"])}</span>',
    ]
    for d in devices:
        L.append(f'      <span class="dev"><span class="sf i-{d}"></span>{DEVICE_NAMES[d]}</span>')
    L.append("    </div>")

    panels = []
    if ios:
        ios_name = "iPhone &amp; iPad" if "ipad" in devices else "iPhone"
        panels.append(("ios-steps", "tab-ios", "i-iphone", ios_name, "step", ios))
    if mac:
        panels.append(("mac-steps", "tab-mac", "i-mac", "Mac", "mac", mac))
    if len(panels) > 1:
        L += ["", '    <div class="tabs" role="tablist" aria-label="Device">']
        for i, (pid, tid, icon, name, _, _) in enumerate(panels):
            extra = ' aria-selected="true"' if i == 0 else ' aria-selected="false" tabindex="-1"'
            L.append(f'      <button class="tab" type="button" role="tab" id="{tid}" aria-controls="{pid}"{extra}>'
                     f'<span class="sf {icon}"></span>{name}</button>')
        L.append("    </div>")
    first_shot = True
    for pid, tid, _, _, prefix, steps in panels:
        role = f' role="tabpanel" aria-labelledby="{tid}"' if len(panels) > 1 else ""
        L += ["", f'    <div class="steps" id="{pid}"{role}>']
        for i, step in enumerate(steps, 1):
            if i > 1:
                L.append("")
            L += step_html(step, i, prefix, lazy=not first_shot)
            if "phones" in step or "mac" in step:
                first_shot = False
        L.append("    </div>")

    if a.get("tips"):
        L += ["", '    <section class="tips">', '      <h2><span class="sf i-bulb"></span>Good to know</h2>']
        for icon, text in a["tips"]:
            L.append(f'      <div class="tip"><span class="sf {icon}"></span><p>{text}</p></div>')
        L.append("    </section>")

    L += [
        "",
        '    <section class="vote" aria-live="polite">',
        '      <div class="mascot" aria-hidden="true">',
        '        <img src="/images/trovelo/help/mascot-neutral.svg" alt="" data-mood="base" width="110" height="119" loading="lazy">',
        '        <img src="/images/trovelo/help/mascot-cheer.svg" alt="" data-mood="yes" width="110" height="119" hidden>',
        '        <img src="/images/trovelo/help/mascot-sad.svg" alt="" data-mood="no" width="110" height="119" hidden>',
        "      </div>",
        '      <div class="vote-q">',
        "        <h2>Was this helpful?</h2>",
        '        <div class="vote-btns">',
        '          <button type="button" data-vote="yes"><span class="sf i-up"></span>Yes</button>',
        '          <button type="button" data-vote="no"><span class="sf i-down"></span>No</button>',
        "        </div>",
        "      </div>",
        '      <p class="vote-a" data-answer="yes" tabindex="-1" hidden>Great, thanks! Happy travels.</p>',
        '      <p class="vote-a" data-answer="no" tabindex="-1" hidden>Sorry about that. Tell me what was missing on '
        '<a href="https://www.reddit.com/r/trovelo/">r/trovelo</a> and I’ll fix this page.</p>',
        "    </section>",
        "",
        '    <section class="more">',
        "      <h2>Keep going</h2>",
        '      <div class="more-grid">',
    ]
    for r in related(a):
        img, pos = r["thumb"]
        L.append(f'        <a class="more-card" href="{url(r)}"><img src="{SHOTS}{img}" alt="" '
                 f'style="object-position: {pos}" loading="lazy"><div><b>{r["title"]}</b>'
                 f'<small>{esc(TOPIC[r["topic"]]["name"])}</small></div></a>')
    L += [
        "      </div>",
        '      <a class="all-topics" href="/help/#topics">See all topics<span class="sf i-chev"></span></a>',
        "    </section>",
        "  </main>",
        "",
        '  <aside class="rail" aria-label="In this article">',
        '    <p class="side-h">IN THIS ARTICLE</p>',
    ]
    for pid, _, _, _, prefix, steps in panels:
        hidden = " hidden" if pid != panels[0][0] else ""
        L.append(f'    <nav class="toc" data-toc="{pid}"{hidden}>')
        for i, step in enumerate(steps, 1):
            L.append(f'      <a href="#{prefix}-{i}"><i>{i}</i>{plain(step["title"])}</a>')
        L.append("    </nav>")
    L += [
        '    <div class="stuck">',
        "      <b>Still stuck?</b>",
        "      <p>A real person reads every message.</p>",
        '      <a href="https://www.reddit.com/r/trovelo/"><span class="sf i-chat"></span>Ask on r/trovelo</a>',
        "    </div>",
        "  </aside>",
        "</div>",
        "",
        FOOTER,
        "",
        '<script src="/site.js" defer></script>',
        '<script src="/help/help.js" defer></script>',
        "</body>",
        "</html>",
        "",
    ]
    return "\n".join(L)


# ── The Help home's lists ────────────────────────────────────────────────

def steps_count(a):
    return len(a.get("ios") or a.get("mac") or [])


def start_here_html():
    L = []
    for s in START_HERE:
        a = BY_SLUG[s["slug"]]
        t = TOPIC[a["topic"]]
        L += [
            f'      <a class="tcard" href="{url(a)}">',
            f'        <div class="shot" style="background: {s.get("bg", t["tile"])}">',
            f'          <figure class="ph" style="--w: 220px; --c: 548; --ac: {t["accent"]}">',
            f'            <div class="scr"><img src="{SHOTS}{s["img"]}" alt="{esc(s["alt"])}" loading="lazy"></div>',
            f'            <img class="frame" src="{FRAME}" alt="">',
        ]
        L += marks_html(s.get("marks", []), 1)[0]
        L += [
            "          </figure>",
            "        </div>",
            '        <div class="body">',
            f'          <span class="kick" style="color: {s.get("kick", t["ink"])}">{esc(t["name"].upper())}</span>',
            f'          <span class="title">{a["title"]}</span>',
            f'          <span class="meta"><span class="sf i-clock"></span>{steps_count(a)} steps · {a["minutes"]} min</span>',
            "        </div>",
            "      </a>",
        ]
    return "\n".join(L)


def topics_html():
    L = []
    for t in TOPICS:
        L += [
            f'      <article class="topic" id="{t["slug"]}" style="--tile: {t["tile"]}; --ac: {t["accent"]}">',
            f'        <div class="topic-head"><span class="tile"><span class="sf {t["icon"]}"></span></span><h3>{esc(t["name"])}</h3></div>',
            "        <ul>",
        ]
        for a in ARTICLES:
            if a["topic"] == t["slug"] or t["slug"] in a.get("also", []):
                L.append(f'          <li><span class="sf i-doc"></span><a href="{url(a)}">{a["title"]}</a></li>')
        L += ["        </ul>", "      </article>"]
    return "\n".join(L)


def news_html():
    L = []
    for n in NEWS:
        a = BY_SLUG[n["slug"]]
        L += [
            f'      <a class="new" href="{url(a)}">',
            f'        <img src="{SHOTS}{n["img"]}" alt="" style="object-position: {n["pos"]}" loading="lazy">',
            f'        <div><span class="tag">NEW</span><b>{n["title"]}</b><p>{n["text"]}</p></div>',
            "      </a>",
        ]
    return "\n".join(L)


def put_block(src, name, body):
    pattern = re.compile(rf"(<!-- {name} -->\n).*?(\n\s*<!-- /{name} -->)", re.S)
    if not pattern.search(src):
        sys.exit(f"help/index.html has no <!-- {name} --> … <!-- /{name} --> block")
    return pattern.sub(lambda m: m.group(1) + body + m.group(2), src)


# ── Write everything ─────────────────────────────────────────────────────

def check():
    slugs = set()
    for a in ARTICLES:
        assert a["slug"] not in slugs, f"two articles called {a['slug']}"
        slugs.add(a["slug"])
        assert a["topic"] in TOPIC, f"{a['slug']}: no topic {a['topic']}"
        for step in a.get("ios", []) + a.get("mac", []):
            for p in step.get("phones", []):
                assert (ROOT / SHOTS.strip("/") / p["img"]).exists(), f"{a['slug']}: missing {p['img']}"
            if "mac" in step:
                assert (ROOT / SHOTS.strip("/") / step["mac"]["img"]).exists(), f"{a['slug']}: missing {step['mac']['img']}"
            marks = sum(len(p.get("marks", [])) for p in step.get("phones", [])) + len(step.get("mac", {}).get("rings", []))
            assert marks == len(step.get("legend", [])), f"{a['slug']}: “{plain(step['title'])}” has {marks} marks and {len(step.get('legend', []))} labels"
        assert (ROOT / SHOTS.strip("/") / a["thumb"][0]).exists(), f"{a['slug']}: missing thumb {a['thumb'][0]}"
        for text in [a["title"], a["lead"], a["description"]] + [s["title"] + s["text"] for s in a.get("ios", []) + a.get("mac", [])]:
            assert "—" not in text, f"{a['slug']}: no long dashes in copy"


def main():
    check()
    for a in ARTICLES:
        out = ROOT / "help" / a["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(article_html(a), encoding="utf-8")

    src = HOME.read_text(encoding="utf-8")
    src = put_block(src, "start-here", start_here_html())
    src = put_block(src, "topics", topics_html())
    src = put_block(src, "news", news_html())
    HOME.write_text(src, encoding="utf-8")

    index = ",\n".join(
        "    " + json.dumps([plain(a["title"]), TOPIC[a["topic"]]["name"], url(a), a["keywords"]], ensure_ascii=False)
        for a in ARTICLES)
    js = JS.read_text(encoding="utf-8")
    js, n = re.subn(r"(var ARTICLES = \[\n).*?(\n  \];)", lambda m: m.group(1) + index + m.group(2), js, flags=re.S)
    if n != 1:
        sys.exit("help/help.js has no 'var ARTICLES = [' … '];' block")
    JS.write_text(js, encoding="utf-8")

    sm = SITEMAP.read_text(encoding="utf-8")
    sm = re.sub(r"  <url><loc>https://troveloapp\.com/help/[^<]+</loc><lastmod>[^<]*</lastmod></url>\n", "", sm)
    newest = max(a["updated"] for a in ARTICLES)
    lines = [f"  <url><loc>{SITE}/help/</loc><lastmod>{newest}</lastmod></url>"]
    lines += [f"  <url><loc>{SITE}{url(a)}</loc><lastmod>{a['updated']}</lastmod></url>" for a in ARTICLES]
    sm = sm.replace(f"  <url><loc>{SITE}/support/</loc>", "\n".join(lines) + f"\n  <url><loc>{SITE}/support/</loc>", 1)
    SITEMAP.write_text(sm, encoding="utf-8")

    print(f"{len(ARTICLES)} articles written")


if __name__ == "__main__":
    main()
