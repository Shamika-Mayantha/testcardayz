"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { business, genericWhatsappText, telHref, whatsappHref } from "@/data/business";
import { Magnetic } from "@/components/animations/magnetic";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";

function CtaContent() {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.4em] text-cyan">NEXT STEP</p>
      <h2 className="mt-4 max-w-5xl font-[family-name:var(--font-serif-display)] text-[17vw] leading-[0.86] tracking-tight text-ivory sm:text-8xl lg:text-[10rem]">
        Your next journey
        <br />
        <em className="text-cyan">starts here.</em>
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <Magnetic>
          <a
            href={whatsappHref(genericWhatsappText)}
            target="_blank"
            rel="noreferrer"
            data-cursor="BOOK"
            className="inline-flex rounded-full bg-cyan px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-ink transition hover:bg-ivory"
          >
            BOOK ON WHATSAPP →
          </a>
        </Magnetic>
        <a
          href={telHref}
          className="inline-flex rounded-full border border-ivory/30 px-8 py-4 font-mono text-[11px] tracking-[0.2em] text-ivory transition hover:border-ivory"
        >
          CALL {business.phoneDisplay}
        </a>
      </div>
    </>
  );
}

// Arrival: back in the cabin, the doors swing wide and you step out into
// the destination, where the booking call to action is waiting.
export function Cta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const p = usePinnedProgress(ref);

  const cabinScale = useTransform(p, [0, 0.3], [1.15, 1]);
  const leftDoor = useTransform(p, [0.2, 0.45], [0, -95]);
  const rightDoor = useTransform(p, [0.2, 0.45], [0, 95]);
  const doorsOpacity = useTransform(p, [0.42, 0.47], [1, 0]);
  const sceneScale = useTransform(p, [0.2, 0.75], [1.6, 1]);
  const labelOpacity = useTransform(p, [0.02, 0.08, 0.2, 0.26], [0, 1, 1, 0]);
  const contentOpacity = useTransform(p, [0.55, 0.7], [0, 1]);
  const contentY = useTransform(p, [0.55, 0.7], [80, 0]);
  const contentEvents = useTransform(p, (v) => (v > 0.6 ? "auto" : "none"));

  if (reduce) {
    return (
      <section id="arrive" className="relative isolate min-h-[90vh] overflow-hidden">
        <Image src="/brand/cta.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="relative flex min-h-[90vh] flex-col items-start justify-end px-6 py-20 sm:px-12 lg:px-16">
          <CtaContent />
        </div>
      </section>
    );
  }

  return (
    <section id="arrive" ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1600px]">
        <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
          <Image src="/brand/cta.jpg" alt="Aerial view of Sigiriya rock rising over the forest" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

        <motion.div style={{ opacity: doorsOpacity, scale: cabinScale }} className="absolute inset-0 [transform-style:preserve-3d]">
          <motion.div style={{ rotateY: leftDoor }} className="absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[200%]">
              <Image src="/fleet/magnite/03.jpg" alt="" fill sizes="100vw" className="object-cover brightness-75" />
            </div>
            <div className="absolute inset-y-0 right-0 w-px bg-ink" />
          </motion.div>
          <motion.div style={{ rotateY: rightDoor }} className="absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-[200%]">
              <Image src="/fleet/magnite/03.jpg" alt="" fill sizes="100vw" className="object-cover brightness-75" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-cyan">ARRIVAL</p>
          <p className="mt-4 font-[family-name:var(--font-serif-display)] text-[16vw] leading-[0.88] tracking-tight text-ivory drop-shadow-[0_6px_40px_rgba(0,0,0,0.6)] sm:text-9xl">
            You&rsquo;ve <em>arrived.</em>
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentEvents }}
          className="absolute inset-0 flex flex-col items-start justify-end px-6 py-20 sm:px-12 lg:px-16"
        >
          <CtaContent />
        </motion.div>
      </div>
    </section>
  );
}
