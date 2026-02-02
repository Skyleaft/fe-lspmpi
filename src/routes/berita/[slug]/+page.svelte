<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { findArticleBySlug, getArticleCategory } from '$lib/utils/api';
	import type { Article, ArticleCategory } from '$lib/types';

	let article: Article | null = null;
	let category: ArticleCategory | null = null;
	let loading = true;
	let error = '';

	onMount(async () => {
		const slug = $page.params.slug;
		if (slug) {
			await loadArticle(slug);
		}
	});

	async function loadArticle(slug: string) {
		try {
			loading = true;
			article = await findArticleBySlug(slug);
			if (article) {
				category = await getArticleCategory(article.categoryId);
			}
		} catch (err: any) {
			error = 'Artikel tidak ditemukan';
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
</script>

<svelte:head>
	<title>{article?.title || 'Preview Artikel'}</title>
	<meta name="description" content={article?.content?.substring(0, 160) || ''} />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8 max-w-4xl">
		{#if loading}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		{:else if error}
			<div class="text-center py-16">
				<h1 class="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
				<p class="text-gray-600">{error}</p>
			</div>
		{:else if article}
			<article class="bg-white rounded-lg shadow-lg overflow-hidden">
				{#if article.thumbnail && article.thumbnail.trim()}
					<div class="aspect-video w-full">
						<img 
							src="/api/articles/thumbnail/{article.thumbnail}" 
							alt={article.title}
							class="w-full h-full object-cover"
						/>
					</div>
				{/if}

				<div class="p-8">
					<div class="mb-6">
						{#if category}
							<span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
								{category.name}
							</span>
						{/if}
						
						<h1 class="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
						
						<div class="flex items-center text-gray-600 text-sm mb-6">
							<time datetime={article.createdAt}>
								{formatDate(article.createdAt)}
							</time>
							<span class="mx-2">•</span>
							<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {article.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
								{article.isPublished ? 'Published' : 'Draft'}
							</span>
						</div>
					</div>

					<div class="prose max-w-none">
						{@html article.content}
					</div>

					{#if article.tags && article.tags.length > 0}
						<div class="mt-8 pt-6 border-t border-gray-200">
							<h3 class="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
							<div class="flex flex-wrap gap-2">
								{#each article.tags as tag}
									<span class="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
										{tag.name}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</article>
		{/if}
	</div>
</div>

<style>
	:global(.prose h1) {
		font-size: 2rem;
		font-weight: 700;
		margin: 1.5rem 0 1rem 0;
		color: #1f2937;
	}

	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1.25rem 0 0.75rem 0;
		color: #374151;
	}

	:global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: #374151;
	}

	:global(.prose p) {
		margin: 1rem 0;
		line-height: 1.7;
		color: #4b5563;
	}

	:global(.prose ul, .prose ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	:global(.prose a) {
		color: #2563eb;
		text-decoration: underline;
	}

	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1.5rem 0;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}
</style>