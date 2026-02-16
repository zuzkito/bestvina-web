import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import sizeOf from "image-size";
import type { BestvinaImage, MinifiedBestvinaImage } from "#shared/utils/imageMapper";
import { IMAGE_EXTENSIONS } from "#shared/constants";

const VALID_EXTENSIONS_REGEX = new RegExp(`\\.(${IMAGE_EXTENSIONS.join("|")})$`, "i");

/**
 * Logic to determine group titles for the 'oddily' section.
 */
export const getGroupTitle = (filename: string, year: number): string | null => {
	// TODO: implement this

	let field: string | null = null;
	const group: string | null = null; // Placeholder for future C1/B2 logic
	const lowerFile = filename.toLowerCase();

	if (year < 2024) {
		if (lowerFile.includes("ch")) field = "Chemie";
		else if (lowerFile.includes("bi")) field = "Biologie";
	}

	// Based on requirements, return null for 2024 specifically
	if (year === 2024) return null;

	if (field && group) return `${field} ${group}`;
	if (field) return field;

	return null;
};

/**
 * Extracts author shortcut based on year-specific naming conventions.
 */
export const extractAuthorShortcut = (filename: string, year: number): string => {
	let foundShortcut: string | undefined;

	if (year < 2024) {
		// Example: 03-13-22-mum-2248.jpg
		foundShortcut = filename.split("-")[3];
	}
	else if (year < 2025) {
		// Example: B24__20240703_190612__Tana.jpg
		const parts = filename.split("__");
		const rawShortcut = parts?.at(2)?.split("_")?.at(0)?.split(".")[0];
		if (rawShortcut) {
			foundShortcut = rawShortcut.toLowerCase();
		}
	}

	// TODO: implement logic for 2025+ images

	const authorExists = IMAGE_AUTHORS.some(a => a.shortcut === foundShortcut);
	return authorExists && foundShortcut ? foundShortcut : "unknown";
};

/**
 * Reads a single image file and prepares the BestvinaImage object.
 */
export const processImageFile = async (
	baseDir: string,
	file: string,
	year: string,
	type: string,
): Promise<MinifiedBestvinaImage> => {
	const filePath = join(baseDir, file);
	const numericYear = Number(year);

	// Read into Buffer for image-size v2.0 compatibility
	const buffer = await readFile(filePath);
	const dimensions = sizeOf(buffer);

	const w = dimensions.width || 1;
	const h = dimensions.height || 1;

	// Build the full object using the shared interface
	const fullImage: BestvinaImage = {
		path: `/imgs/rocniky/${year}/${type}/${file}`,
		year: year,
		width: w,
		height: h,
		aspectRatio: Number((w / h).toFixed(2)),
		// Map author to full object if found (handled by decode later, but encoded here as shortcut)
		author: IMAGE_AUTHORS.find(a => a.shortcut === extractAuthorShortcut(file, numericYear)) || null,
		title: type === "oddily" ? getGroupTitle(file, numericYear) : null,
	};

	return encodeBestvinaImage(fullImage);
};

/**
 * Orchestrates the reading of an entire directory for a given year and type.
 */
export const getImagesForYear = async (year: string, type: string): Promise<MinifiedBestvinaImage[]> => {
	const baseDir = resolve(process.cwd(), "public", "imgs", "rocniky", year, type);

	try {
		const files = await readdir(baseDir);
		const validFiles = files.filter(file => VALID_EXTENSIONS_REGEX.test(file));

		// Concurrently process all images in the folder
		return await Promise.all(
			validFiles.map(file => processImageFile(baseDir, file, year, type)),
		);
	}
	catch (error) {
		console.log(error);
		return [];
	}
};
