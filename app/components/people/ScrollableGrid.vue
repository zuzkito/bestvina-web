<script lang="ts" setup>
import PersonCard from "~/components/people/PersonCard.vue";
import type { PeopleCollectionItemExtended } from "#shared/types/people";
import { PEOPLE_PAGES } from "#shared/constants";

const props = defineProps<{
	pageId: string;
}>();

const { getPopulatedPageData, getAllActivePeopleSortedForPage, getAllFormerPeopleSorted } = usePeopleData();
const pageId = toRef(props, "pageId");

const ALL_PEOPLE_PAGE_ID = `${PEOPLE_PAGES.ACTIVE}_vsichni`;

/**
 * FETCH DATA
 * */
const { data: page } = await getPopulatedPageData(pageId);

const specialPagePeople = ref<PeopleCollectionItemExtended[]>([]);

if (pageId.value === ALL_PEOPLE_PAGE_ID) {
	const { data } = await getAllActivePeopleSortedForPage(ALL_PEOPLE_PAGE_ID);
	specialPagePeople.value = data.value;
}
else if (pageId.value === PEOPLE_PAGES.FORMER) {
	const { data } = await getAllFormerPeopleSorted(PEOPLE_PAGES.FORMER);
	specialPagePeople.value = data.value;
}

/**
 * EXTRACT SECTIONS
 * */
interface Section {
	name: string;
	showImages?: boolean;
	people: PeopleCollectionItemExtended[];
}

const sections = computed<Section[]>(() => {
	if (pageId.value === ALL_PEOPLE_PAGE_ID || pageId.value === PEOPLE_PAGES.FORMER) {
		return [{
			name: "Abecední řazení",
			showImages: true,
			people: specialPagePeople.value,
		}];
	}
	return (page.value?.sections as Section[]) || [];
});

const pageStatus = computed<"success" | "error" | "empty">(() => {
	if (!page.value) return "error";

	const currentSections = sections.value;
	if (!currentSections?.length) return "empty";

	const hasPeople = currentSections.some(s => s.people?.length > 0);
	return hasPeople ? "success" : "empty";
});

/**
 * PAGE HELPER FUNCTIONS
 * */
function getPersonCountLabel(count: number): string {
	if (count === 1) return "osoba";
	if (count >= 2 && count <= 4) return "osoby";
	return "osob";
}

const asSection = (s: unknown) => s as Section;
</script>

<template>
	<UScrollArea
		v-if="pageStatus === 'success'"
		v-slot="{ item: section, index }"
		:items="sections"
		:ui="{
			viewport: 'gap-4',
		}"
		class="w-full pb-8"
	>
		<div
			v-if="asSection(section).people.length > 0"
		>
			<USeparator
				v-if="index != 0"
				class="my-4"
			/>
			<div class="flex flex-row justify-between items-center my-4 min-h-8">
				<div>
					<PageSubHeader
						:id="asSection(section).name.replace(' ', '_').toLowerCase()"
						:title="asSection(section).name || ''"
						class="p-0!"
					/>
				</div>
				<span class="text-muted text-sm md:text-md text-right min-w-1/3">
					celkem: {{ asSection(section).people.length }} {{ getPersonCountLabel(asSection(section).people.length) }}
				</span>
			</div>
			<div
				class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-items-center gap-8"
			>
				<PersonCard
					v-for="person in asSection(section).people"
					:key="person.id"
					:page-id="pageId"
					:person="person"
					:show-image="asSection(section).showImages ?? true"
				/>
			</div>
		</div>
	</UScrollArea>
	<InDevelopment
		v-else-if="pageStatus === 'empty'"
		:show-actions="false"
		description="Tato sekce se ještě stydí ukázat se veřejnosti. 🫣"
	/>
</template>

<style scoped>

</style>
