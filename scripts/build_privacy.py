#!/usr/bin/env python3
"""Bake the two privacy pages: the app's and the website's.

Each policy's text lives in policies/: a "<!-- updated: … -->" line, then one
<h2> per section with plain <p>, <ul> and <table> (tables inside
<div class="tablewrap">). policies/template.html is the page around both;
PAGES below fills in each page's title, address and headline.
Run after every edit to any of them:

    python3 scripts/build_privacy.py

The app's canonical text is PRIVACY.md in the app's repo; keep the two in
step, "Last updated" included. The website's policy lives only here.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = "<!-- Policy text goes here -->"

PAGES = [
    {   # The app's policy: the address registered in App Store Connect.
        "src": "privacy.html",
        "path": "/privacy/",
        "title": "Trovelo · Privacy policy",
        "description": "Privacy policy for Trovelo. No accounts, no ads, no analytics SDKs and no Trovelo servers, plus exactly what each feature sends, and to whom.",
        "og_description": "Your trips are yours. No accounts, no ads and no Trovelo servers.",
        "word": "Privacy",
        "tag": "Your trips are yours.",
        "other": ("For this website, see", "/privacy/website/", "Website privacy"),
    },
    {   # troveloapp.com itself.
        "src": "website.html",
        "path": "/privacy/website/",
        "title": "Trovelo · Website privacy",
        "description": "How troveloapp.com handles your visit: no cookies, no analytics, everything served from this site, hosted on GitHub Pages.",
        "og_description": "No cookies, nothing to accept. What happens when you visit troveloapp.com.",
        "word": "Privacy",
        "tag": "This website. No cookies, nothing to accept.",
        "other": ("For the app, see", "/privacy/", "Trovelo's privacy policy"),
    },
]

template = (ROOT / "policies" / "template.html").read_text(encoding="utf-8")
if MARKER not in template:
    sys.exit("Marker missing in policies/template.html: " + MARKER)

for page in PAGES:
    src_name = "policies/" + page["src"]
    src = (ROOT / src_name).read_text(encoding="utf-8")

    m = re.search(r"<!--\s*updated:\s*(.*?)\s*-->", src)
    if not m:
        sys.exit("No '<!-- updated: … -->' line in " + src_name)
    updated = m.group(1)

    parts = re.split(r"<h2[^>]*>(.*?)</h2>", src[m.end():].strip())
    if len(parts) < 3:
        sys.exit("No <h2> sections found in " + src_name)

    lead, href, label = page["other"]
    out = '<p class="pg-updated">Last updated: %s · %s <a href="%s">%s</a>.</p>\n' % (updated, lead, href, label)
    for k in range(1, len(parts), 2):
        out += '<section class="pg-card"><h2>%s</h2>%s</section>\n' % (parts[k].strip(), parts[k + 1].strip())

    html = template.replace(MARKER, out)
    for key in ("title", "description", "og_description", "path", "word", "tag"):
        html = html.replace("{{%s}}" % key, page[key])
    left = re.findall(r"\{\{\w+\}\}", html)
    if left:
        sys.exit("Unfilled in policies/template.html: " + ", ".join(sorted(set(left))))

    folder = ROOT / page["path"].strip("/")
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "index.html").write_text(html, encoding="utf-8")
    print("✓ %s/index.html  ←  %s (updated %s)" % (page["path"].strip("/"), src_name, updated))
