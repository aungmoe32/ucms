/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath : "/absproxy/3000",
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["image.petmd.com", "wallpapers.com"],
  },
};

export default nextConfig;
