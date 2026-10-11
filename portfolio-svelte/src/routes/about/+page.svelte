<script lang="ts">
	const cv = '/cv/magnus_lixenstrand_cv_2026.pdf?v=4';
	const cvEn = '/cv/magnus_lixenstrand_cv_2026_en.pdf?v=4';

	// Same roles and track lines as the CV: steel = development, clay = sales.
	const career = [
		{
			period: 'jul 2019–nu',
			org: 'Nordic Metal Trade AB',
			track: 'both',
			titles: ['Systemutvecklare och systemansvarig, aug\u00A02025–nu', 'B2B-säljare med utvecklingsansvar, jul\u00A02019–jul\u00A02025 (80\u00A0% försäljning, 20\u00A0% utveckling)'],
			text: 'Planerade och byggde företagets affärssystem. Är i dag produktägare och ensam utvecklare. Som säljare stod jag 2021 för ungefär hälften av företagets försäljning.'
		},
		{
			period: 'okt 2017–aug 2019',
			org: 'AD infinitum recycling',
			track: 'sales',
			titles: ['Affärsutvecklare, avfallshantering'],
			text: 'Kartlade företags avfallsflöden och sålde lösningar som sänkte deras kostnader, från första samtal till avtal.'
		},
		{ period: 'jan–sep 2017', org: '3 Sverige', track: 'sales', titles: ['Försäljningsspecialist B2B, från Cypern'] },
		{ period: 'okt 2015–dec 2016', org: 'Resor i Asien och Australien', track: 'pause', titles: ['Karriäruppehåll med tillfälligt arbete i besöksnäringen'] },
		{
			period: 'jan 2013–okt 2015',
			org: 'Eniro',
			track: 'both',
			titles: ['Senior försäljningsledare och systemambassadör'],
			text: 'Tre befordringar på knappt tre år. Ledde teamet när chefen var borta. Ledde det lokala införandet av ett nytt Google-baserat affärssystem och utbildade kollegorna.'
		},
		{ period: 'feb 2009–jun 2011', org: 'Sveacom AB', track: 'sales', titles: ['Telefonförsäljare'] }
	];

	const skills = [
		{ area: 'Utveckling', items: 'Python, FastAPI, Flask, SvelteKit, TypeScript, MySQL, REST-API:er, VBA' },
		{ area: 'Drift och integration', items: 'Docker, Linux, Google Cloud, GitHub Actions, Fortnox, Microsoft 365, n8n' },
		{ area: 'AI', items: 'Claude Code, Codex, agentflöden med kodgranskning, AI-assistenter' },
		{ area: 'Verksamhet', items: 'Kravanalys, processkartläggning, projektledning, systeminförande, användarstöd' },
		{ area: 'Affär', items: 'B2B-försäljning, förhandling, upphandling, budget' },
		{ area: 'Språk', items: 'Svenska (modersmål), engelska (flytande)' }
	];

	const title = 'Om Magnus Lixenstrand – från försäljning till systemutveckling';
	const description = 'Magnus Lixenstrand har sålt i tolv år och byggt ett affärssystem som används varje dag. Om hans bakgrund och kompetenser.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>
	<link rel="canonical" href="https://magnuslixenstrand.com/about">
	<meta property="og:type" content="profile">
	<meta property="og:url" content="https://magnuslixenstrand.com/about">
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
</svelte:head>

<section class="hero hero-about" aria-labelledby="om-rubrik">
	<div class="hero-copy">
		<h1 id="om-rubrik">Tolv år som säljare, nu systemutvecklare</h1>
		<p class="lede">Säljåren lärde mig var arbetet fastnar. I dag äger jag Nordic Metal Trades affärssystem, från kravställning till drift.</p>
		<div class="cta-group">
			<a href="/#affarssystemet" class="cta-primary">Se affärssystemet</a>
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

<div class="about">
	<section>
		<h2>Varför jag började bygga system</h2>
		<div class="about-text">
			<p>Som säljare gick mycket tid åt till dubbelarbete i system som inte pratade med varandra. Till slut började jag bygga verktygen jag själv saknade.</p>
		</div>
	</section>

	<section>
		<h2>Affärssystemet</h2>
		<div class="about-text">
			<p>På Nordic Metal Trade började jag med att automatisera offertflödet. Det blev starten på företagets affärssystem, som jag sedan planerade och byggde. Systemet samlar CRM, materialförfrågningar, offerter, order, inköp, lager, certifikat och transport, och är kopplat till Fortnox, Shiplink, Unifaun/nShift och Microsoft&nbsp;365.</p>
			<p>Jag är produktägare och ensam utvecklare, och var projektledare för införandet: test, utbildning och bytet från det gamla systemet.</p>
			<p class="about-result">Systemet har <strong>cirka tio användare och sparar teamet över 20 timmar i veckan</strong>.</p>
		</div>
	</section>

	<section aria-labelledby="vag-rubrik">
		<h2 id="vag-rubrik">Vägen hit</h2>
		<div class="about-text">
			<p class="track-key"><span class="key-dev">Utveckling och automation</span><span class="key-sales">Försäljning och affär</span></p>
			<ol class="career">
				{#each career as role}
					<li class="role {role.track}">
						<p class="role-period">{role.period}</p>
						<div class="role-body">
							<h3>{role.org}</h3>
							{#each role.titles as t}<p class="role-title">{t}</p>{/each}
							{#if role.text}<p>{role.text}</p>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section>
		<h2>Kompetenser</h2>
		<div class="about-text">
			<dl class="skills">
				{#each skills as s}
					<div>
						<dt>{s.area}</dt>
						<dd>{s.items}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<section>
		<h2>Fritid</h2>
		<div class="about-text">
			<p>Hemma har jag Home Assistant med 232 enheter och 161 automationer som bland annat kopplar ihop belysning, värmepumpar och elpris. Familjen styr det från en egen dashboard.</p>
			<p>Jag bor i Jönköping, reser gärna med min sambo och springer för att hålla huvudet klart.</p>
		</div>
	</section>
</div>
