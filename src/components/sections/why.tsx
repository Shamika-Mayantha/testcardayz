"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const reasons = [
  {
    n: "01",
    title: "Freedom",
    copy: "Explore Sri Lanka on your own schedule.",
    image: "/experience/coast.jpg",
  },
  {
    n: "02",
    title: "Flexibility",
    copy: "Choose a vehicle suited to your journey.",
    image: "/fleet/taisor/02.jpg",
  },
  {
    n: "03",
    title: "Convenience",
    copy: "A simple way to arrange your rental.",
    image: "/fleet/sonet/07.jpg",
  },
  {
    n: "04",
    title: "Your journey",
    copy: "One vehicle. Countless destinations.",
    image: "/experience/mountains.jpg",
  },
];

// Cards pin one after another and stack; each one sinks back as the next lands.
export function Why() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-ink px-4 pb-[10vh] pt-28 lg:pt-36">
      <div className="mx-auto w-[min(1240px,100%)]">
        <p className="font-mono text-[11px] tracking-[0.4em] text-cyan">WHY CAR DAYZ LANKA</p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display-face)] text-6xl leading-[0.92] tracking-tight text-ivory sm:text-8xl">
          Built for the <em className="text-cyan">road ahead.</em>
        </h2>
        <div className="mt-16">
          {reasons.map((r, i) => (
            <Card key={r.n} reason={r} index={i} total={reasons.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  reason,
  index,
  total,
}: {
  reason: (typeof reasons)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const last = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.6]);

  return (
    <div ref={ref} className="sticky h-[78svh]" style={{ top: `calc(12vh + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid h-[68svh] origin-top overflow-hidden rounded-[28px] border border-ivory/10 bg-[#111114] lg:grid-cols-[1fr_1.1fr]"
      >
        <div className="relative z-10 flex flex-col justify-between p-8 sm:p-12">
          <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">{reason.n} / 04</p>
          <div>
            <h3 className="font-[family-name:var(--font-display-face)] text-6xl leading-none tracking-tight text-ivory sm:text-8xl">
              {reason.title}
            </h3>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-stone">{reason.copy}</p>
          </div>
        </div>
        <div className="absolute inset-0 lg:relative">
          <Image src={reason.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111114] via-[#111114]/70 to-transparent lg:via-transparent" />
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  );
}
