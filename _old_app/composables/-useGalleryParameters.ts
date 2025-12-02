import type {LocationQuery} from "#vue-router";
import {z} from "zod";
import {CURRENT_YEAR, OLDEST_YEAR} from "shared/constants";

export default function useGalleryParameters(
	query: LocationQuery,
	allPhotographers: Photographer[] = [],
) {
	const years = ref<string[]>(getYearsFromRequestParamsOrEmpty(query));
	const photographers = ref<Photographer[]>(getPhotographersFromRequestParamsOrEmpty(query, allPhotographers));

	return {
		yearsFromQuery: years,
		photographersFromQuery: photographers,
	};
}

function getYearsFromRequestParamsOrEmpty(query: LocationQuery): string[] {
	const yearsParamSchema = z.array(z.any()).transform(
		as => as?.filter(a =>
			z.coerce.number().int().max(CURRENT_YEAR).min(OLDEST_YEAR).safeParse(a).success,
		),
	).or(z.coerce.number().int().max(CURRENT_YEAR).min(OLDEST_YEAR));

	const parseResult = yearsParamSchema.safeParse(query.y);
	if (!parseResult.success || parseResult.data === undefined)
		return [];

	let uniqueYears: string[] = [];
	if (parseResult.data instanceof Array) {
		uniqueYears = removeDuplicates(parseResult.data.sort((a, b) => a < b ? 1 : -1).map(a => a.toString()));
	}
	else {
		uniqueYears = [parseResult.data.toString()];
	}
	return uniqueYears;
}

function getPhotographersFromRequestParamsOrEmpty(
	query: LocationQuery,
	allPhotographers: Photographer[],
): Photographer[] {
	const photographersParamSchema = z.string().or(z.array(z.string()));

	const parseResult = photographersParamSchema.safeParse(query.p);
	if (!parseResult.success || parseResult.data === undefined)
		return [];

	let uniquePhotographers: string[] = [];
	if (parseResult.data instanceof Array) {
		uniquePhotographers = removeDuplicates(parseResult.data).map(a => a.toLowerCase());
	}
	else {
		uniquePhotographers = [(parseResult.data as string).toLowerCase()];
	}

	return allPhotographers.filter(a =>
		uniquePhotographers.includes(a.shortcut),
	) || [];
}
