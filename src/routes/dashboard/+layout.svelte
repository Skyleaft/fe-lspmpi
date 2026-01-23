<script lang="ts">
	let { children } = $props();
</script>

<main class="dashboard-content">
	{@render children?.()}
</main>

<style>
	.dashboard-content {
		margin-left: 280px; /* Margin for sidebar width */
		padding: 1rem;
		min-height: 100vh;
	}

	@media (max-width: 1024px) {
		.dashboard-content {
			margin-left: 0; /* No margin on mobile */
		}
	}
</style>
