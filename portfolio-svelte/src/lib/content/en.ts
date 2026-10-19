import { cvFiles } from './cv';
import type { sv } from './sv';

const jobTitle = 'AI Engineer';
const subtitle = 'LLMs in real business workflows';

// Every text on the site in English, the same keys as the Swedish module.
export const en: typeof sv = {
	locale: 'en_US',
	language: 'English',
	jobTitle,
	subtitle,
	skipLink: 'Skip to main content',
	portraitAlt: 'Magnus Lixenstrand',
	seeErp: 'See the ERP system',
	preview: {
		image: 'https://magnuslixenstrand.com/images/og-magnus-lixenstrand-en.jpg',
		alt: `Magnus Lixenstrand, ${jobTitle} – ${subtitle}`
	},
	cv: {
		href: cvFiles.en,
		nav: 'CV',
		navLabel: 'CV, PDF in a new tab',
		link: 'CV (PDF)',
		linkLabel: 'CV (PDF), opens in a new tab',
		open: 'Open CV (PDF)',
		openLabel: 'Open CV (PDF) in a new tab'
	},
	cvOther: {
		href: cvFiles.sv,
		lang: 'sv',
		link: 'CV på svenska (PDF)',
		short: 'CV på svenska',
		label: 'CV på svenska (PDF), öppnas i ny flik'
	},

	nav: {
		label: 'Main navigation',
		role: `${jobTitle}, Jönköping`,
		projects: 'Projects',
		about: 'About',
		contact: 'Contact',
		open: 'Open menu',
		close: 'Close menu'
	},

	contact: {
		title: 'Get in touch',
		text: `I’m looking for ${jobTitle} roles, in Jönköping or remote.`,
		linkedinLabel: 'LinkedIn, opens in a new tab'
	},

	footer: {
		role: `${jobTitle} – ${subtitle}`,
		linksLabel: 'Contact and profiles',
		truck: '3D truck',
		edited: 'modified'
	},

	error: {
		notFound: { title: 'Page not found', text: 'The link may be old or misspelled.' },
		failed: { title: 'Something went wrong', text: 'Please try again in a moment.' },
		home: 'Go to the home page'
	},

	home: {
		title: `Magnus Lixenstrand, ${jobTitle} – ${subtitle}`,
		description: `Magnus Lixenstrand is an ${jobTitle} in Jönköping, Sweden, building LLMs into real business workflows. He planned and built Nordic Metal Trade’s ERP system, which saves the team more than 20 hours a week.`,
		knowsAbout: ['LLM applications', 'AI agents', 'Model Context Protocol (MCP)', 'Retrieval-augmented generation (RAG)', 'LLM evals'],
		hero: {
			lede: 'I automate away unnecessary manual work, these days with LLMs. Twelve years in sales taught me where work gets stuck, so I planned and built Nordic Metal Trade’s ERP system from scratch. Today I’m its product owner and sole developer.',
			proof: { before: 'About ten colleagues use the system every day, and it saves the team more than ', strong: '20 hours a week', after: '.' }
		},
		erp: {
			title: 'An in-house ERP system for the whole workflow',
			intro: 'Nordic Metal Trade sells steel and metals to industrial customers in Europe. The ERP system is tailored to how the company works.',
			showLabel: 'The workflow in screenshots',
			flowLabel: 'The workflow in the ERP system',
			flow: [
				{ step: 'Customer and CRM', shot: 'erp-kunder', alt: 'The customer register in the ERP system: customers with country, sales rep, latest activity, revenue, contribution margin and active quotes', caption: 'The customer register shows revenue, contribution margin and active quotes for each customer.' },
				{ step: 'Material enquiry', shot: 'erp-materialforfragan', alt: 'A material enquiry: search hits among suppliers and past orders on the left, three material lines with dimensions, steel grade and weight in the middle, and the chosen supplier on the right', caption: 'One search goes through suppliers, past orders, quotes and products at the same time. The enquiry to the chosen suppliers is created in the same view.' },
				{ step: 'Quote', shot: 'erp-offert', alt: 'A quote with cost price, sales price and contribution margin on each line, and a freight shipment priced by Unifaun', caption: 'The quote calculates the contribution margin for each line and adds freight as a separate shipment at the carrier’s price.' },
				{ step: 'Orders and purchasing', shot: 'erp-order', alt: 'The order overview as a board with columns from purchasing to production, where each order shows its purchasing status, freight and comments', caption: 'The order overview follows every order from purchasing to delivery and flags anything that is about to run late.' },
				{ step: 'Stock and certificates', shot: 'erp-lager', alt: 'Traceability for one heat number: received from the supplier and picked for five orders', caption: 'Traceability follows a heat number from goods receipt to every order the material was picked for. That decides which certificate the customer gets.' },
				{ step: 'Transport', shot: 'erp-transport', alt: 'A booked transport in freight planning: delivery date, weight and order value at the top, customer, supplier and freight legs with carrier, pickup, unloading and cost, plus goods receipts, items and comments', caption: 'A booked transport keeps customer, supplier, freight legs, goods receipts and comments in one place, with the list of all bookings next to it.' },
				{ step: 'Accounting', row: 'integrationer' }
			],
			shotLink: (step: string) => `${step} screenshot, opens full size in a new tab`,
			dot: (n: number, total: number, step: string) => `Image ${n} of ${total}: ${step}`,
			play: 'Start the slideshow',
			pause: 'Pause the slideshow',
			note: 'The screenshots come from the test environment, and all data in them is made up. The system can only be reached through the company VPN, so you see screenshots here instead of a demo.',
			story: [
				{ label: 'Starting point', text: 'Quotes were made in Excel, and the same details were typed in several times. There was no single place to see where a case stood.' },
				{ label: 'The start', text: 'As a salesperson, I first automated quoting, moving it from Excel and VBA to a web flow connected to Fortnox. Today’s system grew out of it.' },
				{ label: 'My role', text: 'Product owner, sole developer and project lead for the rollout: requirements, data model, development, testing, training and the switch from the old system.' },
				{ label: 'Integrations', id: 'integrationer', text: 'Fortnox, Shiplink, Unifaun/nShift and Microsoft 365. Orders, stock and purchasing flow into Fortnox without double entry, and freight is booked straight from the order.' },
				{ label: 'AI assistant', text: 'Answers colleagues’ questions about orders, stock, materials and routines. Once the user confirms, it can also create customers and turn enquiries into quotes.' },
				{ label: 'Technology', text: 'SvelteKit, TypeScript, FastAPI, Python, MySQL and Docker.' }
			]
		},
		side: {
			title: 'Personal projects',
			projects: [
				{ name: 'Smart home', text: 'Home Assistant with 232 devices, 161 automations and 16 rooms, over Zigbee, Matter/Thread and MQTT. The automations connect lighting, heat pumps and Nord Pool electricity prices.' },
				{ name: 'Hemma', text: 'A custom dashboard in SvelteKit and FastAPI that the family uses to run the home from phone and tablet, with push notifications and roles for family and guests. Its AI assistant proposes actions as buttons, and the app only carries out the one someone taps. Every proposal is checked against the house’s own lights, switches, scenes and scripts.' },
				{ name: 'Household finances', text: 'A web app in SvelteKit, FastAPI and SQLite that pulls transactions from Toshl and tracks budget, savings goals and loans. It runs on a home server with a nightly reconciliation. Its own MCP server with 24 tools lets an AI assistant read the finances, check whether a purchase fits and recategorize purchases.' },
				{ name: 'Majo', text: 'I’m continuing to develop Majo, an Android\u00A0TV app that plays movies and shows from the user’s own Plex, Jellyfin and Emby servers. An LLM translates the subtitles while the movie plays. I’ve made a new TV interface with tactile focus. Agents build and publish new versions when I ask, and the app then offers them on the TV.' }
			],
			hemma: {
				views: [
					{ name: 'Home', shot: 'hemma-hem', alt: 'The Hemma home screen on a tablet: the dryer and the dishwasher are done, indoor and outdoor temperature, and scenes such as Morning, Movie and Good night' },
					{ name: 'Rooms', shot: 'hemma-rum', alt: 'Rooms in Hemma: the living room opens, one lamp is switched off and another is dimmed from 36 to 10 percent' },
					{ name: 'Climate', shot: 'hemma-klimat', alt: 'Climate in Hemma: indoor and outdoor temperature, humidity, the heat pump and hot water, with graphs' }
				],
				link: (view: string) => `Hemma screenshot, ${view.toLowerCase()}, opens full size in a new tab`,
				caption: 'Hemma on a tablet. It runs locally and is connected to Home Assistant.'
			}
		}
	},

	about: {
		title: 'About Magnus Lixenstrand – from sales to systems development',
		description: 'Magnus Lixenstrand spent twelve years in sales and built an ERP system that is used every day. About his background and skills.',
		hero: {
			title: 'Twelve years in sales, now a systems developer',
			lede: 'My years in sales taught me where work gets stuck. Today I own Nordic Metal Trade’s ERP system, from requirements to operations.'
		},
		why: {
			title: 'Why I started building systems',
			text: ['As a salesperson, I lost a lot of time to duplicate work in systems that didn’t talk to each other. Eventually I started building the tools I was missing myself.']
		},
		erp: {
			title: 'The ERP system',
			text: [
				'At Nordic Metal Trade, I started by automating the quote flow. That was the beginning of the company’s ERP system, which I then planned and built. The system covers CRM, material enquiries, quotes, orders, purchasing, stock, certificates and transport, and is connected to Fortnox, Shiplink, Unifaun/nShift and Microsoft 365.',
				'I’m the product owner and sole developer, and I was project lead for the rollout: testing, training and the switch from the old system.'
			],
			result: { before: 'The system has ', strong: 'about ten users and saves the team more than 20 hours a week', after: '.' }
		},
		path: {
			title: 'How I got here',
			dev: 'Development and automation',
			sales: 'Sales and business',
			career: [
				{
					period: 'Jul 2019–present',
					org: 'Nordic Metal Trade AB',
					track: 'both',
					titles: ['Systems Developer and System Owner, Aug 2025–present', 'B2B Sales Representative, also responsible for development, Jul 2019–Jul 2025 (80% sales, 20% development)'],
					text: 'Planned and built the company’s ERP system, and today I’m its product owner and sole developer. As a salesperson, I accounted for roughly half of the company’s sales in 2021.'
				},
				{
					period: 'Oct 2017–Aug 2019',
					org: 'AD infinitum recycling',
					track: 'sales',
					titles: ['Business Developer, waste management'],
					text: 'Mapped companies’ waste flows and sold solutions that lowered their costs, from first call to contract.'
				},
				{ period: 'Jan–Sep 2017', org: '3 Sverige', track: 'sales', titles: ['B2B Sales Specialist, based in Cyprus'] },
				{ period: 'Oct 2015–Dec 2016', org: 'Travel in Asia and Australia', track: 'pause', titles: ['Career break with temporary work in hospitality'] },
				{
					period: 'Jan 2013–Oct 2015',
					org: 'Eniro',
					track: 'both',
					titles: ['Senior Sales Lead and System Ambassador'],
					text: 'Three promotions in under three years. Led the team whenever the manager was away. Led the local rollout of a new Google-based business system and trained colleagues to work with it.'
				},
				{ period: 'Feb 2009–Jun 2011', org: 'Sveacom AB', track: 'sales', titles: ['Telesales Representative'] }
			]
		},
		skills: {
			title: 'Skills',
			items: [
				{ area: 'Development', items: 'Python, FastAPI, Flask, SvelteKit, TypeScript, MySQL, REST APIs, VBA' },
				{ area: 'Operations and integration', items: 'Docker, Linux, Google Cloud, GitHub Actions, Fortnox, Microsoft 365, n8n' },
				{ area: 'AI', items: 'Claude Code, Codex, agent workflows with code review, AI assistants' },
				{ area: 'Business process', items: 'Requirements analysis, process mapping, project management, system rollout, user support' },
				{ area: 'Commercial', items: 'B2B sales, negotiation, procurement, budgeting' },
				{ area: 'Languages', items: 'Swedish (native), English (fluent)' }
			]
		},
		spare: {
			title: 'Outside work',
			text: [
				'At home I run Home Assistant with 232 devices and 161 automations that connect lighting, heat pumps and electricity prices, among other things. The family controls it from a custom dashboard.',
				'I live in Jönköping, like to travel with my partner and run to keep my head clear.'
			]
		}
	}
};
