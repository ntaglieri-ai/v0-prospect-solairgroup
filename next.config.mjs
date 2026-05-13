/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/configuratore',
        destination: '/configuratore-solair-v7.html',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
