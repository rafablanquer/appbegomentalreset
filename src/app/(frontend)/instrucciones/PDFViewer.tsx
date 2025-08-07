'use client'

import { useState, useEffect } from 'react'

export default function PDFViewer() {
    const [viewerMethod, setViewerMethod] = useState<'loading' | 'embed' | 'object' | 'fallback'>('loading')
    const [pdfLoadError, setPdfLoadError] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        // Marcar que estamos en el cliente para evitar problemas de hidratación
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return
        // Función para detectar si el navegador puede mostrar PDFs
        const detectPDFSupport = () => {
            // Verificar si hay plugins de PDF disponibles
            const hasPDFPlugin = navigator.mimeTypes['application/pdf'] &&
                navigator.mimeTypes['application/pdf'].enabledPlugin

            // Verificar si es un navegador moderno con soporte nativo
            const isModernBrowser = 'chrome' in window || 'safari' in window ||
                navigator.userAgent.includes('Firefox')

            if (hasPDFPlugin || isModernBrowser) {
                setViewerMethod('embed')

                // Probar cargar el PDF para verificar que existe
                setTimeout(() => {
                    const testEmbed = document.createElement('embed')
                    testEmbed.src = '/pdf_instrucciones.pdf'
                    testEmbed.type = 'application/pdf'
                    testEmbed.style.display = 'none'
                    testEmbed.onload = () => {
                        console.log('PDF cargado exitosamente')
                        document.body.removeChild(testEmbed)
                    }
                    testEmbed.onerror = () => {
                        console.log('Error cargando PDF, usando fallback')
                        setPdfLoadError(true)
                        setViewerMethod('fallback')
                        document.body.removeChild(testEmbed)
                    }
                    document.body.appendChild(testEmbed)
                }, 100)
            } else {
                setViewerMethod('fallback')
            }
        }

        detectPDFSupport()
    }, [isClient])

    const handleEmbedError = () => {
        console.log('Embed failed, trying object')
        setViewerMethod('object')
    }

    const handleObjectError = () => {
        console.log('Object failed, using fallback')
        setViewerMethod('fallback')
    }

    // Mostrar estado de carga hasta que el cliente esté listo
    if (!isClient || viewerMethod === 'loading') {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl border-2 border-gray-200">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Detectando compatibilidad del visor...</p>
                </div>
            </div>
        )
    }

    if (viewerMethod === 'embed') {
        return (
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <embed
                    src="/pdf_instrucciones.pdf#toolbar=1&navpanes=1&scrollbar=1&zoom=100"
                    width="100%"
                    height="800"
                    type="application/pdf"
                    className="w-full block"
                    style={{ minHeight: '600px' }}
                    onError={handleEmbedError}
                />
            </div>
        )
    }

    if (viewerMethod === 'object') {
        return (
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <object
                    data="/pdf_instrucciones.pdf#toolbar=1&navpanes=1&scrollbar=1&zoom=100"
                    type="application/pdf"
                    width="100%"
                    height="800"
                    className="w-full block"
                    style={{ minHeight: '600px' }}
                    onError={handleObjectError}
                >
                    <div className="p-8 text-center bg-white h-full flex items-center justify-center">
                        <div className="max-w-md">
                            <div className="w-16 h-20 bg-orange-100 border-2 border-orange-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl">📄</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Cargando PDF...
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Si el PDF no aparece en unos segundos, usa los botones de abajo.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="/pdf_instrucciones.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    🔗 Abrir en nueva pestaña
                                </a>
                            </div>
                        </div>
                    </div>
                </object>
            </div>
        )
    }

    // Fallback final
    return (
        <div className="border-2 border-red-200 rounded-xl overflow-hidden bg-red-50">
            <div className="p-8 text-center bg-white">
                <div className="max-w-md mx-auto">
                    <div className="mb-6">
                        <div className="w-16 h-20 bg-red-100 border-2 border-red-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Visor de PDF no disponible
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Tu navegador no puede mostrar PDFs directamente.
                        </p>
                        {pdfLoadError && (
                            <p className="text-red-600 text-sm mb-4">
                                ⚠️ También detectamos un problema al cargar el archivo PDF.
                            </p>
                        )}
                        <p className="text-gray-600 mb-6">
                            Usa los botones de abajo para ver el documento:
                        </p>
                    </div>

                    <div className="space-y-3">
                        <a
                            href="/pdf_instrucciones.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            🔗 Ver PDF en nueva pestaña
                        </a>
                        <a
                            href="/pdf_instrucciones.pdf"
                            download="Instrucciones_APP_BMR.pdf"
                            className="block w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            ⬇️ Descargar PDF
                        </a>

                        {/* Opción adicional: Google Docs Viewer */}
                        {isClient && (
                            <a
                                href={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/pdf_instrucciones.pdf')}&embedded=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                            >
                                👁️ Ver con Google Docs Viewer
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}