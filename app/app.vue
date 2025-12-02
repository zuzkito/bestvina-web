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
