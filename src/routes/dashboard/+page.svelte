<script>
	import {
		Home,
		User,
		Users,
		Shield,
		BookOpen,
		Calendar,
		Settings,
		BarChart3,
		ClipboardList,
		Bell,
		MessageSquare
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let sidebarOpen = false;

	onMount(() => {
		// Trigger sidebar animation on mount
		sidebarOpen = true;
	});
</script>

<svelte:head>
	<title>Dashboard - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<!-- Main Content -->
<div class="p-6">
	<!-- Header -->
	<header class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Selamat Datang di Dashboard</h1>
				<p class="mt-1 text-gray-600">Lembaga Sertifikasi Profesi Manajemen Pendidikan Islam</p>
			</div>
			<div class="flex items-center space-x-4">
				<button class="p-2 text-gray-500 hover:text-gray-700">
					<Bell class="h-6 w-6" />
				</button>
				<button class="p-2 text-gray-500 hover:text-gray-700">
					<MessageSquare class="h-6 w-6" />
				</button>
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
					<span class="font-semibold text-white">U</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Stats Grid -->
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		{#each [{ title: 'Total Kompetensi', value: '15', icon: BookOpen, color: 'blue' }, { title: 'Jadwal Mendatang', value: '3', icon: Calendar, color: 'green' }, { title: 'Hasil Uji', value: '12', icon: BarChart3, color: 'purple' }, { title: 'Pengguna Aktif', value: '156', icon: Users, color: 'orange' }] as stat, index}
			<div
				class="rounded-lg border border-gray-100 bg-white p-6 shadow-md"
				in:fly={{ x: 0, y: 20, duration: 500 + index * 100 }}
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

	<!-- Main Content Area -->
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Recent Activity -->
		<div
			class="rounded-lg border border-gray-100 bg-white p-6 shadow-md lg:col-span-2"
			in:fly={{ x: -20, y: 0, duration: 600 }}
		>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
			<div class="space-y-4">
				{#each [{ title: 'Pendaftaran Uji Kompetensi', time: '2 jam yang lalu', type: 'success' }, { title: 'Jadwal Uji Diperbarui', time: '1 hari yang lalu', type: 'info' }, { title: 'Hasil Uji Kompetensi Keluar', time: '2 hari yang lalu', type: 'warning' }] as activity}
					<div class="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
						<div class="h-2 w-2 rounded-full bg-blue-500"></div>
						<div class="flex-1">
							<p class="font-medium text-gray-900">{activity.title}</p>
							<p class="text-sm text-gray-500">{activity.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Quick Actions -->
		<div
			class="rounded-lg border border-gray-100 bg-white p-6 shadow-md"
			in:fly={{ x: 20, y: 0, duration: 600 }}
		>
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Aksi Cepat</h2>
			<div class="space-y-3">
				{#each [{ title: 'Daftar Uji Kompetensi', icon: ClipboardList, color: 'blue' }, { title: 'Lihat Jadwal', icon: Calendar, color: 'green' }, { title: 'Cek Hasil', icon: BarChart3, color: 'purple' }, { title: 'Edit Profil', icon: User, color: 'orange' }] as action}
					<button
						class="flex w-full items-center space-x-3 rounded-lg bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100"
					>
						<action.icon class="h-5 w-5 text-{action.color}-600" />
						<span class="font-medium text-gray-700">{action.title}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
