'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { getClientSideURL } from '@/utilities/getURL'

interface ContactFormData {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    privacy: boolean
}

const ContactForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>()

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            // Preparar los datos para el formulario de Payload
            const formData = [
                { field: 'name', value: data.name },
                { field: 'email', value: data.email },
                { field: 'phone', value: data.phone || '' },
                { field: 'subject', value: data.subject },
                { field: 'message', value: data.message },
            ]

            const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form: 'contact-form', // ID del formulario en Payload
                    submissionData: formData,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Error al enviar el formulario')
            }

            setIsSubmitted(true)
            reset()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al enviar el formulario')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <Card className="p-8 lg:p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-gray-600 mb-6">
                    Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24 horas.
                </p>
                <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                >
                    Enviar otro mensaje
                </Button>
            </Card>
        )
    }

    return (
        <Card className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo *
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Tu nombre completo"
                            {...register('name', {
                                required: 'El nombre es obligatorio',
                                minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                            })}
                            className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            {...register('email', {
                                required: 'El email es obligatorio',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email inválido'
                                }
                            })}
                            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+34 600 000 000"
                            {...register('phone')}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Asunto *
                        </label>
                        <select
                            id="subject"
                            {...register('subject', { required: 'El asunto es obligatorio' })}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.subject ? 'border-red-500' : ''
                                }`}
                        >
                            <option value="">Selecciona un asunto</option>
                            <option value="consulta-general">Consulta general</option>
                            <option value="primera-cita">Primera cita</option>
                            <option value="seguimiento">Seguimiento</option>
                            <option value="informacion-precios">Información sobre precios</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        rows={6}
                        {...register('message', {
                            required: 'El mensaje es obligatorio',
                            minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                        })}
                        className={`w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        id="privacy"
                        {...register('privacy', { required: 'Debes aceptar la política de privacidad' })}
                        className={`mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${errors.privacy ? 'border-red-500' : ''
                            }`}
                    />
                    <div>
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                            He leído y acepto la{' '}
                            <a href="/politica-privacidad" className="text-green-600 hover:text-green-700 underline">
                                política de privacidad
                            </a>{' '}
                            y el tratamiento de mis datos personales *
                        </label>
                        {errors.privacy && (
                            <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="text-center">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Enviar mensaje
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default ContactForm