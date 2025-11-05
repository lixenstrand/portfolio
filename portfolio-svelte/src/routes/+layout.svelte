<script lang="ts">
	import { onMount } from 'svelte';
	import 'aos/dist/aos.css';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
	let hamburgerOpen = $state(false);

	function toggleMenu() {
		hamburgerOpen = !hamburgerOpen;
		const navMenu = document.querySelector('.nav-menu');
		const hamburger = document.querySelector('.hamburger');
		if (navMenu && hamburger) {
			navMenu.classList.toggle('active');
			hamburger.classList.toggle('active');
			hamburger.setAttribute('aria-expanded', hamburgerOpen ? 'true' : 'false');
		}
	}

	onMount(() => {
		// Sätt current year i footer
		const yearSpan = document.getElementById('current-year');
		if (yearSpan) {
			yearSpan.textContent = new Date().getFullYear().toString();
		}
	});
</script>

<!-- Skip to main content link för tangentbordsnavigation (WCAG 2.1) -->
<a href="#main-content" class="skip-to-content">Hoppa till huvudinnehåll</a>

<header id="header">
	<nav>
		<div class="nav-bar">
			<div class="nav-menu">
				<ul>
					<li class="logoName">
						<a href="/">
							<img src="/icon/house-solid.svg" alt="Home" class="colorful">
						</a>
					</li>
					<li><a href="/#projects">Projekt</a></li>
					<li><a href="/about">Om</a></li>
					<li><a href="/#contact">Kontakt</a></li>
					<li>
						<a href="https://www.linkedin.com/in/magnus-lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
							<img src="/icon/linkedin.svg" class="fa-" alt="LinkedIn">
						</a>
					</li>
					<li>
						<a href="https://github.com/lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="Github">
							<img src="/icon/square-github.svg" class="fa-" alt="Github">
						</a>
					</li>
					<li><a href="/cv/magnus_lixenstrand_cv.pdf" target="_blank" class="button button-pulse">CV</a></li>
				</ul>
			</div>
		</div>

		<a href="/">
			<img src="/icon/house-solid.svg" alt="Home" class="home-mobile">
		</a>

		<button class="hamburger" aria-label="Navigeringsmeny" aria-expanded="false" onclick={toggleMenu}>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
		</button>
	</nav>
</header>

<main id="main-content">
	{@render children?.()}
</main>

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
			<h3>Om Portfolion</h3>
			<p class="footer-description">
				Automation Engineer som kombinerar 12+ års affärserfarenhet med teknisk problemlösning.
			</p>
		</div>
	</div>

	<div class="footer-bottom">
		<p>
			<small>&copy; <span id="current-year"></span> Magnus Lixenstrand. All rights reserved.</small>
		</p>
	</div>
</footer>
