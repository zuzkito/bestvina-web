<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";
import Placeholder from "~/components/PlaceHolder.vue";
import { CalendarDate } from "@internationalized/date";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("years").where("year", "=", route.params.slug).first();
});

const startDate = new Date(page.value?.startDate ?? "");
const endDate = new Date(page.value?.endDate ?? "");
const calendarDate = shallowRef({
	start: new CalendarDate(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
	end: new CalendarDate(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
});

if (!page.value || !page.value.year) {
	throw createError({ statusCode: 404, statusMessage: "Ročník nenalezen!", fatal: true });
}

const isCurrentYear = ref(page.value?.year == CURRENT_YEAR || false);

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
	<UPage
		v-if="page"
		id="pageId"
	>
		<UPageHeader
			:description="`${isCurrentYear ? 'Táborové téma se dozvíš až na začátku soustředění!' : ''}`"
			:headline="`Ročník ${page.year}`"
			:title="`${isCurrentYear ? 'Aktuální ročník' : page.theme}`"
		/>
		<UPageBody>
			<Placeholder class="w-full h-50" />

			<ContentRenderer :value="page.body" />

			<div v-show="!isCurrentYear">
				<USeparator icon="i-mdi-history" />

				<!-- Gallery -->
				<LazyGradeGalleryPreview
					:year="page.year.toString()"
				/>

				<!-- Group Photos -->
				<LazyGradeGroupImages
					:year="page.year.toString()"
				/>

				<!-- Surroundings -->
				<!--				<USeparator -->
				<!--					v-if="surround?.filter(Boolean).length" -->
				<!--					class="mt-4 mb-8" -->
				<!--				/> -->
				<UContentSurround
					:surround="surround"
					class="mt-16"
				/>
			</div>
		</UPageBody>
	</UPage>
</template>

<style scoped>
</style>
