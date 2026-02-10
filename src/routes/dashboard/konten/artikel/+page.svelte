<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import {
		findArticles,
		deleteArticle,
		findArticleCategories,
		findArticleTags,
		getArticleCategory
	} from '$lib/utils/api';
	import { Edit, Eye, Trash2 } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
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
	let isDeleteModalOpen = false;
	let editingArticle: Article | null = null;
	let deletingArticle: Article | null = null;

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

	function openModal(article?: Article) {
		editingArticle = article || null;
		isModalOpen = true;
	}

	function openDeleteModal(article: Article) {
		isDeleteModalOpen = true;
		deletingArticle = article;
	}

	function closeModal() {
		isModalOpen = false;
		editingArticle = null;
	}

	function closeDeleteModal() {
		isDeleteModalOpen = false;
		deletingArticle = null;
	}

	async function handleSave() {
		await loadArticles();
		closeModal();
	}

	async function confirmDelete() {
		if (!deletingArticle) return;
		
		try {
			await deleteArticle(deletingArticle.id);
			await loadArticles();
			closeDeleteModal();
		} catch (err: any) {
			alert('Gagal menghapus artikel');
		}
	}

	// Computed properties
	$: totalPages = Math.ceil(totalItems / pageSize);

	// Handle search and pagination changes
	$: if (
		searchQuery !== undefined ||
		currentPage !== undefined ||
		selectedCategory !== undefined ||
		selectedStatus !== undefined
	) {
		loadArticles();
	}
</script>

<div class="dashboard-content">

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari artikel..."
					bind:value={searchInput}
					onblur={() => {
						searchQuery = searchInput;
						loadArticles();
					}}
					onkeydown={(e) => e.key === 'Enter' && ((searchQuery = searchInput), loadArticles())}
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				/>
				<svg
					class="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<select
				bind:value={selectedCategory}
				class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
			>
				<option value="">Semua Kategori</option>
				{#each categories as category (category.id)}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
			<select
				bind:value={selectedStatus}
				class="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
			>
				<option value="">Semua Status</option>
				<option value="published">Published</option>
				<option value="draft">Draft</option>
			</select>
		</div>
		<button
			onclick={() => openModal()}
			class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		>
			+ Tambah Artikel
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Thumbnail</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Judul</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Kategori</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Status</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Tanggal</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Aksi</th
					>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each articles as article (article.id)}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-4 whitespace-nowrap">
							{#if article.thumbnail && article.thumbnail.trim()}
								<img
									src="/api/articles/thumbnail/{article.thumbnail}"
									alt="Thumbnail"
									class="h-12 w-12 rounded object-cover"
								/>
							{:else}
								<div class="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
									<svg
										class="h-6 w-6 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							{/if}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div>
								<div class="text-sm font-medium text-gray-900">{article.title}</div>
								<div class="text-sm text-gray-500">{article.slug}</div>
							</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800"
							>
								{#await getArticleCategory(article.categoryId)}
									Loading...
								{:then category}
									{category?.name || 'Unknown'}
								{:catch error}
									Unknown
								{/await}
							</span>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex rounded-full bg-{article.isPublished
									? 'green'
									: 'yellow'}-100 px-2 text-xs leading-5 font-semibold text-{article.isPublished
									? 'green'
									: 'yellow'}-800"
							>
								{article.isPublished ? 'Published' : 'Draft'}
							</span>
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
							>{formatDate(article.createdAt)}</td
						>
						<td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
							<div class="flex space-x-2">
								<button
									onclick={() => openModal(article)}
									class="flex items-center space-x-1 rounded-lg bg-yellow-100 px-2 py-1 text-yellow-700 hover:bg-yellow-200"
								>
									<Edit class="h-4 w-4" />
									<span>Edit</span>
								</button>
								<a
									href="/berita/{article.slug}"
									class="flex items-center space-x-1 rounded-lg bg-blue-100 px-2 py-1 text-blue-700 hover:bg-blue-200"
									><Eye class="h-4 w-4" />
									<span>Preview</span></a
								>
								<button
									onclick={() => openDeleteModal(article)}
									class="flex items-center space-x-1 rounded-lg bg-red-100 px-2 py-1 text-red-700 hover:bg-red-200"
								>
									<Trash2 class="h-4 w-4" />
									<span>Hapus</span>
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 flex items-center justify-between">
		<div class="text-sm text-gray-700">
			Menampilkan {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} dari
			{totalItems} artikel
		</div>
		<div class="flex space-x-2">
			<button
				class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage <= 1}
				onclick={() => (currentPage = Math.max(1, currentPage - 1))}
			>
				Previous
			</button>
			<button
				class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage >= totalPages}
				onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
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

	<!-- Delete Confirmation Modal -->
	{#if isDeleteModalOpen && deletingArticle}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
			<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" transition:fly={{ y: 20, duration: 300 }}>
				<h3 class="mb-4 text-lg font-semibold">Hapus Artikel</h3>
				<p class="text-gray-600">Anda yakin ingin menghapus artikel <strong>{deletingArticle.title}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
				<div class="mt-6 flex justify-end space-x-3">
					<button 
						type="button"
						onclick={closeDeleteModal}
						class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					>
						Batal
					</button>
					<button 
						type="button"
						onclick={confirmDelete}
						class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
					>
						Hapus
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
