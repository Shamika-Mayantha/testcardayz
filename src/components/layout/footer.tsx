import Image from "next/image";
import { business, genericWhatsappText, whatsappHref } from "@/data/business";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050506] px-4 py-16 pb-28 sm:px-8 md:pb-16">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Image
            src="/brand/logo-mark.jpg"
            alt={business.name}
            width={280}
            height={194}
            className="h-16 w-auto sm:h-20"
          />
          <p className="label-tech mt-4">CAR RENTAL / SRI LANKA</p>
        </div>
        <nav className="flex flex-wrap gap-5">
          <a href="#fleet" className="label-tech hover:text-[#c21f30]">
            FLEET
          </a>
          <a href="#book" className="label-tech hover:text-[#c21f30]">
            BOOK
          </a>
          <a
            href={whatsappHref(genericWhatsappText)}
            target="_blank"
            rel="noreferrer"
            className="label-tech hover:text-[#c21f30]"
          >
            WHATSAPP
          </a>
          <a
            href={business.instagram}
            target="_blank"
            rel="noreferrer"
            className="label-tech hover:text-[#c21f30]"
          >
            INSTAGRAM
          </a>
          <a
            href={business.facebook}
            target="_blank"
            rel="noreferrer"
            className="label-tech hover:text-[#c21f30]"
          >
            FACEBOOK
          </a>
          <a href="#contact" className="label-tech hover:text-[#c21f30]">
            CONTACT
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-2 text-sm text-[#8b8b93] sm:flex-row sm:justify-between">
        <a href={`tel:${business.phone}`} className="hover:text-white">
          {business.phoneDisplay}
        </a>
        <p>{business.address}</p>
      </div>
      <p className="mx-auto mt-8 max-w-[1440px] font-mono text-[10px] tracking-[0.2em] text-[#8b8b93]/70">
        3D STUDIO RENDER BASED ON &ldquo;FERRARI 458 ITALIA&rdquo; BY{" "}
        <a href="https://sketchfab.com/models/57bf6cc56931426e87494f554df1dab6" target="_blank" rel="noreferrer" className="underline hover:text-white">
          VICENT091036
        </a>{" "}
        · ILLUSTRATIVE ONLY, NOT A VEHICLE IN THE FLEET
      </p>
    </footer>
  );
}
