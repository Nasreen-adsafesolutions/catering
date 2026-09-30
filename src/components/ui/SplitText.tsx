"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** animate on mount (hero) instead of when scrolled into view */
  immediate?: boolean;
  /** opt into a richer word-by-word masked reveal, for the odd headline that deserves the flourish */
  words?: boolean;
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const word: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } },
};

/**
 * Simple fade-up reveal for a heading by default — animates as one block
 * rather than word-by-word, which keeps things light when a page has many
 * of these in view. Pass `words` to opt a specific headline into the richer
 * per-word masked cascade instead.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.06, immediate, words }: Props) {
  const viewProps = immediate
    ? { animate: words ? "show" : { opacity: 1, y: 0 } }
    : { whileInView: words ? "show" : { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  if (words) {
    return (
      <motion.span aria-label={text} initial="hidden" variants={container(stagger, delay)} className={cn("inline-block", className)} {...viewProps}>
        {text.split(" ").map((w, i, arr) => (
          <span key={i} aria-hidden className="inline-block whitespace-pre">
            <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
              <motion.span variants={word} className="inline-block">{w}</motion.span>
            </span>
            {i < arr.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.1, 1] }}
      className={cn("inline-block", className)}
      {...viewProps}
    >
      {text}
    </motion.span>
  );
}
