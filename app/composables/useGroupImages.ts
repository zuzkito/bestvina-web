import type { GroupImage } from "~~/shared/types/image";

/**
 * Returns a list of all group images for a specific year.
 * **/
export default function useGroupImages(year: string) {
	return useAsyncData<GroupImage[]>(
		`${year}-group-images`,
		() => $fetch(`/api/images/group/${year}/`),
	);
}
