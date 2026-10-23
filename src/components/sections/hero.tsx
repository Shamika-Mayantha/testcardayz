"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";
import { CabinFrame, DoorArt, SteeringWheel } from "@/components/journey/car-art";

// The hero is a pinned scroll sequence: walk up to the car, the door swings
// open, you slide into the driver's seat and pull away. Scroll drives every
// frame, so the visitor controls the pace.

const chapters = [
  { n: "01", label: "APPROACH", range: [0, 0.22] },
  { n: "02", label: "STEP IN", range: [0.22, 0.5] },
  { n: "03", label: "DRIVE", range: [0.5, 1] },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  return reduce ? <StaticHero /> : <JourneyHero />;
}

function JourneyHero() {
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);

  // 01 — approach the car
  const titleOpacity = useTransform(p, [0, 0.1], [1, 0]);
  const titleY = useTransform(p, [0, 0.12], [0, -140]);
  const titleScale = useTransform(p, [0, 0.12], [1, 1.12]);
  const cueOpacity = useTransform(p, [0, 0.04], [1, 0]);
  const exteriorScale = useTransform(p, [0, 0.26], [1, 2.4]);
  const exteriorOpacity = useTransform(p, [0.2, 0.27], [1, 0]);

  // 02 — the door opens
  const doorOpacity = useTransform(p, [0.17, 0.25, 0.5, 0.53], [0, 1, 1, 0]);
  const doorScale = useTransform(p, [0.17, 0.3], [1.3, 1]);
  const doorRotate = useTransform(p, [0.32, 0.5], [0, -100]);
  const doorShade = useTransform(p, [0.32, 0.5], [0, 0.7]);
  const stepInOpacity = useTransform(p, [0.24, 0.29, 0.38, 0.44], [0, 1, 1, 0]);

  // 03 — inside, pulling away
  const cabinOpacity = useTransform(p, [0.27, 0.3], [0, 1]);
  const cabinScale = useTransform(p, [0.32, 0.56], [1.4, 1]);
  const roadScale = useTransform(p, [0.45, 1], [1.08, 1.7]);
  const roadY = useTransform(p, [0.45, 1], ["0%", "6%"]);
  const wheelRotate = useTransform(p, [0.56, 0.68, 0.8, 0.92], [0, -14, 10, 0]);
  const driveOpacity = useTransform(p, [0.55, 0.62, 0.86, 0.93], [0, 1, 1, 0]);
  const driveY = useTransform(p, [0.55, 0.62], [40, 0]);
  const speed = useTransform(p, [0.5, 0.94], [0, 120], { clamp: true });
  const speedText = useTransform(speed, (v) => Math.round(v).toString().padStart(3, "0"));
  const speedBar = useTransform(speed, [0, 120], [0, 1]);
  const hudOpacity = useTransform(p, [0.48, 0.54], [0, 1]);
  const exitOpacity = useTransform(p, [0.92, 1], [0, 1]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[560vh] bg-black"
      aria-label="Car Dayz Lanka — drive beyond ordinary"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1800px]">
        {/* Cabin sits underneath; the door swings away to reveal it */}
        <motion.div style={{ opacity: cabinOpacity, scale: cabinScale }} className="absolute inset-0">
          <motion.div style={{ scale: roadScale, y: roadY }} className="absolute inset-0">
            <Image
              src="/experience/highway.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.75] saturate-[0.85]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          <CabinFrame />
          <motion.div
            style={{ rotate: wheelRotate }}
            className="absolute bottom-[-20vh] left-1/2 w-[92vw] sm:bottom-[-38vh] -translate-x-1/2 sm:left-[34%] sm:w-[58vw] lg:w-[46vw]"
          >
            <SteeringWheel className="h-auto w-full drop-shadow-[0_-20px_60px_rgba(0,0,0,0.8)]" />
          </motion.div>

          <motion.div
            style={{ opacity: hudOpacity }}
            className="absolute bottom-[8vh] right-5 text-right sm:right-[10vw]"
          >
            <p className="font-mono text-[10px] tracking-[0.32em] text-white/55">KM/H</p>
            <motion.p className="font-[family-name:var(--font-oswald)] text-6xl leading-none text-white tabular-nums sm:text-7xl">
              {speedText}
            </motion.p>
            <div className="mt-3 ml-auto h-px w-32 bg-white/15">
              <motion.div style={{ scaleX: speedBar }} className="h-px origin-left bg-cyan" />
            </div>
          </motion.div>
        </motion.div>

        {/* Exterior: the car on the road, the camera walking toward it */}
        <motion.div
          style={{ scale: exteriorScale, opacity: exteriorOpacity }}
          className="absolute inset-0 origin-[58%_62%]"
        >
          <Image
            src="/brand/hero.jpg"
            alt="Cinematic vehicle on an open road at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%] brightness-[0.55] contrast-110 saturate-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/80" />
          <div className="vignette absolute inset-0" />
        </motion.div>

        {/* The driver's door, hinged at the front edge */}
        <motion.div
          style={{ opacity: doorOpacity, scale: doorScale, rotateY: doorRotate }}
          className="absolute inset-0 origin-left [transform-style:preserve-3d]"
        >
          <DoorArt />
          <motion.div style={{ opacity: doorShade }} className="absolute inset-0 bg-black" />
        </motion.div>

        {/* Copy */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
          className="absolute inset-0 flex flex-col justify-end px-5 pb-40 pt-28 sm:px-10 lg:px-16 lg:pb-44"
        >
          <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">CAR RENTAL / SRI LANKA</p>
          <h1 className="mt-5 font-[family-name:var(--font-oswald)] text-[16vw] leading-[0.8] tracking-tight text-white sm:text-[11vw] lg:text-[8.6vw]">
            DRIVE
            <br />
            BEYOND
            <br />
            <span className="text-white/80">ORDINARY.</span>
          </h1>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute sm:text-base">
            Your journey starts with the right car.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: stepInOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">02 / STEP IN</p>
          <p className="mt-4 font-[family-name:var(--font-oswald)] text-[13vw] leading-[0.85] tracking-tight text-white sm:text-8xl">
            THE KEYS
            <br />
            ARE YOURS.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: driveOpacity, y: driveY }}
          className="pointer-events-none absolute inset-x-0 top-[16vh] flex flex-col items-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">03 / DRIVE</p>
          <p className="mt-4 font-[family-name:var(--font-oswald)] text-[12vw] leading-[0.85] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:text-8xl">
            THE ISLAND
            <br />
            IS OPEN.
          </p>
        </motion.div>

        <ChapterRail progress={p} />

        <motion.a
          href="#book"
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
          aria-label="Scroll to begin the journey"
        >
          <span className="font-mono text-[9px] tracking-[0.28em]">SCROLL TO DRIVE</span>
          <span className="animate-scroll-dot h-8 w-px bg-cyan" />
        </motion.a>

        <motion.div style={{ opacity: exitOpacity }} className="pointer-events-none absolute inset-0 bg-[#050505]" />
      </div>
    </section>
  );
}

function ChapterRail({ progress }: { progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 0.94], [0, 1]);
  return (
    <div className="pointer-events-none absolute bottom-8 left-5 hidden w-[min(360px,40vw)] sm:left-10 lg:block">
      <div className="flex justify-between">
        {chapters.map((c) => (
          <ChapterLabel key={c.n} progress={progress} chapter={c} />
        ))}
      </div>
      <div className="mt-3 h-px w-full bg-white/15">
        <motion.div style={{ scaleX: fill }} className="h-px origin-left bg-cyan" />
      </div>
    </div>
  );
}

function ChapterLabel({
  progress,
  chapter,
}: {
  progress: MotionValue<number>;
  chapter: (typeof chapters)[number];
}) {
  const [start, end] = chapter.range;
  // Keyframe offsets must stay inside 0–1 or scroll-linked animation throws.
  const opacity = useTransform(
    progress,
    start === 0 ? [0, end - 0.02, end] : [start - 0.02, start, end - 0.02, end],
    start === 0 ? [1, 1, 0.35] : [0.35, 1, 1, 0.35],
  );
  return (
    <motion.span style={{ opacity }} className="font-mono text-[10px] tracking-[0.28em] text-white">
      <span className="text-cyan">{chapter.n}</span> {chapter.label}
    </motion.span>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-black">
      <Image
        src="/brand/hero.jpg"
        alt="Cinematic vehicle on an open road at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%] brightness-[0.55] contrast-110 saturate-[0.78]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-[#050505]" />
      <div className="vignette absolute inset-0" />
      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-40 pt-28 sm:px-10 lg:px-16 lg:pb-44">
        <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">CAR RENTAL / SRI LANKA</p>
        <h1 className="mt-5 font-[family-name:var(--font-oswald)] text-[16vw] leading-[0.8] tracking-tight text-white sm:text-[11vw] lg:text-[8.6vw]">
          DRIVE
          <br />
          BEYOND
          <br />
          <span className="text-white/80">ORDINARY.</span>
        </h1>
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute sm:text-base">
          Your journey starts with the right car.
        </p>
      </div>
    </section>
  );
}
