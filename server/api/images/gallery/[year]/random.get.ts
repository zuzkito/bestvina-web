// noinspection DuplicatedCode

import fs from "fs";
import path from "path";
import { CURRENT_YEAR, OLDEST_YEAR } from "~/app.config";

const VALID_EXTENSIONS = ["jpg", "png", "gif", "jpeg", "webp"];

export default defineEventHandler((event) => {
	const yearParam = getRouterParam(event, "year");
	const nParam = getQuery(event).n;

	// check whether params are valid

	if (!yearParam)
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: `Bad Request (Year Not Supplied)`,
		}));
	if (!nParam)
		return sendError(event, createError({
			statusCode: 400,
			statusMessage: `Bad Request (Number of Photos Not Supplied)`,
		}));

	const year = parseInt(yearParam, 10);
	const numPhotos = parseInt(nParam.toString(), 10);

	if (isNaN(year))
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Unprocessable Content (Year Must Be a Number)",
		}));

	if (isNaN(numPhotos))
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Unprocessable Content (Number of Photos Must Be a Number)",
		}));

	if (year < OLDEST_YEAR || year > CURRENT_YEAR) {
		return sendError(event, createError({
			statusCode: 422,
			statusMessage: "Not Found (Invalid Year)",
		}));
	}

	// get photos

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
		if (files.length <= numPhotos)
			return shuffle(files);
		return shuffle(files).slice(0, numPhotos);
	}
	catch (ex) {
		return sendError(event, createError({
			statusCode: 500,
			statusMessage: `Internal Server Error ${ex}`,
		}));
	}
});

function shuffle<T>(arr: T[]): T[] {
	let currentIndex = arr.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[arr[currentIndex], arr[randomIndex]] = [
			arr[randomIndex], arr[currentIndex]];
	}

	return arr;
}
