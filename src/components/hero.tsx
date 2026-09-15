"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/particle-field";
import { SITE } from "@/lib/site";

function SriLankaClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Colombo",
          hour12: false,
        })
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden pt-24 pb-16 sm:items-center"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 scale-105"
          initial={reduce ? false : { scale: 1.12 }}
          animate={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 14, ease: "linear" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/garage/hero.jpg"
            alt="Night sports car — the CAR DAYZ LANKA frequency"
            className="h-full w-full object-cover object-[center_35%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#05060a] via-[#05060a]/78 to-[#05060a]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-[#05060a]/55" />
        <ParticleField className="opacity-70" />
        <div className="scanlines absolute inset-0 opacity-30" />
        <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-300/20 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-black/40 px-3 py-1 font-mono text-[10px] tracking-[0.32em] text-cyan-200 backdrop-blur-md"
          >
            <Radio className="size-3 animate-pulse text-fuchsia-400" />
            LIVE SIGNAL · {SITE.region.toUpperCase()}
          </motion.p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display animate-glitch mt-6 max-w-xl text-5xl leading-[0.92] font-black tracking-tight text-glow sm:text-7xl lg:text-8xl"
          >
            CAR
            <br />
            DAYZ
            <span className="block bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              LANKA
            </span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-base text-white/75 sm:text-lg"
          >
            A wrap, protection, and detailing studio for owners who want the
            car to look like it arrived from 2032 — then still survive Galle
            Road at noon.
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              nativeButton={false}
              render={<a href="#book" />}
              className="font-display h-11 px-5 tracking-[0.18em]"
            >
              RESERVE A SLOT
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              className="font-display h-11 border-cyan-300/40 bg-black/30 px-5 tracking-[0.18em] backdrop-blur-md"
            >
              FACEBOOK
            </Button>
          </motion.div>
        </div>

        <motion.aside
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="hud-frame hidden h-fit self-center rounded-2xl border border-cyan-300/25 bg-black/45 p-5 backdrop-blur-xl lg:block"
        >
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.28em] text-cyan-300/80">
            <span>HUD // STUDIO</span>
            <SriLankaClock />
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["ZONE", "SRI LANKA"],
              ["MODE", "APPOINTMENT"],
              ["FILM", "WRAP + PPF"],
              ["COAT", "CERAMIC"],
              ["CABIN", "RESTYLE"],
              ["LINK", "FACEBOOK"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg border border-white/8 bg-white/3 px-3 py-2"
              >
                <dt className="font-mono text-[9px] tracking-[0.24em] text-white/45">
                  {k}
                </dt>
                <dd className="font-display mt-1 text-xs tracking-widest text-cyan-100">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-white/50">
            Colombo metro bay · island-wide mobile installs on request.
            Message the official page to lock a date.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
