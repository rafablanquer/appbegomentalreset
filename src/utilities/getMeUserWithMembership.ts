import type { User } from '../payload-types'
import { RouteProtection } from './membership'

/**
 * Versión simplificada para uso en cliente
 */
export const getUserFromClient = async (): Promise<User | null> => {
    try {
        const response = await fetch('/api/users/me', {
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json()
            return data.user
        }

        return null
    } catch (error) {
        console.error('Error getting user from client:', error)
        return null
    }
}