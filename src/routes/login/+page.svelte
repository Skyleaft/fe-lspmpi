<script>
	import { LogIn } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Login - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
	<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl w-full max-w-md p-8">
		<div class="text-center mb-6">
			<h2 class="text-3xl font-bold text-gray-900 mb-2">Login</h2>
			<p class="text-gray-600">Masuk ke akun LSP MPI Anda</p>
		</div>

		<form class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
				<input 
					type="email" 
					id="email" 
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="nama@email.com"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
				<input 
					type="password" 
					id="password" 
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="••••••••"
				/>
			</div>

			<div class="flex items-center justify-between">
				<label class="flex items-center">
					<input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
					<span class="ml-2 text-sm text-gray-600">Ingat saya</span>
				</label>
				<a href="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">Lupa password?</a>
			</div>

			<button 
				type="submit" 
				data-ripple-light="true"
				class="w-full flex items-center justify-center gap-2 select-none rounded-lg bg-blue-600 py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				<LogIn class="w-4 h-4" />
				<span>Login</span>
			</button>
		</form>

		<p class="text-center text-sm text-gray-600 mt-6">
			Belum punya akun? <a href="/register" class="text-blue-600 hover:text-blue-800 font-medium">Daftar sekarang</a>
		</p>
	</div>
</div>
