<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<section class="bg-gradient-to-br from-blue-200 to-blue-700 py-20 overflow-hidden">
	<div class="container mx-auto text-center text-white px-4">
		<h1 class="text-4xl md:text-6xl font-bold mb-6" in:fly={{ x: -100, duration: 800 }}>LSP Manajemen Pendidikan Islam</h1>
		<p class="text-xl mb-8 max-w-3xl mx-auto opacity-90" in:fly={{ x: -100, duration: 800, delay: 200 }}>
			Lembaga Sertifikasi Profesi terdepan dalam mengembangkan kompetensi profesional 
			di bidang manajemen pendidikan Islam yang berkualitas dan terpercaya.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center" in:fly={{ x: -100, duration: 800, delay: 400 }}>
			<a href="/uji-kompetensi" data-ripple-light="true" class="select-none rounded-lg bg-white py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-blue-600 shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40 hover:scale-105 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
				Daftar Uji Kompetensi
			</a>
			<a href="/tentang" data-ripple-dark="true" class="select-none rounded-lg border-2 border-white py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white transition-all hover:bg-white hover:text-blue-600 hover:scale-105 focus:opacity-[0.85] active:opacity-[0.85]">
				Pelajari Lebih Lanjut
			</a>
		</div>
	</div>
</section>