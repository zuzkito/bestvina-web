import type { Photographer } from "#shared/types/photographer";

/**
 * Returns a list of all photographers.
 * **/
export default function usePhotographers() {
	return useAsyncData<Photographer[]>(
		`photographers`,
		() => $fetch("/api/v1/images/photographers"),
	);
}
