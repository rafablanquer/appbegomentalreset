import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Política de Privacidad - BMR',
    description: 'Política de privacidad y protección de datos de Begoña Mental Reset',
}

export default function PrivacyPolicyPage() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

                <p className="text-gray-600 mb-8">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Información General</h2>
                        <p>
                            Begoña Mental Reset ("nosotros", "nuestro" o "BMR") respeta su privacidad y se compromete
                            a proteger sus datos personales. Esta política de privacidad le informa sobre cómo
                            recopilamos, utilizamos y protegemos su información cuando utiliza nuestro sitio web
                            y servicios de membresía.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Responsable del Tratamiento</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Responsable:</strong> Begoña Mental Reset</p>
                            <p><strong>Contacto:</strong> info@begonamentalreset.com</p>
                            <p><strong>Sitio web:</strong> begonamentalreset.com</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Datos que Recopilamos</h2>

                        <h3 className="text-xl font-medium mb-3">3.1 Datos de Registro y Cuenta</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Nombre completo</li>
                            <li>Dirección de correo electrónico</li>
                            <li>Contraseña (encriptada)</li>
                            <li>Tipo de membresía</li>
                            <li>Estado de membresía</li>
                            <li>Fechas de inicio y fin de membresía</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">3.2 Datos de Pago</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Información de facturación procesada por Stripe</li>
                            <li>ID de cliente de Stripe</li>
                            <li>ID de suscripción de Stripe</li>
                            <li>Historial de transacciones</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">3.3 Datos de Uso</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Progreso en programas y contenidos</li>
                            <li>Comentarios en publicaciones</li>
                            <li>Interacciones con el contenido</li>
                            <li>Datos de navegación y cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Base Legal y Finalidades del Tratamiento</h2>

                        <h3 className="text-xl font-medium mb-3">4.1 Ejecución del Contrato</h3>
                        <p>
                            Procesamos sus datos para proporcionarle acceso a nuestros servicios de membresía,
                            procesar pagos y gestionar su cuenta.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">4.2 Consentimiento</h3>
                        <p>
                            Para comunicaciones de marketing, cookies no esenciales y tratamientos especiales
                            de datos, obtenemos su consentimiento explícito.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">4.3 Interés Legítimo</h3>
                        <p>
                            Para mejorar nuestros servicios, realizar análisis de uso y garantizar la
                            seguridad de la plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Compartir Datos con Terceros</h2>

                        <h3 className="text-xl font-medium mb-3">5.1 Proveedores de Servicios</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Stripe:</strong> Procesamiento de pagos y gestión de suscripciones</li>
                            <li><strong>Servicios de hosting:</strong> Almacenamiento y entrega de contenido</li>
                            <li><strong>Servicios de email:</strong> Envío de comunicaciones</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">5.2 Requisitos Legales</h3>
                        <p>
                            Podemos divulgar información personal si es requerido por ley o para proteger
                            nuestros derechos legales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Transferencias Internacionales</h2>
                        <p>
                            Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del
                            Espacio Económico Europeo. Aseguramos que todas las transferencias cumplan con
                            las garantías adecuadas según el RGPD.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Retención de Datos</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Datos de cuenta:</strong> Mientras mantenga su cuenta activa</li>
                            <li><strong>Datos de pago:</strong> 7 años para cumplir obligaciones fiscales</li>
                            <li><strong>Datos de marketing:</strong> Hasta que retire su consentimiento</li>
                            <li><strong>Datos de cookies:</strong> Según se especifica en nuestra política de cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Sus Derechos (RGPD)</h2>
                        <p>Bajo el Reglamento General de Protección de Datos, usted tiene los siguientes derechos:</p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Acceso</h4>
                                <p className="text-sm">Solicitar una copia de sus datos personales</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Rectificación</h4>
                                <p className="text-sm">Corregir datos inexactos o incompletos</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Supresión</h4>
                                <p className="text-sm">Solicitar la eliminación de sus datos</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Portabilidad</h4>
                                <p className="text-sm">Recibir sus datos en formato estructurado</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Oposición</h4>
                                <p className="text-sm">Oponerse al procesamiento de sus datos</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Derecho de Limitación</h4>
                                <p className="text-sm">Restringir el procesamiento de sus datos</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Seguridad de los Datos</h2>
                        <p>
                            Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos
                            personales contra acceso no autorizado, alteración, divulgación o destrucción.
                            Esto incluye:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Encriptación de datos sensibles</li>
                            <li>Acceso restringido a datos personales</li>
                            <li>Monitoreo regular de seguridad</li>
                            <li>Formación del personal en protección de datos</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Cookies y Tecnologías Similares</h2>
                        <p>
                            Utilizamos cookies y tecnologías similares para mejorar su experiencia.
                            Para más información, consulte nuestra
                            <a href="/cookies" className="text-blue-600 hover:underline"> Política de Cookies</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Menores de Edad</h2>
                        <p>
                            Nuestros servicios están dirigidos a personas mayores de 16 años. No recopilamos
                            intencionalmente datos personales de menores de 16 años sin el consentimiento
                            parental verificable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">12. Cambios en esta Política</h2>
                        <p>
                            Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos
                            sobre cambios significativos por correo electrónico o mediante un aviso prominente
                            en nuestro sitio web.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">13. Contacto y Reclamaciones</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-3">Para ejercer sus derechos o hacer consultas:</h3>
                            <p><strong>Email:</strong> privacidad@begonamentalreset.com</p>
                            <p><strong>Respuesta:</strong> En un plazo máximo de 30 días</p>

                            <h3 className="font-semibold mb-3 mt-6">Autoridad de Control:</h3>
                            <p>
                                Si no está satisfecho con nuestra respuesta, puede presentar una reclamación
                                ante la Agencia Española de Protección de Datos (AEPD):
                            </p>
                            <p><strong>Web:</strong> www.aepd.es</p>
                            <p><strong>Sede electrónica:</strong> sedeagpd.gob.es</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}