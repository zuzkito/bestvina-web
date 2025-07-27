<script setup lang="ts">
// Set custom anchor with Y axis scrolling to dynamic offset
// nuxtApp.$anchorScroll!.defaults.toAnchor = () => ({
// 	behavior: "smooth",
// 	offsetTop: -(toValue(useNuxtApp().$headerHeight) ?? 0) * 1.2,
// });

// // Add route specialization for fixed solution
// // See docs for explanation
// nuxtApp.$anchorScroll!.matched.push(({ path, hash }) => {
// 	if (hash) {
// 		// All anchor element on this route is mangled
// 		const targetSelector = `#fixed-${hash.slice(1)}`;
// 		const targetElement = document.querySelector(targetSelector);
// 		if (targetElement) {
// 			return {
// 				toAnchor: {
// 					target: targetElement as HTMLElement,
// 					scrollOptions: toValue(useNuxtApp().$anchorScroll?.defaults?.toAnchor) ?? {},
// 				},
// 			};
// 		}
// 	}
// });
</script>

<template>
	<UApp>
		<NuxtLoadingIndicator
			color="var(--ui-primary)"
			:height="2"
		/>

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
