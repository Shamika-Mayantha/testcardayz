"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { business } from "@/data/business";

// The rating counts up when it scrolls into view, over a slow marquee.
export function Trust() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => v.toFixed(1));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, business.rating, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value]);

  const marquee = `${business.reviews} REVIEWS · ${business.rating.toFixed(1)} ★ ON GOOGLE · `;

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-28 text-center text-ink">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-serif-display)] text-[18vw] italic leading-none text-ink/[0.05]">
        <div className="animate-marquee inline-block">
          {marquee.repeat(4)}
        </div>
      </div>
      <p className="relative font-mono text-[11px] tracking-[0.4em] text-ink/50">PUBLICLY LISTED RATING</p>
      <p className="relative mt-6 font-[family-name:var(--font-serif-display)] text-[30vw] leading-none tracking-tight sm:text-[14rem]">
        <motion.span>{text}</motion.span>
        <span className="ml-2 align-top text-[10vw] text-[#b9772a] sm:text-7xl">★</span>
      </p>
      <p className="relative mt-4 font-mono text-sm tracking-[0.3em] text-ink/60">{business.reviews} REVIEWS</p>
      <a
        href={business.reviewsUrl}
        target="_blank"
        rel="noreferrer"
        data-cursor="OPEN"
        className="relative mt-10 inline-flex rounded-full bg-ink px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-ivory transition hover:bg-[#b9772a]"
      >
        GOOGLE REVIEWS →
      </a>
    </section>
  );
}
