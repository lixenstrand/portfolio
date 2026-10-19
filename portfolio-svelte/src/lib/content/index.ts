import { page } from '$app/state';
import { en } from './en';
import { sv } from './sv';

// Swedish is served at the root paths; another language gets its own prefix, like /en
const languages = { sv, en };
type Lang = keyof typeof languages;

const site = 'https://magnuslixenstrand.com';

// Every page, at its path in each language
const pages = {
	home: { sv: '/', en: '/en' },
	about: { sv: '/about', en: '/en/about' }
};
type Page = keyof typeof pages;

// The language a page is served in, read from its path
export function langOf(pathname: string): Lang {
	const prefix = pathname.split('/')[1];
	return Object.hasOwn(languages, prefix) ? (prefix as Lang) : 'sv';
}

// Every text on the site, in the language of the page being shown; read it in $derived to follow navigation
export function texts() {
	return languages[langOf(page.url.pathname)];
}

// A page's path in the language being shown
export function pathTo(name: Page) {
	return pages[name][langOf(page.url.pathname)];
}

// The page being shown at its full address, its own and in each language
export function versions() {
	const paths = pages[shown()];
	return { own: site + paths[langOf(page.url.pathname)], sv: site + paths.sv, en: site + paths.en };
}

// The page being shown in the other language
export function switcher() {
	const lang: Lang = langOf(page.url.pathname) === 'sv' ? 'en' : 'sv';
	return { lang, name: languages[lang].language, href: pages[shown()][lang] };
}

// The page being shown; an error page counts as the home page
function shown(): Page {
	const lang = langOf(page.url.pathname);
	return (Object.keys(pages) as Page[]).find((name) => pages[name][lang] === page.url.pathname) ?? 'home';
}
