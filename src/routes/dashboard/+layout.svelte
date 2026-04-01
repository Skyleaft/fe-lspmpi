<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import DashboardHeader from '$lib/components/layout/DashboardHeader.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	let { children } = $props();

	let isLoading = $state(true);
	let isAuthenticated = $state(false);
	// On desktop, sidebar is always open; on mobile it starts closed
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	let sidebarOpen = $state(isDesktop);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	// Check authentication after component mounts (client-side only)
	onMount(async () => {
		const authResult = await authStore.checkAuth();
		isAuthenticated = authResult;
		
		if (!isAuthenticated) {
			// Redirect to login page if not authenticated
			goto(resolve('/login'));
			return;
		}

		isLoading = false;
	});
</script>

<div class="dashboard-layout">
	{#if isAuthenticated && !isLoading}
		<!-- Sidebar (always present, handles visibility through CSS/classes) -->
		<Sidebar isOpen={sidebarOpen} onClose={() => (sidebarOpen = false)} />
		
		<main class="dashboard-content">
			<DashboardHeader {sidebarOpen} toggleSidebar={toggleSidebar} />
			{@render children?.()}
		</main>
	{:else if isLoading}
		<div class="flex items-center justify-center min-h-screen">
			<div class="text-center">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
				<p class="mt-4 text-gray-600">Checking authentication...</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard-layout {
		position: relative;
		min-height: 100vh;
	}

	.dashboard-content {
		margin-left: 0;
		padding: 1rem;
		min-height: 100vh;
	}

	@media (min-width: 1024px) {
		.dashboard-content {
			margin-left: 280px;
		}
	}
</style>
