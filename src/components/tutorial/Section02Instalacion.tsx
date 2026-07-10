"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import Folio from "@/components/ui/Folio";
import TutorialStep from "./TutorialStep";

const STEPS = [
  { title: "Descarga la app", body: "Búscala en Google Play e instálala en tu celular." },
  { title: "Ábrela por primera vez", body: "Arrancas con un periodo de prueba gratis que incluye funciones Pro." },
  { title: "Configura tu empresa", body: "En Perfil → Diseño agrega tu nombre, logo y contacto." },
  { title: "Elige tu formato", body: "En Perfil → Diseño → Formato, escoge cómo se ve tu cotización." },
  { title: "Agrega tus productos", body: "Ve a la pestaña Productos y arma tu catálogo." },
  { title: "Crea tu primera cotización", body: "Toca el botón “Crear nueva cotización” y listo." },
];

export default function Section02Instalacion() {
  return (
    <section id="instalacion" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="02" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Instalación y primeros pasos
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Seis pasos entre descargar la app y tener tu primera cotización lista.
      </p>

      <div className="mt-9 max-w-xl">
        {STEPS.map((step, i) => (
          <TutorialStep
            key={step.title}
            number={String(i + 1).padStart(2, "0")}
            title={step.title}
            delay={i * 0.05}
            last={i === STEPS.length - 1}
          >
            {step.body}
          </TutorialStep>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="mt-8 flex max-w-xl items-start gap-3 rounded-md border border-dashed border-brand-blue/40 bg-brand-blue/5 px-4 py-3.5"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
        <p className="font-body text-sm text-ink/70">
          El periodo de prueba te da acceso Pro temporal —{" "}
          <span className="font-semibold">excepto respaldo de base de datos</span>.
          Puedes ver cuánto te queda en{" "}
          <span className="font-ticket text-[13px] font-semibold text-ink">Perfil → Plan</span>.
        </p>
      </motion.div>
    </section>
  );
}
