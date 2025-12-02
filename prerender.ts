import { mkdir, readdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { join } from "path/posix";
import { IMAGE_EXTENSIONS } from "./shared/constants";

const imgsDir: string = "public/imgs";
const outputDir: string = ".prerender";
const routesFilename: string = "imgs-routes.json";

async function getAllImages(dir: string, recursively: boolean = true) {
	const entries = await readdir(resolve(dir), { withFileTypes: true, recursive: recursively });
	const images: string[] = [];

	entries.forEach((entry) => {
		const posixPathWithoutPublic = entry.parentPath.replace("\\", "/").substring(entry.parentPath.indexOf("imgs"));
		const extension = entry.name.substring(entry.name.lastIndexOf(".") + 1).toLowerCase();
		if (entry.isFile() && IMAGE_EXTENSIONS.includes(extension)) {
			images.push(join(posixPathWithoutPublic, entry.name));
		}
	});
	return images;
}

function getDefaultThumbnailRoutes(images: string[]): string[] {
	const thumbnailRoutePrefixes = [
		"/_ipx/w_240&q_50/",
		"/_ipx/w_480&q_50/",
		"/_ipx/w_720&q_50/",
		"/_ipx/w_1080&q_50/",
		"/_ipx/w_1920&q_50/",
		"/_ipx/w_20/",
		"/_ipx/_/",
	];

	const routes: string[] = [];
	images.forEach((image) => {
		thumbnailRoutePrefixes.forEach((prefix) => {
			routes.push(prefix + image);
		});
	});
	return routes;
}

async function writeRoutesToFile(routes: string[], outDir: string, filename: string) {
	await mkdir(resolve(outDir), { recursive: true });
	await writeFile(resolve(outDir, filename), JSON.stringify(routes, null, 2));
}

function generateImgsRoutes(inDir: string, outDir: string, outFilename: string) {
	try {
		getAllImages(inDir).then((imgs) => {
			const routes = getDefaultThumbnailRoutes(imgs);
			writeRoutesToFile(routes, outDir, outFilename).then(() => {
				console.log(`${routes.length} image routes generated to ${outDir}/${outFilename}`);
			});
		});
	}
	catch (e) {
		console.error("Error generating imgs routes:", e);
	}
}

generateImgsRoutes(imgsDir, outputDir, routesFilename);
