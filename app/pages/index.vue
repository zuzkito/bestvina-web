<script lang="ts" setup>
import { CalendarDate } from "@internationalized/date";

definePageMeta({
	layout: "landing",
});

// used to move from hero to the next section
const scrollDownALittle = () => {
	document.getElementById("more")?.scrollIntoView({ behavior: "smooth" });
};

const currentYearTerm = shallowRef({
	start: new CalendarDate(2025, 6, 27),
	end: new CalendarDate(2025, 7, 11),
});
</script>

<template>
	<UMain>
		<LandingSectionHero />

		<USeparator
			icon="i-mdi-arrow-down"
		/>

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
</template>
