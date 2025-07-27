<template>
	<div>
		<LandingHeader />

		<!-- make the page fill windows height even if there is not enough content -->
		<div class="min-h-[calc(100vh-var(--ui-header-height))]">
			<slot />
		</div>

		<LandingFooter />
	</div>
</template>
