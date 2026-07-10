"use client";

import { motion } from "framer-motion";
import { Check, Lock, Sparkles } from "lucide-react";
import Folio from "@/components/ui/Folio";

const INCLUDED = [
  "Cotizaciones ilimitadas",
  "Los 5 formatos de cotización",
  "Módulo de Cobros completo",
  "KPI de cobros en Inicio",
  "Estado de cuenta por cliente",
];

export default function PlanesTrial() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Folio number="02" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          Tu boleto de prueba
        </h2>
        <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
          Al instalar la app entras con acceso Pro completo, temporalmente.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-9 grid overflow-hidden rounded-md border border-dashed border-ink/20 bg-white shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] sm:grid-cols-[1fr_auto_1fr]"
        >
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-blue" strokeWidth={2} />
              <span className="font-ticket text-[10px] uppercase tracking-widest text-brand-blue">
                Incluye durante el trial
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-dashed border-ink/20 sm:border-t-0 sm:border-l" />

          <div className="bg-paper/60 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-ink/40" strokeWidth={2} />
              <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/40">
                Única excepción
              </span>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink/70">
              El <span className="font-semibold text-ink">respaldo de base de datos</span> no
              está disponible en el trial — requiere una suscripción Pro
              pagada activa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
