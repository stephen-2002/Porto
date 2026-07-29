import { EDUCATION, EXPERIENCE } from "../../data/portfolio";
import { Reveal, SectionLabel } from "./primitives";
import { GraduationCap, Briefcase, Check } from "lucide-react";

export const Journey = () => (
  <section id="journey" data-testid="journey-section" className="relative py-24 md:py-36 blue-paper">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <Reveal>
        <SectionLabel chapter="02" title="Education & Experience" />
      </Reveal>

      <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-brand-red" size={24} />
            <h3 className="font-display uppercase text-xl md:text-2xl text-brand-ink">Education</h3>
          </div>
          <div className="relative pl-8 border-l-2 border-brand-ink/25">
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative mb-10 last:mb-0">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-brand-red border-2 border-brand-ink" />
                  <p className="font-body text-xs uppercase tracking-widest text-brand-ink/60">
                    {e.years}
                  </p>
                  <p className="mt-1 font-display uppercase text-lg md:text-xl text-brand-ink leading-tight">
                    {e.school}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-brand-red" size={24} />
            <h3 className="font-display uppercase text-xl md:text-2xl text-brand-ink">Experience</h3>
          </div>
          <Reveal>
            <div className="bg-brand-paper border-2 border-brand-ink rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_#E53935]">
              <p className="font-body text-xs uppercase tracking-widest text-brand-red">
                {EXPERIENCE.years}
              </p>
              <p className="mt-1 font-display uppercase text-lg md:text-xl text-brand-ink leading-tight">
                {EXPERIENCE.company}
              </p>
              <p className="mt-4 font-body text-sm md:text-base leading-relaxed text-brand-ink/80">
                {EXPERIENCE.description}
              </p>
              <p className="mt-6 font-body text-xs uppercase tracking-widest text-brand-ink/50">
                Skills Gained
              </p>
              <ul className="mt-3 space-y-2">
                {EXPERIENCE.skills.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-brand-ink/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-red" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
