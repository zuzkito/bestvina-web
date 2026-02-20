<script lang="ts" setup>
import { onMounted } from "#imports";
import { cs } from "@nuxt/ui/locale";

const nuxtApp = useNuxtApp();
const pageContainer = useTemplateRef<HTMLElement>("page");

onMounted(() => {
	const appContainer = shallowRef(document.getElementById("app"));
	nuxtApp.provide("appContainer", readonly(appContainer));
	nuxtApp.provide("pageContainer", readonly(pageContainer));
});

useHead({
	meta: [
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
	],
	link: [
		{ rel: "icon", href: "/favicon.ico" },
	],
	htmlAttrs: {
		lang: "cs",
	},
	title: "Běstvina",
});

// IMAGE DETAIL GLOBAL OPENER
const { checkGlobalUrl, isModalOpen } = useImageDetail();
const route = useRoute();

onMounted(() => {
	checkGlobalUrl();
});

watch(
	() => route.query.image,
	(newVal, oldVal) => {
		// Only trigger globally if the modal isn't already handling the sequence
		if (newVal && !oldVal && !isModalOpen.value) {
			checkGlobalUrl();
		}
	},
);
</script>

<template>
	<UApp
		:locale="cs"
	>
		<NuxtLoadingIndicator
			:height="2"
			color="var(--ui-primary)"
		/>
		<UBanner
			id="in-development"
			:ui="{
				root: 'py-2',
				title: 'line-clamp-3 whitespace-normal',
			}"
			class="h-fit"
			close
			title="Web je stále v raných fázích vývoje a nemusí zatím fungovat zcela podle představ..."
		/>
		<NuxtLayout>
			<div
				ref="page"
			>
				<NuxtPage />
			</div>
		</NuxtLayout>
	</UApp>
</template>
