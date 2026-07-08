"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Folio from "@/components/ui/Folio";
import Stamp from "@/components/ui/Stamp";
import Stopwatch from "@/components/ui/Stopwatch";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <Folio number="001" />
          <h1 className="mt-4 font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            El que cotiza <span className="text-brand-blue">primero</span>,
            <br /> gana la venta
          </h1>
          <p className="mt-6 max-w-md font-body text-lg text-ink/70">
            Genera cotizaciones profesionales desde tu celular en minutos.
            Mientras piensas la tuya, tu competencia ya mandó la suya — no
            dejes que se te vaya el cliente.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-blue px-7 py-3.5 font-body text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:scale-105"
            >
              Descargar gratis
            </a>
            <Link
              href="/planes"
              className="rounded-full border-2 border-ink/15 px-7 py-3.5 font-body text-sm font-bold text-ink transition-colors hover:border-ink/30"
            >
              Ver planes
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm py-6 lg:mx-0 lg:justify-self-end">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="absolute -right-2 top-6 w-48 rotate-6 rounded-md border border-dashed border-ink/15 bg-white/70 p-4 grayscale sm:-right-6"
          >
            <span className="font-ticket text-[9px] uppercase tracking-widest text-ink/40">
              Cotización competencia
            </span>
            <p className="mt-3 font-ticket text-xl font-semibold text-ink/50">
              2 días
            </p>
            <p className="mt-1 font-body text-xs text-ink/40">enviada tarde</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 overflow-hidden rounded-md bg-white pb-4 shadow-[6px_6px_0_0_rgba(17,24,39,0.08)]"
          >
            <div className="flex items-start justify-between gap-3 bg-brand-blue px-4 py-3">
              <div>
                <span className="block font-ticket text-[9px] uppercase tracking-wide text-white/90">
                  Folio: COT-0142
                </span>
                <span className="mt-1 block font-body text-[9px] text-white/60">
                  12/03/2026
                </span>
              </div>
              <div className="text-right">
                <span className="block font-heading text-[11px] font-bold uppercase leading-tight text-white">
                  Instalaciones López
                </span>
                <span className="mt-1 flex items-center justify-end gap-1 font-body text-[8px] uppercase tracking-wide text-white/60">
                  Generada en
                  <Stopwatch className="text-[11px] font-semibold text-white" />
                </span>
              </div>
            </div>

            <div className="px-4 pt-3.5">
              <p className="font-heading text-base font-bold leading-tight text-ink">
                Roberto Martínez
              </p>
              <p className="mt-0.5 font-body text-[11px] text-ink/50">
                55 4821 0036
              </p>

              <div className="mt-3.5">
                <div className="grid grid-cols-[24px_1fr_40px_46px] gap-x-1 border-b border-ink/10 pb-1.5 font-body text-[8px] font-semibold uppercase tracking-wide text-ink/40">
                  <span>Cant</span>
                  <span>Descripción</span>
                  <span className="text-right">Precio</span>
                  <span className="text-right">Importe</span>
                </div>
                <div className="grid grid-cols-[24px_1fr_40px_46px] gap-x-1 border-b border-ink/10 py-1.5 font-body text-[10px] text-ink/70">
                  <span>1</span>
                  <span className="truncate">Instalación eléctrica</span>
                  <span className="text-right font-ticket text-[9px]">$1,200</span>
                  <span className="text-right font-ticket text-[9px] font-semibold text-ink">
                    $1,200
                  </span>
                </div>
                <div className="grid grid-cols-[24px_1fr_40px_46px] gap-x-1 py-1.5 font-body text-[10px] text-ink/70">
                  <span>1</span>
                  <span className="truncate">Mano de obra</span>
                  <span className="text-right font-ticket text-[9px]">$800</span>
                  <span className="text-right font-ticket text-[9px] font-semibold text-ink">
                    $800
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex justify-between font-body text-[10px] text-ink/50">
                  <span>Subtotal</span>
                  <span className="font-ticket">$2,000.00</span>
                </div>
                <div className="flex justify-between font-body text-[10px] text-ink/50">
                  <span>I.V.A. (16%)</span>
                  <span className="font-ticket">$320.00</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between rounded bg-brand-blue px-2.5 py-1.5">
                  <span className="font-heading text-xs font-bold uppercase text-white">
                    Total
                  </span>
                  <span className="font-ticket text-sm font-bold text-white">
                    $2,320.00
                  </span>
                </div>
              </div>

              <div className="mt-3.5 border-t border-ink/10 pt-3 pr-16">
                <p className="font-body text-[8px] leading-relaxed text-ink/40">
                  Vigencia 15 días · Garantía 30 días · Pago de contado
                </p>
                <div className="mt-3">
                  <div className="w-14 border-t border-ink/30" />
                  <span className="mt-0.5 block font-body text-[8px] uppercase tracking-wide text-ink/40">
                    Firma
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute -bottom-10 -right-4 z-20 sm:-bottom-12 sm:-right-8">
            <Stamp
              text="Ganaste la venta"
              subtext="CotizApp"
              color="green"
              rotate={-10}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
