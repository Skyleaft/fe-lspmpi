<script lang="ts">
	import { Home, Search, ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	
	let mouseX = $state(0);
	let mouseY = $state(0);
	
	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX / window.innerWidth;
			mouseY = e.clientY / window.innerHeight;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<svelte:head>
	<title>404 - Halaman Tidak Ditemukan | LSP MPI</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 overflow-hidden relative">
	<!-- Animated Background Elements -->
	<div 
		class="absolute inset-0 opacity-30"
		style="transform: translate({mouseX * 20}px, {mouseY * 20}px); transition: transform 0.3s ease-out;"
	>
		<div class="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
		<div class="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full blur-3xl"></div>
	</div>

	<div class="relative z-10 text-center max-w-2xl">
		<!-- 404 Number with Animation -->
		<div class="mb-8">
			<h1 
				class="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"
				style="transform: translate({mouseX * -10}px, {mouseY * -10}px); transition: transform 0.3s ease-out;"
			>
				404
			</h1>
		</div>

		<!-- Icon with Floating Animation -->
		<div class="mb-6 flex justify-center">
			<div class="relative">
				<div class="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-ping"></div>
				<div class="relative bg-white p-6 rounded-full shadow-xl">
					<Search class="w-16 h-16 text-blue-600" />
				</div>
			</div>
		</div>

		<!-- Text Content -->
		<div class="mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
				Oops! Halaman Tidak Ditemukan
			</h2>
			<p class="text-lg text-gray-600 mb-2">
				Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
			</p>
			<p class="text-gray-500">
				Jangan khawatir, mari kembali ke jalur yang benar!
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<a 
				href="/"
				data-ripple-light="true"
				class="flex items-center gap-2 select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				<Home class="w-5 h-5" />
				<span>Kembali ke Beranda</span>
			</a>
			
			<button 
				onclick={() => history.back()}
				data-ripple-light="true"
				class="flex items-center gap-2 select-none rounded-lg border-2 border-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-blue-600 transition-all hover:bg-blue-600 hover:text-white hover:scale-105 focus:opacity-[0.85] active:opacity-[0.85]"
			>
				<ArrowLeft class="w-5 h-5" />
				<span>Halaman Sebelumnya</span>
			</button>
		</div>

		<!-- Popular Links -->
		<div class="mt-12 pt-8 border-t border-gray-200">
			<p class="text-sm text-gray-600 mb-4 font-medium">Halaman Populer:</p>
			<div class="flex flex-wrap justify-center gap-3">
				<a href="/tentang" class="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 text-sm font-medium">
					Tentang Kami
				</a>
				<a href="/uji-kompetensi" class="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 text-sm font-medium">
					Uji Kompetensi
				</a>
				<a href="/galeri" class="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 text-sm font-medium">
					Galeri
				</a>
				<a href="/kontak" class="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 text-sm font-medium">
					Kontak
				</a>
			</div>
		</div>
	</div>
</div>
