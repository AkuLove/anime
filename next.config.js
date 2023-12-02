/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "styles/mixins.scss";`,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'cdn.myanimelist.net', protocol: 'https', port: '' },
    ],
  },
};

module.exports = nextConfig;
