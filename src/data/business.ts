export const business = {
  name: "CAR DAYZ LANKA",
  shortName: "CAR DAYZ LK",
  category: "Car Rental Agency",
  phone: "+94717708164",
  phoneDisplay: "+94 71 770 8164",
  address:
    "46/B Liyanage Mawatha, Pelawatta Vijithapura, Battaramulla 10120, Sri Lanka",
  addressLines: [
    "46/B Liyanage Mawatha",
    "Pelawatta Vijithapura",
    "Battaramulla 10120",
    "Sri Lanka",
  ],
  hours: "09:00–17:00 Daily",
  hoursDisplay: "09:00 — 17:00",
  hoursNote: "DAILY",
  facebook:
    "https://www.facebook.com/p/CAR-DAYZ-LK-61578866334003/",
  instagram: "https://www.instagram.com/cardayzlk/",
  whatsapp: "https://wa.me/94717708164",
  reviewsUrl:
    "https://www.google.com/search?q=CAR+DAYZ+LANKA+Reviews&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wiKammmCWz6xnttHzIrLAAAVsoKY7Sei4lNT72ZnNAkTEkR6_yh59fChWsU3t2jT3MypzHExQZgqfcERTRQQaWf5THp&hl=en",
  rating: 5.0,
  reviews: 26,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=46%2FB%20Liyanage%20Mawatha%2C%20Pelawatta%20Vijithapura%2C%20Battaramulla%2010120%2C%20Sri%20Lanka",
  lat: 6.8904,
  lng: 79.9306,
} as const;

export const telHref = `tel:${business.phone}`;
export const mapsUrl = business.mapsUrl;
export const whatsappUrl = business.whatsapp;

export function whatsappHref(text: string) {
  return `${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function bookingWhatsappText(opts: {
  pickup: string;
  returnDate: string;
  vehicle: string;
  passengers: string;
}) {
  return [
    "Hello CAR DAYZ LANKA,",
    "I would like to request a rental.",
    `Pickup: ${opts.pickup}`,
    `Return: ${opts.returnDate}`,
    `Vehicle: ${opts.vehicle}`,
    `Passengers: ${opts.passengers}`,
    "Please confirm availability and price. Thank you.",
  ].join("\n");
}

export function vehicleWhatsappText(name: string, year: number) {
  return `Hello CAR DAYZ LANKA, I would like to request the ${name} (${year}). Please share availability and price.`;
}

export const genericWhatsappText =
  "Hello CAR DAYZ LANKA, I would like to book a car. Please share availability and price.";

export const nav = [
  { href: "#fleet", label: "FLEET" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#how", label: "HOW IT WORKS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
] as const;
