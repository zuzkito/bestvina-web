export default defineEventHandler(() => {
	return [
		{
			name: "Jakub Ferenčík",
			shortcut: "jfer",
		}, {
			name: "Jitka Kopecká",
			shortcut: "jit",
		}, {
			name: "Jirka Štipl",
			shortcut: "jst",
		}, {
			name: "Zuzka Chumová (Kodulka)",
			shortcut: "kod",
		}, {
			name: "Lenka Špidlenová",
			shortcut: "les",
		}, {
			name: "Luděk Míka (Lumec)",
			shortcut: "lum",
		}, {
			name: "Michal. H. Kolář",
			shortcut: "mhk",
		}, {
			name: "Jan Martínek (Mumínek)",
			shortcut: "mum",
		}, {
			name: "Tatiana Nemirovich",
			shortcut: "tana",
		}, {
			name: "Tomáš Kubař",
			shortcut: "tom",
		}, {
			name: "Vojta Duchoslav",
			shortcut: "voj",
		},
	].sort((a, b) => a.name.localeCompare(b.name));
});
