<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let pageTitle = 'Kategori';
	let currentPath = '';
	let categories = [
		{
			id: 1,
			name: 'Teknologi',
			slug: 'teknologi',
			description: 'Artikel tentang teknologi dan inovasi',
			articleCount: 15,
			createdAt: '2024-01-01'
		},
		{
			id: 2,
			name: 'Pendidikan',
			slug: 'pendidikan',
			description: 'Artikel tentang pendidikan dan pelatihan',
			articleCount: 8,
			createdAt: '2024-01-01'
		},
		{
			id: 3,
			name: 'Berita',
			slug: 'berita',
			description: 'Berita terkini seputar LSP MPI',
			articleCount: 12,
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
		<h1 class="text-2xl font-bold text-gray-900">Manajemen Kategori</h1>
		<p class="text-gray-600">Kelola kategori artikel untuk konten website Anda</p>
	</div>

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari kategori..."
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>
		<button class="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
			+ Tambah Kategori
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nama</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slug</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Deskripsi</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Jumlah Artikel</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tanggal</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each categories as category (category.id)}
					<tr class="hover:bg-gray-50">
						<td class="whitespace-nowrap px-6 py-4">
							<div class="text-sm font-medium text-gray-900">{category.name}</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{category.slug}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{category.description}</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
								{category.articleCount} artikel
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(category.createdAt)}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
							<div class="flex space-x-2">
								<a href="#" class="text-green-600 hover:text-green-900">Edit</a>
								<a href="#" class="text-red-600 hover:text-red-900">Hapus</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 flex items-center justify-between">
		<div class="text-sm text-gray-700">
			Menampilkan {categories.length} dari {categories.length} kategori
		</div>
		<div class="flex space-x-2">
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Previous</button>
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Next</button>
		</div>
	</div>
</div>
