"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { FoodCartProvider } from "./FoodCart";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <FoodCartProvider>{children}</FoodCartProvider>
    </MotionConfig>
  );
}
