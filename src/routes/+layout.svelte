<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { onNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { authStore } from '$lib/stores/auth';

	import { onMount } from 'svelte';
	// @ts-ignore
	import { initMaterialTailwind } from '@material-tailwind/html';


	onMount(async () => {
		initMaterialTailwind(); // Initialize all components

		// Check if user is already authenticated
		await authStore.checkAuth();
	});

	let { children } = $props();

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if !$page.url.pathname.startsWith('/dashboard')}
	<Navbar />
{/if}
{#if $page.url.pathname.startsWith('/dashboard') && $authStore.isAuthenticated}
	<Sidebar />
{/if}
<main class="page-transition">
	{@render children()}
</main>
{#if !$page.url.pathname.startsWith('/dashboard')}
	<Footer />
{/if}

<!-- {#if !isDashboard()}
	<Navbar />
{/if}
<main class="page-transition">
	{@render children()}
</main>
{#if !isDashboard()}
	<Footer />
{/if} -->
