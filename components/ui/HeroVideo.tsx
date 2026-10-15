"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  /** Looping background. Pass an empty string to rest on the poster still (slow drift). */
  src: string;
  poster: string;
  /** Optional one-shot opening (the emblem push-through). Plays once, then hands off to the loop. */
  intro?: string;
  introPoster?: string;
  className?: string;
  /** Called once the opening has finished or been skipped. */
  onIntroEnd?: () => void;
}

type Phase = "intro" | "loop";

/**
 * Scene 01-02 then Scene 03: the emblem opening plays once, the city loop takes over.
 * Click anywhere on the intro (or press Escape) to skip. Reduced motion or a blocked
 * autoplay falls back to the still poster, and the intro is shown only once per session.
 */
export default function HeroVideo({ src, poster, intro, introPoster, className = "", onIntroEnd }: HeroVideoProps) {
  const loopRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>(intro ? "intro" : "loop");
  const [loopReady, setLoopReady] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisabled(true);
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem("mcp-intro-seen") === "1" || new URLSearchParams(window.location.search).has("nointro");
    } catch {}
    if (seen || !intro) {
      setPhase("loop");
      onIntroEnd?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro]);

  // start whichever video is current
  useEffect(() => {
    if (disabled) return;
    const v = phase === "intro" ? introRef.current : loopRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => setDisabled(true));
  }, [phase, disabled]);

  const finishIntro = () => {
    try {
      sessionStorage.setItem("mcp-intro-seen", "1");
    } catch {}
    setPhase("loop");
    onIntroEnd?.();
  };

  // keep the opening rolling if the browser pauses it (tab hidden, power saving)
  useEffect(() => {
    if (phase !== "intro") return;
    const v = introRef.current;
    if (!v) return;
    const resume = () => {
      if (phase === "intro" && v.paused && !v.ended && document.visibilityState === "visible") {
        v.play().catch(() => {});
      }
    };
    v.addEventListener("pause", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      v.removeEventListener("pause", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishIntro();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const showLoop = phase === "loop" && loopReady && !disabled;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {/* still fallback */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${src ? "" : "kenburns"} ${showLoop || phase === "intro" ? "opacity-0" : "opacity-100"}`}
      />

      {/* the loop (preloads behind the intro); skipped when src is empty */}
      {!disabled && src && (
        <video
          ref={loopRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setLoopReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${showLoop ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* the emblem opening */}
      {!disabled && intro && phase === "intro" && (
        <div className="absolute inset-0 z-20 bg-black cursor-pointer" onClick={finishIntro} role="button" aria-label="Skip intro">
          <video
            ref={introRef}
            src={intro}
            poster={introPoster}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={finishIntro}
            onError={finishIntro}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[9px] tracking-[0.3em] uppercase text-text-muted hover:text-gold transition-colors">
            Skip
          </span>
        </div>
      )}
    </div>
  );
}
