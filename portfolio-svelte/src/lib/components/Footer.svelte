<script lang="ts">
	import { onMount } from 'svelte';

	let currentYear = $state('');

	onMount(() => {
		currentYear = new Date().getFullYear().toString();
	});
</script>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>Navigation</h3>
			<nav class="footer-nav" aria-label="Footer navigation">
				<a href="/">Hem</a>
				<a href="/#projects">Projekt</a>
				<a href="/about">Om</a>
				<a href="/#contact">Kontakt</a>
			</nav>
		</div>

		<div class="footer-section">
			<h3>Kontakt</h3>
			<p class="footer-email-section">
				<a href="mailto:mlixenstrand@gmail.com" class="footer-email-link">mlixenstrand@gmail.com</a>
			</p>
			<div class="footer-social">
				<a href="https://www.linkedin.com/in/magnus-lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<img src="/icon/linkedin.svg" alt="LinkedIn">
				</a>
				<a href="https://github.com/lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="Github">
					<img src="/icon/square-github.svg" alt="Github">
				</a>
			</div>
		</div>

		<div class="footer-section">
			<h3>Om mig</h3>
			<p class="footer-description">
				Från försäljning till kod – jag automatiserar det som andra gör manuellt.
			</p>
		</div>
	</div>

	<div class="footer-bottom">
		<p>
			<small>&copy; {currentYear} Magnus Lixenstrand</small>
		</p>
	</div>
</footer>

<style>
	footer {
		background: linear-gradient(180deg, var(--black) 0%, var(--dkblue) 100%);
		padding: 4rem 1.5rem 2rem 1.5rem;
		font-family: var(--mono);
		color: var(--white);
		border-top: 1px solid rgba(0, 217, 255, 0.2);
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-bottom: 3rem;
	}

	@media (min-width: 600px) {
		.footer-content {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem;
		}
	}

	@media (min-width: 850px) {
		.footer-content {
			grid-template-columns: repeat(3, 1fr);
			gap: 3rem;
		}
	}

	.footer-section {
		text-align: left;
		padding: 0 0.5rem;
	}

	.footer-section h3 {
		color: var(--aqua);
		font-family: var(--sans);
		font-size: 1.2rem;
		margin-bottom: 1.25rem;
		font-weight: 600;
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.footer-nav a {
		color: var(--white);
		text-decoration: none;
		transition: color 0.3s ease;
		font-size: 0.95rem;
		display: block;
		width: fit-content;
	}

	.footer-nav a:hover {
		color: var(--aqua);
	}

	.footer-email-section {
		margin-bottom: 1.5rem;
	}

	.footer-email-link {
		color: var(--aqua);
		text-decoration: none;
		font-size: 1rem;
		transition: color 0.3s ease;
		word-break: break-word;
	}

	.footer-email-link:hover {
		color: var(--white);
	}

	.footer-social {
		display: flex;
		gap: 1.25rem;
		margin-top: 0.5rem;
		align-items: center;
	}

	.footer-social a {
		transition: transform 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		padding: 0.5rem;
	}

	.footer-social a:hover {
		transform: translateY(-3px);
	}

	.footer-social a:focus {
		outline: 2px solid var(--aqua);
		outline-offset: 4px;
	}

	.footer-social img {
		height: 2rem;
		width: auto;
		filter: invert(86%) sepia(25%) saturate(179%) hue-rotate(345deg) brightness(95%) contrast(81%);
		transition: filter 0.3s ease;
	}

	.footer-social img:hover {
		filter: invert(67%) sepia(92%) saturate(2878%) hue-rotate(158deg) brightness(102%) contrast(101%);
	}

	.footer-description {
		color: var(--magenta);
		font-size: 0.95rem;
		line-height: 1.7;
		margin: 0;
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(0, 217, 255, 0.1);
		color: var(--magenta);
		font-size: 0.85rem;
	}

	@media screen and (max-width: 600px) {
		footer {
			padding: 3rem 1rem 1.5rem 1rem;
		}

		.footer-content {
			gap: 2rem;
			margin-bottom: 2rem;
			text-align: center;
		}

		.footer-section {
			padding: 0;
			text-align: center;
		}

		.footer-section h3 {
			font-size: 1.3rem;
			margin-bottom: 1rem;
		}

		.footer-nav {
			align-items: center;
			gap: 1rem;
		}

		.footer-nav a {
			font-size: 1rem;
			padding: 0.5rem 0;
			min-height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.footer-email-link {
			font-size: 1.05rem;
			display: inline-block;
			padding: 0.5rem 0;
		}

		.footer-social {
			justify-content: center;
			gap: 1.5rem;
			margin-top: 1rem;
		}

		.footer-social a {
			min-width: 48px;
			min-height: 48px;
			padding: 0.6rem;
		}

		.footer-social img {
			height: 2.2rem;
			width: auto;
		}
	}
</style>
