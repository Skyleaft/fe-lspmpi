<script lang="ts">
	import { fly } from 'svelte/transition';
	import NewsCard from './ui/NewsCard.svelte';
	import type { Article } from '../types';
	import { resolve } from '$app/paths';
	import { truncateContent, formatDate } from '$lib/utils/text';

	export let articles: Article[] = [];
</script>

<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center" in:fly={{ x: -50, duration: 600 }}>
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Berita Terkini</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Informasi terbaru seputar kegiatan dan perkembangan LSP MPI
			</p>
		</div>

		{#if articles.length === 0}
			<div class="col-span-3 text-center text-gray-500">
				Belum ada berita terkini
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
						href={resolve(`/berita/${news.slug}`)}
						delay={100 + (news.id === 1 ? 0 : news.id === 2 ? 100 : 200)}
					/>
				{/each}
			</div>
		{/if}

		<div class="mt-12 text-center" in:fly={{ x: -50, duration: 600, delay: 400 }}>
			<a
				href={resolve('/berita')}
				data-ripple-light="true"
				class="inline-block rounded-lg bg-blue-600 px-8 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase shadow-md shadow-blue-500/20 transition-all select-none hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Lihat Semua Berita
			</a>
		</div>
	</div>
</section>
