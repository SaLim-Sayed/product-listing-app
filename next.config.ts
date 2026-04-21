import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/shop", permanent: true },
      {
        source: "/category/:slug",
        destination: "/shop?category=:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 86_400,
  },
};

export default nextConfig;
