/**
 * GENERAL CONSTNANTS
 */
export const OLDEST_YEAR = 2010; // should not be changed, unless new history was uncovered

export const CURRENT_YEAR = 2026;

/**
 * DATA-PROCESSING-related CONSTANTS
 * */
export const IMAGE_EXTENSIONS = ["jpg", "png", "gif", "jpeg", "webp"];

/**
 * PEOPLE-related CONSTANTS
 */
export const FIELDS = {
	LEADERSHIP: "vedeni",
	BIOLOGY: "biologie",
	CHEMISTRY: "chemie",
	OTHER: "ostatni",
	EXTERNAL: "externi",
};

export const ROLES = {
	LECTURER: "prednasejici",
	LAB: "laborant",
};

export const BADGES = {
	LEADERSHIP: "vedeni",
	LECTURER: "lecturer",
	CHEM_LAB: "chlab",
	BIO_LAB: "biolab",
	BIO_TENT: "biostan",
	OTHER: "jine",
} as const;

export const FIELDS_ID_VALUES = Object.values(FIELDS) as [string, ...string[]];
export const ROLES_ID_VALUES = Object.values(ROLES) as [string, ...string[]];
