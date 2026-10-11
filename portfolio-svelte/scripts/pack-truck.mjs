import assert from 'node:assert/strict';
import { join } from 'node:path';
import sharp from 'sharp';

const directory = process.argv[2];
assert(directory, 'Usage: node scripts/pack-truck.mjs <render-directory>');
const frames = Array.from({ length: 24 }, (_, i) =>
	join(directory, `truck-${String(i + 1).padStart(4, '0')}.png`)
);
for (const file of frames) {
	const { width, height, hasAlpha } = await sharp(file).metadata();
	assert.equal(width, 720);
	assert.equal(height, 240);
	assert(hasAlpha, 'The truck must have a transparent background');
}
const first = await sharp(frames[0]).raw().toBuffer();
const second = await sharp(frames[1]).raw().toBuffer();
assert(!first.equals(second), 'The rendered wheels must move');
assert(first.some((value, i) => i % 4 === 3 && value === 0), 'The canvas must retain transparency');
// A duplicate endpoint keeps reverse CSS playback inside the sprite sheet.
frames.push(frames[0]);
await sharp({ create: { width: 720, height: 240 * frames.length, channels: 4,
	background: { r: 0, g: 0, b: 0, alpha: 0 } } })
	.composite(frames.map((input, i) => ({ input, left: 0, top: i * 240 })))
	.webp({ quality: 88, alphaQuality: 100 })
	.toFile('static/images/truck/scania-drive.webp');
await sharp(join(directory, 'preview.png'))
	.flatten({ background: '#f7fafb' })
	.webp({ quality: 92 })
	.toFile('static/images/truck/scania-preview.webp');
console.log('Packed 24 Blender frames + loop endpoint into scania-drive.webp');
