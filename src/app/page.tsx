import { About } from "@/components/about";
import { Book } from "@/components/book";
import { CustomCursor } from "@/components/custom-cursor";
import { Garage } from "@/components/garage";
import { Hero } from "@/components/hero";
import { IntroOverlay } from "@/components/intro-overlay";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <CustomCursor />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <Garage />
        <Process />
        <About />
        <Book />
      </main>
      <SiteFooter />
    </>
  );
}
