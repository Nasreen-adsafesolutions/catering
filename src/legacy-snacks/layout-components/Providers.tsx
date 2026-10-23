"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

/**
 * Scrolling is native browser scrolling (no JS smooth-scroll library) — it's
 * cheaper, already smooth by default, and never fights the compositor while
 * the page is being scrolled. `reducedMotion="user"` makes every Framer
 * Motion animation on the site respect prefers-reduced-motion automatically.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
