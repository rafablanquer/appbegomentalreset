import { withPayload } from '@payloadcms/next/withPayload'
import withPWA from 'next-pwa'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react"]
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

// Configuración de PWA
const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  dev: true,
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  swcMinify: true,
  // Página de fallback para navegación offline
  workboxOptions: {
    navigateFallback: "/offline"
  },
  runtimeCaching: [
    // HTML / navegación → App Shell
    {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "html",
        networkTimeoutSeconds: 3
      }
    },
    // JSON de Payload (GET)
    {
      urlPattern: ({ url, request }) =>
        url.pathname.startsWith("/api") && request.method === "GET",
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-get",
        cacheableResponse: { statuses: [0, 200] }
      }
    },
    // Media (audios, imágenes, PDF)
    {
      urlPattern: ({ url }) =>
        url.pathname.endsWith(".mp3") || url.pathname.endsWith(".m4a") ||
        url.pathname.endsWith(".jpg") || url.pathname.endsWith(".png") ||
        url.pathname.endsWith(".pdf"),
      handler: "CacheFirst",
      options: {
        cacheName: "media",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 }
      }
    }
  ]
}

// Combinar withPWA y withPayload correctamente
const configWithPWA = withPWA(pwaConfig)(nextConfig)
export default withPayload(configWithPWA, { devBundleServerPackages: false })