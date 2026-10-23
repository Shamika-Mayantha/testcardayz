"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

// Thin gold bar across the top that tracks how far down the page you are.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-cyan"
      aria-hidden
    />
  );
}

const places = ["Colombo", "Galle", "Ella", "Kandy", "Mirissa", "Sigiriya", "Nuwara Eliya", "Trincomalee"];

// Destination ticker that leans into the direction and speed of the scroll.
export function RoadMarquee() {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 300, damping: 50 });
  const skew = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8], { clamp: true });
  const x = useTransform(scrollY, (v) => `${-(v * 0.08) % 50}%`);
  const row = places.join("  ·  ") + "  ·  ";

  return (
    <div className="overflow-hidden border-y border-ivory/10 bg-ink py-6" aria-hidden>
      <motion.div
        style={{ x, skewX: skew }}
        className="whitespace-nowrap font-[family-name:var(--font-display-face)] text-6xl text-ivory/85 sm:text-8xl"
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
