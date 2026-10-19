<script lang="ts">
	import { texts } from '$lib/content';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import turnFrames from '$lib/truck-turn.json';

	const t = $derived(texts());

	const flow = $derived(t.home.erp.flow);
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
	// It never reverses along the road: to head the other way it makes a three-point turn.
	let at = $state(1);
	let truck = $state({ x: 0, y: 0, left: false, driving: false, fast: true, gone: false, jump: false });
	let truckEl: HTMLDivElement;
	let trip = 0; // the latest trip; an older one stops where it is
	let arrive: (() => void) | undefined;

	function show(i: number) {
		if (i === active) return;
		back = i < active;
		slow = truck.driving && !truck.fast;
		prev = active;
		active = i;
	}

	function drive(i: number, fast: boolean) {
		if (i === at) return;
		// Without motion the truck just faces the step it jumps to
		if (!wide || reduced) truck.left = i < at;
		truck.fast = fast;
		truck.driving = wide && !reduced;
		at = i;
		show(i);
		void go(++trip);
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

	function advance() {
		if (at < shots - 1) return drive(at + 1, false);
		if (!wide) return drive(0, false);
		// End of the road: fade out and start over from the first step, facing right again
		truck.gone = true;
		const id = ++trip;
		setTimeout(async () => {
			if (id !== trip) return;
			at = 0;
			show(0);
			truck.left = false;
			await place(stop(0));
			truck.gone = false;
		}, 450);
	}

	// Drive to the step the truck is headed for, turning first if it lies behind the truck
	async function go(id: number) {
		await turning;
		const to = stop(at);
		if (id !== trip || !to) return;
		if (!wide || reduced) {
			await place(to);
			truck.driving = false;
			return;
		}
		await place(where()); // stop where it is if it was on its way somewhere else
		const ahead = truck.left ? -1 : 1;
		if (id === trip && (to.x - truck.x) * ahead < 0) {
			// The turn ends one turn length back; without that much room, pull forward first
			const start = to.x + ahead * turnLength();
			if ((start - truck.x) * ahead > 0) await move({ x: start, y: to.y });
			if (id !== trip) return;
			await (turning = turn());
			turning = undefined;
		}
		if (id !== trip) return;
		await move(to);
		if (id === trip) truck.driving = false;
	}

	// Where the truck stops for a step: its node on the road
	function stop(i: number) {
		const li = flowEl?.children[i] as HTMLElement | undefined;
		if (!li) return;
		const node = getComputedStyle(li, '::before');
		return {
			x: li.offsetLeft + parseFloat(node.left) + parseFloat(node.width) / 2,
			y: li.offsetTop + parseFloat(node.top) + parseFloat(node.height) / 2
		};
	}

	// Where the truck is right now, even halfway to somewhere
	function where() {
		const [x = 0, y = 0] = getComputedStyle(truckEl).translate.split(' ').map((v) => parseFloat(v) || 0);
		return { x, y };
	}

	// Drive somewhere; done on arrival
	function move(to: { x: number; y: number }) {
		arrive?.();
		if (Math.hypot(to.x - truck.x, to.y - truck.y) < 0.5) return Promise.resolve();
		truck.x = to.x;
		truck.y = to.y;
		return new Promise<void>((done) => (arrive = done));
	}

	function arrived(e: TransitionEvent) {
		if (e.propertyName !== 'translate') return;
		arrive?.();
		arrive = undefined;
	}

	// Put the truck somewhere without driving there
	async function place(to: { x: number; y: number } | undefined) {
		arrive?.();
		arrive = undefined;
		if (!to || Math.hypot(to.x - truck.x, to.y - truck.y) < 0.5) return;
		truck.jump = true;
		truck.x = to.x;
		truck.y = to.y;
		await waitFrames(2);
		truck.jump = false;
	}

	const waitFrames = (n: number) =>
		new Promise<void>((done) => {
			const tick = () => (--n ? requestAnimationFrame(tick) : done());
			requestAnimationFrame(tick);
		});

	// The three-point turn, rendered in Blender: a side road opens behind the truck,
	// it backs in and drives out the other way. Turning back to the right plays it backwards.
	let turning: Promise<void> | undefined;
	let turnAt = $state({ x: 0, y: 0 }); // where the truck faces right at the turn's first frame
	let turnFrame = $state(-1);
	let sideRoad = $state<'' | 'open' | 'fade'>('');
	let roadGrown = $state(0); // how far the side road has grown out from the road, 0 to 1
	let loaded: Promise<unknown> | undefined;
	// The same addresses as in portfolio.css, so the stylesheet finds them loaded
	const turnImages = ['/images/truck/scania-turn.webp?v=2', '/images/truck/side-road.webp?v=2', '/images/truck/scania-drive-left.webp?v=1'];

	function preload() {
		return (loaded ??= Promise.all(
			turnImages.map((src) => {
				const image = new Image();
				image.src = src;
				return image.decode().catch(() => {});
			})
		));
	}

	// How far along the road a turn moves the truck's stop, in pixels
	function turnLength() {
		return (turnFrames.shift - 0.5) * truckEl.offsetWidth;
	}

	async function turn() {
		const toLeft = !truck.left;
		const right = toLeft ? truck.x : truck.x + turnLength();
		turnAt = { x: right, y: truck.y };
		sideRoad = 'open';
		await Promise.all([preload(), tween(450, (t) => (roadGrown = 1 - (1 - t) ** 3))]);
		const { frames: count, fps } = turnFrames;
		await tween((count / fps) * 1000, (t) => {
			const k = Math.min(count - 1, Math.floor(t * count));
			turnFrame = toLeft ? k : count - 1 - k;
		});
		truck.left = toLeft;
		await place({ x: toLeft ? right - turnLength() : right, y: truck.y });
		turnFrame = -1;
		sideRoad = 'fade';
		setTimeout(() => {
			if (sideRoad !== 'fade') return;
			sideRoad = '';
			roadGrown = 0;
		}, 700);
	}

	// Call step with the time passed, 0 to 1, once a frame for ms milliseconds
	function tween(ms: number, step: (t: number) => void) {
		return new Promise<void>((done) => {
			const start = performance.now();
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / ms);
				step(t);
				if (t < 1) requestAnimationFrame(tick);
				else done();
			};
			requestAnimationFrame(tick);
		});
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

	// Without a trip under way, the truck stays on its step when the layout changes
	function park() {
		if (!truck.driving) void place(stop(at));
	}

	// A hidden or motionless truck never arrives: stop the trip and put it on its step
	function halt() {
		trip++;
		truck.driving = false;
		void place(stop(at));
	}

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
				halt();
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
			if (!wide) halt();
		}
		updateLayout();
		truckFits.onchange = small.onchange = updateLayout;
		park();
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
	const home = $derived(t.home.side.hemma.views);
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
		jobTitle: t.jobTitle,
		worksFor: { '@type': 'Organization', name: 'Nordic Metal Trade AB' },
		description: t.home.description,
		email: 'mlixenstrand@gmail.com',
		address: { '@type': 'PostalAddress', addressLocality: 'Jönköping', addressCountry: 'SE' },
		sameAs: ['https://www.linkedin.com/in/magnus-lixenstrand/'],
		knowsAbout: t.home.knowsAbout
	});
</script>

<svelte:document onvisibilitychange={() => (hidden = document.hidden)} />

<PageMeta title={t.home.title} description={t.home.description} type="website" />

<svelte:head>
	<meta name="author" content="Magnus Lixenstrand">
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="hero" aria-labelledby="hero-rubrik">
	<div class="hero-copy">
		<hgroup>
			<h1 id="hero-rubrik">Magnus Lixenstrand</h1>
			<p class="hero-title">{t.jobTitle}</p>
			<p class="hero-subtitle">{t.subtitle}</p>
		</hgroup>
		<p class="lede">{t.home.hero.lede}</p>
		<p class="hero-proof">{t.home.hero.proof.before}<strong>{t.home.hero.proof.strong}</strong>{t.home.hero.proof.after}</p>
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
			<h2 id="erp-rubrik">{t.home.erp.title}</h2>
			<p>{t.home.erp.intro}</p>
		</header>

		<div class="erp-show" role="group" aria-label={t.home.erp.showLabel} bind:this={showEl}>
			<div class="flow-road">
				<!-- Only a visitor about to pick a step can make the truck turn: load the turn then -->
				<ol class="flow" aria-label={t.home.erp.flowLabel} bind:this={flowEl} onpointerenter={() => wide && preload()} onfocusin={() => wide && preload()}>
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
				<div
					class="turn"
					class:turning={turnFrame >= 0}
					style="--x: {turnAt.x}px; --y: {turnAt.y}px; --left: {turnFrames.left}; --top: {turnFrames.top}; --width: {turnFrames.width}; --height: {turnFrames.height}; --road-bottom: {turnFrames.roadBottom}"
					aria-hidden="true"
				>
					<span class="side-road {sideRoad}" style="--grown: {roadGrown}"></span>
					<span
						class="turn-render"
						style="background-size: {turnFrames.columns * 100}% {turnFrames.rows * 100}%; background-position: {((Math.max(turnFrame, 0) % turnFrames.columns) * 100) / (turnFrames.columns - 1)}% {(Math.floor(Math.max(turnFrame, 0) / turnFrames.columns) * 100) / (turnFrames.rows - 1)}%"
					></span>
				</div>
				<div class="truck" class:left={truck.left} class:turning={turnFrame >= 0} class:driving={truck.driving} class:fast={truck.fast} class:gone={truck.gone} class:jump={truck.jump} class:paused={offscreen || hidden} style="--x: {truck.x}px; --y: {truck.y}px" aria-hidden="true" bind:this={truckEl} ontransitionend={arrived} ontransitioncancel={arrived}>
					<span class="truck-render"></span>
				</div>
			</div>

			<figure class="shot" id="erp-skarmbild">
				<a href="/images/{shown.shot}.webp" target="_blank" rel="noopener" aria-label={t.home.erp.shotLink(shown.step.replace('\u00AD', ''))}>
					<div class="shot-frame" class:back class:slow bind:this={frameEl} onscroll={swiped}>
						{#each flow as item, i}
							{#if item.shot}
								<img class:is-active={i === active} class:is-prev={i === prev && i !== active} src="/images/{item.shot}-1200.webp" srcset="/images/{item.shot}-1200.webp 1200w, /images/{item.shot}.webp 2400w" sizes="(min-width: 1212px) 1180px, (min-width: 821px) 60vw, calc(100vw - 2rem)" alt={i === active ? item.alt : ''} width="2400" height="1500" loading={seen ? 'eager' : 'lazy'}>
							{/if}
						{/each}
					</div>
				</a>
				<div class="carousel" class:playing class:paused={offscreen || hidden} style="--dwell: {dwell}ms">
					<button type="button" class="carousel-play" aria-label={playing ? t.home.erp.pause : t.home.erp.play} onclick={() => (playing = !playing)}>
						<svg viewBox="0 0 16 16" aria-hidden="true">
							{#if playing}<path d="M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z" />{:else}<path d="M4.5 2.25v11.5L13.5 8z" />{/if}
						</svg>
					</button>
					{#each flow as item, i}
						{#if item.shot}
							<button type="button" class="carousel-dot" aria-current={i === active} aria-controls="erp-skarmbild" aria-label={t.home.erp.dot(i + 1, shots, item.step.replace('\u00AD', ''))} onclick={() => pick(i)}>
								<span onanimationend={advance}></span>
							</button>
						{/if}
					{/each}
				</div>
				<figcaption aria-live={playing ? 'off' : 'polite'}><strong>{shown.step}.</strong> {shown.caption}</figcaption>
			</figure>
			<p class="shot-note">
				{t.home.erp.note}
				<button type="button" class="shot-toggle" onclick={toggle}>{playing ? t.home.erp.pause : t.home.erp.play}</button>
			</p>
		</div>

		<dl class="story">
			{#each t.home.erp.story as part}
				<div id={part.id}>
					<dt>{part.label}</dt>
					<dd>{part.text}</dd>
				</div>
			{/each}
		</dl>
	</article>

	<section class="side" aria-labelledby="egna-rubrik">
		<h2 id="egna-rubrik">{t.home.side.title}</h2>
		<div class="side-grid">
			<div class="side-list">
				{#each t.home.side.projects as project}
					<article>
						<h3>{project.name}</h3>
						<p>{project.text}</p>
					</article>
				{/each}
			</div>
			<figure class="shot" bind:this={homeEl}>
				<a href="/images/{home[homeNow].shot}.webp" target="_blank" rel="noopener" aria-label={t.home.side.hemma.link(home[homeNow].name)}>
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
					{t.home.side.hemma.caption}
				</figcaption>
			</figure>
		</div>
	</section>
</section>
