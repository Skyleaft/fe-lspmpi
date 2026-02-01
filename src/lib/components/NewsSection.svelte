<script lang="ts">
	import { fly } from 'svelte/transition';
	import NewsCard from './ui/NewsCard.svelte';
	import type { Article } from '../types';
	import { truncateContent, formatDate } from '$lib/utils/text';

	const articles: Article[] = [
		{
			id: 1,
			title: 'Seminar Nasional Manajemen Pendidikan Islam 2024',
			content: 'LSP MPI dengan bangga mengumumkan penyelenggaraan Seminar Nasional Manajemen Pendidikan Islam 2024 yang akan dilaksanakan pada tanggal 15-16 Maret 2024 di Jakarta Convention Center. Acara ini mengusung tema "Inovasi Manajemen Pendidikan Islam di Era Digital" dan akan dihadiri oleh lebih dari 500 peserta dari berbagai institusi pendidikan Islam di seluruh Indonesia.',
			author: 'Admin LSP MPI',
			createdAt: '2024-01-15T00:00:00.000Z',
			updatedAt: '2024-01-15T00:00:00.000Z',
			isPublished: true,
			categoryId: 1,
			slug: 'seminar-nasional-mpi-2024',
			thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'
		},
		{
			id: 2,
			title: 'Pembukaan Pendaftaran Sertifikasi Batch 12',
			content: 'LSP MPI dengan senang hati mengumumkan telah dibukanya pendaftaran sertifikasi profesi batch 12. Program ini ditujukan bagi para profesional di bidang pendidikan Islam yang ingin meningkatkan kompetensi dan kualifikasi profesional mereka.',
			author: 'Admin LSP MPI',
			createdAt: '2024-01-10T00:00:00.000Z',
			updatedAt: '2024-01-10T00:00:00.000Z',
			isPublished: true,
			categoryId: 2,
			slug: 'pendaftaran-sertifikasi-batch-12',
			thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop'
		},
		{
			id: 3,
			title: 'Workshop Peningkatan Kompetensi Asesor',
			content: 'Dalam rangka meningkatkan kualitas penilaian dan sertifikasi, LSP MPI mengadakan workshop peningkatan kompetensi asesor yang akan dilaksanakan pada tanggal 20-22 Februari 2024 di Yogyakarta. Workshop ini ditujukan bagi para asesor yang telah memiliki sertifikat asesor kompetensi namun ingin meningkatkan kemampuan dan keterampilan mereka.',
			author: 'Admin LSP MPI',
			createdAt: '2024-01-05T00:00:00.000Z',
			updatedAt: '2024-01-05T00:00:00.000Z',
			isPublished: true,
			categoryId: 3,
			slug: 'workshop-peningkatan-kompetensi-asesor',
			thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop'
		}
	];
</script>

<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center" in:fly={{ x: -50, duration: 600 }}>
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Berita Terkini</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Informasi terbaru seputar kegiatan dan perkembangan LSP MPI
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each articles as news (news.id)}
				<NewsCard
					title={news.title}
					excerpt={truncateContent(news.content, 120)}
					imageSrc={news.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'}
					imageAlt={news.title}
					date={formatDate(news.updatedAt)}
					href={`/berita/${news.slug}`}
					delay={100 + (news.id === 1 ? 0 : news.id === 2 ? 100 : 200)}
				/>
			{/each}
		</div>

		<div class="mt-12 text-center" in:fly={{ x: -50, duration: 600, delay: 400 }}>
			<a
				href="/berita"
				data-ripple-light="true"
				class="inline-block rounded-lg bg-blue-600 px-8 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase shadow-md shadow-blue-500/20 transition-all select-none hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Lihat Semua Berita
			</a>
		</div>
	</div>
</section>
