/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    // Ensure static assets are properly included
    trailingSlash: false,
    // Handle images and other assets
    images: {
        unoptimized: true,
    },
    // Ensure all dependencies are bundled
    experimental: {
        outputFileTracingRoot: process.cwd(),
    },
};

export default nextConfig;
