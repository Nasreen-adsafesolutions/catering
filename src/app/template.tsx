"use client";

import { motion } from "framer-motion";

/** Re-mounts on navigation → gentle page-enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}>
      {children}
    </motion.div>
  );
}
