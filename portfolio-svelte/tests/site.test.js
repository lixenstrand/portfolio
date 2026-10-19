// @ts-nocheck -- a plain Node script, and the repo has no Node types (no new dependencies)
// Checks the built site as it is served: only what a visitor, a screen reader or a search engine gets.
// `npm test` builds first. Set BASE_URL to check a server that is already running instead.
import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';

const site = 'https://magnuslixenstrand.com';

// Every page in both languages: Swedish at the root paths, English under /en
const versions = [
	{ sv: '/', en: '/en' },
	{ sv: '/about', en: '/en/about' }
];
const pages = versions.flatMap((page) => ['sv', 'en'].map((lang) => ({ path: page[lang], lang, ...page })));
const homePages = pages.filter((page) => page.sv === '/');
const otherByLang = { sv: 'en', en: 'sv' };

const localeByLang = { sv: 'sv_SE', en: 'en_US' };

// The Yrkestitel, the title Magnus is presented with everywhere (CONTEXT.md)
const jobTitleByLang = { sv: 'AI-utvecklare', en: 'AI Engineer' };

const previewByLang = {
	sv: '/images/og-magnus-lixenstrand-sv.jpg',
	en: '/images/og-magnus-lixenstrand-en.jpg'
};

const cvByLang = {
	sv: '/cv/magnus_lixenstrand_cv_2026.pdf',
	en: '/cv/magnus_lixenstrand_cv_2026_en.pdf'
};

// Tailscale's address space: 100.64.0.0/10, fd7a:115c:a1e0::/48 and tailnet names under ts.net
const tailscale = /\b100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}\b|\bfd7a:115c:a1e0:|\.ts\.net\b/i;

// Internal names that must never reach the site: one per line, case-insensitive, kept out of Git
const blocklistFile = new URL('../../.private/spärrord.txt', import.meta.url);
const blocklist = existsSync(blocklistFile)
	? readFileSync(blocklistFile, 'utf8').split('\n').map((line) => line.trim().toLowerCase()).filter(Boolean)
	: null;

let base = process.env.BASE_URL;
let server;

before(async () => {
	if (base) return;
	const port = await freePort();
	server = spawn(process.execPath, ['build'], {
		cwd: new URL('..', import.meta.url),
		env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
		stdio: 'inherit'
	});
	base = `http://127.0.0.1:${port}`;
	await waitForServer(base);
});

after(() => server?.kill());

for (const { path, lang, sv, en } of pages) {
	test(`${path} is served in ${lang}`, async () => {
		const html = await get(path);
		assert.equal(html.match(/<html\b[^>]*\blang="([^"]*)"/)?.[1], lang);
	});

	// Search engines show the version in the searcher's language; Swedish is the default
	test(`${path} names its own URL and the page in each language`, async () => {
		const head = tags(await get(path), 'link');
		const alternates = Object.fromEntries(head.filter((l) => l.rel === 'alternate').map((l) => [l.hreflang, l.href]));
		assert.deepEqual(alternates, { sv: site + sv, en: site + en, 'x-default': site + sv });
		assert.equal(head.find((l) => l.rel === 'canonical')?.href, site + path);
	});

	test(`${path} is shared as ${localeByLang[lang]}`, async () => {
		const meta = tags(await get(path), 'meta');
		assert.equal(meta.find((m) => m.property === 'og:locale')?.content, localeByLang[lang]);
		assert.equal(meta.find((m) => m.property === 'og:url')?.content, site + path);
	});

	test(`${path} is shared with the preview image in ${lang}`, async () => {
		const meta = tags(await get(path), 'meta');
		for (const key of ['og:image', 'twitter:image']) {
			assert.equal(meta.find((m) => m.property === key || m.name === key)?.content, site + previewByLang[lang], key);
		}
		const res = await fetch(base + previewByLang[lang]);
		assert.equal(res.status, 200, `${previewByLang[lang]} answers ${res.status}`);
		assert.equal(res.headers.get('content-type'), 'image/jpeg');
	});

	test(`${path} switches to the same page in ${otherByLang[lang]}`, async () => {
		const switches = links(await get(path)).filter((a) => a.hreflang);
		const to = otherByLang[lang];
		assert.deepEqual(switches.map((a) => ({ href: a.href, hreflang: a.hreflang, lang: a.lang })), [{ href: { sv, en }[to], hreflang: to, lang: to }]);
	});

	// Only the language switcher leaves the page's language
	test(`${path} links to the site's pages in ${lang}`, async () => {
		const sitePages = versions.flatMap((page) => [page.sv, page.en]);
		const pageLinks = links(await get(path)).filter((a) => !a.hreflang && sitePages.includes(a.href?.split('#')[0]));
		assert.ok(pageLinks.length, 'no links to the site\'s pages');
		for (const a of pageLinks) assert.ok(versions.some((page) => page[lang] === a.href.split('#')[0]), `"${a.href}" is not in ${lang}`);
	});

	// A CV link opens the CV in the language the link is written in: the page's, unless the link says otherwise
	test(`${path} links to the CV in each link's language`, async () => {
		const cvLinks = links(await get(path)).filter((a) => a.href?.startsWith('/cv/'));
		assert.ok(cvLinks.some((a) => !a.lang), `no CV link in ${lang}`);
		for (const a of cvLinks) {
			const linkLang = a.lang ?? lang;
			assert.equal(new URL(a.href, base).pathname, cvByLang[linkLang], `CV link "${a.href}" (${linkLang})`);
			const res = await fetch(base + a.href);
			assert.equal(res.status, 200, `${a.href} answers ${res.status}`);
			assert.equal(res.headers.get('content-type'), 'application/pdf');
		}
	});

	test(`${path} shows no Tailscale address`, async () => {
		assert.equal((await served(path)).match(tailscale)?.[0], undefined);
	});

	test(`${path} contains no word from the local blocklist`, { skip: !blocklist && 'no .private/spärrord.txt' }, async () => {
		const text = (await served(path)).toLowerCase();
		assert.deepEqual(blocklist.filter((word) => text.includes(word)), []);
	});
}

for (const { path, lang } of homePages) {
	test(`${path} is headed by Magnus' name`, async () => {
		const headings = [...(await get(path)).matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, inner]) => text(inner));
		assert.deepEqual(headings, ['Magnus Lixenstrand']);
	});

	// What a search hit or a shared link shows
	test(`${path} is titled with the name and the Yrkestitel in ${lang}`, async () => {
		const html = await get(path);
		const meta = tags(html, 'meta');
		const content = (key) => meta.find((m) => m.name === key || m.property === key)?.content;
		const snippets = {
			title: text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''),
			...Object.fromEntries(['description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'].map((key) => [key, content(key)]))
		};
		for (const [key, value] of Object.entries(snippets)) {
			assert.ok(value?.includes('Magnus Lixenstrand'), `${key} "${value}" lacks the name`);
			assert.ok(value.includes(jobTitleByLang[lang]), `${key} "${value}" lacks "${jobTitleByLang[lang]}"`);
		}
	});

	test(`${path} gives search engines the Yrkestitel in ${lang}`, async () => {
		const data = [...(await get(path)).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
		const person = data.find((item) => item['@type'] === 'Person');
		assert.equal(person?.name, 'Magnus Lixenstrand');
		assert.equal(person.jobTitle, jobTitleByLang[lang]);
	});
}

test('the sitemap lists every page with its version in each language', async () => {
	const urls = [...(await get('/sitemap.xml')).matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, url]) => ({
		loc: url.match(/<loc>([^<]*)<\/loc>/)?.[1],
		alternates: Object.fromEntries(tags(url, 'xhtml:link').map((l) => [l.hreflang, l.href]))
	}));
	assert.deepEqual(urls.map((url) => url.loc).sort(), pages.map((page) => site + page.path).sort());
	for (const { path, sv, en } of pages) {
		const url = urls.find((url) => url.loc === site + path);
		assert.deepEqual(url.alternates, { sv: site + sv, en: site + en, 'x-default': site + sv }, path);
	}
});

// The truck's frames, the road and the fonts are only named in the stylesheets
test('every file the stylesheets use is served', async () => {
	const sheets = tags(await get('/'), 'link').filter((l) => l.rel === 'stylesheet').map((l) => l.href);
	const files = new Set();
	for (const sheet of sheets) {
		for (const [, url] of (await get(sheet)).matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
			const file = new URL(url, base + sheet);
			if (file.protocol !== 'data:') files.add(file.pathname + file.search);
		}
	}
	assert.ok(files.size, 'no files in the stylesheets');
	for (const file of files) {
		const res = await fetch(base + file);
		assert.equal(res.status, 200, `${file} answers ${res.status}`);
	}
});

test('the old CV address leads to the Swedish CV', async () => {
	const res = await fetch(base + '/cv/magnus_lixenstrand_cv.pdf', { redirect: 'manual' });
	assert.equal(res.status, 301);
	assert.equal(new URL(res.headers.get('location'), base).pathname, cvByLang.sv);
});

// The attributes of every link on the page
function links(html) {
	return tags(html, 'a');
}

// The attributes of every tag with this name
function tags(html, name) {
	return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'g'))].map(([, attrs]) =>
		Object.fromEntries([...attrs.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value]))
	);
}

// The text in a piece of HTML, as a reader gets it
function text(html) {
	return html.replace(/<!--[\s\S]*?-->|<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// What a visitor downloads for the page: the HTML and the scripts it loads, where the texts not yet shown live
async function served(path) {
	const html = await get(path);
	const scripts = [...new Set(html.match(/\/_app\/immutable\/[\w./-]+\.js/g))];
	return [html, ...(await Promise.all(scripts.map(get)))].join('\n');
}

async function get(path) {
	const res = await fetch(base + path);
	assert.equal(res.status, 200, `${path} answers ${res.status}`);
	return res.text();
}

function freePort() {
	return new Promise((resolve, reject) => {
		const probe = createServer().listen(0, '127.0.0.1', () => {
			const { port } = probe.address();
			probe.close(() => resolve(port));
		});
		probe.on('error', reject);
	});
}

async function waitForServer(url) {
	for (let tries = 0; tries < 100; tries++) {
		if (server.exitCode !== null) throw new Error(`the server exited with ${server.exitCode}`);
		try {
			await fetch(url);
			return;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}
	throw new Error(`no answer from ${url} after 10 s`);
}
