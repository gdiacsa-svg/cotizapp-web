"use client";

import { motion } from "framer-motion";
import { Package, Wrench, Layers, Lightbulb } from "lucide-react";
import Folio from "@/components/ui/Folio";
import ProductosShowcase from "@/components/showcases/ProductosShowcase";

const TYPES = [
  { icon: Package, name: "Pieza", desc: "Artículos físicos: fusible, cable, válvula...", color: "text-brand-blue" },
  { icon: Wrench, name: "Servicio", desc: "Mano de obra: instalación, mantenimiento...", color: "text-brand-green" },
  { icon: Layers, name: "Kit", desc: "Un conjunto de conceptos con precio único", color: "text-[#9B4FC4]" },
];

export default function Section05Productos() {
  return (
    <section id="productos" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="05" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Productos y servicios
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Tu catálogo de conceptos, listo para arrastrar a cualquier cotización.
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper"
        >
          <ProductosShowcase />
        </motion.div>

        <div>
          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            {TYPES.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-md border border-ink/10 bg-white px-4 py-3"
              >
                <t.icon className={`mt-0.5 h-4 w-4 shrink-0 ${t.color}`} strokeWidth={1.75} />
                <div>
                  <p className="font-heading text-sm font-bold text-ink">{t.name}</p>
                  <p className="mt-0.5 font-body text-xs text-ink/60">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="mt-5 flex items-start gap-3 rounded-md border border-dashed border-brand-blue/40 bg-brand-blue/5 px-4 py-3.5"
          >
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
            <p className="font-body text-sm text-ink/70">
              Arma tu catálogo antes de cotizar — te ahorra tiempo. Puedes
              ajustar precios por cotización sin tocar el catálogo original.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
