"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddToCartButton({ product, qty = 1, className, size = "md" }: { product: Product; qty?: number; className?: string; size?: "md" | "lg" }) {
  const { addProduct, setOpen } = useCart();
  const { push } = useToast();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onClick = () => {
    addProduct(product, qty);
    push(`${qty > 1 ? `${qty} × ` : ""}${product.name} added`, { label: "View bag", onClick: () => setOpen(true) });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      className={cn(
        "group/add relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-choc font-semibold text-cream transition-colors duration-300 hover:bg-orange",
        size === "lg" ? "h-14 px-9 text-base" : "h-11 px-5 text-sm",
        added && "!bg-orange !text-cream",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
            <motion.svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <motion.path d="M5 12.5l4.5 4.5L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
            </motion.svg>
            Added
          </motion.span>
        ) : (
          <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="transition-transform duration-500 group-hover/add:rotate-90" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
            Add to cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
