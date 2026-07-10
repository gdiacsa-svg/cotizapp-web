"use client";

import { motion } from "framer-motion";
import {
  Wrench, Hammer, PaintRoller, Plug, Handshake, Briefcase,
  FileImage, Users, Activity, Wallet, FileBarChart,
} from "lucide-react";
import Folio from "@/components/ui/Folio";

const AUDIENCE = [
  { icon: Wrench, label: "Plomeros" },
  { icon: Hammer, label: "Carpinteros" },
  { icon: PaintRoller, label: "Pintores" },
  { icon: Plug, label: "Electricistas" },
  { icon: Handshake, label: "Vendedores" },
  { icon: Briefcase, label: "Freelancers" },
];

const CAPABILITIES = [
  { icon: FileImage, text: "Cotiza en PDF o imagen y comparte por WhatsApp" },
  { icon: Users, text: "Lleva tus clientes y tu catálogo de productos" },
  { icon: Activity, text: "Da seguimiento: creada, enviada, aprobada" },
  { icon: Wallet, text: "Registra cobros y saldo pendiente", pro: true },
  { icon: FileBarChart, text: "Genera estado de cuenta por cliente", pro: true },
];

export default function Section01QueEs() {
  return (
    <section id="que-es" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="01" />
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
        className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl"
      >
        ¿Qué es CotizApp?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base"
      >
        La app para crear cotizaciones profesionales en minutos, desde el
        celular y en el momento en que estás con el cliente.
      </motion.p>

      <p className="mt-9 font-ticket text-xs uppercase tracking-widest text-ink/40">
        Hecha para
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {AUDIENCE.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex items-center gap-2 rounded-md border border-dashed border-ink/20 bg-paper px-4 py-2.5"
          >
            <item.icon className="h-4 w-4 text-brand-blue" strokeWidth={1.75} />
            <span className="font-body text-sm font-semibold text-ink/80">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-9 font-ticket text-xs uppercase tracking-widest text-ink/40">
        Qué puedes hacer
      </p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {CAPABILITIES.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex items-start gap-3 rounded-md border border-ink/10 bg-white px-4 py-3"
          >
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
            <span className="font-body text-sm text-ink/70">
              {item.text}
              {item.pro && (
                <span className="ml-1.5 font-ticket text-[10px] font-semibold uppercase tracking-widest text-brand-blue">
                  Pro
                </span>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
