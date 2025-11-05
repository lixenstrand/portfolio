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

	<link rel="stylesheet" href="/css/index.css">
</svelte:head>

<section id="intro">
	<div class="intro-grid">
		<div class="intro-headshot">
			<img
				src="/images/IMG_0830_200.jpg"
				srcset="/images/IMG_0830_200.jpg 200w, /images/IMG_0830.jpg 519w"
				sizes="(min-width: 850px) 300px, 200px"
				alt="Magnus Lixenstrand"
				loading="eager"
				fetchpriority="high"
				width="200"
				height="200">
		</div>

		<div class="intro-content">
			<p class="name">Hej, mitt namn är <span>Magnus Lixenstrand.</span></p>
			<h2>
				<span id="element">Jag kodar</span>
			</h2>

			<p>Efter 12 år med att hitta lösningar till företag ser jag ineffektivitet som andra accepterar som "så gör vi". Nu bygger jag verktyg som löser flaskhalsar i affärsprocesser – integrerar system som inte var tänkta att prata med varandra och får alla på samma sida.</p>

			<p>På Nordmet började det som sidoprojekt och har vuxit till något större.</p>

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
		<h1>Projekt jag är stolt över</h1>

		<article id="homeassistant">
			<div class="text">
				<p class="project-label animated" data-aos="fade-left" data-aos-offset="480">Senaste projektet</p>
				<h2 class="animated" data-aos="fade-left" data-aos-offset="480">Smart Hem Automation Platform</h2>
				<p class="project-tagline" data-aos="fade-left" data-aos-offset="485">⚡ 30% lägre elförbrukning • 15+ enheter integrerade • 50+ automations</p>

				<div class="blackBox animated">
					<p>Jag hade 15+ smarta enheter från olika tillverkare, alla med egna appar. Ville skapa intelligenta automatiseringar baserat på kontext (tid, plats, väder, vad folk gör i huset) men befintliga lösningar var låsta till ett ekosystem i taget.</p>

					<p>Byggde en central Home Assistant hub med custom automations och integrationer. Skapade kontext-medvetna system för belysning, energioptimering, säkerhet och klimatstyrning som pratar med varandra över plattformsgränser.</p>

					<p>30% lägre elförbrukning genom smart värmestyrning, 15 olika enheter/plattformar integrerade, 50+ automations som kör dagligen. Allt funkar utan att jag behöver göra något manuellt efter setup.</p>
				</div>

				<h3 class="animated">teknologier som används:</h3>
				<ul class="animated">
					<li>Home Assistant |</li>
					<li>YAML |</li>
					<li>Python |</li>
					<li>n8n |</li>
					<li>MQTT |</li>
					<li>REST APIs</li>
				</ul>
			</div>
			<img src="/images/homeassistant.png"
				alt="Home Assistant dashboard showing smart home automations"
				loading="lazy"
				width="1200"
				height="800" />
		</article>

		<article id="second">
			<div class="text">
				<h2 class="animated" data-aos="fade-left" data-aos-offset="480">Förfrågningsverktyg för stål</h2>
				<p class="project-tagline" data-aos="fade-left" data-aos-offset="485">🚀 87% snabbare förfrågningar • 2h → 15 min • Nära noll fel</p>

				<div class="blackBox animated">
					<p>Säljare på Nordmet spenderade 2-3 timmar om dagen på att manuellt sammanställa prisförfrågningar till leverantörer. Historisk data fanns i olika system och krävde evigheter att hitta. Plus att förfrågningar innehöll ofta fel på grund av copy-paste mellan Excel och Outlook.</p>

					<p>Byggde ett flerspråkigt verktyg som automatiskt söker igenom historisk orderdata, integrerar med Excel, och genererar färdiga förfrågningar på flera språk med ett klick. Kombinerar webbgränssnitt och Excel-integration så folk kan jobba som de vill.</p>

					<p>Minskade förfrågningstid från 2 timmar till 15 minuter (87% reduktion). Säljteamet kan nu hantera 5x fler förfrågningar per dag och vi har nästan inga fel längre från manuell datahantering.</p>
				</div>

				<h3 class="animated">teknologier som används:</h3>
				<ul class="animated">
					<li>Javascript |</li>
					<li>Python |</li>
					<li>SQL |</li>
					<li>HTML |</li>
					<li>CSS</li>
				</ul>
			</div>
			<img src="/images/Inquiry.png"
				alt="Multilingual steel inquiry tool interface"
				loading="lazy"
				width="1200"
				height="800" />
		</article>

		<article id="third">
			<div class="text">
				<h2 data-aos="fade-right" data-aos-offset="200">Automatiserad Offert- och Orderhantering</h2>
				<p class="project-tagline" data-aos="fade-right" data-aos-offset="250">💰 80% snabbare offerter • Realtidspriser • 95% färre fel</p>
				<div class="blackBox animated" data-aos="fade-right" data-aos-offset="300">
					<p>Säljare spenderade 20-30 minuter per offert på att manuellt beräkna stålkostnader, ringa fraktbolag för priser, och sedan knappa in allt i Fortnox. Fraktkostnader var ofta fel eftersom vi använde gamla priser från Excel-ark.</p>

					<p>Byggde ett Excel-baserat verktyg med VBA-makron och Python-integration som automatiskt beräknar stålkostnader, hämtar realtidspriser via API från fraktbolag baserat på vikt/flakmeter/sträcka, och skickar offertdata direkt till Fortnox och intern webapp via Python-scripts.</p>

					<p>Minskade offerttid från 25 minuter till 5 minuter (80% reduktion). Exakta fraktkostnader med realtidspriser istället för gissningar. Automatisk dataöverföring till både affärssystem och intern webapp eliminerade manuell inmatning, vilket minskade mänskliga fel med 95%.</p>
				</div>

				<h3 class="animated">teknologier som används:</h3>
				<ul class="animated">
					<li>Python |</li>
					<li>SQL |</li>
					<li>VBA |</li>
					<li>Excel</li>
				</ul>
			</div>

			<img class="animated" data-aos="fade-left" data-aos-offset="400"
				src="/images/excel.jpg"
				alt="Excel-based quote calculator"
				loading="lazy"
				width="1200"
				height="800" />
		</article>

		<article id="fourth">
			<div class="text">
				<h2 class="animated" data-aos="fade-left" data-aos-offset="100">Intern webbapp för Nordic Metal Trade</h2>
				<p class="project-tagline" data-aos="fade-left" data-aos-offset="200">📊 8 användare dagligen • 500+ certifikat • 60% snabbare informationssökning</p>
				<div class="blackBox animated" data-aos="fade-left" data-aos-offset="300">
					<p>Kunddata, certifikat och transportinformation fanns i separata Excel-filer och pappersarkiv. Säljare och logistik hade ingen gemensam plattform, vilket ledde till dubbelarbete, förlorade dokument och eviga mail-kedjor för att hitta information.</p>

					<p>Byggde en allt-i-ett webbapp med anpassat CRM, certifikatspårning och transportregister. Centraliserad databas med rollbaserad access för olika avdelningar så alla ser vad de behöver men inte mer.</p>

					<p>Hela säljteamet (8 personer) använder det dagligen. Spårar 500+ aktiva kundcertifikat digitalt, hanterar 100+ transporter per månad med full transparens, och minskade tid för informationssökning med ~60%.</p>

					<p><em>OBS: Webbappen är endast tillgänglig via företagets VPN</em></p>
				</div>

				<h3 class="animated">teknologier som används:</h3>
				<ul class="animated">
					<li>Javascript |</li>
					<li>Python |</li>
					<li>SQL |</li>
					<li>HTML |</li>
					<li>CSS</li>
				</ul>
			</div>

			<img class="animated" data-aos="fade-left" data-aos-offset="400"
				src="/images/CRM.png"
				alt="Internal CRM web application dashboard"
				loading="lazy"
				width="1200"
				height="800" />
		</article>
	</section>
</div>

<section id="contact">
	<h2>Kontakta mig</h2>

	<p>Jag söker möjligheter där jag kan göra verklig skillnad genom att kombinera automation, systemintegration och affärsförståelse</p>

	<div class="contact-button-wrapper">
		<a href="mailto:mlixenstrand@gmail.com" class="contact-button">Kontakta mig här</a>
	</div>
</section>

<!-- Sticky CTA -->
{#if showStickyCTA}
	<a href="mailto:mlixenstrand@gmail.com" class="sticky-cta">
		Kontakta mig
	</a>
{/if}
