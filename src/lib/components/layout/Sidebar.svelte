<script lang="ts">
	import {
		Home,
		User,
		Shield,
		Calendar,
		Settings,
		BarChart3,
		ClipboardList,
		ArrowBigLeft,
		FileText,
		Folder,
		Tag,
		Globe
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import NavItem from '$lib/components/ui/NavItem.svelte';
	import NavGroup from '$lib/components/ui/NavGroup.svelte';
	import type { Component } from 'svelte';

	let sidebarOpen = false;
	let kontenOpen = false;

	onMount(() => {
		sidebarOpen = true;
	});

	$: currentPath = $page.url.pathname;
	$: kontenOpen = currentPath.startsWith('/dashboard/konten/');
	$: isActive = (path: string) => currentPath === path;
	$: userRole = $authStore.user?.roleId || 0;

	interface MenuItem {
		href: string;
		icon: Component;
		label: string;
		roles?: number[];
	}

	interface MenuGroup {
		icon: Component;
		label: string;
		items: MenuItem[];
		roles?: number[];
	}

	const menuItems: MenuItem[] = [
		{ href: '/dashboard', icon: Home, label: 'Dashboard' },
		{ href: '/dashboard/competencies', icon: ClipboardList, label: 'Kompetensi' },
		{ href: '/dashboard/schedule', icon: Calendar, label: 'Jadwal Uji' },
		{ href: '/dashboard/results', icon: BarChart3, label: 'Hasil Uji' },
		{ href: '/dashboard/settings', icon: Settings, label: 'Pengaturan' },
		{ href: '/dashboard/manajemen-akun', icon: User, label: 'Manajemen Akun', roles: [1] },
		{ href: '/dashboard/web-setting', icon: Globe, label: 'Web Setting', roles: [1] }
	];

	const menuGroups: MenuGroup[] = [
		{
			icon: FileText,
			label: 'Konten',
			roles: [1, 2],
			items: [
				{ href: '/dashboard/konten/artikel', icon: FileText, label: 'Artikel' },
				{ href: '/dashboard/konten/kategori', icon: Folder, label: 'Kategori' },
				{ href: '/dashboard/konten/tags', icon: Tag, label: 'Tags' },
				{ href: '/dashboard/konten/skema-sertifikasi', icon: ClipboardList, label: 'Skema Sertifikasi' }
			]
		}
	];

	const hasAccess = (roles?: number[]) => !roles || roles.includes(userRole);

	$: filteredMenuItems = menuItems.filter((item) => hasAccess(item.roles));
	$: filteredMenuGroups = menuGroups.filter((group) => hasAccess(group.roles));
	$: kontenItems =
		filteredMenuGroups
			.find((g) => g.label === 'Konten')
			?.items.map((item) => ({
				...item,
				isActive: isActive(item.href)
			})) || [];
</script>

<!-- Sidebar -->
<div
	class="dashboard-sidebar flex h-full flex-col"
	transition:fly={{ x: -300, duration: 400, easing: quintOut }}
>
	<div class="p-4">
		<div class="mb-8 flex items-center space-x-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
				<Shield class="h-6 w-6 text-white" />
			</div>
			<div>
				<h1 class="text-lg font-bold text-gray-900">LSP MPI</h1>
				<p class="text-xs text-gray-500">Dashboard</p>
			</div>
		</div>

		<nav class="space-y-2">
			{#each filteredMenuItems as item}
				<NavItem
					href={item.href}
					icon={item.icon}
					label={item.label}
					isActive={isActive(item.href)}
				/>
			{/each}
			{#each filteredMenuGroups as group}
				<NavGroup
					icon={group.icon}
					label={group.label}
					bind:isOpen={kontenOpen}
					items={kontenItems}
				/>
			{/each}
		</nav>
	</div>
</div>

<style>
	.dashboard-sidebar {
		width: 280px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 40;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 1024px) {
		.dashboard-sidebar {
			display: none; /* Hide on mobile, could add toggle later */
		}
	}
</style>
