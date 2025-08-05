// Esquemas de validación con Zod
import { z } from 'zod';

// Schema para variables de entorno
export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

// Validar variables de entorno
export function validateEnv(): Env {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        console.error('❌ Variables de entorno inválidas:', result.error.format());
        throw new Error('Variables de entorno inválidas');
    }

    return result.data;
}

// Configuración de rutas API
export const API_ROUTES = {
    auth: {
        signIn: '/api/auth/signin',
        signOut: '/api/auth/signout',
        session: '/api/auth/session',
    },
    users: {
        profile: '/api/users/profile',
        list: '/api/users',
    },
    cms: {
        base: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://cms.tudominio.com',
        admin: '/admin',
        api: '/api',
    },
} as const;

// Configuración de la aplicación
export const APP_CONFIG = {
    name: 'App Bego Mental Reset',
    description: 'Aplicación de bienestar mental',
    version: '1.0.0',
    author: 'Tu Nombre',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
} as const;