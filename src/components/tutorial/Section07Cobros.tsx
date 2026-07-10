"use client";

import { motion } from "framer-motion";
import { Banknote, PieChart, History, FileBarChart } from "lucide-react";
import Folio from "@/components/ui/Folio";
import CobrosShowcase from "@/components/showcases/CobrosShowcase";
import { ProLock } from "./StatusPill";

const POINTS = [
  { icon: Banknote, text: "Registra pagos sobre cotizaciones aprobadas" },
  { icon: PieChart, text: "KPI de cobros en Inicio con gráfica dona: Pendiente vs. Pagado" },
  { icon: History, text: "Historial de cobros por cliente" },
  { icon: FileBarChart, text: "Genera el estado de cuenta de cualquier cliente" },
];

export default function Section07Cobros() {
  return (
    <section id="cobros" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="07" />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          Cobros
        </h2>
        <ProLock />
      </div>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        En el plan gratis se ve con candado. Con Pro, es tu control de saldo
        pendiente y pagos por cliente.
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="space-y-2.5">
            {POINTS.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
                <span className="font-body text-sm text-ink/70">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="order-1 overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper lg:order-2"
        >
          <CobrosShowcase />
        </motion.div>
      </div>
    </section>
  );
}
