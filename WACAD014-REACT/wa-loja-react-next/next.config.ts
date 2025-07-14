import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ranekapi.origamid.dev",
      },
    ],
  },
};

export default nextConfig;
