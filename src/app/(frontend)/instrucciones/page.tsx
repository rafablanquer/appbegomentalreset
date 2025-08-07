import { Metadata } from 'next'
import PDFViewer from './PDFViewer'

export const metadata: Metadata = {
    title: 'Instrucciones APP BMR - Begoña Mental Reset',
    description: 'Guía completa de uso de la APP BMR. Aprende cómo utilizar los audios de neuropsicología y reprogramación mental para lograr mayor claridad y regulación emocional.',
    keywords: ['instrucciones', 'APP BMR', 'Begoña Mental Reset', 'neuropsicología', 'reprogramación mental', 'meditación', 'guía'],
    openGraph: {
        title: 'Instrucciones APP BMR - Begoña Mental Reset',
        description: 'Guía completa de uso de la APP BMR con fundamentos de neuropsicología y reprogramación mental.',
        type: 'website',
        locale: 'es_ES',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Instrucciones APP BMR - Begoña Mental Reset',
        description: 'Guía completa de uso de la APP BMR con fundamentos de neuropsicología y reprogramación mental.',
    },
    alternates: {
        canonical: '/instrucciones',
    },
}

// Componente para los comentarios
interface Comment {
    id: string
    author: string
    date: string
    avatar: string
    content: string
    replies?: Comment[]
}

const comments: Comment[] = [
    {
        id: "2",
        author: "Marilau",
        date: "julio 23, 2025 a las 2:27 pm",
        avatar: "https://secure.gravatar.com/avatar/4047ce7747053edb2eb3e2bed7f9b2b06c3916e99cb8adf67a284aa16113273e?s=80&d=mm&r=g",
        content: "Muy buenos días Bego y equipo!. Espero estén muy bien!. Muchas gracias por la app. Quiero comentarles que hay algunos audios que les pongo Play, y no funcionan. Y hoy estaba realizando una meditación y se cortó por la mitad. Cómo podemos solucionarlo?. Muchas gracias. Besos, Ma.Laura",
        replies: [
            {
                id: "3",
                author: "Vanessa",
                date: "julio 23, 2025 a las 3:13 pm",
                avatar: "https://secure.gravatar.com/avatar/2ba052eb28589b034a1a16ce04731f650f36ac49fab409a9f65807f898583c06?s=80&d=mm&r=g",
                content: "Hola Maria Laura, En primer lugar, disculpa los inconvenientes, ya que hemos tenido una pequeña saturación tras un lanzamiento en que el que muchos usuarios se suscribieron a la vez. Por ahora, ya funciona todo con normalidad. Prueba y confírmanos que está todo correcto al correo incidenciasbmr@gmail.com. Un saludo y disculpa las molestias, Vanessa – Project manager del equipo BMR",
                replies: [
                    {
                        id: "4",
                        author: "Marilau",
                        date: "julio 24, 2025 a las 3:53 am",
                        avatar: "https://secure.gravatar.com/avatar/4047ce7747053edb2eb3e2bed7f9b2b06c3916e99cb8adf67a284aa16113273e?s=80&d=mm&r=g",
                        content: "Gracias Vanessa!! Ahora me funciona excelente!. Me imaginé que había sucedido eso, y es comprensible. Lo importante que ya está solucionado y que celeridad! Abrazo!"
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        author: "Andreswdsm",
        date: "julio 31, 2025 a las 1:10 am",
        avatar: "https://secure.gravatar.com/avatar/fdcc0b65eeb0f19867833a2b0b73f4a8c59f659603c93d444cc794eb98ff584f?s=80&d=mm&r=g",
        content: "Hola a todos, existe alguna forma específica de escuchar los audios nocturnos? Es decir, instrucciones específicas sobre usar iPods o simplemente reproducir el audio en tu móvil junto a ti, por ejemplo? Gracias.",
        replies: [
            {
                id: "6",
                author: "Vanessa",
                date: "julio 31, 2025 a las 7:10 am",
                avatar: "https://secure.gravatar.com/avatar/2ba052eb28589b034a1a16ce04731f650f36ac49fab409a9f65807f898583c06?s=80&d=mm&r=g",
                content: "Hola Andres, Lo ideal es no utilizar auriculares, sino dejarlo sonar de fondo hasta que te quedes dormido. Quedo atenta para cualquier otra cosa que necesites. Vanessa – project manager del equipo bmr",
                replies: [
                    {
                        id: "7",
                        author: "Ochobre",
                        date: "agosto 2, 2025 a las 7:18 pm",
                        avatar: "https://secure.gravatar.com/avatar/05d91676f252f8202d1e1d34f6dc0df3b8cac4fa9e925a97163ce7ce586e3a69?s=80&d=mm&r=g",
                        content: "¿ Tiene alguna motivación no utilizar auriculares? Yo utilizo unos SoftySound que vienen en una diadema de tela que se pone alrededor de la cabeza (como las cintas para el sudor en el tenis) y que no molestan aunque te duermas con ellos puestos y los utilizo por \"privacidad\" para así no molestar a mi pareja si está durmiendo conmigo. ¿Puede ser?",
                        replies: [
                            {
                                id: "8",
                                author: "Vanessa",
                                date: "agosto 3, 2025 a las 3:31 pm",
                                avatar: "https://secure.gravatar.com/avatar/2ba052eb28589b034a1a16ce04731f650f36ac49fab409a9f65807f898583c06?s=80&d=mm&r=g",
                                content: "Hola Ochobre, No hay ningún problema, puedes usar la cinta/banda si lo prefieres. El tema auriculares es sobretodo por comodidad a la hora de dormir, y por no tener que estar pendiente de apagar el audio, sino que se reproduzca hasta incluso dormirte, (que es cuando estamos más receptivos para la reprogramación). Cualquier otra duda, estaré encantada de resolverla. Un saludo, Vanessa – project manager del equipo bmr"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`border-l-2 border-gray-200 pl-4 ${depth > 0 ? 'ml-4 mt-4' : 'mb-6'}`}>
        <div className="flex items-start space-x-3">
            <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
                {comment.replies && comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                ))}
            </div>
        </div>
    </div>
)

export default function InstruccionesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Encabezado principal */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Instrucciones APP BMR
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Contenido principal */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-8">
                            <p className="text-lg leading-relaxed mb-0">
                                Esta app ha sido diseñada desde los fundamentos de la <strong>neuropsicología</strong> y la <strong>reprogramación mental</strong>, con el objetivo de guiar a tu cerebro —de forma sencilla pero eficaz— hacia un estado de mayor claridad, regulación emocional y enfoque interno.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                                    <span className="mr-2">🧠</span>
                                    Contenido Científico
                                </h3>
                                <p className="text-gray-700">
                                    En su interior encontrarás audios estructurados según momentos clave del día (mañana, pausas conscientes y noche), todos diseñados con base científica para activar patrones neuronales específicos.
                                </p>
                            </div>

                            <div className="bg-indigo-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-indigo-800 mb-3 flex items-center">
                                    <span className="mr-2">🎯</span>
                                    Transformación Progresiva
                                </h3>
                                <p className="text-gray-700">
                                    Cada audio favorece la transformación desde el subconsciente, ayudándote a integrar día a día un nuevo sistema mental más equilibrado.
                                </p>
                            </div>
                        </div>

                        {/* Botón de descarga destacado */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-center">
                            <h3 className="text-white text-xl font-semibold mb-4">
                                📥 Descarga la Guía Completa
                            </h3>
                            <p className="text-green-100 mb-6">
                                Descarga a continuación la guía de uso para entender cómo sacar el máximo provecho de cada audio y empezar a integrar, día a día, un nuevo sistema mental.
                            </p>
                            <a
                                href="https://drive.google.com/file/d/1cAYaNsXFhZKBHarv6dVBhcKQD12Xhnah/view?usp=drivesdk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-colors duration-200 shadow-lg"
                            >
                                <span className="mr-2">📋</span>
                                Descargar PDF de Instrucciones
                            </a>
                        </div>
                    </div>
                </div>

                {/* Sección de comentarios */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            💬 Preguntas Frecuentes
                        </h2>
                        <p className="text-gray-600">
                            Consulta las dudas más comunes de nuestra comunidad
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4 rounded-full"></div>
                    </div>

                    <div className="space-y-6">
                        {comments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>

                    {/* Información de contacto */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="mr-2">📧</span>
                            ¿Tienes dudas adicionales?
                        </h3>
                        <p className="text-gray-600 mb-3">
                            Si experimentas problemas técnicos o tienes preguntas sobre el uso de la app, no dudes en contactarnos:
                        </p>
                        <a
                            href="mailto:incidenciasbmr@gmail.com"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <span className="mr-2">✉️</span>
                            incidenciasbmr@gmail.com
                        </a>
                    </div>
                </div>

                {/* Visor de PDF integrado */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            📋 Guía Completa de Instrucciones
                        </h2>
                        <p className="text-gray-600">
                            Visualiza directamente la guía completa de uso de la APP BMR
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4 rounded-full"></div>
                    </div>

                    <div className="relative">
                        {/* Visor de PDF inteligente */}
                        <PDFViewer />

                        {/* Controles adicionales */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="/pdf_instrucciones.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                <span className="mr-2">🔗</span>
                                Abrir en nueva pestaña
                            </a>
                            <a
                                href="/pdf_instrucciones.pdf"
                                download="Instrucciones_APP_BMR.pdf"
                                className="inline-flex items-center bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                <span className="mr-2">⬇️</span>
                                Descargar PDF
                            </a>
                        </div>

                        {/* Nota informativa */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">💡 Consejo:</span> Si tienes problemas visualizando el PDF, puedes abrirlo en una nueva pestaña o descargarlo directamente usando los botones de arriba.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}