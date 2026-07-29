import { MARQUEE_WORDS } from "../../data/portfolio";

export const Marquee = () => {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div
      data-testid="marquee"
      className="relative border-y-2 border-brand-ink bg-brand-red py-4 md:py-6 overflow-hidden"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display uppercase text-white text-2xl md:text-4xl px-6 md:px-10 tracking-tight">
              {word}
            </span>
            <span className="font-display text-brand-cream/70 text-2xl md:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
