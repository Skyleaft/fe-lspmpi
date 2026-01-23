<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Tentang Kami - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12" in:fly={{ y: 50, duration: 600 }}>
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Tentang LSP MPI</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Lembaga Sertifikasi Profesi Manajemen Pendidikan Islam yang berkomitmen mengembangkan SDM berkualitas
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-12 items-center mb-16">
			<div in:fly={{ x: -50, duration: 600 }}>
				<h2 class="text-3xl font-bold mb-6">Visi Kami</h2>
				<p class="text-gray-700 mb-6">
					Menjadi lembaga sertifikasi profesi terdepan dan terpercaya dalam mengembangkan 
					kompetensi profesional di bidang manajemen pendidikan Islam yang berkualitas 
					tinggi dan diakui secara nasional maupun internasional.
				</p>
				<h2 class="text-3xl font-bold mb-6">Misi Kami</h2>
				<ul class="text-gray-700 space-y-2">
					<li>• Menyelenggarakan sertifikasi profesi yang berkualitas dan terpercaya</li>
					<li>• Mengembangkan standar kompetensi sesuai kebutuhan industri</li>
					<li>• Meningkatkan profesionalisme tenaga pendidik dan kependidikan</li>
					<li>• Membangun jejaring kerjasama dengan berbagai institusi</li>
				</ul>
			</div>
			<div in:fly={{ x: 50, duration: 600 }}>
				<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" 
					 alt="Tentang LSP MPI" class="rounded-lg shadow-lg">
			</div>
		</div>

		<div class="bg-gray-50 p-8 rounded-lg" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="text-3xl font-bold text-center mb-8">Sejarah LSP MPI</h2>
			<div class="max-w-4xl mx-auto text-gray-700 space-y-4">
				<p>
					LSP Manajemen Pendidikan Islam didirikan pada tahun 2018 sebagai respons terhadap 
					kebutuhan akan standarisasi kompetensi profesional di bidang manajemen pendidikan Islam. 
					Dengan dukungan dari para ahli dan praktisi pendidikan Islam, LSP MPI telah berkembang 
					menjadi lembaga sertifikasi yang diakui dan dipercaya.
				</p>
				<p>
					Sejak berdiri, LSP MPI telah mensertifikasi lebih dari 2.800 profesional di berbagai 
					bidang manajemen pendidikan Islam. Komitmen kami terhadap kualitas dan profesionalisme 
					telah membuat LSP MPI menjadi pilihan utama bagi para profesional yang ingin 
					meningkatkan kompetensi mereka.
				</p>
			</div>
		</div>
	</div>
</div>
