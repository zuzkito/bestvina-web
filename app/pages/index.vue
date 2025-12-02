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
		<!--		<UPageSection -->
		<!--			:links="[{ -->
		<!--				label: 'Přejít', -->
		<!--				to: `/rocniky/${CURRENT_YEAR}`, -->
		<!--				color: 'secondary', -->
		<!--				variant: 'link', -->
		<!--				trailingIcon: 'i-lucide-arrow-right', -->
		<!--			}]" -->
		<!--			:title="`Běstvina ` + CURRENT_YEAR.toString()" -->
		<!--			:ui="{ -->
		<!--				container: 'my-4 lg:my-8 py-8 lg:py-16 gap-0 sm:gap-0 rounded-xl bg-primary/10 lg:w-2/5', -->
		<!--			}" -->
		<!--			description="Hledáš informace k nadcházejícímu soustředění?" -->
		<!--			headline="Aktuální ročník" -->
		<!--			icon="i-mdi-calendar-star" -->
		<!--		> -->
		<!--			<div -->
		<!--				class="flex justify-center" -->
		<!--			> -->
		<!--				&lt;!&ndash;						<UCalendar &ndash;&gt; -->
		<!--				&lt;!&ndash;							v-model="currentYearTerm" &ndash;&gt; -->
		<!--				&lt;!&ndash;							:month-controls="false" &ndash;&gt; -->
		<!--				&lt;!&ndash;							:year-controls="false" &ndash;&gt; -->
		<!--				&lt;!&ndash;							class="max-w-full lg:max-w-[20%]" &ndash;&gt; -->
		<!--				&lt;!&ndash;							range &ndash;&gt; -->
		<!--				&lt;!&ndash;							readonly &ndash;&gt; -->
		<!--				&lt;!&ndash;							variant="subtle" &ndash;&gt; -->
		<!--				&lt;!&ndash;						/> &ndash;&gt; -->
		<!--			</div> -->
		<!--		</UPageSection> -->

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
