import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Placeholder mark for Zaika Ghar ("the home of flavour"): a house roof (ghar) over a
 * steaming bowl (zaika). Pure SVG so it recolours with the palette — swap for the real
 * logo by replacing <LogoMark /> (or pass `logo` from the CMS later).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#EF4B23" />
      {/* roof */}
      <path d="M8.5 22.5 24 8.5l15.5 14" fill="none" stroke="#FFD36B" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* steam */}
      <path d="M19 21c-1.6-2 1.6-3.2 0-5.2M24.5 21c-1.6-2 1.6-3.2 0-5.2M30 21c-1.6-2 1.6-3.2 0-5.2" fill="none" stroke="#FFF6E8" strokeWidth="1.9" strokeLinecap="round" />
      {/* bowl */}
      <path d="M11.5 27h25a12.5 12.5 0 0 1-25 0z" fill="#FFF6E8" />
      <path d="M19 40.5h10" stroke="#FFF6E8" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({ name = "Zaika Ghar", className, light }: { name?: string; className?: string; light?: boolean }) {
  const [first, ...rest] = name.split(" ");
  return (
    <Link href="/" aria-label={`${name} — home`} className={cn("inline-flex items-center gap-2.5 font-head text-2xl font-extrabold tracking-tight", light ? "text-paper" : "text-crust", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="leading-none">
        {first}
        {rest.length > 0 && <span className="text-tomato"> {rest.join(" ")}</span>}
      </span>
    </Link>
  );
}
