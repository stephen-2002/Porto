import fitz, os

doc = fitz.open("/app/portfolio.pdf")
out = "/app/frontend/public/portfolio"
os.makedirs(out, exist_ok=True)

# 1) Render full pages (nice for reference / collage backgrounds)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    pix.save(f"{out}/page-{i+1:02d}.png")

# 2) Extract embedded images with size filter (skip tiny icons)
manifest = []
for i, page in enumerate(doc):
    imgs = page.get_images(full=True)
    for j, img in enumerate(imgs):
        xref = img[0]
        try:
            base = doc.extract_image(xref)
        except Exception:
            continue
        w, h = base.get("width", 0), base.get("height", 0)
        if w * h < 40000:  # skip tiny
            continue
        ext = base["ext"]
        fname = f"p{i+1:02d}-img{j+1:02d}.{ext}"
        with open(f"{out}/{fname}", "wb") as f:
            f.write(base["image"])
        manifest.append((i+1, fname, w, h))

for m in manifest:
    print(m)
print("TOTAL_EMBEDDED", len(manifest))
