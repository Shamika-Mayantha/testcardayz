"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/animations/magnetic";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.12 }}
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

      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-40 pt-28 sm:px-10 lg:px-16 lg:pb-44">
        <div className="pointer-events-none absolute left-5 top-24 hidden font-mono text-[10px] tracking-[0.32em] text-white/55 sm:left-10 lg:block">
          CAR DAYZ LANKA
          <span className="mt-2 block h-px w-10 bg-cyan/70" />
        </div>

        <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">
          CAR RENTAL / SRI LANKA
        </p>

        <h1 className="mt-5 font-[family-name:var(--font-oswald)] text-[16vw] leading-[0.8] tracking-tight text-white sm:text-[11vw] lg:text-[8.6vw]">
          DRIVE
          <br />
          BEYOND
          <br />
          <span className="text-white/80">ORDINARY.</span>
        </h1>

        <div className="mt-8 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-mute sm:text-base">
            Your journey starts with the right car.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#fleet"
                data-cursor="OPEN"
                className="inline-flex border border-cyan bg-cyan px-6 py-3.5 font-mono text-[11px] tracking-[0.22em] text-white hover:bg-transparent hover:text-cyan"
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
                REQUEST A CAR
              </a>
            </Magnetic>
          </div>
        </div>
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
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        aria-label="Scroll to booking"
      >
        <span className="font-mono text-[9px] tracking-[0.28em]">SCROLL</span>
        <span className="animate-scroll-dot h-8 w-px bg-cyan" />
      </a>
    </section>
  );
}
