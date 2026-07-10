"use client";

import { Lock } from "lucide-react";

const DOT_COLORS: Record<string, string> = {
  yellow: "bg-brand-yellow",
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  gray: "bg-ink/30",
};

export function StatusPill({
  color,
  label,
}: {
  color: "yellow" | "blue" | "green" | "gray";
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 font-ticket text-[11px] uppercase tracking-widest text-ink/70">
      <span className={`h-2 w-2 rounded-full ${DOT_COLORS[color]}`} />
      {label}
    </span>
  );
}

export function ProLock({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 bg-brand-blue/5 px-3 py-1 font-ticket text-[10px] uppercase tracking-widest text-brand-blue ${className}`}
    >
      <Lock className="h-3 w-3" strokeWidth={2} />
      Solo Pro
    </span>
  );
}
