"use client";

import { genericWhatsappText, whatsappHref } from "@/data/business";

export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050506]/90 p-3 backdrop-blur-xl md:hidden">
      <a
        href={whatsappHref(genericWhatsappText)}
        target="_blank"
        rel="noreferrer"
        data-cursor="book"
        className="flex h-12 items-center justify-center bg-[#c21f30] font-mono text-xs tracking-[0.24em] text-ivory"
      >
        BOOK ON WHATSAPP →
      </a>
    </div>
  );
}
