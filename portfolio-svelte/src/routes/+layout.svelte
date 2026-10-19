<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { langOf, texts } from '$lib/content';
	import Navigation from '$lib/components/Navigation.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children?: Snippet } = $props();
	const t = $derived(texts());

	// The server states the first page's language; keep it right when moving between pages
	$effect(() => {
		document.documentElement.lang = langOf(page.url.pathname);
	});
</script>

<a href="#main-content" class="skip-to-content">{t.skipLink}</a>
<Navigation />
<main id="main-content">
	{@render children?.()}
	<Contact />
</main>
<Footer />
