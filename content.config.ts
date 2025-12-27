import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		years: defineCollection({
			source: "years/**.(yml|md)",
			type: "page",
			schema: z.object({
				year: z.number().int(),
				coverImg: z.string(), // path to image
				theme: z.string(),
				startDate: z.date(),
				endDate: z.date(),
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
