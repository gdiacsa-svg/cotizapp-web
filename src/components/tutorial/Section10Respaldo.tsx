"use client";

import { motion } from "framer-motion";
import { DatabaseBackup, Upload, Download, Info } from "lucide-react";
import Folio from "@/components/ui/Folio";
import { ProLock } from "./StatusPill";

const CARDS = [
  {
    icon: Download,
    title: "Exportar",
    path: "Perfil → Respaldo → Exportar Base de Datos",
    body: "Se guarda cotizapp_backup.db en tu carpeta de Descargas. Te conviene subirlo a la nube.",
  },
  {
    icon: Upload,
    title: "Importar",
    path: "Perfil → Respaldo → Importar Base de Datos",
    body: "Selecciona el archivo .db y se restauran tus clientes, productos y cotizaciones.",
  },
];

export default function Section10Respaldo() {
  return (
    <section id="respaldo" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="10" />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          Respaldo y restauración
        </h2>
        <ProLock />
      </div>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        Solo con Pro pagado — no está incluido en el periodo de prueba.
      </p>

      <div className="mt-9 grid max-w-2xl gap-5 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-md border border-dashed border-ink/20 bg-white p-6 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)]"
          >
            <card.icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
            <h3 className="mt-3 font-heading text-lg font-bold text-ink">{card.title}</h3>
            <p className="mt-2 font-ticket text-[11px] leading-relaxed text-ink/45">{card.path}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">{card.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="mt-5 flex max-w-2xl items-start gap-3 rounded-md border border-dashed border-brand-blue/40 bg-brand-blue/5 px-4 py-3.5"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
        <p className="font-body text-sm text-ink/70">
          Respalda antes de cambiar de teléfono o reinstalar la app —{" "}
          <DatabaseBackup className="mb-0.5 inline h-3.5 w-3.5 text-brand-blue" strokeWidth={2} /> es tu
          seguro contra perder clientes, productos y cotizaciones.
        </p>
      </motion.div>
    </section>
  );
}
