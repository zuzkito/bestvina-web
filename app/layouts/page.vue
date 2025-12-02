<script lang="ts" setup>
</script>

<template>
	<div>
		<AppHeader />

		<UMain>
			<UContainer
				class="min-h-[calc(100vh-var(--ui-header-height))]"
			>
				<slot />
			</UContainer>
		</UMain>

		<AppFooter />
	</div>
</template>
