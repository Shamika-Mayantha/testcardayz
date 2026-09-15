import Image from "next/image";
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

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN"
          aria-label="Open directions to CAR DAYZ LANKA in Battaramulla"
          className="group relative block min-h-[360px] overflow-hidden border border-white/10 bg-[#080808]"
        >
          <Image
            src="/brand/location.png"
            alt="Map pin for CAR DAYZ LANKA in Pelawatta, Battaramulla"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-cyan">
              PELAWATTA · BATTARAMULLA
            </p>
            <p className="mt-2 font-[family-name:var(--font-oswald)] text-2xl text-white">
              GET DIRECTIONS →
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
