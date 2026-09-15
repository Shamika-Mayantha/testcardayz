"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIso(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDisplay(value: string) {
  const date = parseIso(value);
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()].slice(0, 3);
  return `${day} ${month} ${date.getFullYear()}`;
}

function monthCells(view: Date) {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(new Date(view.getFullYear(), view.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function DatePicker({
  id,
  value,
  onChange,
  min,
  placeholder = "SELECT DATE",
  "aria-label": ariaLabel,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
  min?: string;
  placeholder?: string;
  "aria-label": string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 280 });
  const selected = value ? parseIso(value) : null;
  const minDate = min ? parseIso(min) : null;
  const [view, setView] = useState(() => selected ?? minDate ?? new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setView(selected ?? minDate ?? new Date());
  }, [open, selected, minDate]);

  useEffect(() => {
    if (!open) return;

    function place() {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const width = Math.min(320, Math.max(r.width, 280));
      let left = r.left;
      if (left + width > window.innerWidth - 12) {
        left = window.innerWidth - width - 12;
      }
      if (left < 12) left = 12;
      const estimatedHeight = 308;
      let top = r.bottom + 8;
      if (top + estimatedHeight > window.innerHeight - 8 && r.top > estimatedHeight) {
        top = r.top - estimatedHeight - 8;
      }
      setCoords({ top, left, width });
    }

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      const t = event.target as Node;
      if (root.current?.contains(t) || popover.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cells = useMemo(() => monthCells(view), [view]);
  const todayIso = toIso(new Date());

  const calendar = open && mounted
    ? createPortal(
        <div
          ref={popover}
          role="dialog"
          aria-label="Choose date"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            width: coords.width,
          }}
          className="z-[120] border border-[#e10600]/40 bg-[#080808] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
              }
              className="flex size-8 items-center justify-center border border-white/10 text-white hover:border-[#e10600] hover:text-[#e10600]"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#e10600]">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
              }
              className="flex size-8 items-center justify-center border border-white/10 text-white hover:border-[#e10600] hover:text-[#e10600]"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-center font-mono text-[9px] tracking-[0.16em] text-white/40"
              >
                {day}
              </span>
            ))}
            {cells.map((date, i) => {
              if (!date) {
                return <span key={`empty-${i}`} />;
              }
              const iso = toIso(date);
              const disabled = minDate
                ? startOfDay(date) < startOfDay(minDate)
                : false;
              const isSelected = iso === value;
              const isToday = iso === todayIso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`h-8 font-mono text-[11px] tracking-wide transition ${
                    disabled
                      ? "cursor-not-allowed text-white/20"
                      : isSelected
                        ? "bg-[#e10600] text-white"
                        : isToday
                          ? "border border-[#e10600]/70 text-white hover:bg-[#e10600]/20"
                          : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={root} className="relative">
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="hud-input flex w-full cursor-pointer items-center justify-between gap-2 text-left"
      >
        <span className={value ? "text-white" : "text-white/35"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <CalendarDays className="size-4 shrink-0 text-[#e10600]" />
      </button>
      {calendar}
    </div>
  );
}
