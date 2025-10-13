<script>
	import { onMount } from 'svelte';
	import AOS from 'aos';

	onMount(() => {
		AOS.init({
			offset: 290,
			delay: 0,
			duration: 1200,
			easing: 'ease',
			once: true,
			mirror: false,
			disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
		});
	});
</script>

<svelte:head>
	<title>Blogg - Magnus Lixenstrand</title>
	<meta name="description" content="Artiklar om automation, systemintegration och affärsprocesser av Magnus Lixenstrand - Automation Engineer.">
	<link rel="canonical" href="https://magnuslixenstrand.se/blog">
	<link rel="stylesheet" href="/css/blog.css">
</svelte:head>

<section id="hero">
	<div class="hero-text">
		<h1>Automation & Business Insights</h1>
		<p>Praktiska erfarenheter från 12+ år sales och 4+ år automation engineering</p>
		<a href="#blog-articles" class="scroll-to-blog">Läs mina artiklar ↓</a>
	</div>
</section>

<div class="gradient"></div>

<section id="blog-articles" class="blog-list">
	<article class="blog-card" data-aos="fade-up">
		<div class="blog-card-content">
			<span class="blog-tag">Sales & Automation</span>
			<h2><a href="/blog/automatisera-saljteam">Hur jag automatiserade vårt säljteam (från insidan)</a></h2>
			<p>Efter 12+ år inom försäljning hade jag sett samma manuella processer upprepas tusentals gånger. När jag började koda var det inte för att "bli utvecklare" – det var för att jag var trött på att slösa 2 timmar om dagen på saker en dator kunde göra på 2 minuter.</p>
			<div class="blog-meta">
				<span class="reading-time">5 min läsning</span>
				<span class="date">Januari 2025</span>
			</div>
			<a href="/blog/automatisera-saljteam" class="read-more">Läs mer →</a>
		</div>
	</article>

	<article class="blog-card" data-aos="fade-up" data-aos-delay="100">
		<div class="blog-card-content">
			<span class="blog-tag">Process Optimization</span>
			<h2><a href="/blog/5-flaskhalsar-sme">4 flaskhalsar i SME-företag som kan automatiseras på en dag</a></h2>
			<p>Efter att ha byggt 8+ automationssystem för Nordmet har jag sett samma mönster om och om igen: Små och medelstora företag slösar 10-20 timmar i veckan på saker som kan automatiseras på en eftermiddag. Här är de 4 vanligaste flaskhalsarna – och hur du fixar dem.</p>
			<div class="blog-meta">
				<span class="reading-time">6 min läsning</span>
				<span class="date">Januari 2025</span>
			</div>
			<a href="/blog/5-flaskhalsar-sme" class="read-more">Läs mer →</a>
		</div>
	</article>

	<article class="blog-card" data-aos="fade-up" data-aos-delay="200">
		<div class="blog-card-content">
			<span class="blog-tag">Career Journey</span>
			<h2><a href="/blog/fran-sales-till-automation">Från 12 år inom försäljning till automation engineer</a></h2>
			<p>Folk frågar ofta: "Varför bytte du från sales till tech?" Sanningen är att jag inte bytte. Jag slutade sälja produkter och började lösa problem på riktigt. Här är min resa och vad min sales-bakgrund ger mig som automation engineer.</p>
			<div class="blog-meta">
				<span class="reading-time">6 min läsning</span>
				<span class="date">Januari 2025</span>
			</div>
			<a href="/blog/fran-sales-till-automation" class="read-more">Läs mer →</a>
		</div>
	</article>
</section>
