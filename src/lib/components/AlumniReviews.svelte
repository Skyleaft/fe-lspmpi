<script lang="ts">
	import { resolve } from '$app/paths';

	export type AlumniReview = {
		id?: number | string;
		name: string;
		title: string;
		photo: string;
		rating: number;
		review: string;
	};

	export type AlumniReviewsProps = {
		reviews?: AlumniReview[] | null;
		title?: string;
		subtitle?: string;
		showCta?: boolean;
	};

	const {
		reviews = null,
		title = 'Review Alumni',
		subtitle = 'Testimoni dari para alumni yang telah berhasil meraih sertifikasi profesi',
		showCta = true
	}: AlumniReviewsProps = $props();

	// Default reviews when data is null
	const defaultReviews: AlumniReview[] = [
		{
			id: 1,
			name: 'Ahmad Fauzi, S.Pd.I',
			title: 'Kepala Madrasah Aliyah',
			photo:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
			rating: 5,
			review:
				'Proses sertifikasi di LSP MPI sangat profesional dan komprehensif. Materi yang diberikan sangat relevan dengan kebutuhan di lapangan. Sekarang saya lebih percaya diri dalam memimpin madrasah.'
		},
		{
			id: 2,
			name: 'Siti Nurhaliza, M.Pd',
			title: 'Guru PAI SMA',
			photo:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
			rating: 5,
			review:
				'Asesor yang berpengalaman dan metode penilaian yang objektif membuat saya yakin dengan kualitas sertifikasi ini. Sangat membantu dalam pengembangan karir sebagai pendidik.'
		},
		{
			id: 3,
			name: 'Muhammad Ridwan, S.Ag',
			title: 'Pengawas Madrasah',
			photo:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
			rating: 5,
			review:
				'Sertifikasi LSP MPI memberikan standar kompetensi yang jelas dan terukur. Ini sangat membantu dalam melaksanakan tugas pengawasan dengan lebih efektif dan profesional.'
		}
	];

	const displayReviews = reviews;
</script>

<section class="bg-gray-50 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				{subtitle}
			</p>
		</div>

		{#if reviews === null || reviews.length === 0}
			<div class="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
				<p class="text-blue-700">Belum ada review dari alumni.</p>
			</div>
		{/if}

		<div class="grid gap-8 md:grid-cols-3">
			{#each displayReviews as review (review.id)}
				<div
					class="relative flex flex-col rounded-xl bg-white bg-clip-border p-6 text-gray-700 shadow-md transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex items-center">
						<img
							src={review.photo ||
								`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
							alt={review.name}
							class="mr-4 h-12 w-12 rounded-full"
						/>
						<div>
							<h4 class="text-lg font-semibold text-gray-900">{review.name}</h4>
							<p class="text-sm text-gray-600">{review.title}</p>
						</div>
					</div>
					<!-- eslint-disable no-unused-vars -->
					<div class="mb-3 flex">
						{#each Array.from({ length: review.rating || 0 }) as _}
							<svg class="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
						{/each}
						{#each Array.from({ length: 5 - (review.rating || 0) }) as _}
							<svg class="h-5 w-5 fill-current text-gray-300" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
						{/each}
					</div>
					<!-- eslint-enable no-unused-vars -->
					<blockquote class="text-gray-600 italic">
						"{review.review}"
					</blockquote>
				</div>
			{/each}
		</div>

		{#if showCta}
			<!-- eslint-disable svelte/require-external-link-credentials -->
			<div class="mt-12 text-center">
				<div class="rounded-lg bg-gradient-to-br from-blue-200 to-blue-700 p-8 text-white">
					<h3 class="mb-2 text-2xl font-bold md:text-3xl">Bergabunglah dengan Kami</h3>
					<p class="mb-4 opacity-90">Tingkatkan kompetensi dan karir Anda bersama LSP MPI</p>
					<a
						href={resolve('/uji-kompetensi')}
						class="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
						data-sveltekit-reload
					>
						Daftar Sekarang
					</a>
				</div>
			</div>
			<!-- eslint-enable svelte/require-external-link-credentials -->
		{/if}
	</div>
</section>
