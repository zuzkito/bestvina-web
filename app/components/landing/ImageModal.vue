<script setup lang="ts">
import { VueSpinnerGrid } from "vue3-spinners";

defineProps<{
	imgPath: string;
}>();

const isLoaded = ref(false);

function imageLoaded() {
	isLoaded.value = true;
}
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
			<VueSpinnerGrid
				v-show="!isLoaded"
				size="50"
				color="neutral"
			/>

			<NuxtImg
				:src="imgPath"
				loading="lazy"
				fit="contain"
				class="max-h-[80vh] max-w-[80vw]"
				@load="imageLoaded"
			/>
		</template>
	</UModal>
</template>
