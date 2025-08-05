import React from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ContactForm from './ContactForm'

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-4 py-20 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Contacta con <span className="text-green-300">BMR</span>
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 opacity-90">
                            Estamos aquí para ayudarte en tu proceso de transformación mental
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                                <Mail className="w-5 h-5 mr-2" />
                                Enviar mensaje
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                                <Phone className="w-5 h-5 mr-2" />
                                Llamar ahora
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Formas de contacto
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Elige la forma que más te convenga para ponerte en contacto con nosotros
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {/* Email */}
                            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                <p className="text-sm text-gray-600 mb-3">Respuesta en 24h</p>
                                <a
                                    href="mailto:info@begonamentalreset.com"
                                    className="text-green-600 hover:text-green-700 font-medium"
                                >
                                    info@begonamentalreset.com
                                </a>
                            </Card>

                            {/* Phone */}
                            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                                <p className="text-sm text-gray-600 mb-3">Lun - Vie 9:00-18:00</p>
                                <a
                                    href="tel:+34600000000"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    +34 600 000 000
                                </a>
                            </Card>

                            {/* WhatsApp */}
                            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                                <p className="text-sm text-gray-600 mb-3">Respuesta inmediata</p>
                                <a
                                    href="https://wa.me/34600000000"
                                    className="text-green-600 hover:text-green-700 font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Enviar mensaje
                                </a>
                            </Card>

                            {/* Location */}
                            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                                <p className="text-sm text-gray-600 mb-3">Consulta presencial</p>
                                <p className="text-purple-600 font-medium">
                                    Madrid, España
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Envíanos un mensaje
                            </h2>
                            <p className="text-lg text-gray-600">
                                Cuéntanos cómo podemos ayudarte en tu proceso de transformación
                            </p>
                        </div>

                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Preguntas frecuentes
                            </h2>
                            <p className="text-lg text-gray-600">
                                Resolvemos las dudas más comunes sobre nuestros servicios
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    ¿Cuánto tiempo dura una sesión?
                                </h3>
                                <p className="text-gray-600">
                                    Cada sesión tiene una duración de 60 minutos. Este tiempo nos permite trabajar
                                    de manera profunda y efectiva en tu proceso de transformación mental.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    ¿Realizan consultas online?
                                </h3>
                                <p className="text-gray-600">
                                    Sí, ofrecemos consultas tanto presenciales como online a través de videoconferencia.
                                    Esto nos permite llegar a personas de cualquier ubicación geográfica.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    ¿Cuál es el precio de las sesiones?
                                </h3>
                                <p className="text-gray-600">
                                    Los precios varían según el tipo de consulta y la modalidad (presencial u online).
                                    Contáctanos para recibir información detallada sobre tarifas y paquetes disponibles.
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    ¿Con qué antelación debo reservar una cita?
                                </h3>
                                <p className="text-gray-600">
                                    Recomendamos reservar con al menos una semana de antelación, aunque en casos
                                    urgentes intentamos encontrar hueco lo antes posible.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <Heart className="w-16 h-16 mx-auto mb-6 text-green-300" />
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Comienza tu transformación hoy
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            El primer paso hacia una vida más plena y equilibrada está a solo un clic de distancia
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                                <Phone className="w-5 h-5 mr-2" />
                                Reservar primera cita
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage