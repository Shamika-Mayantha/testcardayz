import { business } from "@/data/business";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    name: business.name,
    description:
      "Car rental agency in Battaramulla, Sri Lanka. Request a vehicle for your journey.",
    telephone: business.phone,
    url: business.facebook,
    image: "/brand/hero.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "46/B Liyanage Mawatha, Pelawatta Vijithapura",
      addressLocality: "Battaramulla",
      postalCode: "10120",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.8721,
      longitude: 79.9187,
    },
    openingHours: "Mo-Su 09:00-17:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviews,
    },
    sameAs: [business.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
