/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // bundles everything needed to run without node_modules
  experimental: { serverComponentsExternalPackages: ['fs', 'path'] },
}
module.exports = nextConfig
