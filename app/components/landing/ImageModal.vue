<script lang="ts" setup>
import { VueSpinnerGrid } from "vue3-spinners";

defineProps<{
	imgPath: string;
}>();
</script>

<template>
	<UModal
		:ui="{
			content: 'max-h-[85vh] max-w-[85vw] w-fit h-fit',
			body: 'w-fit h-fit justify-items-center',
		}"
		class=""
		tit
	>
		<template #content>
			<NuxtImg
				v-slot="{ src, isLoaded, imgAttrs }"
				:custom="true"
				:src="imgPath"
				class="max-h-[80vh] max-w-[80vw]"
				fit="contain"
				loading="lazy"
			>
				<!-- Show the actual image when loaded -->
				<img
					v-if="isLoaded"
					:src="src"
					v-bind="imgAttrs"
				>

				<!-- Show a spinner while loading -->
				<VueSpinnerGrid
					v-else
					alt="spinner"
					class="m-8"
					color="var(--ui-neutral)"
					size="50"
				/>
			</NuxtImg>
		</template>
	</UModal>
</template>
