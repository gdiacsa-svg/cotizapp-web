"use client";

import { motion } from "framer-motion";
import { Check, Lock, Info } from "lucide-react";
import Folio from "@/components/ui/Folio";

const ROWS = [
  { label: "Crear cotizaciones", free: "Con límite semanal", pro: "Ilimitadas" },
  { label: "Clientes ilimitados", free: true, pro: true },
  { label: "Catálogo de productos", free: true, pro: true },
  { label: "Exportar PDF y JPG", free: true, pro: true },
  { label: "Formatos de cotización", free: "Básicos", pro: "Los 5" },
  { label: "Historial de versiones", free: true, pro: true },
  { label: "Módulo de Cobros", free: false, pro: true },
  { label: "KPI de cobros en Inicio", free: false, pro: true },
  { label: "Estado de cuenta por cliente", free: false, pro: true },
  { label: "Respaldo de base de datos", free: false, pro: true },
  { label: "Restauración de datos", free: false, pro: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-brand-green" strokeWidth={2} />;
  if (value === false)
    return <Lock className="mx-auto h-3.5 w-3.5 text-ink/25" strokeWidth={2} />;
  return <span className="font-body text-xs font-semibold text-ink/70">{value}</span>;
}

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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-9 max-w-2xl overflow-x-auto rounded-md border border-dashed border-ink/20 bg-white shadow-[3px_3px_0_0_rgba(17,24,39,0.05)]"
      >
        <table className="w-full min-w-[420px] border-collapse">
          <thead>
            <tr className="border-b border-dashed border-ink/20">
              <th className="px-4 py-3 text-left font-ticket text-[10px] uppercase tracking-widest text-ink/40">
                Característica
              </th>
              <th className="px-3 py-3 text-center font-ticket text-[10px] uppercase tracking-widest text-ink/40">
                Gratis
              </th>
              <th className="px-3 py-3 text-center font-ticket text-[10px] uppercase tracking-widest text-brand-blue">
                Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-dashed border-ink/10 last:border-none">
                <td className="px-4 py-3 font-body text-sm text-ink/80">{row.label}</td>
                <td className="px-3 py-3 text-center">
                  <Cell value={row.free} />
                </td>
                <td className="px-3 py-3 text-center">
                  <Cell value={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

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
