<svelte:head>
	<title>Karir - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<script>
	import { fly } from 'svelte/transition';
</script>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 to-purple-700 py-20">
	<div class="container mx-auto text-center text-white px-4" in:fly={{ y: 50, duration: 600 }}>
		<h1 class="text-4xl md:text-5xl font-bold mb-6">Karir Bersama LSP MPI</h1>
		<p class="text-xl mb-8 max-w-3xl mx-auto opacity-90">
			Bergabunglah dengan tim profesional kami dan kembangkan karir di bidang sertifikasi profesi
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="#lowongan" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
				Lihat Lowongan
			</a>
			<a href="#benefit" class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
				Mengapa LSP MPI?
			</a>
		</div>
	</div>
</section>

<!-- Job Openings -->
<section id="lowongan" class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Lowongan Kerja Terbuka</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Temukan posisi yang sesuai dengan keahlian dan minat Anda
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 mb-12" in:fly={{ y: 30, duration: 600 }}>
			<div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 text-white">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900">Asesor Kompetensi</h3>
						<p class="text-sm text-blue-600 font-medium">Full Time • Remote/Onsite</p>
					</div>
				</div>
				<p class="text-gray-600 mb-4">
					Bergabung sebagai asesor untuk melakukan penilaian kompetensi peserta sertifikasi
				</p>
				<div class="text-sm text-gray-700 mb-6 space-y-1">
					<p class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Minimal S2 bidang terkait</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Pengalaman 5+ tahun</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Sertifikat asesor BNSP</p>
				</div>
				<button class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
					Lamar Sekarang
				</button>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 text-white">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
						</svg>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900">Admin Sertifikasi</h3>
						<p class="text-sm text-purple-600 font-medium">Full Time • Onsite</p>
					</div>
				</div>
				<p class="text-gray-600 mb-4">
					Mengelola administrasi dan dokumentasi proses sertifikasi profesi
				</p>
				<div class="text-sm text-gray-700 mb-6 space-y-1">
					<p class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Minimal S1 semua jurusan</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Pengalaman admin 2+ tahun</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Menguasai MS Office</p>
				</div>
				<button class="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
					Lamar Sekarang
				</button>
			</div>

			<div class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-green-50 transition-all">
				<div class="flex items-center mb-4">
					<div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 text-white">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
						</svg>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900">Marketing Executive</h3>
						<p class="text-sm text-green-600 font-medium">Full Time • Hybrid</p>
					</div>
				</div>
				<p class="text-gray-600 mb-4">
					Mengembangkan strategi pemasaran dan promosi program sertifikasi
				</p>
				<div class="text-sm text-gray-700 mb-6 space-y-1">
					<p class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>S1 Marketing/Komunikasi</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Pengalaman marketing 3+ tahun</p>
					<p class="flex items-center"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Kreatif dan komunikatif</p>
				</div>
				<button class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
					Lamar Sekarang
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section id="benefit" class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Mengapa Berkarir di LSP MPI?</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Bergabunglah dengan organisasi yang menghargai profesionalisme dan pengembangan diri
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" in:fly={{ y: 30, duration: 600 }}>
			<div class="text-center">
				<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-2 text-gray-900">Gaji Kompetitif</h3>
				<p class="text-gray-600">Remunerasi yang sesuai dengan pengalaman dan kontribusi</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-2 text-gray-900">Kesehatan Terjamin</h3>
				<p class="text-gray-600">Asuransi kesehatan dan BPJS untuk karyawan dan keluarga</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-2 text-gray-900">Pengembangan Karir</h3>
				<p class="text-gray-600">Program pelatihan dan sertifikasi untuk kemajuan karir</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-bold mb-2 text-gray-900">Tim Solid</h3>
				<p class="text-gray-600">Lingkungan kerja yang supportif dan kolaboratif</p>
			</div>
		</div>

		<div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-xl font-bold mb-4 text-gray-900">Benefit & Fasilitas</h3>
					<div class="space-y-3">
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Gaji kompetitif sesuai pengalaman</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Tunjangan kesehatan dan BPJS</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Pelatihan dan pengembangan karir</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Kesempatan sertifikasi gratis</span>
						</div>
					</div>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-4 text-gray-900">Budaya Kerja</h3>
					<div class="space-y-3">
						<div class="flex items-center">
							<svg class="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Tim yang solid dan supportif</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Work-life balance yang baik</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Inovasi dan kreativitas</span>
						</div>
						<div class="flex items-center">
							<svg class="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							<span class="text-gray-700">Nilai-nilai Islami dalam bekerja</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4 text-center" in:fly={{ y: 50, duration: 600 }}>
		<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tertarik Bergabung?</h2>
		<p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
			Kirimkan CV dan surat lamaran Anda ke email kami atau hubungi tim HR untuk informasi lebih lanjut
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="mailto:hr@lspmpi.org" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
				</svg>
				Kirim Lamaran
			</a>
			<a href="/kontak" class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center">
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
				</svg>
				Hubungi HR
			</a>
		</div>
	</div>
</section>
