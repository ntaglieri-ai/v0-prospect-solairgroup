/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/configuratore',
        destination: '/configuratore-solair-v11.html',
      },
    ]
  },
}

export default nextConfig
