<script lang="ts">
	import { onMount } from 'svelte';
	import { findArticleCategories, createArticleCategory, updateArticleCategory, deleteArticleCategory } from '$lib/utils/api';
	import type { ArticleCategory } from '$lib/types';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface CategoryModalProps {
		category?: ArticleCategory | null;
		isOpen: boolean;
		onClose: () => void;
		onSave: () => void;
		onDelete?: () => void;
	}

	let { category = null, isOpen = false, onClose, onSave, onDelete } = $props();
	let name = $state('');
	let description = $state('');
	let isSaving = $state(false);
	let isDeleting = $state(false);
	let error = $state('');

	// Initialize form when category changes
	$effect(() => {
		if (category) {
			name = category.name || '';
			description = category.description || '';
		} else {
			name = '';
			description = '';
		}
	});

	function closeModal() {
		if (!isSaving && !isDeleting) {
			onClose();
		}
	}

	async function saveCategory() {
		try {
			isSaving = true;
			error = '';

			// Validate required fields
			if (!name.trim()) {
				error = 'Nama kategori harus diisi';
				return;
			}

			const categoryData = {
				name: name.trim(),
				description: description.trim()
			};

			if (category) {
				// Update existing category
				await updateArticleCategory(category.id, categoryData);
			} else {
				// Create new category
				await createArticleCategory(categoryData);
			}

			onSave();
			onClose();
		} catch (err: any) {
			error = err.message || 'Gagal menyimpan kategori';
			console.error('Save category error:', err);
		} finally {
			isSaving = false;
		}
	}

	async function deleteCategory() {
		if (!category || !onDelete) return;

		try {
			isDeleting = true;
			error = '';

			await deleteArticleCategory(category.id);

			onDelete();
			onClose();
		} catch (err: any) {
			error = err.message || 'Gagal menghapus kategori';
			console.error('Delete category error:', err);
		} finally {
			isDeleting = false;
		}
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto" transition:fade={{ duration: 200 }}>
		<div
			class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<div
				class="bg-opacity-50 fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
				onclick={closeModal}
				transition:fade={{ duration: 200 }}
			></div>

			<div
				class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
				transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
			>
				<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h3 class="text-lg font-medium text-gray-900">
						{category ? 'Edit Kategori' : 'Tambah Kategori'}
					</h3>
					<button
						onclick={closeModal}
						class="rounded-md text-gray-400 transition-colors duration-200 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div class="space-y-6 p-6">
					{#if error}
						<div
							class="rounded-md border border-red-200 bg-red-50 p-4"
							transition:fade={{ duration: 200 }}
						>
							<div class="text-sm text-red-700">{error}</div>
						</div>
					{/if}

					<div class="space-y-4">
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Nama Kategori</label>
							<input
								type="text"
								bind:value={name}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								placeholder="Masukkan nama kategori"
							/>
						</div>

						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Deskripsi</label>
							<textarea
								bind:value={description}
								rows="3"
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								placeholder="Masukkan deskripsi kategori (opsional)"
							></textarea>
						</div>
					</div>
				</div>

				<div class="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
					{#if category}
						<button
							onclick={deleteCategory}
							disabled={isDeleting}
							class="transform rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:translate-y-[-2px] hover:bg-red-700 hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isDeleting ? 'Menghapus...' : 'Hapus'}
						</button>
					{/if}
					<button
						onclick={closeModal}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Batal
					</button>
					<button
						onclick={saveCategory}
						disabled={isSaving}
						class="transform rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:translate-y-[-2px] hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSaving ? 'Menyimpan...' : category ? 'Update' : 'Simpan'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Custom transition for modal content */
	:global(.svelte-modal-enter) {
		opacity: 0;
		transform: translateY(20px);
	}

	:global(.svelte-modal-enter-active) {
		transition:
			opacity 200ms ease-out,
			transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	:global(.svelte-modal-enter-to) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.svelte-modal-leave) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.svelte-modal-leave-active) {
		transition:
			opacity 200ms ease-in,
			transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	:global(.svelte-modal-leave-to) {
		opacity: 0;
		transform: translateY(20px);
	}
</style>