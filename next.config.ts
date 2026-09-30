import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lets a production build live beside a running `next dev` (NEXT_DIST_DIR=.next-prod)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
