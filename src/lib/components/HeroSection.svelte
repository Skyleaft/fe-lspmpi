<script lang="ts">
	import { fly } from 'svelte/transition';
	import { siteSettings } from '$lib/stores/siteSettings';
	import { resolve } from '$app/paths';
</script>

<section class="overflow-hidden bg-gradient-to-br from-blue-200 to-blue-700 py-20">
	<div class="container mx-auto px-4 text-center text-white">
		<h1 class="mb-6 text-4xl font-bold md:text-6xl" in:fly={{ x: -100, duration: 800 }}>
			{$siteSettings.siteName || 'LSP Manajemen Pendidikan Islam'}
		</h1>
		<p
			class="mx-auto mb-8 max-w-3xl text-xl opacity-90"
			in:fly={{ x: -100, duration: 800, delay: 200 }}
		>
			{$siteSettings.siteDescription ||
				'Lembaga Sertifikasi Profesi terdepan dalam mengembangkan kompetensi profesional di bidang manajemen pendidikan Islam yang berkualitas dan terpercaya.'}
		</p>
		<div
			class="flex flex-col justify-center gap-4 sm:flex-row"
			in:fly={{ x: -100, duration: 800, delay: 400 }}
		>
			<a
				href={resolve('/uji-kompetensi')}
				data-ripple-light="true"
				class="rounded-lg bg-white px-6 py-3 text-center align-middle font-sans text-sm font-bold text-blue-600 uppercase shadow-md shadow-white/20 transition-all select-none hover:scale-105 hover:shadow-lg hover:shadow-white/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Daftar Uji Kompetensi
			</a>
			<a
				href={resolve('/tentang')}
				data-ripple-dark="true"
				class="rounded-lg border-2 border-white px-6 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase transition-all select-none hover:scale-105 hover:bg-white hover:text-blue-600 focus:opacity-[0.85] active:opacity-[0.85]"
			>
				Pelajari Lebih Lanjut
			</a>
		</div>
	</div>
</section>
