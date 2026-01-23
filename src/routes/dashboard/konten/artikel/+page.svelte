<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let pageTitle = 'Artikel';
	let currentPath = '';
	let articles = [
		{
			id: 1,
			title: 'Panduan Lengkap Uji Kompetensi TIK',
			slug: 'panduan-lengkap-uji-kompetensi-tik',
			category: 'Teknologi',
			tags: ['TIK', 'Kompetensi', 'Panduan'],
			status: 'published',
			createdAt: '2024-01-15',
			author: 'Admin LSP MPI'
		},
		{
			id: 2,
			title: 'Tips Sukses Menghadapi Uji Kompetensi',
			slug: 'tips-sukses-menghadapi-uji-kompetensi',
			category: 'Pendidikan',
			tags: ['Tips', 'Sukses', 'Uji Kompetensi'],
			status: 'published',
			createdAt: '2024-01-10',
			author: 'Admin LSP MPI'
		},
		{
			id: 3,
			title: 'Perkembangan Teknologi di Indonesia 2024',
			slug: 'perkembangan-teknologi-di-indonesia-2024',
			category: 'Teknologi',
			tags: ['Teknologi', 'Indonesia', '2024'],
			status: 'draft',
			createdAt: '2024-01-05',
			author: 'Admin LSP MPI'
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
		<h1 class="text-2xl font-bold text-gray-900">Manajemen Artikel</h1>
		<p class="text-gray-600">Kelola artikel konten website Anda</p>
	</div>

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari artikel..."
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<select class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
				<option value="">Semua Kategori</option>
				<option value="Teknologi">Teknologi</option>
				<option value="Pendidikan">Pendidikan</option>
			</select>
			<select class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
				<option value="">Semua Status</option>
				<option value="published">Published</option>
				<option value="draft">Draft</option>
			</select>
		</div>
		<button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
			+ Tambah Artikel
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Judul</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kategori</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tanggal</th>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each articles as article (article.id)}
					<tr class="hover:bg-gray-50">
						<td class="whitespace-nowrap px-6 py-4">
							<div>
								<div class="text-sm font-medium text-gray-900">{article.title}</div>
								<div class="text-sm text-gray-500">{article.slug}</div>
							</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">{article.category}</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-{article.status === 'published' ? 'green' : 'yellow'}-100 px-2 text-xs font-semibold leading-5 text-{article.status === 'published' ? 'green' : 'yellow'}-800">
								{article.status === 'published' ? 'Published' : 'Draft'}
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(article.createdAt)}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
							<div class="flex space-x-2">
								<a href="#" class="text-blue-600 hover:text-blue-900">Edit</a>
								<a href="#" class="text-gray-600 hover:text-gray-900">Lihat</a>
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
			Menampilkan {articles.length} dari {articles.length} artikel
		</div>
		<div class="flex space-x-2">
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Previous</button>
			<button class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Next</button>
		</div>
	</div>
</div>