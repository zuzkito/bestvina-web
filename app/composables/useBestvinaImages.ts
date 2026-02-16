import { computed, ref } from "vue";
import { type BestvinaImage, decodeBestvinaImage, type MinifiedBestvinaImage } from "#shared/utils/imageMapper";

interface ImagesApiResponse {
	images: Record<string, MinifiedBestvinaImage[]>;
}

interface YearsApiResponse {
	years: string[];
}

export const useBestvinaImages = (type: "galerie" | "oddily") => {
	// 1. STATE (The SSR-Safe Shallow Cache)
	// { shallow: true } prevents the massive lag but ensures data survives hydration!
	const groupedImages = useState<Record<string, BestvinaImage[]>>(
		`bestvina-${type}-cache`,
		() => ({}),
		{ shallow: true },
	);

	const allAvailableYears = useState<string[]>("bestvina-available-years", () => []);
	const pending = ref(false);
	const error = ref<Error | null>(null);

	// 2. Filters
	const selectedYears = ref<string[]>([]);
	const selectedAuthors = ref<string[]>([]);

	// 3. Computed Outputs
	const filteredImages = computed(() => {
		let flatList: BestvinaImage[] = [];

		for (const [year, images] of Object.entries(groupedImages.value)) {
			if (selectedYears.value.length > 0 && !selectedYears.value.includes(year)) continue;
			flatList.push(...images);
		}

		if (selectedAuthors.value.length > 0) {
			flatList = flatList.filter(img => img.author && selectedAuthors.value.includes(img.author.shortcut));
		}

		return flatList;
	});

	const filteredGroupedImages = computed(() => {
		const result: Record<string, BestvinaImage[]> = {};

		for (const [year, images] of Object.entries(groupedImages.value)) {
			if (selectedYears.value.length > 0 && !selectedYears.value.includes(year)) {
				continue;
			}

			const yearFilteredImages = selectedAuthors.value.length > 0
				? images.filter(img => img.author && selectedAuthors.value.includes(img.author.shortcut))
				: images;

			if (yearFilteredImages.length > 0) {
				result[year] = yearFilteredImages;
			}
		}

		return result;
	});

	const availableAuthors = computed(() => {
		const authorsMap = new Map<string, Photographer>();
		Object.values(groupedImages.value).flat().forEach((img) => {
			if (img.author) authorsMap.set(img.author.shortcut, img.author);
		});
		return Array.from(authorsMap.values());
	});

	// 4. Actions
	const fetchAvailableYears = async () => {
		const { data } = await useAsyncData("available-years", () =>
			$fetch<YearsApiResponse>("/api/v1/images/years"),
		);

		if (data.value?.years) {
			allAvailableYears.value = data.value.years;
		}
	};

	const fetchImages = async (years: string | string[]) => {
		const yearsArray = Array.isArray(years) ? years : [years];
		if (yearsArray.length === 0) return;

		const yearsQuery = yearsArray.sort().join(",");
		const cacheKey = `images-${yearsQuery}-${type}`;

		pending.value = true;

		const { data, error: fetchError } = await useAsyncData(cacheKey, async () => {
			// CRITICAL SSG FIX: Fetching paths (e.g., /api/v1/images/galerie/2023)
			// instead of query parameters (e.g., ?years=2023) so Cloudflare Pages works.
			const requests = yearsArray.map(year =>
				$fetch<ImagesApiResponse>(`/api/v1/images/${type}/${year}`),
			);

			const responses = await Promise.all(requests);
			const formattedImages: Record<string, BestvinaImage[]> = {};

			for (const response of responses) {
				if (response?.images) {
					for (const [year, minifiedImages] of Object.entries(response.images)) {
						// We no longer need markRaw(), because { shallow: true } handles it globally!
						formattedImages[year] = minifiedImages.map(decodeBestvinaImage);
					}
				}
			}

			return formattedImages;
		});

		if (data.value) {
			// Trigger the shallow update by replacing the entire root object
			groupedImages.value = { ...groupedImages.value, ...data.value };
		}

		if (fetchError.value) error.value = fetchError.value;
		pending.value = false;
	};

	const getRandomImages = (n: number) => {
		if (filteredImages.value.length === 0) return [];
		const shuffled = [...filteredImages.value].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, n);
	};

	return {
		groupedImages,
		allAvailableYears,
		pending,
		error,
		selectedYears,
		selectedAuthors,
		filteredImages,
		filteredGroupedImages,
		availableAuthors,
		fetchAvailableYears,
		fetchImages,
		getRandomImages,
	};
};
