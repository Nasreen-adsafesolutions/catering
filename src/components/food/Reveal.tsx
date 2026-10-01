"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Subtle fade + rise when scrolled into view. One-shot, transform/opacity only. */
export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.1, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
