"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APPLE_MUSIC_EMBED_URL = "https://embed.music.apple.com/us/album/sacred-stillness/1855514463?i=1855514470";

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 overflow-hidden border border-gold/30"
            style={{ width: 280, borderRadius: 12 }}
          >
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="150"
              style={{ width: "100%", overflow: "hidden", background: "transparent" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={APPLE_MUSIC_EMBED_URL}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-black border border-gold/40 hover:border-gold px-4 py-2.5 transition-colors duration-300 group"
        aria-label={open ? "Close music player" : "Open music player"}
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gold">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
        <span className="text-[9px] tracking-[0.18em] uppercase text-gold/80 group-hover:text-gold transition-colors">
          {open ? "Close" : "Now Playing"}
        </span>
      </motion.button>
    </div>
  );
}
