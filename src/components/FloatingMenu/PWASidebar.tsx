'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    type LucideIcon,
    Home,
    BookOpen,
    Heart,
    Moon,
    Wind,
    Target,
    Calendar,
    Mail,
    User,
    Settings,
    X,
    UserCircle,
    Trophy,
    FolderOpen
} from 'lucide-react'
import { cn } from '@/utilities/ui'

interface PWASidebarProps {
    isOpen: boolean
    onClose: () => void
}

type MenuItem = {
    label: string
    href: string
    icon: LucideIcon
    description?: string
}

type MenuSection = {
    title: string
    items: MenuItem[]
}

// Mapa de iconos por slug. Se inicializa una vez al cargar el módulo
const ICON_BY_SLUG: Record<string, LucideIcon> = {
    'neurodespertar': Target,
    'rutina-de-enfoque-diario': Target,
    'neuropausa': Heart,
    'herramientas-de-regulacion': Heart,
    'transformacion-nocturna': Moon,
    'respiraciones-conscientes': Wind,
    'reto-21-dias': Calendar,
}

const DEFAULT_ICON = {
    program: Target as LucideIcon,
    collection: FolderOpen as LucideIcon,
    challenge: Trophy as LucideIcon,
}

// Overrides de ruta si el slug no coincide con la ruta real de la PWA
const ROUTE_BY_SLUG: Record<string, string> = {
    neurodespertar: '/rutina-de-enfoque-diario',
    neuropausa: '/herramientas-de-regulacion',
}

export const PWASidebar: React.FC<PWASidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname()
    const [programs, setPrograms] = useState<MenuItem[]>([])
    const [collections, setCollections] = useState<MenuItem[]>([])
    const [challenges, setChallenges] = useState<MenuItem[]>([])
    const [loadingActs, setLoadingActs] = useState<boolean>(true)

    // Cerrar al presionar Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    // Carga dinámica de actividades
    useEffect(() => {
        let isMounted = true
        async function loadActivities() {
            try {
                setLoadingActs(true)
                const results = await Promise.allSettled([
                    fetch('/api/programs?depth=0&limit=200&sort=title', { credentials: 'include' }),
                    fetch('/api/content-collections?depth=0&limit=200&sort=title', { credentials: 'include' }),
                    fetch('/api/challenges?depth=0&limit=200&sort=title', { credentials: 'include' }),
                ])

                if (!isMounted) return

                const [progRes, collRes, chalRes] = results
                const progJson = progRes.status === 'fulfilled' && progRes.value.ok ? await progRes.value.json() : { docs: [] }
                const collJson = collRes.status === 'fulfilled' && collRes.value.ok ? await collRes.value.json() : { docs: [] }
                const chalJson = chalRes.status === 'fulfilled' && chalRes.value.ok ? await chalRes.value.json() : { docs: [] }

                const toItem = (title: string, kind: 'program' | 'collection' | 'challenge', slug?: string | null): MenuItem => {
                    const s = (slug || '').toLowerCase()
                    const href = ROUTE_BY_SLUG[s] || (s ? `/${s}` : '#')
                    const Icon = ICON_BY_SLUG[s] || DEFAULT_ICON[kind]
                    return { label: title || '—', href, icon: Icon }
                }

                setPrograms((progJson.docs || []).map((p: any) => toItem(String(p.title || ''), 'program', p.slug)))
                setCollections((collJson.docs || []).map((c: any) => toItem(String(c.title || ''), 'collection', c.slug)))
                setChallenges((chalJson.docs || []).map((c: any) => toItem(String(c.title || ''), 'challenge', c.slug)))
            } finally {
                if (isMounted) setLoadingActs(false)
            }
        }

        loadActivities()
        return () => {
            isMounted = false
        }
    }, [])

    const menuSections: MenuSection[] = useMemo(() => {
        const base: MenuSection[] = [
            {
                title: 'Principal',
                items: [
                    { label: 'Inicio', href: '/home-app', icon: Home, description: 'Página principal' },
                ],
            },
        ]

        const acts: MenuSection[] = [
            { title: 'Programas', items: [...programs, ...collections, ...challenges] },
        ]

        const tail: MenuSection[] = [
            {
                title: 'Cuenta',
                items: [
                    { label: 'Niveles de Membresía', href: '/niveles-de-membresia', icon: User, description: 'Planes y membresías' },
                ],
            },
            {
                title: 'Recursos',
                items: [
                    { label: 'Instrucciones', href: '/instrucciones', icon: BookOpen, description: 'Artículos y contenido' },
                    { label: 'Blog', href: '/posts', icon: BookOpen, description: 'Artículos y contenido' },
                    { label: 'Contacto', href: '/contacto', icon: Mail, description: 'Ponte en contacto' },
                ],
            },
        ]

        return [...base, ...acts, ...tail]
    }, [programs, collections, challenges])

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 floating-menu-backdrop',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed top-0 right-0 h-full w-80 border-l border-border z-50 floating-menu-sidebar',
                    'transform transition-transform duration-300 ease-in-out',
                    'flex flex-col shadow-2xl',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {/* Header simple con avatar y close */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    {/* Avatar y perfil del usuario */}
                    <Link
                        href="/perfil"
                        onClick={onClose}
                        className="flex items-center gap-3 hover:bg-muted/50 rounded-lg p-2 transition-colors"
                    >
                        <UserCircle className="w-8 h-8 text-primary" />
                        <div>
                            <div className="font-medium text-sm">Mi Perfil</div>
                            <div className="text-xs text-muted-foreground">Ver cuenta</div>
                        </div>
                    </Link>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Cerrar menú"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Contenido del sidebar con secciones */}
                <div className="flex-1 overflow-y-auto py-2">
                    <nav className="px-3">
                        {menuSections.map((section, sectionIndex) => (
                            <div key={section.title} className="mb-6">
                                {/* Título de la sección */}
                                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {section.title}
                                </div>

                                {/* Items de la sección */}
                                <div className="space-y-1">
                                    {(section.items.length > 0 ? section.items : (!loadingActs ? [] : [])).map((item) => {
                                        const isActive = pathname === item.href
                                        const Icon = item.icon

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose}
                                                className={cn(
                                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                                    'hover:bg-muted/80 group',
                                                    isActive && 'bg-primary/10 text-primary border-r-2 border-primary'
                                                )}
                                            >
                                                <Icon
                                                    className={cn(
                                                        'w-4 h-4 transition-colors',
                                                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                                    )}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className={cn(
                                                        'font-medium text-sm',
                                                        isActive ? 'text-primary' : 'text-foreground'
                                                    )}>
                                                        {item.label}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                    {section.items.length === 0 && !loadingActs && (
                                        <div className="px-3 py-2 text-xs text-muted-foreground">Sin elementos</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}