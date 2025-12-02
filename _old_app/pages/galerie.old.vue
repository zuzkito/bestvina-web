<script lang="ts" setup>
import {ref} from "vue";
import {CURRENT_YEAR, OLDEST_YEAR} from "shared/constants";
import {z} from "zod";

definePageMeta({
	layout: "page",
});

const router = useRouter();

// get a list of all available years
const { data: years } = await useGalleryYears();
const { data: photographers } = await usePhotographers();

const currentlySelectedYears = ref<string[]>(getYearsFromRequestParamsOrEmpty());
const currentlySelectedPhotographers = ref(getPhotographersFromRequestParamsOrEmpty());

const selectedYears = ref<string[]>(currentlySelectedYears.value);
const selectedPhotographers = ref<Photographer[]>(currentlySelectedPhotographers.value);

const numYearsToShow = ref(1);
const yearImagesLoadedStatus = reactive<Record<string, boolean>>({});
const loadedYears = computed<string[]>(() => {
	if (selectedYears.value === undefined || selectedYears.value.length === 0) {
		return years.value?.slice(0, numYearsToShow.value) || [];
	}
	return selectedYears.value?.slice(0, numYearsToShow.value) || [];
});

function getYearsFromRequestParamsOrEmpty(): string[] {
	const yearsParamSchema = z.array(z.any()).transform(
		as => as?.filter(a =>
			z.coerce.number().int().max(CURRENT_YEAR).min(OLDEST_YEAR).safeParse(a).success,
		),
	).or(z.coerce.number().int().max(CURRENT_YEAR).min(OLDEST_YEAR));

	const parseResult = yearsParamSchema.safeParse(useRoute().query.y);
	if (!parseResult.success || parseResult.data === undefined)
		return [];

	let uniqueYears: string[] = [];
	if (parseResult.data instanceof Array) {
		uniqueYears = removeDuplicates(parseResult.data.sort((a, b) => a < b ? 1 : -1).map(a => a.toString()));
	}
	else {
		uniqueYears = [parseResult.data.toString()];
	}
	return uniqueYears;
}
function getPhotographersFromRequestParamsOrEmpty(): Photographer[] {
	const photographersParamSchema = z.string().or(z.array(z.string()));

	const parseResult = photographersParamSchema.safeParse(useRoute().query.p);
	if (!parseResult.success || parseResult.data === undefined)
		return [];

	let uniquePhotographers: string[] = [];
	if (parseResult.data instanceof Array) {
		uniquePhotographers = removeDuplicates(parseResult.data).map(a => a.toLowerCase());
	}
	else {
		uniquePhotographers = [(parseResult.data as string).toLowerCase()];
	}

	return photographers.value?.filter(a =>
		uniquePhotographers.includes(a.shortcut),
	) || [];
}

function handleYearBlockLoaded(year: number) {
	yearImagesLoadedStatus[year] = true;
	const nextYear = loadedYears.value?.at(loadedYears.value.length - 1);
	if (nextYear === undefined) {
		return;
	}
	yearImagesLoadedStatus[nextYear] = false;
	loadedYears.value.push(nextYear);
}

// watch(loadedYears, (newYears) => {
// 	newYears.forEach((year) => {
// 		if (!(year in yearImagesLoadedStatus)) {
// 			yearImagesLoadedStatus[year] = false; // Initialize to false
// 		}
// 	});
// }, { immediate: true });

async function filterPhotos() {
	await router.push({
		path: "/galerie",
		query: {
			y: currentlySelectedYears.value,
			p: currentlySelectedPhotographers.value.map(p => p.shortcut),
		},
	});
	reloadFilters();
}

function reloadFilters() {
	selectedYears.value = currentlySelectedYears.value;
	selectedPhotographers.value = currentlySelectedPhotographers.value;
	numYearsToShow.value = 0;
	Object.assign(yearImagesLoadedStatus, {});
	console.log(selectedYears.value);
	console.log(selectedPhotographers.value);
	console.log(numYearsToShow.value);
	console.log(yearImagesLoadedStatus);
	console.log(loadedYears.value);
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
					v-model="currentlySelectedYears"
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
					v-model="currentlySelectedPhotographers"
					:items="photographers"
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
				<GalleryYearBlock
					:photographers="selectedPhotographers"
					:year="year"
					@all-images-loaded="handleYearBlockLoaded"
				/>
			</div>
		</UPageBody>
	</UPage>
</template>

<style scoped>

</style>
