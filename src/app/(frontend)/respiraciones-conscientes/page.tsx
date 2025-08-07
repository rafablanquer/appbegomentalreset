import { Metadata } from 'next'

import { RouteProtection } from '@/utilities/membership'
import ProtectedRoute from '@/components/ProtectedRoute'
import CollectionPanel from '@/domains/content/collection/components/CollectionPanel'
import Image from 'next/image'

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



function RespiracionesContent() {
    const title = "Respiraciones Conscientes"
    const description = "Equilibra tu sistema nervioso y encuentra un momento de calma en tu día. Estos audios te guiarán en una sencilla pero poderosa práctica de respiración consciente. Dedica unos minutos a conectar con el presente, reducir el estrés y renovar tu energía. Solo necesitas escuchar y respirar."
    const keywords = ["Respiraciones Conscientes", "Begoña Mental Reset", "BMR", "Respiraciones", "Conscientes"]
    const openGraph = {
        title: title,
        description: description,
    }
    const programs = [
        {
            id: 1,
            title: "Relajación corporal ",
            path: "relajacion-tension-corporal"
        }, {
            id: 2,
            title: "Relajación profunda",
            path: "relajacion-profunda-2"
        }, {
            id: 3,
            title: "Agitación/crisis emocional",
            path: "agitacion-crisis-emocional"
        }, {
            id: 4,
            title: "Calma la ansiedad",
            path: "calma-ansiedad"
        }
    ]

    const collection = {
        title: title,
        programs: programs,
    }

    const heroPath = "/content/collectionRespiracionesConscientes/hero.png"
    return <CollectionPanel title={title} description={description} keywords={keywords} programs={programs} heroPath={heroPath} />
}

export default function RespiracionesConscientesPage() {
    return (
        <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
            <RespiracionesContent />
        </ProtectedRoute>
    )
}