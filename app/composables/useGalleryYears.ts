/**
 * Returns a list of all available years for the gallery.
 * **/
export default function useGalleryYears() {
	return useAsyncData<string[]>(
		`all-gallery-years`,
		() => $fetch("/api/images/gallery/years/"),
	);
}
