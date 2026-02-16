<script lang="ts" setup>
import { useElementSize } from "@vueuse/core";

definePageMeta({
	layout: "page",
});

const {
	fetchAvailableYears, allAvailableYears, fetchImages,
	filteredGroupedImages, selectedYears, selectedAuthors, availableAuthors, pending,
} = useBestvinaImages("galerie");

await fetchAvailableYears();
if (allAvailableYears.value.length > 0) {
	await fetchImages(allAvailableYears.value);
}

const galleryContainerRef = ref<HTMLElement | null>(null);
const { width: rawWidth } = useElementSize(galleryContainerRef);
const containerWidth = ref(0);

let resizeTimer: NodeJS.Timeout;
watch(rawWidth, (newWidth) => {
	if (newWidth === 0) return;

	if (containerWidth.value === 0) {
		containerWidth.value = newWidth;
		return;
	}

	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		if (Math.abs(containerWidth.value - newWidth) > 5) {
			containerWidth.value = newWidth;
		}
	}, 100);
});

const targetRowHeight = computed(() => containerWidth.value < 640 ? 140 : 220);
const layoutGap = 8;

const layoutItems = useJustifiedLayout(
	filteredGroupedImages,
	containerWidth,
	{ targetHeight: targetRowHeight.value, gap: layoutGap, headerHeight: 80 },
);
</script>

<template>
	<UPage>
		<UPageHeader
			title="Galerie"
		/>
		<UPageBody>
			<div class="flex flex-col md:flex-row gap-4 mb-6 shrink-0 bg-elevated p-4 rounded-xl">
				<UFormField
					class="w-full md:w-64"
					label="Filtrovat podle ročníku"
				>
					<USelectMenu
						v-model="selectedYears"
						:options="allAvailableYears"
						multiple
						placeholder="Všechny ročníky"
					/>
				</UFormField>
				<UFormField
					class="w-full md:w-64"
					label="Filtrovat podle autora"
				>
					<USelectMenu
						v-model="selectedAuthors"
						:options="availableAuthors"
						multiple
						option-attribute="name"
						placeholder="Všichni autoři"
						value-attribute="shortcut"
					/>
				</UFormField>
			</div>

			<div
				v-if="pending"
				class="flex justify-center py-20 grow"
			>
				<UIcon
					class="animate-spin text-5xl text-primary"
					name="i-heroicons-arrow-path"
				/>
			</div>

			<div
				v-else
				ref="galleryContainerRef"
				class="grow min-h-0 w-full"
			>
				<UScrollArea
					:items="layoutItems"
					:virtualize="{
						estimateSize: (index) => layoutItems[index]?.height ?? targetRowHeight,
						gap: layoutGap,
						overscan: 1,
					}"
					class="h-full w-full outline-none overflow-hidden"
				>
					<template #default="{ item }">
						<div
							v-if="item.type === 'header'"
							:style="{ height: `${item.height}px` }"
							class="flex items-end pb-4 pt-6"
						>
							<h2 class="text-3xl font-bold text-highlighted border-b-2 border-secondary pb-2">
								Ročník {{ item.year }}
							</h2>
						</div>

						<div
							v-else-if="item.type === 'row'"
							:style="{
								height: `${item.height}px`,
								gap: `${layoutGap}px`,
							}"
							class="flex w-full overflow-hidden"
						>
							<div
								v-for="imgObj in item.items"
								:key="imgObj.image.path"
								:style="{ width: `${imgObj.width}px` }"
								class="relative h-full overflow-hidden rounded-md group bg-muted shrink-0"
							>
								<NuxtImg
									:src="imgObj.image.path"
									class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									placeholder
									preset="thumbnailMd"
								/>

								<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2 text-white text-xs">
									<p v-if="imgObj.image.author">
										© {{ imgObj.image.author.name }}
									</p>
								</div>
							</div>
						</div>
					</template>
				</UScrollArea>
			</div>
		</UPageBody>
	</UPage>
</template>

	<style scoped />
