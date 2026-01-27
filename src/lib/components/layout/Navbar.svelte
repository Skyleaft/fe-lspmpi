<script lang="ts">
	import { LogIn, User, Settings, LogOut, ChevronDown, LayoutDashboard, AlertTriangle } from '@lucide/svelte';
	
	let isMenuOpen = $state(false);
	let isDropdownOpen = $state(false);
	let isLoggedIn = $state(false); // Ubah ke true untuk testing mode logged in
	
	const user = {
		name: 'Ahmad Fauzi',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
	};
</script>

<!-- Development Warning Banner -->
<div class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-center py-2 shadow-lg border-b-2 border-white/20">
	<div class="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
		<AlertTriangle class="w-5 h-5 animate-pulse flex-shrink-0" />
		<span class="font-bold text-sm md:text-base tracking-wide">
			🚧 UNDER DEVELOPMENT - Website masih dalam tahap pengembangan
		</span>
		<AlertTriangle class="w-5 h-5 animate-pulse flex-shrink-0" />
	</div>
</div>

<nav class="bg-white shadow-lg sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4">
		<div class="flex justify-between items-center h-16">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<img src="/img/logo-lsp.webp" alt="LSP MPI" class="h-12 w-full" />
			</div>

			<!-- Desktop Menu -->
			<div class="hidden md:flex items-center space-x-6">
				<a href="/" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Beranda</a>
				<a href="/tentang" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Tentang Kami</a>
				<a href="/uji-kompetensi" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Uji Kompetensi</a>
				<a href="/karir" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Karir</a>
				<a href="/galeri" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Galeri</a>
				<a href="/kontak" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Kontak</a>
				
				{#if isLoggedIn}
					<div class="relative">
						<button 
							class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
							onclick={() => isDropdownOpen = !isDropdownOpen}
						>
							<img src={user.avatar} alt={user.name} class="w-8 h-8 rounded-full" />
							<span class="text-gray-700 font-medium">{user.name}</span>
							<ChevronDown class="w-4 h-4 text-gray-500" />
						</button>
						
						{#if isDropdownOpen}
							<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
								<a href="/dashboard" class="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
									<LayoutDashboard class="w-4 h-4" />
									<span>Dashboard</span>
								</a>
								<button class="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
									<User class="w-4 h-4" />
									<span>Profile</span>
								</button>
								<button class="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
									<Settings class="w-4 h-4" />
									<span>Pengaturan</span>
								</button>
								<hr class="my-1 border-gray-200" />
								<button class="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
									<LogOut class="w-4 h-4" />
									<span>Logout</span>
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<a href="/login" data-ripple-light="true" class="flex items-center gap-2 select-none rounded-lg border-2 border-blue-600 py-2 px-4 text-center align-middle font-sans text-sm font-bold text-blue-600 transition-all hover:bg-blue-600 hover:text-white focus:opacity-[0.85] active:opacity-[0.85]">
						<LogIn class="w-4 h-4" />
						<span>Login</span>
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors" 
				onclick={() => isMenuOpen = !isMenuOpen}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-white border-t border-gray-200">
			<div class="px-4 py-2 space-y-1">
				<a href="/" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Beranda</a>
				<a href="/tentang" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Tentang Kami</a>
				<a href="/uji-kompetensi" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Uji Kompetensi</a>
				<a href="/karir" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Karir</a>
				<a href="/galeri" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Galeri</a>
				<a href="/kontak" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Kontak</a>
				
				{#if isLoggedIn}
					<div class="border-t border-gray-200 pt-2 mt-2">
						<div class="flex items-center gap-2 px-3 py-2">
							<img src={user.avatar} alt={user.name} class="w-8 h-8 rounded-full" />
							<span class="text-gray-700 font-medium">{user.name}</span>
						</div>
						<a href="/dashboard" class="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
							<LayoutDashboard class="w-4 h-4" />
							<span>Dashboard</span>
						</a>
						<button class="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
							<User class="w-4 h-4" />
							<span>Profile</span>
						</button>
						<button class="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
							<Settings class="w-4 h-4" />
							<span>Pengaturan</span>
						</button>
						<button class="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
							<LogOut class="w-4 h-4" />
							<span>Logout</span>
						</button>
					</div>
				{:else}
					<a href="/login" class="flex items-center justify-center gap-2 mx-3 my-2 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors">
						<LogIn class="w-4 h-4" />
						<span>Login</span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>