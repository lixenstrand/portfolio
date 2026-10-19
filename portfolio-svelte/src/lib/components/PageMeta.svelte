<script lang="ts">
	import { texts, versions } from '$lib/content';

	// What search engines and shared links read about a page, in the page's language
	let { title, description, type }: { title: string; description: string; type: 'website' | 'profile' } = $props();
	const t = $derived(texts());
	const urls = $derived(versions());
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>
	<link rel="canonical" href={urls.own}>
	<link rel="alternate" hreflang="sv" href={urls.sv}>
	<link rel="alternate" hreflang="en" href={urls.en}>
	<link rel="alternate" hreflang="x-default" href={urls.sv}>
	<meta property="og:type" content={type}>
	<meta property="og:url" content={urls.own}>
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:image" content={t.preview.image}>
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content={t.preview.alt}>
	<meta property="og:locale" content={t.locale}>
	<meta property="og:site_name" content="Magnus Lixenstrand">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content={title}>
	<meta name="twitter:description" content={description}>
	<meta name="twitter:image" content={t.preview.image}>
</svelte:head>
