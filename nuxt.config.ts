// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
		"@nuxt/image",
		"@nuxt/ui-pro",
		"@nuxt/content",
		"@nuxtjs/color-mode",
		"nuxt-seo-utils",
	],
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
	colorMode: {
		preference: "system",
		fallback: "light",
		storage: "localStorage",
		storageKey: "color-mode",
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
		colorMode: true,
	},
	compatibilityDate: "2025-07-15",
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
	icon: {
		customCollections: [{
			prefix: "my",
			dir: "./app/assets/icons",
		}],
	},
});
