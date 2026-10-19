<script lang="ts">
	import { page } from '$app/state';
	import { content, langOf } from '$lib/content';

	const t = $derived(content(langOf(page.url.pathname)));
	const h = $derived(t.home);

	const flow = $derived(h.erp.flow);
	const shots = $derived(flow.filter((f) => f.shot).length);
	const dwell = 4500; // per shot without the truck
	let active = $state(1);
	let prev = $state(1);
	let back = $state(false); // the next shot uncovers the last one in the truck's direction,
	let slow = $state(false); // at the truck's pace
	let playing = $state(true);
	let reduced = $state(false);
	let wide = $state(false); // the truck only drives where the flow fits on one row
	let phone = $state(false); // phones swipe between the shots instead
	let offscreen = $state(true);
	let hidden = $state(false);
	let seen = $state(false); // load all shots once the section is near
	let flowEl: HTMLOListElement;
	let showEl: HTMLDivElement;
	let frameEl: HTMLDivElement;
	const shown = $derived(flow[active]);

	// The truck drives on its own: slowly to the next step, uncovering its shot on the way.
	// A click takes over: the truck goes straight there and the tour stops.
	let at = $state(1);
	let truck = $state({ x: 0, y: 0, back: false, driving: false, fast: true, gone: false, jump: false });

	function show(i: number) {
		if (i === active) return;
		back = i < active;
		slow = truck.driving && !truck.fast;
		prev = active;
		active = i;
	}

	function drive(i: number, fast: boolean) {
		if (i === at) return;
		truck.back = i < at;
		truck.fast = fast;
		truck.driving = wide && !reduced;
		at = i;
		show(i);
	}

	function pick(i: number) {
		playing = false;
		truck.gone = false;
		drive(i, true);
	}

	function toggle() {
		playing = !playing;
		if (playing) showEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
	}
	function arrived(e: TransitionEvent) {
		if (e.propertyName === 'translate') truck.driving = false;
	}

	function advance() {
		if (at < shots - 1) return drive(at + 1, false);
		if (!wide) return drive(0, false);
		// End of the road: fade out and start over from the first step
		truck.gone = true;
		setTimeout(() => {
			truck.jump = true;
			truck.back = false;
			at = 0;
			show(0);
			requestAnimationFrame(() => requestAnimationFrame(() => (truck.jump = truck.gone = false)));
		}, 450);
	}

	// Phones: the strip scrolls to the shot, and a swipe picks one once it settles
	let settle: ReturnType<typeof setTimeout>;
	$effect(() => {
		if (phone) frameEl.scrollTo({ left: active * frameEl.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
	});
	function swiped() {
		clearTimeout(settle);
		settle = setTimeout(() => {
			const i = Math.round(frameEl.scrollLeft / frameEl.clientWidth);
			if (i !== active) pick(i);
		}, 120);
	}

	function park() {
		const li = flowEl?.children[at] as HTMLElement | undefined;
		if (!li) return;
		const node = getComputedStyle(li, '::before');
		truck.x = li.offsetLeft + parseFloat(node.left) + parseFloat(node.width) / 2;
		truck.y = li.offsetTop + parseFloat(node.top) + parseFloat(node.height) / 2;
	}

	$effect(park);

	// Phones advance when the dot's progress fill ends, so the dot and the strip stay in step
	$effect(() => {
		void active; // every new shot gets its full time
		if (!playing || offscreen || hidden || phone || truck.driving) return;
		const t = setTimeout(advance, wide ? 3000 : dwell);
		return () => clearTimeout(t);
	});

	$effect(() => {
		const motion = matchMedia('(prefers-reduced-motion: reduce)');
		function updateMotion() {
			reduced = motion.matches;
			if (reduced) {
				playing = false;
				truck.driving = false;
			}
		}
		updateMotion();
		motion.addEventListener('change', updateMotion);
		hidden = document.hidden;
		const truckFits = matchMedia('(min-width: 1100px)');
		const small = matchMedia('(max-width: 820px)');
		function updateLayout() {
			wide = truckFits.matches;
			phone = small.matches;
			if (!wide) truck.driving = false; // a hidden truck never arrives
		}
		updateLayout();
		truckFits.onchange = small.onchange = updateLayout;
		const ro = new ResizeObserver(park);
		ro.observe(flowEl);
		const io = new IntersectionObserver(([e]) => {
			offscreen = !e.isIntersecting;
			seen ||= e.isIntersecting;
		}, { threshold: 0.3 });
		io.observe(showEl);
		return () => {
			ro.disconnect();
			io.disconnect();
			truckFits.onchange = small.onchange = null;
			motion.removeEventListener('change', updateMotion);
		};
	});

	// Hemma rolls through its views on its own until a view is picked
	const home = $derived(h.side.hemma.views);
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

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Magnus Lixenstrand',
		url: 'https://magnuslixenstrand.com',
		image: 'https://magnuslixenstrand.com/images/IMG_0830_optimized.jpg',
		jobTitle: h.jobTitle,
		worksFor: { '@type': 'Organization', name: 'Nordic Metal Trade AB' },
		description: h.description,
		email: 'mlixenstrand@gmail.com',
		address: { '@type': 'PostalAddress', addressLocality: 'Jönköping', addressCountry: 'SE' },
		sameAs: ['https://www.linkedin.com/in/magnus-lixenstrand/'],
		knowsAbout: h.knowsAbout
	});
</script>

<svelte:document onvisibilitychange={() => (hidden = document.hidden)} />

<svelte:head>
	<title>{h.title}</title>
	<meta name="description" content={h.description}>
	<meta name="author" content="Magnus Lixenstrand">
	<link rel="canonical" href="https://magnuslixenstrand.com/">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://magnuslixenstrand.com/">
	<meta property="og:title" content={h.title}>
	<meta property="og:description" content={h.description}>
	<meta property="og:image" content={t.preview.image}>
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content={t.preview.alt}>
	<meta property="og:locale" content={t.locale}>
	<meta property="og:site_name" content="Magnus Lixenstrand">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content={h.title}>
	<meta name="twitter:description" content={h.description}>
	<meta name="twitter:image" content={t.preview.image}>
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="hero" aria-labelledby="hero-rubrik">
	<div class="hero-copy">
		<h1 id="hero-rubrik">{h.hero.title}</h1>
		<p class="lede">{h.hero.lede}</p>
		<p class="hero-proof">{h.hero.proof.before}<strong>{h.hero.proof.strong}</strong>{h.hero.proof.after}</p>
		<div class="cta-group">
			<a href="#affarssystemet" class="cta-primary">{t.seeErp}</a>
			<a href={t.cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.cv.openLabel} class="cta-secondary">{t.cv.open}</a>
			<a href={t.cvOther.href} target="_blank" rel="noopener noreferrer" aria-label={t.cvOther.label} class="cta-secondary" lang={t.cvOther.lang}>{t.cvOther.short}</a>
		</div>
	</div>

	<figure class="hero-portrait">
		<picture>
			<source type="image/webp" srcset="/images/IMG_0830-480.webp 480w, /images/IMG_0830-800.webp 800w, /images/IMG_0830.webp 1200w" sizes="(min-width: 821px) 22rem, 70vw">
			<img src="/images/IMG_0830_optimized.jpg" alt={t.portraitAlt} width="1200" height="1200">
		</picture>
	</figure>
</section>

<section id="projects" class="work">
	<article id="affarssystemet" class="erp" aria-labelledby="erp-rubrik">
		<header class="erp-head">
			<h2 id="erp-rubrik">{h.erp.title}</h2>
			<p>{h.erp.intro}</p>
		</header>

		<div class="erp-show" role="group" aria-label={h.erp.showLabel} bind:this={showEl}>
			<div class="flow-road">
				<ol class="flow" aria-label={h.erp.flowLabel} bind:this={flowEl}>
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
				<div class="truck" class:back={truck.back} class:driving={truck.driving} class:fast={truck.fast} class:gone={truck.gone} class:jump={truck.jump} class:paused={offscreen || hidden} style="--x: {truck.x}px; --y: {truck.y}px" aria-hidden="true" ontransitionend={arrived}>
					<span class="truck-render"></span>
				</div>
			</div>

			<figure class="shot" id="erp-skarmbild">
				<a href="/images/{shown.shot}.webp" target="_blank" rel="noopener" aria-label={h.erp.shotLink(shown.step.replace('\u00AD', ''))}>
					<div class="shot-frame" class:back class:slow bind:this={frameEl} onscroll={swiped}>
						{#each flow as item, i}
							{#if item.shot}
								<img class:is-active={i === active} class:is-prev={i === prev && i !== active} src="/images/{item.shot}-1200.webp" srcset="/images/{item.shot}-1200.webp 1200w, /images/{item.shot}.webp 2400w" sizes="(min-width: 1212px) 1180px, (min-width: 821px) 60vw, calc(100vw - 2rem)" alt={i === active ? item.alt : ''} width="2400" height="1500" loading={seen ? 'eager' : 'lazy'}>
							{/if}
						{/each}
					</div>
				</a>
				<div class="carousel" class:playing class:paused={offscreen || hidden} style="--dwell: {dwell}ms">
					<button type="button" class="carousel-play" aria-label={playing ? h.erp.pause : h.erp.play} onclick={() => (playing = !playing)}>
						<svg viewBox="0 0 16 16" aria-hidden="true">
							{#if playing}<path d="M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z" />{:else}<path d="M4.5 2.25v11.5L13.5 8z" />{/if}
						</svg>
					</button>
					{#each flow as item, i}
						{#if item.shot}
							<button type="button" class="carousel-dot" aria-current={i === active} aria-controls="erp-skarmbild" aria-label={h.erp.dot(i + 1, shots, item.step.replace('\u00AD', ''))} onclick={() => pick(i)}>
								<span onanimationend={advance}></span>
							</button>
						{/if}
					{/each}
				</div>
				<figcaption aria-live={playing ? 'off' : 'polite'}><strong>{shown.step}.</strong> {shown.caption}</figcaption>
			</figure>
			<p class="shot-note">
				{h.erp.note}
				<button type="button" class="shot-toggle" onclick={toggle}>{playing ? h.erp.pause : h.erp.play}</button>
			</p>
		</div>

		<dl class="story">
			{#each h.erp.story as part}
				<div id={part.id}>
					<dt>{part.label}</dt>
					<dd>{part.text}</dd>
				</div>
			{/each}
		</dl>
	</article>

	<section class="side" aria-labelledby="egna-rubrik">
		<h2 id="egna-rubrik">{h.side.title}</h2>
		<div class="side-grid">
			<div class="side-list">
				{#each h.side.projects as project}
					<article>
						<h3>{project.name}</h3>
						<p>{project.text}</p>
					</article>
				{/each}
			</div>
			<figure class="shot" bind:this={homeEl}>
				<a href="/images/{home[homeNow].shot}.webp" target="_blank" rel="noopener" aria-label={h.side.hemma.link(home[homeNow].name)}>
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
					{h.side.hemma.caption}
				</figcaption>
			</figure>
		</div>
	</section>
</section>
