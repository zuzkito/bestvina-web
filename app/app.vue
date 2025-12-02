<script lang="ts" setup>
import { onMounted } from "#imports";
import { cs } from "@nuxt/ui/locale";

const appContainer = useTemplateRef<HTMLElement>("app-container");
onMounted(() => {
	useNuxtApp().provide("appContainer", appContainer);
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
	<div
		ref="app-container"
		class="h-[100vh] overflow-y-auto"
	>
		<UApp :locale="cs">
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
				<NuxtPage />
			</NuxtLayout>
		</UApp>
	</div>
</template>
