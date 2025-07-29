// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
	// Your custom configs here
	{
		rules: {
			"style/*": "off",
			"@stylistic/*": "off",
			"format/*": "off",
			"*-indent": "off",
			"*-spacing": "off",
			"*-spaces": "off",
			"*-order": "off",
			"*-dangle": "off",
			"*-newline": "off",
			"*quotes": "off",
			"*semi": "off",
			"object-curly-spacing": ["error", "always"],
		},
	},
);
