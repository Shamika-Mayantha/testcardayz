"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { business, nav } from "@/data/business";
import { Magnetic } from "@/components/animations/magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-5"
      )}
    >
      <div
        className={cn(
          "relative z-50 mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-all duration-500 sm:px-8",
          scrolled
            ? "rounded-none border-b border-white/10 bg-[#050505]/75 py-3 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <a href="#top" className="font-display text-sm tracking-[0.28em]">
          {business.name}
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-tech transition hover:text-[#9ee7ff]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic>
            <a
              href="#book"
              data-cursor="book"
              className="hidden border border-[#9ee7ff]/40 px-4 py-2 font-display text-xs tracking-[0.22em] text-[#9ee7ff] transition hover:bg-[#9ee7ff] hover:text-[#050505] sm:inline-flex"
            >
              BOOK NOW →
            </a>
          </Magnetic>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center border border-white/15 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#050505] px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-4xl tracking-[0.12em]"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-4 font-display text-xl tracking-[0.2em] text-[#9ee7ff]"
              >
                BOOK NOW →
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
