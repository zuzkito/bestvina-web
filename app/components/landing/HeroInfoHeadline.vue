<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";
</script>

<template>
	<div class="flex flex-col gap-4 w-fit">
		<!-- prihlasky -->
		<NuxtLink
			to="/"
		>
			<UBadge
				color="success"
				size="md"
				trailing-icon="i-lucide-arrow-right"
				variant="outline"
			>
				Přihlášky jsou právě otevřené!
			</UBadge>
		</NuxtLink>

		<!-- fotogalerie -->
		<NuxtLink
			:to="`/galerie?y=` + CURRENT_YEAR.toString()"
		>
			<UBadge
				color="secondary"
				size="md"
				trailing-icon="i-lucide-arrow-right"
				variant="outline"
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
