<script lang="ts">
	import { onMount } from 'svelte';
	import TechBadge from '$lib/components/TechBadge.svelte';

	const techStack = ['Python + FastAPI', 'n8n', 'Home Assistant', 'SQL', 'REST APIs'];
	const whatDrivesMe = ['Automatisera det repetitiva', 'Lösa verkliga problem', 'Kontinuerligt lärande', 'Se mätbara resultat'];

	onMount(() => {
		// Hantera stjärnornas opacity baserat på scroll
		function handleStarsVisibility() {
			const heroSection = document.querySelector("#hero");
			if (!heroSection) return;

			const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
			const scrollPosition = window.scrollY;

			// Fade ut stjärnorna när vi scrollar förbi hero-sektionen
			if (scrollPosition > heroBottom - window.innerHeight * 0.3) {
				// Börja fade när vi är 30% från botten av hero
				const fadeProgress = (scrollPosition - (heroBottom - window.innerHeight * 0.3)) / (window.innerHeight * 0.3);
				const opacity = Math.max(0, 1 - fadeProgress);
				document.documentElement.style.setProperty('--stars-opacity', opacity);
			} else {
				document.documentElement.style.setProperty('--stars-opacity', '1');
			}
		}

		// Lyssna på scroll
		window.addEventListener('scroll', handleStarsVisibility);
		handleStarsVisibility(); // Kör en gång vid load

		// Mjuk auto-scroll till innehåll
		setTimeout(() => {
			const projectsSection = document.querySelector("#projects");
			if (projectsSection) {
				const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
				const startPosition = window.pageYOffset;
				const distance = targetPosition - startPosition;
				const duration = 1500; // 1.5 sekunder för mjuk scroll
				let start = null;

				function smoothScrollAnimation(currentTime) {
					if (start === null) start = currentTime;
					const timeElapsed = currentTime - start;
					const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
					window.scrollTo(0, run);
					if (timeElapsed < duration) requestAnimationFrame(smoothScrollAnimation);
				}

				// Easing function för mjuk acceleration/deceleration
				function easeInOutCubic(t, b, c, d) {
					t /= d / 2;
					if (t < 1) return c / 2 * t * t * t + b;
					t -= 2;
					return c / 2 * (t * t * t + 2) + b;
				}

				requestAnimationFrame(smoothScrollAnimation);
			}
		}, 600); // 600ms delay

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleStarsVisibility);
		};
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

</svelte:head>

<section id="hero">
	<div class="hero-text">
		<h1 class="aboutMeHeader">Kort om <span class="smallScreenCapitalize">mig</span></h1>
	</div>
</section>

<div class="aboutBackground">
	<section id="projects">
		<article id="first">
			<div class="text">
				<img src="/images/IMG_0830.jpg" alt="Magnus Lixenstrand" />

				<div class="blackBox">
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

					<p>Bor i Jönköping och söker roller hos etablerade företag där jag kan lösa verkliga problem genom att kombinera affärsförståelse med teknisk problemlösning.</p>

					<h4 class="about-subsection-heading">Tech stack för automation:</h4>
					<div class="tech-badges">
						{#each techStack as tech}
							<TechBadge {tech} />
						{/each}
					</div>

					<h4 class="about-subsection-heading-compact">Vad driver mig:</h4>
					<div class="tech-badges">
						{#each whatDrivesMe as item}
							<TechBadge tech={item} />
						{/each}
					</div>
				</div>
			</div>
		</article>
	</section>
</div>

<style>
	#hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem 8rem 2rem;
	}

	.hero-text {
		font-family: var(--sans);
		margin: 0 auto;
		max-width: 1200px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		position: relative;
		z-index: 2;
	}

	.aboutMeHeader {
		margin: 0;
		font-family: var(--sans);
		font-size: clamp(2.5rem, 8vw, 4rem);
		color: var(--aqua);
		line-height: 1.2;
		text-align: center;
	}

	.smallScreenCapitalize {
		text-transform: lowercase;
	}

	@media (max-width: 768px) {
		.smallScreenCapitalize {
			text-transform: capitalize;
			color: var(--hotmag);
			display: block;
		}
	}

	.aboutBackground {
		background-color: var(--dkblue);
		position: relative;
		z-index: 10;
		box-shadow:
			0 -80px 150px 60px rgba(26, 31, 53, 0.9),
			0 80px 150px 60px rgba(26, 31, 53, 0.9);
		overflow-y: visible !important;
	}

	.aboutBackground article {
		padding-bottom: 2rem;
		margin: 0 auto;
		max-width: 1200px;
		min-height: auto !important;
		height: auto !important;
		display: block !important;
	}

	#projects {
		padding: 4rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	#projects h4 {
		font-size: 1.3rem;
		font-family: var(--mono);
	}

	.blackBox {
		background: linear-gradient(135deg, var(--dkblue) 0%, var(--plum) 100%);
		border: 2px solid var(--aqua);
		padding: 2rem;
		border-radius: 15px;
		color: var(--white);
		font-size: 1rem;
		line-height: 1.7;
		box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
	}

	.about-section-heading-first {
		color: var(--aqua);
		margin-bottom: 1rem;
	}

	.about-section-heading {
		color: var(--aqua);
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.about-highlight-text {
		margin-top: 1.5rem;
	}

	.about-subsection-heading {
		color: var(--aqua);
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.about-subsection-heading-compact {
		color: var(--aqua);
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.tech-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	#projects img {
		margin: 2rem 0 2rem 0;
		border-left: 1px solid var(--aqua);
		border-top: 1px solid var(--aqua);
		border-radius: 25px;
		padding: 1rem;
		box-shadow: 1px 15px 31.5px -6px #000000;
	}

	#first img {
		width: 100%;
		position: relative;
		z-index: 9999 !important;
		display: block !important;
	}

	@media (min-width: 550px) {
		#first img {
			float: right;
			width: 350px;
			max-width: 40%;
			margin: 0 0 2rem 2rem;
		}

		#first .blackBox {
			position: relative;
			z-index: 10;
			clear: none;
		}
	}
</style>
