import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PROJECT_TOOLS } from "../../data/portfolio";
import { Reveal, SectionLabel, Polaroid } from "./primitives";
import { Plus, Minus } from "lucide-react";

const rotations = [-2.5, 1.5, -1, 2, -1.8, 1.2];

const toolsFor = (title) => PROJECT_TOOLS[title] || [];

const ProjectCard = ({ item, index, showCategory = false }) => (
  <motion.div
    data-testid={`project-card-${item.title}`}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 + (index % 8) * 0.05, duration: 0.5 }}
  >
    <Polaroid
      src={item.img}
      alt={item.title}
      rotate={rotations[index % rotations.length]}
      imgClass="aspect-[4/5]"
    />
    <div className="mt-3 px-1">
      {showCategory && (
        <p className="mb-1 font-body text-[10px] uppercase tracking-widest text-brand-red">
          {item.category}
        </p>
      )}
      <p className="font-display uppercase text-sm md:text-base text-brand-ink leading-tight">
        {item.title}
      </p>
      <p className="mt-1 font-body text-xs md:text-sm text-brand-ink/65 leading-snug">
        {item.desc}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {toolsFor(item.title).map((t) => (
          <span
            key={t}
            className="rounded-full border border-brand-ink/25 px-2 py-0.5 font-body text-[10px] uppercase tracking-wide text-brand-ink/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);


const CategoryRow = ({ cat, index, open, onToggle }) => (
  <div
    data-testid={`project-category-${cat.id}`}
    className="border-t-2 border-brand-ink last:border-b-2"
  >
    <button
      data-testid={`project-toggle-${cat.id}`}
      onClick={() => onToggle(cat.id)}
      aria-expanded={open}
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
                <ProjectCard key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FilterPill = ({ active, onClick, children, testid }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    className={`rounded-full border-2 px-4 py-2 font-body text-xs md:text-sm font-bold uppercase tracking-wide transition-colors ${
      active
        ? "bg-brand-red text-white border-brand-red"
        : "border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-cream"
    }`}
  >
    {children}
  </button>
);

export const Projects = () => {
  const [openId, setOpenId] = useState(CATEGORIES[0].id);
  const [filter, setFilter] = useState({ type: "all" });
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const allItems = useMemo(
    () =>
      CATEGORIES.flatMap((c) =>
        c.items.map((it) => ({ ...it, category: c.title, categoryId: c.id }))
      ),
    []
  );

  const tools = useMemo(() => {
    const set = new Set();
    allItems.forEach((it) => toolsFor(it.title).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allItems]);

  const filtered = useMemo(() => {
    if (filter.type === "discipline")
      return allItems.filter((it) => it.categoryId === filter.value);
    if (filter.type === "tool")
      return allItems.filter((it) => toolsFor(it.title).includes(filter.value));
    return [];
  }, [filter, allItems]);

  const isAll = filter.type === "all";

  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 md:py-36 paper-texture">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel chapter="03" title="Projects" />
          <p className="mt-6 max-w-2xl font-body text-base md:text-lg text-brand-ink/70">
            A collection of work across five disciplines. Browse everything, or filter by discipline or tool.
          </p>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.1}>
          <div data-testid="project-filters" className="mt-10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="mr-1 font-body text-[11px] uppercase tracking-widest text-brand-ink/45">
                Discipline
              </span>
              <FilterPill
                testid="filter-all"
                active={isAll}
                onClick={() => setFilter({ type: "all" })}
              >
                All Work
              </FilterPill>
              {CATEGORIES.map((c) => (
                <FilterPill
                  key={c.id}
                  testid={`filter-discipline-${c.id}`}
                  active={filter.type === "discipline" && filter.value === c.id}
                  onClick={() => setFilter({ type: "discipline", value: c.id })}
                >
                  {c.title}
                </FilterPill>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="mr-1 font-body text-[11px] uppercase tracking-widest text-brand-ink/45">
                Tool
              </span>
              {tools.map((t) => (
                <FilterPill
                  key={t}
                  testid={`filter-tool-${t}`}
                  active={filter.type === "tool" && filter.value === t}
                  onClick={() => setFilter({ type: "tool", value: t })}
                >
                  {t}
                </FilterPill>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Accordion (All) or filtered flat grid */}
        {isAll ? (
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
        ) : (
          <div className="mt-12 md:mt-16">
            <p className="mb-8 font-body text-sm uppercase tracking-widest text-brand-ink/50">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <ProjectCard key={item.title} item={item} index={i} showCategory />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
