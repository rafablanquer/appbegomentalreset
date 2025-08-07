import { Metadata } from 'next'

import { RouteProtection } from '@/utilities/membership'
import ProtectedRoute from '@/components/ProtectedRoute'
import HomeAppPage from '@/domains/home/components/HomeAppPage'

export const metadata: Metadata = {
    title: 'Contacto - BMR - Begoña Mental Reset',
    description: 'Ponte en contacto con BMR - Begoña Mental Reset. Estamos aquí para ayudarte en tu proceso de transformación mental. Consultas presenciales y online.',
    keywords: ['contacto', 'BMR', 'Begoña Mental Reset', 'terapia', 'consulta', 'transformación mental', 'psicología'],
    openGraph: {
        title: 'Contacto - BMR - Begoña Mental Reset',
        description: 'Ponte en contacto con BMR - Begoña Mental Reset. Estamos aquí para ayudarte en tu proceso de transformación mental.',
        type: 'website',
        locale: 'es_ES',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contacto - BMR - Begoña Mental Reset',
        description: 'Ponte en contacto con BMR - Begoña Mental Reset. Estamos aquí para ayudarte en tu proceso de transformación mental.',
    },
    alternates: {
        canonical: '/contacto',
    },
}



export default function HomeApp() {
    return (
        <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
            <HomeAppPage />
        </ProtectedRoute>
    )
}