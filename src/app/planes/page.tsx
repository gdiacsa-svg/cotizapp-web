import type { Metadata } from "next";
import PlanesHero from "@/components/planes/PlanesHero";
import PlanesPricingCards from "@/components/planes/PlanesPricingCards";
import PlanesTrial from "@/components/planes/PlanesTrial";
import PlanesComparison from "@/components/planes/PlanesComparison";
import PlanesFaq from "@/components/planes/PlanesFaq";
import FinalCta from "@/components/home/FinalCta";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Planes — CotizApp",
};

export default function PlanesPage() {
  return (
    <>
      <PlanesHero />
      <SectionDivider />
      <PlanesPricingCards />
      <SectionDivider />
      <PlanesTrial />
      <SectionDivider />
      <PlanesComparison />
      <SectionDivider />
      <PlanesFaq />
      <SectionDivider />
      <FinalCta />
    </>
  );
}
