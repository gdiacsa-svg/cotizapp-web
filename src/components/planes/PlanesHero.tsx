"use client";

import { motion } from "framer-motion";
import Folio from "@/components/ui/Folio";

export default function PlanesHero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <Folio number="P-01" />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-4 max-w-2xl font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl"
        >
          Elige cómo <span className="text-brand-blue">cotizar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mx-auto mt-5 max-w-md font-body text-base text-ink/65 sm:text-lg"
        >
          Empieza gratis. Cuando tu negocio crezca, Pro te espera —
          sin contratos ni letras chiquitas.
        </motion.p>
        <div className="mt-8">
          <p className="font-body text-sm text-ink/60">Disponible en:</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://apps.apple.com/mx/app/id6802864250"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/App_Store.png"
                alt="Descárgalo en App Store"
                className="h-12 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.diacsa.cotizapppro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/GooglePlay.png"
                alt="Disponible en Google Play"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
