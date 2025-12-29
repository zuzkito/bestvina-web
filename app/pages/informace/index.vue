<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const router = useRouter();

/**
 * TABS INITIALIZATION
 * */
const tabs: TabsItem[] = [
	{
		label: "Obecně",
		icon: "i-lucide-badge-info",
		value: "obecne",
		slot: "general",
	},
	{
		label: "Chemie",
		icon: "i-lucide-flask-conical",
		value: "chemie",
		slot: "chemistry",
	},
	{
		label: "Biologie",
		icon: "i-mdi-bacteria-outline",
		value: "biologie",
		slot: "biology",
	},
];

const currentTab = ref(tabs[0]!.value as string);

// sync currentTab ref with route query
watch(() => route.query.t, (newTab) => {
	if (newTab && tabs.some(tab => tab.value === newTab)) {
		currentTab.value = newTab as string;
	}
}, { immediate: true });

// update URL when tab changes
watch(currentTab, (newTab) => {
	if (newTab !== route.query.t) {
		router.push({
			path: "/informace",
			query: { t: newTab },
			hash: route.hash,
		});
	}
});

const checkInitialRouteQueryParameter = () => {
	const validTabValues = [...tabs.map(value => value.value), ""];
	const selectedTabFromQuery = route.query.t as string;

	if (!validTabValues.includes(selectedTabFromQuery)) {
		// if non-existent tab requested, redirect to 'obecne' tab
		router.push({
			path: "/informace",
			hash: route.hash,
		});
		currentTab.value = tabs[0]!.value as string;
	}
	else {
		currentTab.value = selectedTabFromQuery;
	}
};
checkInitialRouteQueryParameter();

/**
 * FETCH PAGE DATA
 * */
const { pageData } = useAboutCamp();
const { data: rootPage } = await pageData("root");
const { data: pageGeneral } = await pageData(tabs[0]!.value as string);
const { data: pageChemistry } = await pageData(tabs[1]!.value as string);
const { data: pageBiology } = await pageData(tabs[2]!.value as string);

if (!rootPage) {
	throw createError({ statusCode: 404, statusMessage: "Stránka nenalezena!", fatal: true });
}
</script>

<template>
	<UPage>
		<UPageHeader
			v-if="rootPage"
			:description="rootPage.description"
			:title="rootPage.title"
		/>
		<UPageBody>
			<ClientOnly>
				<UTabs
					v-model="currentTab"
					:content="true"
					:items="tabs"
					:ui="{
						leadingIcon: 'hidden md:block',
					}"
					color="secondary"
					variant="pill"
				>
					<template #general>
						<ContentRenderer
							v-if="pageGeneral"
							:key="currentTab"
							:value="pageGeneral"
						/>
					</template>
					<template #chemistry>
						<ContentRenderer
							v-if="pageChemistry"
							:key="currentTab"
							:value="pageChemistry"
						/>
					</template>
					<template #biology>
						<ContentRenderer
							v-if="pageBiology"
							:key="currentTab"
							:value="pageBiology"
						/>
					</template>
				</UTabs>
				<template #fallback>
					<div class="w-full h-full flex flex-row justify-center items-center my-16">
						<UIcon
							class="text-muted"
							name="i-svg-spinners-bars-scale-middle"
							size="48"
						/>
					</div>
				</template>
			</ClientOnly>

			<!--			<InDevelopment
				:with-page-wrapper="false"
				class="mt-48"
			/> -->
		</UPageBody>
	</UPage>
</template>
