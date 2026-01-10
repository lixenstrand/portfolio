<script lang="ts">
	import { onMount } from 'svelte';
	import 'aos/dist/aos.css';
	import type { Snippet } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children?: Snippet } = $props();

	onMount(async () => {
		// Initiera AOS (Animate On Scroll)
		const AOS = (await import('aos')).default;
		AOS.init({
			duration: 800,
			offset: 100,
			once: true,
			easing: 'ease-in-out'
		});
	});
</script>

<!-- Skip to main content link för tangentbordsnavigation (WCAG 2.1) -->
<a href="#main-content" class="skip-to-content">Hoppa till huvudinnehåll</a>

<Navigation />

<main id="main-content">
	{@render children?.()}
</main>

<Footer />

<style>
	.skip-to-content {
		position: fixed;
		top: -100px;
		left: 0;
		background: var(--aqua);
		color: var(--black);
		padding: 0.75rem 1rem;
		text-decoration: none;
		font-weight: bold;
		z-index: var(--z-skip-link);
		border-radius: 0 0 5px 0;
		transition: top 0.3s ease;
	}

	.skip-to-content:focus {
		top: 0;
		outline: 2px solid var(--white);
		outline-offset: 2px;
	}

	:global(body) {
		padding-top: 90px;
	}
</style>
