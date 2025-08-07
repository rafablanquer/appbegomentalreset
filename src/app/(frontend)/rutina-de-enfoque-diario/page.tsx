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

export default function RutinaDeEnfoqueDiarioPage() {
    const title = "NEURODESPERTAR"
    const description = "Activa tu mente. Dirige tu día desde el primer pensamiento. Lo que piensas y sientes al despertar condiciona tu día.Estos audios están diseñados para activar tu sistema límbico en un estado emocional positivo, potenciar tu motivación y enfocar tu atención hacia lo que sí quieres lograr hoy."
    const path = "/neuropausa"
    const keywords = ["NEUROPAUSA", "Begoña Mental Reset", "BMR", "Neuropausa", "Pausa", "Consciente"]
    const openGraph = {
        title: title,
        description: description,
    }
    const heroPath = "/content/programNeurodespertar/hero.png"
    const activities = [
        {
            id: 1,
            title: "Activa tu gratitud",
            description: "El agradecimiento matinal cambia la química del cerebro y ajusta el filtro de tu atención hacia lo que si suma.",
            path: "pausa-1"
        },
        {
            id: 2,
            title: "Elige tu estado",
            description: "Tu estado emocional no es un accidente: es una decisión bioquímica. Decide con conciencia.",
            path: "pausa-1"
        },

    ]
    return <ProgramPanel title={title} description={description} keywords={keywords} activities={activities} heroPath={heroPath} />
}