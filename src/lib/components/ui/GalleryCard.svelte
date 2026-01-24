<script lang="ts">
	import { fly } from 'svelte/transition';
	
	interface GalleryCardProps {
		src: string;
		alt: string;
		delay?: number;
	}
	
	export let src: string;
	export let alt: string;
	export let delay: number = 0;
</script>

<div
	class="group relative h-64 overflow-hidden"
	style="clip-path: inset(0 round 0.75rem);"
	in:fly={{ x: -50, duration: 600, delay }}
>
	<img
		src={src}
		alt={alt}
		class="
			h-full w-full object-cover
			transition-transform duration-300 ease-out
			group-hover:scale-110
		"
	/>
</div>