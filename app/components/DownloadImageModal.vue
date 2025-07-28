<script setup lang="ts">
import { VueSpinnerGrid } from "vue3-spinners";

const toast = useToast();

const props = defineProps<{
	imgPath: string;
}>();

const imageTitle = props.imgPath.split("/").pop() || "";

async function download() {
	toast.add({
		title: `Stahování ${imageTitle}`,
		description: `Stahování fotografie by mělo brzy začít!`,
		icon: "i-mdi-progress-download",
		closeIcon: "i-mdi-close",
		progress: false,
	});
}
</script>

<template>
	<UModal
		:title="imageTitle"
		:ui="{
			content: 'max-h-[85vh] max-w-[90vw] landscape:h-full portrait:w-full',
			body: 'justify-items-center flex justify-center items-center',
			footer: 'justify-end',
		}"
	>
		<template #body>
			<NuxtImg
				v-slot="{ src, isLoaded, imgAttrs }"
				:src="imgPath"
				:custom="true"
				class=""
			>
				<!-- Show the actual image when loaded -->
				<img
					v-if="isLoaded"
					v-bind="imgAttrs"
					:src="src"
					class="w-fit h-fit landscape:h-full portrait:w-full object-contain"
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
		<template #footer="{ close }">
			<a
				:href="`../${imgPath}`"
				download=""
				@click="close();download()"
			>
				<UButton
					label="Stáhnout"
					color="secondary"
					variant="outline"
				/>

			</a>
		</template>
	</UModal>
</template>
