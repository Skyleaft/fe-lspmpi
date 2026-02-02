<script lang="ts">
const newAssessor=[
  {
    "no": 1,
    "nama": "Prof. Dr. H. Badrudin, M.Ag.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004803",
    "tahun": 2025
  },
  {
    "no": 2,
    "nama": "Prof. Dr. Hj. Aan Komariah, M.Pd",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kab. Bandung",
    "no_reg_met": "000.004815",
    "tahun": 2025
  },
  {
    "no": 3,
    "nama": "Prof. Dr. Hj. Siti Patimah, S.Ag., M.Pd",
    "provinsi": "Lampung",
    "kabupaten_kota": "Kota Bandar Lampung",
    "no_reg_met": "000.004808",
    "tahun": 2025
  },
  {
    "no": 4,
    "nama": "Prof. Dr. Dedy Achmad Kurniady, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004817",
    "tahun": 2025
  },
  {
    "no": 5,
    "nama": "Prof. Dr. Bambang Samsul Arifin, M.Si",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004818",
    "tahun": 2025
  },
  {
    "no": 6,
    "nama": "Prof. Dr. Budiman, M.Si, MM.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Garut",
    "no_reg_met": "000.004821",
    "tahun": 2025
  },
  {
    "no": 7,
    "nama": "Prof. Dr. Tien Rafida, M.Hum",
    "provinsi": "Sumatera Utara",
    "kabupaten_kota": "Kota Medan",
    "no_reg_met": "000.004806",
    "tahun": 2025
  },
  {
    "no": 8,
    "nama": "Prof. Dr. Candra Wijaya, M.Pd.",
    "provinsi": "Sumatera Utara",
    "kabupaten_kota": "Deli Serdang",
    "no_reg_met": "000.004804",
    "tahun": 2025
  },
  {
    "no": 9,
    "nama": "Prof. Dr. Imam Makruf, S.Ag., M.Pd.",
    "provinsi": "Jawa Tengah",
    "kabupaten_kota": "Sukoharjo",
    "no_reg_met": "000.004805",
    "tahun": 2025
  },
  {
    "no": 10,
    "nama": "Prof. Dr. H. Atiqullah, S.Ag., M.Pd",
    "provinsi": "Jawa Timur",
    "kabupaten_kota": "Pamekasan",
    "no_reg_met": "000.004819",
    "tahun": 2025
  },
  {
    "no": 11,
    "nama": "Prof. Dr. H. Rudy Haryanto, S.ST, MM",
    "provinsi": "Jawa Timur",
    "kabupaten_kota": "Pamekasan",
    "no_reg_met": "000.004822",
    "tahun": 2025
  },
  {
    "no": 12,
    "nama": "Prof. Dr. H. Encep Syarifudin, M.Pd",
    "provinsi": "Banten",
    "kabupaten_kota": "Kota Serang",
    "no_reg_met": "000.004820",
    "tahun": 2025
  },
  {
    "no": 13,
    "nama": "Prof. Dr. Asep Kurniawan, M.Ag.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Cirebon",
    "no_reg_met": "000.004823",
    "tahun": 2025
  },
  {
    "no": 14,
    "nama": "Prof. Dr. H. Wasehudin, M.Si.",
    "provinsi": "Banten",
    "kabupaten_kota": "Kota Serang",
    "no_reg_met": "000.004807",
    "tahun": 2025
  },
  {
    "no": 15,
    "nama": "Prof. Dr. Anang Anas Azhar, M.A",
    "provinsi": "Sumatera Utara",
    "kabupaten_kota": "Deli Serdang",
    "no_reg_met": "000.004794",
    "tahun": 2025
  },
  {
    "no": 16,
    "nama": "Dr. Hj. Nurul Hidayati Murtafiah, M.Pd.I",
    "provinsi": "Lampung",
    "kabupaten_kota": "Kab. Lampung Selatan",
    "no_reg_met": "000.004791",
    "tahun": 2025
  },
  {
    "no": 17,
    "nama": "Dr. Ambar Sri Lestari, M.Pd",
    "provinsi": "DKI Jakarta",
    "kabupaten_kota": "Jakarta Selatan",
    "no_reg_met": "000.004795",
    "tahun": 2025
  },
  {
    "no": 18,
    "nama": "Dr. Hj. Atiyah Suharti, M.Pd",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004792",
    "tahun": 2025
  },
  {
    "no": 19,
    "nama": "Dr. Eti Jumiati, SE., MM",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Purwakarta",
    "no_reg_met": "000.004739",
    "tahun": 2025
  },
  {
    "no": 20,
    "nama": "Dr. St. Syamsudduha, M.Pd.",
    "provinsi": "Sulawesi Selatan",
    "kabupaten_kota": "Gowa",
    "no_reg_met": "000.004780",
    "tahun": 2025
  },
  {
    "no": 21,
    "nama": "Dr. Hj. Astri Riani Dewi, S.Pd., M.Si.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Tasikmalaya",
    "no_reg_met": "000.004782",
    "tahun": 2025
  },
  {
    "no": 22,
    "nama": "Dr. H. Cece Hidayat, M.Si.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kab. Bandung",
    "no_reg_met": "000.004796",
    "tahun": 2025
  },
  {
    "no": 23,
    "nama": "Dr. Dadang Zenal Mutaqin, S.H.I., M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Cianjur",
    "no_reg_met": "000.004799",
    "tahun": 2025
  },
  {
    "no": 24,
    "nama": "Dr. H. Ali Nurhadi, S.Pd., M.Pd",
    "provinsi": "Jawa Timur",
    "kabupaten_kota": "Sampang",
    "no_reg_met": "000.004810",
    "tahun": 2025
  },
  {
    "no": 25,
    "nama": "Dr. H. Yudin Citriadin, M.Pd.",
    "provinsi": "Nusa Tenggara Barat",
    "kabupaten_kota": "Kota Mataram",
    "no_reg_met": "000.004825",
    "tahun": 2025
  },
  {
    "no": 26,
    "nama": "Dr. Junaidah, M.A.",
    "provinsi": "Lampung",
    "kabupaten_kota": "Bandar Lampung",
    "no_reg_met": "000.004785",
    "tahun": 2025
  },
  {
    "no": 27,
    "nama": "Dr. Acep Nurlaeli, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kabupaten Bandung",
    "no_reg_met": "000.004798",
    "tahun": 2025
  },
  {
    "no": 28,
    "nama": "Dr. Abdulloh Hamid, M.Pd.",
    "provinsi": "Jawa Timur",
    "kabupaten_kota": "Sidoarjo",
    "no_reg_met": "000.004813",
    "tahun": 2025
  },
  {
    "no": 29,
    "nama": "Dr. Rada, M.Pd.I",
    "provinsi": "Kepulauan Bangka Belitung",
    "kabupaten_kota": "Pangkal Pinang",
    "no_reg_met": "000.004800",
    "tahun": 2025
  },
  {
    "no": 30,
    "nama": "Mohamad Mustari, M.Pd., Ph.D",
    "provinsi": "Banten",
    "kabupaten_kota": "Kota Serang",
    "no_reg_met": "000.004824",
    "tahun": 2025
  },
  {
    "no": 31,
    "nama": "Dr. Asti Putri Kartiwi, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Sukabumi",
    "no_reg_met": "000.004786",
    "tahun": 2025
  },
  {
    "no": 32,
    "nama": "Dr. Badrud Tamam, S.Sos., M.Pd",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Subang",
    "no_reg_met": "000.004793",
    "tahun": 2025
  },
  {
    "no": 33,
    "nama": "Dr. KH. M. Wafiyul Ahdi Amanullah, M.Pd.I",
    "provinsi": "Jawa Timur",
    "kabupaten_kota": "Jombang",
    "no_reg_met": "000.004812",
    "tahun": 2025
  },
  {
    "no": 34,
    "nama": "Dr. Fetty Poerwita Sary, M.Pd",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004787",
    "tahun": 2025
  },
  {
    "no": 35,
    "nama": "Dr. H. Enjang Yusup Ali, S.Si., M.Kom., M.CE.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Sumedang",
    "no_reg_met": "000.004788",
    "tahun": 2025
  },
  {
    "no": 36,
    "nama": "Nita Anjung Munggaran, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Tasikmalaya",
    "no_reg_met": "000.004801",
    "tahun": 2025
  },
  {
    "no": 37,
    "nama": "Chyril Futuhana Ahmad, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kota Bandung",
    "no_reg_met": "000.004783",
    "tahun": 2025
  },
  {
    "no": 38,
    "nama": "G. Ginanjar Masruri, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Sumedang",
    "no_reg_met": "000.004790",
    "tahun": 2025
  },
  {
    "no": 39,
    "nama": "Dr. H. Abu Choir, M.A.",
    "provinsi": "Jawa Tengah",
    "kabupaten_kota": "Pati",
    "no_reg_met": "000.004805",
    "tahun": 2025
  },
  {
    "no": 40,
    "nama": "Dr. Samrin, M.Pd.I",
    "provinsi": "Sulawesi Tenggara",
    "kabupaten_kota": "Kendari",
    "no_reg_met": "000.004797",
    "tahun": 2025
  },
  {
    "no": 41,
    "nama": "Dr. Deti Elice, M.Pd",
    "provinsi": "Lampung",
    "kabupaten_kota": "Lampung Selatan",
    "no_reg_met": "000.004781",
    "tahun": 2025
  },
  {
    "no": 42,
    "nama": "Dr. Euis Latifah, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Cianjur",
    "no_reg_met": "000.004802",
    "tahun": 2025
  },
  {
    "no": 43,
    "nama": "Dr. Siti Julaiha, S.Ag., M.Pd.",
    "provinsi": "Kalimantan Timur",
    "kabupaten_kota": "Samarinda",
    "no_reg_met": "000.004811",
    "tahun": 2025
  },
  {
    "no": 44,
    "nama": "Dr. KH. Sirojuddin Aly, LC, M.A.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Ciamis",
    "no_reg_met": "000.004814",
    "tahun": 2025
  },
  {
    "no": 45,
    "nama": "Dr. Nur Irsyadiah, M.Pd.I",
    "provinsi": "DKI Jakarta",
    "kabupaten_kota": "DKI Jakarta",
    "no_reg_met": "000.004784",
    "tahun": 2025
  },
  {
    "no": 46,
    "nama": "Iis Basyroh, S.Pd.I, M.Pd.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Karawang",
    "no_reg_met": "000.004789",
    "tahun": 2025
  },
  {
    "no": 47,
    "nama": "Dr. Ade Een Khaeruniah, M.Ag.",
    "provinsi": "Jawa Barat",
    "kabupaten_kota": "Kab. Bandung",
    "no_reg_met": "000.004816",
    "tahun": 2025
  }
];

	let searchQuery = '';
	let selectedProvinsi = '';
	let selectedKabupaten = '';
	let currentPage = 1;
	const itemsPerPage = 5;

	$: filteredAssessors = newAssessor.filter(assessor => {
		const matchesSearch = assessor.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  assessor.no_reg_met.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  assessor.provinsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  assessor.kabupaten_kota.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesProvinsi = selectedProvinsi === '' || assessor.provinsi === selectedProvinsi;
		const matchesKabupaten = selectedKabupaten === '' || assessor.kabupaten_kota === selectedKabupaten;
		return matchesSearch && matchesProvinsi && matchesKabupaten;
	});

	$: totalPages = Math.ceil(filteredAssessors.length / itemsPerPage);
	$: paginatedAssessors = filteredAssessors.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Reset pagination when filters change
	$: if (filteredAssessors.length > 0 && currentPage > totalPages) {
		currentPage = 1;
	}

	$: provinsiOptions = [...new Set(newAssessor.map(a => a.provinsi))];
	$: kabupatenOptions = [...new Set(newAssessor.map(a => a.kabupaten_kota))];

	function goToPage(page : number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

  // Extract name without titles for avatar
  const extractName = (fullName: string) => {
    let result = fullName;
    // Remove titles repeatedly until no more matches
    while (/^(Prof\.|Dr\.|H\.|Hj\.|KH\.)\s+/.test(result)) {
      result = result.replace(/^(Prof\.|Dr\.|H\.|Hj\.|KH\.)\s+/, '');
    }
    // Remove degrees and certifications at the end
    result = result.replace(/,\s*(M\.\w+|S\.\w+|CIIQA|CEAM|CSQ|AIQA)+.*$/g, '');
    return result.trim();
  };

</script>

<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Daftar Asesor LSP MPI</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Tim asesor profesional yang telah tersertifikasi dan siap mendukung proses sertifikasi kompetensi
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl p-6 border border-gray-200">
				<div class="text-3xl font-bold mb-2 text-blue-600">{newAssessor.length}</div>
				<div class="text-gray-600">Total Asesor</div>
			</div>
			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl p-6 border border-gray-200">
				<div class="text-3xl font-bold mb-2 text-green-600">{newAssessor.filter(a => a.tahun === 2025).length}</div>
				<div class="text-gray-600">Asesor Tahun 2025</div>
			</div>
			<div class="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md rounded-xl p-6 border border-gray-200">
				<div class="text-3xl font-bold mb-2 text-purple-600">{newAssessor.filter(a => a.tahun === 2025).length}</div>
				<div class="text-gray-600">Terverifikasi</div>
			</div>
		</div>

		<div class="bg-white rounded-xl shadow-md p-6 mb-8">
			<div class="grid md:grid-cols-4 gap-4 mb-6">
				<div class="md:col-span-2">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Cari asesor berdasarkan nama, No.Reg.Met, provinsi, atau kabupaten..."
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				<div>
					<select
						bind:value={selectedProvinsi}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">Semua Provinsi</option>
						{#each provinsiOptions as provinsi}
							<option value={provinsi}>{provinsi}</option>
						{/each}
					</select>
				</div>
				<div>
					<select
						bind:value={selectedKabupaten}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">Semua Kabupaten/Kota</option>
						{#each kabupatenOptions as kabupaten}
							<option value={kabupaten}>{kabupaten}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full min-w-[800px]">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provinsi</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kabupaten/Kota</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.Reg.Met</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each paginatedAssessors as assessor}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{assessor.no}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
											<span class="text-blue-600 font-semibold">{extractName(assessor.nama).split(' ').map(n => n[0]).join('')}</span>
										</div>
										<div class="ml-4">
											<div class="text-sm font-medium text-gray-900">{assessor.nama}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessor.provinsi}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessor.kabupaten_kota}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{assessor.no_reg_met}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
										Terverifikasi
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if filteredAssessors.length === 0}
				<div class="text-center py-8 text-gray-500">
					Tidak ada data asesor yang sesuai dengan kriteria pencarian.
				</div>
			{/if}

			{#if totalPages > 1}
				<div class="flex justify-center items-center space-x-2 mt-6">
					<button
						onclick={prevPage}
						disabled={currentPage === 1}
						class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Sebelumnya
					</button>
					
					{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
						<button
							onclick={() => goToPage(page)}
							class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 {currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'}"
						>
							{page}
						</button>
					{/each}
					
					<button
						onclick={nextPage}
						disabled={currentPage === totalPages}
						class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Selanjutnya
					</button>
				</div>
			{/if}
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-white rounded-xl shadow-md p-6">
				<h3 class="text-xl font-bold mb-4 text-gray-900">Distribusi Provinsi</h3>
				<div class="space-y-4">
					{#each provinsiOptions as provinsi}
						<div class="flex justify-between items-center">
							<span class="text-sm text-gray-600">{provinsi}</span>
							<div class="flex items-center">
								<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
									<div class="bg-blue-500 h-2 rounded-full" style="width: {Math.round(newAssessor.filter(a => a.provinsi === provinsi).length / newAssessor.length * 100)}%"></div>
								</div>
								<span class="text-sm font-medium text-gray-900">{newAssessor.filter(a => a.provinsi === provinsi).length}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-white rounded-xl shadow-md p-6">
				<h3 class="text-xl font-bold mb-4 text-gray-900">Statistik Tahun</h3>
				<div class="space-y-4">
					<div class="flex justify-between items-center">
						<span class="text-sm text-gray-600">Tahun 2025</span>
						<div class="flex items-center">
							<div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
								<div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
							</div>
							<span class="text-sm font-medium text-gray-900">{newAssessor.filter(a => a.tahun === 2025).length}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>