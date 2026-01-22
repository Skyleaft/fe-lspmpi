<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Berita - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ x: -50, duration: 600 }}>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Berita & Informasi</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Informasi terkini seputar kegiatan dan perkembangan LSP MPI
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 100 }}>
				<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop" 
					 alt="Seminar Nasional" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						15 Januari 2024
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						Seminar Nasional Manajemen Pendidikan Islam 2024
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI menyelenggarakan seminar nasional dengan tema "Inovasi Manajemen Pendidikan Islam di Era Digital" yang dihadiri oleh 500+ peserta dari seluruh Indonesia...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 150 }}>
				<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop" 
					 alt="Sertifikasi Batch" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						10 Januari 2024
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						Pembukaan Pendaftaran Sertifikasi Batch 12
					</h3>
					<p class="text-gray-600 mb-4">
						Pendaftaran sertifikasi profesi batch 12 telah dibuka untuk berbagai skema kompetensi. Dapatkan kesempatan untuk meningkatkan kompetensi profesional Anda...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 200 }}>
				<img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop" 
					 alt="Workshop Asesor" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						5 Januari 2024
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						Workshop Peningkatan Kompetensi Asesor
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI mengadakan workshop untuk meningkatkan kompetensi para asesor dalam melakukan penilaian yang objektif dan profesional...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 250 }}>
				<img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop" 
					 alt="Kerjasama" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						28 Desember 2023
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						MoU dengan Universitas Islam Negeri Jakarta
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI menandatangani nota kesepahaman dengan UIN Jakarta untuk pengembangan program sertifikasi profesi bagi mahasiswa dan alumni...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 300 }}>
				<img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop" 
					 alt="Pelatihan" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						20 Desember 2023
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						Pelatihan Manajemen Kurikulum Terintegrasi
					</h3>
					<p class="text-gray-600 mb-4">
						Program pelatihan khusus untuk para manajer kurikulum dalam mengintegrasikan nilai-nilai Islam dalam kurikulum pendidikan...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 350 }}>
				<img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop" 
					 alt="Pengakuan" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-500 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						15 Desember 2023
					</div>
					<h3 class="text-xl font-semibold mb-3 hover:text-blue-600">
						LSP MPI Raih Penghargaan Best Practice 2023
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI meraih penghargaan Best Practice dalam kategori Lembaga Sertifikasi Profesi Terbaik dari Kementerian Pendidikan...
					</p>
					<a href="#" class="text-blue-600 font-medium hover:text-blue-800">
						Baca Selengkapnya →
					</a>
				</div>
			</article>
		</div>

		<div class="text-center mt-12" in:fly={{ x: -50, duration: 600, delay: 400 }}>
			<button data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
				Muat Berita Lainnya
			</button>
		</div>
	</div>
</div>
