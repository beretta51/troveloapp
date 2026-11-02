# sheet.py [--lang xx] OUT name1 name2 ... : a labelled contact sheet of help
# JPGs, 5 per row. A name with a dot is taken as a path.
import sys
from pathlib import Path
from PIL import Image, ImageDraw

args = sys.argv[1:]
lang = ''
if args[0] == '--lang':
    lang, args = args[1], args[2:]
H = Path(__file__).resolve().parents[2] / 'images/trovelo/help' / lang
out, *names = args
W = 300; h = round(W * 874 / 402); cols = 5
rows = (len(names) + cols - 1) // cols
sheet = Image.new('RGB', (cols * W, rows * (h + 22)), 'white')
d = ImageDraw.Draw(sheet)
for i, n in enumerate(names):
    p = Path(n) if '.' in n else H / f'{n}.jpg'
    im = Image.open(p).convert('RGB').resize((W, h))
    x, y = (i % cols) * W, (i // cols) * (h + 22)
    sheet.paste(im, (x, y + 22)); d.text((x + 6, y + 4), Path(n).stem, fill='black')
sheet.save(out, quality=80)
print(out)
