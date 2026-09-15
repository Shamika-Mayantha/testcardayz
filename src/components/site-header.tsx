"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-xl border border-cyan-300/20 bg-black/40 px-2.5 py-1.5 backdrop-blur-xl"
        >
          <Logo />
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-cyan-300/15 bg-black/35 px-2 py-1 backdrop-blur-xl lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.22em] text-white/70 transition hover:bg-cyan-300/10 hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={
              <a href="#book" className="hidden sm:inline-flex" />
            }
            className="font-display h-9 tracking-[0.18em]"
          >
            BOOK A BAY
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border-cyan-300/30 bg-black/40"
                />
              }
            >
              <Menu />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-cyan-300/20 bg-[#0a0c14]/95 backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="font-display tracking-[0.2em]">
                  {SITE.short}
                </SheetTitle>
                <SheetDescription>Sri Lanka automotive studio</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 font-display text-sm tracking-[0.2em] text-white/80 hover:bg-cyan-300/10 hover:text-cyan-200"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
