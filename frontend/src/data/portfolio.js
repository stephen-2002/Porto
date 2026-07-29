const P = "/portfolio";

export const PROFILE = {
  name: "SRIBAN",
  tagline: "Graphic Design | UI/UX | Video Editing",
  email: "ste282002@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriban-m-b122451b9",
  linkedinLabel: "linkedin.com/in/sriban-m",
  resume: "/Sriban-Resume.pdf",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

export const ABOUT = {
  chapter: "01",
  paragraphs: [
    "I am a passionate Visual Designer & Video Editor with expertise in Adobe Photoshop, Illustrator, Premiere Pro, and Figma. My skill set spans the full creative pipeline — from crafting logos and branding assets, to editing professional videos, and designing user-friendly UI/UX prototypes.",
    "I thrive on blending creativity with technical precision, delivering designs that are visually striking, functional, and tailored to the needs. My goal is to create work that not only looks great but also communicates effectively and leaves a lasting impact.",
  ],
  philosophy: "Blending creativity with technical precision.",
};

export const EDUCATION = [
  { school: "Salvation Matric Hr. Sec. School", years: "2006 - 2020" },
  { school: "S.A. Engineering College", years: "2020 - 2024" },
];

export const EXPERIENCE = {
  company: "Sutherland Global Services, Amazon SPS",
  years: "2024 - 2026",
  description:
    "Assisted Amazon sellers with account management, product listings, and order fulfillment issues. Provided solutions for catalog errors, shipping delays, and payment queries to ensure smooth seller operations. Guided sellers through Amazon policies and compliance requirements, while documenting cases and following up for timely resolution.",
  skills: [
    "Strong communication & problem-solving",
    "E-commerce workflows & Amazon tools",
    "Managing multiple queries under pressure",
    "Team collaboration in fast-paced support",
  ],
};

export const CATEGORIES = [
  {
    id: "graphic",
    title: "Graphic Design",
    description:
      "Creating visually appealing designs, product mockups, and logos with a focus on detail and usability.",
    items: [
      { img: `${P}/p06-img02.png`, title: "Black Friday Sale", desc: "3D typographic sale poster with bold dimensional lettering." },
      { img: `${P}/p06-img03.png`, title: "Red Chilli Farm Fest", desc: "Brand logo & identity featuring a hand-crafted chilli mascot." },
      { img: `${P}/p06-img04.png`, title: "Editorial Portrait Edit", desc: "High-impact monochrome portrait with painted face art and red accents." },
    ],
  },
  {
    id: "illustration",
    title: "Illustration & Image Enhancements",
    description:
      "I create icon illustrations and enhance real-world images by painting over them to make them visually striking and beautiful. This approach allows me to merge creativity with realism, bringing everyday visuals to life.",
    items: [
      { img: `${P}/p07-img03.png`, title: "Piggy Bank Composite", desc: "Enhanced lifestyle photo with painted energy accents." },
      { img: `${P}/p07-img02.png`, title: "Blue Bird Icon", desc: "Geometric icon illustration with layered facets." },
      { img: `${P}/p07-img05.png`, title: "Swan Illustration", desc: "Minimal vector swan with soft gradients." },
      { img: `${P}/p07-img06.png`, title: "Bee Illustration", desc: "Playful bee with translucent, layered wings." },
      { img: `${P}/p07-img04.png`, title: "Colourful Bird", desc: "Vibrant abstract bird built from warm gradient shapes." },
    ],
  },
  {
    id: "visual",
    title: "Visual Presentation & Edits",
    description:
      "I design covers, thumbnails, mockups, and Photoshop edits that give each project a professional and cohesive presentation. These elements showcase my work in real-world contexts while highlighting creative polish and adaptability.",
    items: [
      { img: `${P}/p08-img02.png`, title: "Dream On Me", desc: "Music cover art with dramatic ink-splash treatment." },
      { img: `${P}/p08-img03.png`, title: "Red Chilli Farm Fest Banner", desc: "Vertical event banner with promotional details." },
      { img: `${P}/p08-img06.png`, title: "Flamos", desc: "Cinematic fire-themed poster with intense typography." },
      { img: `${P}/p08-img07.png`, title: "Once Upon A Time", desc: "Romantic book-cover composite with double exposure." },
      { img: `${P}/p08-img05.png`, title: "Ginger Beer Brand Mockups", desc: "Cohesive product mockups — cup, bottle, apparel & packaging." },
    ],
  },
  {
    id: "typography",
    title: "Typography & Print Design",
    description:
      "Specializing in typography, editorial layouts, and high-impact print collateral, I craft cohesive visual identities that translate seamlessly across physical and digital formats. My work blends aesthetic precision with practical execution, ensuring every brand touchpoint is sharp, professional, and memorable.",
    items: [
      { img: `${P}/p09-img02.png`, title: "Free Beer Banner", desc: "Outdoor promotional signage with honeycomb motifs." },
      { img: `${P}/p09-img03.png`, title: "Beuce lexo Business Card", desc: "Brand business card with tactile print finish." },
      { img: `${P}/p09-img04.png`, title: "Requiem Print Card", desc: "Elegant ribbon-tied print card with looping wordmark." },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Steve Gaming Audio — an immersive e-commerce experience for gamers. A high-contrast, dark-mode web & mobile application designed to simplify headphone spec comparison and streamline a frictionless 3-step checkout journey.",
    items: [
      { img: `${P}/p10-img03.png`, title: "Immersive Landing Page", desc: "Hero landing framing headphones as a deeper sound experience." },
      { img: `${P}/p10-img02.jpeg`, title: "App Screens Collage", desc: "Component explorations across mobile app screens." },
      { img: `${P}/p11-img02.png`, title: "Checkout — Tablet", desc: "Streamlined checkout flow in a tablet mockup." },
      { img: `${P}/p11-img03.png`, title: "Product Anatomy", desc: "Detailed spec & review view for informed decisions." },
      { img: `${P}/p13-img04.png`, title: "Mobile Checkout", desc: "Friction-free 3-step mobile checkout built for conversion." },
      { img: `${P}/p13-img02.png`, title: "Order Confirmed", desc: "Reassuring confirmation state closing the loop." },
    ],
  },
];

export const CORE_SKILLS = [
  { title: "Graphic Design", img: `${P}/p14-img02.jpeg`, desc: "Creating visually appealing designs, product mockups, and logos with a focus on detail and usability. I also produce original digital and hand-drawn illustrations that enhance graphic projects and bring ideas to life." },
  { title: "UI/UX", img: `${P}/p14-img03.jpeg`, desc: "Designing intuitive user interfaces and engaging experiences with a focus on usability and aesthetics. Skilled in creating wireframes, prototypes, and mockups that balance functionality with visual appeal." },
  { title: "Video Editing", img: `${P}/p14-img04.jpeg`, desc: "Transforming raw footage into dynamic, engaging videos using Adobe Premiere Pro. Skilled in pacing, transitions, and audio refinement to deliver content that captures attention across gaming, promotional, and creative projects." },
];

export const STACK = [
  { name: "Photoshop", abbr: "Ps", color: "#31A8FF", bg: "#001E36" },
  { name: "Illustrator", abbr: "Ai", color: "#FF9A00", bg: "#330000" },
  { name: "Premiere Pro", abbr: "Pr", color: "#9999FF", bg: "#00005B" },
  { name: "Figma", abbr: "Fig", color: "#F24E1E", bg: "#1A1A1A" },
];

export const HOBBIES = [
  { title: "Photography", img: `${P}/p16-img04.jpeg` },
  { title: "Music", img: `${P}/p16-img02.jpeg` },
  { title: "Gaming", img: `${P}/p16-img05.jpeg` },
  { title: "Workout", img: `${P}/p16-img03.jpeg` },
];

export const MARQUEE_WORDS = [
  "GRAPHIC DESIGN", "UI / UX", "VIDEO EDITING", "BRANDING", "ILLUSTRATION", "TYPOGRAPHY",
];
