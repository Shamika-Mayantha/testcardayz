"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const hide = window.setTimeout(() => setVisible(false), 1050);
    const unmount = window.setTimeout(() => setMounted(false), 1900);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(unmount);
    };
  }, [reduce]);

  if (reduce || !mounted) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(50% 0 50% 0)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgb(158 231 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(158 231 255 / 0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <p className="label-tech text-[#9ee7ff]">MOBILITY / SRI LANKA</p>
          <h1 className="font-display mt-5 text-center text-4xl font-medium tracking-[0.18em] sm:text-6xl">
            CAR DAYZ LANKA
          </h1>
          <div className="mt-10 h-px w-48 overflow-hidden bg-white/10">
            <div className="animate-load-bar h-full origin-left bg-[#9ee7ff]" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
