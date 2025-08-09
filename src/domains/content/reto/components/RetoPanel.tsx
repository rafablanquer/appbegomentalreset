"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Menu, FileText, CheckCircle, Lock, Calendar, ChevronLeft, ChevronRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import ProgressRing from "./ProgressRing"
import WeekCarousel from "./WeekCarousel"
import { useAudioPlayer } from "@/providers/AudioPlayer"

export interface AudioSession {
    id: number
    day: number
    title: string
    description: string
    duration: string
    audioUrl: string
    week: number
    completed: boolean
    unlocked: boolean
}

export interface Session {
    id: number
    day: number
    title: string
    shortTitle: string
    description: string
    duration: string
    audioUrl: string
    completed: boolean
    unlocked: boolean
}


export default function RetoPanel({ sessions, pathInstructions, title, description }: { sessions: AudioSession[], pathInstructions: string, title: string, description: string }) {
    const { setCurrentSession } = useAudioPlayer()
    const [selectedWeek, setSelectedWeek] = useState(1)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    const computeWeekFromDay = (day: number) => {
        if (day <= 7) return 1
        if (day <= 14) return 2
        return 3
    }

    const audioSessions = sessions.map((session) => ({
        ...session,
        // Mantener la URL tal cual llega del CMS para evitar duplicar prefijos
        audioUrl: session.audioUrl,
        // Asegurar que exista week para el filtrado por semanas
        week: (session as any).week ?? computeWeekFromDay(session.day),
    }))
    const weekSessions: Record<number, Session[]> = {
        1: [
            {
                id: 1,
                day: 1,
                title: "Día 1 · Activa tu foco",
                shortTitle: "Activa tu foco",
                description: "Entrena tu atención para dirigirla de forma consciente y crear nuevos patrones mentales.",
                duration: "10:12",
                audioUrl: "/audio/dia1.mp3",
                completed: true,
                unlocked: true,
            },
            {
                id: 2,
                day: 3,
                title: "Día 3 · Creencias heredadas",
                shortTitle: "Creencias heredadas",
                description: "Empieza a tomar conciencia de lo que no es realmente tuyo y libérate de patrones limitantes.",
                duration: "12:15",
                audioUrl: "/audio/dia3.mp3",
                completed: true,
                unlocked: true,
            },
            {
                id: 3,
                day: 5,
                title: "Día 5 · Reprograma creencias",
                shortTitle: "Reprograma creencias",
                description: "Aprende a identificar una creencia limitante y reemplazarla por una que te potencie.",
                duration: "15:45",
                audioUrl: "/audio/dia5.mp3",
                completed: true,
                unlocked: true,
            },
            {
                id: 4,
                day: 7,
                title: "Día 7 · Integra el cambio",
                shortTitle: "Integra el cambio",
                description: "Consolida los nuevos patrones mentales en tu rutina diaria.",
                duration: "11:30",
                audioUrl: "/audio/dia7.mp3",
                completed: false,
                unlocked: true,
            },
        ],
        2: [
            {
                id: 5,
                day: 8,
                title: "Día 8 · Visualiza tu futuro",
                shortTitle: "Visualiza tu futuro",
                description: "Conecta con la versión de ti que ya logró lo que deseas y siente esa realidad.",
                duration: "18:20",
                audioUrl: "/audio/dia8.mp3",
                completed: false,
                unlocked: true,
            },
            {
                id: 6,
                day: 10,
                title: "Día 10 · Nueva identidad",
                shortTitle: "Nueva identidad",
                description: "Empieza a pensar y actuar como esa nueva versión que estás construyendo.",
                duration: "16:30",
                audioUrl: "/audio/dia10.mp3",
                completed: false,
                unlocked: false,
            },
            {
                id: 7,
                day: 12,
                title: "Día 12 · Tu sabio interior",
                shortTitle: "Tu sabio interior",
                description: "Aprende a escucharte sin ruido mental ni juicios, conecta con tu sabiduría interna.",
                duration: "14:10",
                audioUrl: "/audio/dia12.mp3",
                completed: false,
                unlocked: false,
            },
        ],
        3: [
            {
                id: 8,
                day: 15,
                title: "Día 15 · Segunda creencia",
                shortTitle: "Segunda creencia",
                description: "Elige una nueva creencia poderosa y entrénala en tu mente subconsciente.",
                duration: "17:45",
                audioUrl: "/audio/dia15.mp3",
                completed: false,
                unlocked: false,
            },
            {
                id: 9,
                day: 17,
                title: "Día 17 · Identidad futura",
                shortTitle: "Identidad futura",
                description: "Vive una experiencia guiada en la que encarnas tu mejor versión completamente.",
                duration: "22:30",
                audioUrl: "/audio/dia17.mp3",
                completed: false,
                unlocked: false,
            },
            {
                id: 10,
                day: 19,
                title: "Día 19 · Sostén tu identidad",
                shortTitle: "Sostén tu identidad",
                description: "Aprender a mantener tu nueva identidad en el tiempo y hacerla permanente.",
                duration: "13:20",
                audioUrl: "/audio/dia19.mp3",
                completed: false,
                unlocked: false,
            },
        ],
    }

    // Calculate progress
    const completedSessions = audioSessions.filter((s) => s.completed).length
    const totalSessions = audioSessions.length
    const progressPercentage = (completedSessions / totalSessions) * 100

    const currentWeekSessions = audioSessions.filter((session) => session.week === selectedWeek)



    const selectSession = (sessionIndex: number) => {
        const session = currentWeekSessions[sessionIndex]
        if (session) {
            const sessionWithShortTitle = {
                ...session,
                shortTitle: session.title.split('·')[1]?.trim() || session.title
            }
            setCurrentSession(sessionWithShortTitle)
        }
    }

    const openInstructions = () => {
        // Open PDF in new tab
        window.open("/reto-bmr-instrucciones.pdf", "_blank")
    }


    const weeks = [1, 2, 3]
    const allSessions = Object.values(sessions).flat()
    const completedCount = allSessions.filter((s) => s.completed).length
    const totalCount = allSessions.length
    const nextSession = allSessions.find((s) => s.unlocked && !s.completed)
    const [selectedSession, setSelectedSession] = useState<Session | null>(null)


    const handleSessionSelect = (session: Session) => {
        setSelectedSession(session)
        setCurrentSession(session)
    }


    const handleContinue = () => {
        if (nextSession) {
            const sessionWithShortTitle = {
                ...nextSession,
                shortTitle: nextSession.title.split('·')[1]?.trim() || nextSession.title
            }
            handleSessionSelect(sessionWithShortTitle)
        }
    }




    return (
        <div className="relative min-h-[100dvh] bg-background pb-[172px]">
            {/* Contenedor principal centrado y limitado a móvil */}
            <div className="mx-auto max-w-screen-sm">
                {/* HERO con imagen, degradado y contenido superpuesto */}
                <section className="relative h-[38vh] min-h-[260px] max-h-[340px]">
                    <Image
                        src="/content/reto21dias/hero.png"
                        alt="Imagen del reto BMR"
                        fill
                        sizes="(max-width: 768px) 100vw, 100vw"
                        priority
                        className="object-cover"
                    />
                    {/* Degradado para mejorar legibilidad */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/35 to-black/75" />

                    {/* Texto superpuesto dentro de la imagen */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="w-full px-4 pb-5">
                            <Card className="bg-black/20 text-white border-white/10 backdrop-blur-[2px]">
                                <CardContent className="p-4">
                                    <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
                                    <p className="mt-1 text-sm text-white/90">{description}</p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <Badge className="bg-white/20 hover:bg-white/25 text-white">{completedCount} / {totalCount}</Badge>
                                        <div className="flex items-center text-xs text-white/90">
                                            <Flame className="mr-1 h-4 w-4 text-orange-400" />
                                            Racha: 3 días consecutivos
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Difuminado inferior para fundir con el fondo */}
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                        style={{
                            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                            background: "linear-gradient(to bottom, rgba(0,0,0,0), var(--background))",
                        }}
                    />
                </section>

                <section className="px-4 pt-3">
                    {nextSession && (
                        <div className="shrink-0 mb-4">
                            <Button className="w-full" onClick={handleContinue}>
                                Continuar: {nextSession.title.split('·')[1]?.trim() || nextSession.title}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <section className="w-full bg-white/60 backdrop-blur-sm rounded-xl mb-6 shadow-sm overflow-hidden">
                        <div className="px-4 py-4">
                            <div className="flex gap-2 justify-stretch">
                                {weeks.map((week) => (
                                    <button
                                        key={week}
                                        className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${week === selectedWeek
                                            ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:shadow-sm"
                                            }`}
                                        onClick={() => setSelectedWeek(week)}
                                    >
                                        Semana {week}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="pb-2 pr-4">
                            <WeekCarousel week={selectedWeek} sessions={weekSessions?.[selectedWeek] ?? []} onSessionSelect={handleSessionSelect} />
                        </div>
                    </section>
                </section>

            </div>
        </div>
    )
}
