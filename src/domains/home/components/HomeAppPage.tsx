'use client'
import React from 'react';

const HomeAppPage = () => {

  return (
    <>
      <div className="app-page">

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