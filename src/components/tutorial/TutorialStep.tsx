"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TutorialStepProps = {
  number: string;
  title: string;
  children: ReactNode;
  delay?: number;
  last?: boolean;
};

export default function TutorialStep({
  number,
  title,
  children,
  delay = 0,
  last = false,
}: TutorialStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={`flex gap-4 pb-6 ${!last ? "border-b border-dashed border-ink/20" : ""}`}
    >
      <span className="shrink-0 font-ticket text-3xl font-semibold leading-none text-brand-blue sm:text-4xl">
        {number}
      </span>
      <div className="pt-0.5">
        <h3 className="font-heading text-base font-bold text-ink sm:text-lg">
          {title}
        </h3>
        <div className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
