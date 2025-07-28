<script setup lang="ts">
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

const { data: groupPhotoPaths, status, error } = await useFetch(`/api/images/group/${page.value?.year}`);

const overlay = useOverlay();
const modal = overlay.create(ImageModal);

async function openImageModal(path: string) {
	modal.open({
		imgPath: path,
	});
}

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
};
</script>

<template>
	<UPage>
		<!-- <template #left>
			<UPageAside />
		</template> -->

		<UPageHeader
			:title="`${isCurrentYear ? 'Aktuální ročník' : page?.theme}`"
			:description="`${isCurrentYear ? 'Táborové téma se dozvíš až na začátku soustředění!' : ''}`"
			:headline="`Ročník ${page?.year}`"
		/>

		<UPageBody>
			<Placeholder class="w-full h-50" />

			<div v-show="!isCurrentYear">
				<USeparator
					icon="i-mdi-history"
				/>

				<UPageHeader
					title="Oddíly"
					:ui="{
						title: 'text-2xl sm:text-3xl',
					}"
				/>
				<div class="flex flex-wrap gap-8 py-4 justify-evenly">
					<a
						v-for="photoPath in groupPhotoPaths"
						:key="photoPath"
						@click="openImageModal(photoPath)"
					>
						<NuxtImg
							:src="photoPath"
							height="300"
							class="rounded-md md:hover:scale-110 transition-transform"
						/>
					</a>
				</div>
			</div>

			<USeparator v-if="surround?.filter(Boolean).length" />
			<UContentSurround :surround="surround" />
		</UPageBody>
	</UPage>
</template>
