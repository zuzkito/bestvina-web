/**
 * Shuffles an array in place or as a shallow copy.
 * @param array array to shuffle.
 * @param shuffleInPlace if true, the array will be shuffled in place,
 * otherwise a shallow copy will be created
 */
export function shuffle<T>(array: T[], shuffleInPlace: boolean = true): T[] {
	const arr = shuffleInPlace ? array : [...array];

	let currentIndex = arr.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex] as T, arr[currentIndex] as T];
	}

	return arr;
}

/**
 * Selects N random items from a list.
 * @param list The list to select items from
 * @param n the number of items to return
 * @param canShuffleInPLace if true, the list will be shuffled in place, otherwise a shallow copy will be created
 * @returns a new array containing N random items from the list
 */
export function getRandomItems<T>(list: T[], n: number, canShuffleInPLace: boolean = false): T[] {
	if (n <= 0 || !list || list.length === 0) {
		return [];
	}

	// if list has less items than N, return a shuffled copy of the list
	if (n >= list.length) {
		return shuffle([...list]);
	}

	const shuffledList = shuffle(list, canShuffleInPLace);

	// Return the first N elements from the shuffled list
	return shuffledList.slice(0, n);
}

/**
 * Removes duplicates from an array.
 * @param array the array to remove duplicates from
 * @returns a new array with duplicates removed
 */
export const removeDuplicates = <T>(array: T[] | undefined): T[] => [...new Set(array || [])];
