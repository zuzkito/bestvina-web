// noinspection DuplicatedCode

import path from "path";
import fs from "fs";

const VALID_EXTENSIONS = ["jpg", "png", "gif", "jpeg", "webp"];

export default defineEventHandler((event) => {
	const gradesDir = path.posix.join(
		"public", "imgs",
		"rocniky",
	);

	try {
		const stats = fs.statSync(gradesDir);
		if (!stats.isDirectory()) {
			return sendError(event, createError({
				statusCode: 500,
				statusMessage: "Internal Server Error (Directory Not Found)",
			}));
		}

		return fs.readdirSync(gradesDir)
		// get only dirs that have photos in gallery, exclude folders starting with underscore (_template)
			.filter((item) => {
				const s = fs.statSync(path.posix.join(gradesDir, item));
				if (s.isDirectory() && !item.startsWith("_")) {
					const hasPhotos = doesContainPhotos(path.posix.join(gradesDir, item, "galerie"));
					if (hasPhotos)
						return true;
				}
				return false;
			})
		// get years only
			.map((dir) => {
				return dir.toString();
			})
			.reverse();
	}
	catch (ex) {
		return sendError(event, createError({
			statusCode: 500,
			statusMessage: `Internal Server Error ${ex}`,
		}));
	}
});

function doesContainPhotos(path: string): boolean {
	return fs.readdirSync(path)
		.filter(item =>
			VALID_EXTENSIONS.includes(item.substring(item.lastIndexOf(".") + 1)
				.toLowerCase(),
			),
		).length > 0;
}
