<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { content, langOf } from '$lib/content';
	import Navigation from '$lib/components/Navigation.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children?: Snippet } = $props();
	const t = $derived(content(langOf(page.url.pathname)));
</script>

<a href="#main-content" class="skip-to-content">{t.skipLink}</a>
<Navigation />
<main id="main-content">
	{@render children?.()}
	<Contact />
</main>
<Footer />
