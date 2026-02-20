import { resolve } from "path";
import { readdirSync } from "node:fs";

// TODO: might require further improvement to use async fs
// for now, this fixes the EMFILE (too many open) during prerender
export default defineEventHandler(async () => {
	const baseDir = resolve(process.cwd(), "public", "imgs", "years");

	try {
		const entries = readdirSync(baseDir, { withFileTypes: true });

		const years = entries
			.filter(entry => entry.isDirectory() && entry.name.match(/^\d{4}$/))
			.map(entry => entry.name)
			.sort((a, b) => Number(b) - Number(a)); // Sort newest first

		// Process years sequentially to avoid resource exhaustion
		const response = [];
		for (const year of years) {
			const [galleryImages, groupsImages] = await Promise.all([
				getImagesForYear(year, "gallery"),
				getImagesForYear(year, "groups"),
			]);

			response.push({
				year: year,
				galleryImagesCount: galleryImages.length,
				groupsImagesCount: groupsImages.length,
			});
		}

		return { years: response };
	}
	catch (error) {
		console.log(error);
		return { years: [] };
	}
});
