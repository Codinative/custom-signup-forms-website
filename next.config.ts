import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // writes to ./out
  images: { unoptimized: true },
  trailingSlash: true,       // makes /docs/page/ resolve cleanly
}

export default nextConfig;
