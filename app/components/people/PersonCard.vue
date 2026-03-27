<script lang="ts" setup>
import type { PeopleCollectionItem } from "@nuxt/content";

const img = useImage();
const placeholder = (src: string) => img(src, {}, { preset: "thumbnailXXSm" });

defineProps<{
	person: PeopleCollectionItem & {
		roleTitle: string | undefined;
		role: string | undefined;
	};
	pageId: string;
	showImage: boolean;
}>();
</script>

<template>
	<UCard
		v-if="person"
		:ui="{
			root: 'bg-muted flex flex-col w-full',
			header: 'flex flex-col items-center !p-0 mx-0',
			body: 'h-full !p-4',
			footer: 'flex flex-col items-center gap-4',
		}"
	>
		<template #header>
			<div
				v-if="showImage"
				class="object-cover w-full aspect-3/2 bg-elevated flex justify-center items-center"
			>
				<NuxtImg
					v-if="person.image"
					:placeholder="placeholder(person.image)"
					:src="person.image"
					class="object-cover w-full aspect-3/2"
					preset="thumbnailLg"
				/>

				<UIcon
					v-else
					class="text-primary"
					name="i-lucide-user-round"
					size="96"
				/>
			</div>
			<div class="p-4 w-full">
				<p
					class="text-highlighted text-xl font-bold"
				>
					{{ person.name }}
				</p>
				<p
					v-if="person.roleTitle"
					class="text-muted lowercase"
				>
					{{ person.roleTitle }}
				</p>
			</div>
		</template>

		<template #default>
			<div
				v-if="person.description"
				class="flex flex-col gap-4 whitespace-pre-wrap text-sm text-justify"
			>
				{{ person.description }}
			</div>
		</template>
	</UCard>
</template>

<style scoped>

</style>
