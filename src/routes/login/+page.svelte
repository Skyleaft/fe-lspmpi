<script>
	import { LogIn } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { authStore } from '$lib/stores/auth';

	let username = '';
	let password = '';

	let isLoading = false;
	let errorMessage = '';

	async function handleSubmit() {
		if (!username || !password) return;
		isLoading = true;
		errorMessage = '';

		try {
			const result = await authStore.login(username, password);

			if (result.success) {
				username = '';
				password = '';
				goto('/dashboard');
			} else {
				errorMessage = result.message || 'Login gagal. Periksa kembali username dan password Anda.';
			}
		} catch (error) {
			console.error('Login error:', error);
			errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
	<div
		class="relative flex w-full max-w-md flex-col rounded-xl bg-white bg-clip-border p-8 text-gray-700 shadow-md"
		in:fly={{ y: 50, duration: 600 }}
	>
		<div class="mb-6 text-center">
			<h2 class="mb-2 text-3xl font-bold text-gray-900">Login</h2>
			<p class="text-gray-600">Masuk ke akun LSP MPI Anda</p>
		</div>

		{#if errorMessage}
			<Alert color="red" dismissible={true}>
				{errorMessage}
			</Alert>
		{/if}

		<form
			on:submit|preventDefault={handleSubmit}
			class="space-y-4"
			in:fly={{ y: 30, duration: 600 }}
		>
			<div>
				<label for="username" class="mb-2 block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
					placeholder="Masukkan username Anda"
					required
				/>
			</div>

			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
					placeholder="Masukkan password Anda"
					required
				/>
			</div>

			<div class="flex items-center justify-between">
				<label class="flex items-center">
					<input
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					<span class="ml-2 text-sm text-gray-600">Ingat saya</span>
				</label>
				<a href="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800"
					>Lupa password?</a
				>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				data-ripple-light="true"
				class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-center align-middle font-sans text-sm font-bold text-white uppercase shadow-md shadow-blue-500/20 transition-all select-none hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isLoading}
					<svg
						class="mr-2 h-4 w-4 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Loading...
				{:else}
					<LogIn class="h-4 w-4" />
					<span>Login</span>
				{/if}
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-gray-600" in:fly={{ y: 30, duration: 600 }}>
			Belum punya akun? <a href="/register" class="font-medium text-blue-600 hover:text-blue-800"
				>Daftar sekarang</a
			>
		</p>
	</div>
</div>
