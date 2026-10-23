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
export function SnackImage({
  src,
  alt,
  art,
  variant = "product",
  sizes = "(min-width:1024px) 33vw, 100vw",
  priority,
  className,
  imgClassName,
}: Props) {
  if (!src) {
    return (
      <div className={cn("absolute inset-0", className)} role="img" aria-label={alt}>
        <ArtCanvas art={art} variant={variant} />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-cream-2/40", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105", imgClassName)}
      />
    </div>
  );
}
