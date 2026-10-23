"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";

// The hero is one pinned scroll sequence told in five beats:
// the word "Drive" opens like a window, you walk up to the car, its doors
// part, you settle into the driver's seat, and the road rushes in.

const beats = [
  { n: "01", label: "Ignition", at: 0 },
  { n: "02", label: "Approach", at: 0.18 },
  { n: "03", label: "Step in", at: 0.36 },
  { n: "04", label: "Take the wheel", at: 0.52 },
  { n: "05", label: "Drive", at: 0.7 },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  return reduce ? <StaticHero /> : <JourneyHero />;
}

function JourneyHero() {
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);

  // 01 — the word is a window onto the road; scrolling dives through it.
  const maskScale = useTransform(p, [0, 0.05, 0.12], [1, 3, 40]);
  const maskOpacity = useTransform(p, [0.04, 0.1], [1, 0]);
  const introOpacity = useTransform(p, [0, 0.04], [1, 0]);

  // 02 — approach: the road at dusk, then the car's flank coming closer.
  const roadScale = useTransform(p, [0, 0.2], [1.25, 1]);
  const roadOpacity = useTransform(p, [0.23, 0.27], [1, 0]);
  const headlineOpacity = useTransform(p, [0.12, 0.15, 0.22, 0.25], [0, 1, 1, 0]);
  const headlineY = useTransform(p, [0.12, 0.25], [60, -60]);
  const carScale = useTransform(p, [0.23, 0.4], [1, 1.45]);

  // 03 — the doors part down the middle.
  const leftDoor = useTransform(p, [0.38, 0.5], [0, -92]);
  const rightDoor = useTransform(p, [0.38, 0.5], [0, 92]);
  const doorsOpacity = useTransform(p, [0.47, 0.51], [1, 0]);
  const stepInOpacity = useTransform(p, [0.3, 0.34, 0.42, 0.46], [0, 1, 1, 0]);

  // 04 — the cabin: settle into the seat, then lean toward the windscreen.
  const cabinScale = useTransform(p, [0.4, 0.56, 0.66, 0.74], [1.35, 1, 1, 2.6]);
  const cabinOpacity = useTransform(p, [0.68, 0.74], [1, 0]);
  const wheelOpacity = useTransform(p, [0.52, 0.56, 0.62, 0.66], [0, 1, 1, 0]);

  // 05 — the open road.
  const driveScale = useTransform(p, [0.68, 1], [1.5, 1.05]);
  const streaks = useTransform(p, [0.7, 0.8, 0.95, 1], [0, 0.6, 0.6, 0]);
  const driveTextOpacity = useTransform(p, [0.76, 0.81, 0.92, 0.96], [0, 1, 1, 0]);
  const speed = useTransform(p, [0.7, 0.96], [0, 140]);
  const speedText = useTransform(speed, (v) => Math.round(v).toString().padStart(3, "0"));
  const hudOpacity = useTransform(p, [0.7, 0.74, 0.95, 0.99], [0, 1, 1, 0]);
  const exit = useTransform(p, [0.95, 1], [0, 1]);

  return (
    <section id="top" ref={ref} className="relative h-[800vh] bg-ink" aria-label="Car Dayz Lanka — drive beyond ordinary">
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1600px]">
        {/* 05 — the open road sits at the back of the stack */}
        <motion.div style={{ scale: driveScale }} className="absolute inset-0">
          <Image src="/brand/statement.jpg" alt="" fill sizes="100vw" className="object-cover brightness-[0.8]" />
        </motion.div>
        <motion.div style={{ opacity: streaks }} className="speed-streaks pointer-events-none absolute inset-0" />

        {/* 04 — the cabin */}
        <motion.div style={{ scale: cabinScale, opacity: cabinOpacity }} className="absolute inset-0 origin-[55%_30%]">
          <Image src="/fleet/sonet/03.jpg" alt="The driver's seat of a Kia Sonet" fill sizes="100vw" className="object-cover brightness-[0.85]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        </motion.div>

        {/* 03 — the doors: two halves of the car photo, hinged at the outer edges */}
        <motion.div style={{ opacity: doorsOpacity }} className="absolute inset-0 [transform-style:preserve-3d]">
          <motion.div style={{ rotateY: leftDoor }} className="absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden">
            <motion.div style={{ scale: carScale }} className="absolute inset-y-0 left-0 w-[200%] origin-[50%_55%]">
              <Image src="/fleet/vezel/03.jpg" alt="" fill sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-y-0 right-0 w-px bg-ink/70" />
          </motion.div>
          <motion.div style={{ rotateY: rightDoor }} className="absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden">
            <motion.div style={{ scale: carScale }} className="absolute inset-y-0 right-0 w-[200%] origin-[50%_55%]">
              <Image src="/fleet/vezel/03.jpg" alt="" fill sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-ink/30" />
        </motion.div>

        {/* 02 — the road at dusk, first seen through the word */}
        <motion.div style={{ scale: roadScale, opacity: roadOpacity }} className="absolute inset-0">
          <Image
            src="/brand/hero.jpg"
            alt="A car on an open road at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%] brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
        </motion.div>

        {/* 01 — an ink sheet with "Drive" punched out of it */}
        <motion.div style={{ scale: maskScale, opacity: maskOpacity }} className="absolute inset-0 origin-[50%_52%]">
          <svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1600 1000" aria-hidden>
            <defs>
              <mask id="drive-mask">
                <rect x="-4000" y="-4000" width="9600" height="9000" fill="white" />
                <text
                  x="800"
                  y="660"
                  textAnchor="middle"
                  fill="black"
                  style={{ fontFamily: "var(--font-serif-display), serif", fontSize: 480, letterSpacing: -6 }}
                >
                  Drive
                </text>
              </mask>
            </defs>
            <rect x="-4000" y="-4000" width="9600" height="9000" fill="#0c0b0a" mask="url(#drive-mask)" />
          </svg>
        </motion.div>

        <motion.div style={{ opacity: introOpacity }} className="pointer-events-none absolute inset-x-0 top-[17vh] text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] text-cyan">CAR DAYZ LANKA · CAR RENTAL</p>
        </motion.div>
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[12vh] flex flex-col items-center gap-3 text-ivory/70"
        >
          <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL TO START THE ENGINE</span>
          <span className="animate-scroll-dot h-10 w-px bg-cyan" />
        </motion.div>

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="font-[family-name:var(--font-serif-display)] text-[17vw] leading-[0.85] tracking-tight text-ivory sm:text-[11vw]">
            Drive beyond
            <br />
            <em className="text-cyan">ordinary.</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm text-ivory/75 sm:text-base">Your journey starts with the right car.</p>
        </motion.div>

        <Caption opacity={stepInOpacity} kicker="03 / STEP IN" line1="The keys" line2="are yours." />
        <Caption opacity={wheelOpacity} kicker="04 / TAKE THE WHEEL" line1="Settle in." line2="The island awaits." />
        <Caption opacity={driveTextOpacity} kicker="05 / DRIVE" line1="The road" line2="is yours." />

        <motion.div style={{ opacity: hudOpacity }} className="pointer-events-none absolute bottom-[9vh] right-5 text-right sm:right-12">
          <p className="font-mono text-[10px] tracking-[0.32em] text-ivory/60">KM / H</p>
          <motion.p className="font-[family-name:var(--font-serif-display)] text-7xl leading-none text-ivory tabular-nums sm:text-8xl">
            {speedText}
          </motion.p>
        </motion.div>

        <BeatRail progress={p} />
        <motion.div style={{ opacity: exit }} className="pointer-events-none absolute inset-0 bg-ink" />
      </div>
    </section>
  );
}

function Caption({
  opacity,
  kicker,
  line1,
  line2,
}: {
  opacity: MotionValue<number>;
  kicker: string;
  line1: string;
  line2: string;
}) {
  const y = useTransform(opacity, [0, 1], [30, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-[22vh] flex flex-col items-center px-6 text-center"
    >
      <p className="font-mono text-[11px] tracking-[0.4em] text-cyan">{kicker}</p>
      <p className="mt-4 font-[family-name:var(--font-serif-display)] text-[14vw] leading-[0.9] tracking-tight text-ivory drop-shadow-[0_6px_40px_rgba(0,0,0,0.6)] sm:text-8xl lg:text-9xl">
        {line1}
        <br />
        <em>{line2}</em>
      </p>
    </motion.div>
  );
}

function BeatRail({ progress }: { progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 0.96], [0, 1]);
  return (
    <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 sm:left-10 lg:flex lg:gap-5">
      <div className="relative w-px bg-ivory/15">
        <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-cyan" />
      </div>
      <ol className="flex flex-col gap-7">
        {beats.map((b, i) => (
          <Beat key={b.n} progress={progress} beat={b} next={beats[i + 1]?.at ?? 1} />
        ))}
      </ol>
    </div>
  );
}

function Beat({
  progress,
  beat,
  next,
}: {
  progress: MotionValue<number>;
  beat: (typeof beats)[number];
  next: number;
}) {
  // Offsets must stay inside 0–1 and keep increasing.
  const opacity = useTransform(
    progress,
    beat.at === 0 ? [0, next - 0.02, next] : [beat.at - 0.02, beat.at, next - 0.02, next],
    beat.at === 0 ? [1, 1, 0.3] : [0.3, 1, 1, 0.3],
  );
  return (
    <motion.li style={{ opacity }} className="font-mono text-[10px] tracking-[0.3em] text-ivory">
      <span className="text-cyan">{beat.n}</span> {beat.label.toUpperCase()}
    </motion.li>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <Image
        src="/brand/hero.jpg"
        alt="A car on an open road at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%] brightness-[0.6]"
      />
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-[family-name:var(--font-serif-display)] text-[17vw] leading-[0.85] tracking-tight text-ivory sm:text-[11vw]">
          Drive beyond
          <br />
          <em className="text-cyan">ordinary.</em>
        </h1>
        <p className="mt-6 max-w-sm text-sm text-ivory/75 sm:text-base">Your journey starts with the right car.</p>
      </div>
    </section>
  );
}
