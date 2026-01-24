<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { NewsItem } from '../../types';
	import { extractDominantColor } from '../../utils/color';

	export let news: NewsItem;
	export let delay: number = 0;
	export let dominantColor: string = '#ffffff';

	$: dominantColorRGBA =
	dominantColor.startsWith('rgb')
		? dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.4)')
		: dominantColor;

	let cardElement: HTMLElement;

	async function initColorExtraction() {
		if (news.image) {
			dominantColor = await extractDominantColor(news.image);
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
		<img
			src={news.image}
			alt={news.title}
			class="h-48 w-full rounded-xl object-cover"
			on:load={initColorExtraction}
		/>
		<div class="p-4">
			<div class="mb-2 flex items-center text-sm text-gray-600">
				<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					></path>
				</svg>
				{news.date}
			</div>
			<h3 class="mb-3 text-xl font-bold text-gray-900">
				<a href={news.link} class="transition-colors hover:text-blue-600">{news.title}</a>
			</h3>
			<p class="mb-4 text-gray-600">{news.excerpt}</p>
			<a href={news.link} class="font-medium text-blue-600 transition-colors hover:text-blue-800">
				Baca Selengkapnya →
			</a>
		</div>
	</div>
</article>
