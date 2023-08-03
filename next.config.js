// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/no-var-requires */
const isProd = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProd
})

const nextConfig = withPWA({
  generateEtags: false,
  pageExtensions: ['tsx']
})

module.exports = nextConfig
