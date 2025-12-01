<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

interface CopyButtonProps {
	value: string;
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost";
	tooltip?: string;
}

const _props = defineProps<CopyButtonProps>();

const { copy, copied } = useClipboard();

const toast = useToast();

function showToast() {
	toast.add({
		title: "Zkopírováno!",
		icon: "i-lucide-copy-check",
		progress: false,
		color: "success",
	});
}
</script>

<template>
	<UTooltip
		:content="{ side: 'right' }"
		:text="tooltip ?? 'Zkopírovat do schránky'"
	>
		<UButton
			:aria-label="tooltip ?? 'Zkopírovat do schránky'"
			:color="copied ? 'success' : 'neutral'"
			:icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
			:size="size ?? 'sm'"
			:variant="variant ?? 'link'"
			@click="copy(value);showToast()"
		/>
	</UTooltip>
</template>
