import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // No rewrites needed for FastAPI, Vercel handles it
};

export default nextConfig;
