<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "O soustředění",
		icon: "i-mdi-campfire",
		to: "/informace",
	}, {
		label: "Aktuální ročník",
		icon: "i-mdi-calendar-star",
		to: "/rocniky/2025",
	}, {
		label: "Kronika",
		icon: "i-mdi-book-open-page-variant-outline",
		to: "/kronika",
	}, {
		label: "Galerie",
		icon: "i-lucide-gallery-thumbnails",
		to: "/galerie",
	}, {
		label: "Lidé",
		icon: "i-mdi-account-group",
		to: "/lide",
	}, {
		label: "Kontakt",
		icon: "i-lucide-box",
		to: "/kontakt",
	},
]);
</script>

<template>
	<UHeader>
		<template #title>
			<NuxtLink to="/">
				<BestvinaLogo class="h-6 w-auto" />
			</NuxtLink>
		</template>

		<UNavigationMenu
			:items="items"
			class="hidden lg:inline-flex border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
			orientation="horizontal"
			variant="pill"
		/>

		<template #right>
			<UColorModeButton />
		</template>

		<template #body>
			<UNavigationMenu
				:items="items"
				class="-mx-2.5"
				orientation="vertical"
			/>

			<USeparator class="my-6" />
		</template>
	</UHeader>
</template>
