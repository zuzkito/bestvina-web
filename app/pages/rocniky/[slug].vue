<script setup lang="ts">
definePageMeta({
	layout: "page",
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("years").path(route.path).first();
});
</script>

<template>
	<UPage>
		<!-- <template #left>
			<UPageAside />
		</template> -->

		<UPageHeader
			:headline="page?.theme"
			:title="`Ročník ${page?.year}`"
		/>

		<UPageBody>
			<h1>{{ page?.seo }}</h1>
		</UPageBody>
	</UPage>
</template>
