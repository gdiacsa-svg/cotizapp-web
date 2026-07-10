import type { Metadata } from "next";
import TutorialHero from "@/components/tutorial/TutorialHero";
import ReadingProgress from "@/components/tutorial/ReadingProgress";
import TutorialNav from "@/components/tutorial/TutorialNav";
import TutorialOutro from "@/components/tutorial/TutorialOutro";
import SectionDivider from "@/components/ui/SectionDivider";
import Section01QueEs from "@/components/tutorial/Section01QueEs";
import Section02Instalacion from "@/components/tutorial/Section02Instalacion";
import Section03Dashboard from "@/components/tutorial/Section03Dashboard";
import Section04Clientes from "@/components/tutorial/Section04Clientes";
import Section05Productos from "@/components/tutorial/Section05Productos";
import Section06Cotizaciones from "@/components/tutorial/Section06Cotizaciones";
import Section07Cobros from "@/components/tutorial/Section07Cobros";
import Section08Perfil from "@/components/tutorial/Section08Perfil";
import Section09Planes from "@/components/tutorial/Section09Planes";
import Section10Respaldo from "@/components/tutorial/Section10Respaldo";

const TITLE = "Manual de uso";
const DESCRIPTION =
  "Aprende a usar CotizApp paso a paso: instalación, clientes, productos, cotizaciones, cobros y respaldo. La guía completa para empezar a cotizar hoy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} — CotizApp`,
    description: DESCRIPTION,
    url: "/tutorial",
  },
  twitter: {
    title: `${TITLE} — CotizApp`,
    description: DESCRIPTION,
  },
};

export default function TutorialPage() {
  return (
    <>
      <TutorialHero />
      <SectionDivider />
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="lg:flex lg:gap-12">
          <TutorialNav />

          <main className="min-w-0 flex-1">
            <Section01QueEs />
            <SectionDivider />
            <Section02Instalacion />
            <SectionDivider />
            <Section03Dashboard />
            <SectionDivider />
            <Section04Clientes />
            <SectionDivider />
            <Section05Productos />
            <SectionDivider />
            <Section06Cotizaciones />
            <SectionDivider />
            <Section07Cobros />
            <SectionDivider />
            <Section08Perfil />
            <SectionDivider />
            <Section09Planes />
            <SectionDivider />
            <Section10Respaldo />
          </main>
        </div>
      </div>

      <div className="mt-16">
        <TutorialOutro />
      </div>
    </>
  );
}
