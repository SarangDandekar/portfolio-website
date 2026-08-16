import { Hero } from "@/components/home/Hero";
import { BillWelcome } from "@/components/home/BillWelcome";
import { Highlight } from "@/components/home/Highlight";
import { About } from "@/components/home/About";
import { MenuSection } from "@/components/home/MenuSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitUs } from "@/components/home/VisitUs";
import { BottomCTA } from "@/components/home/BottomCTA";
import {
  fetchActiveHighlight,
  fetchRemoteGalleryItems,
} from "@/lib/supabase/content";

/** Refresh gallery / highlight shortly after admin updates */
export const revalidate = 60;

export default async function HomePage() {
  const [highlight, remoteGallery] = await Promise.all([
    fetchActiveHighlight(),
    fetchRemoteGalleryItems(),
  ]);

  return (
    <>
      <Hero />
      <BillWelcome />
      {highlight ? <Highlight highlight={highlight} /> : null}
      <About />
      <MenuSection />
      <WhyChooseUs />
      <Gallery remoteItems={remoteGallery} />
      <Testimonials />
      <VisitUs />
      <BottomCTA />
    </>
  );
}
