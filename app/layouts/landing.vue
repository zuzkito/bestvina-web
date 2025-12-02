<template>
	<div>
		<AppHeader />
		<!-- make the page fill windows height even if there is not enough content -->
		<div class="min-h-[var(--my-page-height)]">
			<slot />
		</div>

		<AppFooter />
	</div>
</template>
