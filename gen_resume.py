from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfgen import canvas

RED = colors.HexColor("#E53935")
BLUE = colors.HexColor("#A9C1D9")
INK = colors.HexColor("#1A1A1A")
CREAM = colors.HexColor("#F4F1EA")

out = "/app/frontend/public/Sriban-Resume.pdf"
c = canvas.Canvas(out, pagesize=A4)
W, H = A4

# background
c.setFillColor(CREAM); c.rect(0, 0, W, H, fill=1, stroke=0)
# header band
c.setFillColor(RED); c.rect(0, H-55*mm, W, 55*mm, fill=1, stroke=0)
c.setFillColor(colors.white)
c.setFont("Helvetica-Bold", 46); c.drawString(20*mm, H-32*mm, "SRIBAN")
c.setFont("Helvetica", 12); c.drawString(20*mm, H-42*mm, "GRAPHIC DESIGN  |  UI/UX  |  VIDEO EDITING")
c.setFont("Helvetica", 10)
c.drawString(20*mm, H-49*mm, "ste282002@gmail.com   |   linkedin.com/in/sriban-m-b122451b9")

y = H-70*mm
def heading(t):
    global y
    c.setFillColor(RED); c.setFont("Helvetica-Bold", 15)
    c.drawString(20*mm, y, t.upper())
    c.setStrokeColor(INK); c.setLineWidth(1.2); c.line(20*mm, y-2.5*mm, W-20*mm, y-2.5*mm)
    y -= 9*mm

def para(lines, size=10):
    global y
    c.setFillColor(INK); c.setFont("Helvetica", size)
    for ln in lines:
        c.drawString(22*mm, y, ln); y -= 5.2*mm
    y -= 3*mm

heading("Profile")
para([
 "Passionate Visual Designer & Video Editor with expertise in Adobe Photoshop,",
 "Illustrator, Premiere Pro, and Figma. Skilled across the full creative pipeline —",
 "logos & branding, professional video editing, and user-friendly UI/UX prototypes.",
 "I blend creativity with technical precision to deliver work that looks great and",
 "communicates effectively.",
])

heading("Experience")
c.setFillColor(INK); c.setFont("Helvetica-Bold", 11)
c.drawString(22*mm, y, "Sutherland Global Services — Amazon SPS"); 
c.setFont("Helvetica-Oblique", 10); c.drawRightString(W-20*mm, y, "2024 - 2026"); y -= 5.5*mm
para([
 "Assisted Amazon sellers with account management, product listings, and order",
 "fulfillment. Resolved catalog errors, shipping delays and payment queries; guided",
 "sellers through Amazon policies and compliance while documenting cases.",
 "Skills: communication, problem-solving, e-commerce workflows, Amazon tools,",
 "multitasking under pressure, team collaboration.",
])

heading("Education")
c.setFillColor(INK); c.setFont("Helvetica-Bold", 11)
c.drawString(22*mm, y, "S.A. Engineering College"); c.setFont("Helvetica-Oblique",10)
c.drawRightString(W-20*mm, y, "2020 - 2024"); y -= 6*mm
c.setFont("Helvetica-Bold", 11)
c.drawString(22*mm, y, "Salvation Matric Hr. Sec. School"); c.setFont("Helvetica-Oblique",10)
c.drawRightString(W-20*mm, y, "2006 - 2020"); y -= 9*mm

heading("Core Skills")
para(["Graphic Design   •   UI/UX Design   •   Video Editing"])

heading("Creative Stack")
para(["Adobe Photoshop   •   Adobe Illustrator   •   Adobe Premiere Pro   •   Figma"])

c.setFillColor(BLUE); c.rect(0, 0, W, 10*mm, fill=1, stroke=0)
c.showPage(); c.save()
print("resume saved", out)
