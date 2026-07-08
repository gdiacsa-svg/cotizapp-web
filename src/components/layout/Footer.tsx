import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-heading text-lg font-extrabold uppercase tracking-tight text-white">
              Cotiz<span className="text-brand-yellow">App</span>
            </span>
            <p className="mt-2 max-w-xs font-body text-sm">
              El que cotiza primero, gana la venta.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-ticket text-xs uppercase tracking-widest text-white/40">
                Navegación
              </span>
              <Link href="/" className="font-body text-sm hover:text-white">
                Inicio
              </Link>
              <Link href="/planes" className="font-body text-sm hover:text-white">
                Planes
              </Link>
              <Link href="/tutorial" className="font-body text-sm hover:text-white">
                Tutorial
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 font-ticket text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} CotizApp. Hecho en México.</span>
          <span>cotizapp.com.mx</span>
        </div>
      </div>
    </footer>
  );
}
