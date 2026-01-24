<script lang="ts">
	import { fly } from 'svelte/transition';
	import NewsCard from '$lib/components/ui/NewsCard.svelte';
	import type { NewsItem } from '$lib/types';
	import { onMount, tick } from 'svelte';

	const newsItems: NewsItem[] = [
		{
			id: '1',
			title: 'Seminar Nasional Manajemen Pendidikan Islam 2024',
			excerpt:
				'LSP MPI menyelenggarakan seminar nasional dengan tema "Inovasi Manajemen Pendidikan Islam di Era Digital" yang dihadiri oleh 500+ peserta dari seluruh Indonesia...',
			content: 'LSP MPI dengan bangga mengumumkan penyelenggaraan Seminar Nasional Manajemen Pendidikan Islam 2024 yang akan dilaksanakan pada tanggal 15-16 Maret 2024 di Jakarta Convention Center. Acara ini mengusung tema "Inovasi Manajemen Pendidikan Islam di Era Digital" dan akan dihadiri oleh lebih dari 500 peserta dari berbagai institusi pendidikan Islam di seluruh Indonesia.',
			date: '15 Januari 2024',
			link: '/berita/seminar-nasional-mpi-2024',
			image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'
		},
		{
			id: '2',
			title: 'Pembukaan Pendaftaran Sertifikasi Batch 12',
			excerpt:
				'Pendaftaran sertifikasi profesi batch 12 telah dibuka untuk berbagai skema kompetensi. Dapatkan kesempatan untuk meningkatkan kompetensi profesional Anda...',
			content: 'LSP MPI dengan senang hati mengumumkan telah dibukanya pendaftaran sertifikasi profesi batch 12. Program ini ditujukan bagi para profesional di bidang pendidikan Islam yang ingin meningkatkan kompetensi dan kualifikasi profesional mereka.',
			date: '10 Januari 2024',
			link: '/berita/pendaftaran-sertifikasi-batch-12',
			image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop'
		},
		{
			id: '3',
			title: 'Workshop Peningkatan Kompetensi Asesor',
			excerpt:
				'LSP MPI mengadakan workshop untuk meningkatkan kompetensi para asesor dalam melakukan penilaian yang objektif dan profesional...',
			content: 'Dalam rangka meningkatkan kualitas penilaian dan sertifikasi, LSP MPI mengadakan workshop peningkatan kompetensi asesor yang akan dilaksanakan pada tanggal 20-22 Februari 2024 di Yogyakarta. Workshop ini ditujukan bagi para asesor yang telah memiliki sertifikat asesor kompetensi namun ingin meningkatkan kemampuan dan keterampilan mereka.',
			date: '5 Januari 2024',
			link: '/berita/workshop-peningkatan-kompetensi-asesor',
			image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop'
		},
		{
			id: '4',
			title: 'MoU dengan Universitas Islam Negeri Jakarta',
			excerpt:
				'LSP MPI menandatangani nota kesepahaman dengan UIN Jakarta untuk pengembangan program sertifikasi profesi bagi mahasiswa dan alumni...',
			content: 'LSP MPI dengan bangga mengumumkan telah menjalin kerjasama strategis dengan Universitas Islam Negeri Jakarta melalui penandatanganan nota kesepahaman (MoU) yang bertujuan untuk pengembangan program sertifikasi profesi bagi mahasiswa dan alumni UIN Jakarta.',
			date: '28 Desember 2023',
			link: '#',
			image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop'
		},
		{
			id: '5',
			title: 'Pelatihan Manajemen Kurikulum Terintegrasi',
			excerpt:
				'Program pelatihan khusus untuk para manajer kurikulum dalam mengintegrasikan nilai-nilai Islam dalam kurikulum pendidikan...',
			content: 'LSP MPI menyelenggarakan program pelatihan khusus untuk para manajer kurikulum dalam mengintegrasikan nilai-nilai Islam dalam kurikulum pendidikan. Pelatihan ini bertujuan untuk meningkatkan kualitas pendidikan Islam di seluruh Indonesia.',
			date: '20 Desember 2023',
			link: '#',
			image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop'
		},
		{
			id: '6',
			title: 'LSP MPI Raih Penghargaan Best Practice 2023',
			excerpt:
				'LSP MPI meraih penghargaan Best Practice dalam kategori Lembaga Sertifikasi Profesi Terbaik dari Kementerian Pendidikan...',
			content: 'LSP MPI dengan bangga mengumumkan telah meraih penghargaan Best Practice dalam kategori Lembaga Sertifikasi Profesi Terbaik dari Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
			date: '15 Desember 2023',
			link: '#',
			image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
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
				{#each newsItems as news, index (news.id)}
					<NewsCard {news} delay={100 + index * 50} />
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
