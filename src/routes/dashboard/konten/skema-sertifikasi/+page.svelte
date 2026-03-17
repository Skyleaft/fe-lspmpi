<script lang="ts">
	import { onMount } from 'svelte';
	import { findCompetencySchemas, deleteCompetencySchema, buildApiUrl } from '$lib/utils/api';
	import { Edit, Trash2, Plus, Search } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import type { CompetencySchema, FindRequest } from '$lib/types';
	import CompetencySchemaModal from '$lib/components/ui/CompetencySchemaModal.svelte';

	let schemas = $state<CompetencySchema[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let searchQuery = $state('');
	let searchInput = $state('');
	let currentPage = $state(1);
	let totalPages = $state(1);
	let totalItems = $state(0);
	let pageSize = $state(10);

	// Modal state
	let isModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let editingSchema = $state<CompetencySchema | null>(null);
	let deletingSchema = $state<CompetencySchema | null>(null);

	onMount(async () => {
		await loadSchemas();
	});

	async function loadSchemas() {
		try {
			loading = true;
			error = null;

			const params: FindRequest = {
				search: searchQuery,
				page: currentPage,
				pageSize: pageSize,
				sort: 'createdAt',
				order: 'desc'
			};

			const response = await findCompetencySchemas(params);
			schemas = response.data;
			totalItems = response.totalCount;
			totalPages = response.totalPages || Math.ceil(totalItems / pageSize);
		} catch (err: any) {
			error = err.message || 'Gagal memuat skema sertifikasi';
			console.error('Load schemas error:', err);
		} finally {
			loading = false;
		}
	}

	function handleSearch() {
		searchQuery = searchInput;
		currentPage = 1;
		loadSchemas();
	}

	function openModal(schema?: CompetencySchema) {
		editingSchema = schema || null;
		isModalOpen = true;
	}

	function openDeleteModal(schema: CompetencySchema) {
		deletingSchema = schema;
		isDeleteModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		editingSchema = null;
	}

	function closeDeleteModal() {
		isDeleteModalOpen = false;
		deletingSchema = null;
	}

	async function handleSave() {
		await loadSchemas();
		closeModal();
	}

	async function confirmDelete() {
		if (!deletingSchema) return;

		try {
			await deleteCompetencySchema(deletingSchema.id);
			await loadSchemas();
			closeDeleteModal();
		} catch (err: any) {
			alert('Gagal menghapus skema sertifikasi');
		}
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	}

	$effect(() => {
		if (currentPage) {
			loadSchemas();
		}
	});
</script>

<div class="dashboard-content p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-800">Skema Sertifikasi</h1>
		<button
			onclick={() => openModal()}
			class="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
		>
			<Plus class="h-5 w-5" />
			<span>Tambah Skema</span>
		</button>
	</div>

	<div class="mb-6 flex items-center space-x-4">
		<div class="relative max-w-md flex-1">
			<input
				type="text"
				placeholder="Cari skema..."
				bind:value={searchInput}
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
				class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
			/>
			<Search class="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
		</div>
		<button
			onclick={handleSearch}
			class="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
		>
			Cari
		</button>
	</div>

	{#if loading}
		<div class="flex h-64 items-center justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
			></div>
		</div>
	{:else if error}
		<div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
			{error}
		</div>
	{:else if schemas.length === 0}
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center text-gray-500">
			Tidak ada skema sertifikasi ditemukan.
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Gambar</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Nama Skema</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Durasi</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Biaya</th
						>
						<th
							class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Aksi</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each schemas as schema (schema.id)}
						<tr class="transition-colors hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								{#if schema.imageUrl}
									<img
										src={buildApiUrl(`/api/images/${schema.imageUrl}`)}
										alt={schema.name}
										class="h-12 w-20 rounded object-cover shadow-sm"
									/>
								{:else}
									<div
										class="flex h-12 w-20 items-center justify-center rounded bg-gray-100 text-gray-400"
									>
										No Image
									</div>
								{/if}
							</td>
							<td class="px-6 py-4">
								<div class="text-sm font-medium text-gray-900">{schema.name}</div>
								<div class="max-w-xs truncate text-xs text-gray-500">{schema.description}</div>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{schema.duration}</td>
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900"
								>{formatCurrency(schema.fee)}</td
							>
							<td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
								<div class="flex justify-end space-x-2">
									<button
										onclick={() => openModal(schema)}
										class="rounded p-1 text-blue-600 hover:bg-blue-50"
										title="Edit"
									>
										<Edit class="h-5 w-5" />
									</button>
									<button
										onclick={() => openDeleteModal(schema)}
										class="rounded p-1 text-red-600 hover:bg-red-50"
										title="Hapus"
									>
										<Trash2 class="h-5 w-5" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if totalPages > 1}
			<div class="mt-6 flex items-center justify-between">
				<div class="text-sm text-gray-700">
					Menampilkan <span class="font-medium">{(currentPage - 1) * pageSize + 1}</span> ke
					<span class="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span> dari
					<span class="font-medium">{totalItems}</span> skema
				</div>
				<div class="flex space-x-2">
					<button
						disabled={currentPage === 1}
						onclick={() => currentPage--}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
					>
						Sebelumnya
					</button>
					<button
						disabled={currentPage === totalPages}
						onclick={() => currentPage++}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
					>
						Selanjutnya
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<CompetencySchemaModal
	schema={editingSchema}
	isOpen={isModalOpen}
	onClose={closeModal}
	onSave={handleSave}
/>

{#if isDeleteModalOpen && deletingSchema}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
			transition:fly={{ y: 20, duration: 300 }}
		>
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Hapus Skema Sertifikasi</h3>
			<p class="text-gray-600">
				Apakah Anda yakin ingin menghapus skema <strong>{deletingSchema.name}</strong>? Tindakan ini
				tidak dapat dibatalkan.
			</p>
			<div class="mt-8 flex justify-end space-x-3">
				<button
					onclick={closeDeleteModal}
					class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
				>
					Batal
				</button>
				<button
					onclick={confirmDelete}
					class="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					Hapus
				</button>
			</div>
		</div>
	</div>
{/if}
