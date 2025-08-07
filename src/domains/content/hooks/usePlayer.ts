"use client"

import { useState, useRef, useEffect } from "react"


export default function usePlayer(audioTracks: any[] = []) {
    const [currentTrack, setCurrentTrack] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)

        const handleAudioEnd = () => {
            // Si no es el último audio de la lista, pasar al siguiente automáticamente
            if (currentTrack < audioTracks.length - 1) {
                setCurrentTrack(prev => prev + 1)
                // Mantener el estado de reproducción para auto-reproducir
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play()
                        setIsPlaying(true)
                    }
                }, 100)
            } else {
                // Si es el último audio, detener la reproducción
                setIsPlaying(false)
            }
        }

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)
        audio.addEventListener("ended", handleAudioEnd)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", handleAudioEnd)
        }
    }, [currentTrack, audioTracks.length])

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

    const handleNext = () => {
        // Para el botón manual de siguiente, usar módulo para ciclar
        setCurrentTrack((prev) => (prev + 1) % audioTracks.length)
        setIsPlaying(false)
    }

    const handlePrevious = () => {
        setCurrentTrack((prev) => (prev - 1 + audioTracks.length) % audioTracks.length)
        setIsPlaying(false)
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

    const selectTrack = (index: number) => {
        setCurrentTrack(index)
        setIsPlaying(false)
    }

    const togglePlaylist = () => {
        setShowPlaylist(!showPlaylist)
        if (!showPlaylist) {
            // Scroll to playlist section when opening
            setTimeout(() => {
                document.getElementById("playlist-section")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }, 100)
        } else {
            // Scroll back to top when closing
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        showPlaylist,
        sideMenuOpen,
        togglePlay,
        handleNext,
        handlePrevious,
        handleSeek,
        formatTime,
        selectTrack,
        togglePlaylist,
        setSideMenuOpen,
        audioRef
    }
}
