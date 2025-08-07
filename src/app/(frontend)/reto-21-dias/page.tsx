import { Metadata } from 'next'
import ContactPage from '@/domains/contact/components/ContactPage'
import LandingMembresiasPage from '@/domains/landing/components/LandingMembresiasPage'
import RetoPanel, { AudioSession } from '@/domains/content/reto/components/RetoPanel'

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

export default function Reto21DiasPage() {
    const title = "Reto BMR"
    const description = "Desarrolla tu mejor versión en 3 semanas"
    const pathInstructions = "/content/programRetoBMR/instructions.png"


    const sessions: AudioSession[] = [
        // Semana 1
        {
            id: 1,
            day: 1,
            title: "Activa tu foco",
            description: "Entrena tu atención para dirigirla de forma consciente.",
            duration: "8:30",
            audioUrl: "/audio/dia1.mp3",
            week: 1,
            completed: true,
            unlocked: true,
        },
        {
            id: 2,
            day: 3,
            title: "Las creencias que heredamos",
            description: "Empieza a tomar conciencia de lo que no es realmente tuyo.",
            duration: "12:15",
            audioUrl: "/audio/dia3.mp3",
            week: 1,
            completed: true,
            unlocked: true,
        },
        {
            id: 3,
            day: 5,
            title: "Reprograma una creencia",
            description: "Aprende a identificar una creencia limitante y reemplazarla por una que te potencie.",
            duration: "15:45",
            audioUrl: "/audio/dia5.mp3",
            week: 1,
            completed: false,
            unlocked: true,
        },
        // Semana 2
        {
            id: 4,
            day: 8,
            title: "Visualiza tu futuro",
            description: "Conecta con la versión de ti que ya logró lo que deseas.",
            duration: "18:20",
            audioUrl: "/audio/dia8.mp3",
            week: 2,
            completed: false,
            unlocked: true,
        },
        {
            id: 5,
            day: 10,
            title: "Crea una nueva identidad",
            description: "Empieza a pensar y actuar como esa nueva versión que estás construyendo.",
            duration: "16:30",
            audioUrl: "/audio/dia10.mp3",
            week: 2,
            completed: false,
            unlocked: false,
        },
        {
            id: 6,
            day: 12,
            title: "Tu sabio interior",
            description: "Aprende a escucharte sin ruido mental ni juicios.",
            duration: "14:10",
            audioUrl: "/audio/dia12.mp3",
            week: 2,
            completed: false,
            unlocked: false,
        },
        // Semana 3
        {
            id: 7,
            day: 15,
            title: "Reprograma una segunda creencia",
            description: "Elige una nueva creencia poderosa y entrénala en tu mente subconsciente.",
            duration: "17:45",
            audioUrl: "/audio/dia15.mp3",
            week: 3,
            completed: false,
            unlocked: false,
        },
        {
            id: 8,
            day: 17,
            title: "Viaje a tu identidad futura",
            description: "Vive una experiencia guiada en la que encarnas tu mejor versión.",
            duration: "22:30",
            audioUrl: "/audio/dia17.mp3",
            week: 3,
            completed: false,
            unlocked: false,
        },
        {
            id: 9,
            day: 19,
            title: "Sostén tu identidad",
            description: "Aprender a mantener tu nueva identidad en el tiempo.",
            duration: "13:20",
            audioUrl: "/audio/dia19.mp3",
            week: 3,
            completed: false,
            unlocked: false,
        },
    ]

    return <RetoPanel sessions={sessions} pathInstructions={pathInstructions} title={title} description={description} />
}