"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Folio from "@/components/ui/Folio";

const FAQS = [
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, sin contratos ni penalizaciones. Cancelas cuando quieras desde la app.",
  },
  {
    q: "¿Qué pasa con mis datos si cancelo Pro?",
    a: "No se borran. Vuelves al plan gratis y conservas tus clientes, catálogo y cotizaciones — solo pierdes acceso a las funciones exclusivas de Pro, como Cobros y respaldo.",
  },
  {
    q: "¿El periodo de prueba requiere tarjeta?",
    a: "No. El trial se activa directo en la app, sin pedir tarjeta ni método de pago.",
  },
  {
    q: "¿Puedo cambiar de mensual a anual después?",
    a: "Sí, cuando quieras desde Perfil → Plan, en cualquier dirección.",
  },
];

export default function PlanesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Folio number="04" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          Preguntas sobre facturación
        </h2>

        <div className="mt-9 divide-y divide-dashed divide-ink/20 border-y border-dashed border-ink/20">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-ticket text-xs text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-base font-bold text-ink sm:text-lg">
                      {item.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-brand-blue"
                  >
                    <Plus className="h-5 w-5" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-8 font-body text-sm leading-relaxed text-ink/65 sm:pl-9">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
