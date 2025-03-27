/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringDev: true,
  },
  typescript: {
    ignoreBuildErrors: true,
    ignoreDevErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ['tile.openstreetmap.org'],
  },
  transpilePackages: ['lucide-react'],
  experimental: {
    esmExternals: false,
  }
}

module.exports = nextConfig 