<script lang="ts" setup>
const img = useImage();
const src = "/imgs/promo/camp.jpg";
const placeholder = img(src, {}, { preset: "thumbnailXXSm" });

const description = ref(
	"Soustředění se každoročně koná v areálu táborové základny Vysoké školy chemicko-technologické v obci Běstvina "
	+ "v Železných horách nedaleko od Pardubic. "
	+ "I jako ne-biolog okusíš rozmanitost zdejších živočišných druhů – zejména kousavého hmyzu.",
);
</script>

<template>
	<UPageSection
		:description="description"
		icon="i-lucide-map-pin"
		orientation="horizontal"
	>
		<template #title>
			Táborová základna<br>VŠCHT Praha
		</template>

		<template #links>
			<UButton
				color="secondary"
				label="Podívej se, kam pojedeš"
				to="/informace/#lokace"
				trailing-icon="i-lucide-arrow-right"
				variant="outline"
			/>
		</template>

		<template #default>
			<NuxtImg
				:placeholder="placeholder"
				:src="src"
				class="h-full object-cover object-[75%_25%] lg:w-full lg:hover:scale-105 transition-transform rounded-xl"
				loading="lazy"
				preset="thumbnailXXLg"
			/>
		</template>
	</UPageSection>
</template>

<style scoped>

</style>
