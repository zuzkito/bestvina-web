import type { H3Event } from "h3";
import { getPhotosByYear, validateYear } from "~~/server/utils/gallery";

export default defineEventHandler(async (event: H3Event) => {
	const year = validateYear(event);
	const images = await getPhotosByYear(year);

	return images.map((img) => {
		// return GalleryImage object
		return ImageBuilder.from(img).asGalleryImage(year);
	});
});
