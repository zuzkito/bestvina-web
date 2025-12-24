<script lang="ts" setup>
definePageMeta({
	layout: "page",
});

const description = ref(
	"Úspěšná organizace soustředění vyžaduje mnoho úsilí v pozadí – zajistit finance, "
	+ "vyřešit administrativu a komunikaci s rodiči, zajistit odborný program, a mnoho dalšího. Na startost to mají tito lidé...",
);
</script>

<template>
	<UMain>
		<UPageHeader
			:description="description"
			title="Vedení tábora"
		/>

		<InDevelopment />
	</UMain>
</template>

<style scoped>

</style>
