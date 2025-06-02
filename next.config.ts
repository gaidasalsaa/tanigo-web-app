/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
};

module.exports = nextConfig;