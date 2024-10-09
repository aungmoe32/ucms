/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/absproxy/3000",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ["image.petmd.com", "wallpapers.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.petmd.com",
      },
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
    ],
  },
};

module.exports = nextConfig;
