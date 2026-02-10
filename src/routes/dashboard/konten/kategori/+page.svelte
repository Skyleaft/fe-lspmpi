<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import {
		findArticleCategories,
		createArticleCategory,
		updateArticleCategory,
		deleteArticleCategory
	} from '$lib/utils/api';
	import { Edit, Trash2 } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import type { ArticleCategory, FindRequest } from '$lib/types';
	import CategoryModal from '$lib/components/ui/CategoryModal.svelte';

	let pageTitle = 'Kategori';
	let currentPath = '';
	let categories: ArticleCategory[] = [];
	let loading = true;
	let error = null;
	let searchQuery = '';
	let searchInput = '';
	let currentPage = 1;
	let totalPages = 1;
	let totalItems = 0;
	let pageSize = 10;

	// Modal state
	let isModalOpen = false;
	let isDeleteModalOpen = false;
	let editingCategory: ArticleCategory | null = null;
	let deletingCategory: ArticleCategory | null = null;

	// Article count calculation
	function getArticleCount(category: ArticleCategory): number {
		return category.articles ? category.articles.length : 0;
	}

	onMount(async () => {
		currentPath = get(page).url.pathname;
		await loadCategories();
	});

	async function loadCategories() {
		try {
			loading = true;
			error = null;

			const params: FindRequest = {
				search: searchQuery,
				page: currentPage,
				pageSize: pageSize,
				sort: 'name',
				order: 'asc'
			};

			const response = await findArticleCategories(params);
			categories = response.data;
			totalItems = response.totalCount;
			totalPages = response.totalPages || Math.ceil(totalItems / pageSize);
		} catch (err: any) {
			error = err.message;
			alert('Gagal memuat kategori');
		} finally {
			loading = false;
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

	function openCreateModal() {
		isModalOpen = true;
		editingCategory = null;
	}

	function openEditModal(category: ArticleCategory) {
		isModalOpen = true;
		editingCategory = category;
	}

	function openDeleteModal(category: ArticleCategory) {
		isDeleteModalOpen = true;
		deletingCategory = category;
	}

	function closeModal() {
		isModalOpen = false;
		editingCategory = null;
	}

	function closeDeleteModal() {
		isDeleteModalOpen = false;
		deletingCategory = null;
	}

	async function handleSave() {
		await loadCategories();
		closeModal();
	}

	async function confirmDelete() {
		if (!deletingCategory) return;
		
		try {
			await deleteArticleCategory(deletingCategory.id);
			await loadCategories();
			closeDeleteModal();
		} catch (err: any) {
			alert('Gagal menghapus kategori');
		}
	}

	// Computed properties
	$: totalPages = Math.ceil(totalItems / pageSize);

	// Handle search and pagination changes
	$: if (searchQuery !== undefined || currentPage !== undefined) {
		loadCategories();
	}
</script>

<div class="dashboard-content">

	<CategoryModal
		category={editingCategory}
		isOpen={isModalOpen}
		onClose={closeModal}
		onSave={handleSave}
		onDelete={() => {
			closeModal();
			loadCategories();
		}}
	/>

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari kategori..."
					bind:value={searchInput}
					onblur={() => {
						searchQuery = searchInput;
						loadCategories();
					}}
					onkeydown={(e) => e.key === 'Enter' && ((searchQuery = searchInput), loadCategories())}
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
		</div>
		<button
			class="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
			onclick={openCreateModal}
		>
			+ Tambah Kategori
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Nama</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Slug</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Deskripsi</th
					>
					<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>Jumlah Artikel</th
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
				{#each categories as category (category.id)}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="text-sm font-medium text-gray-900">{category.name}</div>
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{category.slug || '-'}</td
						>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
							>{category.description || '-'}</td
						>
						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800"
							>
								{getArticleCount(category)} artikel
							</span>
						</td>
						<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
							>{formatDate(category.createdAt)}</td
						>
						<td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
							<div class="flex space-x-2">
								<button
									onclick={() => openEditModal(category)}
									class="flex items-center space-x-1 rounded-lg bg-yellow-100 px-2 py-1 text-yellow-700 hover:bg-yellow-200"
								>
									<Edit class="h-4 w-4" />
									<span>Edit</span>
								</button>
								<button
									onclick={() => openDeleteModal(category)}
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
			{totalItems} kategori
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

	<!-- Delete Confirmation Modal -->
	{#if isDeleteModalOpen && deletingCategory}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
			<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" transition:fly={{ y: 20, duration: 300 }}>
				<h3 class="mb-4 text-lg font-semibold">Hapus Kategori</h3>
				<p class="text-gray-600">Anda yakin ingin menghapus kategori <strong>{deletingCategory.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
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
