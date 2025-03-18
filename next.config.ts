import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
        port: "", // Leave empty unless a specific port is required
        pathname: "/jpg/**", // Optional: Restrict to /jpg/ paths
      },
    ],
  },
};

export default nextConfig;
