/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'],
    // loader: 'imgix',
    // path: '',
  },
};
