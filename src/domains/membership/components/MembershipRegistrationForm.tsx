'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Loader2 } from 'lucide-react'

interface MembershipLevel {
    id: string
    title: string
    price: string
    period: string
    description: string
    popular?: boolean
}

interface FormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    membershipType: string
    acceptTerms: boolean
    acceptPrivacy: boolean
}

interface MembershipRegistrationFormProps {
    selectedMembership: MembershipLevel
    onSuccess?: (sessionUrl: string) => void
    onError?: (error: string) => void
}

const MembershipRegistrationForm: React.FC<MembershipRegistrationFormProps> = ({
    selectedMembership,
    onSuccess,
    onError,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            membershipType: selectedMembership.id,
            acceptTerms: false,
            acceptPrivacy: false,
        },
    })

    const password = watch('password')

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setError(null)

        try {
            // Validaciones adicionales
            if (data.password !== data.confirmPassword) {
                throw new Error('Las contraseñas no coinciden')
            }

            if (!data.acceptTerms || !data.acceptPrivacy) {
                throw new Error('Debes aceptar los términos y condiciones y la política de privacidad')
            }

            // Paso 1: Registrar usuario en Payload (opcional, se puede hacer en el webhook)
            let userId = null
            try {
                const registerResponse = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        name: data.name,
                    }),
                })

                if (registerResponse.ok) {
                    const registerData = await registerResponse.json()
                    userId = registerData.user?.id
                }
                // Si el usuario ya existe, continuamos con el checkout
            } catch (registerError) {
                console.log('Usuario podría ya existir, continuando con checkout...')
            }

            // Paso 2: Crear sesión de checkout con Stripe
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    membershipType: data.membershipType,
                    email: data.email,
                    name: data.name,
                    userId: userId,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al procesar el pago')
            }

            const { url } = await response.json()

            if (url) {
                // Redirigir a Stripe Checkout
                if (onSuccess) {
                    onSuccess(url)
                } else {
                    window.location.href = url
                }
            } else {
                throw new Error('No se pudo crear la sesión de pago')
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
            setError(errorMessage)
            if (onError) {
                onError(errorMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Registro para {selectedMembership.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                        {selectedMembership.description}
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-center">
                            <span className="text-3xl font-bold text-blue-600">
                                {selectedMembership.price}
                            </span>
                            <span className="text-gray-600 ml-2">
                                {selectedMembership.period}
                            </span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Información Personal */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>

                            <div>
                                <Label htmlFor="name">Nombre Completo *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    {...register('name', {
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'El nombre debe tener al menos 2 caracteres',
                                        },
                                    })}
                                    className={errors.name ? 'border-red-500' : ''}
                                    placeholder="Tu nombre completo"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Correo Electrónico *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: 'El correo electrónico es requerido',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Correo electrónico no válido',
                                        },
                                    })}
                                    className={errors.email ? 'border-red-500' : ''}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Seguridad</h3>

                            <div>
                                <Label htmlFor="password">Contraseña *</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'La contraseña es requerida',
                                        minLength: {
                                            value: 8,
                                            message: 'La contraseña debe tener al menos 8 caracteres',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
                                        },
                                    })}
                                    className={errors.password ? 'border-red-500' : ''}
                                    placeholder="Mínimo 8 caracteres"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Confirma tu contraseña',
                                        validate: (value) =>
                                            value === password || 'Las contraseñas no coinciden',
                                    })}
                                    className={errors.confirmPassword ? 'border-red-500' : ''}
                                    placeholder="Repite tu contraseña"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Términos y Condiciones */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Términos y Condiciones</h3>

                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="acceptTerms"
                                    {...register('acceptTerms', {
                                        required: 'Debes aceptar los términos y condiciones',
                                    })}
                                    onCheckedChange={(checked) => setValue('acceptTerms', checked === true)}
                                />
                                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                                    Acepto los{' '}
                                    <a href="/terminos" target="_blank" className="text-blue-600 hover:underline">
                                        términos y condiciones
                                    </a>{' '}
                                    de uso de la plataforma BMR.
                                </Label>
                            </div>
                            {errors.acceptTerms && (
                                <p className="text-red-500 text-sm flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.acceptTerms.message}
                                </p>
                            )}

                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="acceptPrivacy"
                                    {...register('acceptPrivacy', {
                                        required: 'Debes aceptar la política de privacidad',
                                    })}
                                    onCheckedChange={(checked) => setValue('acceptPrivacy', checked === true)}
                                />
                                <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                                    Acepto la{' '}
                                    <a href="/privacidad" target="_blank" className="text-blue-600 hover:underline">
                                        política de privacidad
                                    </a>{' '}
                                    y el tratamiento de mis datos personales.
                                </Label>
                            </div>
                            {errors.acceptPrivacy && (
                                <p className="text-red-500 text-sm flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.acceptPrivacy.message}
                                </p>
                            )}
                        </div>

                        {/* Error General */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Botón de Envío */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                `Proceder al Pago - ${selectedMembership.price}`
                            )}
                        </Button>

                        {/* Información de Seguridad */}
                        <div className="text-center text-sm text-gray-600 mt-4">
                            <p>
                                🔒 Pago seguro procesado por Stripe. Tu información está protegida.
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default MembershipRegistrationForm