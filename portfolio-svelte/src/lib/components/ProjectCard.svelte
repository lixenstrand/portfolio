<script lang="ts">
	interface ProjectCardProps {
		id: string;
		label?: string;
		title: string;
		tagline: string;
		descriptionParagraphs: string[];
		technologies: string[];
		image: {
			src: string;
			srcWebp?: string;
			alt: string;
		};
		imageDirection?: 'left' | 'right';
	}

	let {
		id,
		label,
		title,
		tagline,
		descriptionParagraphs,
		technologies,
		image,
		imageDirection = 'left'
	}: ProjectCardProps = $props();

	const textDirection = imageDirection === 'left' ? 'right' : 'left';
</script>

<article {id}>
	<div class="text">
		{#if label}
			<p class="project-label" data-aos="fade-{textDirection}" data-aos-delay="0">{label}</p>
		{/if}
		<h2 data-aos="fade-{textDirection}" data-aos-delay={label ? "100" : "0"}>{title}</h2>
		<p class="project-tagline" data-aos="fade-{textDirection}" data-aos-delay={label ? "200" : "100"}>{tagline}</p>

		<div class="blackBox" data-aos="fade-up" data-aos-delay={label ? "300" : "200"}>
			{#each descriptionParagraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<h3 data-aos="fade-{textDirection}" data-aos-delay={label ? "400" : "300"}>teknologier som används:</h3>
		<ul data-aos="fade-{textDirection}" data-aos-delay={label ? "450" : "350"}>
			{#each technologies as tech, i}
				<li>{tech}{i < technologies.length - 1 ? ' |' : ''}</li>
			{/each}
		</ul>
	</div>

	{#if image.srcWebp}
		<picture>
			<source type="image/webp" srcset={image.srcWebp}>
			<img
				src={image.src}
				alt={image.alt}
				loading="lazy"
				width="1200"
				height="800"
				data-aos="fade-{imageDirection}"
				data-aos-delay={label ? "200" : "150"} />
		</picture>
	{:else}
		<img
			src={image.src}
			alt={image.alt}
			loading="lazy"
			width="1200"
			height="800"
			data-aos="fade-{imageDirection}"
			data-aos-delay={label ? "200" : "150"} />
	{/if}
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 4rem;
		padding: 2rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.02);
		transition: all 0.3s ease;
	}

	@media (min-width: 850px) {
		article {
			grid-template-columns: 1fr 1fr;
			gap: 3rem;
			padding: 3rem;
		}
	}

	article:hover {
		background: rgba(255, 255, 255, 0.04);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.project-label {
		color: var(--aqua);
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: clamp(1.8rem, 4vw, 2.5rem);
		margin-bottom: 1rem;
		color: var(--white);
		line-height: 1.2;
	}

	.project-tagline {
		color: var(--aqua);
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	.blackBox {
		background: linear-gradient(135deg, var(--dkblue) 0%, var(--plum) 100%);
		border: 2px solid var(--aqua);
		padding: 1.5rem;
		border-radius: 15px;
		margin-bottom: 1.5rem;
		box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
		transition: all 0.3s ease;
	}

	.blackBox p {
		color: var(--white);
		line-height: 1.7;
		margin-bottom: 1rem;
		font-size: 1rem;
	}

	.blackBox p:last-child {
		margin-bottom: 0;
	}

	h3 {
		font-size: 1rem;
		color: var(--aqua);
		margin-bottom: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: 600;
		font-family: var(--mono);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		color: var(--white);
		font-size: 0.95rem;
		font-weight: 500;
		font-family: var(--mono);
	}

	picture,
	img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	article:hover picture,
	article:hover img {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 849px) {
		article {
			grid-template-columns: 1fr;
		}

		picture,
		img {
			order: 2;
		}

		.text {
			order: 1;
		}
	}
</style>
