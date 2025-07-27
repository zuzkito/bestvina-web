<script setup lang="ts">
const features = ref([
	{
		title: "Icons",
		description: "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
		icon: "i-lucide-smile",
		to: "/getting-started/icons",
	},
	{
		title: "Fonts",
		description: "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
		icon: "i-lucide-a-large-small",
		to: "/getting-started/fonts",
	},
	{
		title: "Color Mode",
		description: "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
		icon: "i-lucide-sun-moon",
		to: "/getting-started/color-mode",
	},
]);

// used to move from hero to next section
const scrollDownALittle = () => {
	document.getElementById("more")?.scrollIntoView();
};
</script>

<template>
	<UMain>
		<UPageHero
			orientation="horizontal"
			:ui="{
				container: 'pb-0 sm:pb-0 lg:py-0 min-h-[var(--my-full-heigh)]',
				description: 'text-balance',
				headline: 'lg:mt-0',
			}"
		>
			<template #headline>
				<div class="flex flex-col gap-4">
					<NuxtLink
						to="/"
					>
						<UBadge
							trailing-icon="i-lucide-arrow-right"
							size="md"
							variant="outline"
							color="success"
						>
							Přihlášky jsou právě otevřené!
						</UBadge>
					</NuxtLink>

					<NuxtLink
						to="/"
					>
						<UBadge
							trailing-icon="i-lucide-arrow-right"
							size="md"
							variant="outline"
							color="tertiary"
						>
							Fotogalerie byla aktualizována!
						</UBadge>
					</NuxtLink>
				</div>
			</template>
			<template #title>
				Letní odborné soustředění<br><span class="text-primary">Běstvina</span>
			</template>
			<template #description>
				Soutředění určené pro nejlepší řešitele chemické a biologické olympiády z celé České republiky.
			</template>
			<template #links>
				<UButton
					color="secondary"
					variant="subtle"
					trailing-icon="i-lucide-arrow-right"
					label="Chci vědět víc"
					@click="scrollDownALittle"
				/>
			</template>
			<UPageMarquee
				orientation="vertical"
				pause-on-hover
				:ui="{
					root: 'h-[calc(100vh-var(--ui-header-height))] [--duration:20s]',
					content: 'w-[30vw]',
				}"
			>
				<Placeholder
					class="w-full h-[10vh] bg-secondary"
				/>
				<Placeholder
					class="w-full h-[15vh] bg-tertiary"
				/>
				<Placeholder
					class="w-full h-[50vh] bg-secondary"
				/>
				<Placeholder
					class="w-full h-[30vh] bg-tertiary"
				/>
				<Placeholder
					class="w-full h-[20vh] bg-secondary"
				/>
				<Placeholder
					class="w-full h-[20vh] bg-tertiary"
				/>
			</UPageMarquee>
		</UPageHero>

		<UPageSection
			:features="features"
			:ui="{
				root: 'min-h-[var(--my-full-heigh)]',
			}"
		>
			<template
				#title
			>
				<a id="more" />
				Táborová základna VŠCHT Praha
			</template>
		</UPageSection>
	</UMain>
</template>
