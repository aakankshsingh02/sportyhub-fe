/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/reset-password/:token",
        destination: "http://localhost:5000/api/auth/reset-password/:token", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
