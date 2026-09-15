"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const frames = [
  { src: "/experience/coast.jpg", alt: "Unawatuna beach and palms on the Sri Lankan south coast", label: "COAST" },
  { src: "/experience/mountains.jpg", alt: "Cloud forest and winding roads in the Ella highlands", label: "HIGHLANDS" },
  { src: "/experience/tropical.jpg", alt: "Tea country near Kandy", label: "TEA COUNTRY" },
  { src: "/experience/city.jpg", alt: "Galle Road traffic in Colombo at dusk", label: "CITY" },
  { src: "/experience/highway.jpg", alt: "Southern Expressway through Sri Lanka", label: "HIGHWAY" },
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
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="object-cover grayscale-[0.4] transition duration-700 hover:scale-105 hover:grayscale-0"
            />
            <figcaption className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.24em] text-white">
              {f.label}
            </figcaption>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
