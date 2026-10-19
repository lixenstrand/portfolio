<script lang="ts">
	import { page } from '$app/state';
	import { content, langOf } from '$lib/content';

	const t = $derived(content(langOf(page.url.pathname)));
	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<p class="footer-identity">Magnus Lixenstrand <span>{t.footer.role}</span></p>
	<nav class="footer-links" aria-label={t.footer.linksLabel}>
		<a href="mailto:mlixenstrand@gmail.com">mlixenstrand@gmail.com</a>
		<a href="https://www.linkedin.com/in/magnus-lixenstrand/" target="_blank" rel="noopener noreferrer" aria-label={t.contact.linkedinLabel}>LinkedIn</a>
		<a href={t.cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.cv.linkLabel}>{t.cv.link}</a>
		<a href={t.cvOther.href} target="_blank" rel="noopener noreferrer" aria-label={t.cvOther.label} lang={t.cvOther.lang}>{t.cvOther.link}</a>
	</nav>
	<p class="footer-copy">© {currentYear} Magnus Lixenstrand, Jönköping</p>
	<p class="footer-copy">{t.footer.truck}: <a href="https://sketchfab.com/3d-models/scania-truck-59889032d0ad457c81d7e058c79eedf8">PAndras</a>, {t.footer.edited}, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
</footer>
