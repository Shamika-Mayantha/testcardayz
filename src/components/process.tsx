"use client";

import { motion } from "motion/react";
import { STEPS } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-amber-300">
            03 — PROTOCOL
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Five beats from message to reveal
          </h2>
        </motion.div>

        <ol className="relative mt-14 space-y-4">
          <div className="absolute top-0 bottom-0 left-[27px] hidden w-px bg-gradient-to-b from-cyan-300 via-fuchsia-400 to-amber-300 sm:block" />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              className="grid gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-md sm:grid-cols-[72px_1fr] sm:items-start"
            >
              <span className="font-display relative inline-flex size-14 items-center justify-center rounded-xl border border-cyan-300/40 bg-black text-cyan-200 shadow-[0_0_24px_rgba(34,240,255,0.2)]">
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-xl tracking-widest">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-white/65">{step.copy}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
