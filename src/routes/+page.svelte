<script>
	import HeroSection from '$lib/components/HeroSection.svelte';
	import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
	import CompetencySchemas from '$lib/components/CompetencySchemas.svelte';
	import AlumniReviews from '$lib/components/AlumniReviews.svelte';
	import NewsSection from '$lib/components/NewsSection.svelte';
	import SchemaData from '$lib/components/SchemaData.svelte';
	import AssessorList from '$lib/components/AssessorList.svelte';
	import { siteSettings } from '$lib/stores/siteSettings';

	export let data;
</script>

<svelte:head>
	<title>{$siteSettings.siteName || 'LSP Manajemen Pendidikan Islam'} - Beranda</title>
	<meta
		name="description"
		content={$siteSettings.siteDescription ||
			'Lembaga Sertifikasi Profesi terdepan dalam mengembangkan kompetensi profesional di bidang manajemen pendidikan Islam yang berkualitas dan terpercaya.'}
	/>
</svelte:head>

<HeroSection />
<WhyChooseUs />

<CompetencySchemas />
<AlumniReviews />
<AssessorList />
<NewsSection articles={data.articles} />
<!-- <SchemaData /> -->
