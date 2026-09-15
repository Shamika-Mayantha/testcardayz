"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const KEY = "cdl-intro";

export function LoadingScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let hide = 0;
    let failsafe = 0;

    try {
      if (sessionStorage.getItem(KEY) === "1") {
        hide = window.setTimeout(() => setGone(true), 0);
        return () => window.clearTimeout(hide);
      }
    } catch {
      /* ignore quota / private mode */
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    hide = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setGone(true);
    }, reduce ? 0 : 1100);

    failsafe = window.setTimeout(() => setGone(true), 1600);

    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(failsafe);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="boot-overlay pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#050505]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgb(225 6 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(225 6 0 / 0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <Image
        src="/brand/logo.jpg"
        alt="CAR DAYZ LANKA"
        width={320}
        height={320}
        className="relative z-10 h-40 w-40 object-contain sm:h-52 sm:w-52"
        priority
      />
      <div className="relative z-10 mt-10 h-px w-48 overflow-hidden bg-white/10">
        <div className="animate-load-bar h-full origin-left bg-[#e10600]" />
      </div>
    </div>
  );
}
