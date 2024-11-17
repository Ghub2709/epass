/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/epass',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.cache = false
    return config
  }
}

module.exports = nextConfig