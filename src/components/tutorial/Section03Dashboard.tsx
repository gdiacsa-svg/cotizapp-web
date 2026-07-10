"use client";

import { motion } from "framer-motion";
import { Building2, CalendarRange, LayoutGrid, ListChecks } from "lucide-react";
import Folio from "@/components/ui/Folio";
import DashboardShowcase from "@/components/showcases/DashboardShowcase";
import { StatusPill } from "./StatusPill";

const POINTS = [
  { icon: Building2, text: "Encabezado con el logo y nombre de tu empresa" },
  { icon: CalendarRange, text: "Navega por mes con las flechas para ver los KPI de cada periodo" },
  { icon: LayoutGrid, text: "KPI de cotizaciones, enviadas y aprobadas — total pagado y saldo son Pro" },
  { icon: ListChecks, text: "Lista de últimas cotizaciones: cliente, folio, fecha, monto y estado" },
];

export default function Section03Dashboard() {
  return (
    <section id="dashboard" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="03" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Inicio: tu centro de control
      </h2>

      <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper"
        >
          <DashboardShowcase />
        </motion.div>

        <div>
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

          <p className="mt-7 font-ticket text-xs uppercase tracking-widest text-ink/40">
            Estados de una cotización
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill color="yellow" label="Creada" />
            <StatusPill color="blue" label="Enviada" />
            <StatusPill color="green" label="Aprobada" />
            <StatusPill color="gray" label="Cancelada" />
          </div>
        </div>
      </div>
    </section>
  );
}
