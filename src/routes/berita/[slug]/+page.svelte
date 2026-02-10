<script lang="ts">
	import type { Article, ArticleCategory } from '$lib/types';
	import { ChevronRight } from '@lucide/svelte';

	export let data: { article: Article; category: ArticleCategory | null };

	$: article = data.article;
	$: category = data.category;

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
	<div class="container mx-auto px-4 py-8 max-w-5xl">
		<!-- Breadcrumb -->
		<nav class="mb-6" aria-label="Breadcrumb">
			<ol class="flex items-center space-x-2 text-sm text-gray-600">
				<li>
					<a href="/" class="hover:text-blue-600 transition-colors">Beranda</a>
				</li>
				<li>
					<ChevronRight class="w-4 h-4 text-gray-400" />
				</li>
				<li>
					<a href="/berita" class="hover:text-blue-600 transition-colors">Berita</a>
				</li>
				<li>
					<ChevronRight class="w-4 h-4 text-gray-400" />
				</li>
				<li class="text-gray-900 font-medium">{article?.title || 'Artikel'}</li>
			</ol>
		</nav>

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
				</div>
			</article>
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