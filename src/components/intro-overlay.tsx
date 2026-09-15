"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";

export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      const skip = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(skip);
    }
    if (sessionStorage.getItem("cd-boot")) {
      const skip = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(skip);
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      sessionStorage.setItem("cd-boot", "1");
      setVisible(false);
    }, 2600);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(t);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#05060a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="scanlines absolute inset-0 opacity-40" />
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7 }}
          />
          <p className="font-mono text-[10px] tracking-[0.5em] text-cyan-300/70">
            SYSTEM BOOT // LK-01
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8"
          >
            <Logo className="scale-125" />
          </motion.div>
          <motion.h1
            className="font-display mt-8 text-center text-3xl font-bold tracking-[0.2em] text-glow sm:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            CAR DAYZ
          </motion.h1>
          <p className="mt-2 font-display text-sm tracking-[0.55em] text-fuchsia-300">
            LANKA
          </p>
          <div className="mt-10 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <div className="animate-boot-bar h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300" />
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.35em] text-white/45">
            CALIBRATING FILM · LIGHT · SURFACE
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
