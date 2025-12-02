import type { GalleryImage } from "#shared/types/image";

/**
 * Returns a list of N random images from the gallery for a specific year USING SERVER API.
 * For client-side use, see useGalleryImageRandomizer() in conjunction with useRandomGalleryImages()
 * **/
export default function useRandomGalleryImagesServer(year: number, numPhotos: number) {
	return useAsyncData<GalleryImage[]>(
		`${year}-gallery-images-${Date.now()}`,
		() => $fetch(`/api/images/gallery/${year}/random?n=${numPhotos}`),
	);
}
