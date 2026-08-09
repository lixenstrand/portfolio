<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<a href="#main-content" class="skip-to-content">Hoppa till huvudinnehåll</a>
<Navigation />
<main id="main-content">{@render children?.()}</main>
<Footer />
