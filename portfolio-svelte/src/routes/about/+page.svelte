<script lang="ts">
	import TechBadge from '$lib/components/TechBadge.svelte';
	const techStack = ['Python + FastAPI', 'Svelte', 'n8n', 'Home Assistant', 'SQL', 'REST-API:er'];
	const whatDrivesMe = ['Få bort dubbelarbete', 'Förstå vad som skaver', 'Lära mig nya verktyg', 'Se lösningen användas'];
</script>

<svelte:head>
	<title>Om Magnus Lixenstrand | Automation och systemintegration</title>
	<meta name="description" content="Från 12 år inom försäljning till automation och systemintegration. Läs hur Magnus Lixenstrand bygger verksamhetsnära lösningar.">
	<link rel="canonical" href="https://magnuslixenstrand.com/about">
	<meta property="og:type" content="profile">
	<meta property="og:url" content="https://magnuslixenstrand.com/about">
	<meta property="og:title" content="Om Magnus Lixenstrand | Automation och systemintegration">
	<meta property="og:description" content="Från försäljning till verksamhetsnära utveckling, Python och systemintegration.">
	<meta property="og:image" content="https://magnuslixenstrand.com/images/IMG_0830.jpg">
	<meta property="og:locale" content="sv_SE">
</svelte:head>

<section class="about-hero">
	<p class="section-kicker">Om mig</p>
	<h1>Försäljning gav mig problemen. Kod gav mig verktygen.</h1>
	<p class="about-lede">Jag trivs bäst nära verksamheten: där en konkret frustration kan bli ett fungerande system som människor faktiskt använder. I dag utvecklar jag Nordmets interna ERP från behov och datamodell till driftsatt lösning.</p>
	<div class="cta-group">
		<a href="/#nordmet-erp" class="cta-primary">Se ERP-caset</a>
		<a href="/cv/magnus_lixenstrand_cv_2026.pdf?v=2" target="_blank" rel="noopener noreferrer" aria-label="Öppna CV i ny flik" class="cta-secondary">Öppna CV</a>
		<a href="/cv/magnus_lixenstrand_cv_2026_en.pdf?v=2" target="_blank" rel="noopener noreferrer" aria-label="Open CV in English in a new tab" class="cta-secondary" lang="en">CV in English</a>
	</div>
</section>

<div class="about-content">
	<div class="about-grid">
		<figure class="about-portrait">
			<picture>
				<source type="image/webp" srcset="/images/IMG_0830.webp">
				<img src="/images/IMG_0830_optimized.jpg" alt="Magnus Lixenstrand" loading="lazy" width="1200" height="1200">
			</picture>
			<figcaption>Magnus Lixenstrand, Jönköping</figcaption>
		</figure>

		<article class="about-copy">
			<section>
				<h2>Jag började där användarna är</h2>
				<p>Under 12 år inom försäljning såg jag hur administration, dubbelarbete och system som inte pratade med varandra stal tid från det viktiga arbetet. Till slut började jag bygga verktygen jag själv saknade.</p>
				<p>Den bakgrunden gör att jag inte börjar med tekniken. Jag börjar med att förstå flödet: vad händer före en knapptryckning, var fastnar arbetet och vem behöver resultatet efteråt?</p>
			</section>

			<section>
				<h2>Från idé till använd vardag</h2>
				<p>I dag utvecklar jag Nordmets interna ERP. Systemet samlar CRM, materialförfrågningar, offerter, order, inköp, lager, certifikat, transport och ekonomiintegrationer. Jag arbetar hela vägen från behov och datamodell till gränssnitt, driftsättning och stöd till användarna.</p>
				<p class="about-result"><strong>10 användare och 20+ sparade timmar per vecka.</strong> Det är den sortens resultat jag vill skapa: lösningar som används och märks.</p>
			</section>

			<section>
				<h2>Bortom jobbet</h2>
				<p>Hemma fortsätter jag gärna experimentera. Mitt Home Assistant-system omfattar 232 enheter och 161 automationer, allt från temperaturstyrning till belysning och vardagsrutiner, och familjen styr det från en egen dashboard.</p>
				<p>Jag bor i Jönköping, reser gärna med min sambo och springer för att hålla huvudet klart. Nu söker jag en roll där nyfikenhet, affärsförståelse och genomförandekraft får arbeta tillsammans.</p>
			</section>

			<section class="about-skills">
				<h2>Teknik och drivkrafter</h2>
				<h3>Teknik jag arbetar med</h3>
				<div class="tech-badges">{#each techStack as tech}<TechBadge {tech} />{/each}</div>
				<h3>Det som driver mig</h3>
				<ul class="drive-list">{#each whatDrivesMe as item}<li>{item}</li>{/each}</ul>
			</section>
		</article>
	</div>
</div>
