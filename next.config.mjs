/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['api-dev-minimal-v510.vercel.app'],
  },
};
const withMDX = createMDX();

export default withMDX(nextConfig);
