import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren membresía activa
const membershipRoutes = [
    '/perfil',
    '/herramientas-de-regulacion',
    '/rutina-de-enfoque-diario',
    '/respiraciones-conscientes',
    '/transformacion-nocturna',
    '/reto-21-dias',
    '/home-app', // Página principal de la app
]

// Rutas que solo requieren autenticación (no membresía)
const authenticatedRoutes = [
    '/pago-de-membresia',
]

// Rutas públicas que no requieren autenticación
const publicRoutes = [
    '/',
    '/login',
    '/blog',
    '/contacto',
    '/niveles-de-membresia',
    '/cookies',
    '/privacidad',
    '/terminos',
    '/instrucciones',
    '/offline',
]

// Rutas de API que deben permitirse siempre
const allowedApiRoutes = [
    '/api/auth/register',
    '/api/stripe/webhook',
    '/api/stripe/create-checkout-session',
    '/api/users/me',
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Permitir todas las rutas del admin de Payload
    if (pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    // Permitir rutas de API específicas
    if (pathname.startsWith('/api/')) {
        // Permitir rutas de API autorizadas
        if (allowedApiRoutes.some(route => pathname.startsWith(route))) {
            return NextResponse.next()
        }
        // Para otras APIs, Payload manejará la autenticación
        return NextResponse.next()
    }

    // Permitir archivos estáticos y de Next.js
    if (pathname.startsWith('/_next/') ||
        pathname.startsWith('/public/') ||
        pathname.startsWith('/assets/') ||
        pathname.includes('.')) {
        return NextResponse.next()
    }

    // Permitir rutas de Next.js internas
    if (pathname.startsWith('/next/')) {
        return NextResponse.next()
    }

    // Verificar si es una ruta pública
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route ||
        (route !== '/' && pathname.startsWith(route + '/'))
    )

    if (isPublicRoute || pathname === '/') {
        return NextResponse.next()
    }

    // Obtener token de las cookies
    const token = request.cookies.get('payload-token')?.value

    // Verificar rutas que requieren autenticación
    const requiresAuth = membershipRoutes.some(route => pathname.startsWith(route)) ||
        authenticatedRoutes.some(route => pathname.startsWith(route))

    // Si no hay token y la ruta requiere autenticación, redireccionar a login
    if (!token && requiresAuth) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Si hay token, permitir el acceso
    // La verificación específica de membresía se hace en cada página
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
}