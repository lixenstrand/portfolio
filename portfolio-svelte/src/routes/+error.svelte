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
		color: var(--aqua);
		margin: 0;
		line-height: 1;
		text-shadow: 0 0 40px rgba(0, 217, 255, 0.5);
	}

	.message {
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		color: var(--white);
		margin: 1rem 0;
	}

	.description {
		font-size: 1rem;
		color: var(--magenta);
		margin-bottom: 2rem;
	}

	.back-button {
		display: inline-block;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--aqua), var(--magenta));
		color: var(--black);
		font-weight: 700;
		text-decoration: none;
		border-radius: 50px;
		transition: all 0.3s ease;
	}

	.back-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 217, 255, 0.5);
	}

	.back-button:focus {
		outline: 3px solid var(--white);
		outline-offset: 3px;
	}
</style>
