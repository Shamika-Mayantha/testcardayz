"use client";

import { CarFront } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Choose", copy: "Pick the vehicle that fits the journey." },
  { n: "02", title: "WhatsApp", copy: "Send your dates — CAR DAYZ LANKA receives the request instantly." },
  { n: "03", title: "Confirm", copy: "They confirm availability and price by message or call." },
  { n: "04", title: "Drive", copy: "Collect the car and start the road." },
];

// A road draws itself down the page as you scroll, and a car drives it,
// lighting up each step as it passes.
export function How() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.5"] });
  const carTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative scroll-mt-24 bg-[#0b0b0d] px-5 py-28 text-ivory lg:py-40">
      <div className="mx-auto w-[min(1000px,100%)]">
        <p className="font-mono text-[11px] tracking-[0.4em] text-ivory/50">PROCESS</p>
        <h2 className="mt-4 font-[family-name:var(--font-display-face)] text-6xl leading-[0.92] tracking-tight sm:text-8xl">
          How it <em className="text-[#c21f30]">works.</em>
        </h2>

        <div ref={ref} className="relative mt-20">
          <svg
            className="absolute left-0 top-0 h-full w-12 sm:w-16"
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M30 0 C 55 160, 5 340, 30 500 S 55 840, 30 1000" fill="none" stroke="#ecebe8" strokeOpacity="0.08" strokeWidth="14" />
            <motion.path
              d="M30 0 C 55 160, 5 340, 30 500 S 55 840, 30 1000"
              fill="none"
              stroke="#ecebe8"
              strokeOpacity="0.22"
              strokeWidth="14"
              style={{ pathLength: scrollYProgress }}
            />
            <motion.path
              d="M30 0 C 55 160, 5 340, 30 500 S 55 840, 30 1000"
              fill="none"
              stroke="#c21f30"
              strokeWidth="1.5"
              strokeDasharray="10 12"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <motion.div
            style={{ top: carTop }}
            className="absolute left-6 z-10 -ml-5 -mt-5 flex size-10 items-center justify-center rounded-full bg-[#c21f30] text-ivory shadow-[0_8px_30px_rgba(194,31,48,0.5)] sm:left-8"
          >
            <CarFront className="size-5" />
          </motion.div>

          <ol className="space-y-[18vh] pl-20 sm:pl-28">
            {steps.map((s, i) => (
              <Step key={s.n} step={s} progress={scrollYProgress} at={i / steps.length} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  progress,
  at,
}: {
  step: (typeof steps)[number];
  progress: MotionValue<number>;
  at: number;
}) {
  const opacity = useTransform(progress, [at, at + 0.12], [0.18, 1]);
  const x = useTransform(progress, [at, at + 0.12], [40, 0]);
  return (
    <motion.li style={{ opacity, x }}>
      <p className="font-mono text-[11px] tracking-[0.32em] text-[#c21f30]">{step.n}</p>
      <h3 className="mt-2 font-[family-name:var(--font-display-face)] text-6xl leading-none tracking-tight sm:text-8xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-md text-base text-ivory/65">{step.copy}</p>
    </motion.li>
  );
}
