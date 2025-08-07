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

export default function HerramientasDeRegulacionPage() {

  const title = "NEUROPAUSA"
  const description = "Una interrupción estratégica para reequilibrar tu sistema nervioso. Tómate un respiro, regula tu mente y cuerpo en pocos minutos con estas pausas conscientes."
  const path = "/neuropausa"
  const keywords = ["NEUROPAUSA", "Begoña Mental Reset", "BMR", "Neuropausa", "Pausa", "Consciente"]
  const openGraph = {
    title: title,
    description: description,
  }
  const heroPath = "/content/programNeuropausa/hero.png"
  const activities = [
    {
      id: 1,
      title: "Pausa 1",
      path: "pausa-1"
    },
  ]
  return <ProgramPanel title={title} description={description} keywords={keywords} activities={activities} heroPath={heroPath} />
}