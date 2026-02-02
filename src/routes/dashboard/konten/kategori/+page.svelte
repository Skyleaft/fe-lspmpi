<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { findArticleCategories, createArticleCategory, updateArticleCategory, deleteArticleCategory } from '$lib/utils/api';
	import type { ArticleCategory, FindRequest } from '$lib/types';

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

	// Form state
	let isModalOpen = false;
	let isEditing = false;
	let editingCategory: ArticleCategory | null = null;
	let formData = {
		name: '',
		description: ''
	};
	let formErrors = {};

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
		isEditing = false;
		editingCategory = null;
		formData = {
			name: '',
			description: ''
		};
		formErrors = {};
	}

	function openEditModal(category: ArticleCategory) {
		isModalOpen = true;
		isEditing = true;
		editingCategory = category;
		formData = {
			name: category.name || '',
			description: category.description || ''
		};
		formErrors = {};
	}

	function closeModal() {
		isModalOpen = false;
		formErrors = {};
	}

	async function validateForm() {
		formErrors = {};
		
		if (!formData.name.trim()) {
			formErrors.name = 'Nama kategori harus diisi';
		}
		
		return Object.keys(formErrors).length === 0;
	}

	async function saveCategory() {
		if (!await validateForm()) {
			return;
		}

		try {
			if (isEditing && editingCategory) {
				await updateArticleCategory(editingCategory.id, formData);
				alert('Kategori berhasil diperbarui');
			} else {
				await createArticleCategory(formData);
				alert('Kategori berhasil ditambahkan');
			}
			
			closeModal();
			await loadCategories();
		} catch (err: any) {
			alert(isEditing ? 'Gagal memperbarui kategori' : 'Gagal menambahkan kategori');
		}
	}

	async function confirmDelete(category: ArticleCategory) {
		if (confirm(`Apakah Anda yakin ingin menghapus kategori "${category.name}"?`)) {
			try {
				await deleteArticleCategory(category.id);
				alert('Kategori berhasil dihapus');
				await loadCategories();
			} catch (err: any) {
				alert('Gagal menghapus kategori');
			}
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
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Manajemen Kategori</h1>
		<p class="text-gray-600">Kelola kategori artikel untuk konten website Anda</p>
</div>

<!-- Modal Dialog -->
{#if isModalOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" on:click={closeModal}></div>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
			<div class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
							<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
							<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
								{isEditing ? 'Edit Kategori' : 'Tambah Kategori'}
							</h3>
							<div class="mt-4 space-y-4">
								<div>
									<label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nama Kategori</label>
									<div class="mt-2">
										<input
											type="text"
											id="name"
											bind:value={formData.name}
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
											placeholder="Masukkan nama kategori"
										/>
										{#if formErrors.name}
											<p class="mt-1 text-sm text-red-600">{formErrors.name}</p>
										{/if}
									</div>
								</div>
								<div>
									<label for="description" class="block text-sm font-medium leading-6 text-gray-900">Deskripsi</label>
									<div class="mt-2">
										<textarea
											id="description"
											bind:value={formData.description}
											rows="3"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
											placeholder="Masukkan deskripsi kategori (opsional)"
										></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
						on:click={saveCategory}
					>
						{isEditing ? 'Perbarui' : 'Simpan'}
					</button>
					<button
						type="button"
						class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
						on:click={closeModal}
					>
						Batal
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Cari kategori..."
					bind:value={searchInput}
					on:blur={() => { searchQuery = searchInput; loadCategories(); }}
					on:keydown={(e) => e.key === 'Enter' && (searchQuery = searchInput, loadCategories())}
					class="w-64 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>
		<button class="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" on:click={openCreateModal}>
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
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{category.slug || '-'}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{category.description || '-'}</td>
						<td class="whitespace-nowrap px-6 py-4">
							<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
								{getArticleCount(category)} artikel
							</span>
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(category.createdAt)}</td>
						<td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
							<div class="flex space-x-2">
								<button class="text-green-600 hover:text-green-900" on:click={() => openEditModal(category)}>Edit</button>
								<button class="text-red-600 hover:text-red-900" on:click={() => confirmDelete(category)}>Hapus</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 flex items-center justify-between">
		<div class="text-sm text-gray-700">
			Menampilkan {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} dari {totalItems} kategori
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
</div>
