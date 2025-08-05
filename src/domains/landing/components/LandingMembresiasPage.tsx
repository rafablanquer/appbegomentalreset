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
    features: string[]
    popular?: boolean
}

const membershipLevels: MembershipLevel[] = [
    {
        id: 'monthly',
        title: 'Pago mensual nuevos usuarios',
        price: '14.97€',
        period: 'por Mes',
        description: 'Perfecto para comenzar tu transformación',
        features: [
            'Acceso completo a Neurodespertar',
            'Herramientas de Neuropausa',
            'Reprogramación nocturna',
            'Respiraciones conscientes',
            'Reto 21 Días',
            'Soporte de la comunidad'
        ]
    },
    {
        id: 'quarterly',
        title: 'Pago trimestral nuevos usuarios',
        price: '37.97€',
        period: 'cada 3 Meses',
        description: 'El plan más popular para un compromiso serio',
        features: [
            'Todo lo del plan mensual',
            'Descuento del 15%',
            'Acceso prioritario a nuevos contenidos',
            'Sesiones grupales exclusivas',
            'Material adicional de refuerzo'
        ],
        popular: true
    },
    {
        id: 'annual',
        title: 'Pago anual nuevos usuarios',
        price: '127.97€',
        period: 'por Año',
        description: 'La mejor inversión para tu transformación completa',
        features: [
            'Todo lo del plan trimestral',
            'Máximo descuento (29%)',
            'Consultas 1:1 mensuales',
            'Acceso de por vida a materiales base',
            'Certificado de finalización',
            'Programa de mentorías'
        ]
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Niveles de Membresía
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Elige el plan perfecto para tu viaje de transformación mental
                    </p>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                        Únete a miles de personas que ya han transformado su vida con BMR - Begoña Mental Reset
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
                                <ul className="space-y-3 mb-8">
                                    {level.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start space-x-3">
                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

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

                {/* Additional Information */}
                <div className="mt-16 text-center">
                    <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            ¿Por qué elegir BMR?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Transformación Mental</h4>
                                <p className="text-gray-600 text-sm">
                                    Programa científicamente diseñado para reprogramar tu mente
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⏰</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Flexibilidad Total</h4>
                                <p className="text-gray-600 text-sm">
                                    Accede desde cualquier lugar, a tu propio ritmo
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Comunidad de Apoyo</h4>
                                <p className="text-gray-600 text-sm">
                                    Conecta con personas en tu mismo viaje de transformación
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Preguntas Frecuentes
                    </h3>
                    <div className="space-y-4">
                        <details className="bg-white rounded-lg shadow-md">
                            <summary className="p-6 cursor-pointer font-semibold text-gray-800 hover:text-blue-600">
                                ¿Puedo cancelar mi suscripción en cualquier momento?
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Sí, puedes cancelar tu suscripción en cualquier momento desde tu cuenta de usuario.
                                No hay penalizaciones ni cargos adicionales.
                            </div>
                        </details>

                        <details className="bg-white rounded-lg shadow-md">
                            <summary className="p-6 cursor-pointer font-semibold text-gray-800 hover:text-blue-600">
                                ¿Qué incluye exactamente cada plan?
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Cada plan incluye acceso completo a todas las herramientas principales de BMR.
                                Los planes más largos ofrecen beneficios adicionales como descuentos y contenido exclusivo.
                            </div>
                        </details>

                        <details className="bg-white rounded-lg shadow-md">
                            <summary className="p-6 cursor-pointer font-semibold text-gray-800 hover:text-blue-600">
                                ¿Hay garantía de devolución?
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                Ofrecemos una garantía de satisfacción de 30 días. Si no estás completamente satisfecho,
                                te devolvemos tu dinero sin preguntas.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingMembresiasPage