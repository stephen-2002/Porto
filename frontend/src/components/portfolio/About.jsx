import { ABOUT, STACK } from "../../data/portfolio";
import { Reveal, SectionLabel } from "./primitives";

export const About = () => (
  <section id="about" data-testid="about-section" className="relative py-24 md:py-36 paper-texture">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <Reveal>
        <SectionLabel chapter={ABOUT.chapter} title="About Me" />
      </Reveal>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-7">
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-6 font-body text-lg md:text-2xl leading-relaxed text-brand-ink/90">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="mt-4 inline-flex items-center gap-3">
              <span className="font-accent text-3xl md:text-4xl text-brand-red">riban</span>
              <span className="h-[1px] w-16 bg-brand-ink/40" />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:pl-10 md:border-l border-brand-ink/15">
          <Reveal delay={0.15}>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-ink/50 mb-3">
              Design Philosophy
            </p>
            <p className="font-display uppercase leading-[0.95] text-2xl md:text-3xl text-brand-ink">
              {ABOUT.philosophy}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-4 gap-3">
              {STACK.map((s) => (
                <div
                  key={s.name}
                  title={s.name}
                  className="aspect-square rounded-xl flex items-center justify-center font-display text-lg md:text-xl border border-brand-ink/15"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.abbr}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
