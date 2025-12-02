export interface PlainImage {
	filepath: string;
	filesize: number;
	filename: string;
	extension: string;
	properties?: ImageProperties;
}

export interface GalleryImage extends PlainImage {
	photographer: Photographer | null;
	year: number;
}

export interface GroupImage extends PlainImage {
	year: number;
	group: string | null;
}

/*
* additional types
*/
export interface ImageProperties {
	width: number;
	height: number;
	aspectRatio: number;
}
