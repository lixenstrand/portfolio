import { cvFiles } from './cv';

// The Yrkestitel and its subtitle, which follow the name
const jobTitle = 'AI-utvecklare';
const subtitle = 'LLM:er i verkliga affärsflöden';

// Every text on the site in Swedish, so the markup holds nothing that needs translating.
export const sv = {
	locale: 'sv_SE',
	// The language's name in itself, for the language switcher
	language: 'Svenska',
	jobTitle,
	subtitle,
	skipLink: 'Hoppa till huvudinnehåll',
	portraitAlt: 'Magnus Lixenstrand',
	seeErp: 'Se affärssystemet',
	preview: {
		image: 'https://magnuslixenstrand.com/images/og-magnus-lixenstrand-sv.jpg',
		alt: `Magnus Lixenstrand, ${jobTitle} – ${subtitle}`
	},
	cv: {
		href: cvFiles.sv,
		nav: 'CV',
		navLabel: 'CV, PDF i ny flik',
		link: 'CV (PDF)',
		linkLabel: 'CV (PDF), öppnas i ny flik',
		open: 'Öppna CV (PDF)',
		openLabel: 'Öppna CV (PDF) i ny flik'
	},
	// The CV in the other language; its links carry that language's lang
	cvOther: {
		href: cvFiles.en,
		lang: 'en',
		link: 'CV in English (PDF)',
		short: 'CV in English',
		label: 'CV in English (PDF), opens in a new tab'
	},

	nav: {
		label: 'Huvudnavigation',
		role: `${jobTitle}, Jönköping`,
		projects: 'Projekt',
		about: 'Om mig',
		contact: 'Kontakt',
		open: 'Öppna meny',
		close: 'Stäng meny'
	},

	contact: {
		title: 'Hör gärna av dig',
		text: `Jag söker roller som ${jobTitle}, i\u00A0Jönköping eller på\u00A0distans.`,
		linkedinLabel: 'LinkedIn, öppnas i ny flik'
	},

	footer: {
		role: `${jobTitle} – ${subtitle}`,
		linksLabel: 'Kontakt och profiler',
		truck: '3D-lastbil',
		edited: 'bearbetad'
	},

	error: {
		notFound: { title: 'Sidan finns inte', text: 'Länken kan vara gammal eller felstavad.' },
		failed: { title: 'Något gick fel', text: 'Försök igen om en stund.' },
		home: 'Till startsidan'
	},

	home: {
		title: `Magnus Lixenstrand, ${jobTitle} – ${subtitle}`,
		description: `Magnus Lixenstrand är ${jobTitle} i Jönköping och bygger in LLM:er i verkliga affärsflöden. Han planerade och byggde Nordic Metal Trades affärssystem, som sparar teamet över 20 timmar i veckan.`,
		// Only AI and LLM knowledge that his code backs up
		knowsAbout: ['LLM-applikationer', 'AI-agenter', 'Model Context Protocol (MCP)', 'Retrieval-augmented generation (RAG)', 'Evals för LLM:er'],
		hero: {
			lede: 'Jag bygger bort onödigt manuellt arbete, numera med LLM:er. Tolv år i försäljning lärde mig var arbetet fastnar, så jag planerade och byggde Nordic Metal Trades affärssystem från grunden. I dag är jag produktägare och ensam utvecklare.',
			proof: { before: 'Systemet används varje dag av ungefär tio kollegor och sparar teamet över ', strong: '20 timmar i veckan', after: '.' }
		},
		erp: {
			title: 'Ett eget affärssystem för hela flödet',
			intro: 'Nordic Metal Trade säljer stål och metall till industrikunder i Europa. Affärssystemet är skräddarsytt efter hur företaget arbetar.',
			showLabel: 'Flödet med skärmbilder',
			flowLabel: 'Flödet i affärssystemet',
			// Steps with a shot switch the screenshot; the rest point to their story row
			flow: [
				{ step: 'Kund och CRM', shot: 'erp-kunder', alt: 'Kundregistret i affärssystemet: kunder med land, ansvarig säljare, senaste aktivitet, omsättning, täckningsbidrag och aktiva offerter', caption: 'Kundregistret visar omsättning, täckningsbidrag och aktiva offerter per kund.' },
				{ step: 'Material\u00ADförfrågan', shot: 'erp-materialforfragan', alt: 'Materialförfrågan: sökträffar bland leverantörer och historiska order till vänster, tre materialrader med dimension, stålkvalitet och vikt i mitten och vald leverantör till höger', caption: 'En sökning går samtidigt genom leverantörer, historiska order, offerter och produkter. Förfrågan till de valda leverantörerna skapas i samma vy.' },
				{ step: 'Offert', shot: 'erp-offert', alt: 'Offert med offertrader, inpris, utpris och täckningsbidrag per rad, och en fraktsändning med pris från Unifaun', caption: 'Offerten räknar täckningsbidrag per rad och lägger frakten som en egen sändning med transportörens pris.' },
				{ step: 'Order och inköp', shot: 'erp-order', alt: 'Orderöversikt som tavla med kolumner från inköp till produktion, där varje order visar inköpsstatus, frakt och kommentarer', caption: 'Orderöversikten följer varje order från inköp till leverans och flaggar det som håller på att bli försenat.' },
				{ step: 'Lager och certifikat', shot: 'erp-lager', alt: 'Chargespårning för ett smältnummer: mottagning från leverantör och plockning på fem order', caption: 'Chargespårningen följer ett smältnummer från inleverans till varje order där materialet plockats. Det avgör vilket certifikat kunden ska ha.' },
				{ step: 'Transport', shot: 'erp-transport', alt: 'En bokad transport i fraktplaneringen: leveransdatum, vikt och ordervärde överst, kund, leverantör och fraktben med transportör, hämtning, lossning och kostnad, samt inleveranser, artiklar och kommentarer', caption: 'En bokad transport samlar kund, leverantör, fraktben, inleveranser och kommentarer på ett ställe, med listan över alla bokningar bredvid.' },
				{ step: 'Bokföring', row: 'integrationer' }
			],
			shotLink: (step: string) => `Skärmbild av ${step.toLowerCase()}, öppnas i full storlek i ny flik`,
			dot: (n: number, total: number, step: string) => `Bild ${n} av ${total}: ${step}`,
			play: 'Starta bildspelet',
			pause: 'Pausa bildspelet',
			note: 'Bilderna kommer från testmiljön och all data på dem är påhittad. Systemet nås bara via företagets VPN, därför visas bilder i stället för en demo.',
			story: [
				{ label: 'Utgångsläge', text: 'Offerterna gjordes i Excel, och samma uppgifter skrevs in flera gånger. Det fanns inget ställe där man såg var ett ärende låg.' },
				{ label: 'Början', text: 'Som säljare automatiserade jag först offertflödet, från Excel och VBA till ett webbflöde mot Fortnox. Det blev grunden till dagens system.' },
				{ label: 'Min roll', text: 'Produktägare, ensam utvecklare och projektledare för införandet: kravställning, datamodell, utveckling, test, utbildning och bytet från det gamla systemet.' },
				{ label: 'Integrationer', id: 'integrationer', text: 'Fortnox, Shiplink, Unifaun/nShift och Microsoft\u00A0365. Order, lager och inköp förs över till Fortnox utan dubbelregistrering, och frakt bokas direkt från ordern.' },
				{ label: 'AI-assistent', text: 'Svarar kollegorna om order, lager, material och rutiner, och kan efter bekräftelse lägga upp kunder och göra om förfrågningar till offerter.' },
				{ label: 'Teknik', text: 'SvelteKit, TypeScript, FastAPI, Python, MySQL och Docker.' }
			]
		},
		side: {
			title: 'Egna projekt',
			projects: [
				{ name: 'Smart hem', text: 'Home Assistant med 232 enheter, 161 automationer och 16 rum, via Zigbee, Matter/Thread och MQTT. Automationerna kopplar ihop belysning, värmepumpar och Nord\u00A0Pool-elpris.' },
				{ name: 'Hemma', text: 'En egen dashboard i SvelteKit och FastAPI som familjen styr hemmet från i mobil och surfplatta, med pushnotiser och roller för familj och gäster. AI-assistenten föreslår åtgärder som knappar, och appen utför bara det förslag någon trycker på. Varje förslag kontrolleras mot husets egna lampor, brytare, scener och skript.' },
				{ name: 'Hushållsekonomi', text: 'En webbapp i SvelteKit, FastAPI och SQLite som hämtar transaktioner från Toshl och följer budget, sparmål och lån. Den körs på egen server med nattlig avstämning. En egen MCP-server med 24 verktyg låter en AI-assistent läsa ekonomin, pröva om ett köp ryms och kategorisera om köp.' },
				{ name: 'Majo', text: 'Jag vidareutvecklar Majo, en Android\u00A0TV-app som spelar film och serier från användarens egna Plex-, Jellyfin- och Emby-servrar. En LLM översätter undertexterna medan filmen spelas. Jag har gjort ett nytt TV-gränssnitt med taktilt fokus. Agenter bygger och släpper nya versioner när jag ber om det, och appen erbjuder dem sedan på TV:n.' }
			],
			hemma: {
				views: [
					{ name: 'Hem', shot: 'hemma-hem', alt: 'Startsidan i Hemma på en surfplatta: torken och disken är klara, inne- och utetemperatur och scener som Morgon, Film och Godnatt' },
					{ name: 'Rum', shot: 'hemma-rum', alt: 'Rummen i Hemma: vardagsrummet öppnas, en lampa släcks och en annan dimmas från 36 till 10 procent' },
					{ name: 'Klimat', shot: 'hemma-klimat', alt: 'Klimatet i Hemma: inne- och utetemperatur, luftfuktighet, värmepumpen och varmvatten med kurvor' }
				],
				link: (view: string) => `Skärmbild av Hemma, ${view.toLowerCase()}, öppnas i full storlek i ny flik`,
				caption: 'Hemma på en surfplatta. Den körs lokalt och är kopplad till Home Assistant.'
			}
		}
	},

	about: {
		title: `Om Magnus Lixenstrand, ${jobTitle} – från försäljning till AI`,
		description: `Magnus Lixenstrand är ${jobTitle}. Han sålde i tolv år, planerade och byggde Nordic Metal Trades affärssystem och bygger nu in LLM:er i det. Om hans bakgrund och kompetenser.`,
		hero: {
			title: `Tolv år som säljare, nu ${jobTitle}`,
			lede: 'Säljåren lärde mig var arbetet fastnar. Jag byggde Nordic Metal Trades affärssystem och äger det i dag, från kravställning till drift. Nu bygger jag in LLM:er i det.'
		},
		why: {
			title: 'Varför jag började bygga system',
			text: ['Som säljare gick mycket tid åt till dubbelarbete i system som inte pratade med varandra. Till slut började jag bygga verktygen jag själv saknade.']
		},
		erp: {
			title: 'Affärssystemet',
			text: [
				'På Nordic Metal Trade började jag med att automatisera offertflödet. Det blev starten på företagets affärssystem, som jag sedan planerade och byggde. Systemet samlar CRM, materialförfrågningar, offerter, order, inköp, lager, certifikat och transport, och är kopplat till Fortnox, Shiplink, Unifaun/nShift och Microsoft\u00A0365.',
				'Jag är produktägare och ensam utvecklare, och var projektledare för införandet: test, utbildning och bytet från det gamla systemet.'
			],
			result: { before: 'Systemet har ', strong: 'cirka tio användare och sparar teamet över 20 timmar i veckan', after: '.' }
		},
		ai: {
			title: 'Från system till AI',
			text: [
				'I dag bygger jag också in LLM:er i affärssystemet. AI-assistenten i systemet svarar kollegorna om order, lager, material och rutiner. Den kan också lägga upp kunder och göra om förfrågningar till offerter, men först när användaren har bekräftat.',
				'Jag utvecklar med AI-kodagenter som tar ett ärende hela vägen till en granskad och mergad PR, och jag är sista instans.'
			]
		},
		path: {
			title: 'Vägen hit',
			dev: 'Utveckling och automation',
			sales: 'Försäljning och affär',
			// Same roles and track lines as the CV: steel = development, clay = sales.
			career: [
				{
					period: 'jul 2019–nu',
					org: 'Nordic Metal Trade AB',
					track: 'both',
					titles: ['Systemutvecklare och systemansvarig, aug\u00A02025–nu', 'B2B-säljare med utvecklingsansvar, jul\u00A02019–jul\u00A02025 (80\u00A0% försäljning, 20\u00A0% utveckling)'],
					text: 'Planerade och byggde företagets affärssystem. Är i dag produktägare och ensam utvecklare. Som säljare stod jag 2021 för ungefär hälften av företagets försäljning.'
				},
				{
					period: 'okt 2017–aug 2019',
					org: 'AD infinitum recycling',
					track: 'sales',
					titles: ['Affärsutvecklare, avfallshantering'],
					text: 'Kartlade företags avfallsflöden och sålde lösningar som sänkte deras kostnader, från första samtal till avtal.'
				},
				{ period: 'jan–sep 2017', org: '3 Sverige', track: 'sales', titles: ['Försäljningsspecialist B2B, från Cypern'] },
				{ period: 'okt 2015–dec 2016', org: 'Resor i Asien och Australien', track: 'pause', titles: ['Karriäruppehåll med tillfälligt arbete i besöksnäringen'] },
				{
					period: 'jan 2013–okt 2015',
					org: 'Eniro',
					track: 'both',
					titles: ['Senior försäljningsledare och systemambassadör'],
					text: 'Tre befordringar på knappt tre år. Ledde teamet när chefen var borta. Ledde det lokala införandet av ett nytt Google-baserat affärssystem och utbildade kollegorna.'
				},
				{ period: 'feb 2009–jun 2011', org: 'Sveacom AB', track: 'sales', titles: ['Telefonförsäljare'] }
			]
		},
		skills: {
			title: 'Kompetenser',
			items: [
				{ area: 'Utveckling', items: 'Python, FastAPI, Flask, SvelteKit, TypeScript, MySQL, REST-API:er, VBA' },
				{ area: 'Drift och integration', items: 'Docker, Linux, Google Cloud, GitHub Actions, Fortnox, Microsoft 365, n8n' },
				{ area: 'AI', items: 'Claude Code, Codex, agentflöden med kodgranskning, AI-assistenter' },
				{ area: 'Verksamhet', items: 'Kravanalys, processkartläggning, projektledning, systeminförande, användarstöd' },
				{ area: 'Affär', items: 'B2B-försäljning, förhandling, upphandling, budget' },
				{ area: 'Språk', items: 'Svenska (modersmål), engelska (flytande)' }
			]
		},
		spare: {
			title: 'Fritid',
			text: [
				'Hemma har jag Home Assistant med 232 enheter och 161 automationer som bland annat kopplar ihop belysning, värmepumpar och elpris. Familjen styr det från en egen dashboard.',
				'Jag bor i Jönköping, reser gärna med min sambo och springer för att hålla huvudet klart.'
			]
		}
	}
};
