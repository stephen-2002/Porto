# SRIBAN Portfolio — PRD

## Original Problem Statement
Modern, responsive retro-vintage (red/blue/beige) portfolio website for SRIBAN, built from a PDF portfolio. Sections: Hero, About Me, Education & Experience, Projects (5 categories), Core Skills & Creative Stack, Hobbies, Contact (email + LinkedIn + form). Award-worthy motion (kinetic hero reveal, marquee, framer-motion scroll reveals, Lenis smooth scroll, parallax). All PDF text accurate.

## User Choices
- Contact form: email owner via Resend AND store in DB.
- Download Resume button required.
- Show email (ste282002@gmail.com) + LinkedIn; phone number removed.
- Use exact designs extracted from the PDF frames.

## Architecture
- **Frontend**: React (single page `/`), Tailwind (custom brand tokens), framer-motion, Lenis smooth scroll, sonner toasts. Components in `src/components/portfolio/`. Content in `src/data/portfolio.js`. Images extracted from PDF into `public/portfolio/` (auto-trimmed black borders). Resume PDF at `public/Sriban-Resume.pdf`.
- **Backend**: FastAPI. `POST /api/contact` (store in Mongo `contact_messages` + email owner via Emergent Resend proxy), `GET /api/contact`. Env: EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, OWNER_EMAIL.

## Implemented (2026-07-29)
- Kinetic hero (masked line reveal + parallax + cursive "Creative").
- Editorial marquee, About manifesto + stack badges, Education/Experience timeline.
- Projects: 5 collapsible category galleries with real PDF mockups (polaroid frames, hover lift).
- Core Skills cards + Creative Stack (Ps/Ai/Pr/Figma).
- Hobbies bento image grid.
- Contact: mailto + LinkedIn links, working form (email + DB), Download Resume.
- Verified: backend 100%, frontend 100% (testing agent iteration_1).

## Backlog / Next
- P1: Admin view to browse contact messages.
- P2: Case-study detail pages for the Steve Gaming UI/UX project.
- P2: Video reel embed for Video Editing.
