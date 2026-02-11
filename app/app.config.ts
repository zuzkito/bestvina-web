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
		pageHeader: {
			slots: {
				root: "relative w-screen ml-[-50vw] left-[50%] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center bg-primary/5",
				container: "flex flex-col items-center w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
				wrapper: "flex flex-col items-center max-w-2xl mx-auto",
				title: "text-3xl sm:text-4xl font-bold text-[var(--ui-text-highlighted)]",
				description: "mt-4 text-base sm:text-lg italic text-[var(--ui-text-muted)]",
				links: "justify-center mt-6",
				headline: "justify-center",
			},
		},
		navigationMenu: {
			variants: {
				orientation: {
					vertical: {
						item: "py-1",
						link: "py-2 text-base",
						label: "text-base",
						linkLeadingIcon: "size-8",
						childItem: "py-1",
						childLink: "py-2",
					},
				},
			},
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
