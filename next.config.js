/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.sanity.io",
      "imageio.forbes.com",
      "www.highsnobiety.com",
      "consequence.net",
    ],
  },
};

module.exports = nextConfig;
