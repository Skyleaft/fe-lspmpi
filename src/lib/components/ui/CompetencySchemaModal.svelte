<script lang="ts">
	import {
		createCompetencySchema,
		updateCompetencySchema,
		uploadUniversalImage,
		buildApiUrl
	} from '$lib/utils/api';
	import type {
		CompetencySchema,
		CreateCompetencySchemaDto,
		UpdateCompetencySchemaDto
	} from '$lib/types';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Plus, X, Upload, Image as ImageIcon, Loader2 } from '@lucide/svelte';

	let { schema = null, isOpen = false, onClose, onSave } = $props();

	let name = $state('');
	let description = $state('');
	let duration = $state('');
	let fee = $state(0);
	let competencies = $state<string[]>([]);
	let newCompetency = $state('');
	let imageUrl = $state('');
	let isSaving = $state(false);
	let isUploading = $state(false);
	let error = $state('');

	// Initialize form when schema changes
	$effect(() => {
		if (schema) {
			name = schema.name || '';
			description = schema.description || '';
			duration = schema.duration || '';
			fee = schema.fee || 0;
			competencies = schema.competencies ? [...schema.competencies] : [];
			imageUrl = schema.imageUrl || '';
		} else {
			name = '';
			description = '';
			duration = '';
			fee = 0;
			competencies = [];
			imageUrl = '';
			newCompetency = '';
		}
	});

	function addCompetency() {
		if (newCompetency.trim() && !competencies.includes(newCompetency.trim())) {
			competencies = [...competencies, newCompetency.trim()];
			newCompetency = '';
		}
	}

	function removeCompetency(index: number) {
		competencies = competencies.filter((_, i) => i !== index);
	}

	async function saveSchema() {
		try {
			isSaving = true;
			error = '';

			if (!name.trim()) {
				error = 'Nama skema harus diisi';
				return;
			}

			if (schema) {
				const dto: UpdateCompetencySchemaDto = {
					name: name.trim(),
					description: description.trim(),
					duration: duration.trim(),
					fee,
					competencies,
					imageUrl
				};
				await updateCompetencySchema(schema.id, dto);
			} else {
				const dto: CreateCompetencySchemaDto = {
					name: name.trim(),
					description: description.trim(),
					duration: duration.trim(),
					fee,
					competencies,
					imageUrl
				};
				await createCompetencySchema(dto);
			}

			onSave();
			
			// Clear form if it was a new schema creation
			if (!schema) {
				name = '';
				description = '';
				duration = '';
				fee = 0;
				competencies = [];
				imageUrl = '';
				newCompetency = '';
			}
			
			onClose();
		} catch (err: any) {
			error = err.message || 'Gagal menyimpan skema kompetensi';
			console.error('Save schema error:', err);
		} finally {
			isSaving = false;
		}
	}

	function closeModal() {
		if (!isSaving && !isUploading) {
			onClose();
		}
	}

	async function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		try {
			isUploading = true;
			error = '';
			const result = await uploadUniversalImage(file, 'competency-schemas');
			imageUrl = result.path;
		} catch (err: any) {
			error = err.message || 'Gagal mengupload gambar';
			console.error('Upload error:', err);
		} finally {
			isUploading = false;
		}
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 overflow-y-auto" transition:fade={{ duration: 200 }}>
		<div
			class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<div
				class="bg-opacity-50 fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
				onclick={closeModal}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && closeModal()}
				role="button"
				tabindex="-1"
				aria-label="Close modal"
				transition:fade={{ duration: 200 }}
			></div>

			<div
				class="relative inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
				transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
			>
				<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h3 class="text-lg font-medium text-gray-900">
						{schema ? 'Edit Skema Sertifikasi' : 'Tambah Skema Sertifikasi'}
					</h3>
					<button
						onclick={closeModal}
						class="rounded-md text-gray-400 transition-colors duration-200 hover:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						<X class="h-6 w-6" />
					</button>
				</div>

				<div class="space-y-6 p-6">
					{#if error}
						<div
							class="rounded-md border border-red-200 bg-red-50 p-4"
							transition:fade={{ duration: 200 }}
						>
							<div class="text-sm text-red-700">{error}</div>
						</div>
					{/if}

					<div class="grid grid-cols-1 gap-6">
						<div>
							<label for="schema-name" class="mb-1 block text-sm font-medium text-gray-700"
								>Nama Skema</label
							>
							<input
								id="schema-name"
								type="text"
								bind:value={name}
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								placeholder="Masukkan nama skema"
							/>
						</div>

						<div>
							<label for="schema-description" class="mb-1 block text-sm font-medium text-gray-700"
								>Deskripsi</label
							>
							<textarea
								id="schema-description"
								bind:value={description}
								rows="3"
								class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								placeholder="Masukkan deskripsi skema"
							></textarea>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label for="schema-duration" class="mb-1 block text-sm font-medium text-gray-700"
									>Durasi</label
								>
								<input
									id="schema-duration"
									type="text"
									bind:value={duration}
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									placeholder="Contoh: 6 bulan"
								/>
							</div>
							<div>
								<label for="schema-fee" class="mb-1 block text-sm font-medium text-gray-700"
									>Biaya (Rp)</label
								>
								<input
									id="schema-fee"
									type="number"
									bind:value={fee}
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label for="schema-competency" class="mb-1 block text-sm font-medium text-gray-700"
								>Kompetensi</label
							>
							<div class="flex space-x-2">
								<input
									id="schema-competency"
									type="text"
									bind:value={newCompetency}
									onkeydown={(e) => e.key === 'Enter' && addCompetency()}
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									placeholder="Tambah kompetensi..."
								/>
								<button
									type="button"
									onclick={addCompetency}
									class="mt-1 rounded-md bg-blue-100 px-3 py-2 text-blue-700 hover:bg-blue-200"
								>
									<Plus class="h-5 w-5" />
								</button>
							</div>
							<div class="mt-3 flex flex-wrap gap-2">
								{#each competencies as comp, i}
									<span
										class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>
										{comp}
										<button
											type="button"
											onclick={() => removeCompetency(i)}
											class="ml-1 inline-flex h-4 w-4 shrink-0 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
										>
											<X class="h-3 w-3" />
										</button>
									</span>
								{/each}
							</div>
						</div>

						<div>
							<label for="schema-image" class="mb-1 block text-sm font-medium text-gray-700"
								>Gambar Skema</label
							>
							<div class="mt-1 flex items-center space-x-4">
								<div
									class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
								>
									{#if imageUrl}
										<img
											src={buildApiUrl(`/api/images/${imageUrl}`)}
											alt="Preview"
											class="h-full w-full object-cover"
										/>
									{:else if isUploading}
										<Loader2 class="h-8 w-8 animate-spin text-blue-500" />
									{:else}
										<ImageIcon class="h-8 w-8 text-gray-400" />
									{/if}
								</div>
								<div class="flex-1">
									<label
										class="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
									>
										{#if isUploading}
											<Loader2 class="mr-2 h-4 w-4 animate-spin" />
											Mengupload...
										{:else}
											<Upload class="mr-2 h-4 w-4" />
											Pilih Gambar
										{/if}
										<input
											type="file"
											class="hidden"
											accept="image/*"
											onchange={handleImageUpload}
											disabled={isUploading || isSaving}
										/>
									</label>
									<p class="mt-2 text-xs text-gray-500">
										PNG, JPG, WEBP up to 5MB. Gambar akan otomatis dikonversi ke format WebP.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
					<button
						onclick={closeModal}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Batal
					</button>
					<button
						onclick={saveSchema}
						disabled={isSaving || isUploading}
						class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSaving ? 'Menyimpan...' : schema ? 'Update' : 'Simpan'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
