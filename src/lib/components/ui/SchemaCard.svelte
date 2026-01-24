<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { SchemaItem } from '../../types';
	import { extractDominantColor } from '../../utils/color';

	export let schema: SchemaItem;
	export let delay: number = 0;
	export let dominantColor: string = '#ffffff';

	$: dominantColorRGBA =
		dominantColor.startsWith('rgb')
			? dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.4)')
			: dominantColor;

	let cardElement: HTMLElement;

	async function initColorExtraction() {
		if (schema.image) {
			dominantColor = await extractDominantColor(schema.image);
		}
	}

	// Initialize color extraction when component mounts
	(async () => {
		await initColorExtraction();
	})();
</script>

<article
	bind:this={cardElement}
	style="--overlay-color: {dominantColorRGBA};"
	class="group relative flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border p-2 text-gray-700"
	in:fly={{ x: -50, duration: 600, delay }}
>
	<!-- background layer -->
	<div
		class="pointer-events-none absolute inset-0 z-1 scale-90 backdrop-blur-[2px] rounded-xl transition-all duration-300 group-hover:scale-102 group-hover:shadow-xl group-hover:bg-[var(--overlay-color)]"
	></div>

	<div class="relative z-10">
		{#if schema.image}
			<img
				src={schema.image}
				alt={schema.name}
				class="h-48 w-full rounded-xl object-cover"
				on:load={initColorExtraction}
			/>
		{:else}
			<div class="h-48 w-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
				<svg class="h-16 w-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
				</svg>
			</div>
		{/if}
		
		<div class="p-4">
			<h3 class="mb-2 text-xl font-bold text-gray-900">{schema.name}</h3>
			<p class="mb-3 text-gray-600">{schema.description}</p>
			<div class="flex items-center justify-between text-sm text-gray-500 mb-3">
				<span class="flex items-center">
					<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					{schema.duration}
				</span>
				<span class="font-semibold text-blue-600">Rp {schema.fee.toLocaleString('id-ID')}</span>
			</div>
			{#if schema.competencies?.length > 0}
				<div class="flex flex-wrap gap-1">
					{#each schema.competencies.slice(0, 3) as competency}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							{competency}
						</span>
					{/each}
					{#if schema.competencies.length > 3}
						<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
							+{schema.competencies.length - 3} lainnya
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</article>