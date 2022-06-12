/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '',
  },
};
