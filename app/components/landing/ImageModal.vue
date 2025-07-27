<script setup lang="ts">
defineProps<{
	imgPath: string;
}>();
</script>

<template>
	<UModal
		class=""
		tit
		:ui="{
			content: 'max-h-[85vh] max-w-[85vw] w-fit h-fit',
			body: 'w-fit h-fit',
		}"
	>
		<template #body>
			<NuxtImg
				:src="imgPath"
				loading="lazy"
				fit="contain"
				class="max-h-[80vh] max-w-[80vw]"
			/>
		</template>
	</UModal>
</template>
