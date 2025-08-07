import { Metadata } from 'next'
import { Suspense } from 'react'
import PagoMembresiaClient from './PagoMembresiaClient'

export const metadata: Metadata = {
    title: 'Pago de Membresía - BMR - Begoña Mental Reset',
    description: 'Completa tu registro y pago para acceder a la plataforma BMR. Proceso seguro y rápido.',
    keywords: ['pago', 'membresía', 'BMR', 'Begoña Mental Reset', 'suscripción', 'registro'],
    openGraph: {
        title: 'Pago de Membresía - BMR - Begoña Mental Reset',
        description: 'Completa tu registro y pago para acceder a la plataforma BMR. Proceso seguro y rápido.',
        type: 'website',
        locale: 'es_ES',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pago de Membresía - BMR - Begoña Mental Reset',
        description: 'Completa tu registro y pago para acceder a la plataforma BMR. Proceso seguro y rápido.',
    },
    alternates: {
        canonical: '/pago-de-membresia',
    },
}

export default function PagoMembresiaPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Cargando...</div>}>
            <PagoMembresiaClient />
        </Suspense>
    )
}