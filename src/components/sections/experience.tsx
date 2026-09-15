"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const frames = [
  { src: "/experience/coast.jpg", alt: "Open south-coast beach near Galle, looking toward the lighthouse", label: "COAST" },
  { src: "/experience/mountains.jpg", alt: "Train crossing the Nine Arch Bridge in the Ella highlands", label: "HIGHLANDS" },
  { src: "/experience/tropical.jpg", alt: "Tea terraces rolling through the hills near Nuwara Eliya", label: "TEA COUNTRY" },
  { src: "/experience/city.jpg", alt: "Colombo skyline at night reflected in Beira Lake", label: "COLOMBO" },
  { src: "/experience/highway.jpg", alt: "Rampart path along the Indian Ocean at Galle Fort", label: "GALLE" },
];

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="relative scroll-mt-24 py-10">
      <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">SRI LANKA</p>
        <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[12vw] leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
          ONE ISLAND.
          <br />
          ENDLESS ROADS.
        </h2>
        <p className="mt-5 max-w-lg text-sm text-mute">
          From city drives to unforgettable road trips.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-2 px-2 lg:grid-cols-5">
        {frames.map((f, i) => (
          <motion.figure
            key={f.src}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.06, duration: 0.7 }}
            className={`relative overflow-hidden ${i === 0 ? "col-span-2 h-[42vh] lg:col-span-3 lg:h-[70vh]" : "h-[28vh] lg:h-[34vh]"}`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes={i === 0 ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 50vw, 22vw"}
              className="object-cover transition duration-700 hover:scale-105"
            />
            <figcaption className="absolute bottom-3 left-3 z-10 font-mono text-[10px] tracking-[0.24em] text-white">
              {f.label}
            </figcaption>
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
