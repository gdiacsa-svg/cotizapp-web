"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TicketCardProps = {
  folio: string;
  icon?: ReactNode;
  media?: ReactNode;
  title: string;
  description?: string;
  rotateClass?: string;
  tone?: "white" | "paper";
  className?: string;
  delay?: number;
  children?: ReactNode;
};

export default function TicketCard({
  folio,
  icon,
  media,
  title,
  description,
  rotateClass = "",
  tone = "white",
  className = "",
  delay = 0,
  children,
}: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      whileHover={{ y: -4, rotate: 0 }}
      className={`relative self-start overflow-hidden rounded-md border border-dashed border-ink/20 ${
        tone === "paper" ? "bg-paper" : "bg-white"
      } p-6 shadow-[3px_3px_0_0_rgba(17,24,39,0.05)] ${rotateClass} ${className}`}
    >
      {media && <div className="-mx-6 -mt-6 mb-5">{media}</div>}
      <span className="font-ticket text-[10px] uppercase tracking-widest text-ink/35">
        N.º {folio}
      </span>
      {icon && <div className="mt-3 text-brand-blue">{icon}</div>}
      <h3 className="mt-3 font-heading text-lg font-bold text-ink">{title}</h3>
      {description && (
        <p className="mt-2 font-body text-sm leading-relaxed text-ink/65">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}
