"use client";

import Folio from "@/components/ui/Folio";
import PlanComparisonTable from "@/components/plans/PlanComparisonTable";

export default function PlanesComparison() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Folio number="03" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          La comparación completa
        </h2>
        <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink/65 sm:text-base">
          Todo lo que cambia entre planes, en un solo recibo.
        </p>

        <PlanComparisonTable className="mt-9 max-w-2xl" />
      </div>
    </section>
  );
}
