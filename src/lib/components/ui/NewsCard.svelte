<script lang="ts">
	import { fly } from 'svelte/transition';
	import { extractDominantColor } from '../../utils/color';

	interface Props {
		title: string;
		excerpt: string;
		imageSrc: string;
		imageAlt: string;
		date: string;
		href?: string;
		category?: string;
		delay?: number;
		dominantColor?: string;
	}

	let { title, excerpt, imageSrc, imageAlt, date, href = '#', category, delay = 0, dominantColor = '#ffffff' }: Props = $props();

	let dominantColorRGBA = $derived(dominantColor.startsWith('rgb')
		? dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.4)')
		: dominantColor);

	let cardElement: HTMLElement;

	async function initColorExtraction() {
		if (imageSrc) {
			dominantColor = await extractDominantColor(imageSrc);
		}
	}

	function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE4NVYxMzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTE2NSAxNDVIMjM1VjE1NUgxNjVWMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTY1IDE2NUgyMTVWMTc1SDE2NVYxNjVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
    img.alt = 'Gambar tidak tersedia';
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
		class="pointer-events-none absolute inset-0 z-1 scale-90 rounded-xl backdrop-blur-[2px] transition-all duration-300 group-hover:scale-102 group-hover:bg-[var(--overlay-color)] group-hover:shadow-xl"
	></div>

	<div class="relative z-10">
		<img
			src={imageSrc}
			alt={imageAlt}
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
				{date}
			</div>
			<h3 class="mb-3 text-xl font-bold text-gray-900">
				<a href={href} class="transition-colors hover:text-blue-600">{title}</a>
			</h3>
			<p class="mb-4 text-gray-600">{excerpt}</p>
			<a href={href} class="font-medium text-blue-600 transition-colors hover:text-blue-800">
				Baca Selengkapnya →
			</a>
		</div>
	</div>
</article>
