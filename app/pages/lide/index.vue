<script lang="ts" setup>
definePageMeta({
	layout: "page",
});
</script>

<template>
	<UMain>
		<UPageHeader
			description="Zde nalezneš seznam všech lidí, kteří se aktivně podílejí na přípravě a průběhu Běstviny."
			title="Aktivní organizátoři"
		/>
		<PeopleTabs />

		<InDevelopment />
	</UMain>
</template>
