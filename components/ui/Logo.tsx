"use client";

import { motion } from "framer-motion";

interface LogoProps {
  /** Height in px of the mark */
  size?: number;
  /** Show the wordmark next to the mark */
  wordmark?: boolean;
  /** Animate the sign lighting up (use once, in the nav) */
  animate?: boolean;
  tone?: "gold" | "cream" | "black";
  className?: string;
}

const tones = { gold: "#c4974a", cream: "#f0ebe0", black: "#080808" };

/**
 * The Metro sign mark: an oval pill with the M, redrawn as SVG so it is crisp at any size.
 * Proportions follow brand/assets/monogram_gold.png (391 x 467).
 */
export default function Logo({ size = 36, wordmark = true, animate = false, tone = "gold", className = "" }: LogoProps) {
  const c = tones[tone];
  const w = (size * 391) / 467;
  const draw = animate
    ? { initial: { pathLength: 0, opacity: 0.2 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] as const } }
    : {};
  const glow = animate
    ? { initial: { opacity: 0 }, animate: { opacity: [0, 1, 0.6, 1] }, transition: { duration: 1.2, delay: 1.2, ease: "easeInOut" as const } }
    : {};

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width={w} height={size} viewBox="0 0 391 467" fill="none" aria-label="Moore Covenant Productions">
        {/* outer pill */}
        <motion.rect x="14" y="14" width="363" height="439" rx="181.5" stroke={c} strokeWidth="28" {...draw} />
        {/* inner pill */}
        <motion.rect x="78" y="78" width="235" height="311" rx="117.5" stroke={c} strokeWidth="10" {...draw} />
        {/* the M, slab serif feel */}
        <motion.path
          d="M118 300V167h30l47 74 47-74h30v133h-28v-84l-49 76-49-76v84z"
          fill={c}
          {...glow}
          style={animate ? undefined : { opacity: 1 }}
        />
      </svg>
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[10px] md:text-[12px] tracking-[0.18em] md:tracking-[0.22em] uppercase font-medium whitespace-nowrap" style={{ color: c }}>
            Moore Covenant
          </span>
          <span className="text-[8px] md:text-[9px] tracking-[0.42em] uppercase mt-[3px]" style={{ color: c, opacity: 0.75 }}>
            Productions
          </span>
        </span>
      )}
    </span>
  );
}
