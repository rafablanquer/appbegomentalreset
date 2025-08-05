import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SkipBack, SkipForward, Pause, Play, ChevronUp, ChevronDown } from "lucide-react";
import { AudioTrack } from "../../types/types";


const PlayListPlayer = ({ isPlaying, audioTracks, currentTrack, togglePlay, handlePrevious, handleNext, handleSeek, formatTime, currentTime, duration, showPlaylist, togglePlaylist, audioRef }: { isPlaying: boolean, audioTracks: AudioTrack[], currentTrack: number, togglePlay: () => void, handlePrevious: () => void, handleNext: () => void, handleSeek: (value: number[]) => void, formatTime: (time: number) => string, currentTime: number, duration: number, showPlaylist: boolean, togglePlaylist: () => void, audioRef: React.RefObject<HTMLAudioElement> }) => {
    return (
        <div>
            <audio ref={audioRef} src={audioTracks[currentTrack].audioUrl} preload="metadata" />

            <div className="mb-4">
                <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-sage-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-4">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={handlePrevious}
                    className="text-sage-700 hover:bg-sage-100 w-12 h-12 rounded-full"
                >
                    <SkipBack className="w-6 h-6" />
                </Button>

                <Button
                    onClick={togglePlay}
                    size="lg"
                    className="bg-sage-600 hover:bg-sage-700 text-white rounded-full w-16 h-16 shadow-lg"
                >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </Button>

                <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleNext}
                    className="text-sage-700 hover:bg-sage-100 w-12 h-12 rounded-full"
                >
                    <SkipForward className="w-6 h-6" />
                </Button>
            </div>

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

            <div className="text-center mt-3">
                <p className="text-sage-800 font-medium text-sm">{audioTracks[currentTrack].title}</p>
                <p className="text-sage-600 text-xs">
                    {currentTrack + 1} de {audioTracks.length} • {audioTracks[currentTrack].duration}
                </p>
            </div>
        </div>
    )
}

export default PlayListPlayer;