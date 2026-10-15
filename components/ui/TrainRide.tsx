"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

export interface RideStop {
  /** Frame index (0-based) where the doors are open and the sign is readable */
  frame: number;
  /** How many frames the stop "holds" while the label is shown */
  hold: number;
  number: string;
  name: string;
  blurb: string;
  href: string;
}

interface TrainRideProps {
  /** e.g. "/train/t_" -> /train/t_0001.webp */
  framePath: string;
  frameCount: number;
  ext?: string;
  /** zero-padded width of the frame number in the filename */
  pad?: number;
  stops: RideStop[];
  /** scroll distance per frame, in px */
  pxPerFrame?: number;
  poster: string;
  /** folder with chime.m4a and stop-NN.m4a announcements */
  voicePath?: string;
  /** lighter frame set for phones, e.g. "/train/m/t_" (same frame count) */
  mobileFramePath?: string;
}

/**
 * The Metro ride. A pre-rendered Blender sequence scrubbed by scroll: the page pins,
 * scrolling drives the train, and each station reveals its service with a link.
 * Frames load progressively. Reduced motion gets the poster and a plain list of stops.
 */
export default function TrainRide({
  framePath,
  frameCount,
  ext = "webp",
  pad = 4,
  stops,
  pxPerFrame = 9,
  poster,
  voicePath = "/train/voice/",
  mobileFramePath,
}: TrainRideProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [frame, setFrame] = useState(0);

  // phones get the lighter frame set (same count, 960 px wide) when one is provided
  const [path, setPath] = useState(framePath);
  useEffect(() => {
    if (mobileFramePath && window.innerWidth < 900) setPath(mobileFramePath);
  }, [mobileFramePath]);
  const src = (i: number) => `${path}${String(i + 1).padStart(pad, "0")}.${ext}`;

  // reduced motion check
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // progressive preload: first every 8th frame, then fill in
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    imgs.current = new Array(frameCount).fill(null);
    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.onload = () => {
          if (!cancelled) imgs.current[i] = im;
          res();
        };
        im.onerror = () => res();
        im.src = src(i);
      });
    (async () => {
      const order: number[] = [];
      for (let step = 8; step >= 1; step = step / 2) {
        for (let i = 0; i < frameCount; i += step) if (!order.includes(i)) order.push(i);
      }
      await load(0);
      if (!cancelled) setReady(true);
      // load in small parallel batches
      for (let k = 0; k < order.length; k += 6) {
        if (cancelled) return;
        await Promise.all(order.slice(k, k + 6).map(load));
        // repaint with whatever is loaded now, so the ride never sits on a black canvas
        requestAnimationFrame(() => draw(frameMV.get()));
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, framePath, reduced]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const rawFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  // ease the scrub so a wheel tick glides through the frames instead of jumping
  // `?rec=1` snaps instead of easing, for frame-exact captures of the page
  const rec = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("rec");
  const frameMV = useSpring(rawFrame, rec ? { stiffness: 4000, damping: 200, restDelta: 0.001 } : { stiffness: 120, damping: 26, mass: 0.6, restDelta: 0.01 });

  // draw the nearest loaded frame (hoisted so the loader effect above can call it)
  function draw(f: number) {
    const c = canvasRef.current;
    if (!c) return;
    let i = Math.round(f);
    // find nearest loaded frame
    let im = imgs.current[i];
    for (let d = 1; !im && d < 16; d++) {
      im = imgs.current[i - d] || imgs.current[i + d];
    }
    if (!im) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const cw = c.width, ch = c.height;
    const s = Math.max(cw / im.width, ch / im.height);
    const w = im.width * s, h = im.height * s;
    // portrait phones crop a 16:9 frame hard; bias the crop toward the door and station sign (right of centre)
    const portrait = ch > cw;
    const fx = portrait ? 0.62 : 0.5;
    const x = Math.min(0, Math.max(cw - w, cw * fx - w * fx));
    ctx.drawImage(im, x, (ch - h) / 2, w, h);
  }

  const [started, setStarted] = useState(false);
  useMotionValueEvent(frameMV, "change", (v) => {
    setFrame(Math.round(v));
    if (v > 0.5) setStarted(true);
    requestAnimationFrame(() => draw(v));
  });

  // where the 16:9 frame lands on screen in CSS px (same cover + crop rule as draw()), for mounted overlays
  const [fit, setFit] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  useEffect(() => {
    const place = () => {
      const cw = window.innerWidth, ch = window.innerHeight;
      const s = Math.max(cw / 16, ch / 9);
      const w = 16 * s, h = 9 * s;
      const fx = ch > cw ? 0.62 : 0.5;
      const x = Math.min(0, Math.max(cw - w, cw * fx - w * fx));
      setFit({ x, y: (ch - h) / 2, w, h });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  // size the canvas to the viewport (device pixel ratio capped for perf)
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = Math.round(window.innerWidth * dpr);
      c.height = Math.round(window.innerHeight * dpr);
      draw(frameMV.get());
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (ready) draw(frameMV.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const active = useMemo(() => stops.find((s) => frame >= s.frame - 6 && frame <= s.frame + s.hold), [frame, stops]);
  const height = frameCount * pxPerFrame;

  // the in-car destination sign: "next stop" until the doors open, then the stop name
  const nextStop = useMemo(() => stops.find((s) => frame < s.frame - 6) ?? null, [frame, stops]);
  const signText = active ? `THIS STOP  ·  ${active.name.toUpperCase()}` : nextStop ? `NEXT STOP  ·  ${nextStop.name.toUpperCase()}` : "END OF THE LINE  ·  THANK YOU FOR RIDING";

  // announcements: chime + voice at each stop (on by default; muted with the speaker button)
  const [voiceOn, setVoiceOn] = useState(true);
  const announced = useRef<string | null>(null);
  const unlocked = useRef(false);
  useEffect(() => {
    const unlock = () => {
      unlocked.current = true;
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("wheel", unlock, { once: true, passive: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);
  // one announcement per cue: "next-NN" when the sign flips to the next stop, "arrive-NN" (after the chime) when the doors open
  const playing = useRef<HTMLAudioElement | null>(null);
  const cue = active ? `arrive-${active.number}` : nextStop ? `next-${nextStop.number}` : null;
  useEffect(() => {
    // nothing plays until the rider has actually started the ride and touched the page
    if (!voiceOn || !cue || !started || !unlocked.current || announced.current === cue) return;
    announced.current = cue;
    playing.current?.pause();
    const voice = new Audio(`${voicePath}${cue}.m4a`);
    voice.volume = 0.9;
    playing.current = voice;
    if (cue.startsWith("arrive")) {
      const chime = new Audio(`${voicePath}chime.m4a`);
      chime.volume = 0.6;
      chime.play().catch(() => {});
      const t = window.setTimeout(() => voice.play().catch(() => {}), 650);
      return () => window.clearTimeout(t);
    }
    voice.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cue, voiceOn, started]);

  if (reduced) {
    return (
      <section className="relative bg-black">
        <img src={poster} alt="" className="w-full h-[70vh] object-cover opacity-70" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stops.map((s) => (
            <Link key={s.number} href={s.href} className="pill-card border border-border/40 p-6 hover:border-gold/50 transition-colors">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Stop {s.number}</p>
              <p className="font-display text-2xl text-cream mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.name}</p>
              <p className="text-sm text-text-secondary mt-2">{s.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} className="relative bg-black" style={{ height }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden letterbox">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {!ready && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />}

        {/* ride HUD */}
        <div className="absolute top-20 left-6 md:left-10 lg:left-16 z-20 flex items-center gap-3">
          <span className="inline-flex items-center border border-gold/50 rounded-full px-3 py-1 gap-2 bg-black/50 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[9px] tracking-[0.28em] uppercase text-text-muted">Now riding</span>
          </span>
          <span className="text-[10px] tracking-[0.28em] uppercase text-cream">The Covenant Line</span>
          <button
            type="button"
            onClick={() => setVoiceOn((v) => !v)}
            aria-pressed={voiceOn}
            aria-label={voiceOn ? "Mute announcements" : "Unmute announcements"}
            className="ml-1 inline-flex items-center gap-1.5 border border-gold/40 rounded-full px-2.5 py-1 bg-black/50 backdrop-blur text-[9px] tracking-[0.22em] uppercase text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>{voiceOn ? "♪" : "×"}</span>
            <span>{voiceOn ? "Announcements on" : "Muted"}</span>
          </button>
        </div>

        {/* in-car LED display, mounted on the wall above the right window (tracks the frame's crop) */}
        {fit && (
          <div
            className="car-led"
            style={{
              // starts at the window post and runs along the wall above the big window
              left: fit.x + fit.w * 0.487,
              // on short, wide viewports the wall band is cropped under the nav: keep the display just below it
              top: Math.max(fit.y + fit.h * 0.16, 84),
              width: fit.w * 0.4,
              height: fit.h * 0.07,
              fontSize: Math.min(fit.h * 0.07 * 0.42, (fit.w * 0.4) / 38),
            }}
            aria-live="polite"
          >
            <span className="car-led-dot" aria-hidden />
            <span key={signText} className="car-led-text">{signText}</span>
          </div>
        )}

        {/* progress: stations along the bottom */}
        <div className="absolute bottom-16 md:bottom-20 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 z-20">
          <div className="relative h-px bg-gold/20">
            <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="absolute inset-0 bg-gold" />
            {stops.map((s) => (
              <span
                key={s.number}
                className={`absolute -top-[5px] w-[11px] h-[11px] rounded-full border-2 border-black transition-colors ${frame >= s.frame - 6 ? "bg-gold" : "bg-text-muted"}`}
                style={{ left: `calc(${(s.frame / (frameCount - 1)) * 100}% - 5px)` }}
                title={s.name}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[8px] md:text-[9px] tracking-[0.22em] uppercase text-text-muted">
            {stops.map((s) => (
              <span key={s.number} className={frame >= s.frame - 6 ? "text-gold" : ""}>{s.name}</span>
            ))}
          </div>
        </div>

        {/* station card */}
        <motion.div
          key={active?.number ?? "none"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 md:left-10 lg:left-16 bottom-36 md:bottom-44 z-20 max-w-md pointer-events-none"
        >
          {active && (
            <div className="pill-card bg-black/70 backdrop-blur border border-gold/30 p-6 md:p-8 pointer-events-auto">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold">Stop {active.number}</p>
              <p className="font-display text-3xl md:text-4xl text-cream mt-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {active.name}
              </p>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">{active.blurb}</p>
              <Link href={active.href} className="btn-primary mt-5 text-[10px] py-2.5 px-5">
                <span>Get off here</span>
              </Link>
            </div>
          )}
        </motion.div>

        <p className="absolute bottom-6 right-6 md:right-10 lg:right-16 z-20 text-[9px] tracking-[0.3em] uppercase text-text-muted">
          Scroll to ride
        </p>
      </div>
    </section>
  );
}
