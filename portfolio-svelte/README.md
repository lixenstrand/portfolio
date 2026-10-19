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

Bygger sajten, startar den byggda servern och kontrollerar de serverade sidorna med Nodes inbyggda testkörare: `lang`, CV-länkar och en innehållsspärr mot Tailscale-adresser och orden i `../.private/spärrord.txt` (ett per rad, ignoreras av Git). Saknas filen hoppas just den kontrollen över. Med `BASE_URL=https://… node --test tests/*.test.js` körs kontrollerna mot en server som redan är igång.

Alla texter som behöver översättas ligger i `src/lib/content/sv.ts` och hämtas med `texts()` från `$lib/content`.
