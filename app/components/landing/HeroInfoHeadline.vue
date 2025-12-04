<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";

// TODO: make headlines reactive to some API call

const itemsToShow = ref({
	prihlasky: true,
	galerie: false,
});
const allHeadlinesHidden = computed(() => {
	const values = Object.values(itemsToShow.value);
	return values.every(value => value === false);
});
</script>

<template>
	<div
		v-if="!allHeadlinesHidden"
		class="flex flex-col gap-4 w-fit"
	>
		<!-- prihlasky -->
		<NuxtLink
			v-if="itemsToShow['prihlasky']"
			to="/"
		>
			<UBadge
				color="success"
				size="md"
				trailing-icon="i-lucide-arrow-right"
				variant="solid"
			>
				Přihlášky jsou právě otevřené!
			</UBadge>
		</NuxtLink>

		<!-- fotogalerie -->
		<NuxtLink
			v-if="itemsToShow['galerie']"
			:to="`/galerie?y=` + CURRENT_YEAR.toString()"
		>
			<UBadge
				color="secondary"
				size="md"
				trailing-icon="i-lucide-arrow-right"
				variant="solid"
			>
				Fotogalerie byla aktualizována!
			</UBadge>
		</NuxtLink>
		<!--		<NuxtLink
			to="/"
		>
			<UBadge
				color="tertiary"
				size="md"
				trailing-icon="i-lucide-arrow-right"
				variant="outline"
			>
				Něco se po💩!
			</UBadge>
		</NuxtLink> -->
	</div>
</template>

<style scoped>

</style>
