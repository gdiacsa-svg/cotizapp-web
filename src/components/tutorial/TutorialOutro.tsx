"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Stamp from "@/components/ui/Stamp";

export default function TutorialOutro() {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl"
        >
          Fin del recorrido
        </motion.h2>
        <p className="mt-4 max-w-sm font-body text-base text-white/60">
          Ya conoces CotizApp de arriba a abajo. Ahora solo falta que la uses.
        </p>

        <div className="mt-9 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-body text-sm font-bold text-ink shadow-lg transition-transform hover:scale-105"
            >
              Descargar en Google Play
            </a>
            <Link
              href="/planes"
              className="inline-flex items-center gap-3 rounded-full border-2 border-white/20 px-7 py-3.5 font-body text-sm font-bold text-white transition-colors hover:border-white/40"
            >
              Ver planes
            </Link>
          </div>
          <Stamp text="Ya sabes cómo" subtext="CotizApp" color="green" rotate={-8} />
        </div>
      </div>
    </section>
  );
}
