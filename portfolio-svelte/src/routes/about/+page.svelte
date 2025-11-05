<script lang="ts">
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
	<title>Om Magnus Lixenstrand - Automation Engineer & Problem Solver</title>
	<meta name="description" content="Magnus Lixenstrand - Automation Engineer som kombinerar 12+ års säljarbakgrund med teknisk problemlösning. Bygger lösningar som skapar mätbart affärsvärde.">
	<link rel="canonical" href="https://magnuslixenstrand.com/about">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://magnuslixenstrand.com/about">
	<meta property="og:title" content="Om Magnus Lixenstrand - Automation Engineer & Problem Solver">
	<meta property="og:description" content="Automation Engineer som kombinerar 12+ års säljarbakgrund med teknisk problemlösning. Bygger lösningar som skapar mätbart affärsvärde.">
	<meta property="og:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">
	<meta property="og:locale" content="sv_SE">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://magnuslixenstrand.com/about">
	<meta property="twitter:title" content="Om Magnus Lixenstrand - Automation Engineer & Problem Solver">
	<meta property="twitter:description" content="Automation Engineer som kombinerar 12+ års säljarbakgrund med teknisk problemlösning. Bygger lösningar som skapar mätbart affärsvärde.">
	<meta property="twitter:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">

	<link rel="stylesheet" href="/css/about.css">
</svelte:head>

<section id="hero">
	<div class="hero-text">
		<h1 class="aboutMeHeader">Kort om <span class="smallScreenCapitalize">mig</span></h1>
		<a href="#projects" class="scroll-to-projects">Se mer om mig ↓</a>
	</div>
</section>

<div class="aboutBackground">
	<section id="projects">
		<article id="first">
			<div class="text">
				<img data-aos="fade-left" data-aos-offset="400"
					src="/images/IMG_0830.jpg" alt="Magnus Lixenstrand" />

				<div class="blackBox" data-aos="fade-right" data-aos-offset="400">
					<h3 class="about-section-heading-first">Varför automation?</h3>

					<p><strong>När folk ser en sten på marken tänker de "en sten". Jag plockar upp den och vrider på den ur olika vinklar.</strong></p>

					<p>Det är så jag ser företags system och flöden. Efter 12+ år inom försäljning har jag sett samma manuella
					processer upprepas dagligen. Där andra accepterar "så har vi alltid gjort" ser jag möjligheter att automatisera,
					integrera och effektivisera.</p>

					<h3 class="about-section-heading">Vad 12+ år inom försäljning gett mig</h3>

					<p>Bakgrunden inom försäljning har lärt mig att lyssna på vad användare inte säger – att förstå vad folk egentligen behöver, inte bara vad de ber om. Varje lösning startar med frågan "vilket problem löser detta?" och fokus ligger på affärsvärde. Efter år av att förklara komplexa produkter till skeptiska kunder kan jag kommunicera tekniska lösningar både uppåt och nedåt i organisationen. Och jag har lärt mig se ineffektivitet som andra accepterat som "så har vi alltid gjort" – flaskhalsar som faktiskt går att fixa.</p>

					<p class="about-highlight-text">Därför bygger jag inte bara verktyg som fungerar – jag bygger lösningar som faktiskt används
					och skapar mätbart värde. Mina projekt på Nordmet sparar teamet 20+ timmar i veckan, och det är inte för att jag är
					bäst på att koda, utan för att jag förstår affären.</p>

					<h3 class="about-section-heading">Bortom jobbet</h3>

					<p>När jag inte automatiserar arbetsflöden på Nordmet pysslar jag med Home Assistant hemma (15+ enheter, 50+ automations),
					reser med min sambo för att upptäcka nya kulturer, och springer för att hålla huvudet klart.</p>

					<p>Bor i Jönköping och söker Automation Engineer / Integration Developer roller hos etablerade företag där kombinationen av affärsförståelse och teknisk problemlösning kan göra skillnad.</p>

					<h4 class="about-subsection-heading">Tech stack för automation:</h4>
					<ul class="about-badge-list">
						<li>Python + FastAPI</li>
						<li>n8n</li>
						<li>Home Assistant</li>
						<li>SQL</li>
						<li>REST APIs</li>
					</ul>

					<h4 class="about-subsection-heading-compact">Vad driver mig:</h4>
					<ul class="about-badge-list-no-margin">
						<li>Automatisera det repetitiva</li>
						<li>Lösa verkliga problem</li>
						<li>Kontinuerligt lärande</li>
						<li>Se mätbara resultat</li>
					</ul>
				</div>
			</div>
		</article>
	</section>
</div>
