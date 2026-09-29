<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TechBadge from '$lib/components/TechBadge.svelte';

	const projects = [
		{
			id: 'nordmet-erp',
			label: 'Huvudcase · Nordmet',
			title: 'Ett verksamhetsnära ERP för hela flödet',
			tagline: 'Från kund och materialförfrågan till offert, order, lager, transport och bokföring',
			descriptionParagraphs: [
				'Kunder, material, offerter, order, certifikat och transporter hanterades i flera separata system och Excel-filer. Samma uppgifter behövde registreras flera gånger och det var svårt att följa ett ärende genom hela verksamheten.',
				'Jag utvecklar ett webbaserat ERP som samlar Nordmets centrala arbetsflöden. Plattformen innehåller CRM, materialförfrågningar, offerter, order, inköp, lager, certifikat, transportplanering och integrationer mot bland annat Fortnox.',
				'Plattformen innehåller företagsdata och är därför endast tillgänglig via Nordmets VPN.'
			],
			storyLabels: ['Utgångsläge', 'ERP-systemet', 'Åtkomst'],
			metrics: [
				{ value: '10 personer', label: 'använder plattformen' },
				{ value: '20+ h/vecka', label: 'sparad arbetstid' },
				{ value: '30 → 5 min', label: 'för en vanlig offert' },
				{ value: '2 h → 15 min', label: 'för en materialförfrågan' },
				{ value: '500+', label: 'sökbara certifikat' }
			],
			capabilities: ['CRM', 'Materialförfrågningar', 'Offerter och order', 'Inköp och lager', 'Certifikat', 'Transportplanering', 'Global sökning', 'Fortnox-integration'],
			technologies: ['SvelteKit', 'FastAPI', 'Python', 'MySQL', 'Docker', 'Fortnox API'],
			images: [
				{ src: '/images/inquiry-tool-v2.png', srcWebp: '/images/inquiry-tool-v2.webp', alt: 'Materialförfrågan i Nordmets ERP med sökning, produktrader och valda leverantörer', caption: 'Materialförfrågan – sökning, historik och leverantörsval i samma flöde', fit: 'contain' as const },
				{ src: '/images/nordmet-webapp-v2.png', srcWebp: '/images/nordmet-webapp-v2.webp', alt: 'Offertvyn i Nordmets ERP med kunduppgifter, offertrader och frakthantering', caption: 'Offertflödet – kund, artiklar, frakt och Fortnox-underlag samlat', fit: 'contain' as const }
			],
			featured: true
		},
		{
			id: 'family-finance',
			label: 'Familjeekonomi · Eget system',
			title: 'Familjens ekonomi, samlad på ett ställe',
			tagline: 'Budget, transaktioner och sparande i en mobilanpassad app på egen server',
			descriptionParagraphs: [
				'Jag byggde en egen webbapp som hämtar transaktioner från Toshl och samlar periodbudget, kategorisering, sparmål, lån och nettoförmögenhet. Gränssnittet är gjort för mobilen och används av hushållet i vardagen.',
				'Appen körs på min Unraid-server. Data säkerhetskopieras och en nattlig kontroll stämmer av aktuell och tolv tidigare perioder.'
			],
			storyLabels: ['Lösningen', 'I drift'],
			metrics: [{ value: 'Total kontroll och överblick', label: 'över privatekonomin' }],
			technologies: ['SvelteKit', 'FastAPI', 'Python', 'SQLite', 'Docker', 'Toshl API'],
			images: [{ src: '/images/family-finance-dashboard.png', srcWebp: '/images/family-finance-dashboard.webp', alt: 'Familjeekonomins mobilvy med periodbudget och ekonomisk uppföljning', caption: 'Den faktiska mobilvyn – privata belopp är medvetet suddade', fit: 'contain' as const, portrait: true }],
			imageDirection: 'right' as const,
			compact: true
		},
		{
			id: 'homeassistant',
			label: 'Smart hem · Eget system',
			title: 'Smarta hem-automationer med Home Assistant',
			tagline: 'Ett lokalt system med 232 enheter och 161 automationer i 16 rum',
			descriptionParagraphs: [
				'Jag samlade enheterna i Home Assistant via Zigbee, Matter/Thread och MQTT och byggde integrationer med YAML, Python och REST-API:er. Allt körs lokalt och går att styra och felsöka från en plats.',
				'Sensorer reglerar värmen utifrån temperaturen i varje rum och belysningen följer närvaro. Familjen styr hemmet från Hemma, en egen dashboard i SvelteKit och FastAPI med roller för familj och gäster, pushnotiser och en AI-assistent som bara får föreslå godkända åtgärder.'
			],
			storyLabels: ['Lösningen', 'I vardagen'],
			metrics: [{ value: '161', label: 'automationer i 16 rum' }],
			technologies: ['Home Assistant', 'SvelteKit', 'FastAPI', 'Python', 'MQTT', 'Zigbee', 'n8n'],
			images: [{ src: '/images/home-dashboard-live.png', srcWebp: '/images/home-dashboard-live.webp', alt: 'Magnus smarta hem-dashboard med klimat, tvättstatus, robotdammsugare, diskmaskin och energiläge', caption: 'Hemma, den egna dashboarden – lokalt körd och kopplad till Home Assistant', fit: 'contain' as const }],
			imageDirection: 'left' as const,
			compact: true
		}
	];

	const mainTechStack = ['SvelteKit', 'FastAPI', 'Python', 'MySQL', 'Docker'];
</script>

<svelte:head>
	<title>Automationsutvecklare i Jönköping | Magnus Lixenstrand</title>
	<meta name="description" content="Magnus Lixenstrand bygger verksamhetsnära system och automationer. Se Nordmets ERP samt egna system för familjeekonomi och smarta hem.">
	<meta name="author" content="Magnus Lixenstrand">
	<link rel="canonical" href="https://magnuslixenstrand.com/">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://magnuslixenstrand.com/">
	<meta property="og:title" content="Automationsutvecklare i Jönköping | Magnus Lixenstrand">
	<meta property="og:description" content="Se hur jag har kortat manuella arbetsflöden med Python, FastAPI, n8n och systemintegration.">
	<meta property="og:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">
	<meta property="og:locale" content="sv_SE">
	<meta property="og:site_name" content="Magnus Lixenstrand">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Automationsutvecklare i Jönköping | Magnus Lixenstrand">
	<meta name="twitter:description" content="Konkreta projekt inom automation, integration och verksamhetsutveckling.">
	<meta name="twitter:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">
	<script type="application/ld+json">
		{"@context":"https://schema.org","@type":"Person","name":"Magnus Lixenstrand","url":"https://magnuslixenstrand.com","image":"https://magnuslixenstrand.com/images/IMG_0830.jpg","jobTitle":"Automationsutvecklare","description":"Automationsutvecklare i Jönköping som bygger systemintegrationer och verksamhetsnära verktyg.","email":"mlixenstrand@gmail.com","address":{"@type":"PostalAddress","addressLocality":"Jönköping","addressCountry":"SE"},"sameAs":["https://www.linkedin.com/in/magnus-lixenstrand/"],"knowsAbout":["Python","FastAPI","n8n","SQL","Home Assistant","Processautomation","Systemintegration"]}
	</script>
</svelte:head>

<section id="intro">
	<div class="intro-grid">
		<div class="intro-content">
			<p class="name">Hej, jag heter <span>Magnus Lixenstrand.</span></p>
			<h1>Jag bygger bort onödigt manuellt arbete</h1>
			<p>Jag är automationsutvecklare i Jönköping. När information behöver flyttas för hand mellan två system brukar jag vilja bygga en bättre väg.</p>
			<p>Efter 12 år inom försäljning vet jag hur arbetet ser ut på andra sidan skärmen.</p>
			<p class="hero-proof"><strong>20+ timmar i veckan</strong> sparar ERP-systemet jag bygger på Nordmet åt teamet.</p>
			<div class="cta-group">
				<a href="#nordmet-erp" class="cta-primary">Se ERP-caset</a>
				<a href="/cv/magnus_lixenstrand_cv_2026.pdf" target="_blank" rel="noopener noreferrer" aria-label="Öppna CV i ny flik" class="cta-secondary">Öppna CV</a>
			</div>
			<div class="tech-stack" aria-label="Teknik jag arbetar med">
				{#each mainTechStack as tech}<TechBadge {tech} />{/each}
			</div>
		</div>

		<figure class="intro-headshot">
			<picture>
				<source type="image/webp" srcset="/images/IMG_0830_200.webp 200w, /images/IMG_0830.webp 1200w" sizes="(min-width: 850px) 350px, 80vw">
				<img src="/images/IMG_0830_optimized.jpg" alt="Magnus Lixenstrand" loading="eager" fetchpriority="high" width="1200" height="1200">
			</picture>
		</figure>
	</div>
</section>

<div class="projectBackground">
	<section id="projects">
		<div class="projects-intro">
			<h2>System jag bygger</h2>
			<p>Ett affärssystem utvecklat mitt i verksamheten – plus egna system för familjeekonomi och smarta hem.</p>
		</div>
		{#each projects as project}<ProjectCard {...project} />{/each}
	</section>
</div>

<section id="contact">
	<p class="section-kicker">Nästa steg</p>
	<h2>Söker ni någon som både ser problemet och bygger lösningen?</h2>
	<p>Jag söker roller inom automation, systemintegration och verksamhetsnära utveckling i Jönköpingsområdet eller på distans.</p>
	<div class="contact-actions">
		<a href="mailto:mlixenstrand@gmail.com" class="contact-button">Mejla mig</a>
		<a href="mailto:mlixenstrand@gmail.com" class="contact-email">mlixenstrand@gmail.com</a>
	</div>
</section>
