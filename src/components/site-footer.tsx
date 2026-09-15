import { Logo } from "@/components/logo";
import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-cyan-300/15 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-white/55">
            {SITE.tagline} Automotive film, protection, and detailing for Sri
            Lanka. Official page: CAR DAYZ LK.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-xs tracking-[0.22em] text-white/55 hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
            className="font-display text-xs tracking-[0.22em] text-fuchsia-300 hover:text-fuchsia-200"
          >
            FACEBOOK
          </a>
        </nav>
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-center font-mono text-[10px] tracking-[0.28em] text-white/35">
        © {new Date().getFullYear()} {SITE.name} · SRI LANKA
      </div>
    </footer>
  );
}
