'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface FloatingMenuButtonProps {
    isOpen: boolean
    onClick: () => void
    className?: string
}

export const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({
    isOpen,
    onClick,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'fixed bottom-6 right-6 z-50 text-primary-foreground floating-menu-button',
                'w-14 h-14 rounded-full',
                'flex items-center justify-center',
                'transition-all duration-300 ease-in-out',
                'active:scale-95',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                className
            )}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
            <div className="relative w-6 h-6">
                <Menu
                    className={cn(
                        'absolute inset-0 w-6 h-6 transition-all duration-300',
                        isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                    )}
                />
                <X
                    className={cn(
                        'absolute inset-0 w-6 h-6 transition-all duration-300',
                        isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
                    )}
                />
            </div>
        </button>
    )
}