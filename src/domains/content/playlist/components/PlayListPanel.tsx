"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, ChevronUp, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import PlayListPlayer from "./PlayListPlayer"
import PlayListExpandedList from "./PlayListExpandedList"
import { AudioTrack } from "../../types/types"

const PlayListPanel = ({
    showPlaylist,
    togglePlaylist,
    audioTracks,
    currentTrack,
    isPlaying = false,
    togglePlay = () => { },
    handleNext = () => { },
    handlePrevious = () => { },
    handleSeek = () => { },
    formatTime = () => "0:00",
    selectTrack = () => { },
    currentTime = 0,
    duration = 0,
    audioRef
}: {
    showPlaylist: boolean,
    togglePlaylist: () => void,
    audioTracks: AudioTrack[],
    currentTrack: number,
    isPlaying?: boolean,
    togglePlay?: () => void,
    handleNext?: () => void,
    handlePrevious?: () => void,
    handleSeek?: (value: number[]) => void,
    formatTime?: (time: number) => string,
    selectTrack?: (index: number) => void,
    currentTime?: number,
    duration?: number,
    audioRef?: React.RefObject<HTMLAudioElement>
}) => {
    const defaultAudioRef = useRef<HTMLAudioElement>(null)
    const usedAudioRef = audioRef || defaultAudioRef

    return (
        <div className="w-full px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
            {!showPlaylist ? (
                <div className="flex flex-col items-center space-y-6">
                    {/* Card de información del track actual */}
                    <Card className="w-full max-w-md bg-sage-200/80 backdrop-blur-sm border-sage-300 p-4 mx-auto">
                        <h3 className="font-medium text-sage-800 text-base mb-1 text-center">{audioTracks[currentTrack].title}</h3>
                        <p className="text-sage-700 text-xs leading-relaxed text-center opacity-80">{audioTracks[currentTrack].description}</p>
                    </Card>

                    {/* Player mejorado */}
                    <PlayListPlayer
                        isPlaying={isPlaying}
                        audioTracks={audioTracks}
                        currentTrack={currentTrack}
                        togglePlay={togglePlay}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        handleSeek={handleSeek}
                        formatTime={formatTime}
                        currentTime={currentTime}
                        duration={duration}
                        showPlaylist={showPlaylist}
                        togglePlaylist={togglePlaylist}
                        audioRef={usedAudioRef}
                    />
                </div>
            ) : (
                <div id="playlist-section" className="w-full">
                    {/* Lista expandida de audios */}
                    <PlayListExpandedList
                        audioTracks={audioTracks}
                        currentTrack={currentTrack}
                        selectTrack={selectTrack}
                        togglePlaylist={togglePlaylist}
                    />
                </div>
            )}
        </div>
    )
}

export default PlayListPanel;