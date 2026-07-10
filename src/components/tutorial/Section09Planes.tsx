"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import Folio from "@/components/ui/Folio";
import PlanComparisonTable from "@/components/plans/PlanComparisonTable";

export default function Section09Planes() {
  return (
    <section id="planes" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="09" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Gratis vs. Pro
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Todo lo que cambia entre planes, en un solo recibo.
      </p>

      <PlanComparisonTable className="mt-9 max-w-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="mt-5 flex max-w-2xl items-start gap-3 rounded-md border border-dashed border-brand-blue/40 bg-brand-blue/5 px-4 py-3.5"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
        <p className="font-body text-sm text-ink/70">
          El periodo de prueba da acceso a todo Pro, excepto respaldo —
          eso requiere una suscripción pagada activa.
        </p>
      </motion.div>
    </section>
  );
}
