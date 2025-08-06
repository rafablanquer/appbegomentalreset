'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
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
    UserCircle
} from 'lucide-react'
import { cn } from '@/utilities/ui'

interface PWASidebarProps {
    isOpen: boolean
    onClose: () => void
}

const menuSections = [
    {
        title: 'Principal',
        items: [
            {
                label: 'Inicio',
                href: '/home-app',
                icon: Home,
                description: 'Página principal'
            }
        ]
    },
    {
        title: 'Programas',
        items: [
            {
                label: 'Respiraciones Conscientes',
                href: '/respiraciones-conscientes',
                icon: Wind,
                description: 'Ejercicios de respiración'
            },
            {
                label: 'Rutina de Enfoque Diario',
                href: '/rutina-de-enfoque-diario',
                icon: Target,
                description: 'Rutinas diarias'
            },
            {
                label: 'Transformación Nocturna',
                href: '/transformacion-nocturna',
                icon: Moon,
                description: 'Programa nocturno'
            },
            {
                label: 'Reto 21 Días',
                href: '/reto-21-dias',
                icon: Calendar,
                description: 'Desafío de 21 días'
            },
            {
                label: 'Herramientas de Regulación',
                href: '/herramientas-de-regulacion',
                icon: Heart,
                description: 'Herramientas para regular'
            }
        ]
    },
    {
        title: 'Cuenta',
        items: [
            {
                label: 'Niveles de Membresía',
                href: '/niveles-de-membresia',
                icon: User,
                description: 'Planes y membresías'
            }
        ]
    },
    {
        title: 'Recursos',
        items: [
            {
                label: 'Blog e Instrucciones',
                href: '/posts',
                icon: BookOpen,
                description: 'Artículos y contenido'
            },
            {
                label: 'Contacto',
                href: '/contacto',
                icon: Mail,
                description: 'Ponte en contacto'
            }
        ]
    }
]

export const PWASidebar: React.FC<PWASidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname()

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
                                    {section.items.map((item) => {
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
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}