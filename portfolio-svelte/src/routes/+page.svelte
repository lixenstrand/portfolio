<script lang="ts">
	const cv = '/cv/magnus_lixenstrand_cv_2026.pdf?v=3';
	const cvEn = '/cv/magnus_lixenstrand_cv_2026_en.pdf?v=3';

	// Steps with a shot switch the screenshot; the rest point to their story row
	const flow = [
		{ step: 'Kund och CRM', shot: 'erp-kunder', alt: 'Kundregistret i affärssystemet: kunder med land, ansvarig säljare, senaste aktivitet, omsättning, täckningsbidrag och aktiva offerter', caption: 'Kundregistret visar omsättning, täckningsbidrag och aktiva offerter per kund.' },
		{ step: 'Material­förfrågan', shot: 'erp-materialforfragan', alt: 'Materialförfrågan: sökträffar bland leverantörer och historiska order till vänster, tre materialrader med dimension, stålkvalitet och vikt i mitten och vald leverantör till höger', caption: 'En sökning går samtidigt genom leverantörer, historiska order, offerter och produkter. Förfrågan till de valda leverantörerna skapas i samma vy.' },
		{ step: 'Offert', shot: 'erp-offert', alt: 'Offert med offertrader, inpris, utpris och täckningsbidrag per rad, och en fraktsändning med pris från Unifaun', caption: 'Offerten räknar täckningsbidrag per rad och lägger frakten som en egen sändning med transportörens pris.' },
		{ step: 'Order och inköp', shot: 'erp-order', alt: 'Orderöversikt som tavla med kolumner från inköp till produktion, där varje order visar inköpsstatus, frakt och kommentarer', caption: 'Orderöversikten följer varje order från inköp till leverans och flaggar det som håller på att bli försenat.' },
		{ step: 'Lager och certifikat', shot: 'erp-lager', alt: 'Chargespårning för ett smältnummer: mottagning från leverantör och plockning på fem order', caption: 'Chargespårningen följer ett smältnummer från inleverans till varje order där materialet plockats. Det avgör vilket certifikat kunden ska ha.' },
		{ step: 'Transport', shot: 'erp-transport', alt: 'En bokad transport i fraktplaneringen: leveransdatum, vikt och ordervärde överst, kund, leverantör och fraktben med transportör, hämtning, lossning och kostnad, samt inleveranser, artiklar och kommentarer', caption: 'En bokad transport samlar kund, leverantör, fraktben, inleveranser och kommentarer på ett ställe, med listan över alla bokningar bredvid.' },
		{ step: 'Bokföring', row: 'integrationer' }
	];
	const shots = flow.filter((f) => f.shot).length;
	let active = $state(1);
	let prev = $state(1);
	let playing = $state(true);
	let reduced = $state(false);
	let bare = $state(false); // phones: no map or truck, just the rotating shot
	let offscreen = $state(true);
	let seen = $state(false); // load all shots once the section is near
	let flowEl: HTMLOListElement;
	let showEl: HTMLDivElement;
	const shown = $derived(flow[active]);

	// The truck drives on its own: slowly to the next step, where the shot changes on arrival.
	// A click takes over: the truck goes straight there and the tour stops.
	let at = $state(1);
	let truck = $state({ x: 0, y: 0, back: false, driving: false, fast: true, gone: false, jump: false });

	function show(i: number) {
		if (i === active) return;
		prev = active;
		active = i;
	}

	function drive(i: number, fast: boolean) {
		if (i === at) return;
		truck.back = i < at;
		truck.fast = fast;
		truck.driving = !reduced && !bare;
		at = i;
		if (!truck.driving) show(i);
	}

	function pick(i: number) {
		playing = false;
		truck.gone = false;
		drive(i, true);
		show(i);
	}

	function toggle() {
		playing = !playing;
		if (playing) showEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
	}
	function arrived(e: TransitionEvent) {
		if (e.propertyName !== 'translate') return;
		truck.driving = false;
		show(at);
	}

	function park() {
		const li = flowEl?.children[at] as HTMLElement | undefined;
		if (!li) return;
		const node = getComputedStyle(li, '::before');
		truck.x = li.offsetLeft + parseFloat(node.left) + parseFloat(node.width) / 2;
		truck.y = li.offsetTop + parseFloat(node.top) + parseFloat(node.height) / 2;
	}

	$effect(park);

	$effect(() => {
		if (!playing || offscreen || reduced || truck.driving || at !== active) return;
		const t = setTimeout(() => {
			if (at < shots - 1) return drive(at + 1, false);
			// End of the road: fade out and start over from the first step
			truck.gone = true;
			setTimeout(() => {
				truck.jump = true;
				truck.back = false;
				at = 0;
				show(0);
				requestAnimationFrame(() => requestAnimationFrame(() => (truck.jump = truck.gone = false)));
			}, 450);
		}, bare ? 4500 : 1600);
		return () => clearTimeout(t);
	});

	$effect(() => {
		reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) playing = false;
		const phone = matchMedia('(max-width: 820px)');
		bare = phone.matches;
		phone.onchange = (e) => (bare = e.matches);
		const ro = new ResizeObserver(park);
		ro.observe(flowEl);
		const io = new IntersectionObserver(([e]) => {
			offscreen = !e.isIntersecting;
			seen ||= e.isIntersecting;
		}, { threshold: 0.3 });
		io.observe(showEl);
		return () => (ro.disconnect(), io.disconnect());
	});

	// Hemma rolls through its views on its own until a view is picked
	const home = [
		{ name: 'Hem', shot: 'hemma-hem', alt: 'Startsidan i Hemma på en surfplatta: torken och disken är klara, inne- och utetemperatur och scener som Morgon, Film och Godnatt' },
		{ name: 'Rum', shot: 'hemma-rum', alt: 'Rummen i Hemma: vardagsrummet öppnas, en lampa släcks och en annan dimmas från 36 till 10 procent' },
		{ name: 'Klimat', shot: 'hemma-klimat', alt: 'Klimatet i Hemma: inne- och utetemperatur, luftfuktighet, värmepumpen och varmvatten med kurvor' }
	];
	let homeNow = $state(0);
	let homePrev = $state(0);
	let homeAuto = $state(true);
	let homeOff = $state(true);
	let homeEl: HTMLElement;

	function homeShow(i: number) {
		if (i === homeNow) return;
		homePrev = homeNow;
		homeNow = i;
		clips[i].currentTime = 0;
	}

	// Each view is a short clip; the next one wipes in when it ends
	const clips: HTMLVideoElement[] = [];

	$effect(() => {
		clips.forEach((v, i) => (i === homeNow && !homeOff && !reduced ? v.play().catch(() => {}) : v.pause()));
	});

	function clipEnded(i: number) {
		if (homeAuto) homeShow((i + 1) % home.length);
		else clips[i].play();
	}

	$effect(() => {
		const io = new IntersectionObserver(([e]) => (homeOff = !e.isIntersecting), { threshold: 0.3 });
		io.observe(homeEl);
		return () => io.disconnect();
	});

	const story = [
		{ label: 'Utgångsläge', text: 'Kunder, material, offerter, order, certifikat och transporter låg i separata system och Excel-filer. Samma uppgifter registrerades flera gånger och ett ärende gick inte att följa genom verksamheten.' },
		{ label: 'Början', text: 'Som säljare automatiserade jag först offertflödet, från Excel och VBA till ett webbflöde mot Fortnox. Det blev grunden till dagens system.' },
		{ label: 'Min roll', text: 'Produktägare, ensam utvecklare och projektledare för införandet: kravställning, datamodell, utveckling, test, utbildning och bytet från det gamla systemet.' },
		{ label: 'Integrationer', id: 'integrationer', text: 'Fortnox, Shiplink, Unifaun/nShift och Microsoft\u00A0365. Order, lager och inköp förs över till Fortnox utan dubbelregistrering, och frakt bokas direkt från ordern.' },
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

		<div class="erp-show" role="group" aria-label="Flödet med skärmbilder" bind:this={showEl}>
			<div class="flow-road">
				<ol class="flow" aria-label="Flödet i affärssystemet" bind:this={flowEl}>
					{#each flow as item, i}
						<li class:here={at === i && !truck.gone}>
							{#if item.shot}
								<button type="button" class="flow-step" aria-pressed={active === i} aria-controls="erp-skarmbild" onclick={() => pick(i)}>{item.step}</button>
							{:else}
								<a class="flow-step" href="#{item.row}">{item.step}</a>
							{/if}
						</li>
					{/each}
				</ol>
				<svg class="truck" class:back={truck.back} class:driving={truck.driving} class:fast={truck.fast} class:gone={truck.gone} class:jump={truck.jump} style="--x: {truck.x}px; --y: {truck.y}px" viewBox="0 0 120 40" aria-hidden="true" ontransitionend={arrived}>
					<g class="truck-load">
						<rect class="plate" x="7" y="19.5" width="38" height="5.5" rx="0.8" />
						<rect class="plate light" x="9.5" y="15.5" width="33" height="4" rx="0.8" />
						<path class="strap" d="M17 15.5v9.5M34 15.5v9.5" />
						<circle class="coil" cx="61" cy="17.2" r="7.8" />
						<circle class="coil-ring" cx="61" cy="17.2" r="5.4" />
						<circle class="coil-eye" cx="61" cy="17.2" r="2.7" />
					</g>
					<path class="truck-chassis" d="M3 25h78v3.4H8.5L3 27.2z" />
					<rect class="truck-chassis" x="78.5" y="12" width="2.4" height="14" rx="0.6" />
					<path class="truck-cab" d="M83 29.5V10.5c0-3 2.2-5.5 5.3-5.5h13.2c1.6 0 3.1.8 4 2.1l7.6 11c.6.9.9 1.9.9 3v8.4z" />
					<path class="truck-glass" d="M103.4 8.2h.9c.9 0 1.7.4 2.2 1.2l5.9 8.6h-9z" />
					<path class="truck-glass side" d="M93 8.2h7.6v9.8H93z" />
					<path class="truck-trim" d="M83 23.6h32" />
					<rect class="truck-light" x="113.2" y="21" width="2.6" height="1.6" rx="0.8" />
					<g transform="translate(15 31)"><g class="truck-wheel"><circle r="4.2" /><circle class="rim" r="2.1" /><path d="M0-1.6v3.2M-1.6 0h3.2" /></g></g>
					<g transform="translate(25 31)"><g class="truck-wheel"><circle r="4.2" /><circle class="rim" r="2.1" /><path d="M0-1.6v3.2M-1.6 0h3.2" /></g></g>
					<g transform="translate(90 31)"><g class="truck-wheel"><circle r="4.2" /><circle class="rim" r="2.1" /><path d="M0-1.6v3.2M-1.6 0h3.2" /></g></g>
					<g transform="translate(108 31)"><g class="truck-wheel"><circle r="4.2" /><circle class="rim" r="2.1" /><path d="M0-1.6v3.2M-1.6 0h3.2" /></g></g>
				</svg>
			</div>

			<figure class="shot" id="erp-skarmbild">
				<a href="/images/{shown.shot}.webp" target="_blank" rel="noopener" aria-label="Skärmbild av {shown.step.replace('\u00AD', '').toLowerCase()}, öppnas i full storlek i ny flik">
					<div class="shot-frame">
						{#each flow as item, i}
							{#if item.shot}
								<img class:is-active={i === active} class:is-prev={i === prev && i !== active} src="/images/{item.shot}-1200.webp" srcset="/images/{item.shot}-1200.webp 1200w, /images/{item.shot}.webp 2400w" sizes="(min-width: 1212px) 1180px, calc(100vw - 2rem)" alt={i === active ? item.alt : ''} width="2400" height="1500" loading={seen ? 'eager' : 'lazy'}>
							{/if}
						{/each}
					</div>
				</a>
				<figcaption aria-live={playing ? 'off' : 'polite'}><strong>{shown.step}.</strong> {shown.caption}</figcaption>
			</figure>
			<p class="shot-note">
				Bilderna kommer från testmiljön och all data på dem är påhittad. Systemet nås bara via företagets VPN, därför visas bilder i stället för en demo.
				<button type="button" class="shot-toggle" onclick={toggle}>{playing ? 'Pausa bildspelet' : 'Starta bildspelet'}</button>
			</p>
		</div>

		<dl class="story">
			{#each story as part}
				<div id={part.id}>
					<dt>{part.label}</dt>
					<dd>{part.text}</dd>
				</div>
			{/each}
		</dl>
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
			<figure class="shot" bind:this={homeEl}>
				<a href="/images/{home[homeNow].shot}.webp" target="_blank" rel="noopener" aria-label="Skärmbild av Hemma, {home[homeNow].name.toLowerCase()}, öppnas i full storlek i ny flik">
					<div class="shot-frame">
						{#each home as item, i}
							<video class:is-active={i === homeNow} class:is-prev={i === homePrev && i !== homeNow} bind:this={clips[i]} src="/images/{item.shot}.mp4" poster="/images/{item.shot}-poster.webp" aria-label={i === homeNow ? item.alt : undefined} aria-hidden={i !== homeNow} width="1290" height="900" muted playsinline preload={homeOff ? 'none' : 'auto'} onended={() => clipEnded(i)}></video>
						{/each}
					</div>
				</a>
				<figcaption>
					<span class="home-steps">
						{#each home as item, i}
							<button type="button" class="flow-step" aria-pressed={i === homeNow} onclick={() => ((homeAuto = false), homeShow(i))}>{item.name}</button>
						{/each}
					</span>
					Hemma på en surfplatta. Den körs lokalt och är kopplad till Home Assistant.
				</figcaption>
			</figure>
		</div>
	</section>
</section>
