import type { Metadata, Viewport } from "next"

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Inter } from "next/font/google"

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { FirstVisitWrapper } from '@/components/FirstVisitWrapper'
import { CookieBanner } from '@/components/CookieBanner'
import { ConditionalAudioPlayer } from '@/components/ConditionalAudioPlayer'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        {/* <link rel="apple-touch-icon" href="/icon-192x192.png" /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful');
                    }, function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="safe-area-top safe-area-bottom safe-area-left safe-area-right">
        <Providers>
          <FirstVisitWrapper>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <main className="pt-20 min-h-screen">
              {children}
            </main>
            <ConditionalAudioPlayer />
            {/* <Footer /> */}

            <CookieBanner />
          </FirstVisitWrapper>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "Neurodespertar - Bego Mental Reset",
  description: "Activa tu mente. Dirige tu día desde el primer pensamiento.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  themeColor: "#8b7355",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Neurodespertar",
    startupImage: [
      {
        url: "/apple-touch-icon-180x180.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-touch-icon-152x152.png",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: "#8b7355",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}


