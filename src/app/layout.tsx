import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CAR DAYZ LANKA — Wrap. Protect. Reveal.",
  description:
    "CAR DAYZ LANKA is a futuristic automotive studio in Sri Lanka for color-change wraps, PPF, ceramic coating, tint, and precision detailing. Book through Facebook.",
  applicationName: "CAR DAYZ LANKA",
  keywords: [
    "CAR DAYZ LANKA",
    "CAR DAYZ LK",
    "car wrap Sri Lanka",
    "PPF Colombo",
    "ceramic coating",
    "car detailing Sri Lanka",
  ],
  openGraph: {
    title: "CAR DAYZ LANKA",
    description:
      "Rewrite the machine. Vinyl wrap, PPF, ceramic, and detailing for Sri Lankan roads.",
    type: "website",
    locale: "en_LK",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
