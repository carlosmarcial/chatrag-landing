/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using serverful deployment on Vercel to support API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  // Improve SEO and performance
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Note: Security headers can be configured at the hosting level (Vercel, Netlify, etc.)
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         { key: 'X-Content-Type-Options', value: 'nosniff' },
  //         { key: 'X-Frame-Options', value: 'DENY' },
  //         { key: 'X-XSS-Protection', value: '1; mode=block' },
  //         { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
