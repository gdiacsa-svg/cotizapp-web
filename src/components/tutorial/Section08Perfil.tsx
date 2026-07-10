"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Folio from "@/components/ui/Folio";

const ITEMS = [
  {
    q: "Plan",
    a: "Consulta tu plan actual y el estado de tu suscripción.",
  },
  {
    q: "Diseño",
    a: "La sección más importante para personalizar: logo, colores, formato de cotización y las Condiciones y Garantías que aparecen al pie de cada una — equipos incluidos, garantías, instalación, métodos de pago, vigencia por defecto y firma autorizada.",
  },
  {
    q: "Datos",
    a: "El contacto de tu empresa: teléfono, correo, dirección.",
  },
  {
    q: "Respaldo",
    a: "Exporta e importa tu base de datos. Solo disponible con Pro pagado.",
    pro: true,
  },
];

export default function Section08Perfil() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section id="perfil" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="08" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Perfil y configuración
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Cuatro secciones para dejar la app configurada como tu negocio.
      </p>

      <div className="mt-9 max-w-2xl divide-y divide-dashed divide-ink/20 border-y border-dashed border-ink/20">
        {ITEMS.map((item, i) => {
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
                  {item.pro && (
                    <span className="font-ticket text-[10px] font-semibold uppercase tracking-widest text-brand-blue">
                      Pro
                    </span>
                  )}
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
    </section>
  );
}
