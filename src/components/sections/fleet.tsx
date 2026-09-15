"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  fleet as fleetData,
  fleetFilters,
  type Vehicle,
} from "@/data/fleet";

export function Fleet() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Vehicle | null>(null);
  const [canPortal, setCanPortal] = useState(false);
  const reduced = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setCanPortal(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  const items =
    filter === "all"
      ? fleetData
      : fleetData.filter((v) => v.category === filter);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track || reduced) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const onScroll = () => {
      const rect = pin.getBoundingClientRect();
      const max = pin.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / max));
      const maxX = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      track.style.transform = `translate3d(${-progress * maxX}px,0,0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, reduced]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="fleet" className="relative mt-24 scroll-mt-24 lg:mt-32">
      <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">FLEET / SAMPLE</p>
        <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[12vw] leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
          CHOOSE
          <br />
          YOUR RIDE.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-mute sm:text-base">
          From efficient city cars to spacious SUVs and vans, find the right
          vehicle for your journey.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Vehicle category">
          {fleetFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFilter(f.id);
              }}
              className={`border px-3 py-2 font-mono text-[10px] tracking-[0.2em] transition ${
                filter === f.id
                  ? "border-cyan bg-cyan text-black"
                  : "border-white/15 text-mute hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-6 snap-x snap-mandatory lg:hidden">
        <AnimatePresence mode="popLayout">
          {items.map((v) => (
            <motion.div
              layout
              key={v.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-[82vw] max-w-[380px] shrink-0 snap-center"
            >
              <VehicleCard vehicle={v} onOpen={() => setActive(v)} compact />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        ref={pinRef}
        className="relative mt-8 hidden lg:block"
        style={{ height: `${Math.max(items.length * 42, 180)}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-8 px-16 will-change-transform">
            {items.map((v) => (
              <div key={v.id} className="w-[min(720px,68vw)] shrink-0">
                <VehicleCard vehicle={v} onOpen={() => setActive(v)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {canPortal
        ? createPortal(
            <AnimatePresence>
              {active ? (
                <VehicleModal vehicle={active} onClose={() => setActive(null)} />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  );
}

function VehicleCard({
  vehicle,
  onOpen,
  compact,
}: {
  vehicle: Vehicle;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[#0a0a0a] outline-none transition hover:border-cyan/40 hover:shadow-[0_0_40px_rgba(158,231,255,0.08)] focus-within:border-cyan">
      <button
        type="button"
        data-cursor="VIEW"
        onClick={onOpen}
        aria-label={`View ${vehicle.name}`}
        className="absolute inset-0 z-10"
      />
      <div className={`relative overflow-hidden ${compact ? "h-52" : "h-[52vh] min-h-[360px]"}`}>
        <Image
          src={vehicle.image}
          alt={vehicle.alt}
          fill
          sizes="(max-width: 1024px) 82vw, 68vw"
          className="object-cover grayscale-[0.35] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <p className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.28em] text-white/80">
          {vehicle.code}
        </p>
      </div>
      <div className="relative space-y-3 p-5 sm:p-6">
        <p className="font-mono text-[10px] tracking-[0.22em] text-cyan">
          {vehicle.fuel.toUpperCase()} / {vehicle.categoryLabel.toUpperCase()}
        </p>
        <h3 className="font-[family-name:var(--font-oswald)] text-3xl tracking-wide text-white sm:text-4xl">
          {vehicle.name}
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] tracking-[0.16em] text-mute">
          <span>{vehicle.seats} SEATS</span>
          <span>{vehicle.transmission.toUpperCase()}</span>
          <span>{vehicle.fuel.toUpperCase()}</span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.22em] text-white group-hover:text-cyan">
          REQUEST PRICE →
        </p>
      </div>
    </article>
  );
}

function VehicleModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 font-mono text-[11px] tracking-[0.24em] text-white/80 hover:text-cyan"
      >
        CLOSE
      </button>
      <div className="grid h-full lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[42vh]">
          <Image
            src={vehicle.image}
            alt={vehicle.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/80" />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan">{vehicle.code}</p>
          <h2
            id="vehicle-title"
            className="mt-3 font-[family-name:var(--font-oswald)] text-5xl tracking-wide text-white sm:text-6xl"
          >
            {vehicle.name}
          </h2>
          <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-mute">
            {vehicle.fuel.toUpperCase()} / {vehicle.categoryLabel.toUpperCase()}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em]">
            <div>
              <dt className="text-mute">SEATS</dt>
              <dd className="mt-1 text-white">{vehicle.seats}</dd>
            </div>
            <div>
              <dt className="text-mute">TRANSMISSION</dt>
              <dd className="mt-1 text-white uppercase">{vehicle.transmission}</dd>
            </div>
            <div>
              <dt className="text-mute">FUEL</dt>
              <dd className="mt-1 text-white uppercase">{vehicle.fuel}</dd>
            </div>
            <div>
              <dt className="text-mute">CLASS</dt>
              <dd className="mt-1 text-white uppercase">{vehicle.categoryLabel}</dd>
            </div>
          </dl>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">{vehicle.blurb}</p>
          <ul className="mt-4 space-y-1 font-mono text-[10px] tracking-[0.16em] text-white/70">
            {vehicle.highlights.map((h) => (
              <li key={h}>— {h}</li>
            ))}
          </ul>
          <a
            href="#book"
            data-cursor="BOOK"
            onClick={onClose}
            className="mt-10 inline-flex w-fit border border-cyan bg-cyan px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-black hover:bg-transparent hover:text-cyan"
          >
            REQUEST THIS VEHICLE →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
