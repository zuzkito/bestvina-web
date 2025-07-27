<script setup lang="ts">
import { LandingImageModal } from "#components";

definePageMeta({
	layout: "landing",
});

const overlay = useOverlay();
const modal = overlay.create(LandingImageModal);

async function openImageModal(path: string) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const instance = modal.open({
		imgPath: path,
	});
}

const features = ref([
	{
		title: "Icons",
		description: "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
		icon: "i-lucide-smile",
		to: "/",
	},
	{
		title: "Fonts",
		description: "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
		icon: "i-lucide-a-large-small",
		to: "/",
	},
	{
		title: "Color Mode",
		description: "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
		icon: "i-lucide-sun-moon",
		to: "/",
	},
]);

const components = ref([
	{
		title: "title",
		path: "/imgs/cat1.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat2.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat3.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat4.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat1.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat2.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat3.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat4.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat1.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat2.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat3.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat4.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat1.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat2.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat3.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat4.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat1.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat2.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat3.jpg",
	},
	{
		title: "title",
		path: "/imgs/cat4.jpg",
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
				root: 'mt-0',
				container: 'pb-0 sm:pb-0 py-12 gap-12 lg:py-0 lg:min-h-[var(--my-page-height)] lg:grid-cols-2',
				description: 'text-balance',
				headline: 'mt-0',
			}"
		>
			<template #headline>
				<div class="flex flex-col gap-4">
					<!-- prihlasky -->
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

					<!-- fotogalerie -->
					<!-- <NuxtLink
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
					</NuxtLink> -->

					<!-- shit -->
					<!-- <NuxtLink
						to="/"
					>
						<UBadge
							trailing-icon="i-lucide-arrow-right"
							size="md"
							variant="outline"
							color="error"
						>
							Něco se po💩!
						</UBadge>
					</NuxtLink> -->
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

			<div class="h-[40vh] w-full lg:min-h-[var(--my-page-height)] lg:w-full relative overflow-hidden lg:col-span-[1]">
				<UPageMarquee
					pause-on-hover
					:overlay="false"
					:ui="{
						root: '[--gap:--spacing(8)] [--duration:40s] border-default absolute h-full lg:h-auto w-full left-0 border-y md:border-x md:border-y-0 lg:w-full lg:flex-col',
						content: 'h-full lg:min-w-full flex-row lg:flex-col lg:animate-[marquee-vertical_var(--duration)_linear_infinite] lg:rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite]',
					}"
				>
					<a
						v-for="component of components?.slice(0, 10)"
						:key="component.path"
						class="relative group/link w-fit h-[90%] lg:w-[90%] lg:h-auto border-transparent 2xl:p-1.5 2xl:border-y"
						@click="openImageModal(component.path)"
					>

						<NuxtImg
							:src="component.path"
							loading="lazy"
							class="h-full lg:w-full lg:hover:scale-105 transition-transform"
						/>
					</a>
				</UPageMarquee>
			</div>
		</UPageHero>

		<a id="more" />
		<UPageSection
			:features="features"
			:ui="{
				root: 'min-h-[var(--my-page-height)]',
			}"
		>
			<template
				#title
			>
				Táborová základna VŠCHT Praha
			</template>
		</UPageSection>
	</UMain>
</template>
