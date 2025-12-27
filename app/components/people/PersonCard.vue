<script lang="ts" setup>
import type { PeopleCollectionItem } from "@nuxt/content";

defineProps<{
	person: PeopleCollectionItem & {
		roleTitle: string | undefined;
		role: string | undefined;
	};
}>();
</script>

<template>
	<UCard
		v-if="person"
		:ui="{
			root: 'bg-primary-500/8 flex flex-col w-3/4 md:w-full',
			header: 'flex flex-col items-center !p-0 mx-0',
			body: 'h-full !p-4',
			footer: 'flex flex-col items-center gap-4',
		}"
	>
		<template #header>
			<NuxtImg
				v-if="person.image"
				:src="person.image"
				class="object-cover w-full aspect-square"
				preset="thumbnailMd"
			/>
			<div
				v-else
				class="object-cover w-full aspect-square bg-elevated flex justify-center items-center"
			>
				<UIcon
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
					v-if="!person.roleTitle"
					class="text-muted"
				>
					{{ person.roleTitle || "nazev role" }}
				</p>
			</div>
		</template>

		<template #default>
			<div
				v-if="person.description"
				class="flex flex-col gap-4 whitespace-pre-wrap text-sm"
			>
				{{ person.description }}
			</div>
		</template>
	</UCard>
</template>

<style scoped>

</style>
