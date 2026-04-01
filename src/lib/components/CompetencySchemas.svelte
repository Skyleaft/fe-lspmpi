<script lang="ts">
	import { onMount } from 'svelte';
	import { findCompetencySchemas } from '$lib/utils/api';
	import type { CompetencySchema } from '$lib/types';
	import SchemaCard from './ui/SchemaCard.svelte';
	import { resolve } from '$app/paths';
	
	let schemas: CompetencySchema[] = [];

	onMount(async () => {
		const response = await findCompetencySchemas({ page: 1, pageSize: 4, search: '' });
		schemas = response.data;
	});
</script>

<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Skema Sertifikasi di LSP Kami</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Berbagai skema sertifikasi profesi yang tersedia untuk mengembangkan karir Anda
			</p>
		</div>

		<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
			{#each schemas as schema (schema.id)}
				<SchemaCard {schema} delay={schema.id === 1 ? 0 : schema.id === 2 ? 100 : schema.id === 3 ? 200 : schema.id === 4 ? 300 : schema.id === 5 ? 400 : 500} />
			{/each}
		</div>

		<div class="text-center mt-12">
			<a href={resolve('/uji-kompetensi')} data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none inline-block">
				Lihat Semua Skema
			</a>
		</div>
	</div>
</section>