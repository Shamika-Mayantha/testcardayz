"use client";

import { useState, type ReactNode } from "react";
import { fleet } from "@/data/fleet";
import {
  bookingWhatsappText,
  whatsappHref,
} from "@/data/business";

function isDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

export function BookingSearch() {
  const [pickup, setPickup] = useState("");
  const [ret, setRet] = useState("");
  const [vehicle, setVehicle] = useState("any");
  const [passengers, setPassengers] = useState("1-4");
  const [status, setStatus] = useState<"idle" | "error" | "ok">("idle");
  const [message, setMessage] = useState(
    "We’ll confirm availability on WhatsApp — no automated booking lock."
  );
  const [waLink, setWaLink] = useState<string | null>(null);

  function checkAvailability() {
    const start = pickup.trim();
    const end = ret.trim();
    if (!isDate(start) || !isDate(end) || end < start) {
      setStatus("error");
      setWaLink(null);
      setMessage(
        "Choose a pickup and return date. Return must be on or after pickup. Use YYYY-MM-DD."
      );
      return;
    }
    const selected =
      vehicle === "any"
        ? "Any vehicle"
        : (fleet.find((v) => v.id === vehicle)?.name ?? "Any vehicle");
    const href = whatsappHref(
      bookingWhatsappText({
        pickup: start,
        returnDate: end,
        vehicle: selected,
        passengers,
      })
    );
    setWaLink(href);
    setStatus("ok");
    setMessage("");
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="book"
      className="relative z-20 mx-auto -mt-16 w-[min(1180px,calc(100%-1.5rem))] scroll-mt-28 sm:-mt-20"
    >
      <div className="glass relative overflow-hidden rounded-sm border border-cyan/20 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-cyan">
              AVAILABILITY / WHATSAPP
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-oswald)] text-xl tracking-wide text-white sm:text-2xl">
              PLAN THE DRIVE
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-mute sm:block">
            09:00 — 17:00 DAILY
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Field label="PICKUP DATE">
            <input
              id="pickup-date"
              name="pickup"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY-MM-DD"
              aria-label="Pickup date, YYYY-MM-DD"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setStatus("idle");
              }}
              className="hud-input"
            />
          </Field>
          <Field label="RETURN DATE">
            <input
              id="return-date"
              name="return"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY-MM-DD"
              aria-label="Return date, YYYY-MM-DD"
              value={ret}
              onChange={(e) => {
                setRet(e.target.value);
                setStatus("idle");
              }}
              className="hud-input"
            />
          </Field>
          <Field label="SELECT VEHICLE">
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="hud-input"
            >
              <option value="any">Any vehicle</option>
              {fleet.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.year})
                </option>
              ))}
            </select>
          </Field>
          <Field label="NUMBER OF PASSENGERS">
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="hud-input"
            >
              <option value="1-2">1 – 2</option>
              <option value="1-4">1 – 4</option>
              <option value="5">5</option>
            </select>
          </Field>
          <div className="flex items-end">
            <button
              type="button"
              id="check-availability"
              data-cursor="OPEN"
              onClick={checkAvailability}
              className="w-full border border-cyan bg-cyan py-3.5 font-mono text-[11px] tracking-[0.22em] text-white transition hover:bg-transparent hover:text-cyan"
            >
              SEND ON WHATSAPP →
            </button>
          </div>
        </div>

        <div className="mt-4" aria-live="polite">
          {status === "error" ? (
            <p className="font-mono text-sm tracking-[0.08em] text-red-300" role="alert">
              {message}
            </p>
          ) : null}
          {status === "ok" && waLink ? (
            <div className="border border-cyan/25 bg-black/40 p-4">
              <p className="font-mono text-[10px] tracking-[0.24em] text-cyan">
                WHATSAPP REQUEST
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white">
                A WhatsApp message to CAR DAYZ LANKA is opening with your dates
                and vehicle. If it did not appear,{" "}
                <a
                  className="underline underline-offset-4 hover:text-cyan"
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  tap here to send it
                </a>
                .
              </p>
            </div>
          ) : status === "idle" ? (
            <p className="font-mono text-[10px] tracking-[0.16em] text-mute">{message}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.22em] text-mute">
        {label}
      </span>
      {children}
    </label>
  );
}
