<template>
	<div>
		<LandingHeader />
		<!-- make the page fill windows height even if there is not enough content -->
		<div class="min-h-[var(--my-page-height)]">
			<slot />
		</div>

		<LandingFooter />
	</div>
</template>
