<script lang="ts" setup>
import PersonCard from "~/components/people/PersonCard.vue";
import type { PeopleCollectionItemExtended } from "#shared/types/people";
import { PEOPLE_PAGES } from "#shared/constants";

const props = defineProps<{
	pageId: string;
}>();
const allPeoplePageId = `${PEOPLE_PAGES.ACTIVE}_vsichni`;

const { getPopulatedPageData, getAllActivePeopleSortedForPage, getAllFormerPeopleSorted } = usePeopleData();
const pageId = toRef(props, "pageId");

const pageStatus = ref<"loading" | "success" | "error" | "empty">("loading");

// watch(pageStatus, (value, oldValue) => {
// 	console.log(oldValue, "->", value);
// });

/**
 * FETCH DATA
 * */
const allActivePeopleSorted = ref<PeopleCollectionItemExtended[]>([]);
const allFormerPeopleSorted = ref<PeopleCollectionItemExtended[]>([]);
if (pageId.value === allPeoplePageId) {
	const { data } = await getAllActivePeopleSortedForPage(allPeoplePageId);
	allActivePeopleSorted.value = data.value;
}
else if (pageId.value === PEOPLE_PAGES.FORMER) {
	const { data } = await getAllFormerPeopleSorted(PEOPLE_PAGES.FORMER);
	allFormerPeopleSorted.value = data.value;
}
const { data: page } = await getPopulatedPageData(pageId);
if (!page.value) {
	pageStatus.value = "error";
}

/**
 * EXTRACT SECTIONS
 * */
const sections = computed(() => {
	if (pageId.value === allPeoplePageId) {
		return [{
			name: "Abecední řazení",
			people: allActivePeopleSorted.value,
		}];
	}
	if (pageId.value === PEOPLE_PAGES.FORMER) {
		return [{
			name: "Abecední řazení",
			people: allFormerPeopleSorted.value,
		}];
	}
	return page.value?.sections;
});
function updatePageStatus() {
	if (!page.value) {
		pageStatus.value = "error";
		return;
	}
	if (!sections.value) {
		pageStatus.value = "error";
		return;
	}
	if (sections.value.length === 0) {
		pageStatus.value = "empty";
		return;
	}
	const peopleCount = sections.value.filter(section => section.people.length > 0);
	if (peopleCount?.length === 0) {
		pageStatus.value = "empty";
		return;
	}
	pageStatus.value = "success";
}
watch(sections, () => updatePageStatus());
updatePageStatus();
</script>

<template>
	<UScrollArea
		v-if="pageStatus === 'success'"
		v-slot="{ item: section, index }"
		:items="sections"
		:ui="{
			viewport: 'gap-4',
		}"
		class="w-full py-8"
	>
		<PageSubHeader
			v-if="section.name"
			:title="section.name"
			class="pt-0"
		/>
		<div
			v-if="section.people.length > 0"
			class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] justify-items-center gap-8 pb-8"
		>
			<PersonCard
				v-for="(person, i) in section.people"
				:key="person.id"
				:person="person"
			/>
		</div>
	</UScrollArea>
	<InDevelopment
		v-else-if="pageStatus === 'empty'"
		description="Tato sekce se ještě stydí ukázat se veřejnosti. 🫣"
	/>
</template>

<style scoped>

</style>
