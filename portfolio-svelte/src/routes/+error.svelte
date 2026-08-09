<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Sidan hittades inte - Magnus Lixenstrand</title>
</svelte:head>

<div class="error-container">
	<h1>{page.status}</h1>
	<p class="message">{page.error?.message || 'Sidan kunde inte hittas'}</p>
	<p class="description">Det verkar som att du har hamnat på en sida som inte finns.</p>
	<a href="/" class="back-button">Tillbaka till startsidan</a>
</div>

<style>
	.error-container {
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(6rem, 20vw, 12rem);
		font-family: var(--display);
		color: var(--steel-dark);
		margin: 0;
		line-height: 1;
	}

	.message {
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		color: var(--ink);
		margin: 1rem 0;
	}

	.description {
		font-size: 1rem;
		color: var(--ink-soft);
		margin-bottom: 2rem;
	}

	.back-button {
		display: inline-flex;
		padding: 1rem 2rem;
		background: var(--steel-dark);
		color: var(--surface);
		font-weight: 700;
		text-decoration: none;
		transition: background-color 180ms ease-out, transform 180ms ease-out;
	}

	.back-button:hover {
		background: var(--accent);
		color: var(--ink);
		transform: translateY(-2px);
	}
</style>
