import { Hero } from "@/components/home/Hero";
import { BillWelcome } from "@/components/home/BillWelcome";
import { About } from "@/components/home/About";
import { MenuSection } from "@/components/home/MenuSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitUs } from "@/components/home/VisitUs";
import { BottomCTA } from "@/components/home/BottomCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BillWelcome />
      <About />
      <MenuSection />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <VisitUs />
      <BottomCTA />
    </>
  );
}
