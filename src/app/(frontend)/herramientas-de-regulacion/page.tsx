import { Metadata } from 'next'
import { RouteProtection } from '@/utilities/membership'
import ProtectedRoute from '@/components/ProtectedRoute'
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



function HerramientasContent() {
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
      title: "MEDITACIÓN AUTOEXIGENCIA Y ANSIEDAD",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Esta pausa te ayuda a liberar la presión de hacerlo todo perfecto y a reconectar con tu valor más allá del rendimiento."
    }, {
      id: 2,
      title: "VISUALIZA TU NUEVA IDENTIDAD",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Conecta con tu versión más auténtica y empieza a vivir como ella desde hoy"
    },
    {
      id: 3,
      title: "TU ORÁCULO",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Recibe una guía interior inmediata para tomar decisiones con claridad y confianza."
    },
    {
      id: 4,
      title: "REPROGRAMA TU PRODUCTIVIDAD",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Activa tu enfoque y libera bloqueos mentales para avanzar con ligereza."
    },
    {
      id: 5,
      title: "FRECUENCIA ALFA Y DE AGRADECIMIENTO",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Cambia tu estado mental en minutos y eleva tu energía desde la gratitud."
    },
    {
      id: 6,
      title: "CONSTRUYE RELACIONES POSITIVAS",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Reprograma tu forma de relacionarte entrenando el cerebro para crear vínculos sanos, auténticos y seguros."
    },
    {
      id: 7,
      title: "ESCANEO CORPORAL",
      path: "meditacion-autoexigencia-ansiedad",
      description: "Reconecta con tu cuerpo, detecta puntos de tensión y restablece el equilibrio físico y mental desde la calma."
    }
  ]
  return <ProgramPanel title={title} description={description} keywords={keywords} activities={activities} heroPath={heroPath} />
}

export default function HerramientasDeRegulacionPage() {
  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <HerramientasContent />
    </ProtectedRoute>
  )
}


