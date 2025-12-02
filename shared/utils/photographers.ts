import type { Photographer } from "#shared/types/photographer";

/*
* Unsorted list of photographers with their shortcuts.
* To get a sorted list, use server API "/api/images/photographers/"
* */
export const IMAGE_AUTHORS: Photographer[] = [
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
];
