/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    poweredByHeader: false,
    headers: async () => [
        {
            source: "/(.*)",
            headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            ],
        },
        {
            source: "/portfolio/:path*",
            headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
        },
        {
            source: "/uploads/:path*",
            headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
        },
    ],
};

export default nextConfig;
