<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";

const description = ref(
	"Dvoutýdenní soustředění pro nejlepší středoškolské řešitele chemické a biologické olympiády z celé České republiky podporované "
	+ "přírodovědně zaměřenými fakultami předních českých univerzit.",
);
</script>

<template>
	<UPageHero
		:description="description"
		:ui="{
			description: 'lg:max-w-[80%]',
			container: 'py-16 pb-16 sm:py-8 sm:pb-16 lg:pb-0 lg:py-40',
		}"
		orientation="horizontal"
	>
		<template #headline>
			<LandingHeroInfoHeadline />
		</template>
		<template #title>
			<span class="leading-tight">Letní odborné soustředění<br><span class="bg-gradient-to-r from-teal-500 to-teal-300  dark:from-teal-500 dark:to-teal-100 bg-clip-text text-transparent animate-gradient">BĚSTVINA</span></span>
		</template>
		<template #links>
			<UButton
				color="neutral"
				label="O soustředění"
				prefetch-on="visibility"
				size="xl"
				to="/informace"
				trailing-icon="i-lucide-arrow-right"
				variant="subtle"
			/>

			<UButton
				:to="`/rocniky/`+ CURRENT_YEAR.toString()"
				color="primary"
				label="Aktuální ročník"
				prefetch-on="visibility"
				size="xl"
				trailing-icon="i-lucide-arrow-right"
			/>
		</template>

		<template #default>
			<LandingHeroCarousel />
		</template>
	</UPageHero>
</template>

<style scoped>
.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 8s ease-in-out infinite alternate;
  -moz-animation: animatedgradient 8s ease-in-out infinite alternate;
  animation: animatedgradient 8s ease-in-out infinite alternate;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
