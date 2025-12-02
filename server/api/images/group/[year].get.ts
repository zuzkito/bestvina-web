import { getPhotosByYear, validateYear } from "~~/server/utils/gallery";

export default defineEventHandler(async (event) => {
	const year = validateYear(event);

	const photos = await getPhotosByYear(year, "oddily");
	return photos.map((img) => {
		return ImageBuilder.from(img).asGroupImage(year);
	});
});
