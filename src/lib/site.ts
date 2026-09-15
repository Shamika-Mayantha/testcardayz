export const SITE = {
  name: "CAR DAYZ LANKA",
  short: "CAR DAYZ LK",
  tagline: "Rewrite the machine.",
  facebook:
    "https://www.facebook.com/p/CAR-DAYZ-LK-61578866334003/",
  region: "Sri Lanka",
  hours: "By appointment · 9:00–20:00 SLT",
} as const;

export const NAV = [
  { href: "#services", label: "Systems" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#process", label: "Protocol" },
  { href: "#studio", label: "Studio" },
  { href: "#book", label: "Book" },
] as const;

export const SERVICES = [
  {
    code: "01",
    id: "wrap",
    title: "Color-change wrap",
    kicker: "Identity",
    copy: "Satin, gloss, matte, chrome, and color-shift films cut to your body lines. A new skin without a new paint shop.",
    specs: ["3M / Avery-grade films", "Door jams on request", "2–5 year install warranty"],
  },
  {
    code: "02",
    id: "ppf",
    title: "Paint protection film",
    kicker: "Armor",
    copy: "Invisible self-healing PPF over the nose, rockers, or a full body. Stone chips stay a story you never tell.",
    specs: ["Self-healing top coat", "Partial or full front", "Optical-clear finish"],
  },
  {
    code: "03",
    id: "ceramic",
    title: "Ceramic coating",
    kicker: "Depth",
    copy: "A glass-like hydrophobic layer that locks gloss, kills water spots, and makes weekly washes a five-minute ritual.",
    specs: ["1–5 year systems", "Paint, glass, wheels", "Decontamination prep"],
  },
  {
    code: "04",
    id: "detail",
    title: "Precision detailing",
    kicker: "Reset",
    copy: "Correction, extraction, and a cabin that smells like it just left the showroom. Daily drivers get the same obsession.",
    specs: ["Single or multi-stage", "Interior + exterior", "Engine bay optional"],
  },
  {
    code: "05",
    id: "tint",
    title: "Window architecture",
    kicker: "Shade",
    copy: "Heat-rejecting privacy film matched to Sri Lankan sun. Clean edges. No purple fade in two monsoons.",
    specs: ["IR ceramic films", "Legal-shade guidance", "Front, rear, sunstrip"],
  },
  {
    code: "06",
    id: "interior",
    title: "Cabin restyle",
    kicker: "Cockpit",
    copy: "Alcantara, piano black, ambient lighting, and stitch-matched details so the inside keeps up with the wrap.",
    specs: ["Trim wraps", "Lighting kits", "Steering + seat accents"],
  },
] as const;

export const LOOKBOOK = [
  {
    src: "/garage/hero.jpg",
    title: "Night Protocol",
    tag: "Atmosphere",
    meta: "Low-slung · city afterglow",
  },
  {
    src: "/garage/porsche-night.jpg",
    title: "Phantom Satin",
    tag: "Wrap",
    meta: "Dark satin · smoked glass",
  },
  {
    src: "/garage/lambo-wrap.jpg",
    title: "Signal Orange",
    tag: "Color-change",
    meta: "High-voltage accent",
  },
  {
    src: "/garage/ferrari.jpg",
    title: "Rosso Circuit",
    tag: "Finish",
    meta: "Deep gloss ceramic",
  },
  {
    src: "/garage/camaro.jpg",
    title: "Muscle Line",
    tag: "Body",
    meta: "American stance · local roads",
  },
  {
    src: "/garage/amg.jpg",
    title: "Steel Coupe",
    tag: "PPF",
    meta: "Clear armor · factory paint",
  },
  {
    src: "/garage/bmw.jpg",
    title: "Grid Runner",
    tag: "Detail",
    meta: "Corrected paint · calipers",
  },
  {
    src: "/garage/aventador.jpg",
    title: "Apex Green",
    tag: "Statement",
    meta: "Full-body presence",
  },
  {
    src: "/garage/headlights.jpg",
    title: "Lamp Signature",
    tag: "Lighting",
    meta: "DRL geometry · night HUD",
  },
  {
    src: "/garage/interior.jpg",
    title: "Cockpit Black",
    tag: "Interior",
    meta: "Alcantara · ambient red",
  },
  {
    src: "/garage/mercedes.jpg",
    title: "Vertical Stance",
    tag: "Portrait",
    meta: "Show-floor posture",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Signal",
    copy: "Send the model, year, and the look in your head. Photos help. A voice note on Facebook is enough to start.",
  },
  {
    n: "02",
    title: "Design",
    copy: "We lock film, finish, and coverage — wrap, PPF, ceramic, tint — and quote the real hours, not a fantasy number.",
  },
  {
    n: "03",
    title: "Prep",
    copy: "Decontamination, panel correction, and a dust-controlled bay. Film only goes on a surface that deserves it.",
  },
  {
    n: "04",
    title: "Install",
    copy: "Knifeless where it matters, tucked edges, heat-cycled curves. We do not rush a door handle to make the clock.",
  },
  {
    n: "05",
    title: "Reveal",
    copy: "Walkaround, care kit, and a night-time photo if you want one. Then you take it back to the island roads.",
  },
] as const;

export const SERVICE_OPTIONS = [
  { value: "wrap", label: "Color-change wrap" },
  { value: "ppf", label: "Paint protection film" },
  { value: "ceramic", label: "Ceramic coating" },
  { value: "detail", label: "Precision detailing" },
  { value: "tint", label: "Window tint" },
  { value: "interior", label: "Cabin restyle" },
  { value: "combo", label: "Full transformation" },
  { value: "other", label: "Something else" },
] as const;
