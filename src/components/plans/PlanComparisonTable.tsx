"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

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

export default function PlanComparisonTable({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`overflow-x-auto rounded-md border border-dashed border-ink/20 bg-white shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] ${className}`}
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
  );
}
