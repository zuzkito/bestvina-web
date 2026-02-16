<script lang="ts" setup>
import useImageModal from "~/composables/useImageModal";

const props = defineProps<{
	year: string;
}>();

const { fetchImages, filteredImages, selectedYears } = useBestvinaImages("oddily");
watchEffect(() => {
	selectedYears.value = [props.year];
});

await fetchImages(props.year);

const { openImageModal } = useImageModal();
</script>

<template>
	<div>
		<PageSubHeader
			title="Fotografie oddílů"
		/>
		<!--		<UPageGrid -->
		<!--			class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 lg:p-4" -->
		<!--		> -->
		<!--			<a -->
		<!--				v-for="(img, i) in groupImages" -->
		<!--				:key="i" -->
		<!--				@click="openImageModal(img.filepath)" -->
		<!--			> -->
		<!--				<NuxtImg -->
		<!--					v-slot="{ src, isLoaded, imgAttrs }" -->
		<!--					:custom="true" -->
		<!--					:src="img.filepath" -->
		<!--					height="300" -->
		<!--					preset="thumbnailMd" -->
		<!--				> -->
		<!--					&lt;!&ndash; Show the actual image when loaded &ndash;&gt; -->
		<!--					<div -->
		<!--						v-if="isLoaded" -->
		<!--					> -->
		<!--						<img -->
		<!--							:key="img.filename" -->
		<!--							:alt="`fotografie oddílu z roku ${props?.year}`" -->
		<!--							:src="src" -->
		<!--							class="w-full aspect-square object-cover rounded-md md:hover:scale-110 transition-transform" -->
		<!--							loading="lazy" -->
		<!--							v-bind="imgAttrs" -->
		<!--						> -->
		<!--					</div> -->

		<!--					&lt;!&ndash; Show a placeholder while loading &ndash;&gt; -->
		<!--					<USkeleton -->
		<!--						v-else -->
		<!--						class="w-full aspect-square" -->
		<!--					/> -->
		<!--				</NuxtImg> -->
		<!--			</a> -->
		<!--		</UPageGrid> -->
		<div
			class="flex flex-wrap justify-center gap-6"
		>
			<a
				v-for="(img, i) in filteredImages"
				:key="i"
				@click="openImageModal(img.path)"
			>
				<div
					:key="img.path"
					:style="{
						aspectRatio: img.aspectRatio,
						height: '16rem', /* h-64 - Adjust this to make the overall grid larger or smaller */
					}"
					class="relative rounded-lg overflow-hidden shadow-md group bg-gray-100 dark:bg-gray-800"
				>

					<NuxtImg
						:alt="img.title || 'Oddíl'"
						:src="img.path"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
						preset="thumbnailMd"
					/>

					<div
						v-if="img.title"
						class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-4 text-white font-medium text-center"
					>
						{{ img.title }}
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped>

</style>
