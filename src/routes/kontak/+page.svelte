<script>
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Kontak - LSP Manajemen Pendidikan Islam</title>
</svelte:head>

<div class="bg-white py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-12 text-center" in:fly={{ y: 50, duration: 600 }}>
			<h1 class="mb-4 text-4xl font-bold text-gray-900">Hubungi Kami</h1>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Kami siap membantu Anda dengan informasi seputar sertifikasi profesi
			</p>
		</div>

		<div class="grid gap-12 md:grid-cols-2">
			<div in:fly={{ x: -50, duration: 600 }}>
				<h2 class="mb-6 text-2xl font-bold">Informasi Kontak</h2>

				<div class="space-y-6">
					<div class="flex items-start">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
							<svg
								class="h-6 w-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								></path>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 font-semibold">Alamat Kantor</h3>
							<p class="text-gray-600">
								Jl. Gedebage Selatan No.137 Kel. Cisaranteun Kidul, Kec. Gedebage, Kota Bandung
								40295
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
							<svg
								class="h-6 w-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 font-semibold">Telepon</h3>
							<p class="text-gray-600">+6282119704256</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
							<svg
								class="h-6 w-6 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 font-semibold">Email</h3>
							<p class="text-gray-600">lsp.manajerpendidikan@gmail.com</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
							<svg
								class="h-6 w-6 text-orange-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div>
							<h3 class="mb-1 font-semibold">Jam Operasional</h3>
							<p class="text-gray-600">
								Senin - Jumat: 08:00 - 17:00<br />
								Sabtu: 08:00 - 12:00<br />
								Minggu: Tutup
							</p>
						</div>
					</div>
				</div>
			</div>

			<div in:fly={{ x: 50, duration: 600 }}>
				<h2 class="mb-6 text-2xl font-bold">Kirim Pesan</h2>
				<form class="space-y-6">
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-gray-700"
							>Nama Lengkap</label
						>
						<input
							type="text"
							id="name"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label for="phone" class="mb-2 block text-sm font-medium text-gray-700"
							>Nomor Telepon</label
						>
						<input
							type="tel"
							id="phone"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label for="subject" class="mb-2 block text-sm font-medium text-gray-700">Subjek</label>
						<select
							id="subject"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						>
							<option>Informasi Sertifikasi</option>
							<option>Pendaftaran Uji Kompetensi</option>
							<option>Kerjasama</option>
							<option>Keluhan</option>
							<option>Lainnya</option>
						</select>
					</div>

					<div>
						<label for="message" class="mb-2 block text-sm font-medium text-gray-700">Pesan</label>
						<textarea
							id="message"
							rows="5"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
					>
						Kirim Pesan
					</button>
				</form>
			</div>
		</div>

		<div class="mt-16" in:fly={{ y: 50, duration: 600 }}>
			<h2 class="mb-8 text-center text-2xl font-bold">Lokasi Kami</h2>
			<div class="flex h-96 items-center justify-center rounded-lg bg-gray-200">
				<div class="mapouter w-full h-full">
					<iframe
							class="w-full h-full rounded-lg"
							src="https://maps.google.com/maps?q=Jl.+Gedebage+Selatan+No.137&t=&z=13&ie=UTF8&iwloc=&output=embed"
							scrolling="no"
							allowfullscreen
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
						></iframe>
				</div>
			</div>
		</div>
	</div>
</div>
