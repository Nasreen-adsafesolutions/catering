"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
