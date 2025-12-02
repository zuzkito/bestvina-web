<script lang="ts" setup>
interface PageSubHeaderProps {
	title: string;
	description?: string | undefined;
	headline?: string | undefined;
}

const _props = defineProps<PageSubHeaderProps>();
</script>

<template>
	<div class="relative py-8">
		<div class="flex flex-col lg:justify-between gap-4">
			<p
				v-if="headline"
				class="mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5"
			>
				{{ headline }}
			</p>
			<h2 class="text-2xl font-bold text-pretty text-highlighted sm:text-3xl">
				{{ title }}
			</h2>
			<p
				v-if="description"
				class="text-lg text-pretty text-muted"
			>
				{{ description }}
			</p>
		</div>
	</div>
</template>

<style scoped>

</style>
