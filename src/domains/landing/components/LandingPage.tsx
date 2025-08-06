'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

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
									<h2 className="et_pb_module_heading">UN ESPACIO PARA REPROGRAMAR TU MENTE</h2>
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
								<Link href="#membresias" className="et_pb_button">
									¡únete!
								</Link>
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

							<div className="feature-icon">
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 1L14.5 8.5L22 9L16 14L18 22L12 18L6 22L8 14L2 9L9.5 8.5L12 1Z" fill="#a3b18a" />
								</svg>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2L13.09 8.26L18 7L14.74 11.74L21 12L14.74 12.26L18 17L13.09 15.74L12 22L10.91 15.74L6 17L9.26 12.26L3 12L9.26 11.74L6 7L10.91 8.26L12 2Z" fill="#a3b18a" />
								</svg>
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
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9 1C5.13 1 2 4.13 2 8S5.13 15 9 15C12.87 15 16 11.87 16 8S12.87 1 9 1ZM9 13C6.24 13 4 10.76 4 8S6.24 3 9 3S14 5.24 14 8S11.76 13 9 13ZM20.59 19.59L16.01 15.01C16.7 13.56 17 11.95 17 10.34C17 9.89 16.63 9.52 16.18 9.52S15.36 9.89 15.36 10.34C15.36 11.58 15.1 12.8 14.6 13.92L19.18 18.5L20.59 19.59Z" fill="#a3b18a" />
								</svg>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C16.97 2 21 6.03 21 11C21 13.5 20.04 15.81 18.41 17.41C16.81 19.04 14.5 20 12 20C9.5 20 7.19 19.04 5.59 17.41C3.96 15.81 3 13.5 3 11C3 6.03 7.03 2 12 2ZM12 4C8.13 4 5 7.13 5 11C5 13 5.78 14.78 7.05 16.05C8.22 17.22 9.74 17.78 11.31 17.95C11.54 17.98 11.77 18 12 18C14 18 15.78 17.22 17.05 16.05C18.22 14.78 19 13 19 11C19 7.13 15.87 4 12 4ZM10.5 8C11.33 8 12 8.67 12 9.5S11.33 11 10.5 11S9 10.33 9 9.5S9.67 8 10.5 8ZM13.5 8C14.33 8 15 8.67 15 9.5S14.33 11 13.5 11S12 10.33 12 9.5S12.67 8 13.5 8Z" fill="#a3b18a" />
								</svg>
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
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C5.9 10.5 5 11.4 5 12.5V19.5C5 20.6 5.9 21.5 7 21.5H17C18.1 21.5 19 20.6 19 19.5V12.5C19 11.4 18.1 10.5 17 10.5ZM9 7C9 5.34 10.34 4 12 4S15 5.34 15 7V10.5H9V7Z" fill="#a3b18a" />
								</svg>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H17V12H7V10ZM7 14H17V16H7V14Z" fill="#a3b18a" />
								</svg>
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

					{/* Challenge Section */}
					<div className="et_pb_row challenge-row">
						<div className="et_pb_column et_pb_column_1_2">
							<div className="feature-icon">
								<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M12 7.5C12.83 8.24 14 8.9 14 11V12.5L22 21H20L14 13.5V11C14 10.33 13.67 10 13 10S12 10.33 12 11V19H10V11C10 10.33 9.67 10 9 10S8 10.33 8 11V12.5L2 21H4L10 13.5V11C10 8.9 11.17 8.24 12 7.5Z" fill="#a3b18a" />
								</svg>
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

						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/branding-Begona-BMR-1-1.png"
									alt="Reto 21 días"
									width={400}
									height={500}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* About Section */}
				<section className="et_pb_section about-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/Sin-titulo-1280-x-720-px-1284-x-600-px-700-x-900-px-copia-3.png.png"
									alt="¿Qué encontrarás dentro?"
									width={700}
									height={900}
									loading="lazy"
								/>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">¿Qué encontrarás dentro?</h3>
								</div>
							</div>

							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h2 className="et_pb_module_heading">
										En resumen, tienes acceso estructurado y claro y un método de reprogramación creado por una neuropsicóloga especializa.
									</h2>
								</div>
							</div>
						</div>
					</div>

					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_4_4">
							<div className="et_pb_with_border et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p>
										Todos los audios y entrenamientos están organizados en áreas permitiéndote avanzar con foco y sin dispersión a lo largo del día.
									</p>
								</div>
							</div>

							<div className="et_pb_with_border et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p>
										Trabajas con reprogramaciones, respiraciones y visualizaciones diseñadas para activar tu sistema reticular, entrenar tu mente y regular tu sistema nervioso.
									</p>
								</div>
							</div>

							<div className="et_pb_with_border et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p>
										Todo está diseñado por Begoña, experta en neuropsicología y reprogramación mental, asegurando que cada audio sea un paso real hacia el cambio que buscas.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="et_pb_section stats-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/branding-Begona-BMR-1-copia.png"
									alt="Begoña Mental Reset"
									width={500}
									height={650}
									loading="lazy"
								/>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_heading">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">Esto es lo que está ocurriendo en la APP BMR</h3>
								</div>
							</div>

							<div className="stats-list">
								<div className="stat-item">
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
								<Link href="#membresias" className="et_pb_button">
									¡únete!
								</Link>
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
									<Link href="/pago-de-membresia/?pmpro_level=2" className="et_pb_button">
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
									<Link href="/pago-de-membresia/?pmpro_level=3" className="et_pb_button">
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
									<Link href="/pago-de-membresia/?pmpro_level=4" className="et_pb_button">
										QUIERO EL ANUAL
									</Link>
								</div>
							</div>

							{/* Important Notice */}
							<div className="important-notice">
								<div className="important-title">
									<h3>¡IMPORTANTE!</h3>
								</div>
								<div className="important-content">
									<p>
										Si tras rellenar el formulario con tu usuario, contraseña y correo, no completas tu pago o te ha dado error. No te preocupes, no tienes que empezar de cero.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="et_pb_section faq-section">
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
									<h5
										className="et_pb_toggle_title"
										onClick={() => toggleAccordion('0')}
										style={{ cursor: 'pointer' }}
									>
										¿Para quién es este espacio?
									</h5>
									<div className={`et_pb_toggle_content ${activeAccordions['0'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Para quienes están listos para dejar de repetir patrones y comenzar a reprogramar su mente con ciencia, intención y resultados.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<h5
										className="et_pb_toggle_title"
										onClick={() => toggleAccordion('1')}
										style={{ cursor: 'pointer' }}
									>
										¿Necesito tener experiencia previa en meditación o neurociencia?
									</h5>
									<div className={`et_pb_toggle_content ${activeAccordions['1'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											No. Este espacio está diseñado para que cualquier persona pueda empezar desde cero y ver resultados reales.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<h5
										className="et_pb_toggle_title"
										onClick={() => toggleAccordion('2')}
										style={{ cursor: 'pointer' }}
									>
										¿Cuánto tiempo necesito dedicar cada día?
									</h5>
									<div className={`et_pb_toggle_content ${activeAccordions['2'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Con 10-15 minutos al día ya comenzarás a notar cambios. La clave está en la consistencia, no en la duración.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<h5
										className="et_pb_toggle_title"
										onClick={() => toggleAccordion('3')}
										style={{ cursor: 'pointer' }}
									>
										¿Puedo cancelar mi suscripción cuando quiera?
									</h5>
									<div className={`et_pb_toggle_content ${activeAccordions['3'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Sí, puedes cancelar tu suscripción en cualquier momento desde tu área de usuario sin penalizaciones.
										</p>
									</div>
								</div>

								<div className="et_pb_toggle et_pb_module et_pb_accordion_item">
									<h5
										className="et_pb_toggle_title"
										onClick={() => toggleAccordion('4')}
										style={{ cursor: 'pointer' }}
									>
										¿Los audios funcionan realmente?
									</h5>
									<div className={`et_pb_toggle_content ${activeAccordions['4'] ? '' : 'et_pb_toggle_close'}`}>
										<p>
											Sí. Están basados en neurociencia y técnicas de reprogramación mental validadas. Miles de personas ya han experimentado cambios reales y sostenibles.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="footer">
					<div className="container">
						<div className="footer-content">
							<p>&copy; 2025 BMR - Begoña Mental Reset. Todos los derechos reservados.</p>
						</div>
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
            background-color: #fdf8e9;
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
            background-color: #fdf8e9;
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
            padding-bottom: 10px;
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
            background: #fdf8e9;
            padding: 80px 0;
          }
          
          .pricing-main-title {
            color: #a3b18a !important;
            font-size: 28px !important;
            font-weight: 400 !important;
            text-align: center !important;
            margin-bottom: 50px !important;
            letter-spacing: 0.5px;
          }
          
          .pricing-plan-wrapper {
            background: white;
            margin-bottom: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 0;
            overflow: hidden;
          }
          
          .pricing-plan-title {
            background: #4a4a4a;
            padding: 20px;
            text-align: center;
          }
          
          .pricing-plan-title h2 {
            color: white !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            margin: 0 !important;
            text-align: center !important;
            letter-spacing: 1px;
          }
          
          .pricing-plan-content {
            background: white;
            padding: 30px;
          }
          
          .pricing-plan-content ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .pricing-plan-content li {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
          }
          
          .pricing-plan-content li:before {
            content: "•";
            color: #a3b18a;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 18px;
          }
          
          .pricing-plan-button {
            background: white;
            padding: 0 30px 30px;
            text-align: center;
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
            background: #fdf8e9;
            text-align: center;
          }
          
          .features-section {
            background: #fff;
          }
          
          .about-section {
            background: #f3f6f0;
          }
          
          .stats-section {
            background: #a3b18a;
            color: white;
          }
          
          .stats-section .et_pb_heading_container h1,
          .stats-section .et_pb_heading_container h2,
          .stats-section .et_pb_heading_container h3 {
            color: white;
          }
          
          .stats-list {
            margin: 30px 0;
          }
          
          .stat-item {
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            border-left: 4px solid white;
          }
          
          .stat-item p {
            margin: 0;
            color: white;
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