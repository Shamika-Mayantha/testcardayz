"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { fleet } from "@/data/fleet";
import { business, telHref } from "@/data/business";

export function BookingSearch() {
  const [pickup, setPickup] = useState("");
  const [ret, setRet] = useState("");
  const [vehicle, setVehicle] = useState("any");
  const [passengers, setPassengers] = useState("1-4");
  const [status, setStatus] = useState<"idle" | "error" | "ok">("idle");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function submit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!pickup || !ret) {
      setStatus("error");
      return;
    }
    if (ret < pickup) {
      setStatus("error");
      return;
    }
    setStatus("ok");
  }

  return (
    <section
      id="book"
      className="relative z-20 mx-auto -mt-16 w-[min(1180px,calc(100%-1.5rem))] scroll-mt-28 sm:-mt-20"
    >
      <form
        onSubmit={submit}
        noValidate
        action="#book"
        className="glass relative overflow-hidden rounded-sm border border-cyan/20 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-6"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-cyan">
              AVAILABILITY / REQUEST
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
              type="date"
              name="pickup"
              min={today}
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
              type="date"
              name="return"
              min={pickup || today}
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
              name="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="hud-input"
            >
              <option value="any">Any vehicle</option>
              {fleet.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="NUMBER OF PASSENGERS">
            <select
              name="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="hud-input"
            >
              <option value="1-4">1 – 4</option>
              <option value="5-7">5 – 7</option>
              <option value="8+">8+</option>
            </select>
          </Field>
          <div className="flex items-end">
            <button
              type="submit"
              data-cursor="OPEN"
              className="w-full border border-cyan bg-cyan py-3.5 font-mono text-[11px] tracking-[0.22em] text-black transition hover:bg-transparent hover:text-cyan"
            >
              CHECK AVAILABILITY →
            </button>
          </div>
        </div>

        <div className="mt-4" aria-live="polite">
          {status === "error" ? (
            <p className="font-mono text-[11px] tracking-[0.12em] text-red-300" role="alert">
              Choose a pickup and return date. Return must be on or after pickup.
            </p>
          ) : null}

          {status === "ok" ? (
            <div className="border border-cyan/25 bg-black/40 p-4">
              <p className="font-mono text-[10px] tracking-[0.24em] text-cyan">
                REQUEST RECEIVED
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white">
                This presentation form does not confirm live inventory. Call{" "}
                <a className="underline underline-offset-4 hover:text-cyan" href={telHref}>
                  {business.phoneDisplay}
                </a>{" "}
                or message CAR DAYZ LANKA on{" "}
                <a
                  className="underline underline-offset-4 hover:text-cyan"
                  href={business.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>{" "}
                with your dates and preferred vehicle.
              </p>
            </div>
          ) : status === "idle" ? (
            <p className="font-mono text-[10px] tracking-[0.16em] text-mute">
              We’ll confirm availability directly — no automated booking lock.
            </p>
          ) : null}
        </div>
      </form>
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
