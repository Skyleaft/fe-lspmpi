<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { UserData, ClaimUser } from '$lib/types';

	let { children } = $props();

	let userData: ClaimUser | null = null;
	let isLoading = $state(true);
	let isAuthenticated = $state(false);

	// Check authentication after component mounts (client-side only)
	onMount(async () => {
		const authResult = await authStore.checkAuth();
		isAuthenticated = authResult;
		
		if (!isAuthenticated) {
			// Redirect to login page if not authenticated
			goto('/login');
			return;
		}

		// Set user data from auth store
		userData = $authStore.user;
		isLoading = false;
	});
</script>

{#if isAuthenticated && !isLoading}
	<main class="dashboard-content">
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
