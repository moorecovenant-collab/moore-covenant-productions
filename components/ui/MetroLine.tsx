"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * The gold Metro line that runs down the left edge of the page and draws itself
 * as the reader scrolls. Stations (section markers) are rendered by <Station />.
 * Hidden on small screens where it would crowd the text.
 */
export default function MetroLine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div
      aria-hidden
      className="hidden lg:block fixed top-0 bottom-0 left-8 xl:left-12 w-px z-30 pointer-events-none"
    >
      <div className="absolute inset-0 bg-gold/10" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-gold via-gold to-gold/40"
      />
    </div>
  );
}
