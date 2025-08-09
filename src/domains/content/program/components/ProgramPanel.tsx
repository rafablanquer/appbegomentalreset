'use client'
import Image from "next/image"
import PlayListPanel from "../../playlist/components/PlayListPanel"
import usePlayer from "../../hooks/usePlayer"
import type React from 'react'

const ProgramPanel = ({ title, description, heroPath, activities }: { title: string, description?: React.ReactNode, keywords: string[], activities: any, heroPath: string, }) => {
    const {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        showPlaylist,
        togglePlay,
        handleNext,
        handlePrevious,
        handleSeek,
        formatTime,
        selectTrack,
        togglePlaylist,
        audioRef
    } = usePlayer(activities)

    return (
        <div className="bg-[rgb(255,250,239)] min-h-screen">
            {/* Contenido con padding inferior para evitar solapar con posibles reproductores fijos */}
            <div className="pb-[172px] sm:pb-[180px]">
                {/* Hero full width con imagen, degradado y textos superpuestos */}
                <section aria-label="Portada" className="relative">
                    <div
                        className="relative w-full"
                        style={{
                            height: "46vh",
                            minHeight: "340px",
                            maxHeight: "520px",
                        }}
                    >
                        <Image
                            src={heroPath}
                            alt="Portada del programa"
                            fill
                            priority
                            className="object-cover"
                        />

                        {/* Degradado para legibilidad del texto */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/70" />

                        {/* Difuminado inferior para fundir con el fondo */}
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                            style={{
                                WebkitMaskImage:
                                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
                                maskImage:
                                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
                                background:
                                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--background) 100%)",
                            }}
                        />

                        {/* Textos superpuestos */}
                        <div className="absolute inset-0 flex items-end">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold drop-shadow-md">
                                    {title}
                                </h1>
                                {description ? (
                                    typeof description === "string" ? (
                                        <p className="mt-2 text-white/90 text-sm sm:text-base md:text-lg max-w-3xl">
                                            {description}
                                        </p>
                                    ) : (
                                        <div className="mt-2 text-white/90 text-sm sm:text-base md:text-lg max-w-3xl">
                                            {description}
                                        </div>
                                    )
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Player y contenido principal */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <PlayListPanel
                        showPlaylist={showPlaylist}
                        togglePlaylist={togglePlaylist}
                        audioTracks={activities}
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                        togglePlay={togglePlay}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        handleSeek={handleSeek}
                        formatTime={formatTime}
                        selectTrack={selectTrack}
                        currentTime={currentTime}
                        duration={duration}
                        audioRef={audioRef}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgramPanel