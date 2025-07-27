<script setup lang="ts">
definePageMeta({
	layout: "page",
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
					badge="Citrón"
					title="Ročník 2024"
					description=""
					image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
				/>

				<UBlogPost
					badge="Egypt"
					title="Ročník 2023"
					description=""
					image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
				/>

				<UBlogPost
					badge="Rakousko-Uhersko"
					title="Ročník 2022"
					description=""
					image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
				/>

				<UBlogPost
					badge="Vesmír"
					title="Ročník 2021"
					description=""
					image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
				/>
			</UBlogPosts>
		</UPageBody>
	</UPage>
</template>
