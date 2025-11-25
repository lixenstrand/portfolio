<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import 'aos/dist/aos.css';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
	let hamburgerOpen = $state(false);

	// Öppna/stäng menyn
	function toggleMenu() {
		hamburgerOpen = !hamburgerOpen;
		// Lås body scroll när menyn är öppen
		if (typeof document !== 'undefined') {
			document.body.style.overflow = hamburgerOpen ? 'hidden' : '';
		}
	}

	// Stäng menyn
	function closeMenu() {
		hamburgerOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	// Hantera Escape-tangent
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && hamburgerOpen) {
			closeMenu();
		}
	}

	onMount(async () => {
		// Initiera AOS (Animate On Scroll)
		const AOS = (await import('aos')).default;
		AOS.init({
			duration: 800,
			offset: 100,
			once: true,
			easing: 'ease-in-out'
		});

		// Sätt current year i footer
		const yearSpan = document.getElementById('current-year');
		if (yearSpan) {
			yearSpan.textContent = new Date().getFullYear().toString();
		}

		// Lyssna på Escape-tangent
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<!-- Skip to main content link för tangentbordsnavigation (WCAG 2.1) -->
<a href="#main-content" class="skip-to-content">Hoppa till huvudinnehåll</a>

<header id="header">
	<nav>
		<div class="nav-bar">
			<div class="nav-menu" class:active={hamburgerOpen}>
				<ul>
					<li class="logoName">
						<a href="/" onclick={closeMenu}>
							<img src="/icon/house-solid.svg" alt="Home" class="colorful">
						</a>
					</li>
					<li><a href="/#projects" onclick={closeMenu}>Projekt</a></li>
					<li><a href="/about" onclick={closeMenu}>Om</a></li>
					<li><a href="/#contact" onclick={closeMenu}>Kontakt</a></li>
					<li>
						<a href="https://www.linkedin.com/in/magnus-lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onclick={closeMenu}>
							<img src="/icon/linkedin.svg" class="fa-" alt="LinkedIn">
						</a>
					</li>
					<li>
						<a href="https://github.com/lixenstrand" target="_blank" rel="noopener noreferrer" aria-label="Github" onclick={closeMenu}>
							<img src="/icon/square-github.svg" class="fa-" alt="Github">
						</a>
					</li>
					<li><a href="/cv/magnus_lixenstrand_cv.pdf" target="_blank" class="button button-pulse" onclick={closeMenu}>CV</a></li>
				</ul>
			</div>
		</div>

		<!-- Overlay för att stänga menyn vid klick utanför -->
		{#if hamburgerOpen}
			<button
				class="nav-overlay"
				onclick={closeMenu}
				aria-label="Stäng meny"
				tabindex="-1"
			></button>
		{/if}

		<a href="/">
			<img src="/icon/house-solid.svg" alt="Home" class="home-mobile">
		</a>

		<button
			class="hamburger"
			class:active={hamburgerOpen}
			aria-label="Navigeringsmeny"
			aria-expanded={hamburgerOpen}
			onclick={toggleMenu}
		>
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
			<h3>Om mig</h3>
			<p class="footer-description">
				Från försäljning till kod – jag automatiserar det som andra gör manuellt.
			</p>
		</div>
	</div>

	<div class="footer-bottom">
		<p>
			<small>&copy; <span id="current-year"></span> Magnus Lixenstrand</small>
		</p>
	</div>
</footer>
