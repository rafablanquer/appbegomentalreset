'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/payload-types'
import { hasActiveMembership, isAuthenticated, RouteProtection } from '@/utilities/membership'
import { getUserFromClient } from '@/utilities/getMeUserWithMembership'
import MembershipRequired, { LoginRequired } from '@/components/MembershipRequired'

interface ProtectedRouteProps {
  children: React.ReactNode
  protection: RouteProtection
  customRedirect?: string
  fallback?: React.ReactNode
}

export default function ProtectedRoute({
  children,
  protection,
  customRedirect,
  fallback
}: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  // Componente de carga por defecto
  const defaultFallback = (
    <div className="min-h-screen bg-gradient-to-b from-[#c4b5a0] to-[#a8b5a0] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a5d4a] mx-auto mb-4"></div>
        <p className="text-[#4a5d4a] font-medium">Verificando acceso...</p>
      </div>
    </div>
  )

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserFromClient()
        setUser(userData)
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (loading) return

    let isAuthorized = false

    switch (protection) {
      case RouteProtection.PUBLIC:
        isAuthorized = true
        break

      case RouteProtection.AUTHENTICATED:
        isAuthorized = isAuthenticated(user)
        break

      case RouteProtection.MEMBERSHIP:
        isAuthorized = isAuthenticated(user) && hasActiveMembership(user)
        break

      case RouteProtection.ADMIN:
        // Para admin, verificar si el usuario tiene permisos de admin
        isAuthorized = isAuthenticated(user)
        if (!isAuthorized) {
          router.push(customRedirect || '/login')
          return
        }
        break

      default:
        isAuthorized = true
        break
    }

    setAuthorized(isAuthorized)
  }, [user, loading, protection, customRedirect, router])

  if (loading) {
    return fallback || defaultFallback
  }

  if (!authorized) {
    // Mostrar componente específico según el tipo de protección
    if (protection === RouteProtection.MEMBERSHIP) {
      if (!isAuthenticated(user)) {
        return fallback || <LoginRequired />
      } else {
        return fallback || <MembershipRequired />
      }
    } else if (protection === RouteProtection.AUTHENTICATED) {
      return fallback || <LoginRequired />
    }

    return fallback || defaultFallback
  }

  return <>{children}</>
}

// Hook personalizado para usar en componentes
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserFromClient()
        setUser(userData)
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(user),
    hasActiveMembership: hasActiveMembership(user)
  }
}