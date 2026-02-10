<script lang="ts">
	import { fly } from 'svelte/transition';
	import NewsCard from '$lib/components/ui/NewsCard.svelte';
	import type { Article, FindRequest, ArticlePaginatedResponse } from '$lib/types';
	import { onMount, tick } from 'svelte';
	import { truncateContent, formatDate } from '$lib/utils/text';
	import { findArticles } from '$lib/utils/api';

	let articles: Article[] = [];
	let loading = true;
	let error: string | null = null;
	let currentPage = 1;
	let totalPages = 1;
	let totalArticles = 0;
	let searchQuery = '';
	let show = false;

	// Fetch articles with pagination
	async function fetchArticles(page: number = 1) {
		loading = true;
		error = null;
		
		try {
			const params: FindRequest = {
				page: page,
				pageSize: 9,
				search: searchQuery || undefined
			};
			
			const response: ArticlePaginatedResponse = await findArticles(params);
			articles = response.data || [];
			currentPage = response.page || page;
			totalPages = Math.ceil((response.totalCount || 0) / params.pageSize);
			totalArticles = response.totalCount || 0;
		} catch (err) {
			error = 'Gagal memuat berita';
			console.error('Error fetching articles:', err);
		} finally {
			loading = false;
		}
	}

	// Handle search
	async function handleSearch() {
		currentPage = 1;
		await fetchArticles(1);
	}

	// Handle pagination
	async function goToPage(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			await fetchArticles(page);
		}
	}

	// Handle next page
	async function nextPage() {
		if (currentPage < totalPages) {
			await fetchArticles(currentPage + 1);
		}
	}

	// Handle previous page
	async function prevPage() {
		if (currentPage > 1) {
			await fetchArticles(currentPage - 1);
		}
	}

	onMount(async () => {
		await fetchArticles(1);
		await tick();
		show = true;
	});
</script>

<svelte:head>
	<title>Berita - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="bg-white py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-12 text-center" in:fly={{ x: -50, duration: 600 }}>
			<h1 class="mb-4 text-4xl font-bold text-gray-900">Berita & Informasi</h1>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Informasi terkini seputar kegiatan dan perkembangan LSP MPI
			</p>
		</div>

		<!-- Search Section -->
		<div class="mb-8 flex justify-center">
			<div class="relative w-full max-w-md">
				<input
					type="text"
					bind:value={searchQuery}
					on:input={handleSearch}
					placeholder="Cari berita..."
					class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none"
				/>
				<svg
					class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
		</div>

		<!-- Articles Grid -->
		{#if loading}
			<div class="grid gap-8 md:grid-cols-3">
				{#each [1, 2, 3] as _}
					<div class="animate-pulse">
						<div class="aspect-video w-full rounded-lg bg-gray-300"></div>
						<div class="mt-4 space-y-3">
							<div class="h-4 w-3/4 rounded bg-gray-300"></div>
							<div class="h-4 w-full rounded bg-gray-300"></div>
							<div class="h-4 w-1/2 rounded bg-gray-300"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if error}
			<div class="col-span-3 text-center text-red-600">
				{error}
			</div>
		{:else if articles.length === 0}
			<div class="col-span-3 text-center text-gray-500">
				Belum ada berita yang ditemukan
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-3">
				{#each articles as news (news.id)}
					<NewsCard
						title={news.title}
						excerpt={truncateContent(news.content, 120)}
						imageSrc={'/api/articles/thumbnail/'+news.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'}
						imageAlt={news.title}
						date={formatDate(news.updatedAt)}
						href={`/berita/${news.slug}`}
						delay={100 + (news.id === 1 ? 0 : news.id === 2 ? 100 : 200)}
					/>
				{/each}
			</div>
		{/if}

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-12 flex items-center justify-center gap-4" in:fly={{ x: -50, duration: 600, delay: 400 }}>
				<button
					on:click={prevPage}
					disabled={currentPage === 1}
					class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Sebelumnya
				</button>
				
				<div class="flex gap-2">
					{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
						<button
							on:click={() => goToPage(page)}
							class="min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors {
								currentPage === page
									? 'bg-blue-600 text-white'
									: 'bg-white text-gray-700 hover:bg-gray-100'
							}"
						>
							{page}
						</button>
					{/each}
				</div>
				
				<button
					on:click={nextPage}
					disabled={currentPage === totalPages}
					class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Selanjutnya
				</button>
			</div>
		{/if}
	</div>
</div>
