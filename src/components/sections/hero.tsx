"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";
import { business, genericWhatsappText, whatsappHref } from "@/data/business";
import { fleet } from "@/data/fleet";

// Scroll scrubs a pre-rendered 3D frame sequence: the studio lights come up
// on the car, the camera orbits it, tours the details and pulls up and away.
// Frames live in /public/frames/{desk,mob}/NNN.webp (landscape and portrait).
const FRAME_COUNT = 150;
const framePath = (set: string, i: number) => `/frames/${set}/${String(i).padStart(3, "0")}.webp`;

export function Hero() {
  const reduce = useReducedMotion();
  return reduce ? <StaticHero /> : <FrameHero />;
}

function FrameHero() {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const current = useRef(0);
  const p = usePinnedProgress(ref);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const set = window.innerWidth / window.innerHeight < 0.9 ? "mob" : "desk";

    const draw = () => {
      const imgs = frames.current;
      // Nearest frame that has finished loading, searching backwards first.
      let img: HTMLImageElement | undefined;
      for (let d = 0; d < FRAME_COUNT && !img; d++) {
        const a = imgs[current.current - d];
        const b = imgs[current.current + d];
        if (a?.complete && a.naturalWidth) img = a;
        else if (b?.complete && b.naturalWidth) img = b;
      }
      if (!img) return;
      const { width: cw, height: ch } = el;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.fillStyle = "#050506";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
      draw();
    };

    frames.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (Math.abs(i - current.current) < 3) draw();
      };
      img.src = framePath(set, i);
      return img;
    });

    let raf = 0;
    const unsubscribe = p.on("change", (v) => {
      current.current = Math.round(v * (FRAME_COUNT - 1));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });

    resize();
    window.addEventListener("resize", resize);
    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [p]);

  // Copy timeline, matched to the camera path baked into the frames.
  const introOpacity = useTransform(p, [0, 0.1, 0.14], [1, 1, 0]);
  const introY = useTransform(p, [0, 0.14], [0, -80]);
  const unveilOpacity = useTransform(p, [0.17, 0.21, 0.29, 0.33], [0, 1, 1, 0]);
  const tachOpacity = useTransform(p, [0.36, 0.4, 0.56, 0.6], [0, 1, 1, 0]);
  const tach = useTransform(p, [0.38, 0.55], [0, 1], { clamp: true });
  const detailOpacity = useTransform(p, [0.63, 0.67, 0.8, 0.84], [0, 1, 1, 0]);
  const outroOpacity = useTransform(p, [0.9, 0.95], [0, 1]);
  const outroY = useTransform(p, [0.9, 0.95], [40, 0]);
  const outroEvents = useTransform(p, (v) => (v > 0.92 ? "auto" : "none"));
  const cueOpacity = useTransform(p, [0, 0.03], [1, 0]);
  const frameLabel = useTransform(p, (v) => String(Math.round(v * (FRAME_COUNT - 1)) + 1).padStart(3, "0"));

  return (
    <section id="top" ref={ref} className="relative h-[900vh] bg-ink" aria-label="Car Dayz Lanka — drive beyond ordinary">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,6,0.85)_100%)]" />

        {/* 01 — intro */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-x-0 top-[17vh] flex flex-col items-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.5em] text-cyan">CAR DAYZ LANKA</p>
          <h1 className="mt-6 font-[family-name:var(--font-display-face)] text-[13vw] leading-[0.9] text-ivory sm:text-[8.5vw]">
            Drive beyond <em className="text-cyan">ordinary.</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm text-ivory/60 sm:text-base">Your journey starts with the right car.</p>
        </motion.div>

        {/* 02 — lights up */}
        <Caption opacity={unveilOpacity} kicker="02 — UNVEILED" title="Every journey deserves" accent="a moment." align="left" />

        {/* 03 — the orbit, with a tachometer of real numbers */}
        <motion.div
          style={{ opacity: tachOpacity }}
          className="pointer-events-none absolute bottom-[10vh] left-1/2 -translate-x-1/2 sm:bottom-[7vh] sm:left-10 sm:translate-x-0 lg:left-16"
        >
          <Tachometer progress={tach} />
        </motion.div>
        <Caption opacity={tachOpacity} kicker="03 — THE NUMBERS" title="Rated by the" accent="road." align="left" />

        {/* 04 — details */}
        <Caption opacity={detailOpacity} kicker="04 — IN THE DETAILS" title="Choose a vehicle suited" accent="to your journey." align="right" />

        {/* 05 — outro */}
        <motion.div
          style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroEvents }}
          className="absolute inset-x-0 bottom-[12vh] flex flex-col items-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.5em] text-cyan">05 — YOURS</p>
          <p className="mt-4 font-[family-name:var(--font-display-face)] text-[11vw] leading-[0.95] text-ivory sm:text-7xl lg:text-8xl">
            Your next journey <em className="text-cyan">starts here.</em>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappHref(genericWhatsappText)}
              target="_blank"
              rel="noreferrer"
              data-cursor="BOOK"
              className="rounded-full bg-cyan px-7 py-3.5 font-mono text-[11px] tracking-[0.24em] text-ivory transition hover:bg-ivory hover:text-ink"
            >
              BOOK ON WHATSAPP →
            </a>
            <a
              href="#fleet"
              className="rounded-full border border-ivory/25 px-7 py-3.5 font-mono text-[11px] tracking-[0.24em] text-ivory transition hover:border-ivory"
            >
              EXPLORE THE FLEET
            </a>
          </div>
        </motion.div>

        {/* HUD */}
        <div className="pointer-events-none absolute bottom-6 left-5 hidden font-mono text-[10px] tracking-[0.32em] text-ivory/45 sm:left-10 sm:block">
          FRAME <motion.span className="text-ivory tabular-nums">{frameLabel}</motion.span> / {FRAME_COUNT}
        </div>
        <ProgressTicks progress={p} />
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-ivory/60"
        >
          <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL TO REVEAL</span>
          <span className="animate-scroll-dot h-10 w-px bg-cyan" />
        </motion.div>
      </div>
    </section>
  );
}

function Caption({
  opacity,
  kicker,
  title,
  accent,
  align,
}: {
  opacity: MotionValue<number>;
  kicker: string;
  title: string;
  accent: string;
  align: "left" | "right";
}) {
  const x = useTransform(opacity, [0, 1], [align === "left" ? -30 : 30, 0]);
  return (
    <motion.div
      style={{ opacity, x }}
      className={`pointer-events-none absolute top-[14vh] max-w-[min(560px,88vw)] px-5 sm:top-[18vh] sm:px-10 lg:px-16 ${
        align === "left" ? "left-0" : "right-0 text-right"
      }`}
    >
      <p className="font-mono text-[11px] tracking-[0.5em] text-cyan">{kicker}</p>
      <p className="mt-4 font-[family-name:var(--font-display-face)] text-[10vw] leading-[0.95] text-ivory drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] sm:text-6xl lg:text-7xl">
        {title} <em className="text-cyan">{accent}</em>
      </p>
    </motion.div>
  );
}

// A 270° gauge whose needle and readouts sweep up with the scroll.
function Tachometer({ progress }: { progress: MotionValue<number> }) {
  const needle = useTransform(progress, [0, 1], [-135, 135]);
  const rating = useTransform(progress, (v) => (v * business.rating).toFixed(1));
  const reviews = useTransform(progress, (v) => Math.round(v * business.reviews).toString());
  const cars = useTransform(progress, (v) => Math.round(v * fleet.length).toString());
  const r = 120;
  const arc = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
  };
  const [sx, sy] = arc(-135);
  const [ex, ey] = arc(135);
  const d = `M ${sx} ${sy} A ${r} ${r} 0 1 1 ${ex} ${ey}`;

  return (
    <div className="flex items-center gap-6">
      <div className="relative size-40 sm:size-36">
        <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
          <path d={d} fill="none" stroke="#ecebe8" strokeOpacity="0.1" strokeWidth="2" />
          {Array.from({ length: 28 }, (_, i) => {
            const deg = -135 + (270 / 27) * i;
            const a = ((deg - 90) * Math.PI) / 180;
            const major = i % 3 === 0;
            const r1 = major ? 98 : 104;
            return (
              <line
                key={i}
                x1={150 + r1 * Math.cos(a)}
                y1={150 + r1 * Math.sin(a)}
                x2={150 + 112 * Math.cos(a)}
                y2={150 + 112 * Math.sin(a)}
                stroke={i > 22 ? "#c21f30" : "#ecebe8"}
                strokeOpacity={major ? 0.7 : 0.3}
                strokeWidth={major ? 2 : 1}
              />
            );
          })}
          <motion.path d={d} fill="none" stroke="#c21f30" strokeWidth="3" strokeLinecap="round" style={{ pathLength: progress }} />
        </svg>
        <motion.div style={{ rotate: needle }} className="absolute inset-0">
          <span className="absolute left-1/2 top-[14%] h-[36%] w-[2px] -translate-x-1/2 rounded-full bg-ivory shadow-[0_0_12px_rgba(236,235,232,0.6)]" />
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="font-[family-name:var(--font-display-face)] text-4xl text-ivory tabular-nums">{rating}</motion.span>
          <span className="font-mono text-[9px] tracking-[0.32em] text-ivory/50">★ GOOGLE</span>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-3 font-mono text-[10px] tracking-[0.28em] text-ivory/55 sm:grid-cols-2 sm:gap-10">
        <div>
          <dt>REVIEWS</dt>
          <motion.dd className="mt-1 font-[family-name:var(--font-display-face)] text-3xl tracking-normal text-ivory tabular-nums">{reviews}</motion.dd>
        </div>
        <div>
          <dt>IN THE FLEET</dt>
          <motion.dd className="mt-1 font-[family-name:var(--font-display-face)] text-3xl tracking-normal text-ivory tabular-nums">{cars}</motion.dd>
        </div>
      </dl>
    </div>
  );
}

function ProgressTicks({ progress }: { progress: MotionValue<number> }) {
  const pct = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(pct, "change", (v) => {
    if (ref.current) ref.current.style.width = v;
  });
  return (
    <div className="pointer-events-none absolute bottom-6 right-5 hidden w-40 sm:right-10 sm:block">
      <div className="flex justify-between font-mono text-[10px] tracking-[0.32em] text-ivory/45">
        <span>REVEAL</span>
        <motion.span className="text-ivory tabular-nums">{pct}</motion.span>
      </div>
      <div className="mt-2 h-px bg-ivory/15">
        <span ref={ref} className="block h-px w-0 bg-cyan" />
      </div>
    </div>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <Image
        src={framePath("desk", 60)}
        alt="A dark red sports car in a studio"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        unoptimized
      />
      <div className="relative flex min-h-[100svh] flex-col items-center justify-start px-6 pt-[18vh] text-center">
        <p className="font-mono text-[11px] tracking-[0.5em] text-cyan">CAR DAYZ LANKA</p>
        <h1 className="mt-6 font-[family-name:var(--font-display-face)] text-[13vw] leading-[0.9] text-ivory sm:text-[8.5vw]">
          Drive beyond <em className="text-cyan">ordinary.</em>
        </h1>
        <p className="mt-6 max-w-sm text-sm text-ivory/60 sm:text-base">Your journey starts with the right car.</p>
      </div>
    </section>
  );
}
