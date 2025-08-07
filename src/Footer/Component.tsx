import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { CookieSettingsButton } from '@/components/CookieSettings'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
            {/* Enlaces legales adicionales */}
            <div className="flex flex-col md:flex-row gap-4 border-t md:border-t-0 md:border-l border-gray-600 pt-4 md:pt-0 md:pl-4">
              <Link href="/privacidad" className="text-white hover:text-gray-300 text-sm">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-white hover:text-gray-300 text-sm">
                Términos
              </Link>
              <Link href="/cookies" className="text-white hover:text-gray-300 text-sm">
                Cookies
              </Link>
              <CookieSettingsButton />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}
