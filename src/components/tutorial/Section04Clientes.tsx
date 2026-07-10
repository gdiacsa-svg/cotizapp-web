"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Phone, Sparkles } from "lucide-react";
import Folio from "@/components/ui/Folio";
import ClientesShowcase from "@/components/showcases/ClientesShowcase";

const POINTS = [
  { icon: UserPlus, text: "Solo el nombre es obligatorio — teléfono, correo, dirección y notas son opcionales" },
  { icon: Search, text: "Buscador rápido por nombre" },
  { icon: Phone, text: "Importa el contacto directo desde tu celular" },
  { icon: Sparkles, text: "Crea un cliente nuevo al vuelo desde el propio formulario de cotización" },
];

export default function Section04Clientes() {
  return (
    <section id="clientes" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="04" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Clientes
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Tu directorio de contactos, listo para reutilizar en cada cotización.
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="space-y-2.5">
            {POINTS.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
                <span className="font-body text-sm text-ink/70">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="order-1 overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper lg:order-2"
        >
          <ClientesShowcase />
        </motion.div>
      </div>
    </section>
  );
}
