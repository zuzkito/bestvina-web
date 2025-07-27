<script setup lang="ts">
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
	label: "Team",
	to: "/",
}, {
	label: "Roadmap",
	to: "/",
}, {
	label: "Terms",
	to: "/",
}, {
	label: "Releases",
	to: "https://github.com/nuxt/ui/releases",
	target: "_blank",
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
				to="https://github.com/nuxt/ui"
				target="_blank"
				class="text-sm text-muted"
			>
				Published under <span class="text-highlighted">MIT License</span>
			</NuxtLink>
		</template>

		<UNavigationMenu
			:items="links"
			variant="link"
			color="neutral"
		/>

		<template #right>
			<UButton
				aria-label="Nuxt Website"
				icon="i-simple-icons-nuxtdotjs"
				to="https://nuxt.com"
				target="_blank"
				color="neutral"
				variant="ghost"
				size="sm"
			/>
			<UButton
				aria-label="Nuxt UI on Discord"
				icon="i-simple-icons-discord"
				to="https://chat.nuxt.dev"
				target="_blank"
				color="neutral"
				variant="ghost"
				size="sm"
			/>
			<UButton
				aria-label="Nuxt on X"
				icon="i-simple-icons-x"
				to="https://x.com/nuxt_js"
				target="_blank"
				color="neutral"
				variant="ghost"
				size="sm"
			/>
			<UButton
				aria-label="Nuxt on BlueSky"
				icon="i-simple-icons-bluesky"
				to="https://bsky.app/profile/nuxt.com"
				target="_blank"
				color="neutral"
				variant="ghost"
				size="sm"
			/>
			<UButton
				aria-label="Nuxt UI on GitHub"
				icon="i-simple-icons-github"
				to="https://github.com/nuxt/ui"
				target="_blank"
				color="neutral"
				variant="ghost"
				size="sm"
			/>
		</template>
	</UFooter>
</template>
