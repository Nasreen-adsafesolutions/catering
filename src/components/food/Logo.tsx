import Link from "next/link";
import { cn } from "@/lib/utils";

export function NomlyLogo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Nomly — home" className={cn("inline-flex items-center gap-2 font-head text-2xl font-extrabold tracking-tight", light ? "text-paper" : "text-crust", className)}>
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-tomato">
        <span className="h-3 w-3 rounded-full bg-butter" />
      </span>
      nomly
    </Link>
  );
}
