'use client'
import React from 'react';

const HomeAppPage = () => {
  return (
    <>
      <div className="app-page">
        {/* Hero Section with Main Message */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Reprograma tu mente, rediseña tu vida</h1>
              <p>
                ¡Bienvenido a tu espacio de cambio! Haz click para
                descubrir cómo aprovechar al máximo esta experiencia BMR
              </p>
            </div>
            <div className="hero-image">
              <img
                src="/assets/home/branding-Begona-BMR-1-copia.png"
                alt="Begoña Mental Reset"
                className="hero-portrait"
              />
            </div>
          </div>
        </section>

        {/* Player Section */}
        <section className="player-section">
          <div className="player-container">
            <img
              src="/assets/home-app/hero-player.png"
              alt="Reproductor BMR"
              className="player-image"
            />
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
            background: linear-gradient(135deg, #f0f4f7 0%, #e8f2f6 100%);
            min-height: 100vh;
            padding-bottom: 120px; /* Space for fixed footer */
            font-family: 'Arial', sans-serif;
          }

          /* Hero Section */
          .hero-section {
            background: linear-gradient(135deg, #c8d5b9 0%, #b8c5a6 100%);
            padding: 30px 20px;
            border-radius: 0 0 30px 30px;
            margin-bottom: 20px;
            text-align: center;
          }

          .hero-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 400px;
            margin: 0 auto;
            gap: 20px;
          }

          .hero-text {
            flex: 1;
            text-align: left;
          }

          .hero-text h1 {
            font-size: 24px;
            font-weight: bold;
            color: #2d3a2e;
            margin: 0 0 10px 0;
            line-height: 1.2;
          }

          .hero-text p {
            font-size: 14px;
            color: #4a5a4d;
            margin: 0;
            line-height: 1.4;
          }

          .hero-image {
            flex-shrink: 0;
          }

          .hero-portrait {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid white;
          }

          /* Player Section */
          .player-section {
            padding: 0 20px 20px;
            text-align: center;
          }
          
          .player-container {
            max-width: 400px;
            margin: 0 auto;
          }

          .player-image {
            width: 100%;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
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
            max-width: 400px;
            margin: 0 auto;
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
            .hero-content {
              flex-direction: column;
              text-align: center;
            }
            
            .hero-text {
              text-align: center;
            }
            
            .hero-text h1 {
              font-size: 20px;
            }

            .programs-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .action-btn {
              font-size: 14px;
              padding: 12px 16px;
            }
          }

          /* Landscape Mobile */
          @media (max-width: 768px) and (orientation: landscape) {
            .hero-section {
              padding: 20px;
            }
            
            .hero-text h1 {
              font-size: 18px;
            }
            
            .hero-portrait {
              width: 80px;
              height: 80px;
            }

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