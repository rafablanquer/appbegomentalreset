import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SkipBack, SkipForward, Pause, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AudioTrack } from "../../types/types";


const PlayListPlayer = ({ isPlaying, audioTracks, currentTrack, togglePlay, handlePrevious, handleNext, handleSeek, formatTime, currentTime, duration, showPlaylist, togglePlaylist, audioRef }: { isPlaying: boolean, audioTracks: AudioTrack[], currentTrack: number, togglePlay: () => void, handlePrevious: () => void, handleNext: () => void, handleSeek: (value: number[]) => void, formatTime: (time: number) => string, currentTime: number, duration: number, showPlaylist: boolean, togglePlaylist: () => void, audioRef: React.RefObject<HTMLAudioElement> }) => {
    return (
        <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-sage-200 p-6">
            <audio ref={audioRef} src={audioTracks[currentTrack].audioUrl} preload="metadata" />

            {/* Información del track */}
            <div className="text-center mb-6">
                <h3 className="text-sage-800 font-semibold text-lg mb-1">{audioTracks[currentTrack].title}</h3>
                <p className="text-sage-600 text-sm">
                    {currentTrack + 1} de {audioTracks.length} • {audioTracks[currentTrack].duration}
                </p>
            </div>

            {/* Barra de progreso */}
            <div className="mb-6">
                <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-sage-600 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controles de reproducción */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                    onClick={handlePrevious}
                    variant="ghost"
                    size="icon"
                    className="text-sage-700 hover:bg-sage-100 h-12 w-12 rounded-full"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                    onClick={togglePlay}
                    className="bg-sage-600 hover:bg-sage-700 text-white h-16 w-16 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-0.5" />}
                </Button>

                <Button
                    onClick={handleNext}
                    variant="ghost"
                    size="icon"
                    className="text-sage-700 hover:bg-sage-100 h-12 w-12 rounded-full"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>

            {/* Botón de playlist */}
            <div className="flex justify-center">
                <Button
                    onClick={togglePlaylist}
                    variant="outline"
                    className="bg-sage-50 hover:bg-sage-100 border-sage-300 text-sage-700 px-6 py-2 rounded-full shadow-sm transition-all duration-200"
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

export default PlayListPlayer;