'use client'

import Link from 'next/link'

const MembershipPricing = ({
  onSelect,
}: {
  onSelect?: (id: 'monthly' | 'quarterly' | 'annual') => void
}) => {
  return (
    <div className="et_pb_row">
      <div className="et_pb_column et_pb_column_4_4">
        <div className="et_pb_module et_pb_heading et_had_animation">
          <div className="et_pb_heading_container">
            <h3 className="pricing-main-title">Elige tu plan de reprogramación</h3>
          </div>
        </div>

        {/* Plan Mensual */}
        <div className="pricing-plan-wrapper">
          <div className="pricing-plan-title">
            <h2>PLAN MENSUAL 14,97 €/MES</h2>
          </div>
          <div className="pricing-plan-content">
            <ul>
              <li>Acceso completo a toda la biblioteca de reprogramación durante un mes, (luego se renueva)</li>
              <li>No incluye Zooms grupales.</li>
            </ul>
          </div>
          <div className="pricing-plan-button">
            <Link
              href="/pago-de-membresia?type=monthly"
              className="et_pb_button"
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault()
                  onSelect('monthly')
                }
              }}
            >
              QUIERO EL MENSUAL
            </Link>
          </div>
        </div>

        {/* Plan Trimestral */}
        <div className="pricing-plan-wrapper">
          <div className="pricing-plan-title">
            <h2>PLAN TRIMESTRAL 37,97 €/CADA 3 MESES (AHORRAS 6 €)</h2>
          </div>
          <div className="pricing-plan-content">
            <ul>
              <li>Accesos completo a toda la biblioteca de reprogramación durante 3 meses (luego se renueva)</li>
              <li>Zoom grupal trimestral para profundizar, resolver dudas y seguir integrando.</li>
            </ul>
          </div>
          <div className="pricing-plan-button">
            <Link
              href="/pago-de-membresia?type=quarterly"
              className="et_pb_button"
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault()
                  onSelect('quarterly')
                }
              }}
            >
              QUIERO EL TRIMESTRAL
            </Link>
          </div>
        </div>

        {/* Plan Anual */}
        <div className="pricing-plan-wrapper">
          <div className="pricing-plan-title">
            <h2>PLAN ANUAL 127,97 €/AÑO (AHORRAS 52 €)</h2>
          </div>
          <div className="pricing-plan-content">
            <ul>
              <li>Accesos completo a toda la biblioteca de reprogramación durante <strong>12 meses</strong> (luego se renueva)</li>
              <li>Incluye todos los Zooms grupales trimestrales del año.</li>
              <li>Contenido exclusivo para miembros anuales.</li>
            </ul>
          </div>
          <div className="pricing-plan-button">
            <Link
              href="/pago-de-membresia?type=annual"
              className="et_pb_button"
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault()
                  onSelect('annual')
                }
              }}
            >
              QUIERO EL ANUAL
            </Link>
          </div>
        </div>

        {/* <div className="important-notice">
                    <div className="important-title">
                        <h3>¡IMPORTANTE!</h3>
                    </div>
                    <div className="important-content">
                        <p>
                            Si tras rellenar el formulario con tu usuario, contraseña y correo, no completas tu pago o te ha dado error. No te preocupes, no tienes que empezar de cero.
                        </p>

                    </div>
                </div> */}
      </div>
      <style jsx>{`
          /* CSS Estático Base - Siempre funcional */
          @media (max-width: 480px) and (display-mode: standalone) {
            body {
              font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
              line-height: 1.5 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            .et_pb_section {
              display: block !important;
              width: 100% !important;
              padding: 15px !important;
              min-height: auto !important;
            }
            
            .et_pb_row {
              display: block !important;
              width: 100% !important;
            }
            
            .et_pb_column {
              display: block !important;
              width: 100% !important;
              float: none !important;
              margin-bottom: 15px !important;
            }
          }
          
          .landing-page {
            background-color: #f9f1e6;
            overflow-x: hidden;
            font-family: 'Inter', 'Open Sans', Arial, sans-serif;
            font-size: 16px;
            color: #4a4a4a;
            line-height: 1.6em;
            font-weight: 400;
          }
          
          .container {
            width: 80%;
            max-width: 1080px;
            margin: auto;
            position: relative;
          }
          
          .et_pb_section {
            position: relative;
            background-color: #f9f1e6;
            background-position: 50%;
            background-size: cover;
            padding: 60px 0;
          }
          
          .et_pb_row {
            width: 80%;
            max-width: 1080px;
            margin: auto;
            position: relative;
            padding: 2% 0;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
          }
          
          .et_pb_column {
            background-size: cover;
            background-position: 50%;
            position: relative;
            z-index: 2;
            min-height: 1px;
            padding: 20px;
            box-sizing: border-box;
          }
          
          .et_pb_column_1_2 {
            width: 50%;
          }
          
          .et_pb_column_1_3 {
            width: 33.333%;
          }
          
          .et_pb_column_2_3 {
            width: 66.666%;
          }
          
          .et_pb_column_4_4 {
            width: 100%;
          }
          
          @media (max-width: 980px) {
            .et_pb_column {
              width: 100% !important;
              margin-bottom: 30px;
            }
            
            .et_pb_section {
              padding: 50px 0;
            }
            
            .et_pb_row {
              padding: 30px 0;
              flex-direction: column;
            }
          }
          
          .et_pb_module {
            margin-bottom: 30px;
          }
          
          .et_pb_heading_container h1,
          .et_pb_heading_container h2,
          .et_pb_heading_container h3,
          .et_pb_heading_container h4,
          .et_pb_heading_container h5,
          .et_pb_heading_container h6 {
            color: #333;
            line-height: 1em;
            font-weight: 500;
            margin: 0;
          }
          
          .et_pb_heading_container h1 {
            font-size: 48px;
            font-weight: 700;
            text-align: center;
          }
          
          .et_pb_heading_container h2 {
            font-size: 28px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 20px;
          }
          
          .et_pb_heading_container h3 {
            font-size: 32px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 30px;
          }
          
          .et_pb_text_inner {
            line-height: 1.7em;
            word-wrap: break-word;
          }
          
          .et_pb_text_inner p {
            padding-bottom: 1em;
            margin: 0;
          }
          
          .et_pb_text_inner p:last-child {
            padding-bottom: 0;
          }
          
          .et_pb_button {
            font-size: 18px;
            font-weight: 600;
            padding: 12px 24px;
            line-height: 1.4em !important;
            background-color: #a3b18a;
            border: none;
            border-radius: 25px;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
            color: white;
            cursor: pointer;
            position: relative;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .et_pb_button:hover {
            background-color: #8fa076;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(163, 177, 138, 0.4);
          }
          
          .et_pb_button_alignment_center {
            text-align: center;
          }
          
          .et_pb_button_alignment_right {
            text-align: right;
          }
          
          .et_pb_image_wrap {
            display: inline-block;
            position: relative;
            max-width: 100%;
          }
          
          .et_pb_image {
            display: block;
            margin: 0 auto;
            line-height: 0;
          }
          
          .hero-image,
          .logo {
            max-width: 100%;
            height: auto;
          }
          
          .et_pb_video_box {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            overflow: hidden;
            border-radius: 8px;
          }
          
          .et_pb_video_box iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
          
          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            background: linear-gradient(45deg, rgba(163, 177, 138, 0.1), rgba(163, 177, 138, 0.05));
            border-radius: 8px;
            pointer-events: none;
          }
          
          .play-button {
            cursor: pointer;
            transition: transform 0.3s ease;
            pointer-events: all;
          }
          
          .play-button:hover {
            transform: scale(1.1);
          }
          
          .et_pb_gallery_items {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .et_pb_gallery_item {
            flex: 1;
            min-width: 200px;
          }
          
          .et_pb_gallery_image img {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }
          
          .et_pb_accordion {
            margin-bottom: 30px;
          }
          
          .et_pb_toggle {
            border: 1px solid #e6e1d9;
            margin-bottom: 14px;
            border-radius: 12px;
            overflow: clip;
            background: #fff;
            box-shadow: 0 1px 0 rgba(0,0,0,0.03);
          }
          
          .faq-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            background: #fbf6ef;
            padding: 18px 18px 18px 20px;
            border-bottom: 1px solid #efe9e0;
          }

          .et_pb_toggle_title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #2b2b2b;
          }

          .faq-toggle-btn {
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            border: 1px solid #ddd6c8;
            background: #ffffff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, transform 0.15s ease;
          }

          .faq-toggle-btn:hover {
            background: #f3f0ea;
          }

          .faq-toggle-btn:active {
            transform: scale(0.98);
          }
          
          .et_pb_toggle_title:hover {
            /* titulo no cambia fondo; el contenedor header maneja hover */
          }
          
          .et_pb_toggle_content {
            padding: 20px;
            background: #fff;
            transition: height 0.3s ease, padding 0.3s ease, opacity 0.2s ease;
          }
          
          .et_pb_toggle_close {
            border-color: #eee7dd;
          }

          .et_pb_toggle_close .et_pb_toggle_content {
            display: none;
          }
          
          .et_pb_with_border {
            border: 2px solid #e5e5e5;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background: #fff;
          }
          
          ul {
            list-style-type: disc;
            padding-left: 20px;
            line-height: 1.6;
          }
          
          li {
            margin-bottom: 8px;
          }
          
          .pricing-section {
            background: #f9f1e6;
            padding: 60px 0 70px 0;
          }
          
          .pricing-main-title {
            color: #8fa383 !important;
            font-size: 32px !important;
            font-weight: 700 !important;
            text-align: center !important;
            margin-bottom: 36px !important;
            letter-spacing: 0.5px;
          }
          
          .pricing-plan-wrapper {
            background: transparent;
            margin: 38px auto;
            box-shadow: none;
            border-radius: 0;
            overflow: visible;
            max-width: 980px;
          }
          
          .pricing-plan-title {
            background: transparent;
            padding: 0 20px 8px;
            text-align: center;
          }
          
          .pricing-plan-title h2 {
            color: #2b2b2b !important;
            font-size: 24px !important;
            font-weight: 800 !important;
            margin: 0 !important;
            text-align: center !important;
            letter-spacing: 0.5px;
          }
          
          .pricing-plan-content {
            background: transparent;
            padding: 18px 20px 8px;
          }
          
          .pricing-plan-content ul {
            list-style: disc;
            padding-left: 24px;
            margin: 0 auto;
            max-width: 680px;
          }
          
          .pricing-plan-content li {
            color: #2b2b2b;
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 14px;
            padding-left: 0;
            position: relative;
          }
          
          .pricing-plan-content li:before {
            content: none;
          }
          
          .pricing-plan-button {
            background: transparent;
            padding: 8px 20px 28px;
            text-align: center;
          }

          .pricing-plan-button .et_pb_button {
            background-color: #8fa383 !important;
            color: #ffffff !important;
            border: 2px solid #6f8a61 !important;
            border-radius: 8px !important;
            font-weight: 700 !important;
            letter-spacing: 0.8px !important;
            padding: 14px 28px !important;
            min-width: 280px;
            box-shadow: 0 2px 0 rgba(0,0,0,0.12);
          }

          .pricing-plan-button .et_pb_button:hover {
            background-color: #7a926e !important;
            border-color: #617a55 !important;
            transform: translateY(-1px);
          }
          
          .important-notice {
            margin-top: 60px;
            text-align: center;
          }
          
          .important-title h3 {
            color: #a3b18a !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            margin-bottom: 20px !important;
          }
          
          .important-content {
            max-width: 600px;
            margin: 0 auto;
          }
          
          .important-content p {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
          }
          
          .hero-section {
            background: #f9f1e6;
            text-align: center;
          }
          
          .features-section {
            background: #fff;
          }
          
          .about-section {
            background: #f3f6f0;
          }

          /* Sección ¿Qué encontrarás dentro? */
          .about-intro {
            text-align: center;
          }

          .about-image :global(img) {
            display: block;
            margin: 0 auto 10px auto;
            max-width: 420px;
            height: auto;
          }

          .about-subtitle p {
            font-size: 18px;
            color: #4a4a4a;
            text-align: center;
            margin: 0 auto;
            max-width: 740px;
            line-height: 1.6;
          }

          .about-cards-row {
            margin-top: 10px;
          }

          .about-card {
            background: #ffffff;
            border: 2px solid #dad5cc;
            border-radius: 14px;
            padding: 26px 28px;
            margin: 18px auto;
            max-width: 980px;
            box-shadow: 0 1px 0 rgba(0,0,0,0.02);
          }

          .about-card p {
            margin: 0;
            text-align: center;
            font-size: 20px;
            line-height: 1.7;
            color: #1a1a1a;
          }

          @media (max-width: 767px) {
            .about-image :global(img) {
              max-width: 300px;
            }
            .about-card {
              padding: 22px 20px;
              border-radius: 12px;
            }
            .about-card p {
              font-size: 18px;
            }
          }
          
          .stats-section {
            background: rgba(163, 177, 138, 0.61) !important;
            color: #ffffff;
          }
          
          .stats-section .et_pb_heading_container h1,
          .stats-section .et_pb_heading_container h2,
          .stats-section .et_pb_heading_container h3 {
            color: white;
          }
          
          .stats-list {
            margin: 30px auto;
            max-width: 720px;
          }
          
          .stat-item {
            margin-bottom: 16px;
            padding: 18px 20px;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 10px;
            border-left: 4px solid #ffffff;
          }
          
          .stat-item p {
            margin: 0;
            color: #ffffff;
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
          }

          .stats-section .et_pb_image img {
            width: 100%;
            height: auto;
            max-width: 520px;
            display: block;
            margin: 0 auto 10px auto;
          }

          .cta-section {
            background: #a3b18a;
            color: white;
          }
          
          .cta-section .et_pb_heading_container h1,
          .cta-section .et_pb_heading_container h2,
          .cta-section .et_pb_heading_container h3 {
            color: white;
          }
          
          .process-steps {
            margin: 30px 0;
          }
          
          .process-steps .et_pb_module_heading {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          
          .faq-section {
            background: #f0f0f0;
          }
          
          /* Header Styles */
          .header {
            background: white;
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
					align-items: center;
            max-width: 1080px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .logo-container {
            flex: 1;
          }
          
          .cta-container {
            flex: 1;
            text-align: right;
          }
          
          /* Animation classes */
          .et_had_animation {
            animation: fadeInUp 1s ease-out;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Feature Icons */
          .feature-icon {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          
          .feature-icon svg {
            margin: 0 auto;
          }
          
          .challenge-row {
            background: #f3f6f0;
            border-radius: 15px;
            padding: 40px 30px;
            margin: 40px 0;
          }

          /* Footer Styles */
          .footer {
            background: #333;
            color: white;
            padding: 40px 0;
            text-align: center;
          }
          
          .footer-content {
            max-width: 1080px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          /* Mobile Responsive */
          @media (max-width: 767px) {
            .header-content {
              flex-direction: column;
              gap: 20px;
            }
            
            .cta-container {
              text-align: center;
            }
            
            .et_pb_heading_container h1 {
              font-size: 24px;
            }
            
            .et_pb_heading_container h2 {
              font-size: 20px;
            }
            
            .et_pb_heading_container h3 {
              font-size: 18px;
            }
            
            .et_pb_button {
              font-size: 18px;
              padding: 0.5em 1.2em;
            }
            
            .pricing-plan {
              margin: 20px 0;
            }
          }
        `}</style>
    </div>
  )
}

export default MembershipPricing