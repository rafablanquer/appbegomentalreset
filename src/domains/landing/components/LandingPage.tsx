'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ButtonUnete from '@/components/Buttons/ButtonUnete'
import MembershipPricing from '@/domains/membership/components/MembershipPricing'

interface LandingPageProps {
	data?: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ data }) => {
	const [activeAccordions, setActiveAccordions] = useState<{ [key: string]: boolean }>({
		'0': true,
		'2': true
	});

	useEffect(() => {
		// PWA Cache detection logic
		const isPWAMobile = () => {
			return /Android|iPhone|iPod/i.test(navigator.userAgent) &&
				window.innerWidth <= 480 &&
				window.matchMedia('(display-mode: standalone)').matches;
		}

		const isCacheCorrupted = () => {
			const diviElements = document.querySelectorAll('.et_pb_section, .et_pb_row');
			if (diviElements.length === 0) return false;

			const firstSection = diviElements[0] as HTMLElement;
			if (!firstSection) return false;

			const styles = window.getComputedStyle(firstSection);

			const hasBasicStyles = (
				styles.display !== 'none' &&
				styles.visibility !== 'hidden' &&
				parseInt(styles.width) > 0 &&
				styles.fontFamily !== 'initial'
			);

			return !hasBasicStyles;
		}

		const intelligentCacheRefresh = () => {
			if (!isPWAMobile()) return;

			const lastCheck = localStorage.getItem('pwa_last_cache_check');
			const now = Date.now();
			const cooldownTime = 60000;

			if (lastCheck && (now - parseInt(lastCheck)) < cooldownTime) {
				return;
			}

			localStorage.setItem('pwa_last_cache_check', now.toString());

			setTimeout(() => {
				if (isCacheCorrupted()) {
					console.log('🔄 Cache corrupto detectado - Limpieza inteligente');

					if ('caches' in window) {
						caches.keys().then(cacheNames => {
							const superPWACaches = cacheNames.filter(name =>
								name.includes('superpwa') || name.includes('pwa')
							);

							if (superPWACaches.length > 0) {
								Promise.all(
									superPWACaches.map(name => caches.delete(name))
								).then(() => {
									setTimeout(() => {
										if (typeof window !== 'undefined') {
											(window as any).location.reload();
										}
									}, 500);
								});
							}
						});
					} else {
						if (typeof window !== 'undefined') {
							(window as any).location.reload();
						}
					}

					const fixes = parseInt(localStorage.getItem('pwa_cache_fixes') || '0');
					localStorage.setItem('pwa_cache_fixes', (fixes + 1).toString());
				} else {
					console.log('✅ Cache PWA funcionando correctamente');
				}
			}, 2000);
		}

		const handleLoad = () => intelligentCacheRefresh();
		const handleVisibilityChange = () => {
			if (!document.hidden && isPWAMobile()) {
				setTimeout(intelligentCacheRefresh, 1000);
			}
		};
		const handleOnline = () => {
			if (isPWAMobile()) {
				setTimeout(intelligentCacheRefresh, 2000);
			}
		};

		window.addEventListener('load', handleLoad);
		document.addEventListener('visibilitychange', handleVisibilityChange);
		window.addEventListener('online', handleOnline);

		return () => {
			window.removeEventListener('load', handleLoad);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			window.removeEventListener('online', handleOnline);
		};
	}, []);

	const toggleAccordion = (index: string) => {
		setActiveAccordions(prev => ({
			...prev,
			[index]: !prev[index]
		}));
	};

	return (
		<>
			<Head>
				<title>APP BMR - Begoña Mental Reset</title>
				<meta name="description" content="Entrena tu subconsciente con audios BMR, ondas cerebrales y visualizaciones para un cambio real y sostenible." />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
				<meta name="theme-color" content="#fefaef" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

				{/* SEO Meta Tags */}
				<meta property="og:locale" content="es_ES" />
				<meta property="og:site_name" content="BMR - Begoña Mental Reset - BMR - Resetea tu mente" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="APP BMR - Begoña Mental Reset" />
				<meta property="og:description" content="Entrena tu subconsciente con audios BMR, ondas cerebrales y visualizaciones para un cambio real y sostenible." />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="APP BMR - Begoña Mental Reset" />

				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@graph": [
								{
									"@type": "Organization",
									"@id": "/#organization",
									"name": "BMR - Begoña Mental Reset",
									"description": "BMR - Resetea tu mente",
									"url": "/"
								},
								{
									"@type": "WebPage",
									"@id": "/#webpage",
									"url": "/",
									"name": "APP BMR - Begoña Mental Reset",
									"inLanguage": "es-ES",
									"isPartOf": { "@id": "/#website" }
								},
								{
									"@type": "WebSite",
									"@id": "/#website",
									"url": "/",
									"name": "BMR - Begoña Mental Reset",
									"description": "BMR - Resetea tu mente",
									"inLanguage": "es-ES",
									"publisher": { "@id": "/#organization" }
								}
							]
						})
					}}
				/>
			</Head>

			<div className="landing-page">


				<section className="et_pb_section hero-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_2_3">
							<div className="et_pb_module et_pb_heading et_had_animation">
								<div className="et_pb_heading_container">
									<h1 className="et_pb_module_heading">APP BMR</h1>
								</div>
							</div>

							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h2 className="et_pb_module_heading"
										style={
											{
												color: "rgb(192, 198, 168)"
											}
										}
									>UN ESPACIO PARA REPROGRAMAR TU MENTE</h2>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Entrena tu subconsciente con audios BMR, ondas cerebrales y visualizaciones para un cambio real y sostenible.
									</p>
								</div>
							</div>

							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/Sin-titulo-1280-x-720-px-1284-x-600-px-700-x-900-px-1.png"
									alt="APP BMR Preview"
									width={700}
									height={900}
									className="hero-image"
								/>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_3">
							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										<strong>¡Bienvenido a la app BMR!</strong>
									</p>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Desde el primer día en el que te registras, accedes a una biblioteca de audios diseñada para impactar directamente en tu subconsciente, reprogramar tus creencias limitantes y activar tu mente desde la neurociencia.
									</p>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										<strong>Cada audio está estructurado para ayudarte a modificar patrones mentales mientras entrenas tu cerebro para funcionar a tu favor.</strong>
									</p>
								</div>
							</div>

							<div className="et_pb_button_module_wrapper et_pb_button_alignment_center et_had_animation">
								<ButtonUnete onClick={() => { }} style={{
									backgroundColor: "#ffffff",
									color: "#4a4a4a",
									textTransform: "uppercase",
									borderColor: "#ffffff",
									borderWidth: "1px",
									borderStyle: "solid",
									fontSize: "16px",
									fontWeight: "bold",
									padding: "10px 26px",
									marginTop: "20px",
								}} />

							</div>
						</div>
					</div>


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
									<div className="video-overlay">
										<div className="play-button">
											<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.9" />
												<path d="M8 5v14l11-7z" fill="#a3b18a" />
											</svg>
										</div>
									</div>
									<iframe
										title="App bmr"
										src="https://player.vimeo.com/video/1101974445?dnt=1&app_id=122963"
										frameBorder="0"
										allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										loading="lazy"
									/>
								</div>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<Image
									src="/assets/home/imgSec1.png"
									alt="Begoña Mental Reset"
									width={160}
									height={160}
									loading="lazy"
								/>
							</div>
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h2 className="et_pb_module_heading">Audios matinales y nocturnos</h2>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Unos te ayudan a enfocar tu mente y comenzar el día desde tu nueva identidad. Otros a hacer una reprogramación mental mientras duermes.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Additional Features Rows */}
					<div className="et_pb_row">

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<Image
									src="/assets/home/imgSec2.png"
									alt="Begoña Mental Reset"
									width={160}
									height={160}
									loading="lazy"
								/>
							</div>
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h2 className="et_pb_module_heading">Ejercicios de respiración guiada</h2>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Para bajar el ritmo de tus ondas cerebrales y entrenar el sistema nervioso, sobre todo en momentos en los que necesites calmar tu mente y reducir la ansiedad.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="et_pb_row">

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<Image
									src="/assets/home/imgSec3.png"
									alt="Begoña Mental Reset"
									width={160}
									height={160}
									loading="lazy"
								/>
							</div>
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h2 className="et_pb_module_heading">Zooms trimestrales</h2>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Incluídas en planes largos (pago trimestral y anual) para profundizar, resolver dudas y seguir reprogramando juntos.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="   ">
						<div className="feature-icon">
							<Image
								src="/assets/home/imgSec4.png"
								alt="Begoña Mental Reset"
								width={160}
								height={160}
								loading="lazy"
							/>
						</div>
						<div className="et_pb_module et_pb_heading">
							<div className="et_pb_heading_container">
								<h2 className="et_pb_module_heading">Reto de 3 semanas para reprogramarte y desarrollar tu mejor versión</h2>
							</div>
						</div>

						<div className="et_pb_module et_pb_text">
							<div className="et_pb_text_inner">
								<p style={{ textAlign: 'center' }}>
									9 audios y ejercicios diarios que activan tu sistema reticular atencional, reorientando tu enfoque hacia lo que realmente quieres crear. Te ofrecen reprogramar identidad, creencias y percepción de tu realidad.
								</p>
							</div>
						</div>
					</div>


				</section>


				<section className="et_pb_section stats-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">Esto es lo que está ocurriendo en la APP BMR</h3>
								</div>
							</div>

							<div className="   ">
								<div className="   ">
									<Image
										src="/assets/home/branding-Begona-BMR-1-copia.png"
										alt="Begoña Mental Reset"
										width={500}
										height={650}
										loading="lazy"
									/>
								</div>
							</div>

							<div className="stats-list">
								<div   >
									<p><strong>Más de 2000 personas entrenan su mente cada día con estos audios.</strong></p>
								</div>

								<div className="stat-item">
									<p><strong>Se reproducen miles de minutos diarios de transformación real.</strong></p>
								</div>

								<div className="stat-item">
									<p><strong>Aquí no se medita para calmarse únicamente. Se entrena para reprogramarse.</strong></p>
								</div>

								<div className="stat-item">
									<p><strong>Cada audio es una herramienta para romper creencias y crear nuevas formas de pensar, sentir y vivir.</strong></p>
								</div>
							</div>

							<div className="et_pb_button_module_wrapper et_pb_button_alignment_center et_had_animation">
								<ButtonUnete onClick={() => { }} style={{
									backgroundColor: "rgb(163, 177, 138)",
									color: "white",
									textTransform: "uppercase",
									borderColor: "black",
									borderWidth: "1px",
									borderStyle: "solid",
									fontSize: "16px",
									fontWeight: "bold",
									padding: "10px 26px",
									marginTop: "20px",
								}} />

							</div>
						</div>
					</div>
				</section>


				<section className="et_pb_section about-section"
					style={{
						backgroundColor: "rgb(250, 241, 230)",
					}}>
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_4_4 about-intro">
							<div className="about-image">
								<Image
									src="/assets/home/Sin-titulo-1280-x-720-px-1284-x-600-px-700-x-900-px-copia-3.png.png"
									alt="¿Qué encontrarás dentro?"
									width={700}
									height={900}
									loading="lazy"
								/>
							</div>
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">¿Qué encontrarás dentro?</h3>
								</div>
							</div>
							<div className="about-subtitle">
								<p>
									En resumen, tienes acceso estructurado y claro y un método de reprogramación creado por una neuropsicóloga especializa.
								</p>
							</div>
						</div>
					</div>

					<div className="et_pb_row about-cards-row">
						<div className="et_pb_column et_pb_column_4_4">
							<div className="about-card">
								<p>
									Todos los audios y entrenamientos están organizados en áreas permitiéndote avanzar con foco y sin dispersión a lo largo del día.
								</p>
							</div>

							<div className="about-card">
								<p>
									Trabajas con reprogramaciones, respiraciones y visualizaciones diseñadas para activar tu sistema reticular, entrenar tu mente y regular tu sistema nervioso.
								</p>
							</div>

							<div className="about-card">
								<p>
									Todo está diseñado por Begoña, experta en neuropsicología y reprogramación mental, asegurando que cada audio sea un paso real hacia el cambio que buscas.
								</p>
							</div>
						</div>
					</div>
				</section>



				{/* CTA Section */}
				<section className="et_pb_section cta-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_4_4">
							<div className="et_pb_module et_pb_heading et_had_animation">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">
										Hazte con la APP BMR (solo disponible para móvil)
									</h3>
								</div>
							</div>

							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/branding-Begona-BMR-4.png"
									alt="BMR App"
									width={1080}
									height={1350}
									loading="lazy"
								/>
							</div>

							<div className="process-steps">
								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">1. Elige el plan que encaje contigo</h2>
									</div>
								</div>

								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">2. Paga de forma segura</h2>
									</div>
								</div>

								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">3. Recibe tu acceso inmediato al espacio</h2>
									</div>
								</div>

								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">4. Dale al play y empieza a reprogramar tu mente hoy mismo</h2>
									</div>
								</div>

								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">
											Cada vez que escuchas un audio, una parte de ti se reorganiza. Este es tu punto de partida.
										</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Pricing Section */}
				<section id="membresias" className="et_pb_section pricing-section">
					<MembershipPricing />

					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_4_4">
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">¿Tienes dudas?</h3>
								</div>
							</div>

							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/branding-Begona-BMR-1-1.png"
									alt="Begoña - BMR"
									width={1080}
									height={1350}
									loading="lazy"
								/>
							</div>

							<div className="et_pb_module et_pb_accordion">
								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<div
										className="faq-header"
										onClick={() => toggleAccordion('0')}
										role="button"
										aria-expanded={!!activeAccordions['0']}
										aria-controls="faq-content-0"
									>
										<h5 className="et_pb_toggle_title">¿Para quién es este espacio?</h5>
										<button
											type="button"
											className="faq-toggle-btn"
											aria-label={activeAccordions['0'] ? 'Contraer' : 'Expandir'}
											onClick={(e) => { e.stopPropagation(); toggleAccordion('0'); }}
										>
											{activeAccordions['0'] ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14" stroke="#8e8e8e" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M12 5v14M5 12h14" stroke="#8e8e8e" />
												</svg>
											)}
										</button>
									</div>
									<div id="faq-content-0" className={`et_pb_toggle_content ${activeAccordions['0'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Para quienes están listos para dejar de repetir patrones y comenzar a reprogramar su mente con ciencia, intención y resultados.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<div
										className="faq-header"
										onClick={() => toggleAccordion('1')}
										role="button"
										aria-expanded={!!activeAccordions['1']}
										aria-controls="faq-content-1"
									>
										<h5 className="et_pb_toggle_title">¿Necesito tener experiencia previa en meditación o neurociencia?</h5>
										<button
											type="button"
											className="faq-toggle-btn"
											aria-label={activeAccordions['1'] ? 'Contraer' : 'Expandir'}
											onClick={(e) => { e.stopPropagation(); toggleAccordion('1'); }}
										>
											{activeAccordions['1'] ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14" stroke="#8e8e8e" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M12 5v14M5 12h14" stroke="#8e8e8e" />
												</svg>
											)}
										</button>
									</div>
									<div id="faq-content-1" className={`et_pb_toggle_content ${activeAccordions['1'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											No. Este espacio está diseñado para que cualquier persona pueda empezar desde cero y ver resultados reales.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<div
										className="faq-header"
										onClick={() => toggleAccordion('2')}
										role="button"
										aria-expanded={!!activeAccordions['2']}
										aria-controls="faq-content-2"
									>
										<h5 className="et_pb_toggle_title">¿Cuánto tiempo necesito dedicar cada día?</h5>
										<button
											type="button"
											className="faq-toggle-btn"
											aria-label={activeAccordions['2'] ? 'Contraer' : 'Expandir'}
											onClick={(e) => { e.stopPropagation(); toggleAccordion('2'); }}
										>
											{activeAccordions['2'] ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14" stroke="#8e8e8e" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M12 5v14M5 12h14" stroke="#8e8e8e" />
												</svg>
											)}
										</button>
									</div>
									<div id="faq-content-2" className={`et_pb_toggle_content ${activeAccordions['2'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Con 10-15 minutos al día ya comenzarás a notar cambios. La clave está en la consistencia, no en la duración.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<div
										className="faq-header"
										onClick={() => toggleAccordion('3')}
										role="button"
										aria-expanded={!!activeAccordions['3']}
										aria-controls="faq-content-3"
									>
										<h5 className="et_pb_toggle_title">¿Puedo cancelar mi suscripción cuando quiera?</h5>
										<button
											type="button"
											className="faq-toggle-btn"
											aria-label={activeAccordions['3'] ? 'Contraer' : 'Expandir'}
											onClick={(e) => { e.stopPropagation(); toggleAccordion('3'); }}
										>
											{activeAccordions['3'] ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14" stroke="#8e8e8e" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M12 5v14M5 12h14" stroke="#8e8e8e" />
												</svg>
											)}
										</button>
									</div>
									<div id="faq-content-3" className={`et_pb_toggle_content ${activeAccordions['3'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Sí, puedes cancelar tu suscripción en cualquier momento desde tu área de usuario sin penalizaciones.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<div
										className="faq-header"
										onClick={() => toggleAccordion('4')}
										role="button"
										aria-expanded={!!activeAccordions['4']}
										aria-controls="faq-content-4"
									>
										<h5 className="et_pb_toggle_title">¿Los audios funcionan realmente?</h5>
										<button
											type="button"
											className="faq-toggle-btn"
											aria-label={activeAccordions['4'] ? 'Contraer' : 'Expandir'}
											onClick={(e) => { e.stopPropagation(); toggleAccordion('4'); }}
										>
											{activeAccordions['4'] ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M5 12h14" stroke="#8e8e8e" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M12 5v14M5 12h14" stroke="#8e8e8e" />
												</svg>
											)}
										</button>
									</div>
									<div id="faq-content-4" className={`et_pb_toggle_content ${activeAccordions['4'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Sí. Están basados en neurociencia y técnicas de reprogramación mental validadas. Miles de personas ya han experimentado cambios reales y sostenibles.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Sección de Contacto */}
				<section className="et_pb_section et_pb_section_8 et_section_regular">
					<div className="et_pb_row et_pb_row_8">
						<div className="et_pb_column et_pb_column_4_4 et_pb_column_8 et_pb_css_mix_blend_mode_passthrough et-last-child">
							<div className="et_pb_module et_pb_text et_pb_text_8 et_pb_text_align_center et_pb_bg_layout_light">
								<div className="et_pb_text_inner">
									<h2 style={{
										fontFamily: 'Inter, Helvetica, Arial, Lucida, sans-serif',
										fontSize: '2.5rem',
										fontWeight: 'bold',
										color: '#8fa383',
										textAlign: 'center',
										marginBottom: '1rem',
										lineHeight: '1.2em'
									}}>
										¿Tienes más preguntas?
									</h2>
									<p style={{
										fontSize: '1.1rem',
										color: '#666',
										textAlign: 'center',
										marginBottom: '2rem',
										lineHeight: '1.6em'
									}}>
										Si hay algo que necesites saber antes de entrar, escríbenos.
										Estamos aquí para ayudarte a dar el paso con claridad y
										confianza.
									</p>
									<div style={{ textAlign: 'center', marginTop: '2rem' }}>
										<a
											href="/contacto"
											className="contact-button"
											style={{
												backgroundColor: '#8fa383',
												color: 'white',
												padding: '12px 30px',
												borderRadius: '5px',
												textDecoration: 'none',
												fontSize: '1.1rem',
												fontWeight: '600',
												display: 'inline-block',
												transition: 'all 0.3s ease',
												border: 'none',
												cursor: 'pointer'
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.backgroundColor = '#7a926e';
												e.currentTarget.style.transform = 'translateY(-2px)';
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.backgroundColor = '#8fa383';
												e.currentTarget.style.transform = 'translateY(0)';
											}}
										>
											CONTÁCTANOS
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

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
		</>
	);
};

export default LandingPage;