<script lang="ts">
	import { onMount } from 'svelte';
	import { Users, Shield, Mail, Calendar, Edit, Trash2, Plus } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { getUsers, createUser, updateUser as updateUserApi, deleteUser as deleteUserApi } from '$lib/utils/api';

	// Import User interface from api.ts to ensure consistency
	import type { User } from '$lib/utils/api';

	let users: User[] = [];
	let selectedUser: User | null = null;
	let showAddModal = false;
	let showEditModal = false;
	let showDeleteModal = false;
	let loading = false;
	let error = '';

	async function loadUsers() {
		try {
			loading = true;
			error = '';
			const result = await getUsers({ page: 1, pageSize: 100, search: '' });
			users = result.data || [];
			console.log(users);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal memuat data pengguna';
			console.error('Error loading users:', err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadUsers();
	});

	function addUser() {
		showAddModal = true;
	}

	function editUser(user: User) {
		selectedUser = user;
		showEditModal = true;
	}

	function deleteUser(user: User) {
		selectedUser = user;
		showDeleteModal = true;
	}

	async function confirmDelete() {
		if (!selectedUser) return;
		
		try {
			await deleteUserApi(selectedUser.id);
			users = users.filter(u => u.id !== selectedUser?.id);
			showDeleteModal = false;
			selectedUser = null;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal menghapus pengguna';
			console.error('Error deleting user:', err);
		}
	}

	async function handleAddSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		try {
			const newUser = {
				username: formData.get('username') as string,
				password: formData.get('password') as string,
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				roleId: parseInt(formData.get('roleId') as string)
			};
			
			await createUser(newUser);
			await loadUsers();
			showAddModal = false;
			form.reset();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal menambahkan pengguna';
			console.error('Error creating user:', err);
		}
	}

	async function handleEditSubmit(event: Event) {
		event.preventDefault();
		if (!selectedUser) return;
		
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		try {
			const updatedUser = {
				username: formData.get('username') as string,
				name: formData.get('name') as string,
				email: formData.get('email') as string,
				roleId: parseInt(formData.get('roleId') as string)
			};
			
			await updateUserApi(selectedUser.id, updatedUser);
			await loadUsers();
			showEditModal = false;
			form.reset();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal memperbarui pengguna';
			console.error('Error updating user:', err);
		}
	}
</script>

<svelte:head>
	<title>Manajemen Akun - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<!-- Main Content -->
<div class="p-6">
	<!-- Header -->
	<header class="mb-8">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Manajemen Akun</h1>
				<p class="mt-1 text-gray-600">Kelola pengguna dan hak akses sistem</p>
			</div>
			<button 
				onclick={addUser}
				class="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
			>
				<Plus class="h-5 w-5" />
				<span>Tambah Pengguna</span>
			</button>
		</div>
	</header>

	<!-- Stats Grid -->
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each [
			{ title: 'Total Pengguna', value: users.length, icon: Users, color: 'blue' },
			{ title: 'Admin', value: users.filter(u => u.role.name === 'Admin'|| u.role.name==='SuperAdmin').length, icon: Shield, color: 'green' },
			{ title: 'Pengguna Aktif', value: users.filter(u => u.isActivated).length, icon: Users, color: 'purple' }
		] as stat, index}
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

	<!-- Users Table -->
	<div class="rounded-lg border border-gray-100 bg-white shadow-md">
		<div class="p-6">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Daftar Pengguna</h2>
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-gray-100">
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Nama</th>
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Dibuat</th>
							<th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{#each users as user, index}
							<tr class="border-b border-gray-50 transition-colors hover:bg-gray-50" transition:fly={{ x: -20, y: 0, duration: 400 + index * 50 }}>
								<td class="px-4 py-4">
									<div class="flex items-center space-x-3">
										<div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
											<span class="font-semibold text-blue-600">{user.userProfile.name.split(' ').map(n => n[0]).join('')}</span>
										</div>
										<div>
											<p class="font-medium text-gray-900">{user.userProfile.name}</p>
										</div>
									</div>
								</td>
								<td class="px-4 py-4 text-gray-600">
									<div class="flex items-center space-x-2">
										<Mail class="h-4 w-4" />
										<span>{user.userProfile.email}</span>
									</div>
								</td>
								<td class="px-4 py-4">
									<span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
										{user.role.name}
									</span>
								</td>
								<td class="px-4 py-4">
									<span class="inline-flex rounded-full bg-{user.isActivated ? 'green' : 'red'}-100 px-2 py-1 text-xs font-medium text-{user.isActivated ? 'green' : 'red'}-800">
										{user.isActivated ? 'Aktif' : 'Nonaktif'}
									</span>
								</td>
								<td class="px-4 py-4 text-gray-600">
									<div class="flex items-center space-x-2">
										<Calendar class="h-4 w-4" />
										<span>{user.createdAt}</span>
									</div>
								</td>
								<td class="px-4 py-4">
									<div class="flex space-x-2">
										<button 
											onclick={() => editUser(user)}
											class="flex items-center space-x-1 rounded-lg bg-yellow-100 px-2 py-1 text-yellow-700 hover:bg-yellow-200"
										>
											<Edit class="h-4 w-4" />
											<span>Edit</span>
										</button>
										<button 
											onclick={() => deleteUser(user)}
											class="flex items-center space-x-1 rounded-lg bg-red-100 px-2 py-1 text-red-700 hover:bg-red-200"
										>
											<Trash2 class="h-4 w-4" />
											<span>Hapus</span>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- Add User Modal -->
{#if showAddModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" transition:fly={{ x: 0, y: 20, duration: 300 }}>
			<h3 class="mb-4 text-lg font-semibold">Tambah Pengguna Baru</h3>
			<form onsubmit={handleAddSubmit}>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700">Username</label>
						<input name="username" type="text" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Password</label>
						<input name="password" type="password" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
						<input name="name" type="text" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Email</label>
						<input name="email" type="email" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Role</label>
						<select name="roleId" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
							<option value="1">Admin</option>
							<option value="2">Assessor</option>
							<option value="3">User</option>
						</select>
					</div>
				</div>
				<div class="mt-6 flex justify-end space-x-3">
					<button 
						onclick={() => showAddModal = false}
						class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					>
						Batal
					</button>
					<button 
						type="submit"
						class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Simpan
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Edit User Modal -->
{#if showEditModal && selectedUser}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" transition:fly={{ x: 0, y: 20, duration: 300 }}>
			<h3 class="mb-4 text-lg font-semibold">Edit Pengguna</h3>
			<form onsubmit={handleEditSubmit}>
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700">Username</label>
						<input name="username" type="text" value={selectedUser.username} class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
						<input name="name" type="text" value={selectedUser.userProfile.name} class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Email</label>
						<input name="email" type="email" value={selectedUser.email} class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" />
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700">Role</label>
						<select name="roleId" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
							<option value="1" selected={selectedUser.role.name === 'Admin'}>Admin</option>
							<option value="2" selected={selectedUser.role.name === 'Assessor'}>Assessor</option>
							<option value="3" selected={selectedUser.role.name === 'User'}>User</option>
						</select>
					</div>
				</div>
				<div class="mt-6 flex justify-end space-x-3">
					<button 
						onclick={() => showEditModal = false}
						class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					>
						Batal
					</button>
					<button 
						type="submit"
						class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Perbarui
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteModal && selectedUser}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" transition:fly={{ x: 0, y: 20, duration: 300 }}>
			<h3 class="mb-4 text-lg font-semibold">Hapus Pengguna</h3>
			<p class="text-gray-600">Anda yakin ingin menghapus pengguna <strong>{selectedUser.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
			<div class="mt-6 flex justify-end space-x-3">
				<button 
					onclick={() => showDeleteModal = false}
					class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
				>
					Batal
				</button>
				<button 
					onclick={confirmDelete}
					class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				>
					Hapus
				</button>
			</div>
		</div>
	</div>
{/if}