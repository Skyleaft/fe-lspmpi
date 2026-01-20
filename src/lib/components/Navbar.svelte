<script lang="ts">
	let isMenuOpen = $state(false);
</script>

<nav class="bg-white shadow-lg sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4">
		<div class="flex justify-between items-center h-16">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<img src="/img/logo-lsp.webp" alt="LSP MPI" class="h-12 w-full" />
			</div>

			<!-- Desktop Menu -->
			<div class="hidden md:flex space-x-6">
				<a href="/" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Beranda</a>
				<a href="/tentang" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Tentang Kami</a>
				<a href="/uji-kompetensi" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Uji Kompetensi</a>
				<a href="/karir" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Karir</a>
				<a href="/galeri" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Galeri</a>
				<a href="/kontak" class="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">Kontak</a>
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
			</div>
		</div>
	{/if}
</nav>