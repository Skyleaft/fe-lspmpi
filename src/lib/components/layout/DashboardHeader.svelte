<script lang="ts">
	import { Home, User, Bell, MessageSquare, Shield } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import { siteSettings } from '$lib/stores/siteSettings';
	import type { ClaimUser } from '$lib/types';

	let showProfileMenu = $state(false);
	let authState = $state<{
		user: ClaimUser | null;
		profilePhotoUrl: string | null;
	}>({
		user: null,
		profilePhotoUrl: null
	});

	$effect(() => {
		const unsubscribe = authStore.subscribe((state) => {
			authState.user = state.user;
			authState.profilePhotoUrl = state.profilePhotoUrl;
		});
		return unsubscribe;
	});

	const pageConfig: Record<string, { title: string; subtitle: string }> = {
		'/dashboard': {
			title: 'Selamat Datang di Dashboard',
			subtitle: $siteSettings.siteName || 'Lembaga Sertifikasi Profesi Manajemen Pendidikan Islam'
		},
		'/dashboard/profile': { title: 'Profil', subtitle: 'Kelola informasi profil Anda' },
		'/dashboard/competencies': { title: 'Kompetensi', subtitle: 'Daftar kompetensi yang tersedia' },
		'/dashboard/schedule': { title: 'Jadwal Uji', subtitle: 'Lihat jadwal uji kompetensi' },
		'/dashboard/results': { title: 'Hasil Uji', subtitle: 'Lihat hasil uji kompetensi Anda' },
		'/dashboard/settings': { title: 'Pengaturan', subtitle: 'Kelola pengaturan akun Anda' },
		'/dashboard/manajemen-akun': { title: 'Manajemen Akun', subtitle: 'Kelola akun pengguna' },
		'/dashboard/konten/artikel': { title: 'Artikel', subtitle: 'Kelola artikel konten' },
		'/dashboard/konten/kategori': { title: 'Kategori', subtitle: 'Kelola kategori artikel' },
		'/dashboard/konten/tags': { title: 'Tags', subtitle: 'Kelola tags artikel' },
		'/dashboard/web-setting': { title: 'Web Setting', subtitle: 'Kelola pengaturan web' }
	};

	let pageInfo = $derived(
		pageConfig[$page.url.pathname] || {
			title: 'Dashboard',
			subtitle: $siteSettings.siteName || 'Lembaga Sertifikasi Profesi Manajemen Pendidikan Islam'
		}
	);

	function toggleProfileMenu() {
		showProfileMenu = !showProfileMenu;
	}

	function handleProfileImageError(event: Event) {
		(event.target as HTMLImageElement).src =
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face';
	}

	async function handleLogout() {
		const result = await authStore.logout();
		if (result.success) {
			showProfileMenu = false;
			goto('/');
		}
	}
</script>

<header class="mb-8">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">{pageInfo.title}</h1>
			<p class="mt-1 text-gray-600">{pageInfo.subtitle}</p>
		</div>
		<div class="flex items-center space-x-4">
			<button class="p-2 text-gray-500 hover:text-gray-700">
				<Bell class="h-6 w-6" />
			</button>
			<button class="p-2 text-gray-500 hover:text-gray-700">
				<MessageSquare class="h-6 w-6" />
			</button>

			<!-- Profile Dropdown -->
			<div class="relative">
				<button
					onclick={toggleProfileMenu}
					class="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-50"
				>
					{#if authState.profilePhotoUrl}
						<img
							src={authState.profilePhotoUrl}
							alt="Profile"
							class="h-8 w-8 rounded-full object-cover"
							onerror={handleProfileImageError}
						/>
					{:else}
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
							<span class="font-semibold text-white">
								{authState.user?.profileName?.charAt(0) || 'U'}
							</span>
						</div>
					{/if}
					<span class="hidden text-sm font-medium text-gray-700 md:block">
						{authState.user?.profileName || 'User'}
					</span>
					<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>

				{#if showProfileMenu}
					<div
						class="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg"
					>
						<div class="border-b border-gray-100 p-3">
							<p class="text-sm font-medium text-gray-900">
								{authState.user?.profileName || 'User'}
							</p>
							<p class="text-xs text-gray-500">{authState.user?.email || 'user@example.com'}</p>
						</div>
						<ul class="py-2">
							<li>
								<a
									href="/"
									class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									onclick={() => (showProfileMenu = false)}
								>
									<Home class="mr-3 h-4 w-4" />
									Beranda
								</a>
							</li>
							<li>
								<a
									href="/dashboard/profile"
									class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									onclick={() => (showProfileMenu = false)}
								>
									<User class="mr-3 h-4 w-4" />
									Profil Saya
								</a>
							</li>
							<li>
								<button
									onclick={handleLogout}
									class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
								>
									<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										></path>
									</svg>
									Keluar
								</button>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
