<script lang="ts">
	import {
		Users,
		BookOpen,
		Calendar,
		BarChart3,
		ClipboardList,
		User
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Dashboard - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<!-- Main Content -->
<div class="p-6">

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

	<div class="flex justify-center">
  <button type="button" data-toggle="modal" data-target="#exampleModal" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"> Open </button>
  <div class="fixed inset-0 bg-slate-950/50 flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[9999]" id="exampleModal" aria-hidden="true">
    <div class="bg-white rounded-xl shadow-2xl shadow-slate-950/5 border border-slate-200 w-1/3 scale-95">
      <div class="p-4 pb-2 flex justify-between items-center">
        <h1 class="text-lg text-slate-800 font-semibold">Material Tailwind</h1>
        <button type="button" data-dismiss="modal" aria-label="Close" class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none data-[shape=circular]:rounded-full text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-slate-200-foreground hover:bg-slate-200/10 hover:border-slate-200/10 shadow-none hover:shadow-none outline-none absolute right-2 top-2">
          <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-5 w-5"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>
      <div class="p-4 pt-2 text-slate-600"> Material Tailwind is an open-source library that uses the power of Tailwind CSS and React to help you build unique web projects faster and easier. The stunning design inspired by Material Design is a bonus! Get Material Tailwind and take advantage of its free components and features that will help you set up your web project quickly. </div>
      <div class="p-4 flex justify-end gap-2">
        <button type="button" data-dismiss="modal" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-red-500 hover:bg-red-500/10 hover:border-red-500/10 shadow-none hover:shadow-none outline-none">Close</button>
        <button type="button" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700">Get Started</button>
      </div>
    </div>
  </div>
</div>

</div>
