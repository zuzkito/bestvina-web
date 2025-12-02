<script lang="ts" setup>
import type { ButtonProps } from "#ui/components/Button.vue";

interface InDevelopmentProps {
	title?: string;
	description?: string;
	icon?: string;
	action?: ButtonProps;
	withPageWrapper?: boolean;
}

const props = withDefaults(defineProps<InDevelopmentProps>(), {
	title: "Zatím ve vývoji!",
	description: "Na této stránce se usilovně pracuje a není proto ještě dostupná. 😢",
	icon: "i-proicons-skull", // "i-ph-skull",
	action: undefined,
	withPageWrapper: true,
});

const actions: ButtonProps[] = [{
	icon: "i-lucide-home",
	label: "Domovská stránka",
	color: "neutral",
	variant: "outline",
	to: "/",
}];

if (props.action) {
	actions.push(props.action);
}
</script>

<template>
	<UPage
		v-if="props.withPageWrapper"
		class="min-h-[calc(100vh-var(--ui-header-height))]"
	>
		<UPageBody class="min-h-[calc(100vh-var(--ui-header-height))] flex items-center justify-center">
			<UEmpty
				:actions="actions"
				:description="description"
				:icon="icon"
				:title="title"
				class="mb-48"
				variant="naked"
			/>
		</UPageBody>
	</UPage>
	<UEmpty
		v-else
		:actions="actions"
		:description="description"
		:icon="icon"
		:title="title"
		class="mb-48"
		variant="naked"
	/>
</template>

<style scoped>

</style>
