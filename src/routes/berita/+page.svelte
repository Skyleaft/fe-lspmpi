<script lang="ts">
	import { fly } from 'svelte/transition';
	import NewsCard from '$lib/components/ui/NewsCard.svelte';
	import type { Article } from '$lib/types';
	import { onMount, tick } from 'svelte';
	import { truncateContent, formatDate } from '$lib/utils/text';

	const articles: Article[] = [
		{
			id: 1,
			title: 'Seminar Nasional Manajemen Pendidikan Islam 2024',
			content: 'LSP MPI dengan bangga mengumumkan penyelenggaraan Seminar Nasional Manajemen Pendidikan Islam 2024 yang akan dilaksanakan pada tanggal 15-16 Maret 2024 di Jakarta Convention Center. Acara ini mengusung tema "Inovasi Manajemen Pendidikan Islam di Era Digital" dan akan dihadiri oleh lebih dari 500 peserta dari berbagai institusi pendidikan Islam di seluruh Indonesia.',
			author: 'LSP MPI',
			createdAt: '2024-01-15T08:00:00Z',
			updatedAt: '2024-01-15T10:00:00Z',
			isPublished: true,
			categoryId: 1,
			thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
			slug: 'seminar-nasional-mpi-2024'
		},
		{
			id: 2,
			title: 'Pembukaan Pendaftaran Sertifikasi Batch 12',
			content: 'LSP MPI dengan senang hati mengumumkan telah dibukanya pendaftaran sertifikasi profesi batch 12. Program ini ditujukan bagi para profesional di bidang pendidikan Islam yang ingin meningkatkan kompetensi dan kualifikasi profesional mereka.',
			author: 'LSP MPI',
			createdAt: '2024-01-10T09:00:00Z',
			updatedAt: '2024-01-10T14:30:00Z',
			isPublished: true,
			categoryId: 2,
			thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
			slug: 'pendaftaran-sertifikasi-batch-12'
		},
		{
			id: 3,
			title: 'Workshop Peningkatan Kompetensi Asesor',
			content: 'Dalam rangka meningkatkan kualitas penilaian dan sertifikasi, LSP MPI mengadakan workshop peningkatan kompetensi asesor yang akan dilaksanakan pada tanggal 20-22 Februari 2024 di Yogyakarta. Workshop ini ditujukan bagi para asesor yang telah memiliki sertifikat asesor kompetensi namun ingin meningkatkan kemampuan dan keterampilan mereka.',
			author: 'LSP MPI',
			createdAt: '2024-01-05T07:00:00Z',
			updatedAt: '2024-01-05T09:15:00Z',
			isPublished: true,
			categoryId: 3,
			thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop',
			slug: 'workshop-peningkatan-kompetensi-asesor'
		},
		{
			id: 4,
			title: 'MoU dengan Universitas Islam Negeri Jakarta',
			content: 'LSP MPI dengan bangga mengumumkan telah menjalin kerjasama strategis dengan Universitas Islam Negeri Jakarta melalui penandatanganan nota kesepahaman (MoU) yang bertujuan untuk pengembangan program sertifikasi profesi bagi mahasiswa dan alumni UIN Jakarta.',
			author: 'LSP MPI',
			createdAt: '2023-12-28T14:00:00Z',
			updatedAt: '2023-12-28T16:45:00Z',
			isPublished: true,
			categoryId: 4,
			thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
			slug: 'mou-uin-jakarta'
		},
		{
			id: 5,
			title: 'Pelatihan Manajemen Kurikulum Terintegrasi',
			content: 'LSP MPI menyelenggarakan program pelatihan khusus untuk para manajer kurikulum dalam mengintegrasikan nilai-nilai Islam dalam kurikulum pendidikan. Pelatihan ini bertujuan untuk meningkatkan kualitas pendidikan Islam di seluruh Indonesia.',
			author: 'LSP MPI',
			createdAt: '2023-12-20T08:30:00Z',
			updatedAt: '2023-12-20T11:30:00Z',
			isPublished: true,
			categoryId: 5,
			thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
			slug: 'pelatihan-manajemen-kurikulum'
		},
		{
			id: 6,
			title: 'LSP MPI Raih Penghargaan Best Practice 2023',
			content: 'LSP MPI dengan bangga mengumumkan telah meraih penghargaan Best Practice dalam kategori Lembaga Sertifikasi Profesi Terbaik dari Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
			author: 'LSP MPI',
			createdAt: '2023-12-15T10:00:00Z',
			updatedAt: '2023-12-15T13:20:00Z',
			isPublished: true,
			categoryId: 6,
			thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
			slug: 'penghargaan-best-practice-2023'
		}
	];

	let show = false;

	onMount(async () => {
		await tick(); // penting!
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

		<div class="grid gap-8 md:grid-cols-3">
			{#if show}
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
			{/if}
		</div>

		<div class="mt-12 text-center" in:fly={{ x: -50, duration: 600, delay: 400 }}>
			<button
				data-ripple-light="true"
				class="rounded-lg bg-blue-600 px-8 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase shadow-md shadow-blue-500/20 transition-all select-none hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Muat Berita Lainnya
			</button>
		</div>
	</div>
</div>
