<script lang="ts" setup>

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
				:custom="true"
				:src="imgPath"
			>
				<!-- Show the actual image when loaded -->
				<img
					v-if="isLoaded"
					:src="src"
					class="w-fit h-fit landscape:h-full portrait:w-full object-contain"
					v-bind="imgAttrs"
				>

				<!-- Show a spinner while loading -->
<!--				<VueSpinnerGrid-->
<!--					v-else-->
<!--					alt="spinner"-->
<!--					class="m-8"-->
<!--					color="var(&#45;&#45;ui-neutral)"-->
<!--					size="50"-->
<!--				/>-->
            <UIcon
              v-else
              alt="spinner"
              class="m-8"
              color="primary"
              name="i-svg-spinners-ring-resize"
              size="50" />
			</NuxtImg>
		</template>
		<template #footer="{ close }">
			<a
				:href="`../${imgPath}`"
				download=""
				@click="close();download()"
			>
				<UButton
					color="secondary"
					label="Stáhnout"
					variant="solid"
				/>

			</a>
		</template>
	</UModal>
</template>
