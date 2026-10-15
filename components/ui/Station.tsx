"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StationProps {
  /** Scene number, e.g. "02" */
  scene: string;
  /** Station name, e.g. "Services" */
  name: string;
  /** Light variant for cream sections */
  tone?: "dark" | "light";
  className?: string;
}

/** Where the fixed Metro line sits (must match MetroLine.tsx: left-8 / xl:left-12). */
function lineX() {
  return window.innerWidth >= 1280 ? 48 : 32;
}

/**
 * A Metro-sign style section marker: a station dot that snaps onto the fixed line
 * (lg and up), plus a slate-style label ("Scene 02 / Services").
 */
export default function Station({ scene, name, tone = "dark", className = "" }: StationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const [dotLeft, setDotLeft] = useState<number | null>(null);

  useEffect(() => {
    const place = () => {
      const el = ref.current;
      if (!el || window.innerWidth < 1024) return setDotLeft(null);
      const rect = el.getBoundingClientRect();
      setDotLeft(lineX() - rect.left - 7);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const text = tone === "light" ? "text-black" : "text-cream";
  const dim = tone === "light" ? "text-black/50" : "text-text-muted";
  const ring = tone === "light" ? "border-[#f0ebe0]" : "border-black";

  return (
    <div ref={ref} className={`relative flex items-center gap-4 ${className}`}>
      {dotLeft !== null && (
        <motion.span
          aria-hidden
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ left: dotLeft }}
          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gold border-2 ${ring}`}
        />
      )}
      <span className="inline-flex items-center border border-gold/50 rounded-full px-3 py-1 gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className={`text-[9px] tracking-[0.28em] uppercase ${dim}`}>Scene {scene}</span>
      </span>
      <span className={`text-[10px] md:text-[11px] tracking-[0.28em] uppercase ${text}`}>{name}</span>
    </div>
  );
}
