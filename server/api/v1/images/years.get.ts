import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

export default defineEventHandler(async () => {
	const baseDir = resolve(process.cwd(), "public", "imgs", "rocniky");

	try {
		const entries = await readdir(baseDir, { withFileTypes: true });

		const years = entries
			.filter(entry => entry.isDirectory() && entry.name.match(/^\d{4}$/))
			.map(entry => entry.name)
			.sort((a, b) => Number(b) - Number(a)); // Sort newest first

		return { years };
	}
	catch (error) {
		console.log(error);
		return { years: [] };
	}
});
