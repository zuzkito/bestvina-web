<script lang="ts" setup>
import useImageModal from "~/composables/useImageModal";

const props = defineProps<{
	year: string;
}>();

const { fetchImages, getRandomImages, selectedYears } = useBestvinaImages("galerie");
watchEffect(() => {
	selectedYears.value = [props.year];
});
await fetchImages(props.year);
const randomGalleryImages = computed(() => getRandomImages(10));

const { openImageModal } = useImageModal();
</script>

<template>
	<div v-show="randomGalleryImages.length != 0">
		<PageSubHeader
			description="V karuselu se zobrazuje 10 náhodných fotografií z daného roku."
			title="Náhled galerie"
		/>
		<NuxtLink
			:to="`/galerie?y=${props.year}`"
			prefetch-on="visibility"
		>
			<UAlert
				class="hover:border-dashed hover:border"
				icon="i-lucide-gallery-thumbnails"
				title="Chceš-li zobrazit celou galerii, klikni zde!"
				variant="subtle"
			/>
		</NuxtLink>
		<UCarousel
			v-slot="{ item }"
			:autoplay="{
				delay: 5000,
				stopOnInteraction: false,
			}"
			:items="randomGalleryImages"
			:ui="{
				container: 'gap-0 p-0 ms-0',
				item: 'basis-1/2 md:basis-1/3 xl:basis-1/4 w-fit p-0 flex flex-row gap-0 justify-center',
			}"
			class="w-full mt-8 mb-16"
			dots
			loop
		>
			<div class="m-4 w-full aspect-square lg:aspect-auto">
				<NuxtImg
					v-slot="{ src, isLoaded, imgAttrs }"
					:custom="true"
					:src="item.path"
					preset="thumbnailMd"
				>
					<!-- Show the actual image when loaded -->
					<div
						v-if="isLoaded"
						class="p-4"
					>
						<img
							:key="item.path"
							:alt="`náhodná fotografie z roku ${props.year}`"
							:src="src"
							class="w-full aspect-square object-cover rounded-md md:hover:scale-110 transition-transform"
							loading="lazy"
							v-bind="imgAttrs"
							@click="openImageModal(item.path)"
						>
					</div>

					<!-- Show a placeholder while loading -->
					<USkeleton
						v-else
						class="w-full aspect-square"
					/>
				</NuxtImg>
			</div>
		</UCarousel>
		<!--		<USeparator -->
		<!--			class="my-4" -->
		<!--		/> -->
	</div>
</template>

<style scoped>

</style>
