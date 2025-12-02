<script lang="ts" setup>
import { ref } from "vue";

definePageMeta({
	layout: "page",
});

const router = useRouter();

// get a list of all available years
const { data: years } = await useGalleryYears();
const yearsLength = computed(() => years.value?.length || 0);
const { data: allPhotographers } = await usePhotographers();

// get query parameters
const {	yearsFromQuery,	photographersFromQuery } = useGalleryParameters(useRoute().query, allPhotographers.value);

const selectedYears = ref<string[]>(yearsFromQuery.value);
const selectedPhotographers = ref<Photographer[]>(photographersFromQuery.value);

async function filterPhotos() {
	await router.push({
		path: "/galerie",
		query: {
			y: selectedYears.value,
			p: selectedPhotographers.value.map(p => p.shortcut),
		},
	});

	// TODO: reload page
}
</script>

<template>
	<UPage>
		<UPageBody>
			<div
				v-for="(year, i) in years"
				:key="year"
				class="m-0"
			>
				<GalleryYearBlock
					:key="year"
					:photographers="selectedPhotographers"
					:year="year"
				/>
				<USeparator
					v-if="i !== yearsLength - 1"
					class="my-4"
				/>
			</div>
		</UPageBody>
	</UPage>
</template>

<style scoped>

</style>
