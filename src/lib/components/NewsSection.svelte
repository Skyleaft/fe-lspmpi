<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ x: -50, duration: 600 }}>
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Berita Terkini</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Informasi terbaru seputar kegiatan dan perkembangan LSP MPI
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:bg-blue-50 hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 100 }}>
				<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop" 
					 alt="Seminar Nasional" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-600 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						15 Januari 2024
					</div>
					<h3 class="text-xl font-bold mb-3 text-gray-900">
						<a href="/berita/seminar-nasional-2024" class="hover:text-blue-600 transition-colors">Seminar Nasional Manajemen Pendidikan Islam 2024</a>
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI menyelenggarakan seminar nasional dengan tema "Inovasi Manajemen Pendidikan Islam di Era Digital"...
					</p>
					<a href="/berita/seminar-nasional-2024" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:bg-purple-50 hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 200 }}>
				<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop" 
					 alt="Sertifikasi Batch" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-600 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						10 Januari 2024
					</div>
					<h3 class="text-xl font-bold mb-3 text-gray-900">
						<a href="/berita/sertifikasi-batch-12" class="hover:text-purple-600 transition-colors">Pembukaan Pendaftaran Sertifikasi Batch 12</a>
					</h3>
					<p class="text-gray-600 mb-4">
						Pendaftaran sertifikasi profesi batch 12 telah dibuka untuk berbagai skema kompetensi...
					</p>
					<a href="/berita/sertifikasi-batch-12" class="text-purple-600 hover:text-purple-800 font-medium transition-colors">
						Baca Selengkapnya →
					</a>
				</div>
			</article>

			<article class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:bg-green-50 hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 300 }}>
				<img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop" 
					 alt="Workshop Asesor" class="w-full h-48 object-cover">
				<div class="p-6">
					<div class="flex items-center text-sm text-gray-600 mb-2">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						5 Januari 2024
					</div>
					<h3 class="text-xl font-bold mb-3 text-gray-900">
						<a href="/berita/workshop-asesor" class="hover:text-green-600 transition-colors">Workshop Peningkatan Kompetensi Asesor</a>
					</h3>
					<p class="text-gray-600 mb-4">
						LSP MPI mengadakan workshop untuk meningkatkan kompetensi para asesor dalam melakukan penilaian...
					</p>
					<a href="/berita/workshop-asesor" class="text-green-600 hover:text-green-800 font-medium transition-colors">
						Baca Selengkapnya →
					</a>
				</div>
			</article>
		</div>

		<div class="text-center mt-12" in:fly={{ x: -50, duration: 600, delay: 400 }}>
			<a href="/berita" data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none inline-block">
				Lihat Semua Berita
			</a>
		</div>
	</div>
</section>
