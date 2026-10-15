"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Slow, continuous ticker. Pure CSS so it costs nothing. */
export default function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080808, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080808, transparent)" }}
      />
      <div className="marquee-track flex whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl font-light text-text-secondary/70 px-8 md:px-12 flex items-center gap-8 md:gap-12"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item}
            <span className="block w-1 h-1 rounded-full bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
