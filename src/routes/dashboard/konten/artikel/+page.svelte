<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { findArticles, deleteArticle, findArticleCategories, findArticleTags, getArticleCategory } from '$lib/utils/api';
	import type { Article, ArticleCategory, ArticleTag, FindRequest } from '$lib/types';
	import ArticleModal from '$lib/components/ui/ArticleModal.svelte';

	let pageTitle = 'Artikel';
	let currentPath = '';
	let articles: Article[] = [];
	let loading = true;
	let error = null;
	let searchQuery = '';
	let searchInput = '';
	let currentPage = 1;
	let totalPages = 1;
	let totalItems = 0;
	let pageSize = 10;
	let selectedCategory = '';
	let selectedStatus = '';

	// Dropdown data
	let categories: ArticleCategory[] = [];
	let tags: ArticleTag[] = [];

	// Modal state
	let isModalOpen = false;
	let editingArticle: Article | null = null;

	onMount(async () => {
		currentPath = get(page).url.pathname;
		await loadCategories();
		await loadTags();
		await loadArticles();
	});

	async function loadArticles() {
		try {
			loading = true;
			error = null;
			
			const params: FindRequest = {
				search: searchQuery,
				page: currentPage,
				pageSize: pageSize,
				sort: 'createdAt',
				order: 'desc'
			};
			
			const response = await findArticles(params);
			articles = response.data;
			totalItems = response.totalCount;
			totalPages = response.totalPages || Math.ceil(totalItems / pageSize);
		} catch (err: any) {
			error = err.message;
			alert('Gagal memuat artikel');
		} finally {
			loading = false;
		}
	}

	async function loadCategories() {
		try {
			const response = await findArticleCategories({ page: 1, pageSize: 100, search: '' });
			categories = response.data;
		} catch (err: any) {
			console.error('Failed to load categories:', err);
		}
	}

	async function loadTags() {
		try {
			const response = await findArticleTags({ page: 1, pageSize: 100, search: '' });
			tags = response.data;
		} catch (err: any) {
			console.error('Failed to load tags:', err);
		}
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}

	function getArticleCount(category: ArticleCategory): number {
		return category.articles ? category.articles.length : 0;
	}

	async function confirmDelete(article: Article) {
		if (confirm(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`)) {
			try {
				await deleteArticle(article.id);
				alert('Artikel berhasil dihapus');
				await loadArticles();
			} catch (err: any) {
				alert('Gagal menghapus artikel');
			}
		}
	}

	function openModal(article?: Article) {
		editingArticle = article || null;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		editingArticle = null;
	}

	async function handleSave() {
		await loadArticles();
	}

	// Computed properties
	$: totalPages = Math.ceil(totalItems / pageSize);

	// Handle search and pagination changes
	$: if (searchQuery !== undefined || currentPage !== undefined || selectedCategory !== undefined || selectedStatus !== undefined) {
		loadArticles();
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
					bind:value={searchInput}
					on:blur={() => { searchQuery = searchInput; loadArticles(); }}
					on:keydown={(e) => e.key === 'Enter' && (searchQuery = searchInput, loadArticles())}
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<select bind:value={selectedCategory} class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
				<option value="">Semua Kategori</option>
				{#each categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<select bind:value={selectedStatus} class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
				<option value="">Semua Status</option>
				<option value="published">Published</option>
				<option value="draft">Draft</option>
			</select>
		</div>
		<button 
			on:click={() => openModal()}
			class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			+ Tambah Artikel
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Thumbnail</th>
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
							{#if article.thumbnail && article.thumbnail.trim()}
								<img src="/api/articles/thumbnail/{article.thumbnail}" alt="Thumbnail" class="h-12 w-12 rounded object-cover" />
							{:else}
								<div class="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
									<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
							{/if}
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<div>
								<div class="text-sm font-medium text-gray-900">{article.title}</div>
								<div class="text-sm text-gray-500">{article.slug}</div>
							</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
								{#await getArticleCategory(article.categoryId)}
									Loading...
								{:then category}
									{category?.name || 'Unknown'}
								{:catch error}
									Unknown
								{/await}
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-{article.isPublished ? 'green' : 'yellow'}-100 px-2 text-xs font-semibold leading-5 text-{article.isPublished ? 'green' : 'yellow'}-800">
								{article.isPublished ? 'Published' : 'Draft'}
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(article.createdAt)}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
							<div class="flex space-x-2">
								<button 
									on:click={() => openModal(article)}
									class="text-blue-600 hover:text-blue-900"
								>
									Edit
								</button>
								<a href="/berita/{article.slug}" class="text-gray-600 hover:text-gray-900">Lihat</a>
								<button class="text-red-600 hover:text-red-900" on:click={() => confirmDelete(article)}>Hapus</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 flex items-center justify-between">
		<div class="text-sm text-gray-700">
			Menampilkan {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} dari {totalItems} artikel
		</div>
		<div class="flex space-x-2">
			<button 
				class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={currentPage <= 1}
				on:click={() => currentPage = Math.max(1, currentPage - 1)}
			>
				Previous
			</button>
			<button 
				class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={currentPage >= totalPages}
				on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
			>
				Next
			</button>
		</div>
	</div>

	<ArticleModal
		article={editingArticle}
		isOpen={isModalOpen}
		onClose={closeModal}
		onSave={handleSave}
	/>
</div>
