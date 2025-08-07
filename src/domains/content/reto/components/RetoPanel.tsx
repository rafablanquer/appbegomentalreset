"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Menu, FileText, CheckCircle, Lock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import ProgressRing from "./ProgressRing"
import WeekCarousel from "./WeekCarousel"

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
    const [currentSession, setCurrentSession] = useState<Session | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [selectedWeek, setSelectedWeek] = useState(1)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const audioSessions = sessions.map((session) => ({
        ...session,
        audioUrl: `/audio/${session.audioUrl}`
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

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
        }
    }, [currentSession])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current
        if (!audio) return

        audio.currentTime = value[0]
        setCurrentTime(value[0])
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const selectSession = (sessionIndex: number) => {
        const session = currentWeekSessions[sessionIndex]
        if (session) {
            const sessionWithShortTitle = {
                ...session,
                shortTitle: session.title.split('·')[1]?.trim() || session.title
            }
            setCurrentSession(sessionWithShortTitle)
            setIsPlaying(false)
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
        setIsPlaying(false)
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
        <div className="min-h-screen bg-gradient-to-br from-black-100 via-blue-50 to-indigo-100 relative"
            style={{
                backgroundColor: "rgb(255, 250, 239)",
            }}>


            <div className="relative z-10 min-h-screen flex flex-col">
                <Image
                    src="/content/reto21dias/hero.png"
                    alt="APP BMR Preview"
                    width={700}
                    height={900}
                    className="hero-image"
                />

                <div className="w-full">
                    <div className="text-center mb-6 px-4">
                        <h2 className="text-2xl font-bold text-black-900 mt-3 mb-2">{title}</h2>
                        <p className="text-black-700 text-sm mb-4">{description}</p>
                    </div>

                    {/* Sección de progreso y navegación integrada */}
                    <section className="w-full bg-white/60 backdrop-blur-sm rounded-xl mx-4 mb-6 shadow-sm overflow-hidden">
                        {/* Resumen superior */}
                        <div className="px-6 py-6">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex-shrink-0">
                                    <ProgressRing value={completedCount} total={totalCount} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-600 mb-3 font-medium">Racha: 3 días consecutivos 🔥</p>
                                    {nextSession && (
                                        <Button
                                            onClick={handleContinue}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium w-full sm:w-auto"
                                        >
                                            Continuar {nextSession.title.split('·')[1]?.trim() || nextSession.title}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Selector de semana integrado */}
                            <div className="flex gap-2 justify-center mb-4">
                                {weeks.map((week) => (
                                    <button
                                        key={week}
                                        className={`flex-1 max-w-[120px] px-6 py-3 rounded-xl border text-sm font-medium transition-all ${week === selectedWeek
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

                        {/* WeekCarousel integrado */}
                        <div className="px-6 pb-6">
                            <WeekCarousel week={selectedWeek} sessions={weekSessions?.[selectedWeek] ?? []} onSessionSelect={handleSessionSelect} />
                        </div>
                    </section>
                </div>

                <div className="w-full px-4 space-y-4 mb-6">
                    {currentWeekSessions.map((session, index) => (
                        <Card
                            key={session.id}
                            className={`w-full p-5 cursor-pointer transition-all duration-200 rounded-xl shadow-sm hover:shadow-md ${!session.unlocked
                                ? "bg-gray-100/90 border-gray-300"
                                : session.completed
                                    ? "bg-green-50/90 border-green-300 ring-1 ring-green-200"
                                    : "bg-white/90 border-gray-200 hover:border-purple-300"
                                }`}
                            onClick={() => session.unlocked && selectSession(index)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Status Icon */}
                                <div className="flex-shrink-0 mt-1">
                                    {!session.unlocked ? (
                                        <Lock className="w-6 h-6 text-gray-400" />
                                    ) : session.completed ? (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <Calendar className="w-6 h-6 text-purple-600" />
                                    )}
                                </div>

                                {/* Session Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                                                Día {session.day}
                                            </Badge>
                                            <span className="text-xs text-gray-500 font-medium">{session.duration}</span>
                                        </div>
                                    </div>
                                    <h4 className={`font-semibold text-base mb-2 ${!session.unlocked ? "text-gray-500" : "text-gray-800"}`}>
                                        {session.title}
                                    </h4>
                                    <p className={`text-sm leading-relaxed ${!session.unlocked ? "text-gray-400" : "text-gray-600"}`}>
                                        {session.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="mt-auto bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 w-full">
                <audio ref={audioRef} src={currentSession?.audioUrl} preload="metadata" />

                {/* Current Session Info */}
                <div className="text-center mb-4 px-2">
                    <p className="text-gray-800 font-semibold text-base">{currentSession?.title}</p>
                    <p className="text-gray-600 text-sm mt-1">Día {currentSession?.day}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6 px-2">
                    <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={1}
                        onValueChange={handleSeek}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2 font-medium">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                    <Button variant="ghost" size="lg" className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 w-14 h-14 rounded-full flex items-center justify-center transition-all">
                        <SkipBack className="w-6 h-6" />
                    </Button>

                    <Button
                        onClick={togglePlay}
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-20 h-20 shadow-lg hover:shadow-xl transition-all"
                    >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>

                    <Button variant="ghost" size="lg" className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 w-14 h-14 rounded-full flex items-center justify-center transition-all">
                        <SkipForward className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
