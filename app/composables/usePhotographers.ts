import type { Photographer } from "#shared/types/photographer";

/**
 * Returns a list of all photographers.
 * **/
export default function usePhotographers() {
	return useAsyncData<Photographer[]>(
		`photographers`,
		() => $fetch("/api/images/photographers/"),
	);
}
