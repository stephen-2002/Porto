from PIL import Image, ImageDraw
import os, glob

out = "/app/frontend/public/portfolio"
groups = {
    "sheetA_p6_7": ["p06-img01","p06-img02","p06-img03","p06-img04",
                     "p07-img02","p07-img03","p07-img04","p07-img05","p07-img06"],
    "sheetB_p8_9": ["p08-img02","p08-img03","p08-img04","p08-img05","p08-img06","p08-img07","p08-img08",
                    "p09-img02","p09-img03","p09-img04"],
    "sheetC_ui":  ["p10-img02","p10-img03","p11-img02","p11-img03","p12-img06",
                   "p13-img02","p13-img03","p13-img04","p13-img05","p14-img02","p14-img03","p14-img04"],
    "sheetD_hob": ["p16-img02","p16-img03","p16-img04","p16-img05","p05-img03"],
}

def find(stem):
    m = glob.glob(f"{out}/{stem}.*")
    return m[0] if m else None

for sheet, stems in groups.items():
    cols = 3
    cell = 300
    rows = (len(stems)+cols-1)//cols
    canvas = Image.new("RGB", (cols*cell, rows*(cell+22)), (30,30,30))
    d = ImageDraw.Draw(canvas)
    for i, stem in enumerate(stems):
        p = find(stem)
        if not p: continue
        im = Image.open(p).convert("RGB")
        im.thumbnail((cell-10, cell-10))
        x = (i%cols)*cell; y=(i//cols)*(cell+22)
        canvas.paste(im, (x+5, y+20))
        d.text((x+5, y+5), stem, fill=(255,255,0))
    canvas.save(f"{out}/../{sheet}.png")
    print("saved", sheet)
