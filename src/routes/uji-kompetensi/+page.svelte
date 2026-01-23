<svelte:head>
	<title>Uji Kompetensi - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<script>
	import { fly } from 'svelte/transition';
</script>

<div class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ y: 50, duration: 600 }}>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Uji Kompetensi</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Ikuti uji kompetensi untuk mendapatkan sertifikat profesi yang diakui
			</p>
		</div>

		<div class="bg-blue-50 p-8 rounded-lg mb-12" in:fly={{ y: 30, duration: 600 }}>
			<h2 class="text-2xl font-bold mb-4">Pendaftaran Batch 13 - 2024</h2>
			<p class="text-gray-700 mb-4">
				Pendaftaran untuk batch 13 tahun 2024 telah dibuka. Daftar sekarang dan dapatkan 
				kesempatan untuk meningkatkan kompetensi profesional Anda.
			</p>
			<div class="flex flex-col sm:flex-row gap-4">
				<button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
					Daftar Sekarang
				</button>
				<button class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
					Download Panduan
				</button>
			</div>
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-12" in:fly={{ y: 30, duration: 600 }}>
			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<h3 class="text-xl font-semibold mb-4">Persyaratan Umum</h3>
				<ul class="space-y-2 text-gray-700">
					<li>• Minimal S1 sesuai bidang yang diujikan</li>
					<li>• Pengalaman kerja minimal 2 tahun</li>
					<li>• Memiliki portofolio yang relevan</li>
					<li>• Mengisi formulir pendaftaran lengkap</li>
					<li>• Membayar biaya uji kompetensi</li>
				</ul>
			</div>

			<div class="bg-white border border-gray-200 rounded-lg p-6">
				<h3 class="text-xl font-semibold mb-4">Metode Asesmen</h3>
				<ul class="space-y-2 text-gray-700">
					<li>• Tes tertulis (multiple choice & essay)</li>
					<li>• Presentasi portofolio</li>
					<li>• Wawancara dengan asesor</li>
					<li>• Simulasi praktik kerja</li>
					<li>• Observasi langsung</li>
				</ul>
			</div>
		</div>

		<div class="bg-gray-50 p-8 rounded-lg" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="text-2xl font-bold text-center mb-8">Jadwal Uji Kompetensi 2024</h2>
			<div class="overflow-x-auto">
				<table class="w-full bg-white rounded-lg overflow-hidden shadow">
					<thead class="bg-gray-100">
						<tr>
							<th class="px-6 py-3 text-left font-semibold">Batch</th>
							<th class="px-6 py-3 text-left font-semibold">Pendaftaran</th>
							<th class="px-6 py-3 text-left font-semibold">Pelaksanaan</th>
							<th class="px-6 py-3 text-left font-semibold">Status</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<tr>
							<td class="px-6 py-4">Batch 13</td>
							<td class="px-6 py-4">1 Feb - 15 Mar 2024</td>
							<td class="px-6 py-4">20-22 Mar 2024</td>
							<td class="px-6 py-4">
								<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Buka</span>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4">Batch 14</td>
							<td class="px-6 py-4">1 Mei - 15 Jun 2024</td>
							<td class="px-6 py-4">20-22 Jun 2024</td>
							<td class="px-6 py-4">
								<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Segera</span>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4">Batch 15</td>
							<td class="px-6 py-4">1 Agu - 15 Sep 2024</td>
							<td class="px-6 py-4">20-22 Sep 2024</td>
							<td class="px-6 py-4">
								<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Belum Buka</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
