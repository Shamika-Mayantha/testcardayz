import { Logo } from "@/components/logo";

export function IntroOverlay() {
  return (
    <>
      <input id="cd-boot-skip" type="checkbox" className="sr-only" />
      <label
        htmlFor="cd-boot-skip"
        className="intro-overlay fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center bg-[#05060a]"
        aria-label="Skip studio boot sequence"
      >
        <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <p className="font-mono text-[10px] tracking-[0.5em] text-cyan-300/70">
          SYSTEM BOOT // LK-01
        </p>
        <div className="mt-8">
          <Logo className="scale-125" />
        </div>
        <h1 className="font-display mt-8 text-center text-3xl font-bold tracking-[0.2em] text-glow sm:text-5xl">
          CAR DAYZ
        </h1>
        <p className="mt-2 font-display text-sm tracking-[0.55em] text-fuchsia-300">
          LANKA
        </p>
        <div className="mt-10 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <div className="animate-boot-bar h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300" />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.35em] text-white/45">
          CALIBRATING FILM · LIGHT · SURFACE
        </p>
        <p className="mt-8 font-mono text-[10px] tracking-[0.35em] text-white/35">
          TAP TO ENTER
        </p>
      </label>
    </>
  );
}
