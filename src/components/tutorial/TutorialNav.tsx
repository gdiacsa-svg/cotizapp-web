"use client";

import { useMemo } from "react";
import useScrollSpy from "@/hooks/useScrollSpy";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function TutorialNav() {
  const ids = useMemo(() => TUTORIAL_SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <>
      {/* Desktop: sticky side rail */}
      <aside className="hidden shrink-0 lg:block lg:w-56">
        <nav className="sticky top-28 flex flex-col gap-0.5 border-l border-dashed border-ink/20 pl-5">
          {TUTORIAL_SECTIONS.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`group flex items-baseline gap-2.5 py-2 text-left transition-colors ${
                  active ? "text-brand-blue" : "text-ink/45 hover:text-ink"
                }`}
              >
                <span className="font-ticket text-[11px] tabular-nums">{s.num}</span>
                <span
                  className={`font-body text-[13px] font-semibold leading-tight ${
                    active ? "" : "group-hover:text-ink"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile / tablet: sticky horizontal pill bar */}
      <div className="sticky top-[67px] z-30 -mx-4 border-b border-ink/10 bg-white/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {TUTORIAL_SECTIONS.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-body text-xs font-semibold transition-colors ${
                  active
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-ink/15 text-ink/55"
                }`}
              >
                <span className="font-ticket">{s.num}</span> {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
