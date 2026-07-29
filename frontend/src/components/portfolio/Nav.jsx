import { useEffect, useState } from "react";
import { NAV, PROFILE } from "../../data/portfolio";
import { Download } from "lucide-react";

export const Nav = ({ active, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-cream/85 backdrop-blur-md border-b border-brand-ink/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => onNavigate("home")}
          className="font-display text-xl md:text-2xl tracking-tight text-brand-ink hover:text-brand-red transition-colors"
        >
          SRIBAN<span className="text-brand-red">.</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                active === item.id ? "text-brand-red" : "text-brand-ink/70 hover:text-brand-ink"
              }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-brand-red" />
              )}
            </button>
          ))}
        </nav>

        <a
          data-testid="nav-resume"
          href={PROFILE.resume}
          download
          className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-brand-ink px-4 md:px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest text-brand-ink hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"
        >
          <Download size={15} /> Resume
        </a>
      </div>
    </header>
  );
};
