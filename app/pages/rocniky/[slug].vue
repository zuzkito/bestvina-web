<script lang="ts" setup>
import { CURRENT_YEAR } from "~/app.config";
import ImageModal from "~/components/DownloadImageModal.vue";
import Placeholder from "~/components/Placeholder.vue";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("years").path(route.path).first();
});

const isCurrentYear = ref(page.value?.year == CURRENT_YEAR || false);

const { data: groupPhotoPaths } = await useFetch(`/api/images/group/${page.value?.year}`);
const { data: galleryPreviewPhotos } = await useFetch(`/api/images/gallery/${page.value?.year}/random?n=10`);

const isGalleryAvailable = computed(() => galleryPreviewPhotos?.value?.length != 0);

// prepare image modal for viewing and downloading
const overlay = useOverlay();
const modal = overlay.create(ImageModal);

async function openImageModal(path: string) {
	modal.open({
		imgPath: path,
	});
}

// get surroundings for navigation
const surround = await getSurroundings();

async function getSurroundings() {
	const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
		return queryCollectionItemSurroundings("years", route.path, {
			fields: ["year", "theme", "title", "description"],
		})
			.where("year", "<>", CURRENT_YEAR).order("year", "DESC");
	});

	// replace the default title and description with year and theme, respectively
	surround?.value?.map((item) => {
		if (item) {
			item.description = `Ročník ${item.year || "´???"}`;
			item.title = item.theme as string || "";
		}
	});
	return surround;
}
</script>

<template>
	<UPage>
		<!-- <template #left>
      <UPageAside />
    </template> -->

		<UPageHeader
			:description="`${isCurrentYear ? 'Táborové téma se dozvíš až na začátku soustředění!' : ''}`"
			:headline="`Ročník ${page?.year}`"
			:title="`${isCurrentYear ? 'Aktuální ročník' : page?.theme}`"
		/>

		<UPageBody>
			<Placeholder class="w-full h-50" />

			<div v-show="!isCurrentYear">
				<USeparator icon="i-mdi-history" />

				<!-- Gallery -->
				<div v-show="isGalleryAvailable">
					<UPageHeader
						:ui="{
							title: 'text-2xl sm:text-3xl',
						}"
						description="V karuselu se zobrazuje 10 náhodných fotografií z daného roku."
						title="Náhled galerie"
					/>
					<NuxtLink :to="`${route.path}/galerie`">
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
							stopOnInteraction: true,
						}"
						:items="galleryPreviewPhotos"
						:ui="{
							container: 'gap-0 p-0 ms-0',
							item: 'basis-full lg:basis-1/3 w-fit p-0 flex flex-row gap-0 justify-center',
						}"
						class="w-full mt-8 mb-16"
						dots
						loop
					>
						<div class="m-4 w-full aspect-square lg:aspect-auto">
							<NuxtImg
								v-slot="{ src, isLoaded, imgAttrs }"
								:custom="true"
								:src="item"
							>
								<!-- Show the actual image when loaded -->
								<div
									v-if="isLoaded"
									class="p-4"
								>
									<img
										:key="item"
										:alt="`náhodná fotografie z roku ${page?.year}`"
										:src="src"
										class="w-full aspect-square object-cover rounded-md md:hover:scale-110 transition-transform"
										loading="lazy"
										v-bind="imgAttrs"
										@click="openImageModal(item)"
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

					<USeparator
						class="my-4"
					/>
				</div>

				<!-- Group Photos -->
				<div>
					<UPageHeader
						:ui="{
							title: 'text-2xl sm:text-3xl',
						}"
						title="Fotografie oddílů"
					/>
					<div class="flex flex-row flex-wrap gap-8 py-4 justify-evenly">
						<a
							v-for="photoPath in groupPhotoPaths"
							:key="photoPath"
							@click="openImageModal(photoPath)"
						>
							<NuxtImg
								:src="photoPath"
								class="rounded-md md:hover:scale-110 transition-transform"
								height="300"
								lazy="blur"
								loading="lazy"
							/>
						</a>
					</div>
				</div>
				<USeparator
					v-if="surround?.filter(Boolean).length"
					class="mt-4 mb-8"
				/>
				<UContentSurround :surround="surround" />
			</div>
		</UPageBody>
	</UPage>
</template>
