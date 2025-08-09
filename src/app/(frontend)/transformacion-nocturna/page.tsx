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
            description: "Autohipnosis para dormir profundo y transformar desde el subconsciente."
        },
        {
            id: 2,
            title: "Recepción nocturna de nuevos códigos",
            description: "Mientras duermes, tu mente subconsciente se abre a nuevas instrucciones que reprograman tus patrones más profundos."
        },
        {
            id: 3,
            title: "Sueño con dirección interna",
            description: "Un audio diseñado para enfocar tu cerebro durante el sueño hacia objetivos claros y estados mentales más coherentes."
        },
        {
            id: 4,
            title: "Reprogramación silenciosa y suave",
            description: "Transformación mental en segundo plano: sin esfuerzo, sin lucha, solo descanso y cambio real desde dentro."
        },
        {
            id: 5,
            title: "Descanso neurointencional",
            description: "Un descanso dirigido, que regula tu sistema nervioso y favorece la repación emocional y cognitiva mientras duermes."
        },
        {
            id: 6,
            title: "Ciclo de asimilación subconsciente",
            description: "Durante el sueño profundo, tu cerebro reorganiza y consolida nuevas conexiones alineadas con tu evolución mental."
        },
        {
            id: 7,
            title: "Activación interna en estado de sueño",
            description: "Aunque tu cuerpo duerme, este audio despierta circuitos internos que activan nuevas posibilidades desde el subconsciente."
        },
    ]

    return <ProgramPanel title={title} description={description} keywords={keywords} activities={activities} heroPath={heroPath} />
}
