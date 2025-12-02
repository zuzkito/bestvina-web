<script lang="ts" setup>
const img = useImage();
const src = "/imgs/promo/fireball.jpg";
const placeholder = img(src, {}, { preset: "thumbnailXXSm" });

const description = ref(
	"Rozhodně nebudeš! Běstvina není jako škola – není to sezení v lavici a učení se věcí, které nikdy nepoužiješ. "
	+ "Tady získáš znalosti, se kterými budeš moct ohromit rodiče, spolužáky, ale i sám sebe. "
	+ "Mimo to si vyzkoušíš práci v laboratořích se spičkovým vybavením nebo do objevíš taje okolí tábora, "
	+ "vyzkoušíš si nejen zajímavé experimenty ale i ty zábavné. "
	+ "A odreagovat se můžeš třeba u táboráku, sportu, nebo během neodborného programu.");

const scrollTop = () => {
	window.scrollTo(0, 0);
};
</script>

<template>
	<UPageSection
		:description="description"
		:ui="{
			root: 'bg-muted',
		}"
		icon="i-mdi-cat"
		orientation="horizontal"
		title="Bojíš se, že se budeš nudit?"
	>
		<template #default>
			<NuxtImg
				:placeholder="placeholder"
				:src="src"
				class="h-full object-cover object-[75%_25%] lg:w-full lg:hover:scale-105 transition-transform rounded-xl"
				loading="lazy"
				preset="thumbnailXXLg"
			/>
		</template>

		<template #links>
			<UButton
				color="secondary"
				label="Prohlédni si, co tě čeká"
				to="/informace"
				trailing-icon="i-lucide-arrow-right"
				variant="outline"
			/>
		</template>
	</UPageSection>
</template>

<style scoped>

</style>
