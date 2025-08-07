"use client"

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'

export interface AudioSession {
    id: number
    day: number
    title: string
    shortTitle?: string
    description: string
    duration: string
    audioUrl: string
    week?: number
    completed: boolean
    unlocked: boolean
}

interface AudioPlayerContextType {
    // Estado del reproductor
    currentSession: AudioSession | null
    isPlaying: boolean
    currentTime: number
    duration: number
    isMinimized: boolean

    // Acciones del reproductor
    setCurrentSession: (session: AudioSession | null) => void
    togglePlay: () => void
    toggleMinimized: () => void
    handleSeek: (value: number[]) => void
    goToPreviousSession?: () => void
    goToNextSession?: () => void

    // Referencia al audio
    audioRef: React.RefObject<HTMLAudioElement>
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext)
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
    }
    return context
}

interface AudioPlayerProviderProps {
    children: ReactNode
}

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
    const [currentSession, setCurrentSession] = useState<AudioSession | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMinimized, setIsMinimized] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)
        audio.addEventListener("ended", handleEnded)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", handleEnded)
        }
    }, [currentSession])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio || !currentSession) return

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

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized)
    }

    const setCurrentSessionAndMinimize = (session: AudioSession | null) => {
        setCurrentSession(session)
        if (session) {
            setIsMinimized(true) // Siempre minimizado al seleccionar nueva sesión
        }
    }

    const value = {
        currentSession,
        isPlaying,
        currentTime,
        duration,
        isMinimized,
        setCurrentSession: setCurrentSessionAndMinimize,
        togglePlay,
        toggleMinimized,
        handleSeek,
        audioRef,
    }

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    )
}