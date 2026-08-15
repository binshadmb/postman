/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      "/api/bills/proforma": ["./node_modules/@sparticuz/chromium/**/*"],
    },
  },
};

module.exports = nextConfig;
