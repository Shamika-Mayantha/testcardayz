"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/site";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      data-cursor="hover"
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      }}
    >
      {children}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="animate-grid h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,240,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,240,255,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-fuchsia-300">
            01 — SYSTEMS
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Six ways to rewrite the machine
          </h2>
          <p className="mt-4 max-w-2xl text-white/65">
            Film, armor, glass, and cabin work under one roof. Pick a lane or
            stack them into a full transformation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="h-full transition-transform duration-200 will-change-transform">
                <Card className="h-full border-0 bg-[#0c101c]/80 ring-cyan-300/15 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-300">
                        {service.code} / {service.kicker.toUpperCase()}
                      </span>
                      <span className="size-2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_#ff3cac]" />
                    </div>
                    <CardTitle className="font-display mt-3 text-xl tracking-wide">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      {service.copy}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 font-mono text-[11px] tracking-wide text-cyan-100/70">
                      {service.specs.map((spec) => (
                        <li key={spec} className="flex gap-2">
                          <span className="text-amber-300">▸</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
