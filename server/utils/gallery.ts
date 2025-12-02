import fs from "fs";
import path from "path";
import type { H3Event } from "h3";
import { createError } from "h3";
import { CURRENT_YEAR, IMAGE_EXTENSIONS, OLDEST_YEAR } from "#shared/constants";
import type { PlainImage } from "#shared/types/image";
import sharp from "sharp";

/**
 * Validates a year from an H3 event's router parameters.
 * @param event the H3 event object.
 * @returns the validated year as a number
 */
export function validateYear(event: H3Event): number {
	const yearParam = getRouterParam(event, "year");

	if (!yearParam) {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request (Year Not Supplied)",
		});
	}

	const year = parseInt(yearParam, 10);
	if (isNaN(year)) {
		throw createError({
			statusCode: 422,
			statusMessage: "Unprocessable Content (Year Must Be a Number)",
		});
	}

	if (year < OLDEST_YEAR || year > CURRENT_YEAR) {
		throw createError({
			statusCode: 422,
			statusMessage: "Not Found (Invalid Year)",
		});
	}

	return year;
}

/**
 * Validates a number of photos from an H3 event's router parameters.
 * @param event the H3 event object.
 * @returns the validated year as a number
 */
export function validateNumPhotos(event: H3Event): number {
	const nParam = getQuery(event).n;

	if (!nParam) {
		throw createError({
			statusCode: 400,
			statusMessage: `Bad Request (Number of Photos Not Supplied)`,
		});
	}

	const numPhotos = parseInt(nParam.toString(), 10);

	if (isNaN(numPhotos))
		throw createError({
			statusCode: 422,
			statusMessage: "Unprocessable Content (Number of Photos Must Be a Number)",
		});

	return numPhotos;
}

/**
 * Gets a list of photo paths for a specific year.
 * @param year the year to retrieve photos for
 * @param type the type of photos to retrieve ("galerie" or "oddily")
 * @returns an array of images.
 */
export async function getPhotosByYear(year: number, type: "galerie" | "oddily" = "galerie"): Promise<PlainImage[]> {
	const groupPhotosDir = path.posix.join(
		"public",
		"imgs",
		"rocniky",
		year.toString(),
		type,
	);

	if (!fs.existsSync(groupPhotosDir)) {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error (Directory Not Found)",
		});
	}
	const stats = fs.statSync(groupPhotosDir);
	if (!stats.isDirectory()) {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error (Directory Not Found)",
		});
	}

	// noinspection GrazieInspection
	try {
		const items = fs.readdirSync(groupPhotosDir);
		const images: PlainImage[] = [];

		for (const item of items) {
			const filepath = path.posix.join(groupPhotosDir, item);
			const s = fs.statSync(filepath);
			const extension = item.substring(item.lastIndexOf(".") + 1).toLowerCase();
			if (s.isFile() && IMAGE_EXTENSIONS.includes(extension)) {
				const meta = await sharp(filepath).metadata();
				let builder = ImageBuilder.create(
					path.posix.join("imgs", "rocniky", year.toString(), type, item).toString(),
					s.size,
				);
				if (meta.height && meta.width) {
					builder = builder.appendProperties({
						height: meta.height,
						width: meta.width,
						// aspect ratio with three decimals
						aspectRatio: Math.round((meta.width / meta.height) * 1000) / 1000,
					} as ImageProperties);
				}

				images.push(builder.asPlainImage());
			}
		}

		return images;
	}
	catch (ex) {
		throw createError({
			statusCode: 500,
			statusMessage: `Internal Server Error: ${ex}`,
		});
	}
}
