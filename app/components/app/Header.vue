<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { CURRENT_YEAR } from "#shared/constants";

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: `Aktuální`,
		icon: "i-mdi-calendar-star",
		to: `/rocniky/${CURRENT_YEAR}`,
		badge: {
			label: `${CURRENT_YEAR}`,
			color: "secondary",
		},
	}, {
		label: "O soustředění",
		icon: "i-mdi-campfire",
		to: "/informace",
	}, {
		label: "Kronika",
		icon: "i-mdi-book-open-page-variant-outline",
		description: "Nahledni do historie Běstviny!",
		children: [
			{
				label: "Ročníky",
				to: "/kronika",
				description: "Zajímá tě, jaká byla v minulých letech témata? Nebo chceš jen stalkovat orgy za mlada?!",
				icon: "i-lucide-calendar",
			},
			{
				label: "Galerie",
				to: "/galerie",
				description: "Tady najdeš všechny fotky od všech autorů a ze všech roků pěkně na jednom místě!",
				icon: "i-lucide-gallery-thumbnails",
			},
		],
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
	<UHeader
		:ui="{
			left: 'h-full',
		}"
	>
		<template #left>
			<NuxtLink
				class="flex flex-row items-center gap-1.5 h-full"
				to="/"
			>
				<NuxtImg
					class="h-[70%] object-contain"
					src="/imgs/b-logo.svg"
				/>
			</NuxtLink>
		</template>

		<UNavigationMenu
			:items="items"
			:ui="{
				viewport: '',
			}"
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
