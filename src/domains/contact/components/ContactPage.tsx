import React from 'react'
import ContactForm from './ContactForm'

const ContactPage = () => {
    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: '#f5f5dc' }}>
            {/* Imagen de header */}
            <div className="w-full">
                <img
                    src="/assets/home/branding-Begona-BMR-1-1.png"
                    alt="BMR Contact"
                    className="w-full h-64 object-cover"
                />
            </div>

            {/* Sección de contacto */}
            <div className="w-full px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-black mb-2">
                        CONTACTAR CON BMR
                    </h1>
                    <p className="text-base text-black">
                        Si tienes alguna duda contacta con nosotros
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactPage