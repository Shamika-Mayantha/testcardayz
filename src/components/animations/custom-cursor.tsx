"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "open" | "view" | "book";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let current: Mode = "default";

    const readMode = (target: EventTarget | null): Mode => {
      const el = (target as HTMLElement | null)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      const v = el?.dataset.cursor;
      if (v === "open" || v === "view" || v === "book") return v;
      const lower = v?.toLowerCase();
      if (lower === "open" || lower === "view" || lower === "book") return lower;
      if ((target as HTMLElement | null)?.closest?.("a, button")) return "open";
      return "default";
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const next = readMode(e.target);
      if (next !== current) {
        current = next;
        setMode(next);
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
      if (ring.current) {
        const scale = current === "default" ? 1 : 1.85;
        ring.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0) scale(${scale})`;
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-1.5 rounded-full bg-[#e10600] shadow-[0_0_12px_#e10600] md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-11 rounded-full border border-[#e10600]/70 md:block"
      />
      <div
        ref={label}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-11 items-center justify-center font-display text-[9px] tracking-[0.22em] text-[#e10600] md:flex"
      >
        {mode === "default" ? "" : mode.toUpperCase()}
      </div>
    </>
  );
}
