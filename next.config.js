/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'geral.sisgesc.net',
            port: '8080',
            pathname: '/produtos/image/**',
          },
        ],
    },
}

module.exports = nextConfig
