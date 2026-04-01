<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import { siteSettings } from '$lib/stores/siteSettings';

	import { onMount } from 'svelte';
	// @ts-expect-error Material Tailwind lacks TS types
	import { initMaterialTailwind } from '@material-tailwind/html';

	// Receive server data from +layout.server.ts
	let { data, children } = $props();

	// Initialize site settings store with server-loaded data
	$effect(() => {
		if (data?.siteSettings) {
			siteSettings.init(data.siteSettings);
		}
	});

	onMount(async () => {
		initMaterialTailwind(); // Initialize all components

		// Check if user is already authenticated
		await authStore.checkAuth();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head> -->

{#if !$page.url.pathname.startsWith('/dashboard')}
	<Navbar />
{/if}
<main class="page-transition">
	{@render children()}
</main>
{#if !$page.url.pathname.startsWith('/dashboard')}
	<Footer />
{/if}
