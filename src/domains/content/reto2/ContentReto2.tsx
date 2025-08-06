"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  MoreHorizontal,
  ChevronUp,
  Download,
  HelpCircle,
  FileText,
  Check,
  Lock,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

interface Session {
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

const sessions: Record<number, Session[]> = {
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

function ProgressRing({ value, total }: { value: number; total: number }) {
  const percentage = (value / total) * 100
  const circumference = 2 * Math.PI * 20
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="3" fill="none" className="text-gray-200" />
        <circle
          cx="22"
          cy="22"
          r="20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-purple-600 transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-purple-600">
          {value}/{total}
        </span>
      </div>
    </div>
  )
}

function SessionChip({ session, onSelect }: { session: Session; onSelect: () => void }) {
  const getStatusIcon = () => {
    if (session.completed) return <Check className="w-4 h-4 text-green-600" />
    if (!session.unlocked) return <Lock className="w-4 h-4 text-gray-400" />
    return <Clock className="w-4 h-4 text-purple-600" />
  }

  const getStatusColor = () => {
    if (session.completed) return "border-green-200 bg-green-50"
    if (!session.unlocked) return "border-gray-200 bg-gray-50"
    return "border-purple-200 bg-white hover:bg-purple-50"
  }

  return (
    <button
      onClick={session.unlocked ? onSelect : undefined}
      className={`snap-start shrink-0 w-64 h-24 rounded-2xl border p-3 text-left transition-all ${getStatusColor()} ${!session.unlocked ? "cursor-not-allowed" : "hover:shadow-md"
        }`}
      disabled={!session.unlocked}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="text-sm font-medium line-clamp-1 text-gray-800">{session.shortTitle}</div>
        {getStatusIcon()}
      </div>
      <div className="text-xs text-gray-500">{session.duration}</div>
      <div className="text-xs text-purple-600 font-medium">Día {session.day}</div>
    </button>
  )
}

function WeekCarousel({
  week,
  sessions: weekSessions,
  onSessionSelect,
}: {
  week: number
  sessions: Session[]
  onSessionSelect: (session: Session) => void
}) {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden">
      <div className="flex gap-3 px-4 py-4 h-full">
        {weekSessions.map((session) => (
          <SessionChip key={session.id} session={session} onSelect={() => onSessionSelect(session)} />
        ))}
      </div>
    </div>
  )
}

function MiniPlayer({
  currentSession,
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
}: {
  currentSession: Session | null
  isPlaying: boolean
  onTogglePlay: () => void
  currentTime: number
  duration: number
  onSeek: (value: number[]) => void
}) {
  if (!currentSession) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Sheet>
      <div className="border-t bg-white px-4 py-2 h-16">
        <div className="flex items-center justify-between mb-1">
          <button onClick={onTogglePlay} className="w-8 h-8 flex items-center justify-center">
            {isPlaying ? <Pause className="w-5 h-5 text-purple-600" /> : <Play className="w-5 h-5 text-purple-600" />}
          </button>
          <div className="flex-1 px-3 min-w-0">
            <div className="text-sm font-medium line-clamp-1 text-gray-800">{currentSession.title}</div>
          </div>
          <SheetTrigger asChild>
            <button className="w-8 h-8 flex items-center justify-center">
              <ChevronUp className="w-5 h-5 text-gray-600" />
            </button>
          </SheetTrigger>
        </div>
        <div className="px-8">
          <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={onSeek} className="w-full h-1" />
        </div>
      </div>

      <SheetContent side="bottom" className="h-[70dvh] rounded-t-2xl">
        <div className="flex flex-col h-full">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left">{currentSession.title}</SheetTitle>
          </SheetHeader>

          <div className="flex-1 space-y-6">
            {/* Audio Controls */}
            <div className="space-y-4">
              <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={onSeek} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-6">
                <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full">
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button
                  onClick={onTogglePlay}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full">
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{currentSession.description}</p>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">Notas personales</h3>
              <textarea
                placeholder="Escribe tus reflexiones sobre esta sesión..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function RetoBMR() {
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const weeks = [1, 2, 3]
  const allSessions = Object.values(sessions).flat()
  const completedCount = allSessions.filter((s) => s.completed).length
  const totalCount = allSessions.length
  const nextSession = allSessions.find((s) => s.unlocked && !s.completed)

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

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session)
    setCurrentSession(session)
    setIsPlaying(false)
  }

  const handleContinue = () => {
    if (nextSession) {
      handleSessionSelect(nextSession)
    }
  }

  return (
    <main className="flex flex-col h-[100dvh] bg-gradient-to-br from-purple-50 to-indigo-50">
      {currentSession && <audio ref={audioRef} src={currentSession.audioUrl} preload="metadata" />}

      {/* AppBar */}
      <header className="flex items-center justify-between px-4 h-12 border-b bg-white/80 backdrop-blur-sm">
        <Link href="/home" className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-semibold text-gray-800">Reto BMR</h1>
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-8 h-8 flex items-center justify-center">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Opciones</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <Link
                href="/reto-bmr/instrucciones"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Instrucciones (PDF)</span>
              </Link>
              <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left">
                <Download className="w-5 h-5 text-purple-600" />
                <span>Descargar semana</span>
              </button>
              <Link href="/ayuda" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <span>Soporte</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Resumen + CTA */}
      <section className="px-4 py-4 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <ProgressRing value={completedCount} total={totalCount} />
          <div className="flex-1">
            <h2 className="text-sm text-gray-600 mb-1">&quot;Desarrolla tu mejor versión en 3 semanas&quot;</h2>
            <p className="text-xs text-gray-500 mb-3">Racha: 3 días consecutivos 🔥</p>
            {nextSession && (
              <Button
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm"
              >
                Continuar {nextSession.title}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Selector de semana (sticky) */}
      <nav className="px-4 py-3 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b">
        <div className="flex gap-2">
          {weeks.map((week) => (
            <button
              key={week}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${week === selectedWeek
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"
                }`}
              onClick={() => setSelectedWeek(week)}
            >
              Semana {week}
            </button>
          ))}
        </div>
      </nav>

      {/* Carrusel horizontal de sesiones */}
      <section className="flex-1 overflow-hidden">
        <WeekCarousel week={selectedWeek} sessions={sessions[selectedWeek]} onSessionSelect={handleSessionSelect} />
      </section>

      {/* Mini-player sticky */}
      <MiniPlayer
        currentSession={currentSession}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      {/* Session Detail Sheet */}
      {selectedSession && !currentSession && (
        <Sheet open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
          <SheetContent side="bottom" className="h-[40dvh] rounded-t-2xl">
            <SheetHeader className="pb-4">
              <SheetTitle>{selectedSession.title}</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{selectedSession.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{selectedSession.duration}</span>
              </div>
              <Button
                onClick={() => {
                  setCurrentSession(selectedSession)
                  setSelectedSession(null)
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Reproducir
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </main>
  )
}
