<script lang="ts" setup>
</script>

<template>
	<UFooter
		class="bg-black"
	>
		<template #left>
			<NuxtLink
				class="text-sm text-muted"
				target="_blank"
				to="https://github.com/FelyCZ/bestvina-web"
			>
				Zdrojový kód je dostupný na <span class="text-white hover:text-secondary">GitHubu</span>
			</NuxtLink>
		</template>

		<template #default>
			<!-- todo -->
		</template>

		<template #right>
			<UButton
				aria-label="Web chemické olympiády"
				class="text-white light:hover:bg-elevated/20 dark:hover:bg-elevated hover:text-secondary"
				color="neutral"
				icon="i-carbon-chemistry"
				label="Chemická olympiáda"
				size="sm"
				target="_blank"
				to="https://olympiada.vscht.cz/"
				variant="link"
			/>

			<UButton
				aria-label="Web biologické olympiády"
				class="text-white light:hover:bg-elevated/20 dark:hover:bg-elevated hover:text-secondary"
				color="neutral"
				icon="i-material-symbols-microbiology-outline"
				label="Biologická olympiáda"
				size="sm"
				target="_blank"
				to="https://olympiada.natur.cuni.cz/cs/"
				variant="ghost"
			/>
		</template>
	</UFooter>
</template>
