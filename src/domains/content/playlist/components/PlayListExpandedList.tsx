import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, ChevronUp, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const PlayListExpandedList = ({ audioTracks, currentTrack, selectTrack, togglePlaylist }: { audioTracks: AudioTrack[], currentTrack: number, selectTrack: (index: number) => void, togglePlaylist: () => void }) => {
    return (
        <div>
            < div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between z-20" >
                <div>
                    <h3 className="font-bold text-sage-800 text-lg">Lista de audios</h3>
                    <p className="text-sage-600 text-sm">{audioTracks.length} audios disponibles</p>
                </div>
                <Button variant="ghost" size="sm" onClick={togglePlaylist} className="text-sage-700 hover:bg-sage-100">
                    <ChevronUp className="w-5 h-5" />
                </Button>
            </div >

            {/* Playlist Items */}
            < div className="p-4 space-y-3 pb-20" >
                {
                    audioTracks.map((track, index) => (
                        <Card
                            key={track.id}
                            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${index === currentTrack ? "bg-sage-50 border-sage-300 shadow-sm" : "hover:bg-gray-50 border-gray-200"
                                }`}
                            onClick={() => selectTrack(index)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Track Number */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index === currentTrack ? "bg-sage-600 text-white" : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4
                                            className={`font-medium truncate ${index === currentTrack ? "text-sage-800" : "text-gray-800"
                                                }`}
                                        >
                                            {track.title}
                                        </h4>
                                        <span className="text-sage-600 text-sm ml-2 flex-shrink-0">{track.duration}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{track.description}</p>

                                    {/* Currently Playing Indicator */}
                                    {index === currentTrack && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex gap-1">
                                                <div className="w-1 h-3 bg-sage-600 rounded-full animate-pulse"></div>
                                                <div
                                                    className="w-1 h-3 bg-sage-600 rounded-full animate-pulse"
                                                    style={{ animationDelay: "0.2s" }}
                                                ></div>
                                                <div
                                                    className="w-1 h-3 bg-sage-600 rounded-full animate-pulse"
                                                    style={{ animationDelay: "0.4s" }}
                                                ></div>
                                            </div>
                                            <span className="text-sage-600 text-xs font-medium">Reproduciendo ahora</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div >
        </div >


    )
}

export default PlayListExpandedList;