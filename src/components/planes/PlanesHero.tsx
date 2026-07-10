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
      </div>
    </section>
  );
}
