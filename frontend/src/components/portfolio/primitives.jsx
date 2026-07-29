import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 34, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionLabel = ({ chapter, title, dark = false }) => (
  <div className="flex items-end gap-4 md:gap-6">
    <span
      className={`font-display leading-none text-5xl md:text-7xl ${
        dark ? "text-brand-cream/25" : "text-brand-ink/15"
      }`}
    >
      {chapter}
    </span>
    <h2 className="font-display uppercase tracking-tight leading-[0.85] text-brand-red text-4xl sm:text-5xl md:text-6xl">
      {title}
    </h2>
  </div>
);

export const Polaroid = ({ src, alt, rotate = 0, className = "", imgClass = "" }) => (
  <div
    className={`polaroid rounded-[2px] transition-transform duration-500 ease-out will-change-transform hover:-translate-y-2 hover:rotate-0 ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`block w-full h-full object-cover ${imgClass}`}
    />
  </div>
);
