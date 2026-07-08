"use client";

import { motion } from "framer-motion";
import Folio from "@/components/ui/Folio";

const STEPS = [
  {
    number: "01",
    title: "Elige productos",
    description: "Selecciona lo que vas a cotizar desde tu catálogo.",
  },
  {
    number: "02",
    title: "Genera tu cotización",
    description: "Se arma sola, con tu marca, precios y datos del cliente.",
  },
  {
    number: "03",
    title: "Envíala al instante",
    description: "Como PDF o JPG, lista para mandar por WhatsApp.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="004" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Cómo funciona
        </h2>

        <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-6">
          <div
            className="perforation absolute left-0 right-0 top-6 hidden sm:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-white sm:pr-6"
            >
              <span className="font-ticket text-4xl font-semibold text-brand-blue sm:bg-white sm:pr-4">
                {step.number}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
