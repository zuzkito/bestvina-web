<script lang="ts" setup>
import { useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";
import { CURRENT_YEAR, OLDEST_YEAR } from "#shared/constants";
import { z } from "zod";
import { VueSpinnerBars } from "vue3-spinners";

definePageMeta({
	layout: "page",
});

const router = useRouter();

// get a list of all available years
const { data: years } = await useFetch("/api/images/gallery/years");
const selectedYears = ref<string[]>(getYearsFromRequestParamsOrEmpty());
const loadedYears = ref([2024, 2023]); // TODO: replace

const { data: authors } = await useFetch("/api/images/authors");
const selectedAuthors = ref(getAuthorsFromRequestParamsOrEmpty());

const { data: photos } = await useFetch("/api/images/gallery/2024/random?n=10");

const isScrollContainerLoading = ref(false);

onMounted(() => {
	setupInfiniteScroll();
});

function getYearsFromRequestParamsOrEmpty(): string[] {
	const yearsParamSchema = z.array(z.any()).transform(
		as => as?.filter(a =>
			z.coerce.number().int().max(CURRENT_YEAR).min(OLDEST_YEAR).safeParse(a).success,
		),
	);

	const parseResult = yearsParamSchema.safeParse(useRoute().query.y);

	if (!parseResult.success)
		return [];

	if (parseResult.data === undefined)
		return [];

	return removeDuplicates(parseResult.data.sort((a, b) => a < b ? 1 : -1));
}

function getAuthorsFromRequestParamsOrEmpty() {
	const authorsParamSchema = z.array(z.any()).or(z.any()); // todo

	const parseResult = authorsParamSchema.safeParse(useRoute().query.a);
	console.error(useRoute().query.a);
	if (!parseResult.success)
		return [];
	if (parseResult.data === undefined)
		return [];

	const uniqueAuthors = removeDuplicates(parseResult.data).map(a => a.toLowerCase());
	console.error(uniqueAuthors);

	return authors.value?.filter(a =>
		uniqueAuthors.includes(a.shortcut),
	) || [];
}

function setupInfiniteScroll() {
	const appContainer = useNuxtApp().$appContainer as Ref<HTMLElement> || undefined;
	if (appContainer === undefined) {
		return;
	}

	useInfiniteScroll(
		appContainer,
		async () => {
			isScrollContainerLoading.value = true;
			// load more
			const nextYear = loadedYears.value[loadedYears.value.length - 1] - 1;
			loadedYears.value.push(nextYear);
			isScrollContainerLoading.value = false;
		},
		{
			distance: 1,
			canLoadMore: () => {
				if (years === undefined || loadedYears.value === undefined) {
					return false;
				}
				// check if the last loaded year is the last available year
				const lastLoadedYear = loadedYears.value[loadedYears.value.length - 1];
				const lastAvailableYear = years.value[years.value.length - 1];
				return lastLoadedYear != lastAvailableYear;
			},
			offset: {
				// makes the loading start 400px before reaching the bottom of the container
				bottom: 400,
			},
		},
	);
}

function getNextYearToLoad(currentLastLoadedYear?: number): number {
	if (currentLastLoadedYear === undefined) {
		currentLastLoadedYear = CURRENT_YEAR;
	}
	// if (selectedYears.value.length == 0) {
	//
	// }
	return -1;
}

async function filterPhotos() {
	await router.push({
		path: "/galerie",
		query: {
			y: selectedYears.value,
			a: selectedAuthors.value.map(a => a.shortcut),
		},
	},
	{
		replaceState: true,
	},
	() => {});
	console.error("going");
}
</script>

<template>
	<UPage
		:ui="{
			left: 'lg:col-span-3 xl:col-span-2',
			center: 'lg:col-span-7 xl:col-span-8',
		}"
	>
		<template #left>
			<UPageAside>
				<p class="text-lg font-semibold text-highlighted mb-4">
					Filtry
				</p>
				<USelectMenu
					v-model="selectedYears"
					:items="years"
					:search-input="{
						placeholder: 'Hledat...',
					}"
					:ui="{
						base: 'data-[state=open]:border data-[state=open]:border-tertiary',
					}"
					class="w-full mb-4"
					multiple
					placeholder="Ročník"
				/>
				<USelectMenu
					v-model="selectedAuthors"
					:items="authors"
					:search-input="{
						placeholder: 'Hledat...',
					}"
					:ui="{
						base: 'data-[state=open]:border data-[state=open]:border-tertiary',
					}"
					class="w-full mb-4"
					label-key="shortcut"
					multiple
					placeholder="Autor"
				>
					<template #item-label="{ item }">
						{{ item.name }}

						<span class="text-muted">
							{{ item.shortcut }}
						</span>
					</template>
				</USelectMenu>

				<UButton
					class="w-full justify-center"
					color="tertiary"
					label="Vyfiltruj!"
					@click="filterPhotos"
				/>
			</UPageAside>
		</template>
		<UPageBody>
			<div
				v-for="year in loadedYears"
				:key="year"
				class="pb-8"
			>
				<p class="text-4xl font-semibold text-muted pb-8">
					{{ year }}
				</p>
				<UPageGrid class="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<PlaceHolder
						v-for="photo in photos"
						:key="photo"
						class="w-full h-auto aspect-square"
					/>
				</UPageGrid>
			</div>
			<VueSpinnerBars
				v-show="isScrollContainerLoading"
				alt="spinner"
				class="m-8 w-full justify-self-center opacity-50"
				color="var(--ui-tertiary)"
				size="50"
			/>
		</UPageBody>
	</UPage>
</template>

<style scoped>

</style>
