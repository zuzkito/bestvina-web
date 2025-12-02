/**
 * Composable to get a random subset of a list of images.
 * @param galleryImages the source list of images (reactive)
 * @param numPhotos the number of photos to return
 * @param shuffleInPlace if true, the list will be shuffled in place, otherwise a shallow copy will be created
 * @returns An object with a reactive list of random images and a refresh function.
 */
export default function useImageRandomizer<T extends PlainImage>(
	galleryImages: T[],
	numPhotos: number,
	shuffleInPlace: boolean = false,
) {
	const randomImages = ref<T[]>([]) as Ref<T[]>;

	const refresh = () => {
		if (!galleryImages || galleryImages.length === 0) {
			randomImages.value = [];
			return;
		}

		randomImages.value = getRandomItems(galleryImages, numPhotos, shuffleInPlace);
	};

	// initialize the list on the first load
	refresh();

	return {
		randomImages,
		refresh,
	};
}
