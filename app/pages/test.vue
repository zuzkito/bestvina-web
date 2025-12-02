<script lang="ts" setup>
definePageMeta({
	layout: "page",
});

const targetIsVisible = shallowRef(false);

function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
	isVisible.value = entry?.isIntersecting || false;
}
</script>

<template>
	<UPage
		class=""
	>
		<UPageBody class="flex flex-col items-center justify-center gap-8">
			<ProgressiveImage
				height="300"
				src="imgs/cat2.jpg"
				width="300"
			/>
		</UPageBody>
	</UPage>
</template>
