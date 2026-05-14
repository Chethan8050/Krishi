import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [
      '10.178.226.122',
      '10.178.226.122:3000',
      'localhost:3000',
      '0.0.0.0',
      '0.0.0.0:3000'
    ],
  }
};

export default nextConfig;
