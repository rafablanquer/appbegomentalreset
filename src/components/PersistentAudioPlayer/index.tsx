"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { Play, Pause, SkipBack, SkipForward, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudioPlayer } from '@/providers/AudioPlayer'

export default function PersistentAudioPlayer() {
    const pathname = usePathname()

    // Array de rutas donde se debe mostrar el reproductor
    const allowedPaths = ['/reto-21-dias']

    // Verificar si la ruta actual está permitida
    const isAllowedPath = allowedPaths.some(path => pathname.includes(path))

    const {
        currentSession,
        isPlaying,
        currentTime,
        duration,
        isMinimized,
        togglePlay,
        toggleMinimized,
        handleSeek,
        audioRef,
    } = useAudioPlayer()

    // No renderizar si no hay sesión actual o si no está en una ruta permitida
    if (!currentSession || !isAllowedPath) return null

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <>
            {/* Audio element */}
            <audio ref={audioRef} src={currentSession.audioUrl} preload="metadata" />

            {/* Reproductor persistente */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 transition-all duration-300 ease-in-out shadow-lg ${isMinimized ? 'h-24' : 'h-56'
                }`}>

                {isMinimized ? (
                    // Versión minimizada
                    <div className="px-4 py-6 h-full ">
                        <div className="flex items-center gap-3 h-full pb-4">

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {currentSession.shortTitle || currentSession.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-gray-600">
                                        Día {currentSession.day}
                                    </p>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <p className="text-xs text-gray-600">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={togglePlay}
                                    className="text-gray-700 hover:bg-gray-100 hover:text-purple-600 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleMinimized}
                                    className="text-gray-600 hover:bg-gray-100 hover:text-purple-600 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="    px-4 pb-2">
                            <Slider
                                value={[currentTime]}
                                max={duration || 100}
                                step={1}
                                onValueChange={handleSeek}
                                className="w-full h-2"
                            />
                        </div>
                    </div>
                ) : (
                    // Versión expandida
                    <div className="px-4 py-3 h-full flex flex-col">
                        {/* Botón para minimizar */}
                        <div className="flex justify-end mb-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMinimized}
                                className="text-gray-600 hover:bg-gray-100 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-all border border-gray-200 hover:border-gray-300"
                            >
                                <Minimize2 className="w-3 h-3" />
                            </Button>
                        </div>

                        {/* Información de la sesión */}
                        <div className="text-center mb-3 flex-shrink-0">
                            <p className="text-gray-800 font-semibold text-base mb-1 truncate">
                                {currentSession.title}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Día {currentSession.day}
                            </p>
                        </div>

                        {/* Barra de progreso */}
                        <div className="mb-3 flex-shrink-0">
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

                        {/* Controles completos */}
                        <div className="flex items-center justify-center gap-6 flex-grow min-h-0">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="text-gray-600 hover:bg-gray-100 hover:text-purple-600 w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30 border border-gray-200 hover:border-purple-300 text-xl font-bold"
                            >
                                ⏮
                            </Button>


                            {isPlaying ? <Pause className="w-10 h-10" onClick={togglePlay}
                            /> : <Play className="w-10 h-10 ml-1" onClick={togglePlay} />}


                            <Button
                                variant="ghost"
                                size="lg"
                                className="text-gray-600 hover:bg-gray-100 hover:text-purple-600 w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30 border border-gray-200 hover:border-purple-300 text-xl font-bold"
                            >
                                ⏭
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}