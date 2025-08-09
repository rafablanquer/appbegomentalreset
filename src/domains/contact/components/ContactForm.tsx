'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { getClientSideURL } from '@/utilities/getURL'

const CONTACT_FORM_ID = process.env.NEXT_PUBLIC_CONTACT_FORM_ID

interface ContactFormData {
    name: string
    email: string
    message: string
    acceptPrivacy: boolean
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
        setValue,
    } = useForm<ContactFormData>({
        defaultValues: {
            acceptPrivacy: false,
        },
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            // Verificar consentimiento de privacidad
            if (!data.acceptPrivacy) {
                throw new Error('Debes aceptar la política de privacidad para continuar')
            }

            // Verificar ID de formulario configurado
            if (!CONTACT_FORM_ID) {
                throw new Error('Falta configurar NEXT_PUBLIC_CONTACT_FORM_ID con el ID del formulario de contacto en Payload')
            }
            const parsedFormId = Number(CONTACT_FORM_ID)
            if (!Number.isFinite(parsedFormId)) {
                throw new Error('NEXT_PUBLIC_CONTACT_FORM_ID debe ser un número válido (ID del formulario en Payload)')
            }

            // Preparar los datos para el formulario de Payload
            const formData = [
                { field: 'name', value: data.name },
                { field: 'email', value: data.email },
                { field: 'message', value: data.message },
            ]

            const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form: parsedFormId,
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
            <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-4">
                    ¡Mensaje enviado con éxito!
                </h3>
                <p className="text-black mb-6">
                    Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                >
                    Enviar otro mensaje
                </button>
            </div>
        )
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                {/* Nombre */}
                <div className="w-full">
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        {...register('name', {
                            required: 'El nombre es obligatorio',
                            minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                        })}
                        className="w-full p-4 text-base border border-gray-300 rounded-lg bg-gray-200 placeholder-gray-600 text-black"
                    />
                    {errors.name && (
                        <div className="bg-red-500 text-white p-2 rounded-md mt-2 text-sm flex items-center">
                            <span className="mr-2">⚠️</span>
                            {errors.name.message}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="w-full">
                    <input
                        id="email"
                        type="email"
                        placeholder="Dirección de correo electrónico"
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido'
                            }
                        })}
                        className="w-full p-4 text-base border border-gray-300 rounded-lg bg-gray-200 placeholder-gray-600 text-black"
                    />
                    {errors.email && (
                        <div className="bg-red-500 text-white p-2 rounded-md mt-2 text-sm flex items-center">
                            <span className="mr-2">⚠️</span>
                            {errors.email.message}
                        </div>
                    )}
                </div>


                <div className="w-full">
                    <textarea
                        id="message"
                        placeholder="Mensaje"
                        rows={8}
                        {...register('message', {
                            required: 'El mensaje es obligatorio',
                            minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' }
                        })}
                        className="w-full p-4 text-base border border-gray-300 rounded-lg bg-gray-200 placeholder-gray-600 text-black resize-none"
                    />
                    {errors.message && (
                        <div className="bg-red-500 text-white p-2 rounded-md mt-2 text-sm flex items-center">
                            <span className="mr-2">⚠️</span>
                            {errors.message.message}
                        </div>
                    )}
                </div>



                {/* Consentimiento de Privacidad */}
                <div className="flex items-start space-x-3">
                    <Checkbox
                        id="acceptPrivacy"
                        {...register('acceptPrivacy', {
                            required: 'Debes aceptar la política de privacidad',
                        })}
                        onCheckedChange={(checked) => setValue('acceptPrivacy', checked === true)}
                    />
                    <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed text-black">
                        Acepto la{' '}
                        <a href="/privacidad" target="_blank" className="text-blue-600 hover:underline font-medium">
                            política de privacidad
                        </a>{' '}
                        y el tratamiento de mis datos personales para responder a mi consulta.
                    </Label>
                </div>
                {errors.acceptPrivacy && (
                    <div className="bg-red-500 text-white p-2 rounded-md text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        {errors.acceptPrivacy.message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded-md text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="flex justify-end w-full">
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{ backgroundColor: '#4f6fb5' }}
                        className="hover:opacity-90 text-white px-8 py-3 rounded-full disabled:opacity-50 font-medium text-base"
                    >
                        {isLoading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm