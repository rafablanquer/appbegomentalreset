"use client"

import React from 'react'
import { Play, Pause, ChevronLeft, ChevronRight, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudioPlayer } from '@/providers/AudioPlayer'

export default function PersistentAudioPlayer() {
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

    // No renderizar si no hay sesión actual
    if (!currentSession) return null

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
            <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 transition-all duration-300 ease-in-out shadow-lg ${isMinimized ? 'h-20' : 'h-56'
                }`}>

                {isMinimized ? (
                    // Versión minimizada
                    <div className="px-4 py-3 h-full">
                        <div className="flex items-center gap-3 h-full">
                            {/* Información de la sesión */}
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

                            {/* Controles básicos */}
                            <div className="flex items-center gap-2">
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
                                    className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Barra de progreso minimalista */}
                        <div className="absolute bottom-0 left-0 right-0 px-4 pb-1">
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
                                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-all"
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
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>

                            <Button
                                onClick={togglePlay}
                                size="lg"
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
                            >
                                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                            </Button>

                            <Button
                                variant="ghost"
                                size="lg"
                                className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}