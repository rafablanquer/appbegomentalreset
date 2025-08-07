'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

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
        title: 'Pago mensual  ',
        price: '14.97€',
        period: 'por Mes',
        description: 'Perfecto para comenzar tu transformación'
    },
    {
        id: 'quarterly',
        title: 'Pago trimestral  ',
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

const LandingMembresiasPage = () => {
    const handleSelectPlan = (levelId: string) => {
        // Aquí se integraría con el sistema de pagos de Payload
        console.log(`Seleccionado plan: ${levelId}`)
        // Redirección a página de pago o apertura de modal de pago
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Niveles de Membresía
                    </h1>
                    <p className="text-xl md:text-2xl mb-2 text-blue-100">
                        Elige el plan perfecto para tu viaje de transformación mental
                    </p>

                </div>
            </div>

            {/* Membership Cards */}
            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {membershipLevels.map((level, index) => (
                        <Card
                            key={level.id}
                            className={`relative transition-all duration-300 hover:shadow-2xl ${level.popular
                                ? 'ring-2 ring-blue-500 transform scale-105 shadow-xl'
                                : 'hover:scale-105'
                                }`}
                        >
                            {level.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Más Popular
                                    </span>
                                </div>
                            )}

                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                                    {level.title}
                                </CardTitle>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-blue-600">{level.price}</span>
                                    <span className="text-gray-600 ml-2">{level.period}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{level.description}</p>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <Button
                                    onClick={() => handleSelectPlan(level.id)}
                                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${level.popular
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg'
                                        : 'bg-gray-800 hover:bg-gray-900'
                                        }`}
                                >
                                    Seleccionar Plan
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default LandingMembresiasPage