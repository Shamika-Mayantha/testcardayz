"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="studio" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-fuchsia-300">
            04 — STUDIO
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Born on Sri Lankan tarmac
          </h2>
          <p className="mt-5 text-white/70">
            CAR DAYZ LANKA is the public face of CAR DAYZ LK — a young
            automotive studio building a culture around film, finish, and
            night photography. We are not a used-car lot. We take the car you
            already love and push it into the next era.
          </p>
          <p className="mt-4 text-white/70">
            Heat, monsoon, coastal salt, and Colombo dust are the real spec
            sheet. Every wrap, PPF panel, and ceramic layer is chosen to
            survive that — then still look illegal at a red light.
          </p>
          <p className="mt-4 font-display tracking-[0.12em] text-cyan-200">
            ඔබේ රථයට අනාගතයක්.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { n: 6, suffix: "", label: "Core systems" },
            { n: 24, suffix: "h", label: "Booking window" },
            { n: 5, suffix: "", label: "Protocol steps" },
            { n: 1, suffix: "", label: "Official Facebook" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="hud-frame rounded-2xl border border-cyan-300/20 bg-black/35 p-5"
            >
              <p className="font-display text-4xl font-bold text-glow">
                <Counter to={stat.n} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-white/50">
                {stat.label.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-cyan-300/15 bg-black/30 py-4">
        <div className="marquee-track flex w-max gap-10 font-display text-sm tracking-[0.35em] text-white/40">
          {Array.from({ length: 2 }).map((_, loop) => (
            <div key={loop} className="flex gap-10 px-5">
              {[
                "VINYL WRAP",
                "PPF ARMOR",
                "CERAMIC GLASS",
                "IR TINT",
                "CABIN LIGHT",
                "NIGHT REVEAL",
                "SRI LANKA",
                "CAR DAYZ LK",
              ].map((item) => (
                <span key={`${loop}-${item}`} className="flex items-center gap-10">
                  {item}
                  <span className="text-fuchsia-400">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
