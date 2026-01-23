<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let pageTitle = 'Konten';
	let currentPath = '';

	onMount(() => {
		currentPath = get(page).url.pathname;
	});
</script>

<div class="dashboard-content">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Manajemen Konten</h1>
		<p class="text-gray-600">Kelola artikel, kategori, dan tags untuk konten website Anda</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Artikel Card -->
		<a 
			href="/dashboard/konten/artikel"
			class="group rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
						<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900">Artikel</h3>
						<p class="text-sm text-gray-500">Kelola konten artikel</p>
					</div>
				</div>
				<div class="transform transition-transform group-hover:translate-x-1">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		</a>

		<!-- Kategori Card -->
		<a 
			href="/dashboard/konten/kategori"
			class="group rounded-lg border border-gray-200 bg-white p-6 hover:border-green-300 hover:shadow-lg transition-all duration-200"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
						<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900">Kategori</h3>
						<p class="text-sm text-gray-500">Kelola kategori artikel</p>
					</div>
				</div>
				<div class="transform transition-transform group-hover:translate-x-1">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		</a>

		<!-- Tags Card -->
		<a 
			href="/dashboard/konten/tags"
			class="group rounded-lg border border-gray-200 bg-white p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
		>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
						<svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900">Tags</h3>
						<p class="text-sm text-gray-500">Kelola tag artikel</p>
					</div>
				</div>
				<div class="transform transition-transform group-hover:translate-x-1">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		</a>
	</div>
</div>

<style>
	.dashboard-content {
		margin-left: 280px;
		padding: 2rem;
		min-height: 100vh;
		background-color: #f8fafc;
	}

	@media (max-width: 1024px) {
		.dashboard-content {
			margin-left: 0;
		}
	}
</style>