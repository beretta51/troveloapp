# marks.py [--lang xx] OUT img:x,y,w,h;x,y,w,h img2:... : draws numbered marks
# (in points) on help JPGs side by side, to check them before they go in.
# An img is a help JPG (images/trovelo/help/[xx/]img.jpg) or a $CAP/p preview.
import os, sys
from pathlib import Path
from PIL import Image, ImageDraw

args = sys.argv[1:]
lang = ''
if args[0] == '--lang':
    lang, args = args[1], args[2:]
H = Path(__file__).resolve().parents[2] / 'images/trovelo/help' / lang
C = Path(os.environ.get('CAP', '.')) / 'p'
out, *specs = args
W = 402
tiles = []
for s in specs:
    name, _, ms = s.partition(':')
    p = H / f'{name}.jpg' if (H / f'{name}.jpg').exists() else C / f'{name}.png'
    im = Image.open(p).convert('RGB').resize((W, 874))
    d = ImageDraw.Draw(im)
    for i, m in enumerate([m for m in ms.split(';') if m], 1):
        x, y, w, h = (float(v) for v in m.split(','))
        d.rectangle((x, y, x + w, y + h), outline=(230, 30, 40), width=2)
        d.text((x + 3, y + 1), str(i), fill=(230, 30, 40))
    d.text((4, 4), name, fill=(0, 0, 0))
    tiles.append(im)
sheet = Image.new('RGB', (W * len(tiles), 874), 'white')
for i, t in enumerate(tiles):
    sheet.paste(t, (i * W, 0))
sheet.save(out, quality=82)
print(out)
