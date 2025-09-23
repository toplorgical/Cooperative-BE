/** @type {import('next').NextConfig} */
const nextConfig = {
    // Standard production build (no standalone)
    // Ensure static assets are properly included
    trailingSlash: false,
    // Handle images and other assets
    images: {
        unoptimized: true,
    },
    // Optimize for production deployment
    compress: true,
    poweredByHeader: false,
    // Configure API URL for production
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://cooperative-api.toplorgical.com/api/v1',
    },
};

export default nextConfig;
