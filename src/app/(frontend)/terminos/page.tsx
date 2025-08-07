import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Términos y Condiciones - BMR',
    description: 'Términos y condiciones de uso de Begoña Mental Reset',
}

export default function TermsPage() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>

                <p className="text-gray-600 mb-8">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Información General</h2>
                        <p>
                            Estos términos y condiciones ("Términos") rigen el uso de la plataforma web y
                            servicios de Begoña Mental Reset ("BMR", "nosotros", "nuestro"). Al acceder
                            y utilizar nuestros servicios, usted acepta estar sujeto a estos Términos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Información de la Empresa</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Denominación:</strong> Begoña Mental Reset</p>
                            <p><strong>Sitio web:</strong> begonamentalreset.com</p>
                            <p><strong>Email de contacto:</strong> info@begonamentalreset.com</p>
                            <p><strong>Actividad:</strong> Servicios de bienestar mental y contenido digital</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Descripción de los Servicios</h2>
                        <p>
                            BMR ofrece una plataforma digital que proporciona:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Contenido educativo sobre bienestar mental y regulación emocional</li>
                            <li>Programas de meditación y respiración consciente</li>
                            <li>Herramientas de transformación nocturna y rutinas de enfoque</li>
                            <li>Retos de desarrollo personal (como el Reto 21 días)</li>
                            <li>Acceso a colecciones de respiraciones conscientes</li>
                            <li>Comunidad y comentarios en publicaciones</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Registro y Cuenta de Usuario</h2>

                        <h3 className="text-xl font-medium mb-3">4.1 Requisitos de Registro</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Debe ser mayor de 16 años</li>
                            <li>Proporcionar información veraz y actualizada</li>
                            <li>Mantener la confidencialidad de sus credenciales</li>
                            <li>Aceptar estos términos y nuestra política de privacidad</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">4.2 Responsabilidades del Usuario</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Es responsable de toda actividad en su cuenta</li>
                            <li>Debe notificar inmediatamente cualquier uso no autorizado</li>
                            <li>Mantener sus datos de contacto actualizados</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Membresías y Pagos</h2>

                        <h3 className="text-xl font-medium mb-3">5.1 Tipos de Membresía</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Mensual</h4>
                                <p className="text-sm">Renovación automática cada mes</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Trimestral</h4>
                                <p className="text-sm">Renovación automática cada 3 meses</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Anual</h4>
                                <p className="text-sm">Renovación automática cada año</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-medium mb-3 mt-6">5.2 Facturación y Pagos</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Los pagos se procesan a través de Stripe</li>
                            <li>Las suscripciones se renuevan automáticamente</li>
                            <li>Los precios incluyen impuestos aplicables</li>
                            <li>Los pagos son no reembolsables salvo lo establecido por ley</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">5.3 Cancelación</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Puede cancelar su suscripción en cualquier momento</li>
                            <li>La cancelación será efectiva al final del período de facturación actual</li>
                            <li>Mantendrá acceso hasta el final del período pagado</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Uso Aceptable</h2>

                        <h3 className="text-xl font-medium mb-3">6.1 Usos Permitidos</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Uso personal y no comercial del contenido</li>
                            <li>Participación respetuosa en la comunidad</li>
                            <li>Cumplimiento de todas las leyes aplicables</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">6.2 Usos Prohibidos</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Compartir credenciales de acceso</li>
                            <li>Copiar, distribuir o vender nuestro contenido</li>
                            <li>Hacer ingeniería inversa de la plataforma</li>
                            <li>Publicar contenido ofensivo, spam o ilegal</li>
                            <li>Interferir con el funcionamiento de la plataforma</li>
                            <li>Crear cuentas falsas o automatizadas</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Propiedad Intelectual</h2>

                        <h3 className="text-xl font-medium mb-3">7.1 Contenido de BMR</h3>
                        <p>
                            Todo el contenido de la plataforma (textos, imágenes, videos, audio, programas)
                            es propiedad de BMR y está protegido por derechos de autor y otras leyes de
                            propiedad intelectual.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">7.2 Licencia de Uso</h3>
                        <p>
                            Le otorgamos una licencia limitada, no exclusiva, no transferible para acceder
                            y usar el contenido únicamente para su uso personal mientras mantenga una
                            membresía activa.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">7.3 Contenido del Usuario</h3>
                        <p>
                            Al publicar comentarios o contenido, nos otorga una licencia para usar,
                            modificar y mostrar dicho contenido en relación con nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Privacidad y Protección de Datos</h2>
                        <p>
                            El tratamiento de sus datos personales se rige por nuestra
                            <a href="/privacidad" className="text-blue-600 hover:underline"> Política de Privacidad</a>,
                            que forma parte integral de estos Términos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Disponibilidad del Servicio</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Nos esforzamos por mantener la plataforma disponible 24/7</li>
                            <li>Puede haber interrupciones por mantenimiento programado</li>
                            <li>No garantizamos disponibilidad ininterrumpida</li>
                            <li>Nos reservamos el derecho a modificar o discontinuar servicios</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Limitación de Responsabilidad</h2>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">⚠️ Aviso Importante</h3>
                            <p className="text-sm">
                                Nuestros servicios son para fines educativos y de bienestar general.
                                No constituyen asesoramiento médico, psicológico o terapéutico profesional.
                            </p>
                        </div>

                        <h3 className="text-xl font-medium mb-3 mt-6">10.1 Exención de Garantías</h3>
                        <p>
                            Los servicios se proporcionan "tal como están" sin garantías de ningún tipo.
                            No garantizamos resultados específicos del uso de nuestros programas.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">10.2 Limitación de Daños</h3>
                        <p>
                            En ningún caso seremos responsables de daños indirectos, incidentales,
                            especiales o consecuentes que surjan del uso de nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Suspensión y Terminación</h2>

                        <h3 className="text-xl font-medium mb-3">11.1 Suspensión por Incumplimiento</h3>
                        <p>
                            Podemos suspender o terminar su acceso si viola estos Términos,
                            incluyendo pero no limitado a:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Uso no autorizado del contenido</li>
                            <li>Comportamiento disruptivo en la comunidad</li>
                            <li>Actividades fraudulentas</li>
                            <li>Violación de derechos de propiedad intelectual</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">11.2 Efectos de la Terminación</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Pérdida inmediata de acceso a la plataforma</li>
                            <li>Eliminación de datos de usuario (según política de privacidad)</li>
                            <li>Supervivencia de cláusulas relevantes (propiedad intelectual, limitación de responsabilidad)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">12. Derecho de Desistimiento (Consumidores UE)</h2>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p>
                                <strong>Para consumidores en la Unión Europea:</strong> Tiene derecho a desistir
                                de su compra en un plazo de 14 días naturales desde la contratación, sin necesidad
                                de justificar la decisión.
                            </p>
                            <p className="mt-2">
                                <strong>Excepción:</strong> El derecho de desistimiento se pierde si comienza a
                                usar el contenido digital antes del plazo de 14 días, previo consentimiento expreso.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">13. Modificaciones de los Términos</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Podemos modificar estos Términos ocasionalmente</li>
                            <li>Le notificaremos cambios significativos con 30 días de antelación</li>
                            <li>El uso continuado constituye aceptación de los nuevos términos</li>
                            <li>Si no acepta los cambios, puede cancelar su suscripción</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">14. Resolución de Disputas</h2>

                        <h3 className="text-xl font-medium mb-3">14.1 Ley Aplicable</h3>
                        <p>
                            Estos Términos se rigen por la legislación española, sin perjuicio de
                            las normas de protección del consumidor aplicables.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">14.2 Jurisdicción</h3>
                        <p>
                            Para la resolución de controversias, las partes se someten a los juzgados
                            y tribunales españoles competentes.
                        </p>

                        <h3 className="text-xl font-medium mb-3 mt-6">14.3 Resolución Alternativa</h3>
                        <p>
                            Para consumidores, está disponible la plataforma de resolución de litigios
                            en línea de la UE:
                            <a href="https://ec.europa.eu/consumers/odr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                https://ec.europa.eu/consumers/odr
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">15. Contacto</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p>
                                Para cualquier pregunta sobre estos Términos y Condiciones,
                                puede contactarnos en:
                            </p>
                            <p className="mt-2"><strong>Email:</strong> legal@begonamentalreset.com</p>
                            <p><strong>Email general:</strong> info@begonamentalreset.com</p>
                            <p><strong>Tiempo de respuesta:</strong> Máximo 72 horas laborables</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">16. Disposiciones Finales</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Si alguna disposición es inválida, el resto permanece en vigor</li>
                            <li>Estos Términos constituyen el acuerdo completo entre las partes</li>
                            <li>No hay terceros beneficiarios de este acuerdo</li>
                            <li>La renuncia a un derecho debe ser expresa y por escrito</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}