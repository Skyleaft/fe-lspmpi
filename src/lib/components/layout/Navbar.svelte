<script lang="ts">
	import {
		LogIn,
		User,
		Settings,
		LogOut,
		ChevronDown,
		LayoutDashboard,
		AlertTriangle,
		Shield
	} from '@lucide/svelte';
	import { authStore } from '$lib/stores/auth';
	import { siteSettings } from '$lib/stores/siteSettings';
	import { goto } from '$app/navigation';

	let isMenuOpen = $state(false);
	let isDropdownOpen = $state(false);

	// Get user data from auth store
	let user = $derived($authStore.user);
	let profilePhotoUrl = $derived($authStore.profilePhotoUrl);

	// Fallback data for when user is not authenticated
	const defaultUser = {
		name: 'Guest',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
	};

	async function handleLogout() {
		await authStore.logout();
		goto('/');
	}
</script>

{#if $siteSettings.siteMaintenance}
	<div
		class="relative z-[60] border-b-2 border-white/20 bg-red-600 py-2 text-center text-white shadow-lg"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
			<Shield class="h-5 w-5 flex-shrink-0 animate-pulse" />
			<span class="text-sm font-bold tracking-wide md:text-base">
				⚠️ MAINTENANCE - {$siteSettings.siteMaintenanceMessage ||
					'Website sedang dalam pemeliharaan'}
			</span>
			<Shield class="h-5 w-5 flex-shrink-0 animate-pulse" />
		</div>
	</div>
{/if}

<nav class="sticky top-0 z-50 bg-white shadow-lg">
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<img
					src={$siteSettings.siteLogo || '/img/logo-lsp.webp'}
					alt={$siteSettings.siteName || 'LSP MPI'}
					class="h-12 w-auto max-w-[200px] object-contain"
				/>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden items-center space-x-6 md:flex">
				<a
					href="/"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Beranda</a
				>
				<a
					href="/tentang"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Tentang Kami</a
				>
				<a
					href="/uji-kompetensi"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Uji Kompetensi</a
				>
				<a
					href="/karir"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Karir</a
				>
				<a
					href="/galeri"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Galeri</a
				>
				<a
					href="/kontak"
					class="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Kontak</a
				>

				{#if $authStore.isAuthenticated}
					<div class="relative">
						<button
							class="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-gray-100"
							onclick={() => (isDropdownOpen = !isDropdownOpen)}
						>
							<img
								src={profilePhotoUrl || defaultUser.avatar}
								alt={user?.profileName || defaultUser.name}
								class="h-8 w-8 rounded-full"
							/>
							<span class="font-medium text-gray-700">{user?.profileName || defaultUser.name}</span>
							<ChevronDown class="h-4 w-4 text-gray-500" />
						</button>

						{#if isDropdownOpen}
							<div
								class="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
							>
								<a
									href="/dashboard"
									class="flex w-full items-center gap-3 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
								>
									<LayoutDashboard class="h-4 w-4" />
									<span>Dashboard</span>
								</a>
								<button
									class="flex w-full items-center gap-3 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
								>
									<User class="h-4 w-4" />
									<span>Profile</span>
								</button>
								<button
									class="flex w-full items-center gap-3 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
								>
									<Settings class="h-4 w-4" />
									<span>Pengaturan</span>
								</button>
								<hr class="my-1 border-gray-200" />
								<button
									class="flex w-full items-center gap-3 px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
									onclick={handleLogout}
								>
									<LogOut class="h-4 w-4" />
									<span>Logout</span>
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href="/login"
						data-ripple-light="true"
						class="flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-center align-middle font-sans text-sm font-bold text-blue-600 transition-all select-none hover:bg-blue-600 hover:text-white focus:opacity-[0.85] active:opacity-[0.85]"
					>
						<LogIn class="h-4 w-4" />
						<span>Login</span>
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 md:hidden"
				onclick={() => (isMenuOpen = !isMenuOpen)}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-t border-gray-200 bg-white md:hidden">
			<div class="space-y-1 px-4 py-2">
				<a
					href="/"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Beranda</a
				>
				<a
					href="/tentang"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Tentang Kami</a
				>
				<a
					href="/uji-kompetensi"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Uji Kompetensi</a
				>
				<a
					href="/karir"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Karir</a
				>
				<a
					href="/galeri"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Galeri</a
				>
				<a
					href="/kontak"
					class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
					>Kontak</a
				>

				{#if $authStore.isAuthenticated}
					<div class="mt-2 border-t border-gray-200 pt-2">
						<div class="flex items-center gap-2 px-3 py-2">
							<img
								src={profilePhotoUrl || defaultUser.avatar}
								alt={user?.profileName || defaultUser.name}
								class="h-8 w-8 rounded-full"
							/>
							<span class="font-medium text-gray-700">{user?.profileName || defaultUser.name}</span>
						</div>
						<a
							href="/dashboard"
							class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
						>
							<LayoutDashboard class="h-4 w-4" />
							<span>Dashboard</span>
						</a>
						<button
							class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
						>
							<User class="h-4 w-4" />
							<span>Profile</span>
						</button>
						<button
							class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
						>
							<Settings class="h-4 w-4" />
							<span>Pengaturan</span>
						</button>
						<button
							class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
						>
							<LogOut class="h-4 w-4" />
							<span>Logout</span>
						</button>
					</div>
				{:else}
					<a
						href="/login"
						class="mx-3 my-2 flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
					>
						<LogIn class="h-4 w-4" />
						<span>Login</span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
