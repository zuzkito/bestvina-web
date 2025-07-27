<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "O soustředění",
		icon: "i-mdi-campfire",
		to: "/informace",
	}, {
		label: "Aktuální ročník",
		icon: "i-mdi-calendar-star",
		to: "/2025",
	}, {
		label: "Kronika",
		icon: "i-mdi-book-open-page-variant-outline",
		to: "/kronika/",
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
			variant="pill"
			orientation="horizontal"
			class="hidden lg:inline-flex border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
		/>

		<template #right>
			<UColorModeButton />
		</template>

		<template #body>
			<UNavigationMenu
				:items="items"
				orientation="vertical"
				class="-mx-2.5"
			/>

			<USeparator class="my-6" />
		</template>
	</UHeader>
</template>
