<script lang="ts" setup>
</script>

<template>
	<!--  do NOT move the AppHeader inside UMain, stickiness would get lost -->
	<div>
		<AppHeader />
		<UMain class="overflow-x-clip">
			<UContainer
				class="min-h-[calc(100vh-var(--ui-header-height))]"
			>
				<slot />
			</UContainer>
		</UMain>
		<AppFooter />
	</div>
</template>
