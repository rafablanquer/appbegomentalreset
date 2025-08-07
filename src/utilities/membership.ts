import type { User } from '@/payload-types'

/**
 * Verifica si un usuario tiene una membresía activa
 */
export function hasActiveMembership(user: User | null | undefined): boolean {
    if (!user) return false

    // Verificar que tenga un tipo de membresía válido (no 'none')
    if (!user.membershipType || user.membershipType === 'none') return false

    // Verificar que el estado sea 'active'
    if (user.membershipStatus !== 'active') return false

    // Verificar que la fecha de fin no haya pasado (si existe)
    if (user.membershipEndDate) {
        const endDate = new Date(user.membershipEndDate)
        const now = new Date()
        if (endDate < now) return false
    }

    return true
}

/**
 * Verifica si un usuario está autenticado (tiene token válido)
 */
export function isAuthenticated(user: User | null | undefined): boolean {
    return Boolean(user?.id)
}

/**
 * Determina a qué página redireccionar basado en el estado del usuario
 */
export function getRedirectPath(user: User | null | undefined): string {
    // Si no está autenticado, ir a login
    if (!isAuthenticated(user)) {
        return '/login'
    }

    // Si está autenticado pero no tiene membresía activa, ir a página de membresías
    if (!hasActiveMembership(user)) {
        return '/niveles-de-membresia'
    }

    // Si todo está bien, no redireccionar
    return ''
}

/**
 * Tipos de protección para las rutas
 */
export enum RouteProtection {
    PUBLIC = 'public',                    // Acceso público
    AUTHENTICATED = 'authenticated',      // Solo usuarios autenticados
    MEMBERSHIP = 'membership',            // Solo usuarios con membresía activa
    ADMIN = 'admin'                      // Solo administradores
}

/**
 * Obtiene información detallada del estado de membresía
 */
export function getMembershipInfo(user: User | null | undefined) {
    if (!user) {
        return {
            hasUser: false,
            isAuthenticated: false,
            hasActiveMembership: false,
            membershipType: null,
            membershipStatus: null,
            daysUntilExpiry: null,
            isExpired: false
        }
    }

    const isAuth = isAuthenticated(user)
    const hasActiveMemb = hasActiveMembership(user)

    let daysUntilExpiry = null
    let isExpired = false

    if (user.membershipEndDate) {
        const endDate = new Date(user.membershipEndDate)
        const now = new Date()
        const diffTime = endDate.getTime() - now.getTime()
        daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        isExpired = daysUntilExpiry < 0
    }

    return {
        hasUser: true,
        isAuthenticated: isAuth,
        hasActiveMembership: hasActiveMemb,
        membershipType: user.membershipType,
        membershipStatus: user.membershipStatus,
        daysUntilExpiry,
        isExpired
    }
}