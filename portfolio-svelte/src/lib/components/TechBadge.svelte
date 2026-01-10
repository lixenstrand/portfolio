<script lang="ts">
	let { tech }: { tech: string } = $props();
</script>

<span class="tech-badge">{tech}</span>

<style>
	.tech-badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(0, 217, 255, 0.15);
		border: 1px solid rgba(0, 217, 255, 0.4);
		border-radius: 20px;
		color: var(--aqua);
		font-family: var(--mono);
		font-size: 0.85rem;
		font-weight: 500;
		transition: all 0.3s ease;
		white-space: nowrap;
		cursor: default;
		user-select: none;
	}

	.tech-badge:hover {
		transform: translateY(-2px);
		background: rgba(0, 217, 255, 0.25);
		border-color: rgba(0, 217, 255, 0.6);
		box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
	}
</style>
