<script lang="ts" setup>
import { CURRENT_YEAR } from "~/app.config";
import ImageModal from "~/components/DownloadImageModal.vue";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("years").path(route.path).first();
});

const isCurrentYear = ref(page.value?.year == CURRENT_YEAR || false);

const { data: groupPhotoPaths } = await useFetch(`/api/images/group/${page.value?.year}`);

// prepare image modal for viewing and downloading
const overlay = useOverlay();
const modal = overlay.create(ImageModal);

async function openImageModal(path: string) {
	modal.open({
		imgPath: path,
	});
}

// gallery preview items
// TODO: fill with real photos
const galleryItems = [
	"https://picsum.photos/468/468?random=1",
	"https://picsum.photos/468/468?random=2",
	"https://picsum.photos/468/468?random=3",
	"https://picsum.photos/468/468?random=4",
	"https://picsum.photos/468/468?random=5",
	"https://picsum.photos/468/468?random=1",
	"https://picsum.photos/468/468?random=2",
];

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
				<USeparator class="my-8" />
				<div>
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
							close-icon="i-lucide-arrow-right"
							icon="i-lucide-gallery-thumbnails"
							title="Chceš-li zobrazit celou galerii, klikni zde!"
							variant="subtle"
						/>
					</NuxtLink>
					<UCarousel
						v-slot="{ item }"
						:autoplay="{
							delay: 500000,
						}"
						:items="galleryItems"
						:ui="{
							container: 'gap-0 p-0 ms-0',
							item: 'basis-full sm:basis-1/3 lg:basis-1/5 w-fit p-0 flex flex-row gap-0 justify-center',
						}"
						class="w-full mt-8 mb-16"
						dots
						loop
					>
						<div class="m-4">
							<img
								:src="item"
								class="w-full h-fit rounded-lg "
							>
						</div>
					</UCarousel>
				</div>

				<!-- Group Photos -->
				<div>
					<UPageHeader
						:ui="{
							title: 'text-2xl sm:text-3xl',
						}"
						title="Fotografie oddílů"
					/>
					<div class="flex flex-wrap gap-8 py-4 justify-evenly">
						<a
							v-for="photoPath in groupPhotoPaths"
							:key="photoPath"
							@click="openImageModal(photoPath)"
						>
							<NuxtImg
								:src="photoPath"
								class="rounded-md md:hover:scale-110 transition-transform"
								height="300"
							/>
						</a>
					</div>
				</div>
			</div>
			<USeparator v-if="surround?.filter(Boolean).length" />
			<UContentSurround :surround="surround" />
		</UPageBody>
	</UPage>
</template>
