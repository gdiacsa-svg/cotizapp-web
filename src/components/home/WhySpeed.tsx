import { Zap, Handshake, UserCheck } from "lucide-react";
import Folio from "@/components/ui/Folio";
import TicketCard from "@/components/ui/TicketCard";

const REASONS = [
  {
    folio: "005",
    icon: Zap,
    title: "Ganas la venta primero",
    description:
      "El primero en mandar una cotización profesional casi siempre se lleva el trabajo. El cliente no espera.",
    rotate: "md:-rotate-1",
  },
  {
    folio: "006",
    icon: Handshake,
    title: "Más confianza, más cierres",
    description:
      "Una cotización clara y con tu marca genera confianza al instante — y la confianza cierra ventas.",
    rotate: "",
  },
  {
    folio: "007",
    icon: UserCheck,
    title: "No se te va ningún cliente",
    description:
      "Cotiza en el momento, frente al cliente o desde la calle. Nada de 'te aviso mañana'.",
    rotate: "md:rotate-1",
  },
];

export default function WhySpeed() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="002" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Cotizar rápido no es comodidad,{" "}
          <span className="text-brand-blue">es vender más</span>
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {REASONS.map((reason, i) => (
            <TicketCard
              key={reason.folio}
              folio={reason.folio}
              title={reason.title}
              description={reason.description}
              rotateClass={reason.rotate}
              delay={i * 0.1}
              icon={<reason.icon className="h-7 w-7" strokeWidth={1.75} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
