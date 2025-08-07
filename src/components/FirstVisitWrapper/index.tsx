'use client'

import React from 'react'
import { WarningModal } from '@/components/WarningModal'
import { useFirstVisit } from '@/hooks/useFirstVisit'

interface FirstVisitWrapperProps {
    children: React.ReactNode
}

export const FirstVisitWrapper: React.FC<FirstVisitWrapperProps> = ({ children }) => {
    const { isFirstVisit, isLoading, markAsVisited } = useFirstVisit()

    const handleModalClose = () => {
        markAsVisited()
    }

    // Mostrar children mientras se carga para evitar flash de contenido
    if (isLoading) {
        return <>{children}</>
    }

    return (
        <>
            {children}
            <WarningModal
                isOpen={isFirstVisit}
                onClose={handleModalClose}
            />
        </>
    )
}

export default FirstVisitWrapper