export default function () {
	const pageData = (pageId: MaybeRefOrGetter<string>) => {
		return useAsyncData(`about-camp-${toValue(pageId)}`, async () => {
			const id = toValue(pageId);
			return await queryCollection("aboutCampPage")
				.path("/about_camp/" + id)
				.first();
		}, {
			watch: [() => toValue(pageId)],
		});
	};

	return {
		pageData,
	};
}
