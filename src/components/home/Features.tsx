import Folio from "@/components/ui/Folio";
import TicketCard from "@/components/ui/TicketCard";
import CotizacionShowcase from "@/components/showcases/CotizacionShowcase";
import PdfShareShowcase from "@/components/showcases/PdfShareShowcase";
import ClientesShowcase from "@/components/showcases/ClientesShowcase";
import CobrosShowcase from "@/components/showcases/CobrosShowcase";

const FEATURES = [
  {
    folio: "008",
    media: <CotizacionShowcase />,
    title: "Crear cotizaciones",
    description: "Arma cotizaciones profesionales en minutos, con tu catálogo a la mano.",
    rotate: "md:-rotate-1",
  },
  {
    folio: "009",
    media: <PdfShareShowcase />,
    title: "Exportar PDF / JPG",
    description: "Envíalas listas para WhatsApp o correo, sin depender de otra app.",
    rotate: "",
  },
  {
    folio: "010",
    media: <ClientesShowcase />,
    title: "Gestión de clientes",
    description: "Guarda datos de tus clientes y encuentra cotizaciones pasadas al toque.",
    rotate: "md:rotate-1",
  },
  {
    folio: "011",
    media: <CobrosShowcase />,
    title: "Cobros",
    description: "Registra abonos y da seguimiento a cada pago, sin perder el hilo de quién te debe qué.",
    rotate: "md:-rotate-1",
  },
];

export default function Features() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="003" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Todo lo que necesitas para cotizar
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <TicketCard
              key={feature.folio}
              folio={feature.folio}
              title={feature.title}
              description={feature.description}
              rotateClass={feature.rotate}
              tone="white"
              delay={i * 0.08}
              media={feature.media}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
