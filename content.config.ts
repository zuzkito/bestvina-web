import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { PEOPLE_PAGES_ID_VALUES, PERSON_ROLES_ID_VALUES } from "./shared/constants";

const AboutCampDataSchema = z.object({
	title: z.string(),
	description: z.string(),

	targetPeople: z.object({
		title: z.string(),
		text: z.string(),
		icon: z.string().optional(),
	}).optional(),

	bestvinka: z.object({
		title: z.string(),
		text: z.string(),
		icon: z.string().optional(),
		link: z.string().optional(),
		linkLabel: z.string().optional(),
	}),

	activities: z.object({
		title: z.string(),
		text: z.string(),
		icon: z.string().optional(),
	}),

	schedule: z.object({
		title: z.string(),
		text: z.string(), // This is empty string in your JSON, which is fine
		icon: z.string(),
		events: z.array(z.object({
			time: z.string(),
			title: z.string(),
			description: z.string().optional(),
		})),
	}),

	location: z.object({
		title: z.string(),
		text: z.string(),
		icon: z.string(),
		mapUrl: z.string().optional(),
		staticMapImage: z.string().optional(), // This will now work correctly
	}),

	accordion: z.object({
		title: z.string(),
		items: z.array(
			z.object({
				label: z.string(),
				content: z.string(),
				icon: z.string().optional(),
				defaultOpen: z.boolean().optional(),
				disabled: z.boolean().optional(),
				slot: z.string().optional(),
			}),
		),
	}).optional(),

	chemistry: z.object({
		title: z.string(),
		description: z.string(),
		items: z.array(z.object({
			title: z.string(),
			description: z.string(),
			icon: z.string(),
			to: z.string().optional(),
			label: z.string().optional(),
		})),
	}),
	biology: z.object({
		title: z.string(),
		description: z.string(),
		items: z.array(z.object({
			title: z.string(),
			description: z.string(),
			icon: z.string(),
			to: z.string().optional(),
			label: z.string().optional(),
		})),
	}),
});

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

				price: z.number().int().optional(),
				registrationLink: z.string().optional(),
				registrationEndDate: z.date(),
			}),
		}),

		people: defineCollection({
			type: "data",
			source: "people/individuals/**/*.md",
			schema: z.object({
				name: z.string(),
				nickname: z.string().optional(),
				degreesBeforeName: z.string().optional(),
				degreesAfterName: z.string().optional(),
				description: z.string().optional(),
				image: z.string().optional(),
				isFormer: z.boolean().catch(false),
				isHidden: z.boolean().catch(false),
				// ... other fields (to be added later) ...
				pages: z.record(
					z.enum(PEOPLE_PAGES_ID_VALUES),
					z.object({
						role: z.enum(PERSON_ROLES_ID_VALUES).optional(),
						roleTitle: z.string().optional(),
						description: z.string().optional(),
						name: z.string().optional(),
						image: z.string().optional(),
						nickname: z.string().optional(),
					}),
				),
			}),
		}),

		peoplePages: defineCollection({
			type: "data",
			source: `people/*.json`,
			schema: z.object({
				title: z.string().optional(),
				description: z.string().optional(),
				header: z.string().optional(),
				headerText: z.string().optional(),
				sections: z.array(
					z.object({
						name: z.string().optional(),
						description: z.string().optional(),
						people: z.array(z.string()),
						showImages: z.boolean().catch(true),
					}),
				),
			}),
		}),

		aboutCampPage: defineCollection({
			type: "page",
			source: "about_camp/*",
			schema: AboutCampDataSchema,
		}),
	},
});
