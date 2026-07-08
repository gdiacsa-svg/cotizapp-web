"use client";

import { motion } from "framer-motion";
import Stamp from "@/components/ui/Stamp";

export default function FinalCta() {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl"
        >
          No dejes que se te vaya la próxima venta
        </motion.h2>
        <p className="mt-4 max-w-md font-body text-base text-white/60">
          Descarga CotizApp gratis y empieza a cotizar más rápido hoy mismo.
        </p>

        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-body text-base font-bold text-ink shadow-lg transition-transform hover:scale-105"
          >
            Descargar en Google Play
          </a>
          <Stamp text="Gratis" subtext="Descárgala hoy" color="green" rotate={-8} />
        </div>
      </div>
    </section>
  );
}
