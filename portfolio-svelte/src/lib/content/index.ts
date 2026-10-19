import { page } from '$app/state';
import { sv } from './sv';

// Swedish is served at the root paths; another language gets its own prefix, like /en
const languages = { sv };
type Lang = keyof typeof languages;

// The language a page is served in, read from its path
export function langOf(pathname: string): Lang {
	const prefix = pathname.split('/')[1];
	return Object.hasOwn(languages, prefix) ? (prefix as Lang) : 'sv';
}

// Every text on the site, in the language of the page being shown; read it in $derived to follow navigation
export function texts() {
	return languages[langOf(page.url.pathname)];
}
