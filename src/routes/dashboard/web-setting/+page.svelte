<script lang="ts">
	import { onMount } from 'svelte';
	import { Globe, Save, Settings, Server, Shield, Plus, Trash2, RefreshCw } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { getWebSettingsAdmin, updateWebSettings } from '$lib/utils/api';
	import type { WebSetting } from '$lib/types';

	let settings: WebSetting | null = null;
	let loading = false;
	let saving = false;
	let error = '';
	let success = '';
	let activeTab = 'general';

	// Form fields
	let siteName = '';
	let siteDescription = '';
	let siteUrl = '';
	let siteKeywords = '';
	let siteAuthor = '';
	let siteVersion = '';
	let siteCopyright = '';
	let siteEmail = '';
	let sitePhone = '';
	let siteAddress = '';
	let siteLogo = '';
	let siteFavicon = '';
	let siteTheme = '';
	let siteLanguage = '';
	let siteTimezone = '';
	let siteStatus = true;
	let sitePerPage = 10;
	let siteMaintenance = false;
	let siteMaintenanceMessage = '';
	let siteSocialMedia: Record<string, string> = {};

	const tabs = [
		{ id: 'general', label: 'Informasi Umum', icon: Globe },
		{ id: 'contact', label: 'Kontak', icon: Settings },
		{ id: 'appearance', label: 'Tampilan', icon: RefreshCw },
		{ id: 'status', label: 'Status & Maintenance', icon: Server },
		{ id: 'social', label: 'Media Sosial', icon: Shield }
	];

	function populateForm(s: WebSetting) {
		siteName = s.siteName || '';
		siteDescription = s.siteDescription || '';
		siteUrl = s.siteUrl || '';
		siteKeywords = s.siteKeywords || '';
		siteAuthor = s.siteAuthor || '';
		siteVersion = s.siteVersion || '';
		siteCopyright = s.siteCopyright || '';
		siteEmail = s.siteEmail || '';
		sitePhone = s.sitePhone || '';
		siteAddress = s.siteAddress || '';
		siteLogo = s.siteLogo || '';
		siteFavicon = s.siteFavicon || '';
		siteTheme = s.siteTheme || '';
		siteLanguage = s.siteLanguage || '';
		siteTimezone = s.siteTimezone || '';
		siteStatus = s.siteStatus ?? true;
		sitePerPage = s.sitePerPage ?? 10;
		siteMaintenance = s.siteMaintenance ?? false;
		siteMaintenanceMessage = s.siteMaintenanceMessage || '';
		siteSocialMedia = {};
		if (s.siteSocialMedia) {
			for (const [key, value] of Object.entries(s.siteSocialMedia)) {
				siteSocialMedia[key] = value || '';
			}
		}
	}

	async function loadSettings() {
		try {
			loading = true;
			error = '';
			const result = await getWebSettingsAdmin();
			settings = result;
			populateForm(result);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal memuat pengaturan website';
			console.error('Error loading settings:', err);
		} finally {
			loading = false;
		}
	}

	async function handleSave() {
		try {
			saving = true;
			error = '';
			success = '';

			const socialMediaData: Record<string, string | null> = {};
			for (const [key, value] of Object.entries(siteSocialMedia)) {
				socialMediaData[key] = value || null;
			}

			await updateWebSettings({
				siteName: siteName || null,
				siteDescription: siteDescription || null,
				siteUrl: siteUrl || null,
				siteKeywords: siteKeywords || null,
				siteAuthor: siteAuthor || null,
				siteVersion: siteVersion || null,
				siteCopyright: siteCopyright || null,
				siteEmail: siteEmail || null,
				sitePhone: sitePhone || null,
				siteAddress: siteAddress || null,
				siteLogo: siteLogo || null,
				siteFavicon: siteFavicon || null,
				siteTheme: siteTheme || null,
				siteLanguage: siteLanguage || null,
				siteTimezone: siteTimezone || null,
				siteStatus,
				sitePerPage,
				siteMaintenance,
				siteMaintenanceMessage: siteMaintenanceMessage || null,
				siteSocialMedia: Object.keys(socialMediaData).length > 0 ? socialMediaData : null
			});

			// Reset server-side cache via SvelteKit Page Action
			try {
				const formData = new FormData();
				await fetch('?/clearCache', {
					method: 'POST',
					body: formData
				});
			} catch (cacheErr) {
				console.error('Failed to reset server cache:', cacheErr);
			}

			// Invalidate all load functions to refresh data site-wide
			import('$app/navigation').then(({ invalidateAll }) => invalidateAll());

			success = 'Pengaturan berhasil disimpan!';
			setTimeout(() => {
				success = '';
			}, 3000);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal menyimpan pengaturan';
			console.error('Error saving settings:', err);
		} finally {
			saving = false;
		}
	}

	// Social media helpers
	let newSocialKey = '';
	let newSocialValue = '';

	function addSocialMedia() {
		if (newSocialKey.trim()) {
			siteSocialMedia = { ...siteSocialMedia, [newSocialKey.trim()]: newSocialValue.trim() };
			newSocialKey = '';
			newSocialValue = '';
		}
	}

	function removeSocialMedia(key: string) {
		const copy = { ...siteSocialMedia };
		delete copy[key];
		siteSocialMedia = copy;
	}

	onMount(() => {
		loadSettings();
	});
</script>

<svelte:head>
	<title>Web Setting - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<!-- Main Content -->
<div class="p-4">
	<!-- Stats Grid -->
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each [{ title: 'Nama Situs', value: siteName || '-', icon: Globe, color: 'blue' }, { title: 'Status Situs', value: siteStatus ? 'Aktif' : 'Nonaktif', icon: Server, color: siteStatus ? 'green' : 'red' }, { title: 'Mode Maintenance', value: siteMaintenance ? 'Aktif' : 'Nonaktif', icon: Shield, color: siteMaintenance ? 'yellow' : 'green' }] as stat, index}
			<div
				class="rounded-lg border border-gray-100 bg-white p-6 shadow-md"
				transition:fly={{ x: 0, y: 20, duration: 500 + index * 100 }}
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">{stat.title}</p>
						<p class="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
					</div>
					<div class="h-12 w-12 bg-{stat.color}-100 flex items-center justify-center rounded-lg">
						<stat.icon class="h-6 w-6 text-{stat.color}-600" />
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Error / Success Alerts -->
	{#if error}
		<div
			class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
			transition:fade={{ duration: 200 }}
		>
			{error}
		</div>
	{/if}
	{#if success}
		<div
			class="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
			transition:fade={{ duration: 200 }}
		>
			{success}
		</div>
	{/if}

	{#if loading}
		<div class="flex items-center justify-center py-12">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
			></div>
			<span class="ml-3 text-gray-600">Memuat pengaturan...</span>
		</div>
	{:else}
		<!-- Tab Navigation -->
		<div
			class="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1"
			transition:fly={{ y: 20, duration: 400 }}
		>
			{#each tabs as tab}
				<button
					onclick={() => (activeTab = tab.id)}
					class="flex items-center space-x-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all {activeTab ===
					tab.id
						? 'bg-white text-blue-600 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'}"
				>
					<tab.icon class="h-4 w-4" />
					<span>{tab.label}</span>
				</button>
			{/each}
		</div>

		<!-- Form Card -->
		<div
			class="rounded-lg border border-gray-100 bg-white shadow-md"
			transition:fly={{ y: 20, duration: 500 }}
		>
			<div class="p-6">
				<!-- Tab: Informasi Umum -->
				{#if activeTab === 'general'}
					<h2 class="mb-6 text-lg font-semibold text-gray-900">Informasi Umum</h2>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label class="block text-sm font-medium text-gray-700">Nama Situs</label>
							<input
								type="text"
								bind:value={siteName}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Nama situs web"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">URL Situs</label>
							<input
								type="url"
								bind:value={siteUrl}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="https://example.com"
							/>
						</div>
						<div class="md:col-span-2">
							<label class="block text-sm font-medium text-gray-700">Deskripsi Situs</label>
							<textarea
								bind:value={siteDescription}
								rows="3"
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Deskripsi singkat tentang situs"
							></textarea>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Keywords</label>
							<input
								type="text"
								bind:value={siteKeywords}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="keyword1, keyword2, keyword3"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Author</label>
							<input
								type="text"
								bind:value={siteAuthor}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Nama author"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Versi</label>
							<input
								type="text"
								bind:value={siteVersion}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="1.0.0"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Copyright</label>
							<input
								type="text"
								bind:value={siteCopyright}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="© 2026 LSP MPI"
							/>
						</div>
					</div>
				{/if}

				<!-- Tab: Kontak -->
				{#if activeTab === 'contact'}
					<h2 class="mb-6 text-lg font-semibold text-gray-900">Informasi Kontak</h2>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label class="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								bind:value={siteEmail}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="admin@example.com"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Telepon</label>
							<input
								type="tel"
								bind:value={sitePhone}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="+62 xxx xxxx xxxx"
							/>
						</div>
						<div class="md:col-span-2">
							<label class="block text-sm font-medium text-gray-700">Alamat</label>
							<textarea
								bind:value={siteAddress}
								rows="3"
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="Alamat lengkap"
							></textarea>
						</div>
					</div>
				{/if}

				<!-- Tab: Tampilan -->
				{#if activeTab === 'appearance'}
					<h2 class="mb-6 text-lg font-semibold text-gray-900">Pengaturan Tampilan</h2>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label class="block text-sm font-medium text-gray-700">Logo URL</label>
							<input
								type="text"
								bind:value={siteLogo}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="URL logo"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Favicon URL</label>
							<input
								type="text"
								bind:value={siteFavicon}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
								placeholder="URL favicon"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Tema</label>
							<select
								bind:value={siteTheme}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							>
								<option value="">Pilih tema</option>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
								<option value="auto">Auto</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Bahasa</label>
							<select
								bind:value={siteLanguage}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							>
								<option value="">Pilih bahasa</option>
								<option value="id">Bahasa Indonesia</option>
								<option value="en">English</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Timezone</label>
							<select
								bind:value={siteTimezone}
								class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							>
								<option value="">Pilih timezone</option>
								<option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
								<option value="Asia/Makassar">Asia/Makassar (WITA)</option>
								<option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
								<option value="UTC">UTC</option>
							</select>
						</div>
					</div>
				{/if}

				<!-- Tab: Status & Maintenance -->
				{#if activeTab === 'status'}
					<h2 class="mb-6 text-lg font-semibold text-gray-900">Status & Maintenance</h2>
					<div class="space-y-6">
						<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div>
								<h3 class="font-medium text-gray-900">Status Situs</h3>
								<p class="text-sm text-gray-500">Aktifkan atau nonaktifkan situs</p>
							</div>
							<label class="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" bind:checked={siteStatus} class="peer sr-only" />
								<div
									class="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
								></div>
							</label>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Item Per Halaman</label>
							<input
								type="number"
								bind:value={sitePerPage}
								min="1"
								max="100"
								class="mt-1 block w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
							/>
						</div>

						<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div>
								<h3 class="font-medium text-gray-900">Mode Maintenance</h3>
								<p class="text-sm text-gray-500">
									Aktifkan mode maintenance untuk menonaktifkan akses publik
								</p>
							</div>
							<label class="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" bind:checked={siteMaintenance} class="peer sr-only" />
								<div
									class="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-yellow-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
								></div>
							</label>
						</div>

						{#if siteMaintenance}
							<div transition:fly={{ y: -10, duration: 200 }}>
								<label class="block text-sm font-medium text-gray-700">Pesan Maintenance</label>
								<textarea
									bind:value={siteMaintenanceMessage}
									rows="3"
									class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
									placeholder="Pesan yang ditampilkan saat maintenance"
								></textarea>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Tab: Media Sosial -->
				{#if activeTab === 'social'}
					<h2 class="mb-6 text-lg font-semibold text-gray-900">Media Sosial</h2>
					<div class="space-y-4">
						{#each Object.entries(siteSocialMedia) as [key, value], index}
							<div
								class="flex items-center space-x-3"
								transition:fly={{ x: -20, y: 0, duration: 300 + index * 50 }}
							>
								<div class="w-1/3">
									<input
										type="text"
										value={key}
										disabled
										class="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600"
									/>
								</div>
								<div class="flex-1">
									<input
										type="text"
										{value}
										oninput={(e) => {
											siteSocialMedia = {
												...siteSocialMedia,
												[key]: (e.target as HTMLInputElement).value
											};
										}}
										class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
										placeholder="URL akun sosial media"
									/>
								</div>
								<button
									onclick={() => removeSocialMedia(key)}
									class="flex items-center rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
								>
									<Trash2 class="h-4 w-4" />
								</button>
							</div>
						{/each}

						<!-- Add New -->
						<div
							class="flex items-end space-x-3 rounded-lg border border-dashed border-gray-300 p-4"
						>
							<div class="w-1/3">
								<label class="block text-xs font-medium text-gray-500">Platform</label>
								<input
									type="text"
									bind:value={newSocialKey}
									class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
									placeholder="contoh: facebook"
								/>
							</div>
							<div class="flex-1">
								<label class="block text-xs font-medium text-gray-500">URL</label>
								<input
									type="text"
									bind:value={newSocialValue}
									class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
									placeholder="https://facebook.com/..."
								/>
							</div>
							<button
								onclick={addSocialMedia}
								class="flex items-center space-x-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
							>
								<Plus class="h-4 w-4" />
								<span>Tambah</span>
							</button>
						</div>
					</div>
				{/if}

				<!-- Save Button -->
				<div class="mt-8 flex justify-end border-t border-gray-100 pt-6">
					<button
						onclick={handleSave}
						disabled={saving}
						class="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if saving}
							<div
								class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
						{:else}
							<Save class="h-5 w-5" />
						{/if}
						<span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
