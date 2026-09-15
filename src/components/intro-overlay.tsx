"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const BOOT_MS = 2600;
const START_KEY = "cd-boot-start";
const DONE_KEY = "cd-boot";

function readStart(): number {
  const now = Date.now();
  try {
    if (sessionStorage.getItem(DONE_KEY) === "1") return now - BOOT_MS;
    const stored = Number(sessionStorage.getItem(START_KEY) || 0);
    if (stored > 0) return stored;
    sessionStorage.setItem(START_KEY, String(now));
    return now;
  } catch {
    return now;
  }
}

function markDone() {
  try {
    sessionStorage.setItem(DONE_KEY, "1");
  } catch {
    /* ignore private-mode quota */
  }
}

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const remaining = Math.max(0, BOOT_MS - (Date.now() - readStart()));
    const t = window.setTimeout(() => {
      markDone();
      setVisible(false);
    }, remaining);

    const skip = () => {
      markDone();
      setVisible(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Studio boot sequence"
      className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center bg-[#05060a]"
      onClick={() => {
        markDone();
        setVisible(false);
      }}
    >
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      <p className="font-mono text-[10px] tracking-[0.5em] text-cyan-300/70">
        SYSTEM BOOT // LK-01
      </p>
      <div className="mt-8">
        <Logo className="scale-125" />
      </div>
      <h1 className="font-display mt-8 text-center text-3xl font-bold tracking-[0.2em] text-glow sm:text-5xl">
        CAR DAYZ
      </h1>
      <p className="mt-2 font-display text-sm tracking-[0.55em] text-fuchsia-300">
        LANKA
      </p>
      <div className="mt-10 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
        <div className="animate-boot-bar h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300" />
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.35em] text-white/45">
        CALIBRATING FILM · LIGHT · SURFACE
      </p>
      <p className="mt-8 font-mono text-[10px] tracking-[0.35em] text-white/35">
        TAP TO ENTER
      </p>
    </div>
  );
}
