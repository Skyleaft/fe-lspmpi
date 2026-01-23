<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let pageTitle = 'Tags';
	let currentPath = '';
	let tags = [
		{
			id: 1,
			name: 'TIK',
			slug: 'tik',
			description: 'Teknologi Informasi dan Komunikasi',
			articleCount: 8,
			createdAt: '2024-01-01'
		},
		{
			id: 2,
			name: 'Kompetensi',
			slug: 'kompetensi',
			description: 'Uji kompetensi dan sertifikasi',
			articleCount: 12,
			createdAt: '2024-01-01'
		},
		{
			id: 3,
			name: 'Panduan',
			slug: 'panduan',
			description: 'Panduan dan tutorial',
			articleCount: 6,
			createdAt: '2024-01-01'
		},
		{
			id: 4,
			name: 'Tips',
			slug: 'tips',
			description: 'Tips dan trik',
			articleCount: 4,
			createdAt: '2024-01-01'
		},
		{
			id: 5,
			name: 'Sukses',
			slug: 'sukses',
			description: 'Kisah sukses dan motivasi',
			articleCount: 3,
			createdAt: '2024-01-01'
		}
	];

	onMount(() => {
		currentPath = get(page).url.pathname;
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<div class="dashboard-content">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Manajemen Tags</h1>
		<p class="text-gray-600">Kelola tag artikel untuk konten website Anda</p>
	</div>

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari tag..."
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>
		<button class="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
			+ Tambah Tag
		</button>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each tags as tag (tag.id)}
			<div class="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow duration-200">
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center space-x-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
							<svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-900">{tag.name}</h3>
							<p class="text-sm text-gray-500">{tag.slug}</p>
						</div>
					</div>
					<div class="flex space-x-2">
						<a href="#" class="text-purple-600 hover:text-purple-900">Edit</a>
						<a href="#" class="text-red-600 hover:text-red-900">Hapus</a>
					</div>
				</div>
				<p class="text-sm text-gray-600 mb-4">{tag.description}</p>
				<div class="flex items-center justify-between">
					<span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold leading-5 text-blue-800">
						{tag.articleCount} artikel
					</span>
					<span class="text-xs text-gray-500">{formatDate(tag.createdAt)}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-6 flex items-center justify-between">
		<div class="text-sm text-gray-700">
			Menampilkan {tags.length} dari {tags.length} tag
		</div>
		<div class="flex space-x-2">
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Previous</button>
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Next</button>
		</div>
	</div>
</div>

