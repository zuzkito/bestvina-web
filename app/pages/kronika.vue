<script lang="ts" setup>
import { CURRENT_YEAR } from "#shared/constants";

definePageMeta({
	layout: "page",
});

// get all years but the current one
const { data: years } = await useAsyncData("/rocniky/", () => {
	return queryCollection("years").where("year", "<>", CURRENT_YEAR).order("year", "DESC").all();
});
</script>

<template>
	<UPage>
		<UPageHeader
			title="Kronika"
		/>

		<UPageBody>
			<UBlogPosts>
				<UBlogPost
					v-for="(year, index) in years"
					:key="index"
					:description="year.theme"
					:title="`Ročník ${year.year}`"
					:image="year.coverImg"
					:to="`/rocniky/${year.year}`"
					variant="soft"
				/>
			</UBlogPosts>
		</UPageBody>
	</UPage>
</template>
