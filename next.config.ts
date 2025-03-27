// //@ts-nocheck

// import type { NextConfig } from "next";
// import withPWA from "next-pwa";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };

// // Export the config wrapped with PWA
// export default withPWA({
//   dest: "public", // PWA output directory
//   register: true, // Register the service worker
//   skipWaiting: true, // Skip waiting phase for service worker
//   disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
// })(nextConfig);
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: isProd, // Only register in prod to avoid dev warnings
  skipWaiting: true,
  disable: !isProd, // Disable in dev
})(nextConfig as any);
