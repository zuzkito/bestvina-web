import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig> {
	scrollBehaviorType: "smooth",
	scrollBehavior(to, from, savedPosition) {
		// when going back, return to the same position
		if (savedPosition) {
			return savedPosition;
		}

		// if anchor hash specified, go to that element
		if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth",
			};
		}

		// else, go to top
		return { top: 0, left: 0, behavior: "smooth" };
	},

};
