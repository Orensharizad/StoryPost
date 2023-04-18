/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'res.cloudinary.com', 'cdn.pixabay.com']
  }

}

module.exports = nextConfig
