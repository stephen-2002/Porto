import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROFILE } from "../../data/portfolio";
import { ArrowDown } from "lucide-react";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = ({ onNavigate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const ySig = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen overflow-hidden paper-texture flex flex-col justify-center pt-24 pb-16"
    >
      {/* floating red block */}
      <motion.div
        aria-hidden
        style={{ y: yBig }}
        className="absolute -right-24 top-24 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full bg-brand-red/10 blur-3xl"
      />
      <div className="absolute left-0 top-1/2 hidden md:block h-[1px] w-full bg-brand-ink/10" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-4 md:mb-8 font-body text-xs sm:text-sm uppercase tracking-[0.35em] text-brand-ink/60"
        >
          Portfolio — Visual Designer & Video Editor
        </motion.p>

        <motion.div style={{ y: yBig, opacity }} className="relative">
          <div className="hero-mask-line">
            <motion.h1
              custom={0}
              variants={line}
              initial="hidden"
              animate="show"
              className="font-display uppercase leading-[0.8] tracking-tighter text-brand-ink text-[22vw] md:text-[18vw]"
            >
              SRI<span className="text-brand-red">BAN</span>
            </motion.h1>
          </div>

          <motion.span
            style={{ y: ySig }}
            initial={{ opacity: 0, rotate: -8 }}
            animate={{ opacity: 1, rotate: -8 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pointer-events-none absolute -top-6 md:top-2 right-2 md:right-24 font-accent text-4xl md:text-7xl text-brand-ink"
          >
            Creative
          </motion.span>
        </motion.div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="hero-mask-line">
            <motion.p
              custom={2}
              variants={line}
              initial="hidden"
              animate="show"
              className="font-display uppercase tracking-tight text-brand-ink text-lg sm:text-2xl md:text-3xl"
            >
              Graphic Design <span className="text-brand-red">/</span> UI/UX{" "}
              <span className="text-brand-red">/</span> Video Editing
            </motion.p>
          </div>

          <motion.button
            data-testid="hero-cta"
            onClick={() => onNavigate("projects")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="group inline-flex items-center gap-3 self-start rounded-full border-2 border-brand-ink px-6 py-3 font-bold uppercase tracking-widest text-sm text-brand-ink hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"
          >
            View Work
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
