"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Stamp from "@/components/ui/Stamp";

type Billing = "mensual" | "anual";

const FREE_ITEMS = [
  "Cotizaciones con límite semanal",
  "Clientes ilimitados",
  "Catálogo de productos",
  "Exportar PDF y JPG",
  "Formatos básicos",
  "Historial de versiones",
];

const PRO_ITEMS = [
  "Cotizaciones ilimitadas",
  "Los 5 formatos de cotización",
  "Módulo de Cobros completo",
  "KPI de cobros en Inicio",
  "Estado de cuenta por cliente",
  "Respaldo y restauración de base de datos",
];

const PRICE = {
  mensual: { amount: "$69", suffix: "/ mes", sub: null as string | null },
  anual: { amount: "$599", suffix: "/ año", sub: "≈ $49.92/mes" },
};

export default function PlanesPricingCards() {
  const [billing, setBilling] = useState<Billing>("mensual");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-paper p-1">
            {(["mensual", "anual"] as Billing[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBilling(b)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2 font-body text-sm font-bold transition-colors ${
                  billing === b ? "bg-brand-blue text-white" : "text-ink/60 hover:text-ink"
                }`}
              >
                {b === "mensual" ? "Mensual" : "Anual"}
                {b === "anual" && (
                  <span
                    className={`rounded-full px-2 py-0.5 font-ticket text-[10px] font-semibold uppercase tracking-wide ${
                      billing === "anual" ? "bg-white/20 text-white" : "bg-brand-green/15 text-brand-green"
                    }`}
                  >
                    Ahorra $229
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-md border border-dashed border-ink/20 bg-white p-8 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] md:-rotate-1"
          >
            <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/35">
              N.º 01 — Gratis
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-extrabold text-ink">$0</span>
              <span className="font-body text-sm text-ink/50">/ siempre</span>
            </div>
            <ul className="mt-6 space-y-3">
              {FREE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full border-2 border-ink/15 px-6 py-3 text-center font-body text-sm font-bold text-ink transition-colors hover:border-ink/30"
            >
              Empezar gratis
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-md border border-dashed border-brand-blue/40 bg-white p-8 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] md:rotate-1"
          >
            <div className="absolute -right-3 -top-3 sm:-right-5 sm:-top-5">
              <Stamp text="Más popular" color="blue" rotate={8} />
            </div>
            <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/35">
              N.º 02 — Pro
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={billing}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-3"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-extrabold text-ink">
                    {PRICE[billing].amount}
                  </span>
                  <span className="font-body text-sm text-ink/50">{PRICE[billing].suffix}</span>
                </div>
                {PRICE[billing].sub && (
                  <p className="mt-1 font-body text-xs text-ink/45">{PRICE[billing].sub}</p>
                )}
              </motion.div>
            </AnimatePresence>

            <ul className="mt-6 space-y-3">
              {PRO_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full bg-brand-blue px-6 py-3 text-center font-body text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:scale-105"
            >
              Probar Pro
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
