#!/usr/bin/env python3
"""Bake the privacy policy into privacy/index.html.

The policy text lives in policies/privacy.html: a "<!-- updated: … -->" line,
then one <h2> per section with plain <p>, <ul> and <table> (tables inside
<div class="tablewrap">). policies/template.html is the page around it.
Run after every edit to either:

    python3 scripts/build_privacy.py

The canonical text is PRIVACY.md in the app's repo; keep the two in step,
"Last updated" included.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = "<!-- Policy text goes here -->"

src = (ROOT / "policies" / "privacy.html").read_text(encoding="utf-8")
template = (ROOT / "policies" / "template.html").read_text(encoding="utf-8")

m = re.search(r"<!--\s*updated:\s*(.*?)\s*-->", src)
if not m:
    sys.exit("No '<!-- updated: … -->' line in policies/privacy.html")
updated = m.group(1)

parts = re.split(r"<h2[^>]*>(.*?)</h2>", src[m.end():].strip())
if len(parts) < 3:
    sys.exit("No <h2> sections found in policies/privacy.html")
if MARKER not in template:
    sys.exit("Marker missing in policies/template.html: " + MARKER)

out = '<p class="pg-updated">Last updated: %s</p>\n' % updated
for k in range(1, len(parts), 2):
    out += '<section class="pg-card"><h2>%s</h2>%s</section>\n' % (parts[k].strip(), parts[k + 1].strip())

(ROOT / "privacy").mkdir(exist_ok=True)
(ROOT / "privacy" / "index.html").write_text(template.replace(MARKER, out), encoding="utf-8")
print("✓ privacy/index.html  ←  policies/privacy.html (updated %s)" % updated)
