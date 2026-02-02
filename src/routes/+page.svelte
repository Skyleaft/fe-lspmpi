<script>
	import HeroSection from '$lib/components/HeroSection.svelte';
	import WhyChooseUs from '$lib/components/WhyChooseUs.svelte';
	import CompetencySchemas from '$lib/components/CompetencySchemas.svelte';
	import AlumniReviews from '$lib/components/AlumniReviews.svelte';
	import NewsSection from '$lib/components/NewsSection.svelte';
	import SchemaData from '$lib/components/SchemaData.svelte';
	import AssessorList from '$lib/components/AssessorList.svelte';
</script>

<svelte:head>
	<title>LSP Manajemen Pendidikan Islam - Beranda</title>
	<meta
		name="description"
		content="Lembaga Sertifikasi Profesi terdepan dalam mengembangkan kompetensi profesional di bidang manajemen pendidikan Islam yang berkualitas dan terpercaya."
	/>
</svelte:head>


<HeroSection />
<WhyChooseUs />

<CompetencySchemas />
<AlumniReviews />
<AssessorList />
<NewsSection />
<SchemaData />
