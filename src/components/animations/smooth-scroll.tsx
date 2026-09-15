"use client";

import { useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return children;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, duration: 1.15, smoothWheel: true, syncTouch: false }}
    >
      {children}
    </ReactLenis>
  );
}
