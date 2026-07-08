"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import Folio from "@/components/ui/Folio";
import Stamp from "@/components/ui/Stamp";
import TicketCard from "@/components/ui/TicketCard";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 font-body text-sm text-ink placeholder:text-ink/30 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

const labelClass =
  "block font-body text-xs font-semibold uppercase tracking-wide text-ink/50";

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
    <section id="contacto" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24">
        <Folio number="008" />
        <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          ¿Tienes dudas? Escríbenos
        </h2>

        <div className="mt-10">
          <TicketCard
            folio="014"
            tone="paper"
            title={
              status === "success" ? "Mensaje recibido" : "Mándanos un mensaje"
            }
            description={
              status === "success"
                ? undefined
                : "Te respondemos directo, sin vueltas."
            }
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
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
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Nombre
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Correo o teléfono
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="text"
                      required
                      className={inputClass}
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className={inputClass}
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
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-body text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === "loading" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </TicketCard>
        </div>
      </div>
    </section>
  );
}
