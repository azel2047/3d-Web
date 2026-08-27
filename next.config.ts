import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["framer-motion", "three"],
  },
};

export default nextConfig;
