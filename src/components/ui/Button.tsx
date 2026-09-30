import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "cream";

const styles: Record<Variant, string> = {
  primary: "bg-orange text-cream before:bg-choc",
  dark: "bg-choc text-cream before:bg-orange",
  cream: "bg-cream text-choc before:bg-yolk",
  outline: "border-2 border-current bg-transparent before:bg-current hover:text-choc",
};

interface Common {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  size?: "md" | "lg";
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-semibold transition-[filter,transform] duration-200 hover:brightness-90 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100";

const sizes = { md: "h-12 px-6 text-[15px]", lg: "h-14 px-8 text-base" };

const Inner = ({ children }: { children: ReactNode }) => <span className="relative z-10 flex items-center gap-2">{children}</span>;

export function Button({ href, variant = "primary", size = "md", className, children }: Common & { href: string }) {
  return (
    <Link href={href} className={cn(base, sizes[size], styles[variant], className)}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function ButtonEl({ variant = "primary", size = "md", className, children, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={cn(base, sizes[size], styles[variant], className)}>
      <Inner>{children}</Inner>
    </button>
  );
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-300 group-hover/btn:translate-x-1", className)} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
