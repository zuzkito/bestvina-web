import type { Photographer } from "../types/photographer";

export interface BestvinaImage {
	path: string;
	year: string;
	width: number;
	height: number;
	aspectRatio: number;
	author: Photographer | null;
	title?: string | null;
}

export interface MinifiedBestvinaImage {
	p: string;
	y: string;
	w: number;
	h: number;
	ar: number;
	a: string;
	t?: string | null;
}

export const encodeBestvinaImage = (img: BestvinaImage): MinifiedBestvinaImage => ({
	p: img.path,
	y: img.year,
	w: img.width,
	h: img.height,
	ar: img.aspectRatio,
	a: img.author?.shortcut || "unknown",
	t: img.title,
});

export const decodeBestvinaImage = (img: MinifiedBestvinaImage): BestvinaImage => {
	const authorObject = IMAGE_AUTHORS.find(a => a.shortcut === img.a) || null;

	return {
		path: img.p,
		year: img.y,
		width: img.w,
		height: img.h,
		aspectRatio: img.ar,
		author: authorObject,
		title: img.t,
	};
};
