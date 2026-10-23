"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";

export function SearchDialog({ open, onClose, products }: { open: boolean; onClose: () => void; products: Product[] }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => input.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.filter((p) => p.featured).slice(0, 4);
    return products.filter((p) => [p.name, p.category, p.tagline, ...p.ingredients, ...p.moods].join(" ").toLowerCase().includes(s)).slice(0, 6);
  }, [q, products]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Close search" onClick={onClose} className="absolute inset-0 cursor-default bg-choc/70 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search snacks"
            initial={{ y: -24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-cream shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-choc/10 px-5">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search chips, popcorn, spicy…" aria-label="Search snacks" className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-choc/40" />
              <kbd className="hidden rounded border border-choc/20 px-1.5 py-0.5 text-[11px] text-choc/50 sm:block">ESC</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-choc/50">{q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular right now"}</p>
              {results.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <p className="font-serif text-2xl italic">No crumbs found.</p>
                  <p className="mt-1 text-sm text-choc/60">Try “spicy”, “popcorn” or “chocolate”.</p>
                </div>
              ) : (
                <ul>
                  {results.map((p, i) => (
                    <motion.li key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link href={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-cream-2">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                          <SnackImage src={p.image} alt="" art={p.art} sizes="56px" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold">{p.name}</span>
                          <span className="block truncate text-sm text-choc/60">{p.category} · {p.weight}</span>
                        </span>
                        <span className="font-semibold">{formatPrice(p.price)}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
