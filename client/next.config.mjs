/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    // Ensure static assets are properly included
    trailingSlash: false,
    // Handle images and other assets
    images: {
        unoptimized: true,
    },
    // Static export configuration
    distDir: 'out',
    // Optimize for production deployment
    compress: true,
    poweredByHeader: false,
    // Configure API URL for production
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8100/api/v1',
    },
};

export default nextConfig;
