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
        <>
            <div className="app-page">
                <div className="hero-section">
                    <Image
                        src={heroPath}
                        alt="APP BMR Preview"
                        width={700}
                        height={400}
                        className="hero-image"
                    />
                </div>

                {/* Content Section */}
                <section className="content-section">
                    <div className="content-container">
                        <h1 className="main-title">{title}</h1>
                        {description ? (
                            typeof description === 'string' ? (
                                <p className="description">{description}</p>
                            ) : (
                                <div className="description">{description}</div>
                            )
                        ) : null}
                    </div>
                </section>

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

            <style jsx>{`
                .app-page {
                    background-color: rgb(255, 250, 239);
                    min-height: 100vh;
                    padding: 0 0 60px 0;
                    font-family: 'Arial', sans-serif;
                    position: relative;
                }

                /* Hero Section */
                .hero-section {
                    padding: 0;
                    text-align: center;
                    width: 100%;
                    margin: 0;
                }

                .hero-image {
                    width: 100vw;
                    height: auto;
                    border-radius: 0;
                    box-shadow: none;
                    margin-left: calc(-50vw + 50%);
                    object-fit: cover;
                }

                /* Content Section */
                .content-section {
                    padding: 30px 20px 20px 20px;
                    text-align: center;
                }

                .content-container {
                    max-width: 400px;
                    margin: 0 10vw;
                    margin-bottom: 16px;
                }

                .main-title {
                    font-size: 21px;
                    font-weight: 500;
                    color: #000;
                    margin-bottom: 8px;
                    text-align: center;
                }

                .description {
                    font-size: 16px;
                    color: #666;
                    line-height: 1.5;
                    text-align: center;
                    margin-bottom: 0;
                }

                /* Programs Section */
                .programs-section {
                    padding: 20px 20px 40px 20px;
                    flex: 1;
                }

                .programs-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 0 10px;
                }

                .program-card {
                    background: rgba(174, 188, 162, 0.9);
                    border-radius: 20px;
                    padding: 30px 20px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    text-align: center;
                    min-height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .program-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }

                .program-content {
                    width: 100%;
                }

                .program-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                    text-align: center;
                    line-height: 1.4;
                }

                /* Mobile Responsive */
                @media (max-width: 480px) {
                    .app-page {
                        padding: 0 0 30px 0;
                    }

                    .hero-section {
                        padding: 0;
                    }

                    .content-section {
                        padding: 25px 15px 25px 15px;
                    }

                    

                    .text-background {
                        padding: 20px 15px;
                        border-radius: 15px;
                        margin: 0 5px;
                    }

                    .description {
                        font-size: 15px;
                        line-height: 1.5;
                    }

                    .programs-grid {
                        gap: 12px;
                        padding: 0 5px;
                        max-width: 100%;
                    }

                    .program-card {
                        border-radius: 15px;
                        padding: 25px 15px;
                        min-height: 100px;
                    }

                    .program-title {
                        font-size: 14px;
                    }
                }

                /* Small screens */
                @media (max-width: 360px) {
                    .programs-grid {
                        gap: 10px;
                    }

                    .program-card {
                        min-height: 80px;
                        padding: 20px 15px;
                    }
                }

                /* Landscape Mobile */
                @media (max-width: 768px) and (orientation: landscape) {
                    .app-page {
                        padding-bottom: 40px;
                    }
                }
            `}</style>
        </>
    )
}

export default ProgramPanel