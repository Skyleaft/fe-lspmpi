<script>
	import { Home, User, Shield, Calendar, Settings, BarChart3, ClipboardList, ArrowBigLeft, FileText, Folder, Tag } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let sidebarOpen = false;
	let kontenOpen = false;

	onMount(() => {
		// Trigger sidebar animation on mount
		sidebarOpen = true;
	});
</script>

<!-- Sidebar -->
<div
	class="dashboard-sidebar flex h-full flex-col"
	transition:fly={{ x: -300, duration: 400, easing: quintOut }}
>
	<div class="p-4">
		<div class="mb-8 flex items-center space-x-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
				<Shield class="h-6 w-6 text-white" />
			</div>
			<div>
				<h1 class="text-lg font-bold text-gray-900">LSP MPI</h1>
				<p class="text-xs text-gray-500">Dashboard</p>
			</div>
		</div>

		<nav class="space-y-2">
			<a
				href="/dashboard"
				class="flex items-center space-x-3 rounded-lg bg-blue-50 px-3 py-2 text-gray-700"
			>
				<Home class="h-5 w-5 text-blue-600" />
				<span>Dashboard</span>
			</a>
			<a
				href="/dashboard/profile"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<User class="h-5 w-5" />
				<span>Profil</span>
			</a>
			<a
				href="/dashboard/competencies"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<ClipboardList class="h-5 w-5" />
				<span>Kompetensi</span>
			</a>
			<a
				href="/dashboard/schedule"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<Calendar class="h-5 w-5" />
				<span>Jadwal Uji</span>
			</a>
			<a
				href="/dashboard/results"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<BarChart3 class="h-5 w-5" />
				<span>Hasil Uji</span>
			</a>
			
			<!-- Konten Menu -->
			<div class="space-y-1">
				<button
					onclick={() => kontenOpen = !kontenOpen}
					class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
				>
					<div class="flex items-center space-x-3">
						<FileText class="h-5 w-5" />
						<span>Konten</span>
					</div>
					<svg class="h-4 w-4 transform transition-transform" class:rotate-90={kontenOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>
				
				{#if kontenOpen}
					<div class="ml-6 space-y-1 border-l-2 border-gray-100 pl-3">
						<a href="/dashboard/konten/artikel" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
							<FileText class="h-4 w-4" />
							<span>Artikel</span>
						</a>
						<a href="/dashboard/konten/kategori" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
							<Folder class="h-4 w-4" />
							<span>Kategori</span>
						</a>
						<a href="/dashboard/konten/tags" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
							<Tag class="h-4 w-4" />
							<span>Tags</span>
						</a>
					</div>
				{/if}
			</div>
			
			<a
				href="/dashboard/settings"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<Settings class="h-5 w-5" />
				<span>Pengaturan</span>
			</a>
			<a
				href="/dashboard/manajemen-akun"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<User class="h-5 w-5" />
				<span>Manajemen Akun</span>
			</a>
            <a
				href="/"
				class="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
			>
				<ArrowBigLeft class="h-5 w-5" />
				<span>Beranda</span>
			</a>
		</nav>
	</div>
</div>

<style>
	.dashboard-sidebar {
		width: 280px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 40;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 1024px) {
		.dashboard-sidebar {
			display: none; /* Hide on mobile, could add toggle later */
		}
	}
</style>
