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
      </head>
      <body>
        <Providers>
          <FirstVisitWrapper>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            {/* <Footer /> */}
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
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Neurodespertar",
  },
}

export const viewport: Viewport = {
  themeColor: "#8b7355",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


