import { CURRENT_YEAR, OLDEST_YEAR } from "./shared/constants";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const imgsRoutesPath = resolve(".prerender/imgs-routes.json");

const getApiRoutes = (): string[] => {
	const apiRoutes: string[] = [];
	for (let year = OLDEST_YEAR; year <= CURRENT_YEAR; year++) {
		apiRoutes.push(`/api/images/gallery/${year}/`);
		apiRoutes.push(`/api/images/group/${year}/`);
	}
	apiRoutes.push(`/api/images/gallery/years/`);
	apiRoutes.push(`/api/images/photographers/`);
	return apiRoutes;
};

const getImgRoutes = (): string[] => {
	if (!existsSync(imgsRoutesPath)) {
		throw new Error("File ./prerender/imgs-routes.json not found. You need to run `npm run prerender` first.");
	}
	try {
		return JSON.parse(readFileSync(imgsRoutesPath, "utf-8"));
	}
	catch (error) {
		throw new Error(`Getting imgs routes failed: ${error}`);
	}
};

export default defineNuxtConfig({
	modules: [
		"@nuxt/content",
		"@nuxt/eslint",
		"@nuxt/hints",
		"@nuxt/image",
		"@nuxt/test-utils",
		"@nuxt/ui",
		"@nuxt/scripts",
		"nuxt-studio",
	],
	ssr: true,
	imports: {
		dirs: [
			"hooks",
			"utils",
		],
	},
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	css: ["~/assets/css/main.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
	content: {
		experimental: { nativeSqlite: true },
	},
	ui: {
		theme: {
			transitions: true,
			colors: [
				"primary",
				"secondary",
				"tertiary",
				"info",
				"success",
				"warning",
				"error",
			],
		},
		experimental: {
			componentDetection: true,
		},
		colorMode: true,
	},
	compatibilityDate: "2025-11-30",
	nitro: {
		prerender: {
			autoSubfolderIndex: false,
			crawlLinks: true,
			routes: [
				"/",
				...getApiRoutes(),
				...getImgRoutes(),
			],
		},
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
	fonts: {
		families: [
			{
				name: "Poppins",
				provider: "google", // Explicitly use the Google Fonts provider
				// Optionally define specific weights/styles you use to reduce bundle size
				weights: [400, 600, 700], // Example: Regular, Semi-Bold, Bold
				preload: true, // Explicitly set to true to inject <link rel="preload">
				display: "swap", // Use 'swap' to avoid invisible text (FOIT)
			},
		],
	},
	icon: {
		customCollections: [{
			prefix: "my",
			dir: "./app/assets/icons",
		}],
	},
	image: {
		presets: {
			thumbnailXXSm: {
				modifiers: {
					width: 20,
				},
			},
			thumbnailSm: {
				modifiers: {
					width: 240,
					quality: 50,
				},
			},
			thumbnailMd: {
				modifiers: {
					width: 480,
					quality: 50,
				},
			},
			thumbnailLg: {
				modifiers: {
					width: 720,
					quality: 50,
				},
			},
			thumbnailXLg: {
				modifiers: {
					width: 1080,
					quality: 50,
				},
			},
			thumbnailXXLg: {
				modifiers: {
					width: 1920,
					quality: 50,
				},
			},
		},
	},
	studio: {
		dev: false,
	},
});
