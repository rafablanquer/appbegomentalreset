import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Política de Cookies - BMR',
    description: 'Política de cookies de Begoña Mental Reset',
}

export default function CookiePolicyPage() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4">
            <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>

                <p className="text-gray-600 mb-8">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. ¿Qué son las Cookies?</h2>
                        <p>
                            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
                            cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones
                            y preferencias durante un período de tiempo, para que no tenga que volver
                            a configurarlas cada vez que regrese al sitio o navegue de una página a otra.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. ¿Cómo Usamos las Cookies?</h2>
                        <p>
                            Begoña Mental Reset utiliza cookies para mejorar su experiencia de usuario,
                            proporcionar funcionalidades esenciales y analizar el uso de nuestro sitio web.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Tipos de Cookies que Utilizamos</h2>

                        <h3 className="text-xl font-medium mb-3">3.1 Cookies Esenciales</h3>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                            <p><strong>Propósito:</strong> Estas cookies son necesarias para el funcionamiento básico del sitio web.</p>
                            <p><strong>Base legal:</strong> Interés legítimo (funcionalidad esencial)</p>
                            <p><strong>Duración:</strong> Sesión o hasta 1 año</p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Autenticación:</strong> Mantener su sesión iniciada</li>
                            <li><strong>Seguridad:</strong> Protección contra ataques CSRF</li>
                            <li><strong>Funcionalidad:</strong> Recordar preferencias de idioma y tema</li>
                            <li><strong>Carrito de compras:</strong> Mantener selecciones de membresía</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">3.2 Cookies de Rendimiento y Analytics</h3>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                            <p><strong>Propósito:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.</p>
                            <p><strong>Base legal:</strong> Consentimiento</p>
                            <p><strong>Duración:</strong> Hasta 2 años</p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Google Analytics:</strong> Análisis de tráfico y comportamiento</li>
                            <li><strong>Métricas de rendimiento:</strong> Tiempo de carga y errores</li>
                            <li><strong>Análisis de contenido:</strong> Qué programas son más populares</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">3.3 Cookies de Funcionalidad</h3>
                        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
                            <p><strong>Propósito:</strong> Mejorar la funcionalidad y personalización del sitio web.</p>
                            <p><strong>Base legal:</strong> Consentimiento</p>
                            <p><strong>Duración:</strong> Hasta 1 año</p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Preferencias de usuario:</strong> Tema oscuro/claro, configuraciones</li>
                            <li><strong>Progreso de contenido:</strong> Recordar dónde dejó un programa</li>
                            <li><strong>Personalización:</strong> Contenido recomendado basado en intereses</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">3.4 Cookies de Marketing (Futuras)</h3>
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4">
                            <p><strong>Propósito:</strong> Mostrar anuncios relevantes y medir la efectividad de campañas.</p>
                            <p><strong>Base legal:</strong> Consentimiento explícito</p>
                            <p><strong>Estado actual:</strong> No utilizadas actualmente</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Cookies de Terceros</h2>

                        <h3 className="text-xl font-medium mb-3">4.1 Servicios que Pueden Establecer Cookies</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold">Servicio</th>
                                        <th className="px-4 py-2 text-left font-semibold">Propósito</th>
                                        <th className="px-4 py-2 text-left font-semibold">Más Información</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t">
                                        <td className="px-4 py-2">Stripe</td>
                                        <td className="px-4 py-2">Procesamiento de pagos seguro</td>
                                        <td className="px-4 py-2">
                                            <a href="https://stripe.com/cookies-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                                Política de Cookies de Stripe
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-2">Google Analytics</td>
                                        <td className="px-4 py-2">Análisis de tráfico web</td>
                                        <td className="px-4 py-2">
                                            <a href="https://policies.google.com/technologies/cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                                Política de Cookies de Google
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-2">Hosting Provider</td>
                                        <td className="px-4 py-2">Funcionalidad técnica del sitio</td>
                                        <td className="px-4 py-2">Cookies esenciales únicamente</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Gestión de Cookies</h2>

                        <h3 className="text-xl font-medium mb-3">5.1 Panel de Consentimiento</h3>
                        <p>
                            Cuando visite nuestro sitio por primera vez, aparecerá un banner de cookies
                            que le permitirá:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Aceptar todas las cookies</li>
                            <li>Rechazar cookies no esenciales</li>
                            <li>Personalizar sus preferencias por categoría</li>
                            <li>Obtener más información sobre cada tipo de cookie</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">5.2 Modificar Preferencias</h3>
                        <p>
                            Puede cambiar sus preferencias de cookies en cualquier momento:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Haciendo clic en "Configuración de Cookies" en el footer</li>
                            <li>A través de la configuración de su cuenta de usuario</li>
                            <li>Contactándonos directamente</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">5.3 Configuración del Navegador</h3>
                        <p>
                            También puede gestionar cookies directamente desde su navegador:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Chrome</h4>
                                <p className="text-sm">Configuración → Privacidad y seguridad → Cookies</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Firefox</h4>
                                <p className="text-sm">Preferencias → Privacidad y seguridad → Cookies</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Safari</h4>
                                <p className="text-sm">Preferencias → Privacidad → Cookies</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold">Edge</h4>
                                <p className="text-sm">Configuración → Privacidad → Cookies</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Cookies y Dispositivos Móviles</h2>
                        <p>
                            En dispositivos móviles, las cookies funcionan de manera similar.
                            Puede gestionar las preferencias a través de:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Configuración del navegador móvil</li>
                            <li>Configuración de la aplicación web (PWA)</li>
                            <li>Panel de consentimiento adaptado para móviles</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Consecuencias de Rechazar Cookies</h2>

                        <h3 className="text-xl font-medium mb-3">7.1 Cookies Esenciales</h3>
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <p>
                                <strong>No se pueden rechazar:</strong> Son necesarias para el funcionamiento
                                básico del sitio. Rechazarlas impediría usar funciones esenciales como
                                iniciar sesión o procesar pagos.
                            </p>
                        </div>

                        <h3 className="text-xl font-medium mb-3 mt-6">7.2 Cookies No Esenciales</h3>
                        <p>Si rechaza cookies no esenciales:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>El sitio seguirá funcionando normalmente</li>
                            <li>Perderá algunas funciones de personalización</li>
                            <li>No recordaremos sus preferencias entre sesiones</li>
                            <li>Los análisis de uso serán limitados</li>
                            <li>Puede que vea el banner de cookies repetidamente</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Retención y Eliminación</h2>

                        <h3 className="text-xl font-medium mb-3">8.1 Períodos de Retención</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Cookies de sesión:</strong> Se eliminan al cerrar el navegador</li>
                            <li><strong>Cookies persistentes:</strong> Expiran según su configuración individual</li>
                            <li><strong>Cookies de analytics:</strong> Máximo 2 años</li>
                            <li><strong>Cookies de preferencias:</strong> Máximo 1 año</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">8.2 Eliminación Manual</h3>
                        <p>
                            Puede eliminar todas las cookies almacenadas en cualquier momento a través
                            de la configuración de su navegador o contactando con nosotros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Actualizaciones de esta Política</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Podemos actualizar esta política ocasionalmente</li>
                            <li>Los cambios significativos serán notificados mediante banner</li>
                            <li>La fecha de última actualización aparece al inicio del documento</li>
                            <li>El uso continuado implica aceptación de los cambios</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Contacto</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p>
                                Si tiene preguntas sobre nuestra política de cookies o desea ejercer
                                sus derechos relacionados con cookies, puede contactarnos:
                            </p>
                            <p className="mt-2"><strong>Email:</strong> cookies@begonamentalreset.com</p>
                            <p><strong>Email general:</strong> info@begonamentalreset.com</p>
                            <p><strong>Asunto:</strong> "Consulta sobre Cookies"</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Enlaces Útiles</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Más Información</h3>
                                <ul className="text-sm space-y-1 mt-2">
                                    <li>
                                        <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                            All About Cookies
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youronlinechoices.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                            Your Online Choices
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold">Nuestras Políticas</h3>
                                <ul className="text-sm space-y-1 mt-2">
                                    <li>
                                        <a href="/privacidad" className="text-blue-600 hover:underline">
                                            Política de Privacidad
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/terminos" className="text-blue-600 hover:underline">
                                            Términos y Condiciones
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}