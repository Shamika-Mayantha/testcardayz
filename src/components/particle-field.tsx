"use client";

import { useEffect, useRef } from "react";

export function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let running = true;

    const particles = Array.from({ length: reduce ? 18 : 56 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: 0.15 + Math.random() * 0.55,
      hue: Math.random() > 0.72 ? 320 : 186,
    }));

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const horizon = height * 0.58;
      ctx.strokeStyle = "rgba(34,240,255,0.09)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 14; i++) {
        const y = horizon + ((i * i) / 14) * (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(width * 0.5, horizon);
      ctx.lineTo(-width * 0.15, height);
      ctx.moveTo(width * 0.5, horizon);
      ctx.lineTo(width * 1.15, height);
      ctx.strokeStyle = "rgba(255,60,172,0.12)";
      ctx.stroke();

      for (const p of particles) {
        if (!reduce) {
          p.y -= 0.0009 * p.s;
          if (p.y < 0) p.y = 1;
        }
        const x = p.x * width;
        const y = p.y * height;
        const r = 0.6 + p.z * 1.8;
        ctx.beginPath();
        ctx.fillStyle =
          p.hue > 250
            ? `rgba(255,60,172,${0.25 + p.z * 0.5})`
            : `rgba(34,240,255,${0.2 + p.z * 0.55})`;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        ctx.strokeStyle = "rgba(34,240,255,0.07)";
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = (a.x - b.x) * width;
            const dy = (a.y - b.y) * height;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              ctx.globalAlpha = 1 - dist / 110;
              ctx.beginPath();
              ctx.moveTo(a.x * width, a.y * height);
              ctx.lineTo(b.x * width, b.y * height);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
