import { business } from "@/data/business";

export function Social() {
  return (
    <section className="px-4 pb-24">
      <div className="mx-auto flex w-[min(1180px,100%)] flex-col items-start justify-between gap-8 border-t border-white/10 pt-16 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">SOCIAL</p>
          <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-4xl tracking-tight text-white sm:text-6xl">
            FOLLOW THE JOURNEY
          </h2>
        </div>
        <a
          href={business.facebook}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN"
          className="border border-white/20 px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-white hover:border-cyan hover:text-cyan"
        >
          FACEBOOK →
        </a>
      </div>
    </section>
  );
}
