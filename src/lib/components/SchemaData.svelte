<script>
	const tableData = [
		{ kode: 'MPI.001', nama: 'Kepala Sekolah/Madrasah', jenjang: 'Level 7', status: 'Aktif', peserta: '342' },
		{ kode: 'MPI.002', nama: 'Guru Pendidikan Agama Islam', jenjang: 'Level 6', status: 'Aktif', peserta: '856' },
		{ kode: 'MPI.003', nama: 'Administrator Pendidikan', jenjang: 'Level 5', status: 'Aktif', peserta: '234' },
		{ kode: 'MPI.004', nama: 'Konselor Pendidikan Islam', jenjang: 'Level 6', status: 'Aktif', peserta: '189' },
		{ kode: 'MPI.005', nama: 'Pengawas Pendidikan', jenjang: 'Level 7', status: 'Aktif', peserta: '156' },
		{ kode: 'MPI.006', nama: 'Manajer Kurikulum', jenjang: 'Level 6', status: 'Pengembangan', peserta: '78' }
	];
</script>

<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Data Skema LSP MPI</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Statistik dan informasi lengkap tentang skema sertifikasi yang tersedia
			</p>
		</div>

		<div class="grid md:grid-cols-4 gap-6 mb-12">
			<div class="relative flex flex-col bg-blue-50 bg-clip-border text-gray-700 shadow-md rounded-xl p-6 text-center border border-blue-200">
				<div class="text-3xl font-bold mb-2 text-blue-600">15</div>
				<div class="text-gray-600">Skema Tersedia</div>
			</div>
			<div class="relative flex flex-col bg-purple-50 bg-clip-border text-gray-700 shadow-md rounded-xl p-6 text-center border border-purple-200">
				<div class="text-3xl font-bold mb-2 text-purple-600">2,847</div>
				<div class="text-gray-600">Alumni Tersertifikasi</div>
			</div>
			<div class="relative flex flex-col bg-green-50 bg-clip-border text-gray-700 shadow-md rounded-xl p-6 text-center border border-green-200">
				<div class="text-3xl font-bold mb-2 text-green-600">98%</div>
				<div class="text-gray-600">Tingkat Kelulusan</div>
			</div>
			<div class="relative flex flex-col bg-yellow-50 bg-clip-border text-gray-700 shadow-md rounded-xl p-6 text-center border border-yellow-200">
				<div class="text-3xl font-bold mb-2 text-yellow-600">45</div>
				<div class="text-gray-600">Asesor Bersertifikat</div>
			</div>
		</div>

		<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl overflow-hidden">
			<div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
				<h3 class="text-xl font-bold text-gray-900">Daftar Skema Sertifikasi</h3>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Skema</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Skema</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenjang</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peserta</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each tableData as row}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.kode}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.nama}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.jenjang}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {row.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
										{row.status}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.peserta}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="mt-12 grid md:grid-cols-2 gap-8">
			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl p-6">
				<h3 class="text-xl font-bold mb-4 text-gray-900">Distribusi Peserta per Skema</h3>
				<div class="space-y-3">
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">Guru PAI</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-blue-500 h-2 rounded-full" style="width: 85%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">856</span>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">Kepala Sekolah</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-purple-500 h-2 rounded-full" style="width: 34%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">342</span>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">Administrator</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-green-500 h-2 rounded-full" style="width: 23%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">234</span>
						</div>
					</div>
				</div>
			</div>

			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl p-6">
				<h3 class="text-xl font-bold mb-4 text-gray-900">Tingkat Kelulusan per Tahun</h3>
				<div class="space-y-3">
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">2024</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-green-500 h-2 rounded-full" style="width: 98%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">98%</span>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">2023</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-blue-500 h-2 rounded-full" style="width: 96%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">96%</span>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">2022</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-purple-500 h-2 rounded-full" style="width: 94%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">94%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>