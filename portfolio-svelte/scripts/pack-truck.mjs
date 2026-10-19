import assert from 'node:assert/strict';
import { join } from 'node:path';
import sharp from 'sharp';

// The large still for review; pack-turn.mjs packs the web frames
const directory = process.argv[2];
assert(directory, 'Usage: node scripts/pack-truck.mjs <render-directory>');
await sharp(join(directory, 'preview.png'))
	.flatten({ background: '#f7fafb' })
	.webp({ quality: 92 })
	.toFile('static/images/truck/scania-preview.webp');
