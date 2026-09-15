"use client";

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050505]/90 p-3 backdrop-blur-xl md:hidden">
      <a
        href="#book"
        data-cursor="book"
        className="flex h-12 items-center justify-center bg-[#9ee7ff] font-display text-sm tracking-[0.24em] text-[#050505]"
      >
        BOOK A CAR →
      </a>
    </div>
  );
}
