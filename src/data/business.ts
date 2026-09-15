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
  rating: 5.0,
  reviews: 26,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=46%2FB%20Liyanage%20Mawatha%2C%20Pelawatta%20Vijithapura%2C%20Battaramulla%2010120%2C%20Sri%20Lanka",
} as const;

export const telHref = `tel:${business.phone}`;
export const mapsUrl = business.mapsUrl;

export const nav = [
  { href: "#fleet", label: "FLEET" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#how", label: "HOW IT WORKS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
] as const;
