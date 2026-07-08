"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Folio from "@/components/ui/Folio";
import Stamp from "@/components/ui/Stamp";

const FREE_ITEMS = [
  "Cotizaciones semanales limitadas",
  "Exportación en PDF y JPG",
  "Catálogo básico de productos",
];

const PRO_ITEMS = [
  "Cotizaciones ilimitadas",
  "Marca personalizada (logo y colores)",
  "Catálogo de productos sin límite",
  "Soporte prioritario",
];

export default function Pricing() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="005" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Planes
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-md border border-dashed border-ink/20 bg-white p-8 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] md:-rotate-1"
          >
            <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/35">
              N.º 012 — Gratis
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
              N.º 013 — Pro
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-extrabold text-ink">$99</span>
              <span className="font-body text-sm text-ink/50">/ mes</span>
            </div>
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

        <p className="mt-8 text-center">
          <Link href="/planes" className="font-body text-sm font-semibold text-brand-blue hover:underline">
            Ver comparación completa de planes →
          </Link>
        </p>
      </div>
    </section>
  );
}
