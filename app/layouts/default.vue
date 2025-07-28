<template>
	<UMain>
		<LandingHeader />

		<!-- make the page fill windows height even if there is not enough content -->
		<slot />
		<LandingFooter />
	</UMain>
</template>
