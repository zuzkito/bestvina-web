<script lang="ts" setup>
definePageMeta({
	layout: "page",
});

const description = ref(
	"Běstvinu každoročně navštěvují některé z významných osobností z vědecké scény i mimo ní. "
	+ "V minulosti jsme přivítali například tyto celebrity...",
);
</script>

<template>
	<UMain>
		<UPageHeader
			:description="description"
			title="Externí hosté"
		/>

		<InDevelopment />
	</UMain>
</template>

<style scoped>

</style>
