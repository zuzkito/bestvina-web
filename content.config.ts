import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		years: defineCollection({
			source: "rocniky/*.yml",
			type: "page",
			// Define custom schema for docs collection
			schema: z.object({
				year: z.number().int(),
				coverImg: z.string(), // path to image
				theme: z.string(),
			}),
		}),

		people: defineCollection({
			source: "lide/*.json",
			type: "data",
			schema: z.object({
				peoples: z.object({
					name: z.string(),
					description: z.string(),
					image: z.string(), // path to image
				}).array(),
			}),
		}),
	},
});
