import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Journey } from "@/components/portfolio/Journey";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Hobbies } from "@/components/portfolio/Hobbies";
import { Contact } from "@/components/portfolio/Contact";
import { NAV } from "@/data/portfolio";

function App() {
  const lenisRef = useRef(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: id === "home" ? 0 : -10 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App bg-brand-cream">
      <div className="grain-overlay" aria-hidden />
      <Toaster position="top-center" richColors />
      <Nav active={active} onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Marquee />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Hobbies />
        <Contact />
      </main>
    </div>
  );
}

export default App;
