import Image from "next/image";
import type { ArtSpec } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArtCanvas } from "./ArtCanvas";

interface Props {
  src?: string;
  alt: string;
  art: ArtSpec;
  variant?: "product" | "pile" | "scene";
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/** Fills its (relative) parent. Real photo when `src` exists, designed artwork otherwise. */
export function SnackImage({ src, alt, art, variant = "product", sizes = "(min-width:1024px) 33vw, 100vw", priority, className, imgClassName }: Props) {
  if (!src) {
    return (
      <div className={cn("absolute inset-0", className)} role="img" aria-label={alt}>
        <ArtCanvas art={art} variant={variant} />
      </div>
    );
  }
  // Product shots are cut-outs on a tinted backdrop; lifestyle/macro shots are full-bleed.
  const isCutout = variant === "product";
  return (
    <div className={cn("absolute inset-0", className)} style={isCutout ? { background: `radial-gradient(110% 90% at 50% 25%, ${art.bg[0]}, ${art.bg[1]})` } : undefined}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn(isCutout ? "object-contain p-6" : "object-cover", imgClassName)} />
    </div>
  );
}
