<script lang="ts" setup>
const { openImage } = useImageDetail();
const route = useRoute();

// Your array of images.
// Using the /imgs/ prefix here to test your stripping/encoding logic.
const galleryImages = [
	"/imgs/cat1.jpg",
	"/imgs/cat2.jpg",
	"/imgs/cat3.jpg",
	"/imgs/cat4.jpg",
];
</script>

<template>
	<div class="max-w-6xl mx-auto p-4 sm:p-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
				Project Gallery
			</h1>
			<p class="text-gray-500 dark:text-gray-400 mt-2">
				Click any image to view it in full screen.
			</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			<div
				v-for="(imgSrc, index) in galleryImages"
				:key="index"
				class="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-800"
				@click="openImage(imgSrc, galleryImages, { returnTo: route.path })"
			>
				<img
					:alt="`Gallery image ${index + 1}`"
					:src="imgSrc"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				>

				<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
					<UIcon
						class="text-white opacity-0 group-hover:opacity-100 w-10 h-10 transition-opacity duration-300 drop-shadow-md"
						name="i-heroicons-magnifying-glass-plus"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
