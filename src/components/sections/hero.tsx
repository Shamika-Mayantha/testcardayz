"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/animations/magnetic";

export function Hero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(!!reduce);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduce ? 0 : 420);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "110%" },
          animate: ready ? { y: "0%" } : { y: "110%" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/brand/hero.jpg"
          alt="Cinematic vehicle on an open road at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] brightness-[0.55] contrast-110 saturate-[0.78]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-[#050505]" />
      <div className="vignette absolute inset-0" />

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[42%] h-px bg-cyan"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : null}

      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-36 pt-28 sm:px-10 lg:px-16 lg:pb-40">
        <div className="pointer-events-none absolute left-5 top-24 hidden font-mono text-[10px] tracking-[0.32em] text-white/55 sm:left-10 lg:block">
          CAR DAYZ LANKA
          <span className="mt-2 block h-px w-10 bg-cyan/70" />
        </div>

        <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">
          CAR RENTAL / SRI LANKA
        </p>

        <h1 className="mt-5 font-[family-name:var(--font-oswald)] text-[18vw] leading-[0.78] tracking-tight text-white sm:text-[12vw] lg:text-[9.4vw]">
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(0.15)}>
              DRIVE
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" {...line(0.28)}>
              BEYOND
            </motion.span>
          </span>
          <span className="block overflow-hidden text-white/80">
            <motion.span className="block" {...line(0.4)}>
              ORDINARY.
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-sm text-sm leading-relaxed text-mute sm:text-base">
            Your journey starts with the right car.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#fleet"
                data-cursor="OPEN"
                className="inline-flex border border-cyan bg-cyan px-6 py-3.5 font-mono text-[11px] tracking-[0.22em] text-black hover:bg-transparent hover:text-cyan"
              >
                EXPLORE THE FLEET →
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#book"
                data-cursor="BOOK"
                className="inline-flex border border-white/25 px-6 py-3.5 font-mono text-[11px] tracking-[0.22em] text-white hover:border-cyan hover:text-cyan"
              >
                BOOK A CAR
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-5 hidden items-end gap-3 sm:left-10 lg:flex">
        <span className="h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
        <p className="font-mono text-[10px] tracking-[0.28em] text-white/60">
          AUTOMOTIVE MOBILITY
        </p>
      </div>
      <p className="pointer-events-none absolute bottom-8 right-5 hidden font-mono text-[10px] tracking-[0.28em] text-white/60 sm:right-10 lg:block">
        SRI LANKA
      </p>

      <a
        href="#book"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        aria-label="Scroll to booking"
      >
        <span className="font-mono text-[9px] tracking-[0.28em]">SCROLL</span>
        <span className="animate-scroll-dot h-8 w-px bg-cyan" />
      </a>
    </section>
  );
}
