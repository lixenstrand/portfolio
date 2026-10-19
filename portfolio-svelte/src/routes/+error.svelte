<script lang="ts">
	import { page } from '$app/state';
	import { texts } from '$lib/content';

	const t = $derived(texts());
	const message = $derived(page.status === 404 ? t.error.notFound : t.error.failed);
</script>

<svelte:head>
	<title>{message.title} – Magnus Lixenstrand</title>
	<meta name="robots" content="noindex">
</svelte:head>

<section class="error-page" aria-labelledby="fel-rubrik">
	<p class="error-code">{page.status}</p>
	<h1 id="fel-rubrik">{message.title}</h1>
	<p>{message.text}</p>
	<div class="cta-group">
		<a href="/" class="cta-primary">{t.error.home}</a>
		<a href="/#affarssystemet" class="cta-secondary">{t.seeErp}</a>
		<a href={t.cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.cv.openLabel} class="cta-secondary">{t.cv.open}</a>
	</div>
</section>
