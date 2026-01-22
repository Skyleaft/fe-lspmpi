<script>
	import { UserPlus } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Daftar - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
	<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl w-full max-w-md p-8">
		<div class="text-center mb-6">
			<h2 class="text-3xl font-bold text-gray-900 mb-2">Daftar</h2>
			<p class="text-gray-600">Buat akun LSP MPI Anda</p>
		</div>

		<form class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
					<input 
						type="text" 
						id="firstName" 
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="John"
					/>
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
					<input 
						type="text" 
						id="lastName" 
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Doe"
					/>
				</div>
			</div>

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

			<div>
				<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
				<input 
					type="password" 
					id="confirmPassword" 
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="••••••••"
				/>
			</div>

			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
				<input 
					type="tel" 
					id="phone" 
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="+62 812-3456-7890"
				/>
			</div>

			<div>
				<label for="institution" class="block text-sm font-medium text-gray-700 mb-2">Institusi</label>
				<input 
					type="text" 
					id="institution" 
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Nama Sekolah/Kampus"
				/>
			</div>

			<div class="flex items-start space-x-2">
				<input 
					type="checkbox" 
					id="terms" 
					class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
				/>
				<label for="terms" class="text-sm text-gray-600">
					Saya menyetujui <a href="/terms" class="text-blue-600 hover:text-blue-800">syarat dan ketentuan</a> serta <a href="/privacy" class="text-blue-600 hover:text-blue-800">kebijakan privasi</a>
				</label>
			</div>

			<button 
				type="submit" 
				data-ripple-light="true"
				class="w-full flex items-center justify-center gap-2 select-none rounded-lg bg-blue-600 py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				<UserPlus class="w-4 h-4" />
				<span>Daftar</span>
			</button>
		</form>

		<p class="text-center text-sm text-gray-600 mt-6">
			Sudah punya akun? <a href="/login" class="text-blue-600 hover:text-blue-800 font-medium">Login di sini</a>
		</p>
	</div>
</div>
