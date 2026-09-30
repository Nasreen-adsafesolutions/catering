"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

/** Sticky thumb-reach cart shortcut on small screens. */
export function MobileCartBar() {
  const { count, subtotal, open, setOpen } = useCart();
  return (
    <AnimatePresence>
      {count > 0 && !open && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          onClick={() => setOpen(true)}
          className="fixed inset-x-4 bottom-4 z-40 flex h-14 items-center justify-between rounded-xl bg-orange px-5 font-semibold text-cream shadow-xl shadow-choc/30 md:hidden"
        >
          <span className="flex items-center gap-3">
            <motion.span key={count} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="grid h-7 min-w-7 place-items-center rounded-full bg-cream px-1.5 text-sm font-bold text-orange">{count}</motion.span>
            View bag
          </span>
          <span>{formatPrice(subtotal)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
