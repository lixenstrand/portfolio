<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { page } from '$app/state';
	import { texts } from '$lib/content';

	const t = $derived(texts());

	let hamburgerOpen = $state(false);
	let hamburgerButton: HTMLButtonElement;
	let menuElement: HTMLDivElement;
	let lastFocusedElement: HTMLElement | null = null;
	let desktopMediaQuery: MediaQueryList | null = null;
	let projectCurrent = $derived(page.url.pathname === '/' && page.url.hash === '#projects');

	function setBackgroundInert(inert: boolean) {
		if (typeof document === 'undefined') return;
		document.querySelectorAll<HTMLElement>('#main-content, .site-footer, .skip-to-content').forEach((element) => {
			element.inert = inert;
		});
	}

	function menuFocusableElements() {
		if (!menuElement) return [];
		return Array.from(menuElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
	}

	function nextFrame() {
		return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	}

	async function openMenu() {
		lastFocusedElement = hamburgerButton;
		hamburgerOpen = true;
		document.body.style.overflow = 'hidden';
		setBackgroundInert(true);
		await tick();
		await nextFrame();
		await nextFrame();
		menuFocusableElements()[0]?.focus();
	}

	function closeMenu(restoreFocus = true) {
		if (restoreFocus) (lastFocusedElement ?? hamburgerButton)?.focus();
		hamburgerOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
			setBackgroundInert(false);
		}
	}

	function toggleMenu() {
		if (hamburgerOpen) void closeMenu();
		else void openMenu();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!hamburgerOpen) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			void closeMenu();
			return;
		}
		if (event.key !== 'Tab') return;

		const focusable = [...menuFocusableElements(), hamburgerButton].filter(Boolean);
		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		} else if (!focusable.includes(document.activeElement as HTMLElement)) {
			event.preventDefault();
			first.focus();
		}
	}

	function handleDesktopChange(event: MediaQueryListEvent) {
		if (event.matches && hamburgerOpen) void closeMenu(false);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		desktopMediaQuery = window.matchMedia('(min-width: 821px)');
		desktopMediaQuery.addEventListener('change', handleDesktopChange);
	});
	onDestroy(() => {
		if (typeof window !== 'undefined') window.removeEventListener('keydown', handleKeydown);
		desktopMediaQuery?.removeEventListener('change', handleDesktopChange);
		if (typeof document !== 'undefined') document.body.style.overflow = '';
		setBackgroundInert(false);
	});
</script>

<header class="site-header">
	<nav class="site-nav" aria-label={t.nav.label}>
		<a class="brand" href="/" onclick={() => closeMenu(false)}>
			<span class="brand-name">Magnus Lixenstrand</span>
			<span class="brand-role">{t.nav.role}</span>
		</a>

		<div bind:this={menuElement} class="nav-menu" class:active={hamburgerOpen} id="primary-navigation">
			<ul>
				<li><a href="/#projects" class:current={projectCurrent} aria-current={projectCurrent ? 'location' : undefined} onclick={() => closeMenu(false)}>{t.nav.projects}</a></li>
				<li><a href="/about" class:current={page.url.pathname === '/about'} aria-current={page.url.pathname === '/about' ? 'page' : undefined} onclick={() => closeMenu(false)}>{t.nav.about}</a></li>
				<li><a href="#kontakt" onclick={() => closeMenu(false)}>{t.nav.contact}</a></li>
			</ul>
		</div>

		<a href={t.cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.cv.navLabel} class="nav-cv" onclick={() => closeMenu(false)}>{t.cv.nav}</a>

		<button
			bind:this={hamburgerButton}
			class="hamburger"
			class:active={hamburgerOpen}
			aria-label={hamburgerOpen ? t.nav.close : t.nav.open}
			aria-controls="primary-navigation"
			aria-expanded={hamburgerOpen}
			onclick={toggleMenu}
		>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
		</button>
	</nav>

	{#if hamburgerOpen}
		<button class="nav-overlay" tabindex="-1" aria-hidden="true" onclick={() => closeMenu()}></button>
	{/if}
</header>
