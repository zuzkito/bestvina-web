<script lang="ts" setup>
definePageMeta({
	layout: "page",
});

const description = ref(
	"Historie Běstviny sahá až devadesátých let 20. století a tu dobu se zde vystřídalo již mnoho organizátorů "
	+ "podílejících se rozvoji starších generací a také na přeměně soustředění do současné podoby. "
	+ "Neúplný seznam těchto veteránů nalezneš níže...",
);
</script>

<template>
	<UMain>
		<UPageHeader
			:description="description"
			title="Bývalí organizátoři"
		/>

		<InDevelopment />
	</UMain>
</template>

<style scoped>

</style>
