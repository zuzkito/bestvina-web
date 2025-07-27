<script setup lang="ts">
import { CURRENT_YEAR } from "~/app.config";

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
			title="Kronika Běstviny"
		/>

		<UPageBody>
			<UBlogPosts>
				<UBlogPost
					v-for="(year, index) in years"
					:key="index"
					:badge="year.theme"
					:title="`Ročník ${year.year}`"
					description=""
					:image="year.coverImg"
					:to="`/rocniky/${year.year}`"
					variant="soft"
				/>
			</UBlogPosts>
		</UPageBody>
	</UPage>
</template>
