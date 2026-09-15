"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  fleet as fleetData,
  fleetFilters,
  type Vehicle,
} from "@/data/fleet";
import { vehicleWhatsappText, whatsappHref } from "@/data/business";
import { VehicleSlideshow } from "@/components/fleet/vehicle-slideshow";

export function Fleet() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Vehicle | null>(null);

  const items =
    filter === "all"
      ? fleetData
      : fleetData.filter((v) => v.category === filter);

  const openVehicle = useCallback((vehicle: Vehicle) => {
    setActive(vehicle);
  }, []);

  const closeVehicle = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <section id="fleet" className="relative mt-24 scroll-mt-24 lg:mt-32">
      <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">
          FLEET / AVAILABLE NOW
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[12vw] leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
          CHOOSE
          <br />
          YOUR RIDE.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-mute sm:text-base">
          Five vehicles on the road now — compact SUVs and a city hatch, each
          described so you can match the car to the journey.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Vehicle category">
          {fleetFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`border px-3 py-2 font-mono text-[10px] tracking-[0.2em] transition ${
                filter === f.id
                  ? "border-cyan bg-cyan text-white"
                  : "border-white/15 text-mute hover:border-white/40 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 grid w-[min(1180px,calc(100%-2rem))] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v, i) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            delay={i * 380}
            onOpen={() => openVehicle(v)}
          />
        ))}
      </div>

      <VehicleModal vehicle={active} onClose={closeVehicle} />
    </section>
  );
}

function VehicleCard({
  vehicle,
  delay,
  onOpen,
}: {
  vehicle: Vehicle;
  delay: number;
  onOpen: () => void;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <article
      className="group overflow-hidden border border-white/10 bg-[#0a0a0a] transition hover:border-cyan/40 hover:shadow-[0_0_40px_rgba(225,6,0,0.12)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        data-cursor="VIEW"
        data-vehicle-card={vehicle.id}
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`View ${vehicle.name}`}
      >
        <div className="relative h-56 overflow-hidden sm:h-72">
          <VehicleSlideshow
            images={vehicle.images}
            alt={vehicle.alt}
            sizes="(max-width: 640px) 100vw, 50vw"
            delay={delay}
            interval={4200}
            paused={paused}
            className="transition duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <p className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[11px] tracking-[0.28em] text-white/80">
            {vehicle.code} / {vehicle.year}
          </p>
        </div>
        <div className="space-y-3 p-5 sm:p-6">
          <p className="font-mono text-[10px] tracking-[0.22em] text-cyan">
            {vehicle.year} / {vehicle.categoryLabel.toUpperCase()}
          </p>
          <h3 className="font-[family-name:var(--font-oswald)] text-3xl tracking-wide text-white sm:text-4xl">
            {vehicle.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-mute">{vehicle.blurb}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] tracking-[0.16em] text-mute">
            <span>{vehicle.seats} SEATS</span>
            <span>{vehicle.transmission.toUpperCase()}</span>
            <span>{vehicle.fuel.toUpperCase()}</span>
          </div>
          <span className="inline-flex border border-cyan/40 px-4 py-2 font-mono text-[11px] tracking-[0.22em] text-white">
            REQUEST ON WHATSAPP →
          </span>
        </div>
      </button>
    </article>
  );
}

function VehicleModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [vehicle, onClose]);

  if (!mounted || !vehicle) return null;

  const requestHref = whatsappHref(
    vehicleWhatsappText(vehicle.name, vehicle.year)
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex h-[100dvh] flex-col overflow-hidden bg-black text-white"
      role="dialog"
      aria-modal="true"
      data-cursor="VIEW"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-30 border border-white/15 bg-black/70 px-3 py-2 font-mono text-[11px] tracking-[0.24em] text-white/90 hover:text-cyan"
      >
        CLOSE
      </button>
      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:overflow-hidden"
      >
        <div className="relative h-[38svh] shrink-0 sm:h-[42svh] lg:h-full lg:min-h-0">
          <VehicleSlideshow
            images={vehicle.images}
            alt={vehicle.alt}
            sizes="(min-width: 1024px) 60vw, 100vw"
            interval={3800}
            priority
            interactive
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 to-black/70" />
        </div>
        <div className="relative px-5 pb-8 pt-6 sm:px-8 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-12 lg:pb-10 lg:pt-10">
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan">
            {vehicle.code} / {vehicle.year}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-4xl tracking-wide text-white sm:text-6xl">
            {vehicle.name}
          </h2>
          <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-mute">
            {vehicle.year} / {vehicle.fuel.toUpperCase()} / {vehicle.categoryLabel.toUpperCase()}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em]">
            <div>
              <dt className="text-mute">YEAR</dt>
              <dd className="mt-1 text-white">{vehicle.year}</dd>
            </div>
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
          </dl>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">{vehicle.blurb}</p>
          <a
            href={requestHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="BOOK"
            onClick={onClose}
            className="mt-10 hidden w-fit border border-cyan bg-cyan px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-white hover:bg-transparent hover:text-cyan lg:inline-flex"
          >
            REQUEST ON WHATSAPP →
          </a>
        </div>
      </div>
      <div className="shrink-0 border-t border-white/10 bg-black p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
        <a
          href={requestHref}
          target="_blank"
          rel="noreferrer"
          data-cursor="BOOK"
          onClick={onClose}
          className="flex h-12 w-full items-center justify-center bg-cyan font-mono text-[11px] tracking-[0.22em] text-white"
        >
          REQUEST ON WHATSAPP →
        </a>
      </div>
    </div>,
    document.documentElement
  );
}
