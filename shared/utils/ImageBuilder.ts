import type { GalleryImage, GroupImage, ImageProperties, PlainImage } from "#shared/types/image";
import type { Photographer } from "#shared/types/photographer";
import { IMAGE_AUTHORS } from "#shared/utils/photographers";

/**
 * A generic builder class for creating our image objects.
 * T represents the specific type of image object being built (PlainImage, GalleryImage, etc.).
 */
export class ImageBuilder<T extends PlainImage> {
	private readonly data: T;

	private constructor(initialData: T) {
		this.data = initialData;
	}

	/**
     * Initializes a new builder with a plain image object.
     * @param filepath full file path without /public prefix
     * @param filesizeFromStats file size from fs.statSync
     */
	public static create(filepath: string, filesizeFromStats: number, height: number = 0, width: number = 0): ImageBuilder<PlainImage> {
		const filename = filepath.substring(filepath.lastIndexOf("/") + 1);
		const extension = filename.substring(filename.lastIndexOf(".") + 1);

		const data: PlainImage = {
			filepath: filepath,
			filesize: filesizeFromStats,
			filename: filename,
			extension: extension,
		};
		return new ImageBuilder<PlainImage>(data);
	}

	/**
     * Initializes a builder from an existing image object.
     */
	public static from<T extends PlainImage>(data: T): ImageBuilder<T> {
		return new ImageBuilder<T>(data);
	}

	/**
     * Adds optional image properties to the image object.
     */
	public appendProperties(properties: ImageProperties): ImageBuilder<T> {
		const updatedData = {
			...this.data,
			properties: properties,
		};
		return new ImageBuilder<T>(updatedData);
	}

	/**
     * Converts the image object into a GalleryImage.
     * This method returns a new builder instance with the updated type.
     */
	public asGalleryImage(year: number): GalleryImage {
		const author = this.getImageAuthor(year);

		const updatedData: GalleryImage = {
			...this.data,
			photographer: author,
			year: year,
		};
		return updatedData as GalleryImage;
	}

	/**
     * Finalizes the builder and returns the result as a GroupImage object.
     * @param year the year of the photo
     */
	public asGroupImage(year: number): GroupImage {
		const group = this.getGroupTitle(year);
		const updatedData: GroupImage = {
			...this.data,
			year: year,
			group: group,
		};
		return updatedData as GroupImage;
	}

	/**
     * Finalizes the builder and returns the result as a PlainImage object.
     */
	public asPlainImage(): PlainImage {
		return this.data;
	}

	/** TODO
     * Gets the author of a specific image.
     * @param validatedYear the year of the image
     * @returns the author of the image
     */
	private getImageAuthor(validatedYear: number): Photographer | null {
		const filename = this.data.filename;
		let correctAuthor: Photographer | undefined;

		// handle images from year 2024 and older
		if (validatedYear < 2024) {
			// example: 03-13-22-mum-2248.jpg
			const authorShortcutFromFilename = filename.split("-")[3];
			correctAuthor = IMAGE_AUTHORS.find((author: Photographer) =>
				author.shortcut === authorShortcutFromFilename);
		}
		else if (validatedYear < 2025) {
			// example: B24__20240703_190612__Tana.jpg
			const authorShortcutFromFilename = filename.split("__")?.at(2)?.split("_")?.at(0)?.split(".")[0];
			if (!authorShortcutFromFilename)
				return null;

			correctAuthor = IMAGE_AUTHORS.find((author: Photographer) =>
				author.shortcut === authorShortcutFromFilename.toLowerCase());
		}

		if (correctAuthor)
			return correctAuthor;
		return null;
	}

	/** TODO
     * Gets the group title (like Chemie C1, Biologie B2, etc.)
     * or null if it cannot be determined.
     * @param validatedYear the year of the image
     * @returns the title of the group
     */
	private getGroupTitle(validatedYear: number): string | null {
		const filename = this.data.filename;

		// const chemistryShortcuts = ["ch"];
		// const biologyShortcuts = ["bi", "bio"];

		let field: string | null = null;
		const group: string | null = null;

		// handle images from year 2024 and older
		if (validatedYear < 2024) {
			if (filename.includes("ch"))
				field = "Chemie";

			else if (filename.includes("bi"))
				field = "Biologie";
		}
		if (validatedYear < 2025) {
			return null;
		}

		// return either field with group or at least field, if possible
		if (field !== null && group !== null) {
			return `${field} ${group}`;
		}
		if (field !== null) {
			return field;
		}
		return null;
	}
}
