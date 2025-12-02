import type { H3Event } from "h3";
import { getPhotosByYear, validateNumPhotos, validateYear } from "~~/server/utils/gallery";
import { getRandomItems } from "#shared/utils/arrays";

export default defineEventHandler(async (event: H3Event): GalleryImage[] => {
	const year = validateYear(event);
	const numPhotos = validateNumPhotos(event);

	const images = getRandomItems(await getPhotosByYear(year), numPhotos, true);

	return images.map((img) => {
		return ImageBuilder.from(img).asGalleryImage(year);
	});
});
