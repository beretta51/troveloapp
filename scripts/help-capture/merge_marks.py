# merge_marks.py --lang xx [--missing] [--write]
# Checks the marks measured during a capture ($CAP/marks-xx.json) against the
# English ones (same count, same "dot"/"left" classes) and, with --write,
# puts them in scripts/help_xx.py as MARKS, one key per line.
# --missing lists the English uses that have no marks in that language yet.
import json, os, re, sys
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))
from help_articles import ARTICLES, START_HERE  # noqa: E402

args = sys.argv[1:]
lang = args[args.index('--lang') + 1]
CAP = Path(os.environ['CAP'])
new = json.load(open(CAP / f'marks-{lang}.json'))

eng = {}
for a in ARTICLES:
    for i, s in enumerate(a.get('ios', []), 1):
        for j, p in enumerate(s.get('phones', []), 1):
            if p.get('marks'):
                eng[f"{a['slug']}/ios/{i}/{j}"] = (p['img'], p['marks'])
for h in START_HERE:
    if h.get('marks'):
        eng[f"start-here/{h['slug']}"] = (h['img'], h['marks'])

problems = []
for k, v in new.items():
    if k not in eng:
        problems.append(f'{k}: no marks on this use in English')
        continue
    e = eng[k][1]
    if len(v) != len(e):
        problems.append(f'{k}: {len(v)} marks, English has {len(e)}')
    for m, n in zip(v, e):
        if m[4:] != list(n[4:]):
            problems.append(f'{k}: class {m[4:]}, English {list(n[4:])}')
missing = sorted(k for k in eng if k not in new)
print(len(new), 'measured,', len(missing), 'still to measure')
for p in problems:
    print('  !', p)
if '--missing' in args:
    for k in missing:
        print('  -', k, eng[k][0])
if '--write' in args:
    if problems:
        sys.exit('not written: fix the marks above first')
    body = ''.join(f'    {json.dumps(k)}: {json.dumps(v)},\n' for k, v in sorted(new.items()))
    path = SCRIPTS / f'help_{lang}.py'
    src, n = re.subn(r'^MARKS = \{(?:\}|\n.*?^\})\n', 'MARKS = {\n' + body + '}\n',
                     path.read_text(), flags=re.S | re.M)
    assert n == 1, 'no MARKS = {…} in ' + path.name
    path.write_text(src)
    print('written to', path.name)
