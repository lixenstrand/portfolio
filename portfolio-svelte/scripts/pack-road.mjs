import assert from 'node:assert/strict';
import sharp from 'sharp';

const input = '/tmp/magnus-road.png';
const { width, height, hasAlpha } = await sharp(input).metadata();
assert.equal(width, 384);
assert.equal(height, 192);
assert(hasAlpha, 'Road edges must remain transparent');
await sharp(input).webp({ quality: 90 }).toFile('static/images/truck/road.webp');
await sharp(input).rotate(90).webp({ quality: 90 }).toFile('static/images/truck/road-vertical.webp');
