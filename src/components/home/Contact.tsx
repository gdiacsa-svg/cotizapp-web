"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import Folio from "@/components/ui/Folio";
import Stamp from "@/components/ui/Stamp";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""
    );

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="008" />
        <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          ¿Tienes dudas? Escríbenos
        </h2>
        <p className="mt-4 max-w-md font-body text-base text-ink/65">
          Mándanos un mensaje y te respondemos directo, sin vueltas.
        </p>

        <div className="relative mt-10 rounded-md border border-dashed border-ink/20 bg-paper p-6 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] sm:p-8">
          <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/35">
            N.º 012 — Contacto
          </span>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <Stamp
                text="Mensaje enviado"
                subtext="CotizApp"
                color="green"
                rotate={-6}
              />
              <p className="font-body text-sm text-ink/65">
                Gracias por escribirnos — te respondemos lo antes posible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="font-body text-sm font-semibold text-brand-blue hover:underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                type="hidden"
                name="subject"
                value="Nuevo mensaje desde cotizapp.com.mx"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-body text-xs font-semibold uppercase tracking-wide text-ink/50"
                >
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-body text-xs font-semibold uppercase tracking-wide text-ink/50"
                >
                  Correo o teléfono
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="text"
                  required
                  className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  placeholder="tucorreo@ejemplo.com o tu número"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-body text-xs font-semibold uppercase tracking-wide text-ink/50"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  placeholder="Cuéntanos qué necesitas..."
                />
              </div>

              {status === "error" && (
                <p className="rounded-md bg-red-50 px-3.5 py-2.5 font-body text-sm text-red-700">
                  Algo salió mal enviando tu mensaje. Intenta de nuevo en un
                  momento.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-body text-sm font-bold text-white transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "loading" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
