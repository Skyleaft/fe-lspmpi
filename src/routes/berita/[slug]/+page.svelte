<script lang="ts">
	import { onMount } from 'svelte';
	import type { Article } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { formatDate } from '$lib/utils/text';

	// Data berita statis untuk contoh
	const newsData: Record<string, Article> = {
		'seminar-nasional-mpi-2024': {
			id: 1,
			title: 'Seminar Nasional Manajemen Pendidikan Islam 2024',
			content: `
				<p>LSP MPI dengan bangga mengumumkan penyelenggaraan Seminar Nasional Manajemen Pendidikan Islam 2024 yang akan dilaksanakan pada tanggal 15-16 Maret 2024 di Jakarta Convention Center. Acara ini mengusung tema "Inovasi Manajemen Pendidikan Islam di Era Digital" dan akan dihadiri oleh lebih dari 500 peserta dari berbagai institusi pendidikan Islam di seluruh Indonesia.</p>
				
				<h3>Pembicara Utama</h3>
				<p>Seminar ini akan menghadirkan pembicara-pembicara ternama dari berbagai latar belakang, termasuk akademisi, praktisi pendidikan, dan tokoh-tokoh Islam yang berpengalaman dalam bidang manajemen pendidikan.</p>
				
				<h3>Ruang Lingkup Pembahasan</h3>
				<p>Pembahasan dalam seminar ini mencakup berbagai aspek penting dalam manajemen pendidikan Islam, antara lain:</p>
				<ul>
					<li>Transformasi digital dalam pendidikan Islam</li>
					<li>Manajemen kurikulum berbasis keunggulan lokal</li>
					<li>Pengembangan SDM pendidik Islam</li>
					<li>Kepemimpinan pendidikan Islam yang efektif</li>
					<li>Pengelolaan lembaga pendidikan Islam berbasis teknologi</li>
				</ul>
				
				<h3>Manfaat Bagi Peserta</h3>
				<p>Peserta seminar akan mendapatkan berbagai manfaat, termasuk:</p>
				<ul>
					<li>Wawasan terbaru tentang manajemen pendidikan Islam</li>
					<li>Jaringan profesional dengan sesama praktisi pendidikan</li>
					<li>Sertifikat kepesertaan resmi</li>
					<li>Materi seminar dalam bentuk digital</li>
				</ul>
			`,
			author: 'LSP MPI',
			createdAt: '2024-01-15T08:00:00Z',
			updatedAt: '2024-01-15T10:00:00Z',
			isPublished: true,
			categoryId: 1,
			thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
			slug: 'seminar-nasional-mpi-2024'
		},
		'pendaftaran-sertifikasi-batch-12': {
			id: 2,
			title: 'Pembukaan Pendaftaran Sertifikasi Batch 12',
			content: `
				<p>LSP MPI dengan senang hati mengumumkan telah dibukanya pendaftaran sertifikasi profesi batch 12. Program ini ditujukan bagi para profesional di bidang pendidikan Islam yang ingin meningkatkan kompetensi dan kualifikasi profesional mereka.</p>
				
				<h3>Skema Kompetensi yang Dibuka</h3>
				<p>Pada batch 12 ini, LSP MPI membuka pendaftaran untuk beberapa skema kompetensi, antara lain:</p>
				<ul>
					<li>Manajer Pendidikan Islam</li>
					<li>Pengelola Kurikulum Pendidikan Islam</li>
					<li>Pengembang Media Pembelajaran Islam</li>
					<li>Konselor Pendidikan Islam</li>
					<li>Auditor Mutu Pendidikan Islam</li>
				</ul>
				
				<h3>Persyaratan Pendaftaran</h3>
				<p>Untuk dapat mengikuti program sertifikasi ini, peserta harus memenuhi beberapa persyaratan, antara lain:</p>
				<ul>
					<li>Berkewarganegaraan Indonesia</li>
					<li>Berusia minimal 21 tahun</li>
					<li>Memiliki pendidikan minimal D3 di bidang terkait</li>
					<li>Memiliki pengalaman kerja minimal 2 tahun di bidang terkait</li>
				</ul>
				
				<h3>Proses Pendaftaran</h3>
				<p>Pendaftaran dapat dilakukan secara online melalui website resmi LSP MPI. Peserta diharapkan melengkapi seluruh dokumen yang diperlukan dan membayar biaya pendaftaran sesuai dengan ketentuan yang berlaku.</p>
			`,
			author: 'LSP MPI',
			createdAt: '2024-01-10T09:00:00Z',
			updatedAt: '2024-01-10T14:30:00Z',
			isPublished: true,
			categoryId: 2,
			thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
			slug: 'pendaftaran-sertifikasi-batch-12'
		},
		'workshop-peningkatan-kompetensi-asesor': {
			id: 3,
			title: 'Workshop Peningkatan Kompetensi Asesor',
			content: `
				<p>Dalam rangka meningkatkan kualitas penilaian dan sertifikasi, LSP MPI mengadakan workshop peningkatan kompetensi asesor yang akan dilaksanakan pada tanggal 20-22 Februari 2024 di Yogyakarta. Workshop ini ditujukan bagi para asesor yang telah memiliki sertifikat asesor kompetensi namun ingin meningkatkan kemampuan dan keterampilan mereka.</p>
				
				<h3>Tujuan Workshop</h3>
				<p>Workshop ini bertujuan untuk:</p>
				<ul>
					<li>Meningkatkan pemahaman asesor tentang prinsip-prinsip penilaian kompetensi</li>
					<li>Meningkatkan keterampilan asesor dalam menggunakan berbagai metode penilaian</li>
					<li>Meningkatkan kemampuan asesor dalam membuat instrumen penilaian yang valid dan reliabel</li>
					<li>Meningkatkan kemampuan asesor dalam memberikan umpan balik yang konstruktif kepada peserta uji</li>
				</ul>
				
				<h3>Metode Pelatihan</h3>
				<p>Workshop ini akan menggunakan berbagai metode pelatihan, antara lain:</p>
				<ul>
					<li>Presentasi dan diskusi</li>
					<li>Studi kasus</li>
					<li>Simulasi penilaian</li>
					<li>Latihan praktik</li>
				</ul>
			`,
			author: 'LSP MPI',
			createdAt: '2024-01-05T07:00:00Z',
			updatedAt: '2024-01-05T09:15:00Z',
			isPublished: true,
			categoryId: 3,
			thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop',
			slug: 'workshop-peningkatan-kompetensi-asesor'
		},
		'mou-uin-jakarta': {
			id: 4,
			title: 'MoU dengan Universitas Islam Negeri Jakarta',
			content: `
				<p>LSP MPI dengan bangga mengumumkan telah menjalin kerjasama strategis dengan Universitas Islam Negeri Jakarta melalui penandatanganan nota kesepahaman (MoU) yang bertujuan untuk pengembangan program sertifikasi profesi bagi mahasiswa dan alumni UIN Jakarta.</p>
				
				<h3>Tujuan Kerjasama</h3>
				<p>Kerjasama ini bertujuan untuk:</p>
				<ul>
					<li>Menyediakan program sertifikasi profesi bagi mahasiswa UIN Jakarta</li>
					<li>Meningkatkan kompetensi lulusan UIN Jakarta di dunia kerja</li>
					<li>Mengembangkan kurikulum yang terintegrasi dengan kebutuhan industri</li>
					<li>Menyediakan peluang magang dan kerja bagi lulusan UIN Jakarta</li>
				</ul>
				
				<h3>Manfaat Bagi Mahasiswa</h3>
				<p>Mahasiswa UIN Jakarta akan mendapatkan berbagai manfaat, antara lain:</p>
				<ul>
					<li>Akses ke program sertifikasi profesi dengan biaya terjangkau</li>
					<li>Pelatihan dan pendampingan dalam proses sertifikasi</li>
					<li>Sertifikat kompetensi yang diakui secara nasional</li>
					<li>Jaringan profesional dengan dunia industri</li>
				</ul>
			`,
			author: 'LSP MPI',
			createdAt: '2023-12-28T14:00:00Z',
			updatedAt: '2023-12-28T16:45:00Z',
			isPublished: true,
			categoryId: 4,
			thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
			slug: 'mou-uin-jakarta'
		},
		'pelatihan-manajemen-kurikulum': {
			id: 5,
			title: 'Pelatihan Manajemen Kurikulum Terintegrasi',
			content: `
				<p>LSP MPI menyelenggarakan program pelatihan khusus untuk para manajer kurikulum dalam mengintegrasikan nilai-nilai Islam dalam kurikulum pendidikan. Pelatihan ini bertujuan untuk meningkatkan kualitas pendidikan Islam di seluruh Indonesia.</p>
				
				<h3>Target Peserta</h3>
				<p>Pelatihan ini ditujukan bagi:</p>
				<ul>
					<li>Kepala sekolah dan madrasah</li>
					<li>Koordinator kurikulum</li>
					<li>Guru mata pelajaran agama Islam</li>
					<li>Pengawas pendidikan</li>
				</ul>
				
				<h3>Materi Pelatihan</h3>
				<p>Materi pelatihan mencakup:</p>
				<ul>
					<li>Prinsip-prinsip kurikulum berbasis nilai Islam</li>
					<li>Strategi integrasi nilai Islam dalam pembelajaran</li>
					<li>Penyusunan silabus dan RPP berbasis nilai Islam</li>
					<li>Penilaian pembelajaran berbasis nilai Islam</li>
					<li>Manajemen implementasi kurikulum terintegrasi</li>
				</ul>
			`,
			author: 'LSP MPI',
			createdAt: '2023-12-20T08:30:00Z',
			updatedAt: '2023-12-20T11:30:00Z',
			isPublished: true,
			categoryId: 5,
			thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
			slug: 'pelatihan-manajemen-kurikulum'
		},
		'penghargaan-best-practice-2023': {
			id: 6,
			title: 'LSP MPI Raih Penghargaan Best Practice 2023',
			content: `
				<p>LSP MPI dengan bangga mengumumkan telah meraih penghargaan Best Practice dalam kategori Lembaga Sertifikasi Profesi Terbaik dari Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.</p>
				
				<h3>Prestasi yang Dicapai</h3>
				<p>Penghargaan ini diberikan atas berbagai prestasi LSP MPI, antara lain:</p>
				<ul>
					<li>Kualitas pelaksanaan sertifikasi yang konsisten</li>
					<li>Inovasi dalam metode penilaian kompetensi</li>
					<li>Kerjasama strategis dengan berbagai institusi pendidikan</li>
					<li>Kontribusi dalam pengembangan SDM di bidang pendidikan Islam</li>
				</ul>
				
				<h3>Komitmen LSP MPI</h3>
				<p>LSP MPI berkomitmen untuk terus meningkatkan kualitas layanan dan berkontribusi dalam pengembangan pendidikan Islam di Indonesia. Penghargaan ini menjadi motivasi untuk terus berinovasi dan memberikan pelayanan terbaik bagi seluruh stakeholder.</p>
			`,
			author: 'LSP MPI',
			createdAt: '2023-12-15T10:00:00Z',
			updatedAt: '2023-12-15T13:20:00Z',
			isPublished: true,
			categoryId: 6,
			thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
			slug: 'penghargaan-best-practice-2023'
		}
	};

	let news: Article | null = null;
	let isLoading = true;
	let error = false;

	onMount(() => {
		const slug = get(page).params.slug;
		const newsItem = slug ? newsData[slug] : null;
		
		if (newsItem) {
			news = newsItem;
		} else {
			error = true;
		}
		isLoading = false;
	});
</script>

<svelte:head>
	{#if news}
		<title>{news.title} - LSP Manajemen Pendidikan Islam</title>
		<meta name="description" content={news.content.substring(0, 160)} />
		<meta property="og:title" content={news.title} />
		<meta property="og:description" content={news.content.substring(0, 160)} />
		<meta property="og:image" content={news.thumbnail} />
		<meta property="og:type" content="article" />
		<meta property="article:published_time" content={news.createdAt} />
	{/if}
</svelte:head>

{#if isLoading}
	<div class="flex items-center justify-center py-16">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
	</div>
{/if}

{#if error}
	<div class="bg-white py-16">
		<div class="mx-auto max-w-4xl px-4 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900">Berita Tidak Ditemukan</h1>
			<p class="mb-8 text-xl text-gray-600">
				Maaf, berita yang Anda cari tidak dapat ditemukan. Silakan kembali ke halaman berita atau hubungi kami jika Anda membutuhkan bantuan.
			</p>
			<a 
				href="/berita"
				class="inline-block rounded-lg bg-blue-600 px-8 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Kembali ke Berita
			</a>
		</div>
	</div>
{/if}

{#if news}
	<div class="bg-white py-16">
		<div class="mx-auto max-w-4xl px-4">
			<div class="mb-8" in:fly={{ x: -50, duration: 600 }}>
				<a 
					href="/berita"
					class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
					<span>Kembali ke Berita</span>
				</a>
			</div>

			<article class="space-y-8" in:fly={{ x: -50, duration: 600, delay: 100 }}>
				<div class="relative overflow-hidden rounded-lg">
					<img 
						src={news.thumbnail} 
						alt={news.title}
						class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
					<div class="absolute bottom-4 left-4 text-white">
						<span class="inline-block bg-blue-600 px-3 py-1 text-sm rounded-full">Berita</span>
					</div>
				</div>

				<div class="space-y-4">
					<time class="text-sm text-gray-500">{formatDate(news.updatedAt)}</time>
					<h1 class="text-3xl font-bold text-gray-900 md:text-4xl">{news.title}</h1>
					<p class="text-lg text-gray-600">{news.content.substring(0, 160)}...</p>
				</div>

				<div class="prose prose-lg max-w-none">
					{@html news.content}
				</div>

				<div class="flex justify-between items-center pt-8 border-t border-gray-200">
					<div class="flex space-x-4">
						<a 
							href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(window.location.href)}"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:text-blue-800 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</a>
						<a 
							href="https://twitter.com/intent/tweet?url={encodeURIComponent(window.location.href)}&text={encodeURIComponent(news.title)}"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-400 hover:text-blue-600 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
						<a 
							href="https://api.whatsapp.com/send?text={encodeURIComponent(news.title + ' ' + window.location.href)}"
							target="_blank"
							rel="noopener noreferrer"
							class="text-green-500 hover:text-green-700 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
							</svg>
						</a>
					</div>

					<a 
						href="/berita"
						class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
					>
						<span>Lihat Berita Lainnya</span>
						<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</article>
		</div>
	</div>
{/if}