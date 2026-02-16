import type { MinifiedBestvinaImage } from "#shared/utils/imageMapper";

export default defineEventHandler(async (event) => {
	const type = getRouterParam(event, "type");
	const year = getRouterParam(event, "year");

	if (!type || !type.match(/^(galerie|oddily)$/)) {
		throw createError({ statusCode: 400, statusMessage: "Invalid type parameter" });
	}
	if (!year || !year.match(/^\d{4}$/)) {
		throw createError({ statusCode: 400, statusMessage: "Invalid year parameter" });
	}

	const images = await getImagesForYear(year, type);

	const result: Record<string, MinifiedBestvinaImage[]> = {
		[year]: images,
	};

	return { images: result };
});
