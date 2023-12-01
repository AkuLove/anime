/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "styles/mixins.scss";`,
  },
};

module.exports = nextConfig;
