'use client'
import React, { useEffect, useRef, useState } from 'react';

// Evita errores de TypeScript cuando aún no está cargado el script de Vimeo
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
  const vimeoVideoId = 1101953160; // ID del vídeo
  const desiredQuality = '540p'; // Cambia a '540p' si quieres aún menos peso

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    if (!isVideoPlaying) return;

    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !videoContainerRef.current || !window.Vimeo?.Player) return;
      // Limpieza previa si existiera
      if (playerRef.current) {
        try {
          playerRef.current.unload?.();
          playerRef.current.destroy?.();
        } catch { }
        playerRef.current = null;
      }

      playerRef.current = new window.Vimeo.Player(videoContainerRef.current, {
        id: vimeoVideoId,
        autoplay: true,
        byline: false,
        title: false,
        portrait: false,
        controls: true,
        // Importante para rendimiento en móviles
        responsive: true,
        // Intento de arrancar en baja latencia si el navegador lo soporta
        playsinline: true,
      });

      // Fijar calidad deseada (Vimeo puede ajustar si no está disponible)
      playerRef.current
        .setQuality(desiredQuality)
        .catch(() => {
          // Si no se puede forzar, ignoramos: el reproductor elegirá adaptativo
        });
    };

    const ensureScript = () => {
      if (window.Vimeo?.Player) {
        createPlayer();
        return;
      }
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://player.vimeo.com/api/player.js"]');
      if (existing) {
        existing.addEventListener('load', createPlayer, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', createPlayer, { once: true });
      document.body.appendChild(script);
    };

    ensureScript();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.unload?.();
          playerRef.current.destroy?.();
        } catch { }
        playerRef.current = null;
      }
    };
  }, [isVideoPlaying]);

  return (
    <>
      <div className="app-page">

        {/* Player Section */}
        <section className="player-section">
          <div className="player-container">
            {!isVideoPlaying ? (
              <div onClick={handlePlayVideo}>
                <img
                  src="/assets/home-app/hero-player.png"
                  alt="Reproductor BMR"
                  className="player-image"
                />
                <div className="play-button-overlay">
                  <div className="play-button">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                      <path
                        d="M23 18L23 42L41 30L23 18Z"
                        fill="#4a5568"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-container">
                <div ref={videoContainerRef} className="vimeo-player-root" />
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
              />
            </div>

            <div className="program-card">
              <img
                src="/assets/home-app/neuropausa.png"
                alt="Neuropausa"
                className="program-image"
              />
            </div>

            <div className="program-card">
              <img
                src="/assets/home-app/reprogramacion.png"
                alt="Reprogramación Nocturna"
                className="program-image"
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

        {/* Coming Soon Footer - Fixed at bottom */}
        <footer className="coming-soon-footer">
          <img
            src="/assets/home-app/comming-soon.png"
            alt="Coming Soon - BegoIA chatbot entrenado por Begoña (Próximamente)"
            className="coming-soon-image"
          />
        </footer>



        <style jsx>{`
          .app-page {
            background: url('/assets/home-app/backgrround.png');
            background-size: cover;
            background-position: bottom center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            min-height: calc(100vh - 120px); /* Exclude footer height */
            padding: 20px 0 120px 0; /* Top padding and space for fixed footer */
            font-family: 'Arial', sans-serif;
            position: relative;
          }

          /* Player Section */
          .player-section {
            padding: 0 15px 20px 15px;
            text-align: center;
          }
          
          .player-container {
            width: 100%;
            position: relative;
            transition: transform 0.3s ease;
          }

          .player-container > div:first-child {
            cursor: pointer;
          }

          .player-container > div:first-child:hover {
            transform: scale(1.02);
          }

          .video-container {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }

          .video-container iframe,
          .video-container .vimeo-player-root {
            border-radius: 15px;
            aspect-ratio: 16/9;
            height: auto;
            width: 100%;
            display: block;
          }

          .player-image {
            width: 100%;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
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
            border-radius: 15px;
          }

          .play-button {
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
          }

          .play-button:hover {
            transform: scale(1.1);
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
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
            max-width: 100%;
            margin: 0 auto;
            padding: 0 10px;
          }

          .program-card {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
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
            margin: 0 auto;
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
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .breathing-btn {
            background: #4a5568;
          }

          .challenge-btn {
            background: #4a5568;
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          }

          /* Coming Soon Footer - Fixed at bottom */
          .coming-soon-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: transparent;
            padding: 0;
          }

          .coming-soon-image {
            width: 100%;
            height: auto;
            display: block;
          }
          
          /* Mobile Responsive */
          @media (max-width: 480px) {
            .app-page {
              background-attachment: scroll; /* Better performance on mobile */
            }

            .player-section {
              padding: 0 10px 20px 10px;
            }

            .programs-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
              padding: 0 5px;
            }

            .program-card {
              border-radius: 10px;
            }

            .action-btn {
              font-size: 14px;
              padding: 12px 16px;
            }
          }

          /* Landscape Mobile */
          @media (max-width: 768px) and (orientation: landscape) {
            .app-page {
              padding-bottom: 80px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HomeAppPage;