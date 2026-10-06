<script lang="ts">
	import { page } from '$app/state';

	let notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Sidan finns inte' : 'Något gick fel'} – Magnus Lixenstrand</title>
	<meta name="robots" content="noindex">
</svelte:head>

<section class="error-page" aria-labelledby="fel-rubrik">
	<p class="error-code">{page.status}</p>
	<h1 id="fel-rubrik">{notFound ? 'Sidan finns inte' : 'Något gick fel'}</h1>
	<p>{notFound ? 'Länken kan vara gammal eller felstavad.' : 'Försök igen om en stund.'}</p>
	<div class="cta-group">
		<a href="/" class="cta-primary">Till startsidan</a>
		<a href="/#affarssystemet" class="cta-secondary">Se affärssystemet</a>
		<a href="/cv/magnus_lixenstrand_cv_2026.pdf?v=3" target="_blank" rel="noopener noreferrer" aria-label="Öppna CV (PDF) i ny flik" class="cta-secondary">Öppna CV (PDF)</a>
	</div>
</section>
