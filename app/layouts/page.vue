<template>
	<div>
		<LandingHeader />

		<UMain>
			<UContainer
				class="min-h-[calc(100vh-var(--ui-header-height))]"
			>
				<slot />
			</UContainer>
		</UMain>

		<LandingFooter />
	</div>
</template>
