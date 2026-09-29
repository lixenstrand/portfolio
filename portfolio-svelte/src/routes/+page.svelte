<script lang="ts">
	const cv = '/cv/magnus_lixenstrand_cv_2026.pdf?v=2';
	const cvEn = '/cv/magnus_lixenstrand_cv_2026_en.pdf?v=2';

	const flow = [
		{ step: 'Kund och CRM' },
		{ step: 'Material\u00ADförfrågan', result: '2 h → 15 min', detail: 'per förfrågan till leverantörer' },
		{ step: 'Offert', result: '30 → 5 min', detail: 'per offert, 20–30 offerter i veckan' },
		{ step: 'Order och inköp', detail: 'förs över till Fortnox utan dubbelregistrering' },
		{ step: 'Lager och certifikat', result: '500+', detail: 'sökbara certifikat' },
		{ step: 'Transport', detail: 'frakt bokas direkt från ordern' },
		{ step: 'Bokföring', detail: 'i Fortnox' }
	];

	const story = [
		{ label: 'Utgångsläge', text: 'Kunder, material, offerter, order, certifikat och transporter låg i separata system och Excel-filer. Samma uppgifter registrerades flera gånger och ett ärende gick inte att följa genom verksamheten.' },
		{ label: 'Början', text: 'Som säljare automatiserade jag först offertflödet, från Excel och VBA till ett webbflöde mot Fortnox. Det blev grunden till dagens system.' },
		{ label: 'Min roll', text: 'Produktägare, ensam utvecklare och projektledare för införandet: kravställning, datamodell, utveckling, test, utbildning och bytet från det gamla systemet.' },
		{ label: 'Integrationer', text: 'Fortnox, Shiplink, Unifaun/nShift och Microsoft\u00A0365. Order, lager och inköp förs över till Fortnox utan dubbelregistrering, och frakt bokas direkt från ordern.' },
		{ label: 'AI-assistent', text: 'Svarar kollegorna om order, lager, material och rutiner, och kan efter bekräftelse lägga upp kunder och göra om förfrågningar till offerter.' },
		{ label: 'Teknik', text: 'SvelteKit, TypeScript, FastAPI, Python, MySQL och Docker.' }
	];

	const title = 'Magnus Lixenstrand – systemutvecklare, affärssystem och integration';
	const description = 'Systemutvecklare i Jönköping med tolv år i försäljning. Planerade och byggde Nordic Metal Trades affärssystem från grunden och äger det i dag som produktägare och ensam utvecklare.';
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Magnus Lixenstrand',
		url: 'https://magnuslixenstrand.com',
		image: 'https://magnuslixenstrand.com/images/IMG_0830_optimized.jpg',
		jobTitle: 'Systemutvecklare',
		worksFor: { '@type': 'Organization', name: 'Nordic Metal Trade AB' },
		description,
		email: 'mlixenstrand@gmail.com',
		address: { '@type': 'PostalAddress', addressLocality: 'Jönköping', addressCountry: 'SE' },
		sameAs: ['https://www.linkedin.com/in/magnus-lixenstrand/'],
		knowsAbout: ['Affärssystem', 'Systemintegration', 'Processautomation', 'Python', 'FastAPI', 'SvelteKit', 'TypeScript', 'Fortnox']
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>
	<meta name="author" content="Magnus Lixenstrand">
	<link rel="canonical" href="https://magnuslixenstrand.com/">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://magnuslixenstrand.com/">
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://magnuslixenstrand.com/images/og-magnus-lixenstrand.jpg">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content="Magnus Lixenstrand, systemutvecklare – affärssystem, integration och automation">
	<meta property="og:locale" content="sv_SE">
	<meta property="og:site_name" content="Magnus Lixenstrand">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content={title}>
	<meta name="twitter:description" content={description}>
	<meta name="twitter:image" content="https://magnuslixenstrand.com/images/og-magnus-lixenstrand.jpg">
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="hero" aria-labelledby="hero-rubrik">
	<div class="hero-copy">
		<h1 id="hero-rubrik">Jag bygger bort onödigt manuellt arbete</h1>
		<p class="lede">Jag heter Magnus Lixenstrand och är systemutvecklare i Jönköping. Tolv år i försäljning lärde mig var arbetet fastnar, så jag planerade och byggde Nordic Metal Trades affärssystem från grunden. I dag äger jag det som produktägare och ensam utvecklare.</p>
		<p class="hero-proof">Systemet används varje dag av cirka tio kollegor och sparar teamet över <strong>20 timmar i veckan</strong>.</p>
		<div class="cta-group">
			<a href="#affarssystemet" class="cta-primary">Se affärssystemet</a>
			<a href={cv} target="_blank" rel="noopener noreferrer" aria-label="Öppna CV (PDF) i ny flik" class="cta-secondary">Öppna CV (PDF)</a>
			<a href={cvEn} target="_blank" rel="noopener noreferrer" aria-label="CV in English (PDF), opens in a new tab" class="cta-secondary" lang="en">CV in English</a>
		</div>
	</div>

	<figure class="hero-portrait">
		<picture>
			<source type="image/webp" srcset="/images/IMG_0830-480.webp 480w, /images/IMG_0830-800.webp 800w, /images/IMG_0830.webp 1200w" sizes="(min-width: 821px) 22rem, 70vw">
			<img src="/images/IMG_0830_optimized.jpg" alt="Magnus Lixenstrand" width="1200" height="1200">
		</picture>
	</figure>
</section>

<section id="projects" class="work">
	<article id="affarssystemet" class="erp" aria-labelledby="erp-rubrik">
		<header class="erp-head">
			<h2 id="erp-rubrik">Ett eget affärssystem för hela flödet</h2>
			<p>Nordic Metal Trade säljer stål och metall till industrikunder i Europa. Affärssystemet är skräddarsytt efter hur företaget arbetar, används varje dag av cirka tio kollegor och sparar teamet över 20&nbsp;timmar i veckan.</p>
		</header>

		<ol class="flow" aria-label="Flödet i affärssystemet">
			{#each flow as item}
				<li>
					<span class="flow-step">{item.step}</span>
					{#if item.result}<strong class="flow-result">{item.result}</strong>{/if}
					{#if item.detail}<span class="flow-detail">{item.detail}</span>{/if}
				</li>
			{/each}
		</ol>

		<dl class="story">
			{#each story as part}
				<div>
					<dt>{part.label}</dt>
					<dd>{part.text}</dd>
				</div>
			{/each}
		</dl>

		<figure class="shot">
			<a href="/images/erp-materialforfragan.png" target="_blank" rel="noopener" aria-label="Skärmbild av materialförfrågan, öppnas i full storlek i ny flik">
				<picture>
					<source type="image/webp" srcset="/images/erp-materialforfragan-1400.webp 1400w, /images/erp-materialforfragan.webp 2660w" sizes="(min-width: 1212px) 1180px, calc(100vw - 2rem)">
					<img src="/images/erp-materialforfragan.png" alt="Materialförfrågan i affärssystemet: sökfält för leverantörer, produkter och ordernummer bredvid en tabell med produkttyp, dimension, stålkvalitet, antal och vikt" width="2660" height="900" loading="lazy">
				</picture>
			</a>
			<figcaption>Materialförfrågan: en sökning går samtidigt genom leverantörer, historiska order, offerter och produkter. Systemet innehåller företagsdata och nås bara via företagets VPN, därför visas bilder i stället för en demo.</figcaption>
		</figure>
	</article>

	<section class="side" aria-labelledby="egna-rubrik">
		<h2 id="egna-rubrik">Egna projekt</h2>
		<div class="side-grid">
			<div class="side-list">
				<article>
					<h3>Smart hem</h3>
					<p>Home Assistant med 232 enheter, 161 automationer och 16 rum, via Zigbee, Matter/Thread och MQTT. Automationerna kopplar ihop belysning, värmepumpar och Nord&nbsp;Pool-elpris.</p>
				</article>
				<article>
					<h3>Hemma</h3>
					<p>En egen dashboard i SvelteKit och FastAPI som familjen styr hemmet från i mobil och surfplatta, med roller för familj och gäster, pushnotiser och en AI-assistent som bara får föreslå godkända åtgärder.</p>
				</article>
				<article>
					<h3>Familjeekonomi</h3>
					<p>En webbapp i SvelteKit, FastAPI och SQLite som hämtar transaktioner från Toshl och följer budget, sparmål och lån. Den körs på egen server med nattlig avstämning.</p>
				</article>
			</div>
			<figure class="shot">
				<a href="/images/home-dashboard-live.png" target="_blank" rel="noopener" aria-label="Skärmbild av Hemma, öppnas i full storlek i ny flik">
					<picture>
						<source type="image/webp" srcset="/images/home-dashboard-live-800.webp 800w, /images/home-dashboard-live.webp 1440w" sizes="(min-width: 821px) 36rem, calc(100vw - 2rem)">
						<img src="/images/home-dashboard-live.png" alt="Hemma, den egna dashboarden, med inomhus- och utomhustemperatur, tvättstatus, robotdammsugare, diskmaskin och elpris" width="1440" height="1050" loading="lazy">
					</picture>
				</a>
				<figcaption>Hemma körs lokalt och är kopplad till Home Assistant.</figcaption>
			</figure>
		</div>
	</section>
</section>
