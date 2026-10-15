"use client";

import { useRef, useState } from "react";

interface ReelCardProps {
  src: string;
  poster: string;
  title: string;
  client?: string;
  className?: string;
}

/**
 * Vertical (9:16) reel preview. Plays muted on hover,
 * click toggles sound. Keeps the page light: nothing loads until hover.
 */
export default function ReelCard({ src, poster, title, client, className = "" }: ReelCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };
  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (v.paused) play();
  };

  return (
    <div
      className={`group relative aspect-[9/16] overflow-hidden bg-charcoal border border-gold/10 ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        onClick={toggleSound}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />
      <div
        className="absolute inset-x-0 bottom-0 p-4 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)" }}
      >
        {client && <p className="text-[9px] tracking-[0.2em] uppercase text-gold mb-1">{client}</p>}
        <p
          className="font-display text-lg text-cream leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </p>
      </div>
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-cream/20 text-cream flex items-center justify-center text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {muted ? "♪" : "✕"}
      </button>
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-cream/40 bg-black/30 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#f0ebe0">
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
