/** @type {import('next').NextConfig} */
const nextConfig = {
  
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
module.exports = {
// Enable build caching
  experimental: {
    buildCache: true,
  },
};
module.exports = nextConfig;
