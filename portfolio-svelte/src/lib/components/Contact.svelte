<script lang="ts">
	import { page } from '$app/state';
	import { content, langOf } from '$lib/content';

	const t = $derived(content(langOf(page.url.pathname)));
</script>

<section id="kontakt" class="contact" aria-labelledby="kontakt-rubrik">
	<h2 id="kontakt-rubrik">{t.contact.title}</h2>
	<div class="contact-body">
		<p>{t.contact.text}</p>
		<a class="contact-email" href="mailto:mlixenstrand@gmail.com">mlixenstrand@gmail.com</a>
		<ul class="contact-links">
			<li><a href="https://www.linkedin.com/in/magnus-lixenstrand/" target="_blank" rel="noopener noreferrer" aria-label={t.contact.linkedinLabel}>LinkedIn</a></li>
			<li><a href={t.cv.href} target="_blank" rel="noopener noreferrer" aria-label={t.cv.linkLabel}>{t.cv.link}</a></li>
			<li><a href={t.cvOther.href} target="_blank" rel="noopener noreferrer" aria-label={t.cvOther.label} lang={t.cvOther.lang}>{t.cvOther.link}</a></li>
		</ul>
	</div>
</section>
