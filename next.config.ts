import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    cacheComponents: true,
    partialPrefetching: true,
    images: {
      // In dev, don't keep optimized images (default 4 hours) so swapping a file in
      // public/ (e.g. a particle PNG under the same name) shows up on the next reload.
      // Production keeps the default.
      ...(isDev && { minimumCacheTTL: 0 }),
    },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
