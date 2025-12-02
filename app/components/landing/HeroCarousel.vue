<script lang="ts" setup>
const img = useImage();
const src = "/imgs/promo/lecture.jpg";
const placeholder = img(src, {}, { preset: "thumbnailXXSm" });
</script>

<template>
	<NuxtImg
		:placeholder="placeholder"
		:src="src"
		class="h-full object-cover object-[75%_25%] lg:w-full lg:hover:scale-105 transition-transform rounded-xl"
		loading="lazy"
		preset="thumbnailXXLg"
	/>
</template>

<style scoped>

</style>
