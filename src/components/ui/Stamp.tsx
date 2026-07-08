"use client";

import { motion } from "framer-motion";

type StampProps = {
  text: string;
  subtext?: string;
  color?: "green" | "blue";
  rotate?: number;
  className?: string;
};

export default function Stamp({
  text,
  subtext,
  color = "green",
  rotate = -8,
  className = "",
}: StampProps) {
  const colorClass =
    color === "green"
      ? "text-brand-green border-brand-green"
      : "text-brand-blue border-brand-blue";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.7, rotate: rotate * 2.2 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 240, damping: 13, delay: 0.2 }}
      className={`pointer-events-none inline-flex select-none flex-col items-center justify-center rounded-full border-[3px] px-4 py-3 sm:px-5 sm:py-4 ${colorClass} ${className}`}
    >
      <div className="flex flex-col items-center justify-center rounded-full border border-current/40 px-3 py-2 text-center">
        <span className="font-heading text-[13px] font-extrabold uppercase leading-tight tracking-wide sm:text-base">
          {text}
        </span>
        {subtext && (
          <span className="mt-0.5 font-ticket text-[9px] uppercase tracking-widest opacity-70 sm:text-[10px]">
            {subtext}
          </span>
        )}
      </div>
    </motion.div>
  );
}
