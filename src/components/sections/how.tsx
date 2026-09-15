"use client";

import { motion } from "motion/react";

const steps = [
  { n: "01", title: "CHOOSE", copy: "Pick the vehicle that fits the journey." },
  { n: "02", title: "WHATSAPP", copy: "Send your dates — CAR DAYZ LANKA receives the request instantly." },
  { n: "03", title: "CONFIRM", copy: "They confirm availability and price by message or call." },
  { n: "04", title: "DRIVE", copy: "Collect the car and start the road." },
];

export function How() {
  return (
    <section id="how" className="relative scroll-mt-24 px-4 py-28 lg:py-36">
      <div className="mx-auto w-[min(900px,100%)]">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">PROCESS</p>
        <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-5xl tracking-tight text-white sm:text-7xl">
          HOW IT WORKS
        </h2>
        <div className="relative mt-16">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-cyan/80 via-cyan/25 to-transparent" />
          <ol className="space-y-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08 }}
                className="relative grid grid-cols-[24px_1fr] gap-6"
              >
                <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full border border-cyan bg-black shadow-[0_0_12px_rgba(225,6,0,0.75)]" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] text-cyan">{s.n}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-oswald)] text-4xl tracking-wide text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-mute">{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
