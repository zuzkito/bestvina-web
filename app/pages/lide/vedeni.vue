<script lang="ts" setup>
import { PEOPLE_PAGES } from "#shared/constants";

definePageMeta({
	layout: "page",
});

const { getPageData } = usePeopleData();

/**
 * INITIAL ROOT PAGE FETCH (without the tab contents)
 * */
const pageId = PEOPLE_PAGES.LEADERSHIP;
const { data: page } = await getPageData(pageId);

if (!page.value) {
	throw createError({ statusCode: 404, statusMessage: "Stránka nenalezena!", fatal: true });
}
</script>

<template>
	<UPage>
		<UPageHeader
			:description="page?.headerText"
			:title="page?.header"
		/>
		<UPageBody class="mt-0">
			<PeopleScrollableGrid
				:key="pageId"
				:page-id="pageId"
			/>
		</UPageBody>
	</UPage>
</template>
