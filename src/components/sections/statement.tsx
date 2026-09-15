"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.86, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative isolate min-h-[140vh] overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="absolute inset-[-12%] bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url(/brand/statement.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      </motion.div>
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 text-center">
        <motion.h2
          style={{ scale }}
          className="font-[family-name:var(--font-oswald)] text-[14vw] leading-[0.82] tracking-tight text-white"
        >
          ONE CAR.
          <br />
          ENDLESS
          <br />
          POSSIBILITIES.
        </motion.h2>
      </div>
    </section>
  );
}
