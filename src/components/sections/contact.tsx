import { business, genericWhatsappText, mapsUrl, telHref, whatsappHref } from "@/data/business";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-28 lg:py-36">
      <div className="mx-auto grid w-[min(1180px,100%)] gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] tracking-[0.32em] text-cyan">LOCATION</p>
          <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-6xl tracking-tight text-white sm:text-8xl">
            FIND US.
          </h2>
          <address className="mt-8 not-italic text-sm leading-relaxed text-mute">
            {business.addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <p className="mt-6 font-mono text-sm tracking-[0.16em] text-white">
            {business.phoneDisplay}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-mute">
            {business.hoursDisplay}
            <br />
            DAILY
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappHref(genericWhatsappText)}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="border border-cyan bg-cyan px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-white hover:bg-transparent hover:text-cyan"
            >
              WHATSAPP →
            </a>
            <a
              href={telHref}
              data-cursor="OPEN"
              className="border border-white/20 px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-white hover:border-cyan hover:text-cyan"
            >
              CALL NOW →
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="border border-white/20 px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-white hover:border-cyan hover:text-cyan"
            >
              GET DIRECTIONS →
            </a>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-[#080808]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(225,6,0,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(225,6,0,0.16) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/30" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_20px_#e10600]" />
          <div className="absolute bottom-6 left-6 right-6 border border-white/10 bg-black/60 p-4 backdrop-blur-md">
            <p className="font-mono text-[10px] tracking-[0.24em] text-cyan">GRID / BATTARAMULLA</p>
            <p className="mt-2 font-[family-name:var(--font-oswald)] text-2xl text-white">
              6.90° N / 79.95° E
            </p>
            <p className="mt-1 text-xs text-mute">Pelawatta · Colombo District</p>
          </div>
        </div>
      </div>
    </section>
  );
}
