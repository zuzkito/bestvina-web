<script setup lang="ts">
import { CURRENT_YEAR } from "~/app.config";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("years").path(route.path).first();
});

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
			:title="`${page?.year == CURRENT_YEAR.toString() ? 'Aktuální' : page?.theme}`"
			:headline="`Ročník ${page?.year}`"
		/>

		<UPageBody>
			<h1>{{ page?.seo }}</h1>

			<USeparator v-if="surround?.filter(Boolean).length" />
			<UContentSurround :surround="surround" />
		</UPageBody>
	</UPage>
</template>
