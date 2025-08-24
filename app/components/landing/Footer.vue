<script lang="ts" setup>
const colorMode = useColorMode();
const isMounted = ref(0);

// const isDark = await computed({
// 	get() {
// 		return colorMode.value === "dark";
// 	},
// 	set(_isDark) {
// 		colorMode.preference = _isDark ? "dark" : "light";
// 	},
// });

onMounted(() => {
	isMounted.value++;
});

const links = [{
	label: "O webu",
	to: "/",
}, {
	label: "Lidé",
	to: "/lide",
}, {
	label: "Kontakt",
	to: "/kontakt",
}];
</script>

<template>
	<USeparator
		:key="isMounted"
		:icon="colorMode.value == 'dark' ? 'i-my-b-flask-dark' : 'i-my-b-flask-light'"
	/>

	<UFooter>
		<template #left>
			<NuxtLink
				class="text-sm text-muted"
				target="_blank"
				to="https://github.com/FelyCZ/bestvina-web"
			>
				Zdrojový kód je dostupný na <span class="text-highlighted">GitHubu</span>
			</NuxtLink>
		</template>

		<UNavigationMenu
			:items="links"
			color="neutral"
			variant="link"
		/>

		<template #right>
			<UButton
				aria-label="Nuxt Website"
				color="neutral"
				icon="i-simple-icons-nuxtdotjs"
				size="sm"
				target="_blank"
				to="https://nuxt.com"
				variant="ghost"
			/>
			<UButton
				aria-label="Nuxt UI on Discord"
				color="neutral"
				icon="i-simple-icons-discord"
				size="sm"
				target="_blank"
				to="https://chat.nuxt.dev"
				variant="ghost"
			/>
			<UButton
				aria-label="Nuxt on X"
				color="neutral"
				icon="i-simple-icons-x"
				size="sm"
				target="_blank"
				to="https://x.com/nuxt_js"
				variant="ghost"
			/>
			<UButton
				aria-label="Nuxt on BlueSky"
				color="neutral"
				icon="i-simple-icons-bluesky"
				size="sm"
				target="_blank"
				to="https://bsky.app/profile/nuxt.com"
				variant="ghost"
			/>
			<UButton
				aria-label="Nuxt UI on GitHub"
				color="neutral"
				icon="i-simple-icons-github"
				size="sm"
				target="_blank"
				to="https://github.com/nuxt/ui"
				variant="ghost"
			/>
		</template>
	</UFooter>
</template>
