export type VehicleCategory = "hatchback" | "suv";

export type Vehicle = {
  id: string;
  code: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  categoryLabel: string;
  transmission: "Automatic";
  seats: number;
  seatsLabel: string;
  fuel: string;
  image: string;
  alt: string;
  blurb: string;
  highlights: readonly string[];
};

export const fleetFilters: { id: "all" | VehicleCategory; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "HATCHBACK" },
];

export const fleet: Vehicle[] = [
  {
    id: "kia-sonet",
    code: "01",
    name: "Kia Sonet",
    make: "Kia",
    model: "Sonet",
    year: 2026,
    category: "suv",
    categoryLabel: "Compact SUV",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/sonet.jpg",
    alt: "Kia Sonet compact SUV",
    blurb:
      "A 2026 compact SUV with a high driving position and a modern cabin — built for Colombo traffic in the morning and the Southern Expressway by afternoon. Five seats, automatic, easy to place in Battaramulla lanes.",
    highlights: ["2026 model", "Compact SUV stance", "Five seats"],
  },
  {
    id: "toyota-taisor",
    code: "02",
    name: "Toyota Taisor",
    make: "Toyota",
    model: "Taisor",
    year: 2025,
    category: "suv",
    categoryLabel: "Compact Crossover",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/taisor.jpg",
    alt: "Toyota Urban Cruiser Taisor compact crossover",
    blurb:
      "The 2025 Toyota Taisor (Urban Cruiser Taisor) is a coupe-roof compact crossover — sharper looks than a hatch, still city-friendly. A strong choice for couples and small families who want Toyota familiarity with SUV height.",
    highlights: ["2025 model", "Crossover style", "Toyota compact SUV"],
  },
  {
    id: "nissan-magnite",
    code: "03",
    name: "Nissan Magnite",
    make: "Nissan",
    model: "Magnite",
    year: 2026,
    category: "suv",
    categoryLabel: "Compact SUV",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/magnite.jpg",
    alt: "Nissan Magnite compact SUV",
    blurb:
      "A 2026 Nissan Magnite — bold compact SUV lines, a raised ride for mixed Sri Lankan roads, and five seats for coast runs or hill-country weekends. Automatic, petrol, and sized for town as well as the open road.",
    highlights: ["2026 model", "Raised ride height", "Five seats"],
  },
  {
    id: "honda-vezel",
    code: "04",
    name: "Honda Vezel",
    make: "Honda",
    model: "Vezel",
    year: 2015,
    category: "suv",
    categoryLabel: "Crossover",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Hybrid",
    image: "/fleet/vezel.jpg",
    alt: "2015 Honda Vezel crossover",
    blurb:
      "A 2015 Honda Vezel — the first-generation crossover many Sri Lankan drivers already trust. Hybrid manners for longer island stretches, a comfortable cabin, and SUV seating without a bulky footprint.",
    highlights: ["2015 model", "Hybrid crossover", "Proven on Sri Lankan roads"],
  },
  {
    id: "suzuki-wagon-r",
    code: "05",
    name: "Suzuki Wagon R",
    make: "Suzuki",
    model: "Wagon R",
    year: 2015,
    category: "hatchback",
    categoryLabel: "Tall Hatch",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/wagon-r.jpg",
    alt: "2015 Suzuki Wagon R tall hatchback",
    blurb:
      "A 2015 Suzuki Wagon R — the tall city hatch that slips into tight parking, sips petrol, and still seats five. Ideal for Battaramulla errands, airport hops, and anyone who wants a simple, upright drive.",
    highlights: ["2015 model", "Easy parking", "City-friendly hatch"],
  },
];

export function getVehicle(id: string) {
  return fleet.find((vehicle) => vehicle.id === id);
}
