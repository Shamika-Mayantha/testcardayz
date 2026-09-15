import { business, genericWhatsappText, telHref, whatsappHref } from "@/data/business";
import { Magnetic } from "@/components/animations/magnetic";

export function Cta() {
  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-[center_30%] opacity-45"
        style={{ backgroundImage: "url(/brand/cta.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="relative flex min-h-[90vh] flex-col items-start justify-end px-6 py-20 sm:px-12 lg:px-16">
        <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">NEXT STEP</p>
        <h2 className="mt-4 max-w-5xl font-[family-name:var(--font-oswald)] text-[16vw] leading-[0.82] tracking-tight text-white sm:text-8xl lg:text-9xl">
          YOUR NEXT
          <br />
          JOURNEY
          <br />
          STARTS HERE.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href={whatsappHref(genericWhatsappText)}
              target="_blank"
              rel="noreferrer"
              data-cursor="BOOK"
              className="inline-flex border border-cyan bg-cyan px-8 py-4 font-mono text-[11px] tracking-[0.24em] text-white hover:bg-transparent hover:text-cyan"
            >
              BOOK ON WHATSAPP →
            </a>
          </Magnetic>
          <a
            href={telHref}
            className="inline-flex border border-white/20 px-8 py-4 font-mono text-[11px] tracking-[0.2em] text-white hover:border-white"
          >
            CALL {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
