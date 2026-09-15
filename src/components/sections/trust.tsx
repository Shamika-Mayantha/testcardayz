import { business } from "@/data/business";

export function Trust() {
  return (
    <section className="border-y border-white/10 px-4 py-28 text-center">
      <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">
        PUBLICLY LISTED RATING
      </p>
      <p className="mt-6 font-[family-name:var(--font-oswald)] text-[22vw] leading-none tracking-tight text-white sm:text-[10rem]">
        {business.rating.toFixed(1)}
        <span className="ml-3 align-top text-[8vw] text-cyan sm:text-6xl">★</span>
      </p>
      <p className="mt-4 font-mono text-sm tracking-[0.28em] text-mute">
        {business.reviews} REVIEWS
      </p>
      <a
        href={business.facebook}
        target="_blank"
        rel="noreferrer"
        data-cursor="OPEN"
        className="mt-10 inline-flex border border-white/20 px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-white hover:border-cyan hover:text-cyan"
      >
        SEE OUR REVIEWS →
      </a>
    </section>
  );
}
