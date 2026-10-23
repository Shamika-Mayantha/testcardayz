"use client";

import { useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";

// Scroll progress (0–1) through a tall section whose content is pinned with
// `position: sticky`. Routed through a function transform so Motion keeps it
// on the main thread: its native ScrollTimeline path drifted from the actual
// scroll position on these pinned sections, leaving layers half-faded.
export function usePinnedProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));
}
