<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";

definePageMeta({
	layout: "page",
});

const route = useRoute();
const routePathEnglish = route.path.replace("rocniky", "years");

const { data: page } = await useAsyncData(routePathEnglish, () => {
	return queryCollection("years").path(routePathEnglish).first();
});

const startDate = new Date(page.value?.startDate ?? "");
const endDate = new Date(page.value?.endDate ?? "");

if (!page.value || !page.value.year) {
	throw createError({ statusCode: 404, statusMessage: "Ročník nenalezen!", fatal: true });
}

const isCurrentYear = ref(page.value?.year == CURRENT_YEAR || false);

// get surroundings for navigation
async function getSurroundings() {
	const { data: surround } = await useAsyncData(`${routePathEnglish}-surround`, () => {
		return queryCollectionItemSurroundings("years", routePathEnglish, {
			fields: ["year", "theme", "title", "description"],
		}).where("year", "<>", CURRENT_YEAR)
			.order("year", "DESC");
	});

	// replace the default title and description with year and theme, respectively
	surround?.value?.map((item) => {
		if (item) {
			item.description = `Ročník ${item.year || "´???"}`;
			item.title = item.theme as string || "";
			item.path = item.path.replace("years", "rocniky");
		}
	});
	return surround;
}
const surround = await getSurroundings();

// date formatter
const formatDate = (date: Date) => date.toLocaleString("cs-CZ", {
	weekday: "short", day: "numeric", month: "numeric",
});

console.log(page.value);
console.log(page.value.price);
</script>

<template>
	<UPage
		v-if="page"
		id="pageId"
	>
		<UPageHeader
			:description="`${isCurrentYear ? 'Táborové téma se dozvíš až na začátku soustředění!' : ''}`"
			:headline="`Ročník ${page.year}`"
			:title="`${isCurrentYear ? 'Aktuální ročník' : page.theme}`"
		/>
		<UPageBody>
			<div
				v-show="isCurrentYear"
				class="grid grid-cols-1 md:grid-cols-3 gap-6"
			>
				<InfoCard
					icon="i-lucide-calendar-days"
					title="Termín konání"
				>
					<template #default>
						<div class="flex flex-col gap-2">
							<p class="text-2xl font-bold text-secondary">
								{{ formatDate(startDate) }} &ndash; {{ formatDate(endDate) }}
							</p>
							<p class="text-muted text-sm">
								Bude možnost využít autobusovou dopravu z Prahy.
							</p>
						</div>
					</template>
				</InfoCard>

				<InfoCard
					icon="i-lucide-coins"
					title="Cena soustředění"
				>
					<template #default>
						<div class="flex flex-col gap-2">
							<div class="flex gap-2 items-center justify-between">
								<p class="text-2xl font-bold text-secondary">
									{{ page.price }} Kč
								</p>
								<UPopover mode="click">
									<UButton
										color="neutral"
										label="Informace"
										leading-icon="i-lucide-info"
										variant="subtle"
									/>
									<template #content>
										<div class="p-2 max-w-72 text-sm">
											Na některých školách je možné žádat o finanční příspěvěk pro účast žáka na soustředění. Vystavení potvrzení o účasti není problém.
										</div>
									</template>
								</UPopover>
							</div>
							<p class="text-muted text-sm">
								Zahrnuje ubytování, celodenní stravování i dopravu autobusem.
							</p>
						</div>
					</template>
				</InfoCard>
			</div>

			<ContentRenderer :value="page.body" />

			<div v-show="!isCurrentYear">
				<USeparator icon="i-mdi-history" />

				<!-- Gallery -->
				<LazyGradeGalleryPreview
					:year="page.year.toString()"
				/>

				<!-- Group Photos -->
				<LazyGradeGroupImages
					:year="page.year.toString()"
				/>

				<!-- Surroundings -->
				<!--				<USeparator -->
				<!--					v-if="surround?.filter(Boolean).length" -->
				<!--					class="mt-4 mb-8" -->
				<!--				/> -->
				<UContentSurround
					:surround="surround"
					class="mt-16"
				/>
			</div>
		</UPageBody>
	</UPage>
</template>

<style scoped>
</style>
