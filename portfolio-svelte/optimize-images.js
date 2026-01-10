import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, 'static', 'images');

async function optimizeHeroImage() {
	const inputPath = join(imagesDir, 'IMG_0830.jpg');
	const outputJpgPath = join(imagesDir, 'IMG_0830_optimized.jpg');
	const outputWebpPath = join(imagesDir, 'IMG_0830.webp');

	console.log('Optimizing hero image...');

	// Optimize JPEG - reduce quality and resize if needed
	await sharp(inputPath)
		.jpeg({ quality: 82, progressive: true })
		.resize(1200, 1200, { fit: 'cover' })
		.toFile(outputJpgPath);

	// Create WebP version
	await sharp(inputPath)
		.resize(1200, 1200, { fit: 'cover' })
		.webp({ quality: 85 })
		.toFile(outputWebpPath);

	// Create small thumbnail
	const outputThumbJpgPath = join(imagesDir, 'IMG_0830_200_optimized.jpg');
	const outputThumbWebpPath = join(imagesDir, 'IMG_0830_200.webp');

	await sharp(inputPath)
		.jpeg({ quality: 80, progressive: true })
		.resize(200, 200, { fit: 'cover' })
		.toFile(outputThumbJpgPath);

	await sharp(inputPath)
		.resize(200, 200, { fit: 'cover' })
		.webp({ quality: 80 })
		.toFile(outputThumbWebpPath);

	console.log('✓ Hero image optimized');
	console.log('  - Created:', outputJpgPath);
	console.log('  - Created:', outputWebpPath);
	console.log('  - Created:', outputThumbJpgPath);
	console.log('  - Created:', outputThumbWebpPath);
}

async function optimizeProjectImages() {
	const projectImages = [
		'homeassistant.png',
		'Inquiry.png',
		'excel.jpg',
		'CRM.png'
	];

	console.log('\nOptimizing project images...');

	for (const image of projectImages) {
		const inputPath = join(imagesDir, image);
		const ext = image.split('.').pop();
		const name = image.replace(`.${ext}`, '');
		const outputWebpPath = join(imagesDir, `${name}.webp`);

		try {
			await sharp(inputPath)
				.webp({ quality: 85 })
				.toFile(outputWebpPath);

			console.log(`  ✓ Created WebP for ${image}`);
		} catch (error) {
			console.log(`  ✗ Could not process ${image}:`, error.message);
		}
	}
}

async function main() {
	try {
		await optimizeHeroImage();
		await optimizeProjectImages();
		console.log('\n✓ All images optimized!');
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

main();
