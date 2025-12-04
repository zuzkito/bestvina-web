<script lang="ts" setup>
definePageMeta({
	layout: "landing",
});

// used to move from hero to the next section
const scrollDownALittle = () => {
	document.getElementById("more")?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
	<div>
		<NuxtImg
			class="object-cover w-full h-full opacity-7 dark:opacity-10 fixed top-0 left-0 right-0 bottom-0 z-[-999]"
			src="imgs/hero_bg.svg"
		/>
		<UMain>
			<LandingSectionHero />

			<USeparator />

			<LandingSectionReasons />

			<USeparator />

			<LandingSectionActivities />

			<USeparator />

			<LandingSectionPeople />

			<USeparator />

			<LandingSectionLocation />

			<USeparator />

			<LandingLogos />
		</UMain>
	</div>
</template>
