"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePinnedProgress } from "@/components/journey/use-pinned-progress";

const frames = [
  { src: "/experience/coast.jpg", alt: "Open south-coast beach near Galle, looking toward the lighthouse", label: "COAST", km: "KM 000" },
  { src: "/experience/mountains.jpg", alt: "Train crossing the Nine Arch Bridge in the Ella highlands", label: "HIGHLANDS", km: "KM 214" },
  { src: "/experience/tropical.jpg", alt: "Tea terraces rolling through the hills near Nuwara Eliya", label: "TEA COUNTRY", km: "KM 268" },
  { src: "/experience/city.jpg", alt: "Colombo skyline at night reflected in Beira Lake", label: "COLOMBO", km: "KM 412" },
  { src: "/experience/highway.jpg", alt: "Rampart path along the Indian Ocean at Galle Fort", label: "GALLE", km: "KM 531" },
];

function Intro() {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">SRI LANKA</p>
      <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[12vw] leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
        ONE ISLAND.
        <br />
        ENDLESS ROADS.
      </h2>
      <p className="mt-5 max-w-lg text-sm text-mute">From city drives to unforgettable road trips.</p>
    </>
  );
}

// Pinned road trip: vertical scroll drives the destinations sideways past the
// windscreen, with a running odometer underneath.
export function Experience() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(track.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const p = usePinnedProgress(ref);
  const x = useTransform(p, [0.06, 0.96], [0, -distance]);
  const road = useTransform(p, [0, 1], ["0px", "-2400px"]);
  const fill = useTransform(p, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section id="experience" className="relative scroll-mt-24 py-10">
        <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
          <Intro />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 px-2 lg:grid-cols-5">
          {frames.map((f) => (
            <figure key={f.src} className="relative h-[28vh] overflow-hidden lg:h-[34vh]">
              <Image src={f.src} alt={f.alt} fill sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
              <figcaption className="absolute bottom-3 left-3 z-10 font-mono text-[10px] tracking-[0.24em] text-white">
                {f.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={ref} className="relative h-[420vh] scroll-mt-24">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-4 pl-5 pr-[8vw] sm:pl-10 lg:pl-16">
          <div className="w-[86vw] shrink-0 sm:w-[44vw] lg:w-[36vw]">
            <Intro />
          </div>
          {frames.map((f, i) => (
            <figure
              key={f.src}
              className={`relative shrink-0 overflow-hidden ${i % 2 ? "h-[48svh] w-[72vw] sm:w-[40vw]" : "h-[62svh] w-[80vw] sm:w-[52vw]"}`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 640px) 80vw, 52vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 z-10">
                <span className="block font-mono text-[10px] tracking-[0.28em] text-cyan">{f.km}</span>
                <span className="mt-1 block font-[family-name:var(--font-oswald)] text-3xl tracking-tight text-white sm:text-4xl">
                  {f.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        {/* Road markings rolling underneath */}
        <div className="absolute inset-x-0 bottom-[7vh] px-5 sm:px-10 lg:px-16">
          <div className="relative h-px overflow-hidden bg-white/10">
            <motion.div
              style={{ backgroundPositionX: road }}
              className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0_40px,transparent_40px_90px)]"
            />
          </div>
          <div className="mt-3 h-px bg-white/10">
            <motion.div style={{ scaleX: fill }} className="h-px origin-left bg-cyan" />
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.28em] text-white/55">ROAD TRIP / SRI LANKA</p>
        </div>
      </div>
    </section>
  );
}
