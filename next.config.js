/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable build caching
  experimental: {
    buildCache: true,
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
