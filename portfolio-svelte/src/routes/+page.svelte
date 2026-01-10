<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TechBadge from '$lib/components/TechBadge.svelte';

	// Project data
	const projects = [
		{
			id: 'mealie',
			label: 'Senaste projektet',
			title: 'Mealie - Familjeplanering för Måltider',
			tagline: '🍽️ Self-hosted • Automatiska inköpslistor • Familjen synkad',
			descriptionParagraphs: [
				'Familjen var körd med matplanering. Recept på lösa lappar, köpte saker vi redan hade hemma, slängde mat för ingen visste vad som skulle lagas. Den eviga frågan vid middagstid: "Vad ska vi äta?"',
				'Hittade Mealie och satte upp det på egen server. Nu sparar vi recept från webben med ett klick, planerar veckan i en delad kalender, och får inköpslistan automatiskt. Ingen ICA-app som trackar vad vi köper.',
				'Stressen är borta. Barnen kan kolla vad som blir till middag, vi slänger mindre mat, och jag slipper prenumerationer. Plus att recepten faktiskt finns kvar när man behöver dem.'
			],
			technologies: ['Docker', 'Self-hosted', 'REST API', 'PostgreSQL'],
			image: {
				src: '/images/mealie.png',
				alt: 'Mealie recepthantering och måltidsplanering'
			},
			imageDirection: 'left' as const
		},
		{
			id: 'homeassistant',
			title: 'Smart Hem Automation',
			tagline: '⚡ Lägre elräkning • 15+ prylar som äntligen pratar med varandra',
			descriptionParagraphs: [
				'Hade köpt smarta grejer från Philips, IKEA, Shelly, Aqara – alla med egna appar som inte pratade med varandra. Ville ha enkla saker som "tänd hallen när jag kommer hem efter mörkrets inbrott" men det gick inte utan att öppna tre appar.',
				'Home Assistant löste det, men det var mer jobb än jag trodde. MQTT var nytt för mig, och att debugga YAML när en automation inte triggar är inte kul. Efter några veckors pillande hade jag ett system som faktiskt fungerar.',
				'Nu mäter sensorer temperatur i varje rum och anpassar värmen automatiskt. Elräkningen sjönk runt 30% första året. Har skrivit kanske 50+ automations vid det här laget – allt från "stäng av allt när ingen är hemma" till "blinka rött om tvättmaskinen är klar".'
			],
			technologies: ['Home Assistant', 'YAML', 'Python', 'n8n', 'MQTT', 'REST APIs'],
			image: {
				src: '/images/homeassistant.png',
				srcWebp: '/images/homeassistant.webp',
				alt: 'Home Assistant dashboard showing smart home automations'
			},
			imageDirection: 'right' as const
		},
		{
			id: 'second',
			title: 'Förfrågningsverktyg för stål',
			tagline: '🚀 Från 2 timmar till 15 minuter • Färre fel • Flerspråkigt',
			descriptionParagraphs: [
				'Säljarna la nästan två timmar om dagen på att skriva prisförfrågningar. Leta upp gamla ordrar i två system, klistra in i Word, skicka mail. Och det blev alltid något fel – fel produktkod, stavfel, eller de glömde något.',
				'Byggde ett verktyg som söker i orderhistoriken automatiskt och genererar förfrågningar på engelska, tyska eller svenska. Folk kan använda webben eller köra det direkt från Excel – vad de föredrar.',
				'Nu tar det ungefär 15 minuter istället för två timmar. Har inte räknat exakt, men skillnaden är tydlig. Och jag ser mycket färre fel när jag granskar förfrågningarna.'
			],
			technologies: ['Javascript', 'Python', 'SQL', 'HTML', 'CSS'],
			image: {
				src: '/images/Inquiry.png',
				srcWebp: '/images/Inquiry.webp',
				alt: 'Multilingual steel inquiry tool interface'
			},
			imageDirection: 'left' as const
		},
		{
			id: 'third',
			title: 'Automatiserad Offert- och Orderhantering',
			tagline: '💰 Snabbare offerter • Realtidspriser från fraktbolag • Mindre handpåläggning',
			descriptionParagraphs: [
				'Offertprocessen var absurd: räkna ihop stålkostnader, ringa Schenker för fraktpris (som varierade beroende på vikt och sträcka), knappa in allt i Fortnox. Och fraktkostnaderna var ofta fel för vi använde gamla priser från ett Excel-ark som ingen uppdaterade.',
				'Började med Python-script som hämtar fraktpriser via API. Två av tre bolag hade bra API:er – för det tredje fick jag bygga web scraping som gick sönder varje gång de ändrade sin sajt. Lade till stålkostnader från vår databas och kopplade ihop allt med Excel och Fortnox.',
				'Tog ett tag att få folk att använda det – fanns alltid edge cases. Men nu klarar de flesta offerter på 10-15 minuter istället för en halvtimme. Och vi slipper ringa för fraktpriser.'
			],
			technologies: ['Python', 'SQL', 'VBA', 'Excel'],
			image: {
				src: '/images/excel.jpg',
				srcWebp: '/images/excel.webp',
				alt: 'Excel-based quote calculator'
			},
			imageDirection: 'right' as const
		},
		{
			id: 'fourth',
			title: 'Intern webbapp för Nordmet',
			tagline: '📊 Alla på samma plats • 500+ certifikat digitalt • Slut på Excel-kaos',
			descriptionParagraphs: [
				'Excel-kaos: kundinfo i ett ark, certifikat i ett annat, transportdata i ett tredje som ingen uppdaterade. Logistik ringde säljare och frågade "har vi certifikatet för Svenssons order från förra året?" – svaret var alltid "jag kollar senare". Certifikat försvann, och ingen visste vad vi hade skickat till vilken kund.',
				'Byggde en webbapp där allt finns på samma ställe. Kundlista, certifikatarkiv där man laddar upp PDF och kopplar till kund, transportlista för logistik. Säljare ser sina kunder, logistik ser transporter – ingen ser priser de inte ska se.',
				'Åtta personer använder det dagligen nu utan att jag behöver tjata. Tog en månad att migrera all data från Excel utan att tappa något. När revisorn frågar efter ett certifikat tar det 10 sekunder istället för att leta i pärmar.',
				'OBS: Webbappen är endast tillgänglig via företagets VPN'
			],
			technologies: ['Javascript', 'Python', 'SQL', 'HTML', 'CSS'],
			image: {
				src: '/images/CRM.png',
				srcWebp: '/images/CRM.webp',
				alt: 'Internal CRM web application dashboard'
			},
			imageDirection: 'left' as const
		}
	];

	const mainTechStack = ['Python', 'FastAPI', 'n8n', 'SQL', 'Home Assistant'];

	onMount(() => {
		// Hantera hash-scrolling när man navigerar från andra sidor
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const targetElement = document.querySelector(hash);
				if (targetElement) {
					const header = targetElement.querySelector('h1');
					const scrollTarget = header || targetElement;
					const targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 120;
					window.scrollTo({ top: targetPosition, behavior: 'smooth' });
				}
			}, 100);
		}

		// Typed.js animation
		const typed = new Typed('#element', {
			strings: ['Jag kodar', 'Jag läser', 'Jag springer', 'Jag tränar', 'Jag lagar mat', 'Jag automatiserar'],
			typeSpeed: 60,
			backSpeed: 40,
			backDelay: 1500,
			loop: true,
			showCursor: false
		});

		// Smooth scroll för ankar-länkar
		const anchorLinks = document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach(link => {
			link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href === '#') return;

				const targetElement = document.querySelector(href);
				if (targetElement) {
					e.preventDefault();
					const header = targetElement.querySelector('h1');
					const scrollTarget = header || targetElement;
					const targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 120;
					window.scrollTo({ top: targetPosition, behavior: 'smooth' });
				}
			});
		});

		return () => typed.destroy();
	});

	// Sticky CTA visibility
	let showStickyCTA = $state(false);

	onMount(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const introHeight = document.querySelector('#intro')?.offsetHeight || 800;
			showStickyCTA = scrollPosition > introHeight * 0.7;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<title>Magnus Lixenstrand - Automation Engineer Portfolio</title>
	<meta name="description" content="Magnus Lixenstrand - Automation Engineer som sparar företag 20+ timmar/vecka genom smart systemintegration. 12+ års affärserfarenhet kombinerat med teknisk problemlösning.">
	<meta name="keywords" content="Magnus Lixenstrand, automation engineer, integration developer, business automation, Python, FastAPI, n8n, Home Assistant, process optimization, Jönköping">
	<meta name="author" content="Magnus Lixenstrand">
	<link rel="canonical" href="https://magnuslixenstrand.com/">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://magnuslixenstrand.com/">
	<meta property="og:title" content="Magnus Lixenstrand - Automation Engineer Portfolio">
	<meta property="og:description" content="Automation Engineer som sparar företag 20+ timmar/vecka genom smart systemintegration. 12+ års affärserfarenhet kombinerat med teknisk problemlösning.">
	<meta property="og:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">
	<meta property="og:locale" content="sv_SE">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://magnuslixenstrand.com/">
	<meta property="twitter:title" content="Magnus Lixenstrand - Automation Engineer Portfolio">
	<meta property="twitter:description" content="Automation Engineer som sparar företag 20+ timmar/vecka genom smart systemintegration. 12+ års affärserfarenhet kombinerat med teknisk problemlösning.">
	<meta property="twitter:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">

	<!-- Structured Data / Schema.org -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Magnus Lixenstrand",
		"url": "https://magnuslixenstrand.com",
		"image": "https://magnuslixenstrand.com/images/IMG_0830.jpg",
		"jobTitle": "Automation Engineer",
		"description": "Automation Engineer som sparar företag 20+ timmar/vecka genom smart systemintegration",
		"email": "mlixenstrand@gmail.com",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Jönköping",
			"addressCountry": "SE"
		},
		"sameAs": [
			"https://www.linkedin.com/in/magnus-lixenstrand",
			"https://github.com/lixenstrand"
		],
		"knowsAbout": ["Python", "FastAPI", "n8n", "SQL", "Home Assistant", "Process Automation", "System Integration"]
	}
	</script>

	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Magnus Lixenstrand Portfolio",
		"url": "https://magnuslixenstrand.com",
		"description": "Portfolio för Magnus Lixenstrand - Automation Engineer",
		"author": {
			"@type": "Person",
			"name": "Magnus Lixenstrand"
		},
		"inLanguage": "sv-SE"
	}
	</script>
</svelte:head>

<section id="intro">
	<div class="intro-grid">
		<div class="intro-headshot">
			<picture>
				<source
					type="image/webp"
					srcset="/images/IMG_0830_200.webp 200w, /images/IMG_0830.webp 1200w"
					sizes="(min-width: 850px) 300px, 200px">
				<img
					src="/images/IMG_0830_200_optimized.jpg"
					srcset="/images/IMG_0830_200_optimized.jpg 200w, /images/IMG_0830_optimized.jpg 1200w"
					sizes="(min-width: 850px) 300px, 200px"
					alt="Magnus Lixenstrand"
					loading="eager"
					fetchpriority="high"
					width="200"
					height="200">
			</picture>
		</div>

		<div class="intro-content">
			<p class="name">Hej, mitt namn är <span>Magnus Lixenstrand.</span></p>
			<h2>
				<span id="element" aria-live="polite" aria-atomic="true" role="status">Jag kodar</span>
			</h2>

			<p>12 år inom försäljning lärde mig att se när saker tar längre tid än de borde. Folk accepterar "så har vi alltid gjort" – jag bygger hellre något som fixar problemet. Oftast handlar det om att få system som aldrig var tänkta att prata med varandra att faktiskt göra det.</p>

			<p>Det började som sidoprojekt på Nordmet. Nu sparar mina verktyg teamet 20+ timmar i veckan.</p>

			<div class="tech-stack">
				{#each mainTechStack as tech}
					<TechBadge {tech} />
				{/each}
			</div>

			<div class="cta-group">
				<a href="#projects" class="cta-primary">Se projekt & resultat</a>
				<a href="#contact" class="cta-secondary">Kontakta mig</a>
			</div>
		</div>
	</div>
</section>

<div class="projectBackground">
	<section id="projects">
		<h1 data-aos="fade-up">Projekt jag är stolt över</h1>

		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</section>
</div>

<section id="contact">
	<h2 data-aos="fade-up">Kontakta mig</h2>
	<p data-aos="fade-up" data-aos-delay="100">Jag söker möjligheter där jag kan göra verklig skillnad genom att kombinera automation, systemintegration och affärsförståelse</p>

	<div class="contact-button-wrapper" data-aos="zoom-in" data-aos-delay="200">
		<a href="mailto:mlixenstrand@gmail.com" class="contact-button">Kontakta mig här</a>
	</div>
</section>

{#if showStickyCTA}
	<a href="mailto:mlixenstrand@gmail.com" class="sticky-cta">Kontakta mig</a>
{/if}

<style>
	/* Intro Section */
	#intro {
		padding: 0.5rem 1.5rem 10rem 1.5rem;
		width: 100%;
		margin: 0 auto;
		position: relative;
	}

	.intro-grid {
		display: grid;
		grid-template-columns: clamp(200px, 30vw, 300px) 1fr;
		gap: 4rem;
		align-items: start;
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.intro-headshot {
		position: relative;
		z-index: 3;
	}

	.intro-headshot img {
		width: clamp(200px, 30vw, 300px);
		height: clamp(200px, 30vw, 300px);
		border-radius: 50%;
		object-fit: cover;
		border: 5px solid var(--aqua);
		box-shadow: 0 0 40px rgba(0, 217, 255, 0.9);
		background: rgba(13, 13, 13, 0.65);
	}

	.intro-content {
		position: relative;
		z-index: 2;
	}

	#intro p {
		font-family: var(--mono);
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	#intro .name {
		font-family: var(--mono);
		font-size: clamp(1.2rem, 2.5vw, 1.6rem);
		margin-bottom: 2rem;
	}

	.name span {
		font-family: var(--sans);
		font-size: clamp(3rem, 10vw, 5.5rem);
		color: var(--aqua);
		display: block;
		font-weight: 700;
		line-height: 1.1;
		margin-top: 0.5rem;
	}

	#intro h2 {
		font-size: clamp(2.2rem, 6vw, 3.5rem);
		font-weight: normal;
		margin-bottom: 2rem;
	}

	#element {
		min-height: 4rem;
		height: 4rem;
		line-height: 1.3;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		margin: 0 0 2rem 0;
		padding: 0.25rem 0;
		border: 1px solid transparent;
		overflow: visible;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 2rem 0;
	}

	.cta-group {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
		flex-wrap: wrap;
	}

	.cta-primary,
	.cta-secondary {
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.3s ease;
		font-family: var(--sans);
	}

	.cta-primary {
		background: linear-gradient(135deg, var(--aqua), var(--magenta));
		color: var(--black);
		border: none;
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(0, 217, 255, 0.4);
	}

	.cta-secondary {
		background: transparent;
		color: var(--aqua);
		border: 2px solid var(--aqua);
	}

	.cta-secondary:hover {
		background: rgba(0, 217, 255, 0.1);
		transform: translateY(-2px);
	}

	@media (max-width: 849px) {
		.intro-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.intro-headshot {
			text-align: center;
		}

		.intro-headshot img {
			margin: 0 auto;
		}

		.cta-group {
			flex-direction: column;
		}

		.cta-primary,
		.cta-secondary {
			text-align: center;
			width: 100%;
		}
	}

	/* Projects Section */
	.projectBackground {
		background: linear-gradient(180deg, var(--black) 0%, var(--dkblue) 50%, var(--black) 100%);
		padding: 4rem 0;
		position: relative;
	}

	#projects {
		padding: 0 1rem;
		max-width: 1200px;
		margin: 0 auto;
		scroll-margin-top: 180px;
	}

	#projects h1 {
		font-size: clamp(2rem, 5vw, 2.5rem);
		margin-bottom: 3rem;
		padding-top: 2rem;
		text-align: center;
		color: var(--white);
	}

	/* Contact Section */
	#contact {
		padding: 6rem 2rem;
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	#contact h2 {
		font-size: clamp(2rem, 5vw, 2.5rem);
		margin-bottom: 1.5rem;
		color: var(--aqua);
	}

	#contact p {
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		line-height: 1.7;
		margin-bottom: 2rem;
		color: var(--white);
	}

	.contact-button-wrapper {
		margin-top: 2rem;
	}

	.contact-button {
		display: inline-block;
		padding: 1.2rem 3rem;
		background: linear-gradient(135deg, var(--aqua), var(--magenta));
		color: var(--black);
		font-size: 1.2rem;
		font-weight: 700;
		text-decoration: none;
		border-radius: 50px;
		transition: all 0.3s ease;
		font-family: var(--sans);
		box-shadow: 0 4px 15px rgba(0, 217, 255, 0.3);
	}

	.contact-button:hover {
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 25px rgba(0, 217, 255, 0.5);
	}

	/* Sticky CTA */
	.sticky-cta {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--aqua), var(--magenta));
		color: var(--black);
		font-weight: 700;
		text-decoration: none;
		border-radius: 50px;
		box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
		z-index: 1000;
		transition: all 0.3s ease;
		font-family: var(--sans);
		animation: slideInUp 0.5s ease;
	}

	.sticky-cta:hover {
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 30px rgba(0, 217, 255, 0.6);
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 600px) {
		.sticky-cta {
			bottom: 1rem;
			right: 1rem;
			padding: 0.75rem 1.5rem;
			font-size: 0.9rem;
		}
	}
</style>
