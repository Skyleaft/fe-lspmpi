<script lang='ts'>
	import type { Component } from 'svelte';

	export let href: string;
	export let icon: Component;
	export let label: string;
	export let isActive: boolean = false;
</script>

<a
	{href}
	class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 {isActive ? 'bg-blue-50 text-gray-700' : ''}"
>
	<svelte:component this={icon} class="h-5 w-5 {isActive ? 'text-blue-600' : ''}" />
	<span>{label}</span>
</a>
