import type { NextConfig } from "next";

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/ — everything
// needs to be prefixed with /<repo> so assets and links resolve. GITHUB_REPOSITORY is set
// automatically by GitHub Actions as "<owner>/<repo>"; locally this is unset, so `npm run
// build`/`npm run dev` behave exactly as before (served from the domain root).
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.GITHUB_PAGES && repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  // lets a production build live beside a running `next dev` (NEXT_DIST_DIR=.next-prod)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Static HTML export for GitHub Pages — no Node server, no image optimization endpoint,
  // no server-side searchParams. Every route here already has generateStaticParams or no
  // per-request server data, so this is a plain switch, not a rewrite of the app.
  ...(process.env.GITHUB_PAGES ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next's built-in image optimizer needs a server; static export has none.
    unoptimized: !!process.env.GITHUB_PAGES,
  },
};

export default nextConfig;
