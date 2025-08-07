import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../payload-types'
import { getClientSideURL } from './getURL'
import { hasActiveMembership, RouteProtection } from './membership'

/**
 * Función para verificar autenticación del lado del servidor
 * Solo usar en Server Components o Server Actions
 */
export const getMeUserWithMembership = async (args?: {
    protection?: RouteProtection
    customRedirect?: string
}): Promise<{
    token: string | null
    user: User | null
}> => {
    const { protection = RouteProtection.PUBLIC, customRedirect } = args || {}

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('payload-token')?.value

        if (!token) {
            // Si no hay token y la ruta requiere autenticación
            if (protection !== RouteProtection.PUBLIC) {
                redirect(customRedirect || '/login')
            }
            return { token: null, user: null }
        }

        const meUserReq = await fetch(`${getClientSideURL()}/api/users/me`, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })

        if (!meUserReq.ok) {
            // Token inválido
            if (protection !== RouteProtection.PUBLIC) {
                redirect(customRedirect || '/login')
            }
            return { token: null, user: null }
        }

        const { user }: { user: User } = await meUserReq.json()

        // Verificar según el tipo de protección
        switch (protection) {
            case RouteProtection.AUTHENTICATED:
                if (!user) {
                    redirect(customRedirect || '/login')
                }
                break

            case RouteProtection.MEMBERSHIP:
                if (!user) {
                    redirect(customRedirect || '/login')
                } else if (!hasActiveMembership(user)) {
                    redirect(customRedirect || '/niveles-de-membresia')
                }
                break

            case RouteProtection.ADMIN:
                // Para admin, verificar si el usuario tiene permisos de admin
                if (!user) {
                    redirect(customRedirect || '/login')
                }
                break

            default:
                // RouteProtection.PUBLIC - no hacer nada
                break
        }

        return { token, user }
    } catch (error) {
        console.error('Error getting user:', error)

        if (protection !== RouteProtection.PUBLIC) {
            redirect(customRedirect || '/login')
        }

        return { token: null, user: null }
    }
}

/**
 * Función simplificada para verificar autenticación del servidor
 * Solo usar en Server Components
 */
export const checkAuth = async (): Promise<User | null> => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('payload-token')?.value

        if (!token) {
            return null
        }

        const meUserReq = await fetch(`${getClientSideURL()}/api/users/me`, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })

        if (!meUserReq.ok) {
            return null
        }

        const { user }: { user: User } = await meUserReq.json()
        return user
    } catch (error) {
        console.error('Error checking auth:', error)
        return null
    }
}