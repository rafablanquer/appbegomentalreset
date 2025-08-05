'use client'
import React from 'react';

const HomeAppPage = () => {
  return (
    <>
      <div className="landing-page">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo-container">
              <img
                src="/assets/branding-Begona-BMR-1-2.png"
                alt="BMR - Begoña Mental Reset"
                className="logo"
                style={{ maxHeight: '60px' }}
              />
            </div>
            <div className="cta-container">
              <a
                href="#membresias"
                className="et_pb_button"
                style={{
                  backgroundColor: '#a3b18a',
                  color: 'white',
                  borderColor: '#a3b18a'
                }}
              >
                Únete a la App
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="et_pb_section hero-section" style={{ backgroundColor: '#fefaef' }}>
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_1_2">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h1 className="et_pb_module_heading">
                    Tu mente necesita un reset.<br />
                    Tu cuerpo te lo está pidiendo a gritos.
                  </h1>
                </div>
              </div>

              <div className="et_pb_module et_pb_text">
                <div className="et_pb_text_inner">
                  <p>
                    <strong>¿Te sientes atrapada en patrones que no te gustan?</strong><br />
                    ¿Cansada de prometerte cambios que nunca llegan?<br />
                    ¿Frustrada porque sabes lo que tienes que hacer, pero no lo haces?
                  </p>
                  <p>
                    <strong>No eres perezosa. No te falta fuerza de voluntad.</strong><br />
                    Lo que te falta es el método correcto.
                  </p>
                </div>
              </div>

              <div className="et_pb_module et_pb_button_module_wrapper et_pb_button_alignment_center">
                <a
                  href="#membresias"
                  className="et_pb_button"
                  style={{
                    backgroundColor: '#a3b18a',
                    color: 'white',
                    borderColor: '#a3b18a',
                    fontSize: '22px',
                    padding: '0.5em 2em'
                  }}
                >
                  Descubre el método BMR
                </a>
              </div>
            </div>

            <div className="et_pb_column et_pb_column_1_2">
              <div className="et_pb_module et_pb_image">
                <span className="et_pb_image_wrap">
                  <img
                    src="/assets/home/branding-Begona-BMR-1-1.png"
                    alt="Begoña Mental Reset - Método de transformación"
                    className="hero-image"
                  />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="et_pb_section features-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_1_2">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading">
                    Te cuento todo lo que encontrarás en la app y lo que he preparado para ti.
                  </h3>
                </div>
              </div>

              <div className="et_pb_module et_pb_video">
                <div className="et_pb_video_box">
                  <iframe
                    title="App bmr"
                    src="https://player.vimeo.com/video/1101974445?dnt=1&amp;app_id=122963"
                    width="640"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="et_pb_column et_pb_column_1_2">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading">
                    Esto es lo que vas a conseguir con BMR:
                  </h3>
                </div>
              </div>

              <div className="et_pb_module et_pb_text">
                <div className="et_pb_text_inner">
                  <ul>
                    <li><strong>Claridad mental:</strong> Pensamientos organizados, sin el ruido constante</li>
                    <li><strong>Energía sostenida:</strong> Despertarte con ganas, no por obligación</li>
                    <li><strong>Confianza real:</strong> Saber que puedes confiar en ti misma</li>
                    <li><strong>Hábitos que se mantienen:</strong> Sin fuerza de voluntad, por automatismo</li>
                    <li><strong>Gestión emocional:</strong> Responder en lugar de reaccionar</li>
                    <li><strong>Propósito claro:</strong> Saber hacia dónde vas y por qué</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="membresias" className="et_pb_section pricing-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_4_4">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                    Elige tu plan de reprogramación
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_1_2">
              {/* Plan Mensual */}
              <div className="pricing-plan">
                <div className="et_pb_with_border et_pb_module et_pb_heading">
                  <div className="et_pb_heading_container">
                    <h2 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                      Plan Mensual
                    </h2>
                  </div>
                </div>

                <div className="et_pb_module et_pb_text">
                  <div className="et_pb_text_inner" style={{ textAlign: 'center' }}>
                    <p><strong style={{ fontSize: '36px', color: '#a3b18a' }}>€29</strong><br />por mes</p>
                    <ul style={{ textAlign: 'left' }}>
                      <li>Acceso completo a la app BMR</li>
                      <li>Todos los programas de reprogramación</li>
                      <li>Comunidad exclusiva</li>
                      <li>Updates mensuales de contenido</li>
                      <li>Soporte por chat</li>
                    </ul>
                  </div>
                </div>

                <div className="et_pb_module et_pb_button_module_wrapper et_pb_button_alignment_center">
                  <a
                    href="https://payments.stripe.com/pay/link-mensual"
                    className="et_pb_button"
                    style={{
                      backgroundColor: '#a3b18a',
                      color: 'white',
                      borderColor: '#a3b18a'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Empezar ahora
                  </a>
                </div>
              </div>
            </div>

            <div className="et_pb_column et_pb_column_1_2">
              {/* Plan Anual */}
              <div className="pricing-plan" style={{ borderColor: '#a3b18a', borderWidth: '3px' }}>
                <div className="et_pb_with_border et_pb_module et_pb_heading">
                  <div className="et_pb_heading_container">
                    <h2 className="et_pb_module_heading" style={{ textAlign: 'center', color: '#a3b18a' }}>
                      Plan Anual
                      <span style={{
                        display: 'block',
                        fontSize: '14px',
                        color: '#fff',
                        backgroundColor: '#a3b18a',
                        padding: '5px',
                        borderRadius: '5px',
                        marginTop: '10px'
                      }}>
                        ¡Ahorra 2 meses!
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="et_pb_module et_pb_text">
                  <div className="et_pb_text_inner" style={{ textAlign: 'center' }}>
                    <p>
                      <strong style={{ fontSize: '36px', color: '#a3b18a' }}>€290</strong><br />
                      por año
                      <br />
                      <small style={{ color: '#999' }}>€24.17/mes</small>
                    </p>
                    <ul style={{ textAlign: 'left' }}>
                      <li>Todo lo del plan mensual</li>
                      <li><strong>2 meses gratis</strong></li>
                      <li>Acceso prioritario a nuevos contenidos</li>
                      <li>Sesiones grupales exclusivas</li>
                      <li>Recursos adicionales y bonus</li>
                    </ul>
                  </div>
                </div>

                <div className="et_pb_module et_pb_button_module_wrapper et_pb_button_alignment_center">
                  <a
                    href="https://payments.stripe.com/pay/link-anual"
                    className="et_pb_button"
                    style={{
                      backgroundColor: '#a3b18a',
                      color: 'white',
                      borderColor: '#a3b18a'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Empezar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="et_pb_section about-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_1_3">
              <div className="et_pb_module et_pb_image">
                <span className="et_pb_image_wrap">
                  <img
                    src="/assets/home/branding-Begona-BMR-4.png"
                    alt="Begoña Mendez"
                    style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                </span>
              </div>
            </div>

            <div className="et_pb_column et_pb_column_2_3">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading">
                    Hola, soy Begoña
                  </h3>
                </div>
              </div>

              <div className="et_pb_module et_pb_text">
                <div className="et_pb_text_inner">
                  <p>
                    Durante años me sentí exactamente como tú: sabía lo que tenía que hacer,
                    pero no conseguía hacerlo de manera consistente.
                  </p>
                  <p>
                    Hasta que entendí que el problema no era mi falta de motivación o disciplina.
                    El problema era que estaba intentando cambiar desde la superficie,
                    sin tocar las estructuras profundas que gobiernan nuestro comportamiento.
                  </p>
                  <p>
                    <strong>BMR nació de mi propia necesidad de resetear mi mente</strong> y crear
                    un sistema que realmente funcionara. No teorías bonitas, sino herramientas
                    prácticas basadas en neurociencia y psicología cognitiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="et_pb_section cta-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_4_4">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h2 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                    El proceso BMR en 3 pasos
                  </h2>
                </div>
              </div>

              <div className="process-steps">
                <div className="et_pb_row">
                  <div className="et_pb_column et_pb_column_1_3">
                    <div className="et_pb_module et_pb_heading">
                      <div className="et_pb_heading_container">
                        <h3 className="et_pb_module_heading">
                          1. Identifica
                        </h3>
                      </div>
                    </div>
                    <div className="et_pb_module et_pb_text">
                      <div className="et_pb_text_inner">
                        <p>
                          Descubre los patrones mentales que te mantienen atrapada.
                          Sin juzgar, solo observando con curiosidad científica.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="et_pb_column et_pb_column_1_3">
                    <div className="et_pb_module et_pb_heading">
                      <div className="et_pb_heading_container">
                        <h3 className="et_pb_module_heading">
                          2. Reprograma
                        </h3>
                      </div>
                    </div>
                    <div className="et_pb_module et_pb_text">
                      <div className="et_pb_text_inner">
                        <p>
                          Instala nuevos circuitos neuronales usando técnicas específicas
                          que trabajan con tu cerebro, no contra él.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="et_pb_column et_pb_column_1_3">
                    <div className="et_pb_module et_pb_heading">
                      <div className="et_pb_heading_container">
                        <h3 className="et_pb_module_heading">
                          3. Integra
                        </h3>
                      </div>
                    </div>
                    <div className="et_pb_module et_pb_text">
                      <div className="et_pb_text_inner">
                        <p>
                          Consolida los cambios hasta que se vuelvan automáticos.
                          Tu nueva forma de ser, sin esfuerzo consciente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="et_pb_section" style={{ backgroundColor: '#f9f9f9' }}>
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_4_4">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                    Un vistazo a la app BMR
                  </h3>
                </div>
              </div>

              <div className="et_pb_module et_pb_gallery">
                <div className="et_pb_gallery_items">
                  <div className="et_pb_gallery_item">
                    <div className="et_pb_gallery_image">
                      <img
                        src="/assets/home/7-400x284.png"
                        alt="Pantalla de la app BMR"
                      />
                    </div>
                  </div>
                  <div className="et_pb_gallery_item">
                    <div className="et_pb_gallery_image">
                      <img
                        src="/assets/home/8-400x284.png"
                        alt="Ejercicios de reprogramación"
                      />
                    </div>
                  </div>
                  <div className="et_pb_gallery_item">
                    <div className="et_pb_gallery_image">
                      <img
                        src="/assets/home/10-400x284.png"
                        alt="Seguimiento de progreso"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="et_pb_section faq-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_4_4">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h3 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                    Preguntas frecuentes
                  </h3>
                </div>
              </div>

              <div className="et_pb_module et_pb_accordion">
                <div className="et_pb_toggle et_pb_toggle_close">
                  <h5 className="et_pb_toggle_title">
                    ¿Cuánto tiempo necesito dedicarle cada día?
                  </h5>
                  <div className="et_pb_toggle_content">
                    <p>
                      El programa está diseñado para personas ocupadas. Con 10-15 minutos diarios
                      es suficiente para ver cambios significativos. La clave está en la consistencia,
                      no en la cantidad de tiempo.
                    </p>
                  </div>
                </div>

                <div className="et_pb_toggle et_pb_toggle_close">
                  <h5 className="et_pb_toggle_title">
                    ¿Funciona realmente o es más autoayuda?
                  </h5>
                  <div className="et_pb_toggle_content">
                    <p>
                      BMR está basado en neurociencia aplicada y psicología cognitiva. No es autoayuda
                      tradicional, sino técnicas específicas que trabajan directamente con los
                      mecanismos cerebrales de formación de hábitos y cambio de patrones.
                    </p>
                  </div>
                </div>

                <div className="et_pb_toggle et_pb_toggle_close">
                  <h5 className="et_pb_toggle_title">
                    ¿Puedo cancelar cuando quiera?
                  </h5>
                  <div className="et_pb_toggle_content">
                    <p>
                      Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil de usuario.
                      No hay compromisos de permanencia ni penalizaciones.
                    </p>
                  </div>
                </div>

                <div className="et_pb_toggle et_pb_toggle_close">
                  <h5 className="et_pb_toggle_title">
                    ¿Qué pasa si no veo resultados?
                  </h5>
                  <div className="et_pb_toggle_content">
                    <p>
                      Si sigues el programa durante 30 días y no notas cambios significativos,
                      te devolvemos el dinero. Creemos tanto en el método que podemos ofrecer
                      esta garantía.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="et_pb_section cta-section">
          <div className="et_pb_row">
            <div className="et_pb_column et_pb_column_4_4">
              <div className="et_pb_module et_pb_heading et_had_animation">
                <div className="et_pb_heading_container">
                  <h2 className="et_pb_module_heading" style={{ textAlign: 'center' }}>
                    ¿Lista para tu reset mental?
                  </h2>
                </div>
              </div>

              <div className="et_pb_module et_pb_text">
                <div className="et_pb_text_inner" style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '20px' }}>
                    Miles de mujeres ya han transformado su vida con BMR.<br />
                    Tu momento es ahora.
                  </p>
                </div>
              </div>

              <div className="et_pb_module et_pb_button_module_wrapper et_pb_button_alignment_center">
                <a
                  href="#membresias"
                  className="et_pb_button"
                  style={{
                    backgroundColor: 'white',
                    color: '#a3b18a',
                    borderColor: 'white',
                    fontSize: '24px',
                    padding: '0.7em 3em'
                  }}
                >
                  Empezar mi transformación
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 BMR - Begoña Mental Reset. Todos los derechos reservados.</p>
          </div>
        </footer>

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
            background-color: #fefaef;
            overflow-x: hidden;
            font-family: 'Open Sans', Arial, sans-serif;
            font-size: 14px;
            color: #666;
            line-height: 1.7em;
            font-weight: 500;
          }
          
          .container {
            width: 80%;
            max-width: 1080px;
            margin: auto;
            position: relative;
          }
          
          .et_pb_section {
            position: relative;
            background-color: #fff;
            background-position: 50%;
            background-size: cover;
            padding: 4% 0;
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
            padding-bottom: 10px;
            line-height: 1em;
            font-weight: 500;
            margin: 0;
          }
          
          .et_pb_heading_container h1 {
            font-size: 30px;
          }
          
          .et_pb_heading_container h2 {
            font-size: 26px;
          }
          
          .et_pb_heading_container h3 {
            font-size: 22px;
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
            font-size: 20px;
            font-weight: 500;
            padding: 0.3em 1em;
            line-height: 1.7em !important;
            background-color: transparent;
            border: 2px solid;
            border-radius: 3px;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;
            color: #2ea3f2;
            border-color: #2ea3f2;
            cursor: pointer;
            position: relative;
          }
          
          .et_pb_button:hover {
            background-color: rgba(255, 255, 255, 0.2);
            padding: 0.3em 2em 0.3em 0.7em;
            border-color: transparent;
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
            border: 1px solid #ddd;
            margin-bottom: 10px;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .et_pb_toggle_title {
            background: #f8f8f8;
            padding: 20px;
            margin: 0;
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            font-size: 18px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          
          .et_pb_toggle_title:hover {
            background: #e8e8e8;
          }
          
          .et_pb_toggle_content {
            padding: 20px;
            background: #fff;
            transition: all 0.3s ease;
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
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          .pricing-plan {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            border: 3px solid transparent;
            transition: all 0.3s ease;
          }
          
          .pricing-plan:hover {
            border-color: #a3b18a;
            transform: translateY(-5px);
          }
          
          .features-section {
            background: #f9f9f9;
          }
          
          .about-section {
            background: #fff;
          }
          
          .cta-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    </>
  );
};

export default HomeAppPage;