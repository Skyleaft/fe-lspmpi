<script lang="ts">
	import SchemaCard from './ui/SchemaCard.svelte';
	
	const schemas = [
		{
			id: 'Obtidaiyah',
			name: 'Sertifikasi Okupasi Kepala Madrasah Obtidaiyah',
			description: 'Sertifikasi untuk posisi Kepala Madrasah Obtidaiyah',
			duration: '6 bulan',
			fee: 2500000,
			competencies: ['Kepemimpinan Pendidikan', 'Manajemen Lembaga', 'Kurikulum Islam'],
			image: '/img/1.jpeg'
		},
		{
			id: 'Tsanawiyah',
			name: 'Sertifikasi Okupasi Kepala Madrasah Tsanawiyah',
			description: 'Sertifikasi untuk posisi Kepala Madrasah Tsanawiyah',
			duration: '4 bulan',
			fee: 1800000,
			competencies: ['Pedagogik Islam', 'Metodologi Pembelajaran', 'Evaluasi Pembelajaran'],
			image: '/img/2.jpeg'
		},
		{
			id: 'Aliyah',
			name: 'Sertifikasi Okupasi Kepala Madrasah Aliyah',
			description: 'Sertifikasi untuk posisi Kepala Madrasah Aliyah',
			duration: '3 bulan',
			fee: 1500000,
			competencies: ['Administrasi Akademik', 'Manajemen Data', 'Sistem Informasi'],
			image: '/img/3.jpeg'
		},
		{
			id: 'ptki',
			name: 'Sertifikasi Okupasi Pimpinan Perguruan Tinggi Keagamaan Islam',
			description: 'Sertifikasi untuk posisi Pimpinan Perguruan Tinggi Keagamaan Islam',
			duration: '3 bulan',
			fee: 1500000,
			competencies: ['Administrasi Akademik', 'Manajemen Data', 'Sistem Informasi'],
			image: '/img/4.jpeg'
		}
		
	];
</script>

<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Skema Sertifikasi di LSP Kami</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Berbagai skema sertifikasi profesi yang tersedia untuk mengembangkan karir Anda
			</p>
		</div>

		<div class="grid md:grid-cols-2  lg:grid-cols-4 gap-6">
			{#each schemas as schema (schema.id)}
				<SchemaCard {schema} delay={schema.id === 'kepala-sekolah' ? 0 : schema.id === 'guru-pai' ? 100 : schema.id === 'administrator' ? 200 : schema.id === 'konselor' ? 300 : schema.id === 'pengawas' ? 400 : 500} />
			{/each}
		</div>

		<div class="text-center mt-12">
			<a href="/uji-kompetensi" data-ripple-light="true" class="select-none rounded-lg bg-blue-600 py-3 px-8 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none inline-block">
				Lihat Semua Skema
			</a>
		</div>
	</div>
</section>