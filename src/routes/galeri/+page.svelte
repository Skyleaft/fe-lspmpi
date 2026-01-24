<script lang="ts">
	import GalleryCard from '$lib/components/ui/GalleryCard.svelte';
	import { fly } from 'svelte/transition';

	const galleryImages = [
		'1747312094_WhatsApp Image 2025-05-15 at 13.29.23.webp',
		'1761203945_WhatsApp Image 2025-10-23 at 13.52.28.webp',
		'1763357765_WhatsApp Image 2025-11-17 at 05.30.40_3feb6635.webp',
		'DSC05259.webp',
		'DSC05293.webp',
		'DSC05302.webp',
		'IMG_5596.webp',
		'IMG_5618.webp',
		'WhatsApp Image 2025-04-26 at 08.59.54.webp',
		'WhatsApp Image 2025-04-26 at 09.29.15.webp',
		'WhatsApp Image 2025-04-26 at 09.29.16.webp',
		'WhatsApp Image 2025-04-26 at 09.29.17 (1).webp',
		'WhatsApp Image 2025-04-26 at 09.29.17.webp',
		'WhatsApp Image 2025-05-14 at 07.28.47.webp',
		'WhatsApp Image 2025-05-14 at 07.28.48.webp',
		'WhatsApp Image 2025-05-14 at 13.52.25 (1).webp',
		'WhatsApp Image 2025-05-14 at 13.52.25.webp',
		'WhatsApp Image 2025-05-14 at 16.28.18.webp',
		'WhatsApp Image 2025-05-14 at 16.28.19.webp',
		'WhatsApp Image 2025-05-14 at 16.28.20.webp'
	];

	let currentPage = $state(1);
	const itemsPerPage = 6;

	let totalPages = $derived(Math.ceil(galleryImages.length / itemsPerPage));
	let startIndex = $derived((currentPage - 1) * itemsPerPage);
	let endIndex = $derived(startIndex + itemsPerPage);
	let currentImages = $derived(galleryImages.slice(startIndex, endIndex));

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}
</script>

<svelte:head>
	<title>Galeri - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="bg-gray-50 py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-12 text-center" in:fly={{ x: -50, duration: 600 }}>
			<h1 class="mb-4 text-4xl font-bold text-gray-900">Galeri LSP MPI</h1>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Dokumentasi kegiatan dan momen penting dalam perjalanan LSP MPI
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			{#each currentImages as image, index }
				<GalleryCard
					src={`/img/galeri/${image}`}
					alt={`Galeri LSP MPI ${startIndex + index + 1}`}
					delay={200 + (index * 50)}
				/>
			{/each}
		</div>

		<div class="mt-12 flex flex-col items-center gap-4" in:fly={{ x: -50, duration: 600, delay: 650 }}>
			<div class="flex items-center gap-2">
				<button
					onclick={prevPage}
					disabled={currentPage === 1}
					class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					‹ Sebelumnya
				</button>
				
				{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
					<button
						onclick={() => goToPage(page)}
						class="min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors {
							currentPage === page
								? 'bg-blue-600 text-white'
								: 'bg-white text-gray-700 hover:bg-gray-100'
						}"
					>
						{page}
					</button>
				{/each}
				
				<button
					onclick={nextPage}
					disabled={currentPage === totalPages}
					class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Selanjutnya ›
				</button>
			</div>
			
			<p class="text-sm text-gray-600">
				Halaman {currentPage} dari {totalPages} • Menampilkan {startIndex + 1} - {Math.min(endIndex, galleryImages.length)} dari {galleryImages.length} gambar
			</p>
		</div>
	</div>
</div>
