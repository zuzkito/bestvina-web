<script lang="ts" setup>
import useImageModal from "~/composables/useImageModal";

const props = defineProps({
	year: {
		type: String,
		required: true,
	},
});

const { openImageModal } = useImageModal();
const { data: groupImages } = await useGroupImages(props.year);
</script>

<template>
	<div>
		<PageSubHeader
			title="Fotografie oddílů"
		/>
		<UPageGrid
			class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 lg:p-4"
		>
			<a
				v-for="(img, i) in groupImages"
				:key="i"
				@click="openImageModal(img.filepath)"
			>
				<NuxtImg
					v-slot="{ src, isLoaded, imgAttrs }"
					:custom="true"
					:src="img.filepath"
					height="300"
					preset="thumbnailMd"
				>
					<!-- Show the actual image when loaded -->
					<div
						v-if="isLoaded"
					>
						<img
							:key="img.filename"
							:alt="`fotografie oddílu z roku ${props?.year}`"
							:src="src"
							class="w-full aspect-square object-cover rounded-md md:hover:scale-110 transition-transform"
							loading="lazy"
							v-bind="imgAttrs"
						>
					</div>

					<!-- Show a placeholder while loading -->
					<USkeleton
						v-else
						class="w-full aspect-square"
					/>
				</NuxtImg>
			</a>
		</UPageGrid>
	</div>
</template>

<style scoped>

</style>
