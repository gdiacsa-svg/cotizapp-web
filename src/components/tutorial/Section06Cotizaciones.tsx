"use client";

import { motion } from "framer-motion";
import { History, CalendarClock } from "lucide-react";
import Folio from "@/components/ui/Folio";
import TutorialStep from "./TutorialStep";
import CotizacionShowcase from "@/components/showcases/CotizacionShowcase";
import PdfShareShowcase from "@/components/showcases/PdfShareShowcase";

const STEPS = [
  { title: "Selecciona el cliente", body: "De tu directorio o creado al vuelo." },
  { title: "Agrega productos y servicios", body: "Directo de tu catálogo." },
  { title: "Ajusta cada concepto", body: "Cantidad, precio o nombre, sin afectar el catálogo." },
  { title: "Revisa los totales", body: "Subtotal, descuento, IVA y total se calculan solos." },
  { title: "Agrega notas y vigencia", body: "Notas, vigencia y tipo de servicio." },
  { title: "Guarda y comparte", body: "Como PDF o imagen, directo a WhatsApp." },
];

const FORMULA = [
  { label: "Subtotal", value: "Σ (precio × cantidad)" },
  { label: "Descuento", value: "Subtotal × %" },
  { label: "Base IVA", value: "Subtotal − Descuento" },
  { label: "IVA", value: "Base IVA × %" },
  { label: "TOTAL", value: "Base IVA + IVA", strong: true },
];

const ACTIONS = ["Editar", "Cambiar estado", "Vista previa PDF", "Exportar PDF", "Exportar imagen JPG", "Compartir"];

const FORMATS = ["Carta clásico", "Carta alternativo", "Ampliado / detallado", "Carta compacto", "Reel / Story vertical"];

export default function Section06Cotizaciones() {
  return (
    <section id="cotizaciones" className="scroll-mt-32 py-14 sm:py-16">
      <Folio number="06" />
      <h2 className="mt-4 max-w-xl font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
        Crear y gestionar cotizaciones
      </h2>
      <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
        El corazón de la app: de cliente vacío a PDF compartido por WhatsApp.
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper lg:sticky lg:top-28"
        >
          <CotizacionShowcase />
        </motion.div>

        <div className="max-w-xl">
          {STEPS.map((step, i) => (
            <TutorialStep
              key={step.title}
              number={String(i + 1).padStart(2, "0")}
              title={step.title}
              delay={i * 0.05}
              last={i === STEPS.length - 1}
            >
              {step.body}
            </TutorialStep>
          ))}
        </div>
      </div>

      {/* totals formula, receipt-tape style */}
      <div className="mt-12 max-w-md">
        <p className="font-ticket text-xs uppercase tracking-widest text-ink/40">Cómo se calcula el total</p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mt-3 rounded-md border border-dashed border-ink/20 bg-white p-5 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)]"
        >
          {FORMULA.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-2 font-ticket text-xs sm:text-sm ${
                i < FORMULA.length - 1 ? "border-b border-dashed border-ink/15" : "pt-3"
              } ${row.strong ? "text-ink font-bold" : "text-ink/60"}`}
            >
              <span className="uppercase tracking-wide">{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* export & share */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="font-ticket text-xs uppercase tracking-widest text-ink/40">Acciones disponibles</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ACTIONS.map((a) => (
              <span key={a} className="rounded-full border border-ink/15 bg-white px-3 py-1.5 font-body text-xs font-semibold text-ink/70">
                {a}
              </span>
            ))}
          </div>

          <p className="mt-6 font-ticket text-xs uppercase tracking-widest text-ink/40">5 formatos disponibles</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <span key={f} className="rounded-full border border-dashed border-ink/20 bg-paper px-3 py-1.5 font-body text-xs font-semibold text-ink/70">
                {f}
              </span>
            ))}
          </div>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-start gap-3">
              <History className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
              <span className="font-body text-sm text-ink/70">Cada edición genera una nueva versión — historial completo</span>
            </div>
            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={1.75} />
              <span className="font-body text-sm text-ink/70">El plan gratuito tiene un límite semanal de cotizaciones (reinicia lunes)</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="order-1 overflow-hidden rounded-md border border-dashed border-ink/20 bg-paper lg:order-2"
        >
          <PdfShareShowcase />
        </motion.div>
      </div>
    </section>
  );
}
