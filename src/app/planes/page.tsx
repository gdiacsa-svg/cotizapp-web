import type { Metadata } from "next";
import PlanesHero from "@/components/planes/PlanesHero";
import PlanesPricingCards from "@/components/planes/PlanesPricingCards";
import PlanesTrial from "@/components/planes/PlanesTrial";
import PlanesComparison from "@/components/planes/PlanesComparison";
import PlanesFaq from "@/components/planes/PlanesFaq";
import FinalCta from "@/components/home/FinalCta";
import SectionDivider from "@/components/ui/SectionDivider";

const TITLE = "Planes y precios";
const DESCRIPTION =
  "Empieza gratis o pásate a Pro por $69/mes ($599/año) y cotiza sin límites. Compara planes y elige el que se ajuste a tu negocio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} — CotizApp`,
    description: DESCRIPTION,
    url: "/planes",
  },
  twitter: {
    title: `${TITLE} — CotizApp`,
    description: DESCRIPTION,
  },
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
