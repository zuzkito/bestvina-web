<script setup lang="ts">
const items = computed<NavigationMenuItem[]>(() => [{
	label: "O soustředění",
	icon: "i-lucide-book-open",
	to: "/informace",
}, {
	label: "Lidé",
	icon: "i-lucide-book-open",
	to: "/lide",
}, {
	label: "Aktuální ročník",
	icon: "i-lucide-database",
	children: [
		{
			label: "Informace",
			icon: "i-lucide-file-text",
			description: "Define shortcuts for your application.",
			to: "/test",
		},
		{
			label: "Registrace",
			description: "Fully styled and customizable components for Nuxt.",
			icon: "i-lucide-house",
			to: "/test",
		},
	],
}, {
	label: "Kronika",
	icon: "i-lucide-database",
	to: "/kronika/",
}, {
	label: "Kontakt",
	icon: "i-lucide-box",
	to: "/kontakt",
	children: [
		{
			label: "Link",
			icon: "i-lucide-file-text",
			description: "Use NuxtLink with superpowers.",
			to: "/kontakt#",
		},
		{
			label: "Link",
			icon: "i-lucide-file-text",
			description: "Use NuxtLink with superpowers.",
			to: "/test",
		},
	],
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
