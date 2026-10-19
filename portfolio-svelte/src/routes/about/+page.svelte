<script lang="ts">
	import { page } from '$app/state';
	import { content, langOf } from '$lib/content';

	const t = $derived(content(langOf(page.url.pathname)));
	const a = $derived(t.about);
</script>

<svelte:head>
	<title>{a.title}</title>
	<meta name="description" content={a.description}>
	<link rel="canonical" href="https://magnuslixenstrand.com/about">
	<meta property="og:type" content="profile">
	<meta property="og:url" content="https://magnuslixenstrand.com/about">
	<meta property="og:title" content={a.title}>
	<meta property="og:description" content={a.description}>
	<meta property="og:image" content={t.preview.image}>
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content={t.preview.alt}>
	<meta property="og:locale" content={t.locale}>
	<meta property="og:site_name" content="Magnus Lixenstrand">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content={a.title}>
	<meta name="twitter:description" content={a.description}>
	<meta name="twitter:image" content={t.preview.image}>
</svelte:head>

<section class="hero hero-about" aria-labelledby="om-rubrik">
	<div class="hero-copy">
		<h1 id="om-rubrik">{a.hero.title}</h1>
		<p class="lede">{a.hero.lede}</p>
		<div class="cta-group">
			<a href="/#affarssystemet" class="cta-primary">{t.seeErp}</a>
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

<div class="about">
	<section>
		<h2>{a.why.title}</h2>
		<div class="about-text">
			{#each a.why.text as p}<p>{p}</p>{/each}
		</div>
	</section>

	<section>
		<h2>{a.erp.title}</h2>
		<div class="about-text">
			{#each a.erp.text as p}<p>{p}</p>{/each}
			<p class="about-result">{a.erp.result.before}<strong>{a.erp.result.strong}</strong>{a.erp.result.after}</p>
		</div>
	</section>

	<section aria-labelledby="vag-rubrik">
		<h2 id="vag-rubrik">{a.path.title}</h2>
		<div class="about-text">
			<p class="track-key"><span class="key-dev">{a.path.dev}</span><span class="key-sales">{a.path.sales}</span></p>
			<ol class="career">
				{#each a.path.career as role}
					<li class="role {role.track}">
						<p class="role-period">{role.period}</p>
						<div class="role-body">
							<h3>{role.org}</h3>
							{#each role.titles as title}<p class="role-title">{title}</p>{/each}
							{#if role.text}<p>{role.text}</p>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section>
		<h2>{a.skills.title}</h2>
		<div class="about-text">
			<dl class="skills">
				{#each a.skills.items as s}
					<div>
						<dt>{s.area}</dt>
						<dd>{s.items}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<section>
		<h2>{a.spare.title}</h2>
		<div class="about-text">
			{#each a.spare.text as p}<p>{p}</p>{/each}
		</div>
	</section>
</div>
