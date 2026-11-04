#!/usr/bin/env python3
"""Bake Trovelo Help: one page per article, plus the lists that point at them.

The articles live in scripts/help_articles.py: their text, their steps and the
screenshots each step shows. This script writes, from that one file:

- help/<slug>/index.html for every article,
- the "Start here", topic lists and "New in Trovelo" blocks of help/index.html
  (between their <!-- name --> … <!-- /name --> markers),
- the search index in help/help.js,
- the help addresses in sitemap.xml.

The menu at the top and the footer are copied from help/index.html, so a
change there reaches every article on the next run.

Every other language is a help_<code>.py next to this script (help_es.py):
the same articles in that language, the screens from images/trovelo/help/<code>/
and the page's own words. Its pages go to <code>/help/. Each translated article
carries the fingerprint of the English text it was made from, so when an
English article changes, the build stops until its translations catch up:
nothing goes out half translated. Run after every edit:

    python3 scripts/build_help.py
"""

import copy
import hashlib
import html
import importlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from help_articles import ARTICLES, NEWS, START_HERE, TOPICS  # noqa: E402

LANGS = ["en", "es", "de", "fr", "it", "nl", "ja", "pt-BR", "ko", "zh-Hans", "zh-Hant", "sv", "da"]  # English first: every other language is made from it
TEXT_ONLY = False  # --check: a translation's words alone, before its screens exist

SITE = "https://troveloapp.com"
HOME = ROOT / "help" / "index.html"
JS = ROOT / "help" / "help.js"
SITEMAP = ROOT / "sitemap.xml"
SHOTS = "/images/trovelo/help/"
FRAME = "/images/trovelo/iphone-18-pro.webp"

DEVICE_NAMES = {"iphone": "iPhone", "ipad": "iPad", "mac": "Mac"}


def esc(s):
    return html.escape(s, quote=True)


def plain(s):
    """Article text may carry <b> and links; meta tags and the index can't."""
    return html.unescape(re.sub(r"<[^>]+>", "", s))


def tile(t, extra=""):
    return (f'<span class="tile" style="--tile: {t["tile"]}; --ac: {t["accent"]}{extra}">'
            f'<span class="sf {t["icon"]}"></span></span>')


def fingerprint(a):
    """The English words of an article, boiled down: a translation keeps the
    one it was made from, and the build compares them."""
    parts = [a["title"], a["description"], a.get("og", ""), a["lead"], a["keywords"]]
    for step in a.get("ios", []) + a.get("mac", []):
        parts += [step["title"], step["text"], step.get("keys_label", ""), step.get("ranks_label", "")]
        parts += [p["alt"] for p in step.get("phones", [])]
        parts += [step["mac"]["alt"]] if "mac" in step else []
        parts += step.get("legend", [])
        parts += [label for _, label in step.get("keys", [])]
        parts += [x for rank in step.get("ranks", []) for x in rank]
    parts += [text for _, text in a.get("tips", [])]
    return hashlib.sha1("\x1f".join(parts).encode()).hexdigest()[:8]


# ── A language: where its pages live and the words around the articles ────

class Lang:
    def __init__(self, code):
        self.code = code  # as in hreflang and <html lang>: "de", "pt-BR", "zh-Hans"
        self.slug = code.lower()  # in addresses and folders: "pt-br"
        self.file = f"help_{self.slug.replace('-', '_')}.py"  # help_pt_br.py
        self.mod = None if code == "en" else importlib.import_module(self.file[:-3])
        self.base = "/help/" if code == "en" else f"/{self.slug}/help/"
        self.locale = "en_US" if code == "en" else self.mod.LOCALE
        self.name = "English" if code == "en" else self.mod.NAME
        self.flag = "us" if code == "en" else self.mod.FLAG  # images/trovelo/flag-<flag>.png
        self.home = HOME if code == "en" else ROOT / self.slug / "help" / "index.html"
        self.shots = SHOTS if code == "en" else f"{SHOTS}{self.slug}/"
        self.short = getattr(self.mod, "SHORT", code.split("-")[0].upper())  # on the globe button
        self.missing = set()

    def t(self, s, **kw):
        """A fixed piece of the page, in this language."""
        if self.mod:
            if s not in self.mod.UI:
                self.missing.add(s)
            s = self.mod.UI.get(s, s)
        return s.format(**kw) if kw else s

    def date(self, iso):
        y, m, d = (int(x) for x in iso.split("-"))
        if self.mod:
            return self.mod.date(y, m, d)
        return f'{"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()[m - 1]} {d}, {y}'

    def url(self, a):
        return f"{self.base}{a['slug']}/"

    def links(self, s):
        """Links between help pages stay in this language."""
        if self.code == "en":
            return s
        s = re.sub(r'((?:href|action)=")/help/(?!help\.)', rf"\1{self.base}", s)
        return s.replace(f"{SITE}/help/", f"{SITE}{self.base}")


LANG = {code: Lang(code) for code in LANGS}


def alternates(path_of):
    """<link rel="alternate"> for one page in every language, English as the default."""
    L = [f'<link rel="alternate" hreflang="{c}" href="{SITE}{path_of(LANG[c])}">' for c in LANGS]
    return L + [f'<link rel="alternate" hreflang="x-default" href="{SITE}{path_of(LANG["en"])}">']


def switcher(lang, path_of):
    """The languages of this page, for the footer."""
    links = []
    for c in LANGS:
        other = LANG[c]
        cur = ' aria-current="page"' if c == lang.code else ""
        links.append(f'<a href="{path_of(other)}" hreflang="{c}" lang="{c}"{cur}>{other.name}</a>')
    return (f'<nav class="tf-lang" aria-label="{lang.t("Language")}"><span class="sf i-globe" aria-hidden="true"></span>'
            + "<i>·</i>".join(links) + "</nav>")


def put_langs(src, lang, path_of):
    src, n = re.subn(r"<!-- langs -->.*?<!-- /langs -->", lambda m: f"<!-- langs -->{switcher(lang, path_of)}<!-- /langs -->", src, flags=re.S)
    if n != 1:
        sys.exit(f"{lang.home.relative_to(ROOT)} has no <!-- langs --> … <!-- /langs --> in its footer")
    return src


def menu_langs(lang, path_of, where):
    """The globe in the menu at the top and the languages it opens, with
    their flags. The menu has it twice: in the bar on a wide screen and next
    to Menu on a phone, where the bar's links are folded away."""
    pid = "tn-langs" if where == "bar" else "tn-langs-m"
    links = []
    for c in LANGS:
        other = LANG[c]
        cur = ' aria-current="page"' if c == lang.code else ""
        links.append(f'<a href="{path_of(other)}" hreflang="{c}" lang="{c}"{cur}>'
                     f'<img src="/images/trovelo/flag-{other.flag}.png" alt="" width="24" height="18">{other.name}'
                     f'<span class="sf i-check" aria-hidden="true"></span></a>')
    return (f'<span class="tn-lw tn-lw-{where}">'
            f'<button class="tn-lang" type="button" aria-expanded="false" aria-controls="{pid}" aria-label="{lang.t("Language")}: {lang.name}">'
            f'<span class="sf i-globe" aria-hidden="true"></span>{lang.short}<span class="sf i-chevdown" aria-hidden="true"></span></button>'
            f'<span class="tn-langs" id="{pid}" hidden><b>{lang.t("Language")}</b>{"".join(links)}</span></span>')


def put_menu_langs(src, lang, path_of):
    for where in ("bar", "phone"):
        src, n = re.subn(rf"<!-- langs-{where} -->.*?<!-- /langs-{where} -->",
                         lambda m: f"<!-- langs-{where} -->{menu_langs(lang, path_of, where)}<!-- /langs-{where} -->", src, flags=re.S)
        if n != 1:
            sys.exit(f"{lang.home.relative_to(ROOT)} has no <!-- langs-{where} --> … <!-- /langs-{where} --> in its menu")
    return src


# ── The articles in one language ─────────────────────────────────────────

def localized(lang):
    """The articles, topics and home lists in this language, ready to bake."""
    if not lang.mod:
        return ARTICLES, TOPICS, START_HERE, NEWS
    tr, errors = lang.mod, []
    marks = getattr(tr, "MARKS", {})
    english_screens = getattr(tr, "ENGLISH_SCREENS", set())

    def shot(img, where):
        if (ROOT / lang.shots.strip("/") / img).exists():
            return f"{lang.slug}/{img}"
        if img not in english_screens and not TEXT_ONLY:
            errors.append(f"{where}: no {lang.shots}{img}")
        return img

    topics = []
    for t in TOPICS:
        t = dict(t)
        t["name"] = tr.TOPICS[t["slug"]]
        topics.append(t)

    articles = []
    for a in ARTICLES:
        slug = a["slug"]
        t = tr.ARTICLES.get(slug)
        if not t:
            errors.append(f"{slug}: not translated yet")
            continue
        if t["source"] != fingerprint(a):
            errors.append(f"{slug}: the English changed since it was translated "
                          f"(source=\"{t['source']}\", now \"{fingerprint(a)}\")")
        b = copy.deepcopy(a)
        for k in ("title", "description", "og", "lead", "keywords"):
            if k in b:
                b[k] = lang.links(t[k])
        for panel in ("ios", "mac"):
            steps, tsteps = b.get(panel, []), t.get(panel, [])
            if len(steps) != len(tsteps):
                errors.append(f"{slug}: {len(steps)} {panel} steps in English, {len(tsteps)} translated")
                continue
            for i, (s, ts) in enumerate(zip(steps, tsteps), 1):
                s["title"], s["text"] = ts["title"], lang.links(ts["text"])
                for k in ("legend", "keys_label", "ranks_label", "ranks"):
                    if k in s:
                        s[k] = ts[k]
                if "keys" in s:
                    s["keys"] = [(keys, label) for (keys, _), label in zip(s["keys"], ts["keys"])]
                alts = ts.get("alt", [])
                for j, p in enumerate(s.get("phones", []), 1):
                    p["alt"] = alts[j - 1]
                    p["img"] = shot(p["img"], f"{slug} {panel} {i}")
                    key = f"{slug}/{panel}/{i}/{j}"
                    if p.get("marks"):
                        if key in marks:
                            p["marks"] = [tuple(m) for m in marks[key]]
                        elif not p["img"].startswith(f"{lang.slug}/"):
                            pass  # an English screen keeps its own marks
                        elif not TEXT_ONLY:
                            errors.append(f"{key}: no marks measured on the {lang.name} screen")
                if "mac" in s:
                    s["mac"]["alt"] = alts[0]
                    s["mac"]["img"] = shot(s["mac"]["img"], f"{slug} {panel} {i}")
        b["tips"] = [(icon, lang.links(text)) for (icon, _), text in zip(a.get("tips", []), t.get("tips", []))]
        if len(a.get("tips", [])) != len(t.get("tips", [])):
            errors.append(f"{slug}: {len(a.get('tips', []))} tips in English, {len(t.get('tips', []))} translated")
        b["thumb"] = (shot(a["thumb"][0], f"{slug} thumb"), a["thumb"][1])
        articles.append(b)

    start = []
    for s in START_HERE:
        s = dict(s, alt=tr.START_HERE[s["slug"]])
        s["img"] = shot(s["img"], "start here")
        if s.get("marks"):
            s["marks"] = [tuple(m) for m in marks.get(f"start-here/{s['slug']}", s["marks"])]
        start.append(s)
    news = []
    for n in NEWS:
        tn = tr.NEWS.get(n["slug"])
        if not tn:
            errors.append(f"news {n['slug']}: not translated yet")
            continue
        if tn["source"] != fingerprint_news(n):
            errors.append(f"news {n['slug']}: the English changed (source=\"{tn['source']}\", now \"{fingerprint_news(n)}\")")
        news.append(dict(n, title=tn["title"], text=tn["text"], img=shot(n["img"], "news")))

    if errors:
        sys.exit(f"Help in {lang.name} isn't ready:\n  " + "\n  ".join(errors))
    return articles, topics, start, news


def fingerprint_news(n):
    return hashlib.sha1(f'{n["title"]}\x1f{n["text"]}'.encode()).hexdigest()[:8]


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


def stage_html(step, lazy, lang):
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
        lines = [f'        <ol class="ranks" aria-label="{esc(step.get("ranks_label", lang.t("Ranks")))}">']
        for name, need in step["ranks"]:
            lines.append(f"          <li><b>{esc(name)}</b>{esc(need)}</li>")
        return lines + ["        </ol>"]
    if "keys" in step:
        lines = [f'        <div class="keys" aria-label="{esc(step.get("keys_label", lang.t("Keyboard shortcuts")))}">']
        for keys, label in step["keys"]:
            kbd = "".join(f"<kbd>{esc(k)}</kbd>" for k in keys)
            lines.append(f"          <span>{kbd}{esc(label)}</span>")
        return lines + ["        </div>"]
    return []


def step_html(step, n, prefix, lazy, lang):
    lines = [f'      <section class="step" id="{prefix}-{n}">',
             f'        <div class="step-h"><span class="num">{n}</span><div>',
             f'          <h2>{step["title"]}</h2>',
             f'          <p>{step["text"]}</p>',
             "        </div></div>"]
    lines += stage_html(step, lazy, lang)
    if step.get("legend"):
        items = "".join(f"<span><b>{i}</b>{label}</span>" for i, label in enumerate(step["legend"], 1))
        lines.append(f'        <div class="legend">{items}</div>')
    lines.append("      </section>")
    return lines


# ── An article ───────────────────────────────────────────────────────────

def related(a, articles, topics):
    """Three articles to go on with: the ones named, else the same topic, else the next topics."""
    by_slug = {x["slug"]: x for x in articles}
    names = [s for s in a.get("related", []) if s in by_slug and s != a["slug"]]
    pool = [x["slug"] for x in articles if x["topic"] == a["topic"]]
    order = [t["slug"] for t in topics]
    i = order.index(a["topic"])
    pool += [x["slug"] for t in order[i + 1:] + order[:i] for x in articles if x["topic"] == t]
    for s in pool:
        if len(names) >= 3:
            break
        if s != a["slug"] and s not in names:
            names.append(s)
    return [by_slug[s] for s in names[:3]]


def article_html(a, lang, articles, topics, nav, footer):
    topic = {t["slug"]: t for t in topics}
    t = topic[a["topic"]]
    link = SITE + lang.url(a)
    title = f'{a["title"]} · {lang.t("Trovelo Help")}'
    ios, mac = a.get("ios", []), a.get("mac", [])
    devices = a.get("devices", ["iphone", "ipad", "mac"] if mac else ["iphone", "ipad"])
    systems = ", ".join(s for d, s in [("iphone", "iOS"), ("ipad", "iPadOS"), ("mac", "macOS")] if d in devices)
    j = lambda v: json.dumps(v, ensure_ascii=False)
    crumbs = [("Trovelo", f"{SITE}/"), (lang.t("Help"), f"{SITE}{lang.base}"), (plain(a["title"]), link)]
    ld_text = "\n".join([
        "{",
        '  "@context": "https://schema.org",',
        '  "@type": "TechArticle",',
        f'  "@id": {j(link)},',
        f'  "url": {j(link)},',
        f'  "headline": {j(plain(a["title"]))},',
        f'  "description": {j(plain(a["description"]))},',
        f'  "dateModified": {j(a["updated"])},',
        f'  "inLanguage": "{lang.code}",',
        '  "author": {"@type": "Person", "name": "Eduardo Pinillos"},',
        f'  "about": {{"@type": "SoftwareApplication", "name": "Trovelo", "operatingSystem": {j(systems)}}},',
        f'  "isPartOf": {{"@id": "{SITE}/#website"}},',
        '  "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [',
        ",\n".join(f'    {{"@type": "ListItem", "position": {i}, "name": {j(n)}, "item": {j(u)}}}'
                   for i, (n, u) in enumerate(crumbs, 1)),
        "  ]}",
        "}",
    ])
    path_of = lambda other: other.url(a)
    sorry = lang.t("Sorry about that. Tell me what was missing on {link} and I’ll fix this page.",
                   link='<a href="https://www.reddit.com/r/trovelo/">r/trovelo</a>')

    L = [
        "<!DOCTYPE html>", f'<html lang="{lang.code}">', "<head>",
        '<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="apple-itunes-app" content="app-id=6760258252">',
        f"<title>{esc(plain(title))}</title>",
        f'<meta name="description" content="{esc(plain(a["description"]))}">',
        f'<link rel="canonical" href="{link}">',
        *alternates(path_of),
        '<meta property="og:type" content="article">',
        f'<meta property="og:url" content="{link}">',
        f'<meta property="og:title" content="{esc(plain(title))}">',
        f'<meta property="og:description" content="{esc(plain(a.get("og", a["description"])))}">',
        f'<meta property="og:image" content="{SITE}/images/trovelo/og.png">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:locale" content="{lang.locale}">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:image" content="{SITE}/images/trovelo/og.png">',
        '<link rel="icon" type="image/png" href="/images/trovelo/app-icon.png">',
        '<link rel="stylesheet" href="/site.css">',
        '<link rel="stylesheet" href="/help/help.css">',
        '<script type="application/ld+json">', ld_text, "</script>",
        "</head>", "<body>",
        f'<a class="skip" href="#main">{lang.t("Skip to content")}</a>', "", put_menu_langs(nav, lang, path_of), "",
        '<div class="wrap doc" style="max-width: 1320px">',
        f'  <nav class="side" aria-label="{lang.t("Topics")}">',
        f'    <p class="side-h">{lang.t("TOPICS")}</p>',
    ]
    for tt in topics:
        cur = ' aria-current="true"' if tt["slug"] == a["topic"] else ""
        L.append(f'    <a href="{lang.base}#{tt["slug"]}"{cur}>{tile(tt)}{esc(tt["name"])}</a>')
    L += [
        "  </nav>", "",
        '  <main id="main">',
        '    <div class="doc-top">',
        '      <div class="crumbs">',
        f'        <a href="{lang.base}">{lang.t("Help")}</a><span class="sf i-chev" aria-hidden="true"></span>',
        f'        <a class="cur" href="{lang.base}#{t["slug"]}" style="color: {t["ink"]}">{tile(t)}{esc(t["name"])}</a>',
        "      </div>",
        f'      <form class="mini-search" action="{lang.base}" method="get" role="search">',
        '        <span class="sf i-search" aria-hidden="true"></span>',
        f'        <label class="vh" for="mq">{lang.t("Search help")}</label>',
        f'        <input id="mq" name="q" type="search" placeholder="{lang.t("Search help")}">',
        "      </form>",
        "    </div>",
        f'    <h1>{a["title"]}</h1>',
        f'    <p class="lead">{a["lead"]}</p>',
        '    <div class="doc-meta">',
        f'      <span><span class="sf i-clock"></span>{lang.t("{n} min read", n=a["minutes"])}</span>',
        f'      <span>{lang.t("Updated {date}", date=lang.date(a["updated"]))}</span>',
    ]
    for d in devices:
        L.append(f'      <span class="dev"><span class="sf i-{d}"></span>{DEVICE_NAMES[d]}</span>')
    L.append("    </div>")

    panels = []
    if ios:
        ios_name = lang.t("iPhone &amp; iPad") if "ipad" in devices else "iPhone"
        panels.append(("ios-steps", "tab-ios", "i-iphone", ios_name, "step", ios))
    if mac:
        panels.append(("mac-steps", "tab-mac", "i-mac", "Mac", "mac", mac))
    if len(panels) > 1:
        L += ["", f'    <div class="tabs" role="tablist" aria-label="{lang.t("Device")}">']
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
            L += step_html(step, i, prefix, not first_shot, lang)
            if "phones" in step or "mac" in step:
                first_shot = False
        L.append("    </div>")

    if a.get("tips"):
        L += ["", '    <section class="tips">', f'      <h2><span class="sf i-bulb"></span>{lang.t("Good to know")}</h2>']
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
        f"        <h2>{lang.t('Was this helpful?')}</h2>",
        '        <div class="vote-btns">',
        f'          <button type="button" data-vote="yes"><span class="sf i-up"></span>{lang.t("Yes")}</button>',
        f'          <button type="button" data-vote="no"><span class="sf i-down"></span>{lang.t("No")}</button>',
        "        </div>",
        "      </div>",
        f'      <p class="vote-a" data-answer="yes" tabindex="-1" hidden>{lang.t("Great, thanks! Happy travels.")}</p>',
        f'      <p class="vote-a" data-answer="no" tabindex="-1" hidden>{sorry}</p>',
        "    </section>",
        "",
        '    <section class="more">',
        f"      <h2>{lang.t('Keep going')}</h2>",
        '      <div class="more-grid">',
    ]
    for r in related(a, articles, topics):
        img, pos = r["thumb"]
        L.append(f'        <a class="more-card" href="{lang.url(r)}"><img src="{SHOTS}{img}" alt="" '
                 f'style="object-position: {pos}" loading="lazy"><div><b>{r["title"]}</b>'
                 f'<small>{esc(topic[r["topic"]]["name"])}</small></div></a>')
    L += [
        "      </div>",
        f'      <a class="all-topics" href="{lang.base}#topics">{lang.t("See all topics")}<span class="sf i-chev"></span></a>',
        "    </section>",
        "  </main>",
        "",
        f'  <aside class="rail" aria-label="{lang.t("In this article")}">',
        f'    <p class="side-h">{lang.t("IN THIS ARTICLE")}</p>',
    ]
    for pid, _, _, _, prefix, steps in panels:
        hidden = " hidden" if pid != panels[0][0] else ""
        L.append(f'    <nav class="toc" data-toc="{pid}"{hidden}>')
        for i, step in enumerate(steps, 1):
            L.append(f'      <a href="#{prefix}-{i}"><i>{i}</i>{plain(step["title"])}</a>')
        L.append("    </nav>")
    L += [
        '    <div class="stuck">',
        f"      <b>{lang.t('Still stuck?')}</b>",
        f"      <p>{lang.t('A real person reads every message.')}</p>",
        f'      <a href="https://www.reddit.com/r/trovelo/"><span class="sf i-chat"></span>{lang.t("Ask on r/trovelo")}</a>',
        "    </div>",
        "  </aside>",
        "</div>",
        "",
        put_langs(footer, lang, path_of),
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


def start_here_html(lang, articles, topics, start):
    by_slug = {x["slug"]: x for x in articles}
    topic = {t["slug"]: t for t in topics}
    L = []
    for s in start:
        a = by_slug[s["slug"]]
        t = topic[a["topic"]]
        L += [
            f'      <a class="tcard" href="{lang.url(a)}">',
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
            f'          <span class="meta"><span class="sf i-clock"></span>{lang.t("{steps} steps · {n} min", steps=steps_count(a), n=a["minutes"])}</span>',
            "        </div>",
            "      </a>",
        ]
    return "\n".join(L)


def topics_html(lang, articles, topics):
    L = []
    for t in topics:
        L += [
            f'      <article class="topic" id="{t["slug"]}" style="--tile: {t["tile"]}; --ac: {t["accent"]}">',
            f'        <div class="topic-head"><span class="tile"><span class="sf {t["icon"]}"></span></span><h3>{esc(t["name"])}</h3></div>',
            "        <ul>",
        ]
        for a in articles:
            if a["topic"] == t["slug"] or t["slug"] in a.get("also", []):
                L.append(f'          <li><span class="sf i-doc"></span><a href="{lang.url(a)}">{a["title"]}</a></li>')
        L += ["        </ul>", "      </article>"]
    return "\n".join(L)


def news_html(lang, articles, news):
    by_slug = {x["slug"]: x for x in articles}
    L = []
    for n in news:
        a = by_slug[n["slug"]]
        L += [
            f'      <a class="new" href="{lang.url(a)}">',
            f'        <img src="{SHOTS}{n["img"]}" alt="" style="object-position: {n["pos"]}" loading="lazy">',
            f'        <div><span class="tag">{lang.t("NEW")}</span><b>{n["title"]}</b><p>{n["text"]}</p></div>',
            "      </a>",
        ]
    return "\n".join(L)


def put_block(src, name, body, where):
    pattern = re.compile(rf"(<!-- {name} -->\n).*?(\n\s*<!-- /{name} -->)", re.S)
    if not pattern.search(src):
        sys.exit(f"{where} has no <!-- {name} --> … <!-- /{name} --> block")
    return pattern.sub(lambda m: m.group(1) + body + m.group(2), src)


def home_html(lang, english_home, articles, topics, start, news):
    """The Help home: English is written by hand; another language is the
    English page with its own words swapped in, so the two never drift."""
    src = english_home
    if lang.mod:
        for en, xx in lang.mod.HOME:
            if en not in src:
                sys.exit(f"{lang.file}: the Help home no longer has “{en}”; update HOME")
            src = src.replace(en, xx)
        src = src.replace('<html lang="en">', f'<html lang="{lang.code}">')
        src = src.replace('content="en_US"', f'content="{lang.locale}"')
        src = src.replace('"inLanguage": "en"', f'"inLanguage": "{lang.code}"')
        src = lang.links(src)
    where = str(lang.home.relative_to(ROOT))
    src = put_block(src, "start-here", start_here_html(lang, articles, topics, start), where)
    src = put_block(src, "topics", topics_html(lang, articles, topics), where)
    src = put_block(src, "news", news_html(lang, articles, news), where)
    src = put_block(src, "hreflang", "\n".join(alternates(lambda other: other.base)), where)
    src = put_menu_langs(src, lang, lambda other: other.base)
    return put_langs(src, lang, lambda other: other.base)


# ── Write everything ─────────────────────────────────────────────────────

def check():
    slugs, topic = set(), {t["slug"] for t in TOPICS}
    for a in ARTICLES:
        assert a["slug"] not in slugs, f"two articles called {a['slug']}"
        slugs.add(a["slug"])
        assert a["topic"] in topic, f"{a['slug']}: no topic {a['topic']}"
        for step in a.get("ios", []) + a.get("mac", []):
            for p in step.get("phones", []):
                assert (ROOT / SHOTS.strip("/") / p["img"]).exists(), f"{a['slug']}: missing {p['img']}"
            if "mac" in step:
                assert (ROOT / SHOTS.strip("/") / step["mac"]["img"]).exists(), f"{a['slug']}: missing {step['mac']['img']}"
            marks = sum(len(p.get("marks", [])) for p in step.get("phones", [])) + len(step.get("mac", {}).get("rings", []))
            assert marks == len(step.get("legend", [])), f"{a['slug']}: “{plain(step['title'])}” has {marks} marks and {len(step.get('legend', []))} labels"
        assert (ROOT / SHOTS.strip("/") / a["thumb"][0]).exists(), f"{a['slug']}: missing thumb {a['thumb'][0]}"


def no_long_dashes(lang, articles, topics, start, news):
    for a in articles:
        texts = [a["title"], a["lead"], a["description"], a["keywords"]] + [text for _, text in a.get("tips", [])]
        for s in a.get("ios", []) + a.get("mac", []):
            texts += [s["title"], s["text"]] + s.get("legend", []) + [p["alt"] for p in s.get("phones", [])]
        for text in texts:
            assert "—" not in text, f"{lang.name}, {a['slug']}: no long dashes in copy"
    for text in [t["name"] for t in topics] + [s["alt"] for s in start] + [n["title"] + n["text"] for n in news]:
        assert "—" not in text, f"{lang.name}: no long dashes in copy"


def search_index(lang, articles, topics):
    names = {t["slug"]: t["name"] for t in topics}
    rows = ",\n".join("        " + json.dumps([plain(a["title"]), a["topic"], lang.url(a), a["keywords"]], ensure_ascii=False)
                      for a in articles)
    words = {k: lang.t(k) for k in ("Nothing yet for “{q}”.", "Ask me on {link} and I’ll answer.", "Soon")}
    return "\n".join([
        f"    {json.dumps(lang.code)}: {{",
        f"      topics: {json.dumps(names, ensure_ascii=False)},",
        f"      words: {json.dumps(words, ensure_ascii=False)},",
        "      articles: [",
        rows,
        "      ]",
        "    }",
    ])


def main():
    check()
    english_home = None
    index, sitemap = [], []
    for code in LANGS:
        lang = LANG[code]
        articles, topics, start, news = localized(lang)
        no_long_dashes(lang, articles, topics, start, news)

        src = home_html(lang, english_home or HOME.read_text(encoding="utf-8"), articles, topics, start, news)
        if code == "en":
            english_home = src
        lang.home.parent.mkdir(parents=True, exist_ok=True)
        lang.home.write_text(src, encoding="utf-8")

        m = re.search(r'<nav class="tn".*?<div class="tn-dim" hidden></div>', src, re.S)
        if not m:
            sys.exit(f"Couldn't find the menu (<nav class=\"tn\"> … tn-dim) in {lang.home}")
        nav = m.group(0)
        m = re.search(r'<footer class="tf">.*?</footer>', src, re.S)
        if not m:
            sys.exit(f"Couldn't find the footer in {lang.home}")
        footer = m.group(0)

        for a in articles:
            out = ROOT / lang.url(a).strip("/") / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(article_html(a, lang, articles, topics, nav, footer), encoding="utf-8")

        if lang.missing:
            sys.exit(f"{lang.file} has no UI words for: " + " | ".join(sorted(lang.missing)))
        index.append(search_index(lang, articles, topics))
        newest = max(a["updated"] for a in articles)
        sitemap.append(f"  <url><loc>{SITE}{lang.base}</loc><lastmod>{newest}</lastmod></url>")
        sitemap += [f"  <url><loc>{SITE}{lang.url(a)}</loc><lastmod>{a['updated']}</lastmod></url>" for a in articles]
        print(f"{lang.name}: {len(articles)} articles written")

    topics = ",\n".join(f"    {json.dumps(t['slug'])}: {json.dumps([t['icon'], t['tile'], t['accent']])}" for t in TOPICS)
    js = JS.read_text(encoding="utf-8")
    js, n = re.subn(r"(  // <index>\n).*?(\n  // </index>)",
                    lambda m: m.group(1) + f"  var TOPICS = {{\n{topics}\n  }};\n  var LANGS = {{\n" + ",\n".join(index) + "\n  };" + m.group(2),
                    js, flags=re.S)
    if n != 1:
        sys.exit("help/help.js has no '// <index>' … '// </index>' block")
    JS.write_text(js, encoding="utf-8")

    sm = SITEMAP.read_text(encoding="utf-8")
    sm = re.sub(r"  <url><loc>https://troveloapp\.com/(?:[a-z-]+/)?help/[^<]*</loc><lastmod>[^<]*</lastmod></url>\n", "", sm)
    sm = sm.replace(f"  <url><loc>{SITE}/support/</loc>", "\n".join(sitemap) + f"\n  <url><loc>{SITE}/support/</loc>", 1)
    SITEMAP.write_text(sm, encoding="utf-8")


def check_text(code):
    """python3 build_help.py --check de: everything a new translation needs
    except its screens and marks, without writing a page."""
    global TEXT_ONLY
    TEXT_ONLY = True
    lang = Lang(code)
    LANG[code] = lang
    if code not in LANGS:
        LANGS.append(code)
    articles, topics, start, news = localized(lang)
    no_long_dashes(lang, articles, topics, start, news)
    src = home_html(lang, home_html(LANG["en"], HOME.read_text(encoding="utf-8"), *localized(LANG["en"])), articles, topics, start, news)
    nav = re.search(r'<nav class="tn".*?<div class="tn-dim" hidden></div>', src, re.S).group(0)
    footer = re.search(r'<footer class="tf">.*?</footer>', src, re.S).group(0)
    for a in articles:
        article_html(a, lang, articles, topics, nav, footer)
    search_index(lang, articles, topics)
    if lang.missing:
        sys.exit(f"{lang.file} has no UI words for: " + " | ".join(sorted(lang.missing)))
    print(f"{lang.name}: the words of {len(articles)} articles are ready (screens and marks not checked)")


if __name__ == "__main__":
    if sys.argv[1:2] == ["--check"]:
        check_text(sys.argv[2])
    else:
        main()
