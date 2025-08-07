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
        <div className="flex flex-col items-center space-y-4" style={{ paddingLeft: '7.5vw', paddingRight: '7.5vw' }}>
            <Card className="w-full max-w-xs  bg-sage-200/80 backdrop-blur-sm border-sage-300 p-4 mx-auto">
                <h3 className="font-medium text-sage-800 text-base mb-1 text-center">{audioTracks[currentTrack].title}</h3>
                <p className="text-sage-700 text-xs leading-relaxed text-center opacity-80">{audioTracks[currentTrack].description}</p>
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