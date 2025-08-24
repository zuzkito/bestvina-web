// noinspection DuplicatedCode

import fs from "fs";
import path from "path";
import { CURRENT_YEAR, OLDEST_YEAR } from "~/app.config";

const VALID_EXTENSIONS = ["jpg", "png", "gif", "jpeg", "webp"];

export default defineEventHandler((event) => {
	const yearParam = getRouterParam(event, "year");
	if (!yearParam)
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: "Bad Request (Year Not Supplied)",
		}));

	const year = parseInt(yearParam, 10);
	if (isNaN(year)) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Unprocessable Content (Year Must Be a Number)",
		}));
	}

	if (year < OLDEST_YEAR || year > CURRENT_YEAR) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Not Found (Invalid Year)",
		}));
	}

	const groupPhotosDir = path.posix.join(
		"public", "imgs",
		"rocniky",
		year.toString(),
		"galerie",
	);

	try {
		const stats = fs.statSync(groupPhotosDir);
		if (!stats.isDirectory()) {
			return sendError(event, createError({
				statusCode: 500,
				statusMessage: "Internal Server Error (Directory Not Found)",
			}));
		}

		const files = fs.readdirSync(groupPhotosDir)
			// get only files
			.filter((file) => {
				const s = fs.statSync(path.posix.join(groupPhotosDir, file));
				if (s.isFile() && VALID_EXTENSIONS.includes(file.substring(file.lastIndexOf(".") + 1).toLowerCase()))
					return true;
				return false;
			})
			// get full paths
			.map((file) => {
				return path.posix.join("imgs",
					"rocniky",
					year.toString(),
					"galerie",
					file,
				).toString();
			});
		return files;
	}
	catch (ex) {
		return sendError(event, createError({
			statusCode: 500,
			statusMessage: `Internal Server Error ${ex}`,
		}));
	}
});
