import { Metadata } from 'next'
import ContactPage from '@/domains/contact/components/ContactPage'
import LandingMembresiasPage from '@/domains/landing/components/LandingMembresiasPage'
import ProgramPanel from '@/domains/content/program/components/ProgramPanel'

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

    const title = "REPROGRAMACIÓN NOCTURNA"
    const description = "Transforma tu subconsciente mientras duermes. Estos audios están diseñados para ayudarte a entrar en sueño profundo mientras generas nuevas conexiones neuronales. Escúchalos cada noche y despierta con una mente renovada y enfocada."
    const keywords = ["NEUROPAUSA", "Begoña Mental Reset", "BMR", "Neuropausa", "Pausa", "Consciente"]
    const openGraph = {
        title: title,
        description: description,
    }
    const heroPath = "/content/programReprogramacionNocturna/hero.png"
    const activities = [
        {
            id: 1,
            title: "Auto hipnosis para dormir profundamente",
            path: "Autohipnosis para dormir profundo y transformar desde el subconsciente."
        },
    ]

    return <ProgramPanel title={title} description={description} keywords={keywords} activities={activities} heroPath={heroPath} />
}