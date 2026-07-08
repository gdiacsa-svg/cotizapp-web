"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Hammer,
  PaintRoller,
  Plug,
  Handshake,
  Briefcase,
} from "lucide-react";
import Folio from "@/components/ui/Folio";

const AUDIENCE = [
  { icon: Wrench, label: "Plomeros" },
  { icon: Hammer, label: "Carpinteros" },
  { icon: PaintRoller, label: "Pintores" },
  { icon: Plug, label: "Instaladores" },
  { icon: Handshake, label: "Vendedores" },
  { icon: Briefcase, label: "Freelancers" },
];

export default function Audience() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="006" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          Para quién es CotizApp
        </h2>
        <p className="mt-4 max-w-xl font-body text-base text-ink/65">
          Para la gente que trabaja con las manos y no tiene tiempo de armar
          cotizaciones en la computadora.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          {AUDIENCE.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2.5 rounded-md border border-dashed border-ink/20 bg-paper px-5 py-3"
            >
              <item.icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
              <span className="font-body text-sm font-semibold text-ink/80">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
