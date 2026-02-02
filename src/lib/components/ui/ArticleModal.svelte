<script lang="ts">
	import { onMount } from 'svelte';
	import { findArticleCategories, findArticleTags, createArticle, updateArticle, uploadThumbnail, createArticleWithThumbnail } from '$lib/utils/api';
	import type { Article, ArticleCategory, ArticleTag, CreateArticleWithThumbnailDto } from '$lib/types';
	import QuillEditor from './QuillEditor.svelte';

	interface ArticleModalProps {
		article?: Article | null;
		isOpen: boolean;
		onClose: () => void;
		onSave: () => void;
	}

	let { article = null, isOpen = false, onClose, onSave } = $props();
	let title = $state('');
	let slug = $state('');
	let categoryId = $state('');
	let selectedTags = $state<string[]>([]);
	let content = $state('');
	let isPublished = $state(false);
	let thumbnailFile = $state<File | null>(null);
	let thumbnailPreview = $state('');
	let isSaving = $state(false);
	let error = $state('');

	// Dropdown data
	let categories = $state<ArticleCategory[]>([]);
	let tags = $state<ArticleTag[]>([]);

	onMount(async () => {
		await loadCategories();
		await loadTags();
	});

	// Initialize form when article changes
	$effect(() => {
		if (article) {
			title = article.title || '';
			slug = article.slug || '';
			categoryId = article.categoryId || '';
			selectedTags = article.tags?.map((tag: ArticleTag) => tag.id) || [];
			content = article.content || '';
			isPublished = article.isPublished || false;
			thumbnailPreview = article.thumbnail || '';
		}
	});

	// Generate slug from title
	$effect(() => {
		if (title) {
			slug = title.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '');
		}
	});

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

	function handleThumbnailChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			thumbnailFile = input.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				thumbnailPreview = e.target?.result as string;
			};
			reader.readAsDataURL(thumbnailFile);
		}
	}

	async function saveArticle() {
		try {
			isSaving = true;
			error = '';

			// Validate required fields
			if (!title.trim()) {
				error = 'Judul harus diisi';
				return;
			}
			if (!categoryId) {
				error = 'Kategori harus dipilih';
				return;
			}
			if (!content.trim()) {
				error = 'Konten harus diisi';
				return;
			}

			const articleData = {
				title: title.trim(),
				slug,
				content,
				isPublished,
				categoryId: Number(categoryId),
				tagIds: selectedTags,
				thumbnail:""
			};

			let articleId: string;

			if (article) {
				// Update existing article
				if (thumbnailFile) {
					const uploadResponse = await uploadThumbnail(thumbnailFile);
					articleData.thumbnail = uploadResponse.fileName;
				}
				await updateArticle(article.id, articleData);
			} else {
				// Create new article
				if (thumbnailFile) {
					const dto: CreateArticleWithThumbnailDto = {
						title: title.trim(),
						content,
						categoryId: Number(categoryId),
						tagIds: selectedTags,
						thumbnailFile
					};
					await createArticleWithThumbnail(dto);
				} else {
					await createArticle(articleData);
				}
			}

			onSave();
			onClose();
		} catch (err: any) {
			error = err.message || 'Gagal menyimpan artikel';
			console.error('Save article error:', err);
		} finally {
			isSaving = false;
		}
	}

	function closeModal() {
		if (!isSaving) {
			onClose();
		}
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<div class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" on:click={closeModal}></div>

			<div class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
				<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h3 class="text-lg font-medium text-gray-900">
						{article ? 'Edit Artikel' : 'Tambah Artikel'}
					</h3>
					<button
						on:click={closeModal}
						class="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="space-y-6 p-6">
					{#if error}
						<div class="rounded-md bg-red-50 p-4">
							<div class="text-sm text-red-700">{error}</div>
						</div>
					{/if}

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label class="block text-sm font-medium text-gray-700">Judul</label>
							<input
								type="text"
								bind:value={title}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Masukkan judul artikel"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Slug</label>
							<input
								type="text"
								bind:value={slug}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
								placeholder="Masukkan slug artikel"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Kategori</label>
							<select
								bind:value={categoryId}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							>
								<option value="">Pilih kategori</option>
								{#each categories as category (category.id)}
									<option value={category.id}>{category.name}</option>
								{/each}
							</select>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Status</label>
							<select
								bind:value={isPublished}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							>
								<option value={false}>Draft</option>
								<option value={true}>Published</option>
							</select>
						</div>

						<div class="sm:col-span-2">
							<label class="block text-sm font-medium text-gray-700">Tags</label>
							<div class="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
								{#each tags as tag (tag.id)}
									<label class="inline-flex items-center">
										<input
											type="checkbox"
											value={tag.id}
											checked={selectedTags.includes(tag.id)}
											on:change={(e) => {
												const target = e.target as HTMLInputElement;
												if (target.checked) {
													selectedTags = [...selectedTags, tag.id];
												} else {
													selectedTags = selectedTags.filter(id => id !== tag.id);
												}
											}}
											class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										<span class="ml-2 text-sm text-gray-700">{tag.name}</span>
									</label>
								{/each}
							</div>
						</div>

						<div class="sm:col-span-2">
							<label class="block text-sm font-medium text-gray-700">Thumbnail</label>
							<div class="mt-1 flex items-center space-x-4">
								{#if thumbnailPreview}
									<img src={thumbnailPreview} alt="Thumbnail Preview" class="h-20 w-20 rounded object-cover" />
								{/if}
								<input
									type="file"
									accept="image/*"
									on:change={handleThumbnailChange}
									class="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
								/>
							</div>
						</div>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700">Konten</label>
						<QuillEditor
							bind:value={content}
						/>
					</div>
				</div>

				<div class="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
					<button
						on:click={closeModal}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Batal
					</button>
					<button
						on:click={saveArticle}
						disabled={isSaving}
						class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSaving ? 'Menyimpan...' : (article ? 'Update' : 'Simpan')}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.quill-editor {
		min-height: 400px;
	}
</style>