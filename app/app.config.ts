export default defineAppConfig({
	ui: {
		colors: {
			primary: "teal",
			secondary: "orange",
			tertiary: "yellow",
			neutral: "zinc",
		},
		container: {
			base: "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
		},
		theme: {
			radius: 0.5,
		},
	},
	toaster: {
		position: "bottom-right" as const,
		expand: true,
		duration: 5000,
		max: 3,
	},
	seo: {
		siteName: "Běstvina",
	},
});
