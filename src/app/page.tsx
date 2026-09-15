import { CustomCursor } from "@/components/animations/custom-cursor";
import { LoadingScreen } from "@/components/animations/loading-screen";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Footer } from "@/components/layout/footer";
import { MobileBookBar } from "@/components/layout/mobile-book-bar";
import { Navbar } from "@/components/layout/navbar";
import { BookingSearch } from "@/components/sections/booking-search";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Experience } from "@/components/sections/experience";
import { Fleet } from "@/components/sections/fleet";
import { Hero } from "@/components/sections/hero";
import { How } from "@/components/sections/how";
import { Social } from "@/components/sections/social";
import { Statement } from "@/components/sections/statement";
import { Trust } from "@/components/sections/trust";
import { Why } from "@/components/sections/why";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <div className="grain pointer-events-none fixed inset-0 z-[2] hidden md:block" />
      <Navbar />
      <SmoothScroll>
        <main className="flex-1 pb-16 md:pb-0">
          <Hero />
          <BookingSearch />
          <Fleet />
          <Statement />
          <Why />
          <Experience />
          <How />
          <Trust />
          <Cta />
          <Contact />
          <Social />
        </main>
        <Footer />
      </SmoothScroll>
      <MobileBookBar />
    </>
  );
}
