import "server-only";
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["avif", "webp", "jpg", "jpeg", "png"];

/**
 * Looks for /public/images/<key>.<ext>. Returns the public URL if a real photo
 * exists, otherwise undefined and the UI falls back to the built-in artwork.
 * Swap this for CMS asset URLs when a real backend exists.
 */
export function resolveImage(key: string): string | undefined {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", `${key}.${ext}`))) {
      return `/images/${key}.${ext}`;
    }
  }
  return undefined;
}
