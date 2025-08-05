"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Menu, FileText, CheckCircle, Lock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface AudioSession {
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

const audioSessions: AudioSession[] = [
    // Semana 1
    {
        id: 1,
        day: 1,
        title: "Activa tu foco",
        description: "Entrena tu atención para dirigirla de forma consciente.",
        duration: "8:30",
        audioUrl: "/audio/dia1.mp3",
        week: 1,
        completed: true,
        unlocked: true,
    },
    {
        id: 2,
        day: 3,
        title: "Las creencias que heredamos",
        description: "Empieza a tomar conciencia de lo que no es realmente tuyo.",
        duration: "12:15",
        audioUrl: "/audio/dia3.mp3",
        week: 1,
        completed: true,
        unlocked: true,
    },
    {
        id: 3,
        day: 5,
        title: "Reprograma una creencia",
        description: "Aprende a identificar una creencia limitante y reemplazarla por una que te potencie.",
        duration: "15:45",
        audioUrl: "/audio/dia5.mp3",
        week: 1,
        completed: false,
        unlocked: true,
    },
    // Semana 2
    {
        id: 4,
        day: 8,
        title: "Visualiza tu futuro",
        description: "Conecta con la versión de ti que ya logró lo que deseas.",
        duration: "18:20",
        audioUrl: "/audio/dia8.mp3",
        week: 2,
        completed: false,
        unlocked: true,
    },
    {
        id: 5,
        day: 10,
        title: "Crea una nueva identidad",
        description: "Empieza a pensar y actuar como esa nueva versión que estás construyendo.",
        duration: "16:30",
        audioUrl: "/audio/dia10.mp3",
        week: 2,
        completed: false,
        unlocked: false,
    },
    {
        id: 6,
        day: 12,
        title: "Tu sabio interior",
        description: "Aprende a escucharte sin ruido mental ni juicios.",
        duration: "14:10",
        audioUrl: "/audio/dia12.mp3",
        week: 2,
        completed: false,
        unlocked: false,
    },
    // Semana 3
    {
        id: 7,
        day: 15,
        title: "Reprograma una segunda creencia",
        description: "Elige una nueva creencia poderosa y entrénala en tu mente subconsciente.",
        duration: "17:45",
        audioUrl: "/audio/dia15.mp3",
        week: 3,
        completed: false,
        unlocked: false,
    },
    {
        id: 8,
        day: 17,
        title: "Viaje a tu identidad futura",
        description: "Vive una experiencia guiada en la que encarnas tu mejor versión.",
        duration: "22:30",
        audioUrl: "/audio/dia17.mp3",
        week: 3,
        completed: false,
        unlocked: false,
    },
    {
        id: 9,
        day: 19,
        title: "Sostén tu identidad",
        description: "Aprender a mantener tu nueva identidad en el tiempo.",
        duration: "13:20",
        audioUrl: "/audio/dia19.mp3",
        week: 3,
        completed: false,
        unlocked: false,
    },
]

export default function RetoPanel() {
    const [currentSession, setCurrentSession] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [selectedWeek, setSelectedWeek] = useState(1)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

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
        const globalIndex = audioSessions.findIndex((s) => s.id === currentWeekSessions[sessionIndex].id)
        setCurrentSession(globalIndex)
        setIsPlaying(false)
    }

    const openInstructions = () => {
        // Open PDF in new tab
        window.open("/reto-bmr-instrucciones.pdf", "_blank")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <Image src="/reto-bg.png" alt="Background pattern" fill className="object-cover opacity-30" priority />
            </div>

            {/* Side Menu */}
            {sideMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSideMenuOpen(false)}>
                    <div
                        className="w-80 h-full bg-white/95 backdrop-blur-sm p-6 shadow-xl transform transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">B</span>
                            </div>
                            <div>
                                <h1 className="text-purple-900 font-bold">BEGO</h1>
                                <p className="text-purple-700 text-sm">MENTAL RESET</p>
                            </div>
                        </div>

                        <nav className="space-y-4">
                            <a href="#" className="block text-gray-700 hover:text-purple-800 py-3 px-2 rounded-lg hover:bg-purple-50">
                                Inicio
                            </a>
                            <a href="#" className="block text-gray-700 hover:text-purple-800 py-3 px-2 rounded-lg hover:bg-purple-50">
                                Neurodespertar
                            </a>
                            <a href="#" className="block text-purple-800 font-medium py-3 px-2 rounded-lg bg-purple-100">
                                Reto 21 Días
                            </a>
                            <a href="#" className="block text-gray-700 hover:text-purple-800 py-3 px-2 rounded-lg hover:bg-purple-50">
                                Neuropausa
                            </a>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">B</span>
                        </div>
                        <div>
                            <h1 className="text-purple-900 font-bold text-sm">RETO BMR</h1>
                            <p className="text-purple-700 text-xs">21 DÍAS</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSideMenuOpen(true)} className="text-purple-900">
                        <Menu className="w-5 h-5" />
                    </Button>
                </header>

                {/* Hero Section */}
                <div className="px-6 py-4">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-purple-900 mb-2">Reto BMR</h2>
                        <p className="text-purple-700 text-sm mb-4">Desarrolla tu mejor versión en 3 semanas</p>

                        {/* Progress Overview */}
                        <Card className="bg-white/80 backdrop-blur-sm p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-purple-800">Tu progreso</span>
                                <span className="text-sm text-purple-600">
                                    {completedSessions}/{totalSessions} completadas
                                </span>
                            </div>
                            <Progress value={progressPercentage} className="h-2 mb-2" />
                            <p className="text-xs text-purple-600">{Math.round(progressPercentage)}% del reto completado</p>
                        </Card>

                        {/* Instructions Button */}
                        <Button
                            onClick={openInstructions}
                            variant="outline"
                            className="bg-white/80 hover:bg-white border-purple-300 text-purple-700 mb-6"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Instrucciones del reto
                        </Button>
                    </div>

                    {/* Week Selector */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3].map((week) => (
                            <Button
                                key={week}
                                onClick={() => setSelectedWeek(week)}
                                variant={selectedWeek === week ? "default" : "outline"}
                                className={`px-6 ${selectedWeek === week ? "bg-purple-600 text-white" : "bg-white/80 text-purple-700 border-purple-300"
                                    }`}
                            >
                                Semana {week}
                            </Button>
                        ))}
                    </div>

                    {/* Current Week Sessions */}
                    <div className="space-y-3 mb-6">
                        {currentWeekSessions.map((session, index) => (
                            <Card
                                key={session.id}
                                className={`p-4 cursor-pointer transition-all duration-200 ${!session.unlocked
                                    ? "bg-gray-100/80 border-gray-300"
                                    : session.completed
                                        ? "bg-green-50/80 border-green-300"
                                        : "bg-white/80 border-purple-300 hover:shadow-md"
                                    }`}
                                onClick={() => session.unlocked && selectSession(index)}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Status Icon */}
                                    <div className="flex-shrink-0">
                                        {!session.unlocked ? (
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        ) : session.completed ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                        )}
                                    </div>

                                    {/* Session Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className="text-xs">
                                                Día {session.day}
                                            </Badge>
                                            <span className="text-xs text-gray-500">{session.duration}</span>
                                        </div>
                                        <h4 className={`font-medium text-sm ${!session.unlocked ? "text-gray-500" : "text-gray-800"}`}>
                                            {session.title}
                                        </h4>
                                        <p className={`text-xs mt-1 ${!session.unlocked ? "text-gray-400" : "text-gray-600"}`}>
                                            {session.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Audio Player - Fixed at bottom */}
                <div className="mt-auto bg-white/95 backdrop-blur-sm border-t border-purple-200 p-4">
                    <audio ref={audioRef} src={audioSessions[currentSession]?.audioUrl} preload="metadata" />

                    {/* Current Session Info */}
                    <div className="text-center mb-3">
                        <p className="text-purple-800 font-medium text-sm">{audioSessions[currentSession]?.title}</p>
                        <p className="text-purple-600 text-xs">Día {audioSessions[currentSession]?.day}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            onValueChange={handleSeek}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-purple-600 mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-6">
                        <Button variant="ghost" size="lg" className="text-purple-700 hover:bg-purple-100 w-12 h-12 rounded-full">
                            <SkipBack className="w-6 h-6" />
                        </Button>

                        <Button
                            onClick={togglePlay}
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 shadow-lg"
                        >
                            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                        </Button>

                        <Button variant="ghost" size="lg" className="text-purple-700 hover:bg-purple-100 w-12 h-12 rounded-full">
                            <SkipForward className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
