import type { BestvinaImage } from "#shared/utils/imageMapper";

export type LayoutItem
	= | { type: "header"; id: string; year: string; height: number }
		| { type: "row"; id: string; height: number; items: LayoutImage[] };

export type LayoutImage = {
	image: BestvinaImage;
	width: number;
};

// Define explicit options interface
export interface JustifiedLayoutOptions {
	targetHeight?: number;
	gap?: number;
	headerHeight?: number;
}

export const useJustifiedLayout = (
	groupedImages: Ref<Record<string, BestvinaImage[]>>,
	containerWidth: Ref<number>,
	options: JustifiedLayoutOptions = {},
) => {
	return computed(() => {
		const layout: LayoutItem[] = [];
		const width = containerWidth.value;

		if (width <= 0) return layout;

		const targetHeight = options.targetHeight ?? 250;
		const gap = options.gap ?? 8;
		const headerHeight = options.headerHeight ?? 80;

		const years = Object.keys(groupedImages.value).sort((a, b) => Number(b) - Number(a));

		for (const year of years) {
			const images = groupedImages.value[year];

			layout.push(markRaw({ type: "header", id: `header-${year}`, year, height: headerHeight }));

			let currentRow: BestvinaImage[] = [];
			let currentRowAspectRatioSum = 0;

			const commitRow = (rowItems: BestvinaImage[], finalHeight: number) => {
				layout.push(markRaw({
					type: "row",
					id: `row-${year}-${layout.length}`,
					height: finalHeight,
					items: rowItems.map(img => markRaw({
						image: img,
						width: img.aspectRatio * finalHeight,
					})),
				}));
			};
			// TODO : check ?? []
			for (const img of images ?? []) {
				const nextAspectRatioSum = currentRowAspectRatioSum + img.aspectRatio;
				// Math perfectly accounts for the horizontal gap pixels
				const widthWithImg = (nextAspectRatioSum * targetHeight) + (currentRow.length * gap);

				if (widthWithImg < width) {
					currentRow.push(img);
					currentRowAspectRatioSum = nextAspectRatioSum;
				}
				else {
					const targetWidthBefore = width - (Math.max(0, currentRow.length - 1) * gap);
					const heightBefore = targetWidthBefore / currentRowAspectRatioSum;
					const errorBefore = Math.abs(heightBefore - targetHeight);

					const targetWidthAfter = width - (currentRow.length * gap);
					const heightAfter = targetWidthAfter / nextAspectRatioSum;
					const errorAfter = Math.abs(heightAfter - targetHeight);

					if (errorBefore < errorAfter || currentRow.length === 0) {
						commitRow([...currentRow], heightBefore);
						currentRow = [img];
						currentRowAspectRatioSum = img.aspectRatio;
					}
					else {
						currentRow.push(img);
						commitRow([...currentRow], heightAfter);
						currentRow = [];
						currentRowAspectRatioSum = 0;
					}
				}
			}

			if (currentRow.length > 0) {
				const naturalWidth = (currentRowAspectRatioSum * targetHeight) + ((currentRow.length - 1) * gap);
				if (naturalWidth > width * 0.75) {
					const height = (width - ((currentRow.length - 1) * gap)) / currentRowAspectRatioSum;
					commitRow(currentRow, height);
				}
				else {
					commitRow(currentRow, targetHeight);
				}
			}
		}

		return layout;
	});
};
