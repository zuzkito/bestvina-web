<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";

const emits = defineEmits(["tabChange"]);

const route = useRoute();
const router = useRouter();

const tabs: TabsItem[] = [
	{
		label: "Všichni",
		icon: "i-mdi-people-group",
		value: "vse",
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
const validRoutes = tabs.map(value => value.value);

const currentTab = computed({
	get() {
		return route.query.q as string || "vse";
	},
	set(tab: string) {
		router.push({
			path: "/lide",
			query: { q: tab },
		});
		emits("tabChange", tab);
	},
});

onMounted(() => {
	const currentPath = route.query.q as string || "vse";

	if (!validRoutes.includes(currentPath))
		currentTab.value = "vse";
});
</script>

<template>
	<UTabs
		v-model="currentTab"
		:content="false"
		:items="tabs"
		:ui="{
			leadingIcon: 'hidden lg:block',
		}"
		class="w-full"
		color="secondary"
	/>
</template>

<style scoped>

</style>
