'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Settings, Cookie, Shield, BarChart3, Palette } from 'lucide-react'

interface CookiePreferences {
    essential: boolean
    analytics: boolean
    functionality: boolean
    marketing: boolean
}

const defaultPreferences: CookiePreferences = {
    essential: true, // Siempre true, no se puede desactivar
    analytics: false,
    functionality: false,
    marketing: false,
}

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

    useEffect(() => {
        // Verificar si ya se han establecido las preferencias de cookies
        const cookieConsent = localStorage.getItem('cookie-consent')
        if (!cookieConsent) {
            setIsVisible(true)
        }
    }, [])

    const saveCookiePreferences = (prefs: CookiePreferences) => {
        const consentData = {
            preferences: prefs,
            timestamp: new Date().toISOString(),
            version: '1.0'
        }

        localStorage.setItem('cookie-consent', JSON.stringify(consentData))

        // Aplicar las preferencias inmediatamente
        applyCookiePreferences(prefs)

        setIsVisible(false)
    }

    const applyCookiePreferences = (prefs: CookiePreferences) => {
        // Configurar Google Analytics si está permitido
        if (prefs.analytics && typeof window !== 'undefined') {
            // Aquí iría la configuración de Google Analytics
            console.log('Analytics cookies enabled')
        }

        // Configurar cookies de funcionalidad
        if (prefs.functionality) {
            console.log('Functionality cookies enabled')
        }

        // Configurar cookies de marketing (futuro)
        if (prefs.marketing) {
            console.log('Marketing cookies enabled')
        }
    }

    const handleAcceptAll = () => {
        const allAccepted: CookiePreferences = {
            essential: true,
            analytics: true,
            functionality: true,
            marketing: false, // Por ahora no hay cookies de marketing
        }
        saveCookiePreferences(allAccepted)
    }

    const handleRejectNonEssential = () => {
        saveCookiePreferences(defaultPreferences)
    }

    const handleSavePreferences = () => {
        saveCookiePreferences(preferences)
    }

    const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
        if (key === 'essential') return // No se puede desactivar las esenciales

        setPreferences(prev => ({
            ...prev,
            [key]: value
        }))
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                <CardContent className="p-6">
                    {!showSettings ? (
                        // Vista principal del banner
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Cookie className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h2 className="text-xl font-semibold">Configuración de Cookies</h2>
                                        <p className="text-sm text-gray-600">Respetamos su privacidad</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-700">
                                    Utilizamos cookies para mejorar su experiencia, proporcionar funcionalidades
                                    esenciales y analizar el uso de nuestro sitio web. Puede elegir qué tipos
                                    de cookies acepta.
                                </p>

                                <div className="grid sm:grid-cols-3 gap-3">
                                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-sm">Esenciales</p>
                                            <p className="text-xs text-gray-600">Siempre activas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                        <BarChart3 className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium text-sm">Analytics</p>
                                            <p className="text-xs text-gray-600">Opcional</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                                        <Palette className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <p className="font-medium text-sm">Funcionalidad</p>
                                            <p className="text-xs text-gray-600">Opcional</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                <Button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    Aceptar Todas
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleRejectNonEssential}
                                    className="flex-1"
                                >
                                    Solo Esenciales
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSettings(true)}
                                    className="flex-1"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Personalizar
                                </Button>
                            </div>

                            <div className="text-xs text-gray-500 space-y-1">
                                <p>
                                    Para más información, consulte nuestra{' '}
                                    <a href="/cookies" className="text-blue-600 hover:underline">
                                        Política de Cookies
                                    </a>{' '}
                                    y{' '}
                                    <a href="/privacidad" className="text-blue-600 hover:underline">
                                        Política de Privacidad
                                    </a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Vista detallada de configuración
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Configuración Detallada de Cookies</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowSettings(false)}
                                >
                                    Volver
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Cookies Esenciales */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-6 h-6 text-green-600" />
                                            <div>
                                                <h3 className="font-semibold">Cookies Esenciales</h3>
                                                <p className="text-sm text-gray-600">Necesarias para el funcionamiento básico</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={true}
                                                disabled={true}
                                                className="opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-500">Siempre activas</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>• Autenticación y gestión de sesiones</p>
                                        <p>• Seguridad y protección CSRF</p>
                                        <p>• Funcionalidad básica del sitio web</p>
                                        <p>• Procesamiento de pagos con Stripe</p>
                                    </div>
                                </div>

                                {/* Cookies de Analytics */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <BarChart3 className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <h3 className="font-semibold">Cookies de Analytics</h3>
                                                <p className="text-sm text-gray-600">Nos ayudan a mejorar el sitio web</p>
                                            </div>
                                        </div>
                                        <Checkbox
                                            checked={preferences.analytics}
                                            onCheckedChange={(checked) =>
                                                handlePreferenceChange('analytics', checked === true)
                                            }
                                        />
                                    </div>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>• Google Analytics para análisis de tráfico</p>
                                        <p>• Métricas de rendimiento del sitio</p>
                                        <p>• Análisis de contenido más popular</p>
                                        <p>• Datos anónimos y agregados</p>
                                    </div>
                                </div>

                                {/* Cookies de Funcionalidad */}
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Palette className="w-6 h-6 text-purple-600" />
                                            <div>
                                                <h3 className="font-semibold">Cookies de Funcionalidad</h3>
                                                <p className="text-sm text-gray-600">Mejoran su experiencia de usuario</p>
                                            </div>
                                        </div>
                                        <Checkbox
                                            checked={preferences.functionality}
                                            onCheckedChange={(checked) =>
                                                handlePreferenceChange('functionality', checked === true)
                                            }
                                        />
                                    </div>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>• Recordar preferencias de tema (oscuro/claro)</p>
                                        <p>• Progreso en programas y contenidos</p>
                                        <p>• Configuraciones personalizadas</p>
                                        <p>• Recomendaciones de contenido</p>
                                    </div>
                                </div>

                                {/* Cookies de Marketing (Futuras) */}
                                <div className="border rounded-lg p-4 opacity-60">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                            <div>
                                                <h3 className="font-semibold">Cookies de Marketing</h3>
                                                <p className="text-sm text-gray-600">No utilizadas actualmente</p>
                                            </div>
                                        </div>
                                        <Checkbox
                                            checked={false}
                                            disabled={true}
                                            className="opacity-50"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>• Actualmente no utilizamos cookies de marketing</p>
                                        <p>• Si las implementamos en el futuro, solicitaremos consentimiento</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                <Button
                                    onClick={handleSavePreferences}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    Guardar Preferencias
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleAcceptAll}
                                    className="flex-1"
                                >
                                    Aceptar Todas
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}