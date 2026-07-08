"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Folio from "@/components/ui/Folio";

const FAQS = [
  {
    q: "¿CotizApp funciona sin internet?",
    a: "Sí. Puedes crear cotizaciones sin conexión en cualquier momento, desde donde estés.",
  },
  {
    q: "¿Puedo cancelar el Plan Pro cuando quiera?",
    a: "Sí, sin contratos ni penalizaciones. Cancelas cuando quieras desde la app.",
  },
  {
    q: "¿Mis datos y los de mis clientes están seguros?",
    a: "Tus cotizaciones y datos de clientes se guardan localmente en tu dispositivo.",
  },
  {
    q: "¿En qué formatos puedo exportar mis cotizaciones?",
    a: "En PDF y JPG, listas para enviar por WhatsApp o correo al instante.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="007" />
        <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 divide-y divide-dashed divide-ink/20 border-y border-dashed border-ink/20">
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
