// Renders the preview images that shared links show, one per language, at 1200×630.
// Usage: node scripts/render-previews.mjs (needs Chromium; set CHROMIUM if it is not on the PATH)
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

// The same Yrkestitel, subtitle and proof as in src/lib/content, copied because Node cannot import those modules
const previews = {
	sv: {
		role: 'AI-utvecklare – LLM:er i verkliga affärsflöden',
		text: 'Affärssystemet jag byggde används varje dag av ungefär tio kollegor och sparar över 20 timmar i veckan.'
	},
	en: {
		role: 'AI Engineer – LLMs in real business workflows',
		text: 'The ERP system I built is used every day by about ten colleagues and saves more than 20 hours a week.'
	}
};

const dataUrl = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`;
const font = (file) => dataUrl(`static/fonts/${file}`, 'font/woff2');
const portrait = dataUrl('static/images/IMG_0830_optimized.jpg', 'image/jpeg');

const page = (lang, { role, text }) => `<!doctype html>
<html lang="${lang}">
<meta charset="utf-8">
<style>
	@font-face { font-family: 'Barlow Condensed'; font-weight: 700; src: url(${font('BarlowCondensed-700-normal-latin.woff2')}) format('woff2'); }
	@font-face { font-family: 'Barlow Condensed'; font-weight: 600; src: url(${font('BarlowCondensed-600-normal-latin.woff2')}) format('woff2'); }
	@font-face { font-family: 'Source Sans 3'; font-weight: 200 900; src: url(${font('SourceSans3-variable-latin.woff2')}) format('woff2'); }
	body { display: grid; grid-template-columns: 780px 420px; width: 1200px; height: 630px; margin: 0; overflow: hidden; background: oklch(0.97 0.006 235); }
	main { position: relative; padding: 76px 80px 0; }
	h1 { margin: 0; font: 700 100px/0.9 'Barlow Condensed'; letter-spacing: -0.01em; color: oklch(0.22 0.025 240); }
	.role { margin: 26px 0 0; font: 600 37px/1.15 'Barlow Condensed'; color: oklch(0.42 0.085 245); }
	.text { max-width: 620px; margin: 36px 0 0; font: 400 26px/1.42 'Source Sans 3'; color: oklch(0.4 0.025 240); }
	.site { position: absolute; left: 80px; bottom: 56px; margin: 0; font: 600 21px 'Source Sans 3'; color: oklch(0.4 0.025 240); }
	img { display: block; width: 420px; height: 630px; object-fit: cover; }
</style>
<main>
	<h1>Magnus<br>Lixenstrand</h1>
	<p class="role">${role}</p>
	<p class="text">${text}</p>
	<p class="site">magnuslixenstrand.com</p>
</main>
<img src="${portrait}" alt="">
</html>`;

const work = mkdtempSync(join(tmpdir(), 'previews-'));
try {
	for (const [lang, texts] of Object.entries(previews)) {
		const html = join(work, `${lang}.html`);
		const png = join(work, `${lang}.png`);
		writeFileSync(html, page(lang, texts));
		execFileSync(process.env.CHROMIUM ?? 'chromium', [
			'--headless',
			'--disable-gpu',
			'--hide-scrollbars',
			'--force-device-scale-factor=1',
			'--window-size=1200,630',
			'--virtual-time-budget=5000',
			`--screenshot=${png}`,
			`file://${html}`
		], { stdio: 'ignore' });
		const { width, height } = await sharp(png).metadata();
		assert.equal(width, 1200);
		assert.equal(height, 630);
		await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(`static/images/og-magnus-lixenstrand-${lang}.jpg`);
	}
} finally {
	rmSync(work, { recursive: true, force: true });
}
