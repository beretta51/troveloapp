# export.py [--lang xx] SRC OUT [x,y,w,h ...]
# Turns a 1206x2622 simulator capture ($CAP/SRC.png) into the site's 603x1311
# JPG, images/trovelo/help/[xx/]OUT.jpg, blurring the given boxes (in points)
# where test trips show behind the real subject.
import os, sys
from pathlib import Path
from PIL import Image, ImageFilter

args = sys.argv[1:]
lang = ''
if args[0] == '--lang':
    lang, args = args[1], args[2:]
src, out, *boxes = args
CAP = Path(os.environ['CAP'])
OUT = Path(__file__).resolve().parents[2] / 'images/trovelo/help' / lang
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(CAP / f'{src}.png').convert('RGB')
k = im.width / 402
for b in boxes:
    x, y, w, h = (float(v) for v in b.split(','))
    box = tuple(int(round(v * k)) for v in (x, y, x + w, y + h))
    im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(14 * k / 3)), box[:2])
im = im.resize((603, round(603 * im.height / im.width)), Image.LANCZOS)
im.save(OUT / f'{out}.jpg', quality=82, optimize=True, progressive=True)
print(OUT / f'{out}.jpg', im.size, (OUT / f'{out}.jpg').stat().st_size // 1024, 'KB')
