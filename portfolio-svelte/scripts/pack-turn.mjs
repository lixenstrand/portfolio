import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const directory = process.argv[2];
assert(directory, 'Usage: node scripts/pack-turn.mjs <render-directory>');
const turn = JSON.parse(readFileSync(join(directory, 'turn.json'), 'utf8'));
const frame = (name, i) => join(directory, `${name}-${String(i + 1).padStart(4, '0')}.png`);

// Driving both ways: 24 wheel poses plus the first again, so 24 CSS steps roll a full turn
for (const [side, file] of [['right', 'scania-drive'], ['left', 'scania-drive-left']]) {
	const frames = Array.from({ length: 24 }, (_, i) => frame(side, i));
	for (const file of frames) {
		const { width, height, hasAlpha } = await sharp(file).metadata();
		assert.equal(width, 720);
		assert.equal(height, 240);
		assert(hasAlpha, 'The truck must have a transparent background');
	}
	frames.push(frames[0]);
	await sharp({ create: { width: 720, height: 240 * frames.length, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
		.composite(frames.map((input, i) => ({ input, left: 0, top: i * 240 })))
		.webp({ quality: 88, alphaQuality: 100 })
		.toFile(`static/images/truck/${file}.webp`);
}

// The turn starts where the right-facing frames are and ends where the left-facing ones are
const [width, height] = turn.pixels;
async function alpha(file, region) {
	return sharp(file).extract(region).ensureAlpha().extractChannel(3).raw().toBuffer();
}
async function matches(turnFrame, driveFrame, left) {
	// Compare where the two canvases overlap
	const top = Math.round(-turn.top * 720);
	const x0 = Math.max(0, left), x1 = Math.min(width, left + 720);
	const inTurn = { left: x0, top, width: x1 - x0, height: 240 };
	const inDrive = { left: x0 - left, top: 0, width: x1 - x0, height: 240 };
	const [a, b] = await Promise.all([alpha(turnFrame, inTurn), alpha(driveFrame, inDrive)]);
	return a.reduce((sum, value, i) => sum + Math.abs(value - b[i]), 0) / a.length;
}
const start = Math.round(-turn.left * 720);
const last = turn.frames - 1;
assert((await matches(frame('turn', 0), frame('right', 0), start)) < 4, 'The turn must start on the right-facing truck');
assert((await matches(frame('turn', last), frame('left', 0), Math.round(start - turn.shift * 720))) < 4, 'The turn must end on the left-facing truck');

// Half size, in a grid: the turn is shown about a tenth of this size
const cell = { width: width / 2, height: height / 2 };
const columns = 4;
const rows = Math.ceil(turn.frames / columns);
const cells = await Promise.all(Array.from({ length: turn.frames }, (_, i) => sharp(frame('turn', i)).resize(cell).png().toBuffer()));
await sharp({ create: { width: cell.width * columns, height: cell.height * rows, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
	.composite(cells.map((input, i) => ({ input, left: (i % columns) * cell.width, top: Math.floor(i / columns) * cell.height })))
	.webp({ quality: 82, alphaQuality: 90, effort: 6 })
	.toFile('static/images/truck/scania-turn.webp');

// The side road: each row brought to the road tile's asphalt colour, so the far end is not lit
// darker than where it meets the road; it fades out over its far third, like a road leading away
const road = await sharp(join(directory, 'spur.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data: pixels, info: size } = road;
const asphalt = [176, 180, 184]; // road.webp's asphalt
const medians = Array.from({ length: size.height }, (_, y) => {
	const values = [[], [], []];
	for (let x = 0; x < size.width; x++) {
		const i = (y * size.width + x) * 4;
		if (pixels[i + 3] > 250) for (let c = 0; c < 3; c++) values[c].push(pixels[i + c]);
	}
	return values[0].length ? values.map((v) => v.sort((a, b) => a - b)[v.length >> 1]) : undefined;
});
const solid = medians.flatMap((median, y) => (median ? [y] : []));
const [near, far] = [solid.at(-1), solid[0]];
const fade = (near - far) / 3;
// The lowest row the road shows in, where it grows from
const bottom = Math.floor(pixels.findLastIndex((value, i) => i % 4 === 3 && value > 0) / 4 / size.width);
for (let y = 0; y < size.height; y++) {
	const median = medians[Math.min(Math.max(y, far), near)] ?? asphalt;
	const opacity = Math.min(1, (y - far) / fade);
	for (let x = 0; x < size.width; x++) {
		const i = (y * size.width + x) * 4;
		for (let c = 0; c < 3; c++) pixels[i + c] = Math.min(255, (pixels[i + c] * asphalt[c]) / median[c]);
		pixels[i + 3] *= Math.max(0, opacity);
	}
}
await sharp(pixels, { raw: { width: size.width, height: size.height, channels: 4 } })
	.resize(cell)
	.webp({ quality: 90, alphaQuality: 100 })
	.toFile('static/images/truck/side-road.webp');

writeFileSync('src/lib/truck-turn.json', JSON.stringify({
	frames: turn.frames,
	fps: turn.fps,
	columns,
	rows,
	// The turn's canvas, in widths of the drive frames, from the drive frames' top left corner
	left: turn.left,
	top: turn.top,
	width: turn.width,
	height: turn.height,
	// How far left the truck's midpoint ends, in widths of the drive frames
	shift: turn.shift,
	// Where the side road meets the road, as a fraction of the canvas height from the top
	roadBottom: (bottom + 1) / size.height
}, null, '\t') + '\n');
