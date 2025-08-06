export interface MenuItem {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    description: string
}

export interface FloatingMenuProps {
    className?: string
}

export interface FloatingMenuButtonProps {
    isOpen: boolean
    onClick: () => void
    className?: string
}

export interface PWASidebarProps {
    isOpen: boolean
    onClose: () => void
}