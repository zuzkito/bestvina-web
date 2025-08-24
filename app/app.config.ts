export const OLDEST_YEAR = 2010;
export const CURRENT_YEAR = 2025;

export default defineAppConfig({
	ui: {
		colors: {
			primary: "blue",
			secondary: "orange",
			tertiary: "yellow",
			neutral: "zinc",
		},
		container: {
			base: "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
		},
		toaster: {
			position: "bottom-right" as const,
			expand: true,
			duration: 5000,
		},
		theme: {
			radius: 0.5,
		},
	},
});
