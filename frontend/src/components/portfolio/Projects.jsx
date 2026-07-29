import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "../../data/portfolio";
import { Reveal, SectionLabel, Polaroid } from "./primitives";
import { Plus, Minus } from "lucide-react";

const rotations = [-2.5, 1.5, -1, 2, -1.8, 1.2];

const CategoryRow = ({ cat, index, open, onToggle }) => (
  <div
    data-testid={`project-category-${cat.id}`}
    className="border-t-2 border-brand-ink last:border-b-2"
  >
    <button
      data-testid={`project-toggle-${cat.id}`}
      onClick={() => onToggle(cat.id)}
      className="group w-full flex items-center justify-between gap-4 py-6 md:py-8 text-left"
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-body text-sm md:text-base text-brand-red tabular-nums">
          0{index + 1}
        </span>
        <h3
          className={`font-display uppercase tracking-tight leading-none text-2xl sm:text-4xl md:text-5xl transition-colors ${
            open ? "text-brand-red" : "text-brand-ink group-hover:text-brand-red"
          }`}
        >
          {cat.title}
        </h3>
      </div>
      <span className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-brand-ink flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-colors">
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-12 md:pb-16">
            <p className="max-w-3xl mb-8 font-body text-base md:text-lg leading-relaxed text-brand-ink/80">
              {cat.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {cat.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <Polaroid
                    src={item.img}
                    alt={item.title}
                    rotate={rotations[i % rotations.length]}
                    imgClass="aspect-[4/5]"
                  />
                  <div className="mt-3 px-1">
                    <p className="font-display uppercase text-sm md:text-base text-brand-ink leading-tight">
                      {item.title}
                    </p>
                    <p className="mt-1 font-body text-xs md:text-sm text-brand-ink/65 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const Projects = () => {
  const [openId, setOpenId] = useState(CATEGORIES[0].id);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 md:py-36 paper-texture">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel chapter="03" title="Projects" />
          <p className="mt-6 max-w-2xl font-body text-base md:text-lg text-brand-ink/70">
            A collection of work across five disciplines. Tap a category to expand the gallery.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {CATEGORIES.map((cat, i) => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              index={i}
              open={openId === cat.id}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
