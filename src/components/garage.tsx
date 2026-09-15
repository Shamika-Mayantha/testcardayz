"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { LOOKBOOK } from "@/lib/site";
import { Button } from "@/components/ui/button";

const FILTERS = ["All", "Wrap", "PPF", "Finish", "Interior", "Lighting"] as const;

export function Garage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<(typeof LOOKBOOK)[number] | null>(null);

  const items = LOOKBOOK.filter((item) =>
    filter === "All"
      ? true
      : item.tag.toLowerCase().includes(filter.toLowerCase()) ||
        (filter === "Wrap" && item.tag.toLowerCase().includes("color")) ||
        (filter === "Finish" &&
          (item.tag === "Finish" || item.tag === "Detail" || item.tag === "Statement"))
  );

  return (
    <section id="lookbook" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.4em] text-cyan-300">
              02 — LOOKBOOK
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              The frequency we chase
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Atmosphere, not a fake portfolio. These frames are the energy —
              satin nights, ceramic depth, and cockpits that glow. Your car
              gets its own chapter.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                className="font-display tracking-[0.16em]"
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <p className="rounded-xl border border-cyan-300/20 bg-black/30 p-8 text-sm text-white/60">
                Nothing in this lane yet. Try another filter or book a custom
                finish.
              </p>
            ) : (
              items.map((item) => (
                <motion.button
                  layout
                  key={item.src}
                  type="button"
                  data-cursor="hover"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onClick={() => setActive(item)}
                  className="group mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`${item.title} — ${item.tag}`}
                    className="w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="flex items-center justify-between bg-black/55 px-4 py-3 backdrop-blur-md">
                    <span>
                      <span className="font-display block text-sm tracking-widest">
                        {item.title}
                      </span>
                      <span className="text-xs text-white/55">{item.meta}</span>
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300">
                      {item.tag.toUpperCase()}
                    </span>
                  </span>
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="relative max-h-[90svh] w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-300/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.title}
                className="max-h-[78svh] w-full object-cover"
              />
              <figcaption className="flex items-center justify-between bg-[#0a0c14] px-5 py-4">
                <div>
                  <p className="font-display tracking-widest">{active.title}</p>
                  <p className="text-sm text-white/55">{active.meta}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setActive(null)}
                  aria-label="Close lookbook"
                >
                  <X />
                </Button>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
