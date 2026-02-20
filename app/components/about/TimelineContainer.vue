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
			date: 'text-secondary',
			title: 'text-highlighted',
			description: 'text-muted',
			indicator: 'bg-secondary',
			separator: 'bg-secondary/25',
		}"
		class="w-full"
		size="3xs"
	>
		<template #date="{ item }">
			{{ item.time }}
		</template>
	</UTimeline>
</template>
