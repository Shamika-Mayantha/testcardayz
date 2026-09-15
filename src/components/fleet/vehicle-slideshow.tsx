"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type SlideshowProps = {
  images: readonly string[];
  alt: string;
  sizes: string;
  delay?: number;
  interval?: number;
  paused?: boolean;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
};

export function VehicleSlideshow({
  images,
  alt,
  sizes,
  delay = 0,
  interval = 4200,
  paused = false,
  priority = false,
  interactive = false,
  className = "",
}: SlideshowProps) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const count = images.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView || count < 2) return;
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      setIndex((current) => (current + 1) % count);
      intervalId = window.setInterval(() => {
        setIndex((current) => (current + 1) % count);
      }, interval);
    }, interval + delay);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [reduce, paused, inView, count, delay, interval]);

  const src = images[index] ?? images[0];
  const frame = String(index + 1).padStart(2, "0");
  const total = String(count).padStart(2, "0");
  const pan = index % 2 === 0 ? 1.07 : 1.05;
  const origin = index % 2 === 0 ? "60% 40%" : "40% 55%";

  return (
    <div ref={root} className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${src}-${index}`}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? { scale: 1 } : { scale: pan }}
            transition={{ duration: reduce ? 0 : interval / 1000 + 0.8, ease: "linear" }}
            style={{ transformOrigin: origin }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority && index === 0}
              sizes={sizes}
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {count > 1 ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-4">
          <div className="flex items-end gap-[5px]">
            {images.map((image, i) => {
              const active = i === index;
              const tick = (
                <span
                  className={`block h-px transition-all duration-500 ${
                    active ? "w-7 bg-[#e10600]" : "w-3 bg-white/35"
                  }`}
                />
              );
              if (!interactive) {
                return <span key={`${image}-${i}`}>{tick}</span>;
              }
              return (
                <button
                  key={`${image}-${i}`}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  className="pointer-events-auto py-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIndex(i);
                  }}
                >
                  {tick}
                </button>
              );
            })}
          </div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-white/80">
            {frame} / {total}
          </p>
        </div>
      ) : null}
    </div>
  );
}
