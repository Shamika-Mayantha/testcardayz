// Demo inventory for presentation. Replace names, photos, specs, and
// availability with CAR DAYZ LANKA's live fleet when ready. Pricing is
// intentionally omitted — all CTAs use REQUEST PRICE.

export type VehicleCategory = "hatchback" | "sedan" | "suv" | "van";

export type Vehicle = {
  id: string;
  code: string;
  name: string;
  make: string;
  model: string;
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
  { id: "hatchback", label: "HATCHBACK" },
  { id: "sedan", label: "SEDAN" },
  { id: "suv", label: "SUV" },
  { id: "van", label: "VAN" },
];

export const fleet: Vehicle[] = [
  {
    id: "toyota-aqua",
    code: "01",
    name: "Toyota Aqua",
    make: "Toyota",
    model: "Aqua",
    category: "hatchback",
    categoryLabel: "Hatchback / Economy",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Hybrid",
    image: "/fleet/aqua.jpg",
    alt: "Toyota Aqua hybrid hatchback",
    blurb:
      "A compact hybrid for Colombo traffic and quiet island days — light on fuel, easy to place.",
    highlights: ["City-friendly size", "Hybrid efficiency", "Automatic"],
  },
  {
    id: "toyota-prius",
    code: "02",
    name: "Toyota Prius",
    make: "Toyota",
    model: "Prius",
    category: "sedan",
    categoryLabel: "Sedan / Hybrid",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Hybrid",
    image: "/fleet/prius.jpg",
    alt: "Toyota Prius hybrid sedan",
    blurb:
      "A composed hybrid sedan for longer stretches of tarmac — airport runs, hill country, coast.",
    highlights: ["Hybrid sedan", "Quiet cabin", "Automatic"],
  },
  {
    id: "toyota-axio",
    code: "03",
    name: "Toyota Axio",
    make: "Toyota",
    model: "Axio",
    category: "sedan",
    categoryLabel: "Sedan",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol / Hybrid",
    image: "/fleet/axio.jpg",
    alt: "Toyota Axio sedan",
    blurb:
      "A practical sedan for families and business days — familiar, automatic, and easy to live with.",
    highlights: ["Sedan comfort", "Five seats", "Automatic"],
  },
  {
    id: "toyota-yaris",
    code: "04",
    name: "Toyota Yaris",
    make: "Toyota",
    model: "Yaris",
    category: "hatchback",
    categoryLabel: "Hatchback",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/yaris.jpg",
    alt: "Toyota Yaris hatchback",
    blurb:
      "A nimble hatch for short hops across Battaramulla, Kotte, and the city grid.",
    highlights: ["Compact hatch", "Petrol", "Automatic"],
  },
  {
    id: "toyota-vitz",
    code: "05",
    name: "Toyota Vitz",
    make: "Toyota",
    model: "Vitz",
    category: "hatchback",
    categoryLabel: "Hatchback / Economy",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Petrol",
    image: "/fleet/vitz.jpg",
    alt: "Toyota Vitz economy hatchback",
    blurb:
      "An economy hatch that keeps things simple — parking, fuel, and everyday Sri Lankan roads.",
    highlights: ["Economy", "Easy parking", "Automatic"],
  },
  {
    id: "toyota-chr",
    code: "06",
    name: "Toyota C-HR",
    make: "Toyota",
    model: "C-HR",
    category: "suv",
    categoryLabel: "SUV / Crossover",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Hybrid",
    image: "/fleet/chr.jpg",
    alt: "Toyota C-HR hybrid crossover",
    blurb:
      "A coupe-line crossover with hybrid manners — higher seating, compact footprint.",
    highlights: ["Crossover stance", "Hybrid", "Automatic"],
  },
  {
    id: "honda-vezel",
    code: "07",
    name: "Honda Vezel",
    make: "Honda",
    model: "Vezel",
    category: "suv",
    categoryLabel: "SUV / Crossover",
    transmission: "Automatic",
    seats: 5,
    seatsLabel: "5 SEATS",
    fuel: "Hybrid",
    image: "/fleet/vezel.jpg",
    alt: "Honda Vezel hybrid crossover",
    blurb:
      "A hybrid crossover for mixed days — city in the morning, coast by afternoon.",
    highlights: ["Hybrid SUV", "Five seats", "Automatic"],
  },
  {
    id: "toyota-rush",
    code: "08",
    name: "Toyota Rush",
    make: "Toyota",
    model: "Rush",
    category: "suv",
    categoryLabel: "SUV",
    transmission: "Automatic",
    seats: 7,
    seatsLabel: "7 SEATS",
    fuel: "Petrol",
    image: "/fleet/rush.jpg",
    alt: "Toyota Rush seven-seat SUV",
    blurb:
      "A seven-seat SUV when the party is larger than a hatch — families, friends, extra bags.",
    highlights: ["Seven seats", "Higher ride", "Automatic"],
  },
  {
    id: "toyota-kdh",
    code: "09",
    name: "Toyota KDH",
    make: "Toyota",
    model: "KDH",
    category: "van",
    categoryLabel: "Van",
    transmission: "Automatic",
    seats: 9,
    seatsLabel: "9+ SEATS",
    fuel: "Diesel",
    image: "/fleet/kdh.jpg",
    alt: "Toyota KDH passenger van",
    blurb:
      "A diesel van for groups — airport collections, staff moves, island weekends together.",
    highlights: ["Nine-plus seats", "Diesel", "Automatic"],
  },
  {
    id: "toyota-hiace",
    code: "10",
    name: "Toyota Hiace",
    make: "Toyota",
    model: "Hiace",
    category: "van",
    categoryLabel: "Van",
    transmission: "Automatic",
    seats: 10,
    seatsLabel: "10+ SEATS",
    fuel: "Diesel",
    image: "/fleet/hiace.jpg",
    alt: "Toyota Hiace passenger van",
    blurb:
      "The larger van format for ten-plus — tours, teams, and luggage that will not fit a sedan.",
    highlights: ["Ten-plus seats", "Diesel", "Automatic"],
  },
];

export function getVehicle(id: string) {
  return fleet.find((vehicle) => vehicle.id === id);
}
