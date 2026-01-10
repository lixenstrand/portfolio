<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let hamburgerOpen = $state(false);

	function toggleMenu() {
		hamburgerOpen = !hamburgerOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = hamburgerOpen ? 'hidden' : '';
		}
	}

	function closeMenu() {
		hamburgerOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && hamburgerOpen) {
			closeMenu();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

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

<style>
	#header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(13, 13, 13, 0.85);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		z-index: 2000;
		width: 100%;
		transition: box-shadow 0.3s ease, border-bottom 0.3s ease;
	}

	#header.scrolled {
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
		border-bottom: 1px solid rgba(0, 217, 255, 0.1);
	}

	nav {
		font-family: var(--mono);
		font-size: 80%;
		padding: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	nav li:first-child {
		flex-basis: 100%;
		text-align: center;
	}

	nav .fa- {
		height: 2rem;
		width: auto;
		vertical-align: middle;
		filter: invert(86%) sepia(25%) saturate(179%) hue-rotate(345deg) brightness(95%) contrast(81%);
	}

	nav .colorful {
		filter: invert(86%) sepia(25%) saturate(179%) hue-rotate(345deg) brightness(95%) contrast(81%);
		position: relative;
		top: -6px;
	}

	nav a .home-mobile {
		filter: invert(86%) sepia(25%) saturate(179%) hue-rotate(345deg) brightness(95%) contrast(81%);
	}

	nav a .home-mobile:hover {
		filter: invert(67%) sepia(92%) saturate(2878%) hue-rotate(158deg) brightness(102%) contrast(101%);
	}

	nav a {
		color: var(--white);
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	nav a:hover,
	nav .fa-:hover {
		color: var(--hotmag);
	}

	nav a:focus {
		outline: 2px solid var(--aqua);
		outline-offset: 4px;
		transform: scale(1.05);
	}

	nav .fa-:hover {
		filter: invert(67%) sepia(92%) saturate(2878%) hue-rotate(158deg) brightness(102%) contrast(101%);
	}

	nav .colorful:hover {
		filter: invert(67%) sepia(92%) saturate(2878%) hue-rotate(158deg) brightness(102%) contrast(101%);
	}

	.hamburger {
		background: transparent;
		border: none;
		color: inherit;
		font: inherit;
		padding: 0;
		display: none;
	}

	.hamburger:focus {
		outline: 2px solid var(--aqua);
		outline-offset: 4px;
	}

	.home-mobile {
		display: none;
	}

	.button {
		background-color: deepskyblue;
		padding: 0.75rem 1rem;
		border-radius: 5px;
		color: var(--black);
		border: none;
		min-height: 44px;
		min-width: 44px;
	}

	.button:hover {
		color: var(--black);
		background-color: var(--hotmag);
	}

	.button:focus {
		outline: 2px solid var(--aqua);
		outline-offset: 4px;
		box-shadow: 0 0 15px rgba(0, 217, 255, 0.6);
	}

	.button-pulse {
		animation: pulse 2.5s ease-in-out infinite;
		will-change: transform, box-shadow;
		position: relative;
		z-index: 10;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(0, 217, 255, 0.7);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 0 10px rgba(0, 217, 255, 0);
		}
	}

	@media (min-width: 850px) {
		.logoName {
			visibility: visible;
		}
	}

	@media (max-width: 849px) {
		nav a .home-mobile {
			display: none !important;
		}

		.logoName {
			visibility: hidden;
		}

		nav {
			padding: 1.5rem 1rem;
			min-height: 70px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.hamburger {
			display: block;
			cursor: pointer;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 20px;
			z-index: var(--z-hamburger, 1001);
			padding: 14px;
		}

		.bar {
			display: block;
			width: 35px;
			height: 4px;
			background-color: var(--white);
			margin: 5px auto;
			-webkit-transition: all 0.3s ease-in-out;
			transition: all 0.3s ease-in-out;
		}

		.hamburger.active .bar:nth-child(2) {
			opacity: 0;
		}

		.hamburger.active .bar:nth-child(1) {
			transform: translateY(9px) rotate(45deg);
		}

		.hamburger.active .bar:nth-child(3) {
			transform: translateY(-9px) rotate(-45deg);
		}

		.nav-menu {
			position: fixed;
			top: 0;
			right: -100%;
			width: 280px;
			height: 100vh;
			background: linear-gradient(180deg, rgba(13, 13, 13, 0.98) 0%, rgba(26, 31, 53, 0.98) 100%);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			padding: 2rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			visibility: hidden;
			pointer-events: none;
			opacity: 0;
			transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, visibility 0.3s ease;
			box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
		}

		.nav-menu::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: radial-gradient(circle at top right, rgba(0, 217, 255, 0.08), transparent 50%);
			pointer-events: none;
		}

		.nav-menu li {
			margin: 0;
			opacity: 0;
			transform: translateX(20px);
			transition: opacity 0.3s ease, transform 0.3s ease;
			width: 100%;
			text-align: center;
		}

		.nav-menu.active li:nth-child(1) { transition-delay: 0.05s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(2) { transition-delay: 0.1s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(3) { transition-delay: 0.15s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(4) { transition-delay: 0.2s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(5) { transition-delay: 0.25s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(6) { transition-delay: 0.3s; opacity: 1; transform: translateX(0); }
		.nav-menu.active li:nth-child(7) { transition-delay: 0.35s; opacity: 1; transform: translateX(0); }

		.nav-menu a {
			padding: 1rem 1.5rem;
			min-height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 1.25rem;
			font-weight: 500;
			width: 100%;
		}

		.nav-menu.active {
			right: 0;
			visibility: visible;
			pointer-events: auto;
			opacity: 1;
			z-index: var(--z-nav-menu, 1000);
		}

		.nav-menu ul {
			display: flex !important;
			flex-direction: column !important;
			flex-flow: column nowrap !important;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			padding: 0;
			margin: 0;
			list-style: none;
			width: 100%;
		}

		.nav-menu li:first-child {
			flex-basis: auto;
		}

		.nav-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: calc(var(--z-nav-menu, 1000) - 1);
			border: none;
			cursor: pointer;
			animation: fadeIn 0.3s ease;
		}

		@keyframes fadeIn {
			from { opacity: 0; }
			to { opacity: 1; }
		}

		.nav-menu a:hover {
			color: var(--hotmag);
			background: rgba(0, 217, 255, 0.1);
			border-radius: 8px;
		}

		.nav-menu a:active {
			background: rgba(0, 217, 255, 0.2);
		}
	}
</style>
