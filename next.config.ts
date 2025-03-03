import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: false,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
