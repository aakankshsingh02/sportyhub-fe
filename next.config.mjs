/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/reset-password/:token",
        destination:
          "https://sportyhub-be.onrender.com/api/auth/reset-password/:token", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
