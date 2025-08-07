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
            <Card className="w-full max-w-sm bg-sage-200/90 backdrop-blur-sm border-sage-300 p-6 mb-6">
                <h3 className="font-semibold text-sage-800 text-lg mb-2">{audioTracks[currentTrack].title}</h3>
                <p className="text-sage-700 text-sm leading-relaxed">{audioTracks[currentTrack].description}</p>
            </Card>

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
        </div>
    )
}

export default PlayListPanel;