import { motion } from "framer-motion";
import { HOBBIES } from "../../data/portfolio";
import { Reveal, SectionLabel } from "./primitives";

const spans = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export const Hobbies = () => (
  <section id="hobbies" data-testid="hobbies-section" className="relative py-24 md:py-36 paper-texture">
    <div className="mx-auto max-w-[1400px] px-5 md:px-10">
      <Reveal>
        <SectionLabel chapter="05" title="Hobbies" />
        <p className="mt-6 max-w-xl font-body text-base md:text-lg text-brand-ink/70">
          Life beyond the canvas — what keeps my creativity charged.
        </p>
      </Reveal>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 md:auto-rows-[220px]">
        {HOBBIES.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.1} className={spans[i % spans.length]}>
            <motion.div
              whileHover="hover"
              className="group relative h-64 md:h-full w-full overflow-hidden rounded-2xl border-2 border-brand-ink"
            >
              <motion.img
                src={h.img}
                alt={h.title}
                loading="lazy"
                variants={{ hover: { scale: 1.08 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0">
                <span className="block bg-brand-red text-white font-display uppercase tracking-wide text-base md:text-lg px-5 py-3">
                  {h.title}
                </span>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
