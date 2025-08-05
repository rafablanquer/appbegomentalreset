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

					let fixes = parseInt(localStorage.getItem('pwa_cache_fixes') || '0');
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
				{/* Header */}
				<header className="header">
					<div className="header-content">
						<div className="logo-container">
							<Image
								src="/assets/branding-Begona-BMR-1-2.png"
								alt="BMR - Begoña Mental Reset"
								width={346}
								height={222}
								priority
								className="logo"
							/>
						</div>
						<div className="cta-container">
							<Link href="#membresias" className="et_pb_button">
								Únete
							</Link>
						</div>
					</div>
				</header>

				{/* Hero Section */}
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
									<h2 className="et_pb_module_heading">Un espacio para reprogramar tu mentE</h2>
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

							<div className="et_pb_module et_pb_gallery">
								<div className="et_pb_gallery_items">
									<div className="et_pb_gallery_item">
										<div className="et_pb_gallery_image">
											<Image
												src="/assets/home/7.png"
												alt="Feature 1"
												width={400}
												height={284}
												loading="lazy"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
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
							<div className="et_pb_module et_pb_gallery">
								<div className="et_pb_gallery_items">
									<div className="et_pb_gallery_item">
										<div className="et_pb_gallery_image">
											<Image
												src="/assets/home/8.png"
												alt="Ejercicios de respiración"
												width={400}
												height={284}
												loading="lazy"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
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
							<div className="et_pb_module et_pb_gallery">
								<div className="et_pb_gallery_items">
									<div className="et_pb_gallery_item">
										<div className="et_pb_gallery_image">
											<Image
												src="/assets/home/Invitacion-Virtual-Taller-de-Ceramica-Moderno-Rosa-y-Rojo-450-x-600-px-600-x-600-px.png"
												alt="Zooms trimestrales"
												width={400}
												height={284}
												loading="lazy"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
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
				</section>

				{/* About Section */}
				<section className="et_pb_section about-section">
					<div className="et_pb_row">
						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_image">
								<Image
									src="/assets/home/Sin-titulo-1280-x-720-px-1284-x-600-px-700-x-900-px-copia-3.png"
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
						<div className="et_pb_column et_pb_column_1_2">
							<div className="et_pb_module et_pb_heading et_had_animation">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">Elige tu plan de reprogramación</h3>
								</div>
							</div>
						</div>

						<div className="et_pb_column et_pb_column_1_2">
							{/* Plan Mensual */}
							<div className="pricing-plan">
								<div className="et_pb_with_border et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">Plan mensual 14,97 €/mes</h2>
									</div>
								</div>

								<div className="et_pb_with_border et_pb_module et_pb_text">
									<div className="et_pb_text_inner">
										<ul>
											<li>Acceso completo a toda la biblioteca de reprogramación durante un mes, (luego se renueva)</li>
											<li>No incluye Zooms grupales.</li>
										</ul>
									</div>
								</div>

								<div className="et_pb_button_module_wrapper et_pb_button_alignment_center et_had_animation">
									<Link href="/pago-de-membresia/?pmpro_level=2" className="et_pb_button">
										Quiero el mensual
									</Link>
								</div>
							</div>

							{/* Plan Trimestral */}
							<div className="pricing-plan">
								<div className="et_pb_with_border et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">Plan TRIMESTRAL 37,97 €/cada 3 meses (ahorras 6 €)</h2>
									</div>
								</div>

								<div className="et_pb_with_border et_pb_module et_pb_text">
									<div className="et_pb_text_inner">
										<ul>
											<li>
												<p>Accesos completo a toda la biblioteca de reprogramación durante 3 meses (luego se renueva)</p>
											</li>
											<li>Zoom grupal trimestral para profundizar, resolver dudas y seguir integrando.</li>
										</ul>
									</div>
								</div>

								<div className="et_pb_button_module_wrapper et_pb_button_alignment_center et_had_animation">
									<Link href="/pago-de-membresia/?pmpro_level=3" className="et_pb_button">
										Quiero el trimestral
									</Link>
								</div>
							</div>

							{/* Plan Anual */}
							<div className="pricing-plan">
								<div className="et_pb_module et_pb_heading">
									<div className="et_pb_heading_container">
										<h2 className="et_pb_module_heading">Plan ANUAL 127,97 €/año (ahorras 52 €)</h2>
									</div>
								</div>

								<div className="et_pb_with_border et_pb_module et_pb_text">
									<div className="et_pb_text_inner">
										<ul>
											<li>Accesos completo a toda la biblioteca de reprogramación durante <span>12 meses</span>&nbsp;(luego se renueva)</li>
											<li>Incluye todos los Zooms grupales trimestrales del año.</li>
											<li>Contenido exclusivo para miembros anuales.</li>
										</ul>
									</div>
								</div>

								<div className="et_pb_button_module_wrapper et_pb_button_alignment_center et_had_animation">
									<Link href="/pago-de-membresia/?pmpro_level=4" className="et_pb_button">
										Quiero el anual
									</Link>
								</div>
							</div>

							{/* Important Notice */}
							<div className="et_pb_module et_pb_heading et_had_animation">
								<div className="et_pb_heading_container">
									<h3 className="et_pb_module_heading">¡IMPORTANTE!</h3>
								</div>
							</div>

							<div className="et_pb_module et_pb_text">
								<div className="et_pb_text_inner">
									<p style={{ textAlign: 'center' }}>
										Si tras rellenar el formulario con tu usuario, contraseña y correo, no completas tu pago o te ha dado error. No te preocupes, no tienes que empezar de cero.
									</p>
									<p style={{ textAlign: 'center' }}>Simplemente:</p>
									<p style={{ textAlign: 'center' }}>
										1. Vuelve a esta página<br />
										2. Si ya estás conectado con el usuario creado, haz click en "enviar y pagar"<br />
										3. Si no lo estás, haz click en "¿ya tienes una cuenta? "accede aquí" e inicia sesión con el usuario y contraseña que pusiste<br />
										4. ¡Listo! Volverás directamente al paso de pago
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

export default LandingPage;