"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function QuantityControl({ value, onChange, min = 0, max = 99, label, size = "md" }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label: string; size?: "sm" | "md" }) {
  const btn = cn("grid place-items-center rounded-full border border-choc/20 transition hover:border-orange hover:bg-orange hover:text-cream active:scale-90 disabled:opacity-30 disabled:hover:border-choc/20 disabled:hover:bg-transparent disabled:hover:text-inherit", size === "sm" ? "h-8 w-8" : "h-11 w-11");
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M5 12h14" /></svg>
      </button>
      <span className={cn("relative inline-block overflow-hidden text-center font-semibold tabular-nums", size === "sm" ? "w-6" : "w-8 text-lg")} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.18 }} className="inline-block">
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}
