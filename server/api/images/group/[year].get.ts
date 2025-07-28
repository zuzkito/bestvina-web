import fs from "fs";
import path from "path";
import { CURRENT_YEAR } from "~/app.config";

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

	if (year < 2010 || year > CURRENT_YEAR) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Not Found (Invalid Year)",
		}));
	}

	const groupPhotosDir = path.posix.join(
		"public", "imgs",
		"rocniky",
		year.toString(),
		"oddily",
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
			.filter(file => fs.statSync(path.posix.join(groupPhotosDir, file)).isFile)
			// get full paths
			.map((file) => {
				return path.posix.join("imgs",
					"rocniky",
					year.toString(),
					"oddily",
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
