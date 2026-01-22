<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Galeri - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="py-16 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ x: -50, duration: 600 }}>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Galeri LSP MPI</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Dokumentasi kegiatan dan momen penting dalam perjalanan LSP MPI
			</p>
		</div>

		<div class="mb-8" in:fly={{ x: -50, duration: 600, delay: 100 }}>
			<div class="flex flex-wrap justify-center gap-4">
				<button data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Semua</button>
				<button data-ripple-light="true" class="select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Sertifikasi</button>
				<button data-ripple-light="true" class="select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Seminar</button>
				<button data-ripple-light="true" class="select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Workshop</button>
				<button data-ripple-light="true" class="select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Pelatihan</button>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 200 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop" 
						 alt="Sertifikasi Batch 12" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Sertifikasi Batch 12</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Pelaksanaan uji kompetensi batch 12 dengan 150 peserta</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 250 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop" 
						 alt="Seminar Nasional" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Seminar Nasional 2024</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Seminar dengan tema Inovasi Manajemen Pendidikan Islam</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 300 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop" 
						 alt="Workshop Asesor" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Workshop Asesor</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Pelatihan peningkatan kompetensi para asesor LSP MPI</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 350 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" 
						 alt="Wisuda Sertifikasi" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Wisuda Sertifikasi</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Penyerahan sertifikat kepada alumni yang lulus uji kompetensi</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 400 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop" 
						 alt="Pelatihan Online" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Pelatihan Online</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Sesi pelatihan daring untuk persiapan uji kompetensi</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 450 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" 
						 alt="Kunjungan Industri" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Kunjungan Industri</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Kunjungan ke lembaga pendidikan Islam terkemuka</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 500 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
						 alt="Rapat Koordinasi" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Rapat Koordinasi</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Koordinasi dengan stakeholder pendidikan Islam</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 550 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" 
						 alt="Diskusi Panel" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Diskusi Panel</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Panel diskusi tentang masa depan pendidikan Islam</p>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all" in:fly={{ x: -50, duration: 600, delay: 600 }}>
				<div class="relative bg-clip-border overflow-hidden bg-white text-gray-700 shadow-lg m-0 rounded-none">
					<img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop" 
						 alt="Acara Networking" class="w-full h-48 object-cover">
				</div>
				<div class="p-6">
					<h3 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased mb-2">Acara Networking</h3>
					<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">Networking session dengan para profesional pendidikan</p>
				</div>
			</div>
		</div>

		<div class="text-center mt-12" in:fly={{ x: -50, duration: 600, delay: 650 }}>
			<button data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
				Muat Lebih Banyak
			</button>
		</div>
	</div>
</div>
