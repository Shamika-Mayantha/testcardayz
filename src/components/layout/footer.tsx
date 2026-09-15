import { business } from "@/data/business";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505] px-4 py-16 pb-28 sm:px-8 md:pb-16">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-4xl tracking-[0.14em] sm:text-6xl">
            {business.name}
          </p>
          <p className="label-tech mt-3">CAR RENTAL / SRI LANKA</p>
        </div>
        <nav className="flex flex-wrap gap-5">
          <a href="#fleet" className="label-tech hover:text-[#9ee7ff]">
            FLEET
          </a>
          <a href="#book" className="label-tech hover:text-[#9ee7ff]">
            BOOK
          </a>
          <a href="#about" className="label-tech hover:text-[#9ee7ff]">
            ABOUT
          </a>
          <a href="#contact" className="label-tech hover:text-[#9ee7ff]">
            CONTACT
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-2 text-sm text-[#afafaf] sm:flex-row sm:justify-between">
        <a href={`tel:${business.phone}`} className="hover:text-white">
          {business.phoneDisplay}
        </a>
        <p>{business.address}</p>
      </div>
    </footer>
  );
}
