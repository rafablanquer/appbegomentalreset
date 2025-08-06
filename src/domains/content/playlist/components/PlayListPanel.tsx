"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, ChevronUp, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import PlayListPlayer from "./PlayListPlayer"
import { AudioTrack } from "../../types/types"

const PlayListPanel = ({ showPlaylist, togglePlaylist, audioTracks, currentTrack }: { showPlaylist: boolean, togglePlaylist: () => void, audioTracks: AudioTrack[], currentTrack: number }) => {
    const audioRef = useRef<HTMLAudioElement>(null)
    
    return (
        <div>
            <h1>PlayListPanel</h1>
            <Card className="w-full max-w-sm bg-sage-200/90 backdrop-blur-sm border-sage-300 p-6 mb-6">
                <h3 className="font-semibold text-sage-800 text-lg mb-2">{audioTracks[currentTrack].title}</h3>
                <p className="text-sage-700 text-sm leading-relaxed">{audioTracks[currentTrack].description}</p>
            </Card>


            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">NEURODESPERTAR</h2>
                <p className="text-white/90 text-sm leading-relaxed max-w-sm drop-shadow">
                    Activa tu mente. Dirige tu día desde el primer pensamiento. Lo que piensas y sientes al despertar
                    condiciona tu día. Estos audios están diseñados para activar tu sistema límbico en un estado emocional
                    positivo, potenciar tu motivación y enfocar tu atención hacia lo que sí quieres lograr hoy.
                </p>
            </div>


            <PlayListPlayer 
                isPlaying={false} 
                audioTracks={audioTracks} 
                currentTrack={currentTrack} 
                togglePlay={() => { }} 
                handlePrevious={() => { }} 
                handleNext={() => { }} 
                handleSeek={() => { }} 
                formatTime={() => "0:00"} 
                currentTime={0}
                duration={0}
                showPlaylist={showPlaylist}
                togglePlaylist={togglePlaylist}
                audioRef={audioRef as React.RefObject<HTMLAudioElement>} 
            />
            <div className="flex justify-center">
                <Button
                    onClick={togglePlaylist}
                    variant="outline"
                    className="bg-sage-50 hover:bg-sage-100 border-sage-300 text-sage-700 px-6 py-2 rounded-full shadow-sm"
                >
                    <span className="mr-2 text-sm font-medium">
                        {showPlaylist ? "Ocultar lista" : "Ver todos los audios"}
                    </span>
                    {showPlaylist ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    )
}

export default PlayListPanel;