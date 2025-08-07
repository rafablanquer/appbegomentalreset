'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface WarningModalProps {
    isOpen: boolean
    onClose: () => void
}

export const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
    // Función para desarrolladores: agregar una función global para resetear el modal
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).resetWarningModal = () => {
                localStorage.removeItem('neurodespertar-first-visit')
                window.location.reload()
            }
        }
    }, [])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
                    <h2 className="text-xl font-semibold text-yellow-800">
                        ⚠️ Aviso Importante
                    </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p className="font-medium text-gray-900">
                            Esta aplicación no sustituye la atención profesional especializada.
                        </p>

                        <p>
                            Es una herramienta de acompañamiento en procesos de reprogramación mental.
                            Al continuar, aceptas que su uso no es de carácter médico ni terapéutico.
                        </p>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <p className="text-sm text-yellow-700">
                                <strong>Importante:</strong> Si experimentas problemas de salud mental,
                                consulta con un profesional de la salud calificado.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                    <Button
                        onClick={onClose}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg font-medium transition-colors"
                    >
                        Entendido
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WarningModal