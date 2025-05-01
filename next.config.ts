import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["directus-wgea.onrender.com", "images.unsplash.com"], // 🔥 BURAYA Unsplash da eklendi
  },
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Bu kalsın, build sırasında ESLint hatası verme
  },
};

export default nextConfig;
