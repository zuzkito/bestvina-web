<script lang="ts" setup>
import { PEOPLE_PAGES } from "#shared/constants";
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const router = useRouter();
const { getPageData } = usePeopleData();

/**
 * INITIAL ROOT PAGE FETCH (without the tab contents)
 * */
const rootPageId = PEOPLE_PAGES.ACTIVE;
const { data: rootPage } = await getPageData(rootPageId);

if (!rootPage.value) {
	throw createError({ statusCode: 404, statusMessage: "Stránka nenalezena!", fatal: true });
}

/**
 * TABS INITIALIZATION
 * */
const tabs: TabsItem[] = [
	{
		label: "Všichni",
		icon: "i-mdi-people-group",
		value: "vsichni",
	},
	{
		label: "Chemie",
		icon: "i-lucide-flask-conical",
		value: "chemie",
	},
	{
		label: "Biologie",
		icon: "i-mdi-bacteria-outline",
		value: "biologie",
	},
	{
		label: "Ostatní",
		icon: "i-lucide-badge-question-mark",
		value: "ostatni",
	},
];
const currentTab = computed({
	get() {
		return route.query.q as string || tabs[0]!.value;
	},
	set(tab: string) {
		router.push({
			path: "/lide",
			query: { q: tab },
		});
	},
});
const pageId = computed(() => `${rootPageId}_${currentTab.value}`);

const checkInitialRouteQueryParameter = () => {
	const validRoutes = [...tabs.map(value => value.value), ""];
	const currentPath = route.query.q as string || "";

	if (!validRoutes.includes(currentPath)) {
		currentTab.value = tabs[0]?.value as string;
	}
};
checkInitialRouteQueryParameter();
</script>

<template>
	<UMain>
		<UPageHeader
			:description="rootPage?.headerText ?? ''"
			:title="rootPage?.header ?? ''"
			:ui="{
				root: 'border-0',
			}"
		/>

		<UTabs
			v-model="currentTab"
			:content="true"
			:items="tabs"
			:ui="{
				leadingIcon: 'hidden md:block',
			}"
			class="w-full h-full sticky"
			color="secondary"
			variant="pill"
		/>

		<PeopleScrollableGrid
			:key="pageId"
			:page-id="pageId"
		/>
	</UMain>
</template>
