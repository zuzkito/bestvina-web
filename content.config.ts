import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { PEOPLE_PAGES_ID_VALUES, PERSON_ROLES_ID_VALUES } from "./shared/constants";

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
				// fields: z.record(
				// 	z.enum(PERSON_FIELDS_ID_VALUES),
				// 	z.object({
				// 		roles: z.record(
				// 			z.enum(PERSON_ROLES_ID_VALUES),
				// 			z.object({
				// 				roleTitle: z.string().optional(),
				// 				image: z.string().optional(),
				// 				nickname: z.string().optional(),
				// 				description: z.string().optional(),
				// 			}),
				// 		),
				// 	}).optional(),
				// ).optional(),
			}),
			// 	.transform((person) => {
			// 	// if no special image supplied for a given role, use the root one
			// 	if (person.fields.roles) {
			// 		Object.values(person.fields).forEach((field) => {
			// 			if (!field.roles)
			// 				return;
			// 			Object.values(field.roles).forEach((role) => {
			// 				role.image = person.image;
			// 			});
			// 		});
			// 	}
			// 	return person;
			// }),
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
			source: "about_camp/*.md",
			schema: z.object({
				title: z.string().optional(),
				description: z.string().optional(),
			}),
		}),
	},
});
