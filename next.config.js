/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using serverful deployment on Vercel to support API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
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
  // Redirects to handle trailing slash and URL variations
  async redirects() {
    return [
      // Redirect trailing slashes to non-trailing slash (except root)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
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
