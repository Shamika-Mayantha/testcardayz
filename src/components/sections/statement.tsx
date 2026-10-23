"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const copy =
  "One car. Endless possibilities. Explore Sri Lanka on your own schedule — from Colombo mornings to coast roads at golden hour.";

// Words light up one by one as the paragraph passes through the viewport.
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const words = copy.split(" ");

  return (
    <section ref={ref} className="relative bg-[#0b0b0d] px-5 py-[22vh] text-ivory sm:px-10 lg:px-16">
      <p className="font-mono text-[11px] tracking-[0.4em] text-ivory/50">THE IDEA</p>
      <p className="mt-8 max-w-[18ch] font-[family-name:var(--font-display-face)] text-[11vw] leading-[0.98] tracking-tight sm:text-[7.5vw] lg:max-w-[20ch] lg:text-[6.2vw]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = children.startsWith("Endless") || children.startsWith("possibilities");
  return (
    <motion.span style={{ opacity }} className={`mr-[0.22em] inline-block ${accent ? "text-[#c21f30]" : ""}`}>
      {children}
    </motion.span>
  );
}
