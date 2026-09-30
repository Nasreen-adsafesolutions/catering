import Link from "next/link";
import { cn } from "@/lib/utils";
import { Piece } from "../art/Pieces";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Crunch & Co. — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-orange transition-transform duration-500 group-hover:rotate-[24deg]">
        <Piece kind="chip" className="h-6 w-6" rotate={-10} />
      </span>
      <span className={cn("text-[1.35rem] font-extrabold leading-none tracking-[-0.04em]", light ? "text-cream" : "text-choc")}>
        CRUNCH<span className="font-serif font-normal italic text-orange"> &amp; Co.</span>
      </span>
    </Link>
  );
}
