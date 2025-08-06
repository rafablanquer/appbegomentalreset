import React from 'react'
import ContactForm from './ContactForm'

const ContactPage = () => {
    return (
        <div className="min-h-screen w-full" style={{ backgroundColor: '#f5f5dc' }}>
            {/* Imagen de header */}
            <div className="w-full">
                <img
                    src="/assets/contact/hero-contact.png"
                    alt="BMR Contact"
                    className="w-full h-64 object-cover"
                />
            </div>

            {/* Sección de contacto */}
            <div className="w-full px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-wide"
                        style={{
                            fontFamily: 'Inter, Helvetica, Arial, Lucida, sans-serif',
                            lineHeight: '1.2',
                            letterSpacing: '0.02em',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
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