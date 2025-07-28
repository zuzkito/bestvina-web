<script setup lang="ts">
import { VueSpinnerGrid } from "vue3-spinners";

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
			body: 'w-fit h-fit justify-items-center',
		}"
	>
		<template #content>
			<NuxtImg
				v-slot="{ src, isLoaded, imgAttrs }"
				:src="imgPath"
				loading="lazy"
				fit="contain"
				:custom="true"
				class="max-h-[80vh] max-w-[80vw]"
			>
				<!-- Show the actual image when loaded -->
				<img
					v-if="isLoaded"
					v-bind="imgAttrs"
					:src="src"
				>

				<!-- Show a placeholder while loading -->
				<VueSpinnerGrid
					v-else
					size="50"
					color="neutral"
					alt="placeholder"
					class="m-8"
				/>
			</NuxtImg>
		</template>
	</UModal>
</template>
