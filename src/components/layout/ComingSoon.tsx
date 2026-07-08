import Link from "next/link";

export default function ComingSoon({
  folio,
  title,
}: {
  folio: string;
  title: string;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span className="font-ticket text-xs uppercase tracking-widest text-ink/40">
        Folio {folio}
      </span>
      <h1 className="mt-3 font-heading text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 font-body text-base text-ink/60">
        Esta página está en construcción. Muy pronto vas a poder verla completa.
      </p>
      <div className="perforation mt-8 w-full max-w-xs" />
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-blue px-6 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
