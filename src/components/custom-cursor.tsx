"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = Boolean(
        target?.closest("a, button, input, textarea, select, [data-cursor='hover']")
      );
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
      if (ring.current) {
        const scale = hovering ? 1.55 : 1;
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
        ring.current.style.borderColor = hovering
          ? "rgba(255,60,172,0.9)"
          : "rgba(34,240,255,0.75)";
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
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-1.5 rounded-full bg-cyan-300 mix-blend-screen shadow-[0_0_12px_#22f0ff] md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-9 rounded-full border border-cyan-300/70 mix-blend-screen md:block"
      />
    </>
  );
}
