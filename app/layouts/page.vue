<script lang="ts" setup>
</script>

<template>
	<UMain class="overflow-x-hidden">
		<AppHeader />

		<UContainer
			class="min-h-[calc(100vh-var(--ui-header-height))]"
		>
			<slot />
		</UContainer>

		<AppFooter />
	</UMain>
</template>
