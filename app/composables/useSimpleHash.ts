export default function () {
	const generateHash = (s: string) => {
		let hash = 0;
		const chars = [...s];
		chars.forEach((char, _) => {
			hash = (hash << 5) - hash + char.charCodeAt(0);
			hash |= 0; // Constrain to 32bit integer
		});
		return hash;
	};

	return { generateHash };
};
