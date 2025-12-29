export default function () {
	const pageData = (pageId: MaybeRefOrGetter<string>) => {
		return useAsyncData(`about-camp-${toValue(pageId)}`, async () => {
			return await queryCollection("aboutCampPage")
				.path("/about_camp/" + toValue(pageId))
				.first();
		}, {
			watch: [() => toValue(pageId)],
		});
	};

	return {
		pageData,
	};
}
