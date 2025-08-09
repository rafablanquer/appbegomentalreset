'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'


import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { PWASidebar } from '@/components/FloatingMenu/PWASidebar'
import { cn } from '@/utilities/ui'
import ButtonUnete from '@/components/Buttons/ButtonUnete'

interface HeaderClientProps {
  data: Header;
  isAuthenticated?: boolean;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, isAuthenticated = false }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  // Mostrar el botón "Únete" SOLO en la landing ('/') y en '/contacto'.
  // En el resto de rutas, mostrar el header con menú hamburguesa.
  const isLanding = pathname === '/'
  const isContacto = pathname === '/contacto'
  const useAppHeader = !(isLanding || isContacto)

  const handleUnete = () => {
    router.push('/niveles-de-membresia')
  }



  return useAppHeader ? (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm fixed-header"
        style={{
          backgroundColor: "rgb(250, 241, 230)",
        }}>
        <div className="container mx-auto px-4">
          <div className="py-2 flex justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" isAuthenticated={isAuthenticated} />
            </Link>

            <div className="flex items-center gap-4">
              {/* <HeaderNav data={data} /> */}

              {/* Botón del menú integrado */}
              <button
                onClick={toggleSidebar}
                className={cn(
                  'p-2 rounded-lg header-menu-button',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  'active:scale-95'
                )}
                aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={cn(
                      'absolute inset-0 w-6 h-6 transition-all duration-300',
                      isSidebarOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                    )}
                  />
                  <X
                    className={cn(
                      'absolute inset-0 w-6 h-6 transition-all duration-300',
                      isSidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <PWASidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  ) : (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 fixed-header"
        style={{
          height: "72px",
          backgroundColor: "rgb(250, 241, 230)",
        }}>
        <div className="container mx-auto px-4">
          <div className="py-3 flex justify-between items-center">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" isAuthenticated={false} />
            </Link>

            <div className="flex items-center gap-4">
              <div className="et_pb_button_module_wrapper et_pb_button_alignment_right">
                <ButtonUnete onClick={handleUnete} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <PWASidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  )
}