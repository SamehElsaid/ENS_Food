const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["static.zyda.com","refine-web.imgix.net","15.184.138.214"] },
  output: "standalone",
  reactStrictMode: false,
  env: {
    API_URL: "http://15.184.138.214:8000",
  },
};

module.exports = withPWA(nextConfig);
