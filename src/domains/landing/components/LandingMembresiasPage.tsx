'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import MembershipPricing from '@/domains/membership/components/MembershipPricing'

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

interface LandingMembresiasPageProps {
    onMembershipSelect?: (levelId: string) => void
}

const LandingMembresiasPage: React.FC<LandingMembresiasPageProps> = ({ onMembershipSelect }) => {
    const handleSelectPlan = (levelId: string) => {
        if (onMembershipSelect) {
            onMembershipSelect(levelId)
        } else {
            // Redirección por defecto a la página de pago
            window.location.href = `/pago-de-membresia?type=${levelId}`
        }
    }

    return (
        <div className="min-h-screen" style={{
            backgroundColor: "rgb(249, 241, 230)",
        }}>
            <MembershipPricing onSelect={(id) => handleSelectPlan(id)} />
        </div>
    )
}

export default LandingMembresiasPage