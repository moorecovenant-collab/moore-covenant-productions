"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Go-go. The sound of the city this company is built in. */
const tracks = [
  { label: "Chuck Brown · Bustin' Loose", url: "https://embed.music.apple.com/us/album/bustin-loose/175107981?i=175107982" },
  { label: "Rare Essence · Lock It", url: "https://embed.music.apple.com/us/album/lock-it/447807793?i=447807832" },
  { label: "Backyard Band · Hello", url: "https://embed.music.apple.com/us/album/byb-hello-bonus-track/1109138649?i=1109139918" },
];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 overflow-hidden border border-gold/30 bg-black"
            style={{ width: 300, borderRadius: 20 }}
          >
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.25em] uppercase text-gold">DC Go-Go</span>
              <div className="flex gap-1">
                {tracks.map((t, i) => (
                  <button
                    key={t.url}
                    onClick={() => setIdx(i)}
                    aria-label={t.label}
                    className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-gold" : "bg-text-muted hover:bg-cream"}`}
                  />
                ))}
              </div>
            </div>
            <iframe
              key={tracks[idx].url}
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="150"
              style={{ width: "100%", overflow: "hidden", background: "transparent" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={tracks[idx].url}
              title={tracks[idx].label}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-black/90 backdrop-blur border border-gold/40 hover:border-gold px-4 py-2.5 rounded-full transition-colors duration-300 group"
        aria-label={open ? "Close music player" : "Open music player"}
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="flex items-end gap-[2px] h-3.5" aria-hidden>
            {[0.6, 1, 0.4, 0.8].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [h, 1, h * 0.5, h] }}
                transition={{ duration: 1.1 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                className="block w-[2px] bg-gold origin-bottom"
                style={{ height: "100%" }}
              />
            ))}
          </span>
        )}
        <span className="text-[9px] tracking-[0.18em] uppercase text-gold/80 group-hover:text-gold transition-colors">
          {open ? "Close" : "Go-Go"}
        </span>
      </motion.button>
    </div>
  );
}
