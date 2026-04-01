<script lang="ts">
	import {
		Home,
		User,
		Shield,
		Calendar,
		Settings,
		BarChart3,
		ClipboardList,
		X,
		FileText,
		Folder,
		Tag,
		Globe
	} from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	import NavItem from '$lib/components/ui/NavItem.svelte';
	import NavGroup from '$lib/components/ui/NavGroup.svelte';
	import type { Component } from 'svelte';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = $bindable(false), onClose = () => {} }: Props = $props();

	let kontenOpen = $state(false);

	$effect(() => {
		const currentPath = $page.url.pathname;
		kontenOpen = currentPath.startsWith('/dashboard/konten/');
	});

	const isActive = (path: string): boolean => $page.url.pathname === path;
	const userRole = $derived($authStore.user?.roleId || 0);

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

	const filteredMenuItems = $derived(menuItems.filter((item) => hasAccess(item.roles)));
	const filteredMenuGroups = $derived(menuGroups.filter((group) => hasAccess(group.roles)));
	const kontenItems = $derived(
		filteredMenuGroups
			.find((g) => g.label === 'Konten')
			?.items.map((item) => ({
				...item,
				isActive: isActive(item.href)
			})) || []
	);
</script>

<!-- Mobile Overlay -->
<div
	class="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
	class:opacity-0={!isOpen}
	class:opacity-100={isOpen}
	class:pointer-events-none={!isOpen}
	transition:fade={{ duration: 200 }}
	onclick={onClose}
></div>

<!-- Sidebar -->
<div
	class="fixed top-0 left-0 z-50 h-full bg-white lg:z-40 lg:translate-x-0"
	class:translate-x-0={isOpen}
	class:-translate-x-full={!isOpen}
	transition:fly={{ x: -300, duration: 300, easing: quintOut }}
>
	<div class="flex h-full w-[280px] flex-col">
		<!-- Mobile Close Button -->
		<div class="flex items-center justify-end p-4 lg:hidden">
			<button
				onclick={onClose}
				class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
			>
				<X class="h-5 w-5" />
			</button>
		</div>

		<div class="flex-1 overflow-y-auto">
			<div class="p-4 pt-0 lg:pt-4">
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
					{#each filteredMenuItems as item (item.href)}
						<NavItem
							href={item.href}
							icon={item.icon}
							label={item.label}
							isActive={isActive(item.href)}
						/>
					{/each}
					{#each filteredMenuGroups as group (group.label)}
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
	</div>
</div>