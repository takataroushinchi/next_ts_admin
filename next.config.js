/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io', 'picsum.photos'],
    // loader: 'imgix',
    // path: '',
  },
};
