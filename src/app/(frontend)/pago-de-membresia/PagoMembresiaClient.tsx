'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MembershipRegistrationForm from '@/domains/membership/components/MembershipRegistrationForm'
import LandingMembresiasPage from '@/domains/landing/components/LandingMembresiasPage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

interface MembershipLevel {
    id: string
    title: string
    price: string
    period: string
    description: string
    popular?: boolean
}

const membershipLevels: MembershipLevel[] = [
    {
        id: 'monthly',
        title: 'Pago mensual',
        price: '14.97€',
        period: 'por Mes',
        description: 'Perfecto para comenzar tu transformación'
    },
    {
        id: 'quarterly',
        title: 'Pago trimestral',
        price: '37.97€',
        period: 'cada 3 Meses',
        description: 'El plan más popular para un compromiso serio',
        popular: true
    },
    {
        id: 'annual',
        title: 'Pago anual',
        price: '127.97€',
        period: 'por Año',
        description: 'La mejor inversión para tu transformación completa',
    }
]

const PagoMembresiaClient: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [selectedMembership, setSelectedMembership] = useState<MembershipLevel | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showCancelled, setShowCancelled] = useState(false)

    useEffect(() => {
        // Verificar si hay parámetros de éxito o cancelación
        if (searchParams.get('success') === 'true') {
            setShowSuccess(true)
            return
        }

        if (searchParams.get('cancelled') === 'true') {
            setShowCancelled(true)
            return
        }

        // Obtener el tipo de membresía seleccionada de los parámetros URL
        const membershipType = searchParams.get('type')
        if (membershipType) {
            const membership = membershipLevels.find(level => level.id === membershipType)
            if (membership) {
                setSelectedMembership(membership)
            }
        }
    }, [searchParams])

    const handleMembershipSelect = (membershipId: string) => {
        const membership = membershipLevels.find(level => level.id === membershipId)
        if (membership) {
            setSelectedMembership(membership)
            // Actualizar URL con el tipo seleccionado
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.set('type', membershipId)
            window.history.replaceState({}, '', newUrl.toString())
        }
    }

    const handleBackToSelection = () => {
        setSelectedMembership(null)
        setShowSuccess(false)
        setShowCancelled(false)
        // Limpiar parámetros URL
        const newUrl = new URL(window.location.href)
        newUrl.search = ''
        window.history.replaceState({}, '', newUrl.toString())
    }

    const handleRegistrationSuccess = (sessionUrl: string) => {
        // Redirigir a Stripe Checkout
        window.location.href = sessionUrl
    }

    const handleRegistrationError = (error: string) => {
        console.error('Error en el registro:', error)
        // Aquí podrías mostrar un toast o notificación
    }

    // Mostrar página de éxito
    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full shadow-lg">
                    <CardContent className="p-8 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            ¡Pago Exitoso!
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Tu membresía ha sido activada correctamente. Ya puedes acceder a todo el contenido de la plataforma BMR.
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={() => router.push('/perfil')}
                                className="w-full bg-green-600 hover:bg-green-700"
                            >
                                Ir a Mi Perfil
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push('/home-app')}
                                className="w-full"
                            >
                                Explorar Contenido
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Mostrar página de cancelación
    if (showCancelled) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full shadow-lg">
                    <CardContent className="p-8 text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Pago Cancelado
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            No se ha procesado ningún pago. Puedes intentar nuevamente cuando estés listo.
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={handleBackToSelection}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Intentar Nuevamente
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.push('/')}
                                className="w-full"
                            >
                                Volver al Inicio
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Mostrar formulario de registro si hay membresía seleccionada
    if (selectedMembership) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-4 py-8">
                    <Button
                        variant="ghost"
                        onClick={handleBackToSelection}
                        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a la selección de planes
                    </Button>

                    <MembershipRegistrationForm
                        selectedMembership={selectedMembership}
                        onSuccess={handleRegistrationSuccess}
                        onError={handleRegistrationError}
                    />
                </div>
            </div>
        )
    }

    // Mostrar selección de membresías (página por defecto)
    return (
        <div className="min-h-screen">
            <LandingMembresiasPage onMembershipSelect={handleMembershipSelect} />
        </div>
    )
}

export default PagoMembresiaClient