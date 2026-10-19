import { sv } from './sv';

// Swedish is served at the root paths; another language gets its own prefix, like /en
const languages = { sv };

export type Lang = keyof typeof languages;
export type Content = typeof sv;

/** The language a page is served in, read from its path */
export function langOf(pathname: string): Lang {
	const prefix = pathname.split('/')[1];
	return Object.hasOwn(languages, prefix) ? (prefix as Lang) : 'sv';
}

/** Every text on the site in one language */
export function content(lang: Lang): Content {
	return languages[lang];
}
