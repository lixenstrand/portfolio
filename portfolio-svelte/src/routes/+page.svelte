<script lang="ts">
	import { onMount } from 'svelte';
	import Typed from 'typed.js';

	onMount(() => {
		// Hantera hash-scrolling när man navigerar från andra sidor
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const targetElement = document.querySelector(hash);
				if (targetElement) {
					// Scrolla till h1 inside #projects för bättre positionering
					const header = targetElement.querySelector('h1');
					const scrollTarget = header || targetElement;

					// Beräkna position med offset för navbar (120px)
					const targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 120;

					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			}, 100);
		}

		// Typed.js animation för personliga aktiviteter
		const typed = new Typed('#element', {
			strings: [
				'Jag kodar',
				'Jag läser',
				'Jag springer',
				'Jag tränar',
				'Jag lagar mat',
				'Jag automatiserar'
			],
			typeSpeed: 60,
			backSpeed: 40,
			backDelay: 1500,
			loop: true,
			showCursor: false
		});

		// Kontakt-knapp popup
		const contactButton = document.querySelector('.contactPopUp');
		if (contactButton) {
			contactButton.addEventListener('click', async () => {
				const { default: Swal } = await import('sweetalert2');
				Swal.fire({
					title: 'Kontakta mig',
					html: `
						<p style="margin-bottom: 15px;">Skicka ett mail till:</p>
						<a href="mailto:mlixenstrand@gmail.com" style="font-size: 18px; color: #4A90E2; text-decoration: none; font-weight: 600;">
							mlixenstrand@gmail.com
						</a>
					`,
					icon: 'info',
					confirmButtonText: 'Stäng',
					confirmButtonColor: '#4A90E2'
				});
			});
		}

		// Smooth scroll för ankar-länkar
		const anchorLinks = document.querySelectorAll('a[href^="#"]');

		anchorLinks.forEach(link => {
			link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');

				// Skippa om det är "#" utan id
				if (href === '#') return;

				const targetElement = document.querySelector(href);

				if (targetElement) {
					e.preventDefault();

					// Scrolla till h1 inside element för bättre positionering
					const header = targetElement.querySelector('h1');
					const scrollTarget = header || targetElement;

					// Beräkna position med offset för navbar (120px)
					const targetPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset - 120;

					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			});
		});

		return () => {
			typed.destroy();
		};
	});

	// Sticky CTA visibility based on scroll
	let showStickyCTA = $state(false);

	onMount(() => {
		const handleScroll = () => {
			// Show sticky CTA after scrolling past intro section
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

	<link rel="stylesheet" href="/css/index.css">
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
				<span class="tech-badge">Python</span>
				<span class="tech-badge">FastAPI</span>
				<span class="tech-badge">n8n</span>
				<span class="tech-badge">SQL</span>
				<span class="tech-badge">Home Assistant</span>
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

		<article id="mealie">
			<div class="text">
				<p class="project-label" data-aos="fade-right" data-aos-delay="0">Senaste projektet</p>
				<h2 data-aos="fade-right" data-aos-delay="100">Mealie - Familjeplanering för Måltider</h2>
				<p class="project-tagline" data-aos="fade-right" data-aos-delay="200">🍽️ Self-hosted • Automatiska inköpslistor • Familjen synkad</p>

				<div class="blackBox" data-aos="fade-up" data-aos-delay="300">
					<p>Familjen var körd med matplanering. Recept på lösa lappar, köpte saker vi redan hade hemma, slängde mat för ingen visste vad som skulle lagas. Den eviga frågan vid middagstid: "Vad ska vi äta?"</p>

					<p>Hittade Mealie och satte upp det på egen server. Nu sparar vi recept från webben med ett klick, planerar veckan i en delad kalender, och får inköpslistan automatiskt. Ingen ICA-app som trackar vad vi köper.</p>

					<p>Stressen är borta. Barnen kan kolla vad som blir till middag, vi slänger mindre mat, och jag slipper prenumerationer. Plus att recepten faktiskt finns kvar när man behöver dem.</p>
				</div>

				<h3 data-aos="fade-right" data-aos-delay="400">teknologier som används:</h3>
				<ul data-aos="fade-right" data-aos-delay="450">
					<li>Docker |</li>
					<li>Self-hosted |</li>
					<li>REST API |</li>
					<li>PostgreSQL</li>
				</ul>
			</div>
			<img src="/images/mealie.png"
				alt="Mealie recepthantering och måltidsplanering"
				loading="lazy"
				width="1200"
				height="800"
				data-aos="fade-left"
				data-aos-delay="200" />
		</article>

		<article id="homeassistant">
			<div class="text">
				<h2 data-aos="fade-left" data-aos-delay="0">Smart Hem Automation</h2>
				<p class="project-tagline" data-aos="fade-left" data-aos-delay="100">⚡ Lägre elräkning • 15+ prylar som äntligen pratar med varandra</p>

				<div class="blackBox" data-aos="fade-up" data-aos-delay="200">
					<p>Hade köpt smarta grejer från Philips, IKEA, Shelly, Aqara – alla med egna appar som inte pratade med varandra. Ville ha enkla saker som "tänd hallen när jag kommer hem efter mörkrets inbrott" men det gick inte utan att öppna tre appar.</p>

					<p>Home Assistant löste det, men det var mer jobb än jag trodde. MQTT var nytt för mig, och att debugga YAML när en automation inte triggar är inte kul. Efter några veckors pillande hade jag ett system som faktiskt fungerar.</p>

					<p>Nu mäter sensorer temperatur i varje rum och anpassar värmen automatiskt. Elräkningen sjönk runt 30% första året. Har skrivit kanske 50+ automations vid det här laget – allt från "stäng av allt när ingen är hemma" till "blinka rött om tvättmaskinen är klar".</p>
				</div>

				<h3 data-aos="fade-left" data-aos-delay="300">teknologier som används:</h3>
				<ul data-aos="fade-left" data-aos-delay="350">
					<li>Home Assistant |</li>
					<li>YAML |</li>
					<li>Python |</li>
					<li>n8n |</li>
					<li>MQTT |</li>
					<li>REST APIs</li>
				</ul>
			</div>
			<picture>
				<source type="image/webp" srcset="/images/homeassistant.webp">
				<img src="/images/homeassistant.png"
					alt="Home Assistant dashboard showing smart home automations"
					loading="lazy"
					width="1200"
					height="800"
					data-aos="fade-right"
					data-aos-delay="150" />
			</picture>
		</article>

		<article id="second">
			<div class="text">
				<h2 data-aos="fade-right" data-aos-delay="0">Förfrågningsverktyg för stål</h2>
				<p class="project-tagline" data-aos="fade-right" data-aos-delay="100">🚀 Från 2 timmar till 15 minuter • Färre fel • Flerspråkigt</p>

				<div class="blackBox" data-aos="fade-up" data-aos-delay="200">
					<p>Säljarna la nästan två timmar om dagen på att skriva prisförfrågningar. Leta upp gamla ordrar i två system, klistra in i Word, skicka mail. Och det blev alltid något fel – fel produktkod, stavfel, eller de glömde något.</p>

					<p>Byggde ett verktyg som söker i orderhistoriken automatiskt och genererar förfrågningar på engelska, tyska eller svenska. Folk kan använda webben eller köra det direkt från Excel – vad de föredrar.</p>

					<p>Nu tar det ungefär 15 minuter istället för två timmar. Har inte räknat exakt, men skillnaden är tydlig. Och jag ser mycket färre fel när jag granskar förfrågningarna.</p>
				</div>

				<h3 data-aos="fade-right" data-aos-delay="300">teknologier som används:</h3>
				<ul data-aos="fade-right" data-aos-delay="350">
					<li>Javascript |</li>
					<li>Python |</li>
					<li>SQL |</li>
					<li>HTML |</li>
					<li>CSS</li>
				</ul>
			</div>
			<picture>
				<source type="image/webp" srcset="/images/Inquiry.webp">
				<img src="/images/Inquiry.png"
					alt="Multilingual steel inquiry tool interface"
					loading="lazy"
					width="1200"
					height="800"
					data-aos="fade-left"
					data-aos-delay="150" />
			</picture>
		</article>

		<article id="third">
			<div class="text">
				<h2 data-aos="fade-left" data-aos-delay="0">Automatiserad Offert- och Orderhantering</h2>
				<p class="project-tagline" data-aos="fade-left" data-aos-delay="100">💰 Snabbare offerter • Realtidspriser från fraktbolag • Mindre handpåläggning</p>
				<div class="blackBox" data-aos="fade-up" data-aos-delay="200">
					<p>Offertprocessen var absurd: räkna ihop stålkostnader, ringa Schenker för fraktpris (som varierade beroende på vikt och sträcka), knappa in allt i Fortnox. Och fraktkostnaderna var ofta fel för vi använde gamla priser från ett Excel-ark som ingen uppdaterade.</p>

					<p>Började med Python-script som hämtar fraktpriser via API. Två av tre bolag hade bra API:er – för det tredje fick jag bygga web scraping som gick sönder varje gång de ändrade sin sajt. Lade till stålkostnader från vår databas och kopplade ihop allt med Excel och Fortnox.</p>

					<p>Tog ett tag att få folk att använda det – fanns alltid edge cases. Men nu klarar de flesta offerter på 10-15 minuter istället för en halvtimme. Och vi slipper ringa för fraktpriser.</p>
				</div>

				<h3 data-aos="fade-left" data-aos-delay="300">teknologier som används:</h3>
				<ul data-aos="fade-left" data-aos-delay="350">
					<li>Python |</li>
					<li>SQL |</li>
					<li>VBA |</li>
					<li>Excel</li>
				</ul>
			</div>

			<picture>
				<source type="image/webp" srcset="/images/excel.webp">
				<img src="/images/excel.jpg"
					alt="Excel-based quote calculator"
					loading="lazy"
					width="1200"
					height="800"
					data-aos="fade-right"
					data-aos-delay="150" />
			</picture>
		</article>

		<article id="fourth">
			<div class="text">
				<h2 data-aos="fade-right" data-aos-delay="0">Intern webbapp för Nordmet</h2>
				<p class="project-tagline" data-aos="fade-right" data-aos-delay="100">📊 Alla på samma plats • 500+ certifikat digitalt • Slut på Excel-kaos</p>
				<div class="blackBox" data-aos="fade-up" data-aos-delay="200">
					<p>Excel-kaos: kundinfo i ett ark, certifikat i ett annat, transportdata i ett tredje som ingen uppdaterade. Logistik ringde säljare och frågade "har vi certifikatet för Svenssons order från förra året?" – svaret var alltid "jag kollar senare". Certifikat försvann, och ingen visste vad vi hade skickat till vilken kund.</p>

					<p>Byggde en webbapp där allt finns på samma ställe. Kundlista, certifikatarkiv där man laddar upp PDF och kopplar till kund, transportlista för logistik. Säljare ser sina kunder, logistik ser transporter – ingen ser priser de inte ska se.</p>

					<p>Åtta personer använder det dagligen nu utan att jag behöver tjata. Tog en månad att migrera all data från Excel utan att tappa något. När revisorn frågar efter ett certifikat tar det 10 sekunder istället för att leta i pärmar.</p>

					<p><em>OBS: Webbappen är endast tillgänglig via företagets VPN</em></p>
				</div>

				<h3 data-aos="fade-right" data-aos-delay="300">teknologier som används:</h3>
				<ul data-aos="fade-right" data-aos-delay="350">
					<li>Javascript |</li>
					<li>Python |</li>
					<li>SQL |</li>
					<li>HTML |</li>
					<li>CSS</li>
				</ul>
			</div>

			<picture>
				<source type="image/webp" srcset="/images/CRM.webp">
				<img src="/images/CRM.png"
					alt="Internal CRM web application dashboard"
					loading="lazy"
					width="1200"
					height="800"
					data-aos="fade-left"
					data-aos-delay="150" />
			</picture>
		</article>
	</section>
</div>

<section id="contact">
	<h2 data-aos="fade-up">Kontakta mig</h2>

	<p data-aos="fade-up" data-aos-delay="100">Jag söker möjligheter där jag kan göra verklig skillnad genom att kombinera automation, systemintegration och affärsförståelse</p>

	<div class="contact-button-wrapper" data-aos="zoom-in" data-aos-delay="200">
		<a href="mailto:mlixenstrand@gmail.com" class="contact-button">Kontakta mig här</a>
	</div>
</section>

<!-- Sticky CTA -->
{#if showStickyCTA}
	<a href="mailto:mlixenstrand@gmail.com" class="sticky-cta">
		Kontakta mig
	</a>
{/if}
