'use client'
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

declare global {
  interface Window {
    Vimeo?: {
      Player: any;
    };
  }
}

const HomeAppPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const vimeoVideoId = 1101953160;

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    if (!isVideoPlaying) return;

    const loadVimeoPlayer = () => {
      // Si ya existe el player, no hacer nada
      if (playerRef.current) return;

      // Crear el player de Vimeo
      if (window.Vimeo?.Player && videoContainerRef.current) {
        playerRef.current = new window.Vimeo.Player(videoContainerRef.current, {
          id: vimeoVideoId,
          autoplay: true,
          byline: false,
          title: false,
          portrait: false,
          controls: true,
          responsive: true,
          playsinline: true,
          // Importante: no forzar calidad específica, dejar que Vimeo maneje el bitrate adaptativo
        });

        // Manejar errores silenciosamente
        playerRef.current.on('error', (error: any) => {
          console.error('Vimeo player error:', error);
        });
      }
    };

    // Cargar el script de Vimeo si no está presente
    if (!window.Vimeo?.Player) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = loadVimeoPlayer;
      document.body.appendChild(script);
    } else {
      loadVimeoPlayer();
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Error destroying player:', e);
        }
        playerRef.current = null;
      }
    };
  }, [isVideoPlaying]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
      </Head>

      <div className="app-page">
        {/* Player Section */}
        <section className="player-section">
          <div className="player-container">
            {!isVideoPlaying ? (
              <div className="thumbnail-wrapper" onClick={handlePlayVideo}>
                <div className="hero-image-wrapper">
                  <Image
                    src="/assets/home-app/hero-player.png"
                    alt="Reproductor BMR"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="player-image"
                  />
                </div>
                <div className="play-button-overlay">
                  <div className="play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                      <path d="M23 18L23 42L41 30L23 18Z" fill="#4a5568" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-wrapper">
                <div ref={videoContainerRef} className="vimeo-container" />
              </div>
            )}
          </div>
        </section>

        {/* Programs Section */}
        <section className="programs-section">
          <div className="programs-grid">
            <div className="program-card">
              <img
                src="/assets/home-app/neurociencia.png"
                alt="Neurodespertar"
                className="program-image"
                loading="lazy"
              />
            </div>
            <div className="program-card">
              <img
                src="/assets/home-app/neuropausa.png"
                alt="Neuropausa"
                className="program-image"
                loading="lazy"
              />
            </div>
            <div className="program-card">
              <img
                src="/assets/home-app/reprogramacion.png"
                alt="Reprogramación Nocturna"
                className="program-image"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="action-buttons">
          <button className="action-btn breathing-btn">
            🎙️ Respiraciones Conscientes
          </button>
          <button className="action-btn challenge-btn">
            👆 ¡Novedad! Reto bmr activo
          </button>
        </section>

        {/* Coming Soon Footer */}
        <footer className="coming-soon-footer">
          <img
            src="/assets/home-app/comming-soon.png"
            alt="Coming Soon"
            className="coming-soon-image"
            loading="lazy"
          />
        </footer>

        <style jsx>{`
          .app-page {
            background: url('/assets/home-app/backgrround.png');
            background-size: cover;
            background-position: bottom center;
            background-repeat: no-repeat;
            min-height: 100vh;
            padding: 20px 0;
            font-family: 'Arial', sans-serif;
          }

          /* Player Section */
          .player-section {
            padding: 0 15px 20px 15px;
          }
          
          .player-container {
            max-width: 800px;
            margin: 0 auto;
          }

          .thumbnail-wrapper {
            cursor: pointer;
            position: relative;
          }

          .hero-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .player-image {
            object-fit: cover;
          }

          .play-button-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .play-button {
            transition: transform 0.3s ease;
          }

          .play-button:hover {
            transform: scale(1.1);
          }

          /* Video Container - Simplificado */
          .video-wrapper {
            width: 100%;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            background: #000;
          }

          .vimeo-container {
            width: 100%;
            aspect-ratio: 16/9;
          }

          /* Fix para evitar tropiezos en el video */
          .vimeo-container iframe {
            width: 100% !important;
            height: 100% !important;
            border: none;
            display: block;
          }

          /* Programs Section */
          .programs-section {
            padding: 20px;
            margin-bottom: 20px;
          }

          .programs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            max-width: 800px;
            margin: 0 auto;
          }

          .program-card {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .program-image {
            width: 100%;
            height: auto;
            display: block;
          }

          /* Action Buttons */
          .action-buttons {
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 400px;
            margin: 0 auto 30px;
          }

          .action-btn {
            background: #4a5568;
            color: white;
            border: none;
            padding: 15px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          }

          /* Footer */
          .coming-soon-footer {
            padding: 0;
            max-width: 800px;
            margin: 0 auto;
          }

          .coming-soon-image {
            width: 100%;
            height: auto;
            display: block;
          }
          
          /* Mobile */
          @media (max-width: 480px) {
            .player-section {
              padding: 0 10px 20px 10px;
            }

            .programs-grid {
              gap: 8px;
              padding: 0 5px;
            }

            .action-btn {
              font-size: 14px;
              padding: 12px 16px;
            }
          }

          /* Modo Fullscreen - importante para evitar tropiezos */
          @media all and (display-mode: fullscreen) {
            .video-wrapper {
              border-radius: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HomeAppPage;