import type { GalleryImage } from "~~/shared/types/image";

/**
 * Returns a list of all images from the gallery for a specific year.
 * **/
export default function useGalleryImages(year: string) {
	return useAsyncData<GalleryImage[]>(
		`${year}-gallery-images`,
		() => $fetch(`/api/images/gallery/${year}/`),
	);
}
