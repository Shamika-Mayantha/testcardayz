# CAR DAYZ LANKA

Premium presentation website for **CAR DAYZ LANKA**, a car rental agency in Battaramulla, Sri Lanka.

Cinematic, dark, and automotive — built so the owner can open it and see what a finished modern rental site can feel like. Vehicle names, photos, specs, and availability live in one file so the demo fleet can be swapped for the real one later.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build
npm start
```

## Replace the demo fleet

Edit [`src/data/fleet.ts`](src/data/fleet.ts). Each vehicle includes:

- `name`, `category`, `seats`, `transmission`, `fuel`
- `image` (file under `/public/fleet`)
- `blurb` and `highlights`

Business details (phone, address, hours, Facebook) live in [`src/data/business.ts`](src/data/business.ts).

Inventory and pricing in the demo file are placeholders. On-site CTAs use **REQUEST PRICE** so sample numbers are never shown as real rates.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Motion + Lenis for cinematic motion and smooth scrolling

## Contact

- **Phone:** +94 71 770 8164
- **Address:** 46/B Liyanage Mawatha, Pelawatta Vijithapura, Battaramulla 10120, Sri Lanka
- **Hours:** 09:00–17:00 daily
- **Facebook:** [CAR DAYZ LK](https://www.facebook.com/p/CAR-DAYZ-LK-61578866334003/)
