"use client";

import { motion } from "framer-motion";
import Folio from "@/components/ui/Folio";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function TutorialHero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Folio number="T-01" />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-4 max-w-2xl font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl"
        >
          Manual de uso, <span className="text-brand-blue">a tu ritmo</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 max-w-lg font-body text-base text-ink/65 sm:text-lg"
        >
          Diez paradas cortas para dominar CotizApp: desde instalar la app
          hasta llevar tu contabilidad con clientes. Explora la app funcionando
          en cada sección, no capturas de pantalla.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => scrollToSection(TUTORIAL_SECTIONS[0].id)}
            className="rounded-full bg-brand-blue px-7 py-3.5 font-body text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:scale-105"
          >
            Empezar el recorrido
          </button>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink/15 px-7 py-3.5 font-body text-sm font-bold text-ink transition-colors hover:border-ink/30"
          >
            Descargar app
          </a>
        </motion.div>
      </div>
    </section>
  );
}
