"use client"

import { usePathname } from 'next/navigation'
import PersistentAudioPlayer from '@/components/PersistentAudioPlayer'

function ConditionalAudioPlayer() {
    const pathname = usePathname()

    // Lista de rutas donde debe mostrarse el audio player
    const audioPlayerRoutes = [
        '/reto-21-dias',
        '/rutina-de-enfoque-diario',
        '/transformacion-nocturna',
        '/respiraciones-conscientes'
    ]

    // Verificar si la ruta actual está en la lista de rutas permitidas
    const shouldShowPlayer = audioPlayerRoutes.some(route => pathname === route)

    if (!shouldShowPlayer) {
        return null
    }

    return <PersistentAudioPlayer />
}

export { ConditionalAudioPlayer }