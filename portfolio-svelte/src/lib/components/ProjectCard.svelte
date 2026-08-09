<script lang="ts">
	interface ProjectImage {
		src: string;
		srcWebp?: string;
		alt: string;
		caption?: string;
		fit?: 'cover' | 'contain';
		portrait?: boolean;
	}

	interface ProjectMetric {
		value: string;
		label: string;
	}

	interface ProjectCardProps {
		id: string;
		label?: string;
		title: string;
		tagline: string;
		descriptionParagraphs: string[];
		storyLabels?: string[];
		technologies: string[];
		capabilities?: string[];
		metrics?: ProjectMetric[];
		images: ProjectImage[];
		imageDirection?: 'left' | 'right';
		featured?: boolean;
		compact?: boolean;
	}

	let {
		id,
		label,
		title,
		tagline,
		descriptionParagraphs,
		storyLabels = ['Utgångsläge', 'Det jag byggde', 'Resultat', 'Åtkomst'],
		technologies,
		capabilities = [],
		metrics = [],
		images,
		imageDirection = 'left',
		featured = false,
		compact = false
	}: ProjectCardProps = $props();
</script>

<article {id} class="project-card" class:reverse={imageDirection === 'right'} class:featured class:compact>
	<header class="project-heading">
		{#if label}<p class="project-label">{label}</p>{/if}
		<h3>{title}</h3>
		<p class="project-tagline">{tagline}</p>

		{#if metrics.length}
			<div class="project-impact-summary">
				<p>Resultat i korthet</p>
				<dl class="project-impact">
					{#each metrics as metric}
						<div>
							<dt>{metric.value}</dt>
							<dd>{metric.label}</dd>
						</div>
					{/each}
				</dl>
			</div>
		{/if}
	</header>

	<div class="project-visual" class:multi={images.length > 1}>
		{#each images as image}
			<figure class="project-shot">
				{#if image.srcWebp}
					<picture>
						<source type="image/webp" srcset={image.srcWebp}>
						<img src={image.src} alt={image.alt} class:contain={image.fit === 'contain'} class:portrait={image.portrait} loading="lazy" width="2048" height="1027">
					</picture>
				{:else}
					<img src={image.src} alt={image.alt} class:contain={image.fit === 'contain'} class:portrait={image.portrait} loading="lazy" width="2048" height="1027">
				{/if}
				{#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
			</figure>
		{/each}
	</div>

	<div class="project-details">
		<dl class="project-story">
			{#each descriptionParagraphs as paragraph, index}
				<div class="story-part">
					<dt>{storyLabels[index] ?? 'Detalj'}</dt>
					<dd>{paragraph}</dd>
				</div>
			{/each}
		</dl>

		{#if capabilities.length}
			<div class="project-scope">
				<p>Systemet omfattar bland annat</p>
				<ul>{#each capabilities as capability}<li>{capability}</li>{/each}</ul>
			</div>
		{/if}

		<p class="project-tech-title">Teknik</p>
		<ul class="project-tech">
			{#each technologies as tech}<li>{tech}</li>{/each}
		</ul>
	</div>
</article>
