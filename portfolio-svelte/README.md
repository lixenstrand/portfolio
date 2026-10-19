# Portfolio frontend

SvelteKit-appen för [magnuslixenstrand.com](https://magnuslixenstrand.com/).

## Utveckling

```sh
npm install
npm run dev
```

## Produktionsbygge

```sh
npm run build
```

## Tester

```sh
npm test
```

Bygger sajten, startar den byggda servern och kontrollerar de serverade sidorna (`/`, `/about`, `/en`, `/en/about`) med Nodes inbyggda testkörare: `lang`, `hreflang`, kanonisk URL, `og:locale`, språkväxlaren, länkarnas språk, CV-länkar, sitemapen och en innehållsspärr mot Tailscale-adresser och orden i `../.private/spärrord.txt` (ett per rad, ignoreras av Git). Saknas filen hoppas just den kontrollen över. Med `BASE_URL=https://… node --test tests/*.test.js` körs kontrollerna mot en server som redan är igång.

Svenska serveras på rotsökvägarna och engelska under `/en`. Texterna ligger i `src/lib/content/sv.ts` och `en.ts` med samma nycklar och hämtas med `texts()` från `$lib/content`. Sidornas sökvägar per språk står i `$lib/content/index.ts`; en ny sida läggs till där, i `static/sitemap.xml` och i testets `versions`.
