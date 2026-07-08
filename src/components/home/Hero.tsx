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
            className="relative z-10 rounded-md border border-dashed border-ink/20 bg-white p-6 pb-16 shadow-[6px_6px_0_0_rgba(17,24,39,0.08)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/40">
                Cotización N.º 014
              </span>
              <span className="h-2 w-2 rounded-full bg-brand-green" />
            </div>
            <p className="mt-4 font-body text-sm font-semibold text-ink/80">
              Instalación eléctrica
            </p>
            <div className="mt-4 space-y-2 border-t border-dashed border-ink/15 pt-4">
              <div className="flex justify-between font-body text-xs text-ink/50">
                <span>Cable + accesorios</span>
                <span>$1,200</span>
              </div>
              <div className="flex justify-between font-body text-xs text-ink/50">
                <span>Mano de obra</span>
                <span>$800</span>
              </div>
            </div>
            <div className="mt-4 border-t border-ink/15 pt-4">
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/40">
                Enviada en
              </span>
              <Stopwatch className="mt-1 block text-2xl font-semibold sm:text-3xl" />
            </div>
          </motion.div>

          <div className="absolute -bottom-8 -right-4 z-20 sm:-bottom-10 sm:-right-8">
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
