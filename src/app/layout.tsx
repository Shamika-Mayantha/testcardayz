import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";
import { JsonLd } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CAR DAYZ LANKA | Car Rental in Sri Lanka",
  description:
    "CAR DAYZ LANKA — explore Sri Lanka with a modern car rental experience in Battaramulla. Discover vehicles and request your next ride.",
  applicationName: business.name,
  keywords: [
    "CAR DAYZ LANKA",
    "car rental Sri Lanka",
    "car hire Battaramulla",
    "Pelawatta car rental",
  ],
  openGraph: {
    title: "CAR DAYZ LANKA | Car Rental in Sri Lanka",
    description:
      "Explore Sri Lanka with a modern car rental experience in Battaramulla.",
    type: "website",
    locale: "en_LK",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#050505] text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
