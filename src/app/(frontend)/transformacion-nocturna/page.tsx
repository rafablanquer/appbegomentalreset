import { Metadata } from 'next'
import ContactPage from '@/domains/contact/components/ContactPage'
import LandingMembresiasPage from '@/domains/landing/components/LandingMembresiasPage'

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

export default function TransformacionNocturnaPage() {
    return <LandingMembresiasPage />
}