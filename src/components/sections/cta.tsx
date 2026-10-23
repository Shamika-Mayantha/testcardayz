"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";
import { business, genericWhatsappText, telHref, whatsappHref } from "@/data/business";
import { Magnetic } from "@/components/animations/magnetic";
import { CabinFrame, DoorArt } from "@/components/journey/car-art";

function CtaContent() {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">NEXT STEP</p>
      <h2 className="mt-4 max-w-5xl font-[family-name:var(--font-oswald)] text-[16vw] leading-[0.82] tracking-tight text-white sm:text-8xl lg:text-9xl">
        YOUR NEXT
        <br />
        JOURNEY
        <br />
        STARTS HERE.
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <Magnetic>
          <a
            href={whatsappHref(genericWhatsappText)}
            target="_blank"
            rel="noreferrer"
            data-cursor="BOOK"
            className="inline-flex border border-cyan bg-cyan px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-white hover:bg-transparent hover:text-cyan"
          >
            BOOK ON WHATSAPP →
          </a>
        </Magnetic>
        <a
          href={telHref}
          className="inline-flex border border-white/20 px-8 py-4 font-mono text-[11px] tracking-[0.2em] text-white hover:border-white"
        >
          CALL {business.phoneDisplay}
        </a>
      </div>
    </>
  );
}

// Arrival: back in the cabin, the door swings open and you step out into the
// destination, where the booking call to action is waiting.
export function Cta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);

  const cabinOpacity = useTransform(p, [0.3, 0.42], [1, 0]);
  const cabinScale = useTransform(p, [0.28, 0.45], [1, 1.6]);
  const doorRotate = useTransform(p, [0.05, 0.32], [0, 100]);
  const doorOpacity = useTransform(p, [0.28, 0.36], [1, 0]);
  const sceneScale = useTransform(p, [0, 0.6], [1.5, 1]);
  const sceneOpacity = useTransform(p, [0, 0.6], [0.25, 0.5]);
  const labelOpacity = useTransform(p, [0, 0.06, 0.24, 0.32], [0, 1, 1, 0]);
  const contentOpacity = useTransform(p, [0.5, 0.65], [0, 1]);
  const contentY = useTransform(p, [0.5, 0.65], [60, 0]);

  if (reduce) {
    return (
      <section id="arrive" className="relative isolate min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-45" style={{ backgroundImage: "url(/brand/cta.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="relative flex min-h-[90vh] flex-col items-start justify-end px-6 py-20 sm:px-12 lg:px-16">
          <CtaContent />
        </div>
      </section>
    );
  }

  return (
    <section id="arrive" ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1800px]">
        <motion.div
          style={{ scale: sceneScale, opacity: sceneOpacity, backgroundImage: "url(/brand/cta.jpg)" }}
          className="absolute inset-0 bg-cover bg-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <motion.div style={{ opacity: cabinOpacity, scale: cabinScale }} className="absolute inset-0">
          <CabinFrame />
        </motion.div>

        <motion.div
          style={{ rotateY: doorRotate, opacity: doorOpacity }}
          className="absolute inset-0 origin-right [transform-style:preserve-3d]"
        >
          <DoorArt hinge="right" />
        </motion.div>

        <motion.div
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.36em] text-cyan">04 / ARRIVE</p>
          <p className="mt-4 font-[family-name:var(--font-oswald)] text-[13vw] leading-[0.85] tracking-tight text-white sm:text-8xl">
            STEP OUT.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex flex-col items-start justify-end px-6 py-20 sm:px-12 lg:px-16"
        >
          <CtaContent />
        </motion.div>
      </div>
    </section>
  );
}
