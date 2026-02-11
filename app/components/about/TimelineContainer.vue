<script lang="ts" setup>
defineProps<{
	items: Array<{ time?: string; title?: string; description?: string }>;
}>();
</script>

<template>
	<UTimeline
		:items="items"
		:ui="{
			root: 'mt-4 md:mt-8',
			date: 'float-end ms-1',
			description: ' rounded-md text-default',
			indicator: 'bg-secondary',
			separator: 'bg-secondary/25',
		}"
		class="w-full"
		size="3xs"
	>
		<template #title="{ item }">
			<div class="flex flex-col">
				<span class="text-secondary">{{ item.time }}</span>
				<span class="text-highlighted">{{ item.title }}</span>
			</div>
		</template>

		<template #date="{ item }">
			{{ item.description }}
		</template>
	</UTimeline>
</template>
