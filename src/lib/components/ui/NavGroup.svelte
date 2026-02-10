<script lang='ts'>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Component } from 'svelte';

	export let icon: Component;
	export let label: string;
	export let isOpen: boolean = false;
	export let items: Array<{ href: string; icon: Component; label: string; isActive: boolean }> = [];
</script>

<div class="space-y-1">
	<button
		onclick={() => isOpen = !isOpen}
		class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 {isOpen ? 'bg-blue-50 text-gray-700' : ''}"
	>
		<div class="flex items-center space-x-3">
			<svelte:component this={icon} class="h-5 w-5 {isOpen ? 'text-blue-600' : ''}" />
			<span>{label}</span>
		</div>
		<svg class="h-4 w-4 transform transition-transform" class:rotate-90={isOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M6 9l6 6 6-6" />
		</svg>
	</button>
	
	{#if isOpen}
		<div class="ml-6 space-y-1 border-l-2 border-gray-100 pl-3" transition:slide={{ duration: 400, easing: quintOut }}>
			{#each items as item}
				<a href={item.href} class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 {item.isActive ? 'bg-blue-50 text-gray-700' : ''}">
					<svelte:component this={item.icon} class="h-4 w-4 {item.isActive ? 'text-blue-600' : ''}" />
					<span>{item.label}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>
