<svelte:head>
	<title>Kontak - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<script>
	import { fly } from 'svelte/transition';
</script>

<div class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ y: 50, duration: 600 }}>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Kami siap membantu Anda dengan informasi seputar sertifikasi profesi
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-12">
			<div in:fly={{ x: -50, duration: 600 }}>
				<h2 class="text-2xl font-bold mb-6">Informasi Kontak</h2>
				
				<div class="space-y-6">
					<div class="flex items-start">
						<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold mb-1">Alamat Kantor</h3>
							<p class="text-gray-600">
								Jl. Pendidikan No. 123<br>
								Jakarta Selatan 12345<br>
								Indonesia
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold mb-1">Telepon</h3>
							<p class="text-gray-600">
								(021) 1234-5678<br>
								(021) 8765-4321
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold mb-1">Email</h3>
							<p class="text-gray-600">
								info@lspmpi.org<br>
								admin@lspmpi.org
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
							<svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="font-semibold mb-1">Jam Operasional</h3>
							<p class="text-gray-600">
								Senin - Jumat: 08:00 - 17:00<br>
								Sabtu: 08:00 - 12:00<br>
								Minggu: Tutup
							</p>
						</div>
					</div>
				</div>
			</div>

			<div in:fly={{ x: 50, duration: 600 }}>
				<h2 class="text-2xl font-bold mb-6">Kirim Pesan</h2>
				<form class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
						<input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
						<input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					</div>

					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
						<input type="tel" id="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					</div>

					<div>
						<label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
						<select id="subject" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
							<option>Informasi Sertifikasi</option>
							<option>Pendaftaran Uji Kompetensi</option>
							<option>Kerjasama</option>
							<option>Keluhan</option>
							<option>Lainnya</option>
						</select>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
						<textarea id="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
					</div>

					<button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
						Kirim Pesan
					</button>
				</form>
			</div>
		</div>

		<div class="mt-16" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="text-2xl font-bold text-center mb-8">Lokasi Kami</h2>
			<div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
				<p class="text-gray-600">Peta Google Maps akan ditampilkan di sini</p>
			</div>
		</div>
	</div>
</div>
