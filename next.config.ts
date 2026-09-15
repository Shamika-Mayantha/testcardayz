import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview and QA hit 127.0.0.1; Next 16 blocks that origin from /_next/* by default.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
