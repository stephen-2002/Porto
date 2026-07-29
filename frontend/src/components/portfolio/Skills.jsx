import { motion } from "framer-motion";
import { CORE_SKILLS, STACK } from "../../data/portfolio";
import { Reveal, SectionLabel } from "./primitives";

export const Skills = () => (
  <section id="skills" data-testid="skills-section" className="relative py-24 md:py-36 blue-paper">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <Reveal>
        <SectionLabel chapter="04" title="Core Skills" />
      </Reveal>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {CORE_SKILLS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="h-full bg-brand-paper border-2 border-brand-ink rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-44 md:h-52 overflow-hidden border-b-2 border-brand-ink">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 left-0 bg-brand-red text-white font-display uppercase text-sm px-4 py-2">
                  {s.title}
                </span>
              </div>
              <p className="p-5 md:p-6 font-body text-sm md:text-base leading-relaxed text-brand-ink/80">
                {s.desc}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Creative Stack */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <h3 className="font-display uppercase text-3xl sm:text-4xl md:text-5xl text-brand-ink">
            My Creative <span className="text-brand-red">Stack</span>
          </h3>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {STACK.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="flex flex-col items-center gap-4 rounded-2xl border-2 border-brand-ink bg-brand-paper p-6 md:p-8"
              >
                <div
                  className="h-20 w-20 md:h-24 md:w-24 rounded-2xl flex items-center justify-center font-display text-3xl md:text-4xl"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.abbr}
                </div>
                <span className="font-body font-bold uppercase tracking-wide text-sm text-brand-ink">
                  {s.name}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
