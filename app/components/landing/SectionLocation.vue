<script lang="ts" setup>
const img = useImage();
const src = "/imgs/promo/camp.jpg";
const placeholder = img(src, {}, { preset: "thumbnailXXSm" });

const description = ref(
	"Soustředění se každoročně koná v areálu táborové základny Vysoké školy chemicko-technologické v obci Běstvina "
	+ "v Železných horách. Bydlet budeš v útulné chatce sdílené s dalšími účastníky (a různorodým kousavým hmyzem).",
);
</script>

<template>
	<UPageSection
		:description="description"
		icon="i-lucide-map-pin"
		orientation="horizontal"
		title="Ve středu České republiky"
	>
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
