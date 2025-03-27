/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ['tile.openstreetmap.org'],
  },
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig 